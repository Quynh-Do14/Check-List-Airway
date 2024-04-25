import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout';
import { Checkbox, RadioButton } from 'react-native-paper';
import { data, user } from "../../core/common/data";
import { useRecoilValue } from 'recoil';
import { ListCheckState } from '../../core/atoms/listCheck/listCheckState';
import Constants from '../../core/common/constant';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFetchBlob from 'rn-fetch-blob';

import ModalNote from './modalNote';
import { convertTime } from '../../infrastructure/helper/helper';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';
import { UserSelectState } from '../../core/atoms/userSelect/userSelectState';
const DetailScreen = ({ navigation }: any) => {
    const [value, setValue] = useState<string>("1");
    const [listCheckPrimary, setListCheckPrimary] = useState<Array<any>>([]);
    const [listCheckSecondary, setListCheckSecondary] = useState<Array<any>>([]);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [dataModal, setDataModal] = useState<any>();
    const [isDialogConfirm, setIsDialogConfirm] = useState<boolean>(false);

    const userData = useRecoilValue(UserSelectState);
    const checkData = useRecoilValue(ListCheckState);
    console.log("listCheckPrimary", listCheckPrimary);
    console.log("listCheckSecondary", listCheckSecondary);

    const date = new Date();
    const onBack = () => {
        navigation.goBack()
    }
    const onChangeCheck = (value: any, item: any) => {
        let arrPrimay: any[] = [];
        let arrSecondary: any[] = [];

        if (item.type == "Trực điều hành") {
            arrPrimay = [{
                id: value.id,
                type: item.type,
                check: value.primary,
                submitTime: date
            }]
        }
        else if (item.type == "Trực hiệp đồng") {
            arrSecondary = [{
                id: value.id,
                type: item.type,
                check: value.secondary,
                submitTime: date
            }]
        }
        setListCheckPrimary([
            ...listCheckPrimary,
            ...arrPrimay,
        ])
        listCheckPrimary?.map(it => {
            if (it.id == value.id && it.type == item.type) {
                setListCheckPrimary(prev => prev?.filter(it => it.id !== value.id))
            }
        })
        setListCheckSecondary([
            ...listCheckSecondary,
            ...arrSecondary,
        ])
        listCheckSecondary?.map(it => {
            if (it.id == value.id && it.type == item.type) {
                setListCheckSecondary(prev => prev?.filter(it => it.id !== value.id))
            }
        })
    }

    const onOpenModal = (it: any, item: any) => {
        setModalVisible(true)
        setDataModal(
            {
                ...it,
                type: item.type
            })
    }
    const generatePdf = async () => {
        let name: string[] = []
        try {
            // <h1>${checkData.label}</h1>
            // <h2>${checkData.userSelect.name} - ${checkData.userSelect.position}</h2>
            const htmlContent = `
            <html>
            <body>
                ${userData.map((item, indexX) => {
                let arr = []
                if (item.type === "Trực điều hành") {
                    arr = listCheckPrimary
                }
                else if (item.type === "Trực hiệp đồng") {
                    arr = listCheckSecondary
                }
                return `
                    <table key="${indexX}" style="width: 100%; background-color: #D9FFE6; border-collapse: collapse; border: 1px solid #E5E7EB; font-size: 1.5rem; font-weight: bold; text-align: left;">
                    <thead class="text-xs text-center">
                        <tr className="w-full text-center text-2xl">
                        <th
                            scope="col"
                            colSpan={3}
                            className="px-6 py-3 text-[1.5rem] font-bold border border-slate-300"
                        >
                            ${item.name} - ${item.type}
                        </th>
                        </tr>
                        <tr>
                        <th style="width: 40%; padding: 6px; border: 1px solid #E5E7EB;">Tên</th>
                        <th style="width: 20%; padding: 6px; border: 1px solid #E5E7EB;">Thời gian chọn</th>
                        <th style="width: 40%; padding: 6px; border: 1px solid #E5E7EB;">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        ${arr?.map((it, index) => {
                    return `
                            <tr key="${index}" style="border: 1px solid #E5E7EB;">
                                    <td style="width: 40%; border: 1px solid #E5E7EB; padding: 6px; font-weight: medium; color: #374151;">${it.check} </td>
                                    <td style="width: 20%; border: 1px solid #E5E7EB; padding: 6px;"><p style="color: #f17024;">${convertTime(it.submitTime)}</p></td>
                                    <td style="width: 40%; border: 1px solid #E5E7EB; padding: 6px;"><p style="color: #f17024;">${it.note || ""}</p></td>
                                </tr>
                            `;
                }).join('')}
                    </tbody>
                </table>
    `
            })}

            </body>
        </html>`;
            const options = {
                html: htmlContent,
                fileName: `${date}`,
                directory: 'Documents',
            };

            let file = await RNHTMLtoPDF.convert(options)
            console.log(file.filePath);
            if (file) {
                onOpenDialogConfirm();
                setListCheckPrimary([]);
            }

        } catch (error) {
            console.error('Error converting HTML to PDF:', error);
        }
    }

    const onOpenDialogConfirm = () => {
        setIsDialogConfirm(true)
    }
    const onCloseDialogConfirm = () => {
        setIsDialogConfirm(false)
    }
    return (
        <MainLayout
            title={""}
            onGoBack={onBack}
            isBackButton={true}
        >

            <View style={styles.content}>
                <View style={[
                    styles.paddingName,
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }
                ]}>
                    {/* <Text style={styles.textTitle}>
                        {checkData.userSelect.name} - {checkData.userSelect.position}
                    </Text> */}
                    <TouchableOpacity
                        style={styles.btnExport}
                        onPress={generatePdf}
                    >
                        <Text style={styles.textTitle}>
                            Xuất File PDF
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                }}>

                    <View>
                        {
                            userData.map((item, indexX) => {
                                return (
                                    <View key={indexX}>
                                        <View style={styles.paddingName}>
                                            <Text style={styles.textTitle}>
                                                {item.name} - {item.type}
                                            </Text>
                                        </View>
                                        {checkData.data.content.map((it: any, index: number) => {
                                            let condtion: any[] = [];
                                            if (item.type === "Trực điều hành") {
                                                condtion = listCheckPrimary.filter(item => item.id == it.id)
                                            }
                                            if (item.type === "Trực hiệp đồng") {
                                                condtion = listCheckSecondary.filter(item => item.id == it.id)
                                            }
                                            return (
                                                <View key={index}>
                                                    <View
                                                        style={styles.checkBoxContainer}
                                                    >
                                                        <RadioButton color="#191313" value={it.id} status={`${condtion[0]?.id == it.id ? "checked" : "unchecked"}`} onPress={() => onChangeCheck(it, item)} />
                                                        <View
                                                            style={styles.flex1}
                                                        >
                                                            <Text style={styles.textBox}>{
                                                                item.type && item.type === "Trực điều hành"
                                                                    ?
                                                                    it.primary
                                                                    :
                                                                    item.type && item.type === "Trực hiệp đồng"
                                                                    &&
                                                                    it.secondary
                                                            }</Text>
                                                        </View>
                                                        {
                                                            condtion[0]?.id == it.id && condtion[0]?.type == item.type
                                                            &&
                                                            <TouchableOpacity onPress={() => onOpenModal(it, item)}>
                                                                <View>
                                                                    {
                                                                        condtion[0]?.note
                                                                            ?
                                                                            <Image source={require('../../../assets/images/noteActive.png')} />
                                                                            :
                                                                            <Image source={require('../../../assets/images/note.png')} />
                                                                    }

                                                                </View>
                                                            </TouchableOpacity>
                                                        }

                                                    </View>
                                                </View>
                                            )
                                        }
                                        )}
                                    </View>
                                )
                            })
                        }
                    </View>

                    {/* <View>
                        {checkData.data.map((it: any, index: number) => (
                            <View key={index}>
                                <View
                                    style={styles.checkBoxContainer}
                                >
                                    <RadioButton color="#e5e5e5" value={it.id} status={`${listCheck.includes(it.id) ? "checked" : "unchecked"}`} onPress={() => onChangeCheck(it.id)} />
                                    <View>
                                        <Text style={styles.textBox}>Trực phụ</Text>
                                        <Text style={styles.textBox}>{it.secondary}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View> */}

                </ScrollView>
            </View >
            <ModalNote
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dataModal={dataModal}
                setListCheckPrimary={setListCheckPrimary}
                listCheckPrimary={listCheckPrimary}
                setListCheckSecondary={setListCheckSecondary}
                listCheckSecondary={listCheckSecondary}
            />
            <DialogNotificationCommon
                visible={isDialogConfirm}
                onConfirm={onCloseDialogConfirm}
                message={"Bạn đã xuất File PDF thành công"} />
        </MainLayout >
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#FBF1EF",
        borderWidth: 4,
        borderColor: "#FBF1EF",
        elevation: 6,
        height: "100%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flex1: {
        flex: 1
    },
    checkBoxContainer: {
        backgroundColor: "#FBF1EF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 16
    },
    paddingName: {
        borderBottomColor: "#191313",
        borderBottomWidth: 2,
        // marginBottom: 10,
        backgroundColor: "#FBF1EF",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    textTitle: {
        color: "#191313",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 14,
    },
    textBox: {
        color: "#191313",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "500",
        fontSize: 14,
    },
    btnExport: {
        backgroundColor: "#8687E7",
        borderRadius: 4,
        padding: 8
    },
})
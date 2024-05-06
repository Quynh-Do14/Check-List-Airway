import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout';
import { Checkbox, RadioButton } from 'react-native-paper';
import { data, user } from "../../core/common/data";
import { useRecoilValue } from 'recoil';
import { ListCheckState } from '../../core/atoms/listCheck/listCheckState';
import Constants from '../../core/common/constant';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import ModalNote from './modalNote';
import { convertTime } from '../../infrastructure/helper/helper';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';
import SignatureModal from './signature';
const DetailScreen = ({ navigation }: any) => {
    const [listCheck, setListCheck] = useState<Array<any>>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalSignature, setModalSignature] = useState<boolean>(false);
    const [signature, setSignature] = useState<any>();

    const [dataModal, setDataModal] = useState<any>();
    const [isDialogConfirm, setIsDialogConfirm] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<Array<any>>([]);
    const [textSearch, setTextSearch] = useState<string>("");
    const checkData = useRecoilValue(ListCheckState);

    const date = new Date();
    const onBack = () => {
        navigation.goBack();
        setTextSearch("");
    }
    const onChangeCheck = (value: any) => {
        const arr = [{
            ...value,
            submitTime: date
        }]
        setListCheck([
            ...listCheck,
            ...arr,
        ])
        listCheck?.map(it => {
            if (it.id == value.id) {
                setListCheck(prev => prev?.filter(it => it.id !== value.id))
            }
        })
    }

    const onOpenModal = (it: any) => {
        setModalVisible(true)
        setDataModal(it)
    }
    const generatePdf = async () => {
        try {
            const htmlContent = `
            <html>
            <body>
                <h1>${checkData.label}</h1>
                <h2>${checkData.userSelect.name} - ${checkData.userSelect.position}</h2>
                <table style="width: 100%; background-color: #D9FFE6; border-collapse: collapse; border: 1px solid #E5E7EB; font-size: 1.5rem; font-weight: bold; text-align: left;">
                    <thead class="text-xs text-center">
                        <tr>
                        <th style="width: 40%; padding: 6px; border: 1px solid #E5E7EB;">Tên</th>
                        <th style="width: 20%; padding: 6px; border: 1px solid #E5E7EB;">Thời gian chọn</th>
                        <th style="width: 40%; padding: 6px; border: 1px solid #E5E7EB;">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        ${listCheck?.map((it, index) => {
                return `
                               <tr key="${index}" style="border: 1px solid #E5E7EB;">
                                    <td style="width: 40%; border: 1px solid #E5E7EB; padding: 6px; font-weight: medium; color: #374151; white-space: nowrap;">${checkData.label === "Trực điều hành" ? it.primary : (checkData.label === "Trực hiệp đồng" && it.secondary)}</td>
                                    <td style="width: 20%; border: 1px solid #E5E7EB; padding: 6px;"><p style="color: #f17024;">${convertTime(it.submitTime)}</p></td>
                                    <td style="width: 40%; border: 1px solid #E5E7EB; padding: 6px;"><p style="color: #f17024;">${it.note || ""}</p></td>
                                </tr>
                            `;
            }).join('')}
                    </tbody>
                </table>
                <div style="display: flex; flex-direction: column; justifyContent: flex-start; align-items: center;">
                    <h2 style="font-size: 24px; margin-bottom: 20px;">Chữ kí</h2>
                    <div>
                        <img src="${signature}" style="width: 200px; height: auto;" />
                    </div>
                </div>
            </body>
        </html>`;
            const options = {
                html: htmlContent,
                fileName: `${checkData.userSelect.name}-${checkData.userSelect.position}-${date}`,
                directory: 'Documents',
            };

            let file = await RNHTMLtoPDF.convert(options)
            console.log(file.filePath);
            if (file) {
                onOpenDialogConfirm();
                setListCheck([]);
                setSignature(null);
            }

        } catch (error) {
            console.error('Error converting HTML to PDF:', error);
        }
    }

    const onOpenSignature = () => {
        setModalSignature(true)
    }

    // const onChange = (value: string) => {
    //     setTextSearch(value)
    //     if (checkData.label && checkData.label === "Trực điều hành") {
    //         let arrConvert = checkData.data.filter((it: any) => it.primary.toLowerCase().includes(value.toLowerCase()))
    //         setDataFilter(arrConvert)
    //     }
    //     if (checkData.label && checkData.label === "Trực hiệp đồng") {
    //         let arrConvert = checkData.data.filter((it: any) => it.secondary.toLowerCase().includes(value.toLowerCase()))
    //         setDataFilter(arrConvert)
    //     }
    // }
    // useEffect(() => {
    //     setDataFilter(checkData.data)
    // }, [checkData])

    const onOpenDialogConfirm = () => {
        setIsDialogConfirm(true)
    }
    const onCloseDialogConfirm = () => {
        setIsDialogConfirm(false)
    }

    return (
        <MainLayout
            title={checkData.label}
            onGoBack={onBack}
            isBackButton={true}
        >
            {/* {signature ? (
                <Image
                    resizeMode={"contain"}
                    style={{ width: 335, height: 114 }}
                    source={{ uri: signature }}
                />
            ) : null} */}
            <View
                style={{
                    paddingHorizontal: 16,
                }}
            >
                <Text style={styles.textTitle}>
                    {checkData.checkName}
                </Text>
            </View>
            <View style={styles.content}>
                <View style={[
                    styles.paddingName,
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                    }
                ]}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 4
                        }}
                    >
                        <Text style={styles.textTitle}>
                            {checkData.userSelect.name} - {checkData.userSelect.position}
                        </Text>
                        <TouchableOpacity
                            style={styles.btnSignature}
                            onPress={onOpenSignature}
                        >
                            <Text style={styles.textSelect}>
                                {signature ? "Đã có chữ kí" : "Kí tên"}
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity
                        style={styles.btnExport}
                        onPress={generatePdf}
                    >
                        <Text style={styles.textSelect}>
                            Xuất File PDF
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <KeyboardAvoidingView
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 8,
                    }}>
                    <View>
                        <Text style={styles.labelStyle}>
                            Tìm kiếm tình huống
                        </Text>
                        <TextInput
                            value={textSearch}
                            onChangeText={onChange}
                            placeholderTextColor={"#ffffff"}
                            style={[
                                { position: "relative" },
                                styles.fontStyle,
                                styles.inputStyle
                            ]} />
                    </View>
                </KeyboardAvoidingView> */}
                <ScrollView
                    style={{
                        paddingHorizontal: 16,
                    }}
                >
                    <View>
                        {checkData.data.map((it: any, index: number) => {
                            let condtion: any[] = [];
                            condtion = listCheck.filter(item => item.id == it.id)
                            if (it.primary && checkData.label === "Trực điều hành") {
                                return (
                                    <View key={index}>
                                        <View
                                            style={styles.checkBoxContainer}
                                        >
                                            <RadioButton color="#1C1C1E" value={it.id} status={`${condtion[0]?.id == it.id ? "checked" : "unchecked"}`} onPress={() => onChangeCheck(it)} />
                                            <View
                                                style={styles.flex1}
                                            >
                                                <Text style={styles.textBox}>{it.primary}</Text>
                                            </View>
                                            {
                                                condtion[0]?.id == it.id
                                                &&
                                                <TouchableOpacity onPress={() => onOpenModal(it)}>
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
                            else if (it.secondary && checkData.label === "Trực hiệp đồng") {
                                return (
                                    <View key={index}>
                                        <View
                                            style={styles.checkBoxContainer}
                                        >
                                            <RadioButton color="#1C1C1E" value={it.id} status={`${condtion[0]?.id == it.id ? "checked" : "unchecked"}`} onPress={() => onChangeCheck(it)} />
                                            <View
                                                style={styles.flex1}
                                            >
                                                <Text style={styles.textBox}>{it.secondary}</Text>
                                            </View>
                                            {
                                                condtion[0]?.id == it.id
                                                &&
                                                <TouchableOpacity onPress={() => onOpenModal(it)}>
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
                        }
                        )}
                    </View>
                </ScrollView>
            </View >
            <ModalNote
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setListCheck={setListCheck}
                dataModal={dataModal}
                listCheck={listCheck}
            />
            <SignatureModal
                modalVisible={modalSignature}
                setModalVisible={setModalSignature}
                setSignature={setSignature}
            />
            <DialogNotificationCommon
                visible={isDialogConfirm}
                onConfirm={onCloseDialogConfirm}
                message={"Bạn đã xuất File PDF thành công"}
            />
        </MainLayout >
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    content: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
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
        marginBottom: 16,
        elevation: 3,
    },
    paddingName: {
        borderBottomColor: "#191313",
        borderBottomWidth: 2,
        // marginBottom: 10,
        // backgroundColor: "#FBF1EF",
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    textTitle: {
        color: "#191313",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 14,
    },
    textSelect: {
        color: "#FFFFFF",
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
    btnSignature: {
        backgroundColor: "#8687E7",
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    labelStyle: {
        color: "#2C2C2E",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 14,
        position: "absolute",
        top: -4,
        marginTop: 4
    },

    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2E",
        marginBottom: 12
    },
    fontStyle: {
        color: "#2C2C2E",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

})
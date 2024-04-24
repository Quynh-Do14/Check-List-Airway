import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout';
import { Checkbox, RadioButton } from 'react-native-paper';
import { data, user } from "../../core/common/data";
import { useRecoilValue } from 'recoil';
import { ListCheckState } from '../../core/atoms/listCheck/listCheckState';
import Constants from '../../core/common/constant';
const DetailScreen = ({ navigation }: any) => {
    const [value, setValue] = useState<string>("1");
    const [listCheck, setListCheck] = useState<Array<any>>([]);

    const checkData = useRecoilValue(ListCheckState);

    const date = new Date();
    const onBack = () => {
        navigation.goBack()
    }
    const onChangeCheck = (value: any) => {
        const arr = [{
            ...value,
            submitTime: date
        }]
        setListCheck([
            ...listCheck,
            arr,
        ])
        listCheck?.map(it => {
            if (it.id == value.id) {
                setListCheck(prev => prev?.filter(it => it.id !== value.id))
            }
        })
    }

    return (
        <MainLayout
            title={checkData.label}
            onGoBack={onBack}
            isBackButton={true}
        >
            <View style={styles.content}>
                <View style={styles.paddingName}>
                    <Text style={styles.textTitle}>
                        {checkData.checkName}
                    </Text>
                </View>
                <ScrollView style={{
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                }}>


                    <View>
                        {checkData.data.map((it: any, index: number) => {
                            let condtion: any[] = [];
                            condtion = listCheck.filter(item => item.id == it.id)
                            return (
                                <View key={index}>
                                    <View
                                        style={styles.checkBoxContainer}
                                    >
                                        <RadioButton color="#e5e5e5" value={it.id} status={`${condtion[0]?.id == it.id ? "checked" : "unchecked"}`} onPress={() => onChangeCheck(it)} />
                                        <View
                                            style={styles.flex1}
                                        >
                                            <Text style={styles.textBox}>{
                                                checkData.label && checkData.label === "Trực điều hành"
                                                    ?
                                                    it.primary
                                                    :
                                                    checkData.label && checkData.label === "Trực hiệp đồng"
                                                    &&
                                                    it.secondary
                                            }</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        )}
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
        </MainLayout >
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#1C1C1E",
        borderWidth: 4,
        borderColor: "#363636",
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
        backgroundColor: "#363636",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 16
    },
    paddingName: {
        borderBottomColor: "#979797",
        borderBottomWidth: 2,
        marginBottom: 10,
        backgroundColor: "#363636",
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    textTitle: {
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 16,
    },
    textBox: {
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "500",
        fontSize: 14,
    },
})
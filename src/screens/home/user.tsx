import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { Button, List, RadioButton } from "react-native-paper";
import { useState, useMemo, useRef, useEffect } from "react";
import { data, user } from "../../core/common/data";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserSelectState } from "../../core/atoms/userSelect/userSelectState";
import Constants from "../../core/common/constant";
import { ListCheckState } from "../../core/atoms/listCheck/listCheckState";
const HomeScreen = ({ navigation }: any) => {
    const [, setDataUser] = useRecoilState<any>(UserSelectState);
    const [listCheckPrimary, setListCheckPrimary] = useState<Array<any>>([]);
    const [listCheckSecond, setListCheckSecond] = useState<Array<any>>([]);
    const [tab, setTab] = useState<number>(0);
    const checkData = useRecoilValue(ListCheckState);

    const onChangeCheckPrimary = (value: any, type: string) => {
        setListCheckPrimary([
            {
                id: value.id,
                position: value.position,
                name: value.name,
                type: type
            }])
    }

    const onChangeCheckSecond = (value: any, type: string) => {
        setListCheckSecond([
            {
                id: value.id,
                position: value.position,
                name: value.name,
                type: type
            }])
    }


    const onNavigateDetail = () => {
        setDataUser([
            ...listCheckPrimary,
            ...listCheckSecond
        ])
        navigation.navigate(
            "DetailScreen",
        );
    }
    const onBack = () => {
        navigation.goBack()
    }

    return (
        <MainLayout
            title={"Trang chủ"}
            onGoBack={onBack}
            isBackButton={true}
        >
            <View style={styles.content}>
                <View style={[
                    styles.paddingName,
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }]}>
                    <TouchableOpacity
                        style={styles.btnExport}
                        onPress={onNavigateDetail}
                    >
                        <Text style={styles.textSelect}>
                            Chuyển sang trang Check List
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.paddingName,
                        {
                            display: "flex",
                            flexDirection: "row",
                            gap: 8
                        }
                    ]}>
                    {Constants.Type.List.map((it, index) => {
                        return (
                            <Pressable
                                style={tab == index ? styles.tabAcitve : styles.tab}
                                onPress={() => setTab(index)}
                                key={index}>
                                <Text
                                    style={tab == index ? styles.textSelect : styles.textTitle}
                                >{it.label}</Text>
                            </Pressable>
                        )
                    })}
                </View>
                <ScrollView>
                    {/* <View>
                        {user.map((it: any, index: number) => (
                            <View
                                key={index}
                            >
                                <TouchableOpacity
                                    onPress={() => onChangeSelect(index)}
                                >
                                    <View
                                        style={styles.checkBoxContainer}
                                    >
                                        <View style={styles.flexBox}>
                                            <Text style={styles.textSelect}>{it.name}</Text>
                                            <Image source={require('../../../assets/images/arrowLeft.png')} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        padding: 8
                                    }}>
                                    {
                                        listSelect.includes(index)
                                            ?
                                            Constants.Type.List.map((item, indexX) => (
                                                <View
                                                    style={styles.boxContainerSelect}
                                                    key={indexX}
                                                >
                                                    <TouchableOpacity
                                                        style={styles.touchNavigate}
                                                    // onPress={() => onNavigateDetail(it.content, it.title, item.label)}
                                                    >
                                                        <Text style={styles.textSelect}>
                                                            {item.label}
                                                        </Text>
                                                        <Image source={require('../../../assets/images/arrowLeft.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            ))
                                            : null
                                    }
                                </View>
                            </View>
                        ))}
                    </View> */}
                    {
                        tab == 0
                            ?
                            <View>
                                {user.map((it: any, index: number) => {
                                    let condtion: any[] = [];
                                    condtion = listCheckPrimary.filter(item => item.id == it.id)
                                    return (
                                        <View key={index}>
                                            <View
                                                style={styles.checkBoxContainer}
                                            >
                                                <RadioButton color="#191313" value={it.id} status={`${condtion[0]?.id == it.id ? "checked" : "unchecked"}`} onPress={() => onChangeCheckPrimary(it, "Trực điều hành")} />
                                                <View
                                                    style={styles.flex1}
                                                >
                                                    <Text style={styles.textSelect}>{it.name}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    )
                                }
                                )}
                            </View>
                            :
                            <View>
                                {user.map((it: any, index: number) => {
                                    let condtion: any[] = [];
                                    condtion = listCheckSecond.filter(item => item.id == it.id)
                                    return (
                                        <View key={index}>
                                            <View
                                                style={styles.checkBoxContainer}
                                            >
                                                <RadioButton color="#191313" value={it.id} status={`${condtion[0]?.id == it.id ? "checked" : "unchecked"}`} onPress={() => onChangeCheckSecond(it, "Trực hiệp đồng")} />
                                                <View
                                                    style={styles.flex1}
                                                >
                                                    <Text style={styles.textBox}>{it.name}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    )
                                }
                                )}
                            </View>
                    }

                </ScrollView>
            </View>
        </MainLayout >
    )
}

export default HomeScreen
const styles = StyleSheet.create({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flex1: {
        flex: 1
    },
    content: {
        backgroundColor: "#FBF1EF",
        height: "100%",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    boxContainerSelect: {
        backgroundColor: "#979797",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 8
    },
    touchNavigate: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    checkBoxContainer: {
        backgroundColor: "#8687E7",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 16
    },
    flexBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    paddingName: {
        borderBottomColor: "#979797",
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingVertical: 10
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
    textSelect: {
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 14,
    },
    tabAcitve: {
        backgroundColor: "#8687E7",
        paddingHorizontal: 4,
        paddingVertical: 6,
        borderRadius: 4,
    },
    tab: {
        paddingHorizontal: 4,
        paddingVertical: 6,
        borderRadius: 4,
    },
    btnExport: {
        backgroundColor: "#e2213e",
        borderRadius: 4,
        padding: 8
    },
})
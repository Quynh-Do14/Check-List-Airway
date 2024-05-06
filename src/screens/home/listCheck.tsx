import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { Button, List, RadioButton, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { data } from "../../core/common/data";
import Constants from "../../core/common/constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserSelectState } from "../../core/atoms/userSelect/userSelectState";
import { ListCheckState } from "../../core/atoms/listCheck/listCheckState";

const ListCheckScreen = ({ navigation }: any) => {
    const [, setDataCheck] = useRecoilState<any>(ListCheckState);
    const userSelect = useRecoilValue(UserSelectState).data;
    const [textSearch, setTextSearch] = useState<string>("");
    const [dataFilter, setDataFilter] = useState<Array<any>>([]);

    console.log("userSelect", userSelect);

    const onNavigateDetail = (content: Array<any>, checkName: string) => {
        setDataCheck({
            label: userSelect.label,
            checkName: checkName,
            userSelect: userSelect,
            data: content
        })
        navigation.navigate(
            "DetailScreen",
        );
        setTextSearch("")
    }

    const onBack = () => {
        navigation.goBack()
    }

    const onChange = (value: string) => {
        setTextSearch(value)
        let arrConvert = data.filter((it: any) => it.title.toLowerCase().includes(value.toLowerCase()))
        setDataFilter(arrConvert)

    }
    useEffect(() => {
        setDataFilter(data)
    }, [data])

    return (
        <MainLayout
            title={"Tình huống"}
            onGoBack={onBack}
            isBackButton={true}
        >
            <KeyboardAvoidingView
                style={{
                    paddingHorizontal: 16,
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
            </KeyboardAvoidingView>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.paddingName}>
                        <Text style={styles.textTitle}>
                            {userSelect.name} - {userSelect.position}
                        </Text>
                    </View>
                    {
                        dataFilter.map((it, index) => {
                            return (
                                <View key={index}>
                                    <Pressable onPress={() => onNavigateDetail(it.content, it.title)}>
                                        <View
                                            style={styles.checkBoxContainer}
                                        >
                                            <View style={styles.flexBox}>
                                                <Text style={styles.textSelect}>{index + 1}. {it.title}</Text>
                                                {/* <Image source={require('../../../assets/images/arrowLeft.png')} /> */}
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </MainLayout >
    )
}

export default ListCheckScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#FBF1EF",
        height: "100%",
        elevation: 6,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    flexBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    checkBoxContainer: {
        backgroundColor: "#8687E7",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 16
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
        fontSize: 16,
    },
    textSelect: {
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 14,
    },
    labelStyle: {
        color: "#2C2C2E",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 14,
        position: "absolute",
        top: 0,
        zIndex: 9
    },

    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2E",
        marginBottom: 12,
        backgroundColor: "#f8ded9",
    },
    fontStyle: {
        color: "#2C2C2E",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
})
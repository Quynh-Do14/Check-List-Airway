import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { Button, List, RadioButton } from "react-native-paper";
import { useState } from "react";
import { data } from "../../core/common/data";
import Constants from "../../core/common/constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserSelectState } from "../../core/atoms/userSelect/userSelectState";
import { ListCheckState } from "../../core/atoms/listCheck/listCheckState";

const ListCheckScreen = ({ navigation }: any) => {
    const [, setDataCheck] = useRecoilState<any>(ListCheckState);

    const onNavigateDetail = (it: object) => {
        setDataCheck({
            data: it
        })
        navigation.navigate(
            "HomeScreen",
        );
    }


    return (
        <MainLayout
            title={"Danh sách"}
        >
            <View style={styles.content}>
                <View style={styles.paddingName}>
                    <Text style={styles.textTitle}>
                        Danh sách
                    </Text>
                </View>
                <ScrollView>
                    <View>
                        {
                            data.map((it, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            marginBottom: 16
                                        }}
                                    >
                                        <TouchableOpacity onPress={() => onNavigateDetail(it)}>
                                            <View
                                                style={styles.boxContainer}
                                            >
                                                <Text style={styles.textSelect}>
                                                    {it.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </MainLayout>
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
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    boxContainer: {
        backgroundColor: "#8687E7",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
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
})
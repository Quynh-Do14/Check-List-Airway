import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { Button, List, RadioButton } from "react-native-paper";
import { useState } from "react";
import { data, user } from "../../core/common/data";
import { useRecoilState } from "recoil";
import { UserSelectState } from "../../core/atoms/userSelect/userSelectState";

const HomeScreen = ({ navigation }: any) => {
    const [, setDataUser] = useRecoilState<any>(UserSelectState);
    const onNavigateDetail = (it: object) => {
        setDataUser({
            data: it
        })
        navigation.navigate(
            "ListCheckScreen",
        );
    }
    return (
        <MainLayout
            title={"Trang chủ"}
        >
            <View style={styles.content}>
                <View style={styles.paddingName}>
                    <Text style={styles.textTitle}>
                        Danh sách
                    </Text>
                </View>
                <ScrollView>
                    <View>
                        {user.map((it: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => onNavigateDetail(it)}
                            >
                                <View
                                    style={styles.checkBoxContainer}
                                >
                                    <View style={styles.flexBox}>
                                        <Text style={styles.textTitle}>{it.name}</Text>
                                        <Image source={require('../../../assets/images/arrowLeft.png')} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
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
    content: {
        backgroundColor: "#363636",
        height: "100%",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    checkBoxContainer: {
        backgroundColor: "#8687E7",
        gap: 4,
        paddingHorizontal: 10,
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
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 16,
    },
})
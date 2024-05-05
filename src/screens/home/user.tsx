import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { Button, List, RadioButton } from "react-native-paper";
import { useState } from "react";
import { data, user } from "../../core/common/data";
import { useRecoilState } from "recoil";
import { UserSelectState } from "../../core/atoms/userSelect/userSelectState";
import Constants from "../../core/common/constant";
import DialogConfirmCommon from "../../infrastructure/common/components/dialog/dialogConfirm";

const HomeScreen = ({ navigation }: any) => {
    const [, setDataUser] = useRecoilState<any>(UserSelectState);
    const [listSelect, setListSelect] = useState<Array<any>>([]);
    const [isDialogLogout, setIsDialogLogout] = useState(false);

    const onNavigateDetail = (it: object, label: string) => {
        setDataUser({
            data: {
                ...it,
                label: label
            }
        })
        navigation.navigate(
            "ListCheckScreen",
        );
    }

    const onChangeSelect = (value: number) => {
        setListSelect([
            ...listSelect,
            value
        ])
        listSelect?.map(it => {
            if (it == value) {
                setListSelect(prev => prev?.filter(it => it !== value))
            }
        })
    }

    const onLogout = () => {
        navigation.navigate(
            "LoginScreen",
        );
    }
    const onCloseDialogLogout = () => {
        setIsDialogLogout(false)
    }
    const onOpenDialogLogout = () => {
        setIsDialogLogout(true)
    }
    return (
        <MainLayout
            title={"Trang chủ"}
            onGoBack={onOpenDialogLogout}
            isBackButton={true}
            logout={true}
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
                            <View
                                key={index}
                            >
                                <Pressable
                                    onPress={() => onChangeSelect(index)}
                                >
                                    <View
                                        style={styles.boxContainer}
                                    >
                                        <Text style={styles.textSelect}>
                                            {it.name}
                                        </Text>
                                    </View>
                                </Pressable>

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
                                                        onPress={() => onNavigateDetail(it, item.label)}
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
                    </View>
                </ScrollView>
            </View >
            <DialogConfirmCommon
                visible={isDialogLogout}
                onConfirm={onLogout}
                message={"Bạn có muốn đăng xuất khỏi hệ thống??"}
                onCancel={onCloseDialogLogout} />
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
        backgroundColor: "#FBF1EF",
        height: "100%",
        elevation: 6,
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
})
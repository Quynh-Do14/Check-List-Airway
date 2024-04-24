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
    const [listSelect, setListSelect] = useState<Array<any>>([]);
    const [, setDataCheck] = useRecoilState<any>(ListCheckState);
    const userSelect = useRecoilValue(UserSelectState).data;

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

    const onNavigateDetail = (content: Array<any>, checkName: string, label: string) => {
        setDataCheck({
            label: label,
            checkName: checkName,
            data: content
        })
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
                <View style={styles.paddingName}>
                    <Text style={styles.textTitle}>
                        {userSelect.name} - {userSelect.position}
                    </Text>
                </View>
                {
                    data.map((it, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={() => onChangeSelect(index)}>
                                    <View
                                        style={styles.boxContainer}
                                    >
                                        <Text style={styles.textSelect}>
                                            {it.title}
                                        </Text>
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
                                                        onPress={() => onNavigateDetail(it.content, it.title, item.label)}>
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
                        )
                    })
                }
                {/* <List.Section title="Accordions">
                    {
                        data.map((it, index) => {
                            return (
                                <List.Accordion
                                    style={styles.boxContainer}
                                    key={index}
                                    title={
                                        <Text style={styles.textTitle}>
                                            {it.title}
                                        </Text>
                                    }
                                    left={props => <List.Icon {...props} icon="folder" />}
                                >
                                    {
                                        Constants.Type.List.map((item, indexX) => (
                                            <List.Item
                                                key={indexX}
                                                title={
                                                    <TouchableOpacity onPress={() => onNavigateDetail(it.content)}>
                                                        <Text style={styles.textTitle}>
                                                            {item.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                }
                                            />
                                        ))
                                    }


                                </List.Accordion>
                            )
                        })
                    }
                </List.Section> */}
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
        backgroundColor: "#363636",
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
        color: "#FFFFFF",
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
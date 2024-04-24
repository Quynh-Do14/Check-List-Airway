import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, KeyboardAvoidingView } from 'react-native';
type Props = {
    modalVisible: boolean,
    setModalVisible: Function,
    dataModal: any
    listCheck: Array<any>,
    setListCheck: Function,
}
const ModalNote = (props: Props) => {
    const { modalVisible, setModalVisible, dataModal, listCheck, setListCheck } = props
    const [note, setNote] = useState<string>('')

    const onSaveNote = () => {
        listCheck?.map(it => {
            if (it.id == dataModal.id) {
                setListCheck((prev: any[]) => prev?.map((it) => {
                    it.note = note
                    return it
                }))
            }
        })
        setModalVisible(!modalVisible)
    }
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={styles.paddingName}>
                            <Text style={styles.textTitle}>
                                Thêm ghi chú
                            </Text>
                        </View>
                        <View style={{ width: "100%" }}>
                            <View>
                                <TextInput
                                    numberOfLines={4}
                                    multiline={true}
                                    returnKeyType="done"
                                    value={note}
                                    onChangeText={(e) => setNote(e)}
                                    placeholderTextColor={"#ffffff"}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle
                                    ]} />
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Đóng</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={onSaveNote}>
                                <Text style={styles.textStyle}>Lưu</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: "#363636",
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    btnContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
    button: {
        borderRadius: 12,
        elevation: 2,
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: '#cb3837',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    fontStyle: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

    labelStyle: {
        color: "#D0FD3E",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 12,
    },

    inputStyle: {
        borderWidth: 1,
        borderColor: "#979797",
        marginBottom: 12
    },
    paddingName: {
        borderBottomColor: "#979797",
        borderBottomWidth: 2,
        backgroundColor: "#363636",
        paddingVertical: 4,
        width: "100%",
        marginBottom:16
    },
    textTitle: {
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 16,
    },
});

export default ModalNote;
import React, { useRef } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Modal,
    Alert,
    Pressable,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
type Props = {
    modalVisible: boolean,
    setModalVisible: Function,
    setSignature: Function,
}
const Signature = (props: Props) => {
    const { modalVisible, setModalVisible, setSignature } = props
    const signatureRef = useRef<any>(null);

    const saveSign = () => {
        signatureRef.current.saveImage();
    };

    const resetSign = () => {
        signatureRef.current.resetImage();
    };

    const onSaveEvent = (result: any) => {
        console.log("result", result.pathName);
        setSignature(result.pathName);
        setModalVisible(false);
    };

    const onDragEvent = () => {
        console.log('dragged');
    };
    const onCloseModal = () => {
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
                                Kí tên
                            </Text>
                        </View>
                        <View style={{ width: "100%", height: "60%" }}>
                            <SignatureCapture
                                style={[{ flex: 1 }, styles.signature]}
                                ref={signatureRef}
                                onSaveEvent={onSaveEvent}
                                onDragEvent={onDragEvent}
                                saveImageFileInExtStorage={false}
                                showNativeButtons={false}
                                showTitleLabel={false}
                                backgroundColor="#FFFFFF"
                                strokeColor="#191313"
                                // minStrokeWidth={4}
                                // maxStrokeWidth={4}
                                viewMode={'portrait'}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={onCloseModal}>
                                <Text style={styles.textStyle}>Đóng</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonReset]}
                                onPress={resetSign}>
                                <Text style={styles.textStyle}>Kí lại</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={saveSign}>
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
        marginTop: 10,
    },
    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: "#363636",
        borderRadius: 20,
        padding: 16,
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
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 3,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
        borderRadius: 12,
    },
    btnContainer: {
        marginTop: 12,
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
    buttonReset: {
        backgroundColor: '#37abcb',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paddingName: {
        borderBottomColor: "#979797",
        borderBottomWidth: 2,
        backgroundColor: "#363636",
        paddingVertical: 4,
        width: "100%",
        marginBottom: 16
    },
    textTitle: {
        color: "#FFFFFF",
        textAlign: "left",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 16,
    },
});

AppRegistry.registerComponent('Signature', () => Signature);

export default Signature;

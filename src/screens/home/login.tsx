import { useState } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, Text, Easing, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';


const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLoginAsync = async () => {
        navigation.navigate(
            "HomeScreen",
            {},
        )
    }
    return (
        <View style={styles.container}>

            <View style={[
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }
            ]}>

                <Image
                    source={require("../../../assets/images/loginBg.jpg")}
                    resizeMode={"contain"}
                    style={{ width: 400, height: 200 }}
                />
            </View>
            <View style={[
                {
                    height: '60%',
                    paddingVertical: 30,
                    paddingHorizontal: 30,
                }
            ]}>
                <ScrollView>
                    <View style={[
                        styles.flexCol,
                        {
                            gap: 20,
                            justifyContent: "space-between",
                            height: "100%"
                        }
                    ]}>
                        <KeyboardAvoidingView>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20
                                }}
                            >
                                <TextInput
                                    placeholder='Tên đăng nhập'
                                    placeholderTextColor={"#191313"}
                                    onChangeText={(e) => setUsername(e)}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle
                                    ]} />
                                <TextInput
                                    placeholder='Mật khẩu'
                                    placeholderTextColor={"#191313"}
                                    onChangeText={(e) => setPassword(e)}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle
                                    ]}
                                    secureTextEntry={true}
                                />
                                {/* <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-end"
                                    }}>
                                    <TouchableOpacity
                                        onPress={onForgotPassword}
                                    >
                                        <Text style={{
                                            fontSize: 13,
                                            fontWeight: "500",
                                            color: "#D0FD3E"
                                        }}>Quên mật khẩu</Text>
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity
                            style={[
                                styles.btnStyle
                            ]}
                            onPress={onLoginAsync}
                        >
                            <Text
                                style={[
                                    styles.fontStyle,
                                    {
                                        color: "#1C1C1E",
                                    }
                                ]}
                            > Đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default LoginScreen
const styles = StyleSheet.create({
    container: {
        // display: "flex",
        // flexDirection: "column",
        backgroundColor: "#FFFFFF",
        paddingTop: 24
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    section: {
        height: '50%',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    fontStyle: {
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    activeTab: {
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderBottomColor: "#D0FD3E"
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2E",
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})
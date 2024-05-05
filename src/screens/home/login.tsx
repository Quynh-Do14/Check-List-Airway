import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import { account } from '../../core/common/data';
import { Button, IconButton } from 'react-native-paper';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDialogNoti, setIsDialogNoti] = useState(false);

    console.log('username', username);
    console.log('password', password);

    const onCloseDialogNoti = () => {
        setIsDialogNoti(false)
    }
    const onLoginAsync = async () => {
        if (username && password) {
            account.map((it) => {
                if (it.username == username && it.password == password) {
                    navigation.navigate(
                        "HomeScreen",
                        {},
                    );
                    setUsername("");
                    setPassword("");
                }
                else {
                    setIsDialogNoti(true)
                }
            })
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
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
                                    value={username}
                                    style={[
                                        styles.fontStyle,
                                        styles.inputStyle
                                    ]} />
                                <View>
                                    <TextInput
                                        placeholder='Mật khẩu'
                                        placeholderTextColor={"#191313"}
                                        onChangeText={(e) => setPassword(e)}
                                        value={password}
                                        style={[
                                            styles.fontStyle,
                                            styles.inputStyle,
                                            {
                                                position: "relative"
                                            }
                                        ]}
                                        secureTextEntry={showPassword}
                                    />
                                    <Pressable onPress={toggleShowPassword} style={styles.icon}>
                                        {
                                            showPassword
                                                ?
                                                <Image source={require("../../../assets/images/hide.png")} />
                                                :
                                                <Image source={require("../../../assets/images/open.png")} />
                                        }
                                    </Pressable>
                                </View>
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
                </View>
            </ScrollView>
            <DialogNotificationCommon
                visible={isDialogNoti}
                onConfirm={onCloseDialogNoti}
                message={"Tài khoản đăng nhập không chính xác"}
            />
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
    icon: {
        padding: 8,
        position: "absolute",
        right: 0,
        top: 4
    },
})
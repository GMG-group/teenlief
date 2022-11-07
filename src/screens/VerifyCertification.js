import React, { useState } from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import { useRecoilState } from "recoil";
import { SCREEN, userState } from "@apis/atoms";
import useApi from "@apis/useApi";
import { getUser, verifyCertificate } from "@apis/apiServices";
import { vh, vw } from "react-native-css-vh-vw";

const VerifyCertification = ({ navigation }) => {
    const [user, setUser] = useRecoilState(userState);

    const [code, setCode] = useState("");

    const [getUserLoading, getUserResult, getUserApi] = useApi(getUser, true);
    const [verifyCertificateLoading, verifyCertificateResult, verifyCertificateApi] = useApi(verifyCertificate, true);

    const requestVerifyCertificate = () => {
        const formData = new FormData();
        formData.append("code", code);
        verifyCertificateApi(formData)
            .then((res) => {
                console.log(res);
                getUserApi()
                    .then((res) => {
                        setUser(res);
                        navigation.navigate(SCREEN.Home);
                    })
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.textContainer}>
                <View style={{ marginBottom: vh(1) }}>
                    <Text style={styles.mainText}>문자로 받은 인증 번호를 입력해주세요.</Text>
                </View>
                <TextInput style={{ borderBottomWidth: 1 }} value={code} onChangeText={setCode} />
            </View>

            <TouchableHighlight
                style={styles.submitButton}
                onPress={requestVerifyCertificate}
            >
                <View>
                    <Text style={{ color: 'white' }}>확 인</Text>
                </View>
            </TouchableHighlight>
        </KeyboardAvoidingView>
    );
};

export default VerifyCertification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: vw(5)
    },
    textContainer: {
        marginTop: vh(16)
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#252525"
    },
    subText: {
        fontSize: 16,
        color: "#969696"
    },
    submitButton: {
        width: '100%',
        height: vh(6),
        backgroundColor: '#252525',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: vh(4)
    }
});
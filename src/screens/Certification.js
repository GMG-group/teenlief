import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {useRecoilState} from "recoil";
import {ACTION, SCREEN, actionState, userState} from "@apis/atoms";
import useApi from "@apis/useApi";
import {getUser, postCertificate} from "@apis/apiServices";
import {vh, vw} from "react-native-css-vh-vw";
import VerifyCertification from "@screens/VerifyCertification";

const Certification = ({ navigation }) => {
    const [action, setAction] = useRecoilState(actionState);
    const [user, setUser] = useRecoilState(userState);

    const [phone, setPhone] = useState("");

    const [getUserLoading, getUserResult, getUserApi] = useApi(getUser, true);
    const [postCertificateLoading, postCertificateResult, postCertificateApi] = useApi(postCertificate, true);


    const requestCertificate = () => {
        const formData = new FormData();
        formData.append("phone", phone);
        postCertificateApi(formData)
            .then((res) => {
                if (res.status === "success") {
                    navigation.push(SCREEN.VerifyCertification);
                }
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.textContainer}>
                <View style={{ marginBottom: vh(1) }}>
                    <Text style={styles.mainText}>이름과 휴대폰 번호를 입력해주세요.</Text>
                    <Text style={styles.subText}>본인 인증을 위해 필요합니다.</Text>
                </View>
                <TextInput style={{ borderBottomWidth: 1, marginBottom: vh(2) }} placeholder={"이름"} />
                <TextInput style={{ borderBottomWidth: 1 }} value={phone} onChangeText={setPhone} placeholder={"전화번호"} />

            </View>

            <TouchableHighlight
                style={styles.submitButton}
                onPress={requestCertificate}
            >
                <View>
                    <Text style={{ color: 'white' }}>확 인</Text>
                </View>
            </TouchableHighlight>
        </KeyboardAvoidingView>
    );
};

export default Certification;

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
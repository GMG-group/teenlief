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
                    <Text style={styles.mainText}>휴대폰 번호를 입력해주세요.</Text>
                    <Text style={styles.subText}>본인 인증을 위해 필요합니다.</Text>
                </View>
                <TextInput style={{ borderBottomWidth: 1 }} value={phone} onChangeText={setPhone} />
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

/*
 1. 프론트 -> 백 인증 요청
 2. 백에서 랜덤 6자리 문자 생성 후 db에 user, expire time과 함께 저장
 3. 위에서 생성한 랜덤 6자리 문자로 사용자에게 문자 전송
 4. 문자가 도착한 사용자는 프론트에 문자로 받은 랜덤 6자리 문자 입력
 5. 백에 사용자로부터 입력받은 랜덤 6자리 문자 전송
 6. db에서 user로 인증 정보를 불러와 문자 인증 번호가 맞는지 검증
 7. 맞으면 user.certificate를 1로 바꿈
 */
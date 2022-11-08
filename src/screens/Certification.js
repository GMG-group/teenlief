import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import {useRecoilState} from "recoil";
import {ACTION, SCREEN, actionState, userState} from "@apis/atoms";
import useApi from "@apis/useApi";
import {getUser, postCertificate} from "@apis/apiServices";
import {vh, vw} from "react-native-css-vh-vw";
import SwitchSelector from "react-native-switch-selector";

const AnimationSwitchSelector = Animated.createAnimatedComponent(SwitchSelector);
const options = [
    { label: '남성', value: 'M' },
    { label: '여성', value: 'F' },
];

const Certification = ({ navigation }) => {
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("M");
    const [postCertificateLoading, postCertificateResult, postCertificateApi] = useApi(postCertificate, true);

    const requestCertificate = () => {
        const formData = new FormData();
        formData.append("gender", gender);
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
                    <Text style={styles.mainText}>이름과 성별, 휴대폰 번호를 입력해주세요.</Text>
                    <Text style={styles.subText}>본인 인증을 위해 필요합니다.</Text>
                </View>
                <TextInput style={{ borderBottomWidth: 1, marginBottom: vh(2) }} placeholder={"이름"} />
                <TextInput style={{ borderBottomWidth: 1 }} value={phone} onChangeText={setPhone} placeholder={"전화번호"} />
                <AnimationSwitchSelector
                    style={{ width: '100%', marginTop: vh(5) }}
                    options={options}
                    initial={0}
                    hasPadding={true}
                    textColor='black'
                    buttonColor={'#AE46FF'}
                    height={40}
                    onPress={(value) => setGender(value)}
                />
            </View>

            <TouchableHighlight
                style={styles.submitButton}이강혁
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
        fontSize: 18,
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
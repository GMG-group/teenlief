import React, {useEffect, useState, useRef} from "react";
import { View,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from "react-native";
import Background from "@components/Background";
import SocialLogin from "@components/SocialLogin";
import SwitchSelector from "react-native-switch-selector";
import { usePostRegistrationCallback } from "@apis/apiCallbackes";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Icon from 'react-native-vector-icons/Entypo';
import {SCREEN} from '@apis/atoms';

const options = [
    { label: '청소년', value: 'Teen' },
    { label: '헬퍼', value: 'Helper' },
];
const AnimationSwitchSelector = Animated.createAnimatedComponent(SwitchSelector);

const SignUp = ( { navigation } ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirm, setConfirm] = useState("");
    const [role, setRole] = useState("Teen");
    const [labelColor, setLabelColor] = useState('white');
    const [labelErrorMessage, setLabelErrorMessage] = useState('');
    const postRegistrationCallback = usePostRegistrationCallback();
    const backgroundAnimation = useRef(new Animated.Value(0)).current;
    const blobChangeAnimation = useRef(new Animated.Value(0)).current;
    const switchSelectorAnimation = useRef(new Animated.Value(0)).current;
    const [changeColor, setChangeColor] = useState('Teen');

    useEffect(() => {
        Animated.timing(switchSelectorAnimation, {
            toValue: changeColor === 'Teen' ? 0 : 1,
            useNativerDriver: true,
            duration: 1000,
        }).start();
    }, [switchSelectorAnimation, changeColor]);

    const signUpSubmit = () => {
        console.log(`이메일 :${email}`);
        console.log(`이름 :${name}`)
        console.log(`비밀번호 :${password}`)
        console.log(`비밀번호 확인 :${confirm}`)

        postRegistrationCallback({
            email: email,
            password1: password,
            password2: confirm,
            first_name: name,
            gender: "M",
            role: role
        })
        .then(r => {navigation.replace("Home")})
        .catch(error => {
            setLabelColor('#FB5644');
            setLabelErrorMessage('을 다시 입력해 주세요')
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background
                backgroundAnimation={backgroundAnimation}
                blobChangeAnimation={blobChangeAnimation}
                changeColor={changeColor}
                blobColor={blobChangeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#16A9FC', '#B355FC']
                })}
                color={backgroundAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#00A3FF', '#AE46FF'],
                })}
            />

            <View style={middleStyle.middleContainer}>
                <AnimationSwitchSelector
                    style={middleStyle.toggle}
                    options={options}
                    initial={0}
                    onPress={(value) => {
                        value === 'Teen' ? setChangeColor('Teen') : setChangeColor('Helper');
                        setRole(value);
                    }}
                    hasPadding={true}
                    textColor='gray'
                    buttonColor={backgroundAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#00A3FF', '#AE46FF'],
                    })}
                    height={33}
                />

                <FloatingLabelInput
                    label={'email' + labelErrorMessage}
                    value={email}
                    onChangeText={value => setEmail(value)}
                    animationDuration={150}
                    containerStyles={{
                        height: 60,
                        border: 'none',
                        borderBottomWidth: 2,
                        borderColor: labelColor,
                        marginBottom: 10,
                    }}
                    customLabelStyles={{
                        color: labelColor,
                        colorFocused: labelColor,
                        colorBlurred: labelColor,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 17,
                    }}
                />
                <FloatingLabelInput
                    label={'name' + labelErrorMessage}
                    value={name}
                    onChangeText={value => setName(value)}
                    animationDuration={150}
                    containerStyles={{
                        height: 60,
                        border: 'none',
                        borderBottomWidth: 2,
                        borderColor: labelColor,
                        marginBottom: 10,
                    }}
                    customLabelStyles={{
                        color: labelColor,
                        colorFocused: labelColor,
                        colorBlurred: labelColor,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 17,
                    }}
                />
                <FloatingLabelInput
                    label={'password' + labelErrorMessage}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    isPassword
                    animationDuration={150}
                    customShowPasswordComponent={<Icon name="eye" size={25} color={labelColor} />}
                    customHidePasswordComponent={<Icon name="eye-with-line" size={25} color={labelColor} />}
                    containerStyles={{
                        height: 60,
                        border: 'none',
                        borderBottomWidth: 2,
                        borderColor: labelColor,
                        marginBottom: 10,
                    }}
                    customLabelStyles={{
                        color: labelColor,
                        colorFocused: labelColor,
                        colorBlurred: labelColor,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 17,
                    }}
                />
                <FloatingLabelInput
                    label={'confirm' + labelErrorMessage}
                    value={confirm}
                    onChangeText={value => setConfirm(value)}
                    isPassword
                    animationDuration={150}
                    customShowPasswordComponent={<Icon name="eye" size={25} color={labelColor} />}
                    customHidePasswordComponent={<Icon name="eye-with-line" size={25} color={labelColor} />}
                    containerStyles={{
                        height: 60,
                        border: 'none',
                        borderBottomWidth: 2,
                        borderColor: labelColor,
                        marginBottom: 10,
                    }}
                    customLabelStyles={{
                        color: labelColor,
                        colorFocused: labelColor,
                        colorBlurred: labelColor,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 17,
                    }}
                />

            </View>

            <View style={bottomStyle.container}>
                <TouchableOpacity style={bottomStyle.login} onPress={() => signUpSubmit()}>
                    <View>
                        <Text style={bottomStyle.loginText}>회원가입</Text>
                    </View>
                </TouchableOpacity>

                <SocialLogin />

                <View style={bottomStyle.signupText}>
                    <Text style={{color: 'black'}}>계정이 있으신가요?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREEN.Login) }>
                        <Text style={{color: '#1E90FF'}}> 로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFAFA',
    },
});

const middleStyle = StyleSheet.create({
    middleContainer: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '20%'
    },
    text: {
        fontWeight: 'bold',
    },
    toggle: {
        marginBottom: 10,
        width: '50%'
    }
});

const bottomStyle = StyleSheet.create({
    container: {
        paddingBottom: '5%',
        alignItems: 'center',
    },
    login: {
        paddingTop: 17,
        paddingBottom: 17,
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'black',
        borderRadius: 10,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signupText: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignUp;
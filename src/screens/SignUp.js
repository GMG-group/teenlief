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
import CustomInput from "@components/CustomInput";
import SocialLogin from "@components/SocialLogin";
import SwitchSelector from "react-native-switch-selector";
import {usePostLoginCallback, usePostRegistrationCallback} from "@apis/apiCallbackes";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';
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
    const postRegistrationCallback = usePostRegistrationCallback();
    const backgroundAnimation = useRef(new Animated.Value(0)).current;
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
        }).then(r => {navigation.replace("Home")})
     }

    return (
        <SafeAreaView style={styles.container}>
            <Background backgroundAnimation={backgroundAnimation} changeColor={changeColor} color={backgroundAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#1E90FF', '#8A2BE2'],
                    })} />

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
                        outputRange: ['#1E90FF', '#8A2BE2'],
                    })}
                    height={33}
                />

                <CustomInput
                    placeHolder={"이메일"}
                    value={email}
                    setValue={setEmail}
                    />
                <CustomInput
                    placeHolder={"이름"}
                    value={name}
                    setValue={setName}
                />
                <CustomInput 
                    placeHolder={"비밀번호"} 
                    value={password} 
                    setValue={setPassword}
                />
                <CustomInput
                    placeHolder={"비밀번호 확인"}
                    value={confirm}
                    setValue={setConfirm}
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
                    <TouchableOpacity onPress={() => navigation.navigate('Login') }>
                        <Text style={{color: color}}> 로그인</Text>
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
        justifyContent: 'flex-start',
        height: 0.4*vh,
        marginLeft: '5%',
        marginRight: '5%',
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
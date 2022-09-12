import React, {useEffect, useState, useRef} from "react";
import { View,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from "react-native";
import SwitchSelector from 'react-native-switch-selector';
import Background from "@components/Background";
import CustomInput from "@components/CustomInput";
import SocialLogin from "@components/SocialLogin";
import {usePostLoginCallback} from "@apis/apiCallbackes";
import AnimatedInput from "react-native-animated-input";
import { FloatingLabelInput } from 'react-native-floating-label-input';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';
const options = [
    { label: '청소년', value: 'Teen' },
    { label: '헬퍼', value: 'Helper' },
];
// (value) => value === changeColor ? null : setChangeColor(!changeColor)
const AnimationSwitchSelector = Animated.createAnimatedComponent(SwitchSelector);

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const postLoginCallback = usePostLoginCallback();
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

    const submit = () => {
        console.log(`이메일 :${email}`);
        console.log(`비밀번호 :${password}`);
        postLoginCallback({
            email: email,
            password: password
        }).then(r => navigation.replace("Home")) ;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Background backgroundAnimation={backgroundAnimation} changeColor={changeColor} color={backgroundAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#1E90FF', '#8A2BE2'],
                    })} />

            {/* middle form */}
            <View style={middleStyle.middleContainer}>
                <AnimationSwitchSelector
                    style={middleStyle.toggle}
                    options={options}
                    initial={0}
                    onPress={(value) => value === 'Teen' ? setChangeColor('Teen') : setChangeColor('Helper')}
                    hasPadding={true}
                    textColor='gray'
                    buttonColor={backgroundAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#1E90FF', '#8A2BE2'],
                    })}
                    height={33}
                />
                <FloatingLabelInput
                    label={'label'}
                    isPassword
                    customShowPasswordComponent={<Text>Show</Text>}
                    customHidePasswordComponent={<Text>Hide</Text>}
                />
                <FloatingLabelInput
                    label={'label'}
                    isPassword
                    customShowPasswordComponent={<Text>Show</Text>}
                    customHidePasswordComponent={<Text>Hide</Text>}
                />

                <TouchableOpacity>
                    <Text style={middleStyle.text}>비밀번호를 잊으셨습니까?</Text>
                </TouchableOpacity>
            </View>
            {/* middle form end */}

            {/* bottom */}
            <View style={bottomStyle.container}>
                <TouchableOpacity style={bottomStyle.login} onPress={() => submit()}>
                    <View>
                        <Text style={bottomStyle.loginText}>로그인</Text>
                    </View>
                </TouchableOpacity>

                <SocialLogin navigation={navigation}/>

                <View style={bottomStyle.signupText}>
                    <Text style={{color: 'black'}}>계정이 없으신가요?</Text>
                    <TouchableOpacity onPress={() => navigation.push('Sign up')}>
                        <Text style={{color: color}}> 회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* bottom end */}

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
export default Login;

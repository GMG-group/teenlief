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
import Icon from 'react-native-vector-icons/Entypo';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { SCREEN } from '@apis/atoms';

const color = '#1E90FF';
const options = [
    { label: '청소년', value: 'Teen' },
    { label: '헬퍼', value: 'Helper' },
];

const AnimationSwitchSelector = Animated.createAnimatedComponent(SwitchSelector);

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailColor, setEmailColor] = useState('white');
    const [emailLabel, setEmailLabel] = useState('email');
    const [passwordColor, setPasswordColor] = useState('white');
    const [passwordLabel,  setPasswordLabel] = useState('passoword')
    const postLoginCallback = usePostLoginCallback();
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

    const submit = () => {
        console.log(`이메일 :${email}`);
        console.log(`비밀번호 :${password}`);
        if (email === '') {
            setEmailColor('red');
            setEmailLabel('email을 확인해 주세요');
        } else if (password === '') {
            setPasswordColor('red');
            setPasswordLabel('password를 확인해 주세요');
        }
        postLoginCallback({
            email: email,
            password: password
        }).then(r => navigation.replace("Home")) ;
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
                    onPress={(value) => value === 'Teen' ? setChangeColor('Teen') : setChangeColor('Helper')}
                    hasPadding={true}
                    textColor='gray'
                    buttonColor={backgroundAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#00A3FF', '#AE46FF'],
                    })}
                    height={33}
                />
                    <FloatingLabelInput
                        label={emailLabel}
                        value={email}
                        onChangeText={value => setEmail(value)}
                        containerStyles={{
                            height: 60,
                            border: 'none',
                            borderBottomWidth: 2,
                            borderColor: emailColor,
                            marginBottom: 10,
                        }}
                          customLabelStyles={{
                            color: emailColor,
                            colorFocused: emailColor,
                            colorBlurred: emailColor,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 17,
                        }}
                    />
                    <FloatingLabelInput
                        label={passwordLabel}
                        value={password}
                        onChangeText={value => setPassword(value)}
                        isPassword
                        customShowPasswordComponent={<Icon name="eye" size={25} color={passwordColor} />}
                        customHidePasswordComponent={<Icon name="eye-with-line" size={25} color={passwordColor} />}
                        containerStyles={{
                            height: 60,
                            border: 'none',
                            borderBottomWidth: 2,
                            borderColor: passwordColor,
                            marginBottom: 10,
                        }}
                          customLabelStyles={{
                            color: passwordColor,
                            colorFocused: passwordColor,
                            colorBlurred: passwordColor,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 17,
                        }}
                    />

                <TouchableOpacity>
                    <Text style={middleStyle.text}>비밀번호를 잊으셨습니까?</Text>
                </TouchableOpacity>
            </View>
            
            <View style={bottomStyle.container}>
                <TouchableOpacity style={bottomStyle.login} onPress={() => submit()}>
                    <View>
                        <Text style={bottomStyle.loginText}>로그인</Text>
                    </View>
                </TouchableOpacity>

                <SocialLogin navigation={navigation}/>

                <View style={bottomStyle.signupText}>
                    <Text style={{color: 'black'}}>계정이 없으신가요?</Text>
                    <TouchableOpacity onPress={() => navigation.push(SCREEN.SignUp)}>
                        <Text style={{color: color}}> 회원가입</Text>
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
        display: 'flex',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: 100,
    },
    text: {
        fontWeight: 'bold',
    },
    toggle: {
        width: '50%',
        marginBottom: 5,
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

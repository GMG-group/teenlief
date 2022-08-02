import React, {useEffect, useState} from "react";
import { View,
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
import {useRecoilValue, useSetRecoilState} from "recoil";
import {loginSelector} from "@apis/selectors"
import {LOGIN_POST_ERROR} from "@apis/types";
import {tokenState} from "@apis/atoms";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';
const options = [
    { label: '청소년', value: 'teen' },
    { label: '헬퍼', value: 'helper' },
];

const Login = ( { navigation } ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authObj, setAuthObj] = useState({email: "", password: ""})
    const loginResponse = useRecoilValue(loginSelector(authObj));
    const setToken = useSetRecoilState(tokenState);

    const submit = () => {
        console.log(`이메일 :${email}`);
        console.log(`비밀번호 :${password}`);
        setAuthObj({email: email, password: password});
    }

    useEffect(() => {
        console.log("loginResponse : ", loginResponse);
        if(loginResponse === LOGIN_POST_ERROR) {
            console.log("login fail!");
        } else {
            setToken({accessToken: loginResponse.access_token, refreshToken: loginResponse.refresh_token});
            navigation.push('Home');
        }
    },[JSON.stringify(loginResponse)]);

    return (
        <SafeAreaView style={styles.container}>
            
            <Background />

            {/* middle form */}
            <View style={middleStyle.middleContainer}>
                <SwitchSelector 
                    style={middleStyle.toggle}
                    options={options} 
                    initial={0} 
                    onPress={value => console.log(`전역 options변수 참조: ${value}`)} 
                    hasPadding={true}
                    textColor='gray'
                    buttonColor={color}
                    height={33}
                    />
                <CustomInput 
                    placeHolder={"email"} 
                    value={email}
                    setValue={setEmail}
                     />
                <CustomInput 
                    placeHolder={"password"} 
                    value={password}
                    setValue={setPassword}
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

                <SocialLogin />

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

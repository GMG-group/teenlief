import React, { useState, useRef, useEffect, Component } from "react";
import { View,
         StyleSheet,
         Text, 
         TouchableOpacity,
         Dimensions,
         SafeAreaView,
         Animated
         } from "react-native";
import SwitchSelector from 'react-native-switch-selector';
import Background from "@components/Background";
import CustomInput from "@components/CustomInput";
import SocialLogin from "@components/SocialLogin";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';
const options = [
    { label: '청소년', value: 'teen', activeColor: color},
    { label: '헬퍼', value: 'helper', activeColor: '#8A2BE2'},
];

const Login = ( { navigation } ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        console.log(`이메일 :${email}`);
        console.log(`비밀번호 :${password}`)
        setEmail("");
        setPassword("");
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Background />

            {/* middle form */}
            <View style={middleStyle.middleContainer}>
                <SwitchSelector
                    style={middleStyle.toggle}
                    options={options} 
                    initial={0} 
                    onPress={() => setChangeColor(!changeColor)} 
                    hasPadding={true}
                    textColor='gray'
                    height={33}
                    />

                <CustomInput 
                    placeHolder={"email"} 
                    value={email}
                    setValue={setEmail}
                    password={false}
                    />
                <CustomInput 
                    placeHolder={"password"} 
                    value={password}
                    setValue={setPassword}
                    password={true}
                    />

                <TouchableOpacity>
                    <Text style={middleStyle.text}>비밀번호를 잊으셨습니까?</Text>
                </TouchableOpacity>
            </View>
            {/* middle form end */}

            {/* bottom */}
            <View style={bottomStyle.container}>
                <TouchableOpacity style={bottomStyle.login} onPress={() => navigation.push('Home')}>
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
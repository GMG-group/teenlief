import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import SwitchSelector from 'react-native-switch-selector';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#00AAFF';
const options = [
    { label: '청소년', value: 'teen' },
    { label: '헬퍼', value: 'helper' },
];

const Login = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* back ground */}
            <View style={styles.background}/>
            {/* back ground end */}

            {/* top */}
            <Text style={styles.top}>청소년을 보호하기 위한 teenlief 앱 입니다.</Text>
            {/* top end */}

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
                    />
                <TextInput style={middleStyle.textInput} placeholder="email" />
                <TextInput style={middleStyle.textInput} placeholder="passowrd" />
                <TouchableOpacity>
                    <Text style={middleStyle.text}>비밀번호를 잊으셨습니까?</Text>
                </TouchableOpacity>
            </View>
            {/* middle form end */}

            {/* bottom */}
            <View style={bottomStyle.container}>
                <TouchableOpacity style={bottomStyle.login}>
                    <View>
                        <Text style={bottomStyle.loginText}>로그인</Text>
                    </View>
                </TouchableOpacity>

                <View style={bottomStyle.orLoginWith}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginTop: 10}} />
                        <View>
                            <Text style={{width: 100, textAlign: 'center', marginTop: 10}}>Or login with</Text>
                        </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginTop: 10}} />
                </View>

                <View style={bottomStyle.socialLoginContainer}>
                    <TouchableOpacity style={bottomStyle.socialLoginBox}>
                        <View />
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomStyle.socialLoginBox}>
                        <View />
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomStyle.socialLoginBox}>
                        <View />
                    </TouchableOpacity>
                </View>

                <View style={bottomStyle.signupText}>
                    <Text>계정이 없으신가요?</Text>
                    <TouchableOpacity>
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
        display: 'flex',
        height: 1 * vh,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: 0.63 * vh,
        backgroundColor: color,
        borderBottomRightRadius: 150,
        borderBottomLeftRadius: 40,
    },
    top: {
        marginTop: 60,
        marginLeft: 20,
        color: 'white',
        fontSize: 32,
        width: '70%',
    },
});

const middleStyle = StyleSheet.create({
    middleContainer: {
        justifyContent: 'flex-start',
        height: 0.3*vh,
        marginLeft: '5%',
        marginRight: '5%',
    },
    text: {
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
    },
    toggle: {
        marginBottom: 10,
        width: '50%'
    }
});

const bottomStyle = StyleSheet.create({
    container: {
        paddingBottom: 50,
        alignItems: 'center',
    },
    login: {
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'black',
        borderRadius: 10,
    },
    loginText: {
        color: 'white',
    },
    orLoginWith: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '90%',
        paddingTop: 5,
        paddingBottom: 5
    },
    socialLoginContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    socialLoginBox: {
        height: 50,
        width: '30%',        
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
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

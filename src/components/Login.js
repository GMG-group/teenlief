import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

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
            <View style={middleStyle.middle}>
                <TextInput placeholder="email" />
                <TextInput placeholder="passowrd" />
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

                <View style={{flexDirection: 'row', alignItems: 'center', width: '85%'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginTop: 10}} />
                        <View>
                            <Text style={{width: 100, textAlign: 'center', marginTop: 10}}>Or login with</Text>
                        </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginTop: 10}} />
                </View>

                <View>
                    <View />
                    <View />
                    <View />
                </View>

                <Text>계정이 없으신가요?
                    <TouchableOpacity>
                        <Text>회원가입</Text>
                    </TouchableOpacity>
                </Text>
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
        height: 0.6 * vh,
        backgroundColor: '#00AAFF',
        borderBottomRightRadius: 200,
        borderBottomLeftRadius: 50,
    },
    top: {
        marginTop: 100,
        marginLeft: 20,
        color: 'white',
        fontSize: 34,
        width: '70%',
    },
});

const middleStyle = StyleSheet.create({
    middle: {
        marginLeft: 20,
        marginBottom: 250,
    },
    text: {
        fontWeight: 'bold',
    }
});

const bottomStyle = StyleSheet.create({
    container: {
        marginBottom: 100,
        alignItems: 'center',
    },
    login: {
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        width: '85%',
        backgroundColor: 'black',
        borderRadius: 10,
    },
    loginText: {
        color: 'white',
    }
});
export default Login;

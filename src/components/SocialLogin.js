import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, Image } from "react-native";

const color = '#00AAFF';

const SocialLogin = () => {
    return (
        <View>
            <View style={styles.orLoginWith}>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginTop: 10}} />
                    <View>
                        <Text style={{width: 100, textAlign: 'center', marginTop: 10}}>Or login with</Text>
                    </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'gray', marginTop: 10}} />
            </View>

            {/* social login container here */}
            <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialLoginBox}>
                    <Image style={{width: '30%'}} source={require("./img/google.png")} resizeMode='contain' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLoginBox}>
                    <View />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLoginBox}>
                    <View />
                </TouchableOpacity>
            </View>
            {/* social login container end */}
        </View>
    );
}

const styles = StyleSheet.create({
    loginText: {
        color: 'white',
    },
    orLoginWith: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '90%',
        paddingTop: 13,
        paddingBottom: 13
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    socialLoginBox: {
        height: 45,
        width: '30%',        
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default SocialLogin;

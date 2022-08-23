import React, {useEffect, useState} from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, Image } from "react-native";
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import {useRecoilState} from "recoil";
import {tokenState} from "@apis/atoms";
import {usePostGoogleLoginFinishCallback} from "@apis/apiCallbackes";

const color = '#00AAFF';

GoogleSignin.configure({
    scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid'
    ], // what API you want to access on behalf of the user, default is email and profile
    webClientId: "674602775271-jtr4bh5savtt9p4q1shuieiqlt1l18dp.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const SocialLogin = ({navigation}) => {
    const [user, setUser] = useState();
    const [token, setToken] = useRecoilState(tokenState);
    const postGoogleLoginFinishCallback = usePostGoogleLoginFinishCallback();

    useEffect(() => {
        console.log("token", token);
    },[token])

    useEffect(() => {
        if(user) {
            console.log("user", user);
            postGoogleLoginFinishCallback({
                "code": user.serverAuthCode,
                "id_token": user.idToken
            }).then(r => {
                navigation.navigate("Map")
            })
        }

    },[JSON.stringify(user)]);

    const loginGoogle = async () => {
        try {
            const result = await GoogleSignin.hasPlayServices();
            console.log("result",result);
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
            console.log("here");
        } catch (error) {
            console.log("error", JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

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
                <TouchableOpacity style={styles.socialLoginBox} onPress={loginGoogle}>
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

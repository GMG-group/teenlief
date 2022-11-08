import React from 'react';
import { View,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Image
} from "react-native";
import src from "@assets/images/teenliefLogo.svg";
import { WithLocalSvg } from 'react-native-svg';
import { vw, vh } from "react-native-css-vh-vw";
import Lottie from 'lottie-react-native';

const SplashScreen = ({
    setSplash
}) => {
    return (
        <View style={styles.container}>
            <WithLocalSvg
                width="70%" 
                height="70%" 
                asset={src} />
            
            <Lottie
                source={require('@assets/images/splash.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => {
                    setSplash(false);
                }}
            />
            <Text style={styles.text}>GMG group</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        width: vw(100),
        height: vh(100),
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        position: 'absolute',
        bottom: 100,
        fontSize: 27,
        color: '#D3D3D3',
    },
    logo: {
        width: 1000,
        height: 'auto',
    }
})
export default SplashScreen;
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
import src from "@components/img/teenliefLogo.svg";
import { WithLocalSvg } from 'react-native-svg';
import { vw, vh } from "react-native-css-vh-vw";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <WithLocalSvg
                width="50%" 
                height="50%" 
                asset={src} />
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        width: vw(100),
        height: vh(100),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 1000,
        height: 'auto',
    }
})
export default SplashScreen;
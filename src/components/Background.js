import React, {useEffect} from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, Image, Animated } from "react-native";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';

const Background = ({backgroundAnimation, changeColor, color}) => {
    useEffect(() => {
        Animated.timing(backgroundAnimation, {
            toValue: changeColor === 'Teen' ? 0 : 1,
            useNativerDriver: true,
            duration: 1000,
        }).start();
    }, [backgroundAnimation, changeColor]);
    return (
        <View>
            <Animated.View style={[styles.background ,{backgroundColor: color}]}/>
            <Text style={styles.top}>청소년을 보호하기 위한 teenlief 앱 입니다.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: 0.65 * vh,
        borderBottomRightRadius: 200,
        borderBottomLeftRadius: 40,
    },
    top: {
        marginTop: 50,
        marginLeft: 20,
        color: 'white',
        fontSize: 27,
        width: '70%',
    },
});

export default Background;
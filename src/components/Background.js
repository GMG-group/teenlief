import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, Image } from "react-native";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';

const Background = () => {
    return (
        <View>
            <View style={styles.background}/>
            <Text style={styles.top}>청소년을 보호하기 위한 teenlief 앱 입니다.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: 0.65 * vh,
        backgroundColor: color,
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
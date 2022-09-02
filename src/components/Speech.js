import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import test from "@components/img/test.png";
import { vw, vh } from "react-native-css-vh-vw";

const Speech = ({name, text, direction}) => {
    return (
        <View style={[styles.container, direction === 'helper' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
            <View style={styles.border}>
                <Image style={styles.profile} source={test} />
            </View>
            
            <View style={direction === 'helper' ? {alignItems: 'flex-start'} : {alignItems: 'flex-end'}}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.speech}>
                    <View style={[styles.triangle, direction === 'helper' ? {transform: [{ rotate: "90deg" }]} : {right: 0}]}></View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    speech: {
        maxWidth: vw(60),
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
    },
    text: {
        fontSize: 20,
    },
    border: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 41,
        height: 41,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 10,
        marginLeft: 10,
    },  
    profile: {
        width: 40,
        height: 40,
        resizeMode: "cover",
        borderRadius: 100,
    },
    name: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: "transparent",
        borderTopColor: "white",
    },
});
export default Speech;
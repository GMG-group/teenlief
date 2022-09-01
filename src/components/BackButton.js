import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import React from "react";
import {vw} from "react-native-css-vh-vw";
import {actionState} from "@apis/atoms";
import {useRecoilState, useSetRecoilState} from "recoil";

export const BackButton = () => {
    const setAction = useSetRecoilState(actionState);

    const onPress = () => {
        setAction("");
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.button}>
                <Icon name="chevron-left" size={40} color={'#000'} style={{ marginRight: 10 }} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        top: 25,
        left: 25,
        zIndex: 2
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
        paddingLeft: 2,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 10,
        color: '#000'
    },
})
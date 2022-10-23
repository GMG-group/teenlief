import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";

const ReviewBox = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.profile} source={require("@assets/images/test.png")} />
                <Text>홍길동</Text>
            </View>
            <View>
                <Text>
                    날짜: 2022-01-01
                </Text>
                <Text>
                    위치: ---------
                </Text>
                <Text>
                    태그: () ()
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: '90%',
        height: 130,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    profile: {
        width: vw(15),
        height: vw(15),
        borderRadius: 100
    }
})
export default ReviewBox;
import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import test from "@components/img/test.png";
import { vw, vh } from "react-native-css-vh-vw";
import {useRecoilValue} from "recoil";
import {userState} from "@apis/atoms";

const Message = ({ item, displayProfile }) => {
    const user = useRecoilValue(userState);

    useEffect(() => {
        console.log(item);
        console.log(user);
    }, []);
    return (
        <View style={[styles.container, user.user.pk == item.user.id ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}]}>
            {
                user.user.pk != item.user.id ?
                    (
                        displayProfile ?
                            <View style={styles.border}>
                                <Image style={styles.profile} source={test} />
                            </View>
                            :
                            <View style={styles.border}>
                            </View>
                    ) : null
            }
            
            <View style={user.user.pk == item.user.id ? {alignItems: 'flex-start'} : {alignItems: 'flex-end'}}>
                <View style={[styles.speech, item.user.role === 'Helper' ? {backgroundColor: '#AE46FF'} : null]}>
                    <Text style={styles.text}>{item.content}</Text>
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
        backgroundColor: '#00A3FF',
        borderRadius: 20,
        padding: 10,
    },
    text: {
        fontSize: 14,
        color: 'white'
    },
    border: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 100,
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
export default Message;
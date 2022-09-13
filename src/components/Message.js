import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import test from "@components/img/test.png";
import { vw, vh } from "react-native-css-vh-vw";
import {useRecoilValue} from "recoil";
import {userState} from "@apis/atoms";

export const PromiseMessage = ({ item, displayProfile }) => {
    const user = useRecoilValue(userState);
    const [promise, setPromise] = useState(new Date());

    useEffect(() => {
        // parse date
        const month = item.content.split('/')[2];
        const day = item.content.split('/')[3];
        const hour = item.content.split('/')[4];
        const minute = item.content.split('/')[5];

        setPromise(new Date('2022', month, day, hour, minute));
    }, [item]);

    return (
        <View style={[styles.container, user.user.pk == item.user.id ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}, {marginBottom: 5}]}>
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
                <View style={styles.promise}>
                    <Text style={styles.promiseHeaderText}>약속</Text>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, color: 'black'}}>시간</Text>
                        <Text style={styles.promiseTimeText}>{promise.getMonth()}월 {promise.getDate()}일 {promise.getHours()}시 {promise.getMinutes()}분</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, color: 'black'}}>알림</Text>
                        <Text style={styles.promiseTimeText}>30 분 전</Text>
                    </View>
                    <View style={[styles.promiseFinButton, item.user.role === 'Helper' ? {backgroundColor: '#AE46FF'} : null]}>
                        <Text style={{color: 'white'}}>종료</Text>
                    </View>
                </View>
            </View>

        </View>
    );
}

export const Message = ({ item, displayProfile }) => {
    const user = useRecoilValue(userState);

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
    promise: {
        width: vw(65),
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    promiseHeaderText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        paddingBottom: 10,
    },
    promiseTimeText: {
        fontSize: 16,
        color: 'black',
    },
    promiseFinButton: {
        width: '100%',
        height: 30,
        backgroundColor: '#00A3FF',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
});
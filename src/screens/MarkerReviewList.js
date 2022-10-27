import React, {useRef, useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { vw, vh } from "react-native-css-vh-vw";
import MarkerReviewBox from '@components/MarkerReviewBox';
import {userState} from "@apis/atoms";
import {useRecoilState} from "recoil";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ReviewBox from '~/components/ReviewBox';

const MarkerReviewList = ({navigation, route}) => {
    const [user, setUser] = useRecoilState(userState);
    const [color, setColor] = useState('black');
    useEffect(() => {
        user.user.role==="Helper" ? setColor('#AE46FF') : setColor('#00A3FF');
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.nav, {backgroundColor: color}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <EvilIcons name="chevron-left" size={45} color={'white'} />
                </TouchableOpacity>
                <Text style={{fontSize: 16, color: 'white'}}>{route.params.name}</Text>
            </View>
            <ReviewBox />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: vw(90),
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 20
    },
    nav: {
        height: vh(7),
        width: vw(100),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
})

export default MarkerReviewList;
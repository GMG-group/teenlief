import React, {useRef, useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity} from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { vw, vh } from "react-native-css-vh-vw";
import Star from 'react-native-star-view';

const MarkerReviewBox = ({color}) => {
    return (
        <Shadow style={styles.container} distance={3} offset={[3,3]}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={require("@components/img/test.png")} />
                <View>
                    <Text style={{color: color}}>이름 : \</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{color: color}}>평점 : </Text><Star score={1} style={styles.starStyle} />
                    </View>
                    <Text style={{color: color}}>날짜 : </Text>
                </View>
            </View>
            <Text style={[styles.content ,{color: color}]} multiline ={true}>hello</Text>
        </Shadow>
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
    starStyle: {
        width: 100,
        height: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    content: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
        borderRadius: 20,
        padding: 10
    },
})

export default MarkerReviewBox;
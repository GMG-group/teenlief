import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";
import Icon from "react-native-vector-icons/Ionicons";
import Star from 'react-native-star-view';

const ChatView = ({profile, name, score, favorite}) => {
    const [heart, setHeart] = useState(favorite);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.profileCircle}>
                    <Image style={styles.profile} source={profile} />
                </View>
                
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.starContainer}>
                        <Text>{score.toFixed(1)} : </Text>
                        <Star score={score} style={styles.star} />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => setHeart(!heart)}>
                <Icon size={30} name={heart ? "heart" : "heart-outline"} color={heart ? "red" : null} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: vh(9),
        width: vw(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#D3D3D3',
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    profileCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#D3D3D3',
        width: vh(6.7),
        height: vh(6.7),
        marginRight: 15,

    },
    profile: {
        width: vh(6),
        height: vh(6),
        resizeMode: "cover",
        borderRadius: 100,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    star: {
        height: 22,
        width: 110,
    }
});
export default ChatView;
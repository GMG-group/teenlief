import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";
import Icon from "react-native-vector-icons/Ionicons";
import Star from 'react-native-star-view';
import test from "@components/img/test.png";

const ChatView = ({ navigation, data }) => {
    const [heart, setHeart] = useState(data.favorite);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.push('ChatRoom', {
                id: data.id,
                roomName: data.roomName,
                profile: data.profile,
                name: data.name,
                score: data.score,
            })}
        >
            <View style={styles.leftContainer}>
                <View style={styles.profile}>
                     <Image style={styles.profileCircle} source={test} />
                </View>
                
                <View>
                    <Text style={styles.name}>{data.name}</Text>
                    <View style={styles.starContainer}>
                        <Text>{data.score.toFixed(1)} : </Text>
                        <Star score={data.score} style={styles.star} />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => setHeart(!heart)}>
                <Icon size={30} name={heart ? "heart" : "heart-outline"} color={heart ? "red" : null} />
            </TouchableOpacity>
        </TouchableOpacity>
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
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d3d3d3',
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
        borderRadius: 20,
        width: vh(6),
        height: vh(6),
    },
    profile: {
        width: vh(6),
        height: vh(6),
        marginRight: 20,
    },
    name: {
        fontSize: 17,
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
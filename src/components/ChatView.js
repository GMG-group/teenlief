import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";
import Icon from "react-native-vector-icons/Ionicons";
import Star from 'react-native-star-view';
import test from "@assets/images/test.png";
import {useRecoilValue} from "recoil";
import {userState, SCREEN} from "@apis/atoms";
import useApi from '@apis/useApi';
import { getMarkerInfo } from '@apis/apiServices';

const ChatView = ({ navigation, data }) => {
    const [heart, setHeart] = useState(data.favorite);
    const user = useRecoilValue(userState);
    const [helperinfoLoading, helperinfoSolved, helperinfoApi] = useApi(getMarkerInfo, true);

    useEffect(() => {
        helperinfoApi(data.helper.id)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }, []);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.push(SCREEN.ChatRoom, {
                id: data.id,
                roomName: data.roomName,
                profile: data.profile,
                teen: data.teen,
                helper: data.helper,
                score: helperinfoSolved ? helperinfoSolved.score.slice(0, -1) : 0
            })}
        >
            <View style={styles.leftContainer}>
                <View style={styles.profile}>
                     <Image style={styles.profileCircle} source={test} />
                </View>
                
                <View>
                    <Text style={styles.name}>
                        {
                            user.id === data.teen.id ? data.helper.first_name : data.teen.first_name
                        }
                    </Text>
                    <View style={styles.starContainer}>
                        {
                            user.role === 'Teen' ? <Text>{helperinfoSolved ? helperinfoSolved.score.slice(0, -1) : 0}</Text> : null
                        }
                        {
                            user.role === 'Teen' ? <Star score={helperinfoSolved ? parseFloat(helperinfoSolved.score) : 0} style={styles.star} /> : null
                        }
                    </View>
                </View>
            </View>
            <View>
            {user.role === 'Teen' ? <Text style={{color: '#AE46FF', fontSize: 22, fontWeight: 'bold',fontStyle: 'italic' }}>Helper</Text> : <Text style={{color: '#00A3FF', fontSize: 22, fontWeight: 'bold',fontStyle: 'italic' }}>Teen</Text>}
            </View>
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
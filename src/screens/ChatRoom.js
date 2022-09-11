import React, {useEffect, useState, useRef} from 'react';
import {Text, TextInput, View, StyleSheet, Image, TouchableOpacity, FlatList} from "react-native";
import StarIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import { vw, vh } from "react-native-css-vh-vw";
import Speech from '@components/Speech';
import { getChatLog } from "@apis/apiServices";
import useApi from "@apis/useApi";
import { useRecoilValue } from "recoil";
import { tokenState } from "@apis/atoms";

const ChatRoom = ({ navigation, route }) => {
    const [chatData, setChatData] = useState([]);
    const [speechText, setSpeechText] = useState('');
    const chatRoomRef = useRef();
    const webSocket = useRef(null);

    const token = useRecoilValue(tokenState);

    const [loading, resolved, callApi] = useApi(getChatLog, true);

    useEffect(() => {
        callApi(route.params.id)
            .then((res) => {
                setChatData(res);
            })
    }, []);

    useEffect(() => {
        webSocket.current = new WebSocket(`ws://10.0.2.2:8000/ws/chat/${route.params.roomName}?token=${token.accessToken}`);

        webSocket.current.onopen = () => {
            console.log('connected')
        };

        webSocket.current.onmessage = (e) => {
            console.log('receive', e);
            const data = JSON.parse(e.data);

            setChatData([...chatData, {content: data.content, user: {first_name: data.user.first_name}}]);
        };

        webSocket.current.onerror = (e) => {
            console.log('errror!', e);
        };

        webSocket.current.onclose = (e) => {
            console.log('close!', e);
        };

        return () => {
            webSocket.current.close();
        };
    }, [route.params.roomName]);

    const onText = () => {
        webSocket.current.send(JSON.stringify({content: speechText}));
        setSpeechText('');
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.nav}>
                <View style={styles.navContainer}>
                    <Icon name="arrow-back-outline" size={40} />
                    <Image style={styles.profile} source={route.params.profile} />
                    <Text style={{fontSize: 18}}>{route.params.name}</Text>
                </View>
                <View style={styles.navContainer}>
                    <StarIcon name="star" size={22} style={{color: 'yellow'}} />
                    <Text style={styles.marginLeft}>{route.params.score}</Text>
                </View>
            </View>
            <FlatList
                ref={chatRoomRef}
                style={styles.container}
                keyExtractor={item => item.id}
                data={chatData}
                renderItem={(item) => {
                    return <Speech name={item.item.user.first_name} text={item.item.content} />
                }}
                onLayout={() => chatRoomRef.current.scrollToEnd({animated: false})}
                onContentSizeChange={() => chatRoomRef.current.scrollToEnd({animated: false})}
                ListFooterComponent={<View style={{height: 10, backgroundColor: 'transparent',}} />}
            />
            <View style={styles.chatContainer}>
                <Icon name="add-outline" size={25} />
                <TextInput style={styles.input} value={speechText} onChangeText={text => setSpeechText(text)} />
                <TouchableOpacity onPress={() => onText()}>
                    <Icon name="paper-plane-outline" size={25} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9bbbd4',
        width: '100%',
        height: '100%',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: vh(7),
        backgroundColor: '#9bbbd4',
        paddingLeft: 15,
        paddingRight: 15,
    },
    navContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    margin: {
        marginLeft: 1,
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: 'white',
    },
    input: {
        width: vw(80),
    },
    profile: {
        width: vh(5),
        height: vh(5),
        resizeMode: "cover",
        borderRadius: 100,
    },
})
export default ChatRoom;
import React, {useEffect, useState, useRef} from 'react';
import {Text, TextInput, View, StyleSheet, Image, TouchableOpacity, FlatList} from "react-native";
import StarIcon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from "react-native-vector-icons/Ionicons";
import { vw, vh } from "react-native-css-vh-vw";
import { Message, PromiseMessage } from '@components/Message';
import { getChatLog } from "@apis/apiServices";
import useApi from "@apis/useApi";
import { useRecoilValue } from "recoil";
import {tokenState, userState} from "@apis/atoms";

const ChatRoom = ({ navigation, route }) => {
    const [chatData, setChatData] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const chatRoomRef = useRef();
    const webSocket = useRef(null);

    const token = useRecoilValue(tokenState);
    const user = useRecoilValue(userState);

    const [loading, resolved, callApi] = useApi(getChatLog, true);

    useEffect(() => {
        callApi(route.params.id)
            .then((res) => {
                webSocket.current = new WebSocket(`ws://10.0.2.2:8000/ws/chat/${route.params.roomName}?token=${token.accessToken}`);

                webSocket.current.onopen = () => {
                    console.log('connected');
                    setChatData(res);
                };

                webSocket.current.onmessage = (e) => {
                    console.log('receive', e);
                    const data = JSON.parse(e.data);

                    setChatData((prev) => [...prev, data]);
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
            })
    }, [route.params.id]);

    const onText = () => {
        webSocket.current.send(JSON.stringify({content: chatInput}));
        setChatInput('');
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.nav}>
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <EvilIcons name="chevron-left" size={45} color={'black'} />
                    </TouchableOpacity>

                    <Image style={styles.profile} source={route.params.profile} />
                    <Text style={{fontSize: 16, color: 'black'}}>
                        {
                            user.user.id === route.params.teen.id
                                ? route.params.helper.first_name
                                : route.params.teen.first_name
                        }
                    </Text>
                </View>

                <View style={styles.navContainer}>
                    <StarIcon name="star" size={20} style={{color: '#ffd45b'}} />
                    <Text style={styles.marginLeft}>{route.params.score}</Text>
                </View>
            </View>

            <FlatList
                ref={chatRoomRef}
                style={styles.container}
                keyExtractor={(item, index) => index}
                data={chatData}
                renderItem={({item, index}) => {
                    if (index > 0 && item.user.id == chatData[index - 1].user.id) {
                        // content 의 앞 3글자가 '/약속' 일 경우 약속 메시지로 처리
                        if (item.content.slice(0, 3) === '/약속') {
                            return <PromiseMessage item={item} displayProfile={false} />
                        } else {
                            return <Message item={item} displayProfile={false} />
                        }
                    } else {
                        // content 의 앞 3글자가 '/약속' 일 경우 약속 메시지로 처리
                        if (item.content.slice(0, 3) === '/약속') {
                            return <PromiseMessage item={item} displayProfile={true} />
                        } else {
                            return <Message item={item} displayProfile={true} />
                        }
                    }
                }}
                onLayout={() => chatRoomRef.current.scrollToEnd({animated: true})}
                onContentSizeChange={() => chatRoomRef.current.scrollToEnd({animated: true})}
                ListFooterComponent={<View style={{height: 10, backgroundColor: 'transparent',}} />}
            />

            <View style={styles.chatContainer}>
                <TouchableOpacity
                    onPress={() => navigation.push(
                        'Promise',
                        {
                            ws: webSocket.current,
                            roomName: route.params.roomName,
                            helper: route.params.helper,
                            teen: route.params.teen,
                        }
                    )}
                >
                    <Ionicons name="add-outline" size={25} color={'black'} />
                </TouchableOpacity>
                <TextInput style={styles.input} value={chatInput} onChangeText={text => setChatInput(text)} />
                <TouchableOpacity onPress={() => onText()}>
                    <Ionicons name="paper-plane-outline" size={25} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: vh(7),
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e5e5',
    },
    navContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 10,
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
    },
    input: {
        width: vw(75),
    },
    profile: {
        width: 35,
        height: 35,
        resizeMode: "cover",
        borderRadius: 100,
        marginRight: 10
    },
})

export default ChatRoom;
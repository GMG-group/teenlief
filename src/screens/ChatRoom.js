import React, {useEffect, useState, useRef} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { vw, vh } from "react-native-css-vh-vw";
import Speech from '@components/Speech';
import { template } from '@babel/core';

const testData = [
    {   
        id: 1,
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {   
        id: 2,
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        id: 3,
        name: '청소년',
        text: '하이요',
        direction: 'teen',
    },
]

const ChatRoom = () => {
    const [chatData, setChatData] = useState(testData);
    const [speechText, setSpeechText] = useState('');
    const chatRoomRef = useRef();
    const chatBtn = useRef();
    const onText = () => {
        setChatData([...chatData, {id: 8, name: '청소년',  text: speechText, direction: 'teen'}]);
        setSpeechText('');
    }
    return (
        <View style={{flex: 1}}>
            <View style={styles.nav}></View>
            <FlatList
                ref={chatRoomRef}
                style={styles.container}
                keyExtractor={item => item.id}
                data={chatData}
                renderItem={({item}) => <Speech name={item.name} text={item.text} direction={item.direction} />}
                onLayout={() => chatRoomRef.current.scrollToEnd({animated: false})}
                onContentSizeChange={() => chatRoomRef.current.scrollToEnd({animated: false})}
                ListFooterComponent={<View style={{height: 10, backgroundColor: 'transparent',}} />}
                />
            <View style={styles.chatContainer}>
                <Icon name="add-outline" size={25} />
                <TextInput style={styles.input} value={speechText} onChangeText={text => setSpeechText(text)} />
                <TouchableOpacity ref={chatBtn} onPress={() => onText()}>
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
        height: 60,
        borderWidth: 2,
        borderBottomColor: '#D3D3D3',
        backgroundColor: '#9bbbd4',
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
    }
})
export default ChatRoom;
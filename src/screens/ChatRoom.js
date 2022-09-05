import React, {useEffect, useState, useRef} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList} from "react-native";
import StarIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
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

const ChatRoom = ({navigation, route}) => {
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
import React, {useEffect, useState, useRef} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { vw, vh } from "react-native-css-vh-vw";
import Speech from '@components/Speech';
import { template } from '@babel/core';

const testData = [
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
    {
        name: '백준준',
        text: '안녕하세요.',
        direction: 'helper',
    },
    {
        name: '청소년',
        text: '안녕하세요',
        direction: 'teen',
    },
]

const ChatRoom = () => {
    const renderItem = ({item}) => (
        <Speech name={item.name} text={item.text} direction={item.direction} />
    )

    return (
        <View style={{flex: 1}}>
            <FlatList
                style={styles.container}
                keyExtractor={item => item.toString()}
                data={testData}
                renderItem={renderItem}
                />
            <View style={styles.chatContainer}>
                <Icon name="add-outline" size={25} />
                <TextInput style={styles.input} />
                <Icon name="paper-plane-outline" size={25} /> 
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
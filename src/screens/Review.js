import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { vw, vh } from "react-native-css-vh-vw";
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const Review = ({navigation}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#D3D3D3',
                    paddingTop: 30,
                    paddingBottom: 30,
                    marginBottom: 20,
            }}>
                <Text style={styles.title}><Icon name='left' size={20} />친절한 헬퍼를 위해 리뷰를 작성해 주세요!</Text>
            </TouchableOpacity>

            <Image style={styles.profile} source={require("../components/img/test.png")} />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>홍길동</Text>
            <Text style={{fontSize: 15, marginBottom: 5}}>email1111@email.com</Text>
            <View>
                <StarRating
                    style={{marginBottom: 5}}
                    starSize={45}
                    rating={rating}
                    onChange={setRating}
                />
            </View>

            <TextInput value={review} onChangeText={setReview} multiline={true} numberOfLines = {20} style={styles.textInput} />
            
            <TouchableOpacity style={styles.btn}>
                <Text style={{color: 'white', fontSize: 17}}>완료</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 17,
        color: '#00A3FF',
    },
    
    profile: {
        borderRadius: 100,
        backgroundColor: 'black',
        width: vw(30),
        height: vw(30),
        marginBottom: 10
    },
    textInput: {
        width: '80%',
        height: '40%',
        borderWidth: 1,
        borderColor: 'gray',
        textAlignVertical: 'top',
        marginBottom: 10,
        borderRadius: 10,
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00A3FF',
        width: '80%',
        height: '7%',
        borderRadius: 10,
    }
});

export default Review;

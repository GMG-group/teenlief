import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";
import Star from 'react-native-star-view';
import { Shadow } from 'react-native-shadow-2';
import Icon from "react-native-vector-icons/AntDesign";
import  {useApi} from "@apis/useApi";
import {deleteReview} from "@apis/apiServices";
import {useRecoilValue} from "recoil";
import {userState, SCREEN} from "@apis/atoms";

const ReviewBox = ({name, star, date, content, author, id, reviewAPI}) => {
    const [color, setColor] = useState('#00A3FF');
    const [a, b, c] = useApi(deleteReview, true);
    const user = useRecoilValue(userState);

    return (
        <Shadow style={styles.container} distance={3} offset={[3,3]}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={require("@assets/images/test.png")} />
                <View>
                    <Text style={{color: color}}>이름 : {name}</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={{color: color}}>평점 : </Text><Star score={parseInt(star)} style={styles.starStyle} />
                    </View>
                    <Text style={{color: color}}>날짜 : {date}</Text>
                </View>
                <TouchableOpacity style={styles.deleteIcon} onPress={() => {
                    c(id).then((r) => {
                        console.log('삭제 완료');
                        reviewAPI();
                    })
                    .catch(error => {
                        console.log("아니 이게 왜안됨");
                    });
                }}>
                    {user === 'Teen' ? <Icon size={25} name={"delete"} color={color} /> : null}
                </TouchableOpacity>
            </View>
            <Text style={[styles.content ,{color: color}]} multiline ={true}>{content}</Text>
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
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10
    },
    starStyle: {
        width: 100,
        height: 20,
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
    deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
})
export default ReviewBox;
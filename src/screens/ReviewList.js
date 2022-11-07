import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import ReviewBox from "@components/ReviewBox";
import {getMyReview, getMyUnReview} from "@apis/apiServices";
import  {useApi} from "@apis/useApi";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { vw, vh } from "react-native-css-vh-vw";

const ReviewList = ({navigation, route}) => {
    const [reviewLoading, reviewResolved, reviewApi] = useApi(getMyReview, true);
    const [unReviewLoading, unReviewResolved, unReviewApi] = useApi(getMyUnReview, true);
    const [color, setColor] = useState('black');
    const [text, setText] = useState('');
    const [marker, setMarker] = useState(false);

    const reviewAPI = () => {
        reviewApi()
        .then(res => {
            console.log(res, 'im here');
        })
        .catch(error => {
            console.log(error, 'get review error');
        })
    }

    useEffect(() => {
        if (route.params.user === 'Teen') {
            setColor('#00A3FF');
            setText('내가 쓴 리뷰');
        } else {
            setColor('#AE46FF');
            setText('나에게 작성된 리뷰');
        }
        if (route.params.unReview) {
            unReviewApi()
            .then(res => {
                console.log(res, 'UN REVIEW');
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            reviewAPI();
        }
    }, []);

    return (
        <View style={{display: 'flex'}}>
            <View style={[styles.nav, {backgroundColor: color}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <EvilIcons name="chevron-left" size={45} color={'white'} />
                </TouchableOpacity>
                <Text style={{fontSize: 16, color: 'white'}}>리뷰 관리하기</Text>
            </View>
            <Text style={styles.title}>{text} : {reviewResolved ? reviewResolved.length : 0}개</Text>

            {/* <FlatList
                style={styles.flatList}
                scrollEnabled={true}
				data={marker ? route.params.markerReviewResolved : route.params.unReview ? unReviewResolved : reviewResolved}
                extraData={marker ? route.params.markerReviewResolved : route.params.unReview ? unReviewResolved : reviewResolved}
				renderItem={({item}) => {
					    return (
                            <ReviewBox
                                name={item.author.first_name}
                                star={item.stars}
                                date={item.created_at}
                                content={item.content}
                                id={item.id}
                                reviewAPI={reviewAPI}
                                />
                        )
                    }}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        height: vh(7),
        width: vw(100),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        marginLeft: '5%',
        fontSize: 18,
        marginBottom: 20
    },
    flatList: {
        width: vw(100),
        marginLeft: '5%'
    }
});

export default ReviewList;
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import ReviewBox from "@components/ReviewBox";
import {getReview, getMarkerReview} from "@apis/apiServices";
import  {useApi} from "@apis/useApi";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { vw, vh } from "react-native-css-vh-vw";
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const ReviewList = ({ navigation, route }) => {
    // state
    const routeState = useState(route.params)[0];
    const [color, setColor] = useState('white');
    const [reviewCounter, setReviewCounter] = useState(0);
    const [text, setText] = useState('');

    // api
    const [reviewLoading, reviewResolved, reviewApi] = useApi(getReview, true);
    const [markerReviewLoading, markerReviewResolved, markerReviewApi] = useApi(getMarkerReview, true);

    const reviewAPI = () => {
        reviewApi()
        .then((r) => {
            console.log(r);
        })
        .catch(error => {
            console.log("아니 이게 왜안됨");
        })
    }

    useEffect(() => {
        if (routeState.user.role === 'Teen') {
            setColor('#00A3FF');
            reviewAPI();
            if (route.params.todo) {
                setText('내가 쓴 리뷰');
            } else {
                setText('작성 가능한 리뷰')
            }
        } else {
            setColor('#AE46FF');
            if (routeState.outgoing === true) {
                reviewAPI();
            } else {
                markerReviewApi(routeState.user.id).then((r) => {
                    console.log(r, 'here');
                })
                .catch(error => {
                    console.log("아니 이게 왜안됨");
                })
            }
        }
    }, []);


    useEffect(() => {
        if (reviewResolved) {
            setReviewCounter(reviewResolved.filter(review => review.todo_review === route.params.todo).length);
        }
    }, [reviewResolved]);

    return (
        <View style={{display: 'flex'}}> 
            <View style={[styles.nav, {backgroundColor: color}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <EvilIcons name="chevron-left" size={45} color={'white'} />
                </TouchableOpacity>
                <Text style={{fontSize: 16, color: 'white'}}>리뷰 관리하기</Text>
            </View>
            {}
            <Text style={styles.title}>{text} : {reviewCounter}</Text>
            
            <FlatList
                style={styles.flatList}
                scrollEnabled={true}
				data={reviewResolved}
                extraData={reviewResolved}
				renderItem={({item}) => {
					    return item.todo_review === route.params.todo ? (
                            <ReviewBox 
                                name={item.author.first_name} 
                                star={item.stars} 
                                date={item.date} 
                                content={item.content} 
                                author={item.author.role}
                                id={item.id}
                                reviewAPI={reviewAPI}
                                />
                        ) : null
                    }}
            />
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
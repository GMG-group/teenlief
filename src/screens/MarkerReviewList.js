import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import ReviewBox from "@components/ReviewBox";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { vw, vh } from "react-native-css-vh-vw";

const MarkerReviewList = ({navigation, route}) => {
    const [color, setColor] = useState('white');
    const [marker, setMarker] = useState(false);

    useEffect(() => {
        if (route.params.user === 'Teen') {
            setColor('#00A3FF');
        } else {
            setColor('#AE46FF');
        }
    }, []);

    return (
        <View style={{display: 'flex'}}>
            <View style={[styles.nav, {backgroundColor: color}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <EvilIcons name="chevron-left" size={45} color={'white'} />
                </TouchableOpacity>
                <Text style={{fontSize: 16, color: 'white'}}>전체 리뷰</Text>
            </View>
            <Text style={styles.title}>등록된 리뷰 : {route.params.markerReviewResolved.length}개</Text>

            <FlatList
                style={styles.flatList}
                scrollEnabled={true}
				data={route.params.markerReviewResolved}
				renderItem={({item}) => {
					    return (
                            <ReviewBox
                                name={item.author.first_name}
                                star={item.stars}
                                date={item.created_at}
                                content={item.content}
                                myReview={false}
                                id={item.id}
                                />
                        )
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

export default MarkerReviewList;
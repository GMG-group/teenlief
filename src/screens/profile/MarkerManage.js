import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import MarkerCard from "@components/MarkerCard";
import Header from "@components/Header";
import {deleteMarker, getMyMarker} from "@apis/apiServices";
import useApi from "@apis/useApi";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import SwipeableFlatList from "react-native-swipeable-list";
import {TouchableOpacity} from "@gorhom/bottom-sheet";

const SkeletonLayout = Array.apply(null, Array(4)).map(() => (
    {
        width: "100%",
        paddingHorizontal: 15,
        height: 120,
        borderRadius: 10,
        justifyContent: "center",
        marginBottom: 20
    }));

const MarkerManage = ({navigation}) => {
    const [myMarkerLoading, myMarkerResolved, myMarkerApi] = useApi(getMyMarker, true);
    const [deleteLoading, deleteResolved, deleteApi, setDeleteLoading] = useApi(deleteMarker, true);

    useEffect(() => {
        if(!deleteLoading) {
            myMarkerApi()
            setDeleteLoading(true);
        }
    },[deleteLoading])

    useEffect(() => {
        myMarkerApi()
    },[])

    const QuickActions = (index, marker) => {
        return (
            <View style={styles.qaContainer}>
                <View style={[styles.button]}>
                    <TouchableOpacity onPress={() => {deleteApi(marker.id)}}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <>
            <Header navigation={navigation} title={"마커 관리하기"}/>
            <View style={styles.container}>
                <SkeletonContent
                    containerStyle = {{
                        margin: 10
                    }} // 없으면 오류
                    layout={SkeletonLayout}
                    isLoading={myMarkerLoading}
                >
                    <SwipeableFlatList
                        keyExtractor={(item) => `markerCard-${item.id}`}
                        data={myMarkerResolved}
                        renderItem={({item}) => (
                            <MarkerCard style={styles.markerCard} marker={item} deleteApi={deleteApi} />
                        )}
                        maxSwipeDistance={110}
                        renderQuickActions={({index, item}) => QuickActions(index, item)}
                        shouldBounceOnMount={true}


                    />
                </SkeletonContent>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    markerCard: {
        marginBottom: 10
    },
    qaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 10,
        alignSelf: "center",
        height: 120,
        width: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#AE46FF"
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    }
});

export default MarkerManage;
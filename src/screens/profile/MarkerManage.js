import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import MarkerCard from "@components/MarkerCard";
import Header from "@components/Header";
import {deleteMarker, getMyMarker} from "@apis/apiServices";
import useApi from "@apis/useApi";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list";

const SkeletonLayout = Array.apply(null, Array(4)).map(() => (
    {
        width: "100%",
        paddingHorizontal: 15,
        height: 100,
        borderRadius: 20,
        justifyContent: "center",
        elevation: 5,
        marginBottom: 10
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

    const TrailingActions = (marker) => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => console.info('swipe action triggered')}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <>
            <Header navigation={navigation} title={"마커 관리하기"}/>

            <ScrollView style={styles.container}>
                <SkeletonContent
                    containerStyle = {{
                        margin: 10
                    }} // 없으면 오류
                    layout={SkeletonLayout}
                    isLoading={false}
                >
                    {
                        !myMarkerLoading ? (
                            <SwipeableList>


                                {
                                    myMarkerResolved.map((marker, idx) => (
                                        <SwipeableListItem
                                            trailingActions={TrailingActions(marker)}
                                            fullSwipe={false}
                                        >
                                            <MarkerCard style={styles.markerCard} key={`MarkerCard-${idx}`} marker={marker} deleteApi={deleteApi}/>
                                        </SwipeableListItem>

                                    ))
                                }
                            </SwipeableList>
                        ) : null
                    }
                </SkeletonContent>
            </ScrollView>

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
    }
});

export default MarkerManage;
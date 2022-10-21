import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import MarkerCard from "@components/MarkerCard";
import Header from "@components/Header";
import {getMyMarker} from "@apis/apiServices";
import useApi from "@apis/useApi";

const MarkerManage = ({navigation}) => {
    const [myMarkerLoading, myMarkerResolved, myMarkerApi] = useApi(getMyMarker, true);

    useEffect(() => {
       myMarkerApi()
           .then((response) => {
               console.log("finish", response);
           })
    },[])

    if(myMarkerLoading) {
        return (
            <Text>Loading</Text>
        )
    }

    return (
        <>
            <Header navigation={navigation} title={"마커 관리하기"}/>
            <ScrollView style={styles.container}>

                {
                    myMarkerResolved.map((marker, idx) => (
                        <MarkerCard style={styles.markerCard} key={`MarkerCard-${idx}`} marker={marker}/>
                    ))
                }
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    markerCard: {
        marginBottom: 20
    }
});

export default MarkerManage;
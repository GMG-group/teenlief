import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import MarkerCard from "@components/MarkerCard";
import Header from "@components/Header";

const MarkerManage = ({navigation}) => {
    return (
        <>
            <Header navigation={navigation} title={"마커 관리하기"}/>
            <ScrollView style={styles.container}>


                <MarkerCard/>
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default MarkerManage;
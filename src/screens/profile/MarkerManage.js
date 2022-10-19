import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import MarkerCard from "@components/MarkerCard";

const MarkerManage = () => {
    return (
        <ScrollView style={styles.container}>
            <MarkerCard/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    }
});

export default MarkerManage;
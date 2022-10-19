import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {vw} from "react-native-css-vh-vw";

const MarkerCard = () => {
    return (
        <View style={styles.container}>
            <Text>asdf</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: 100,
        backgroundColor: "#AE46FF",
        borderRadius: 20

    }
});

export default MarkerCard;
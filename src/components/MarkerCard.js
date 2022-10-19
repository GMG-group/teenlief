import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

const MarkerCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowDivider}>
                <Image style={styles.image} source={require("@assets/images/test.png")}></Image>
                <View style={styles.content}>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        height: 100,
        backgroundColor: "#AE46FF",
        borderRadius: 20,
        justifyContent: "center"
    },
    rowDivider: {
        flexDirection: "row"
    },
    image: {
        flex: 2,
        height: 80, // image는 % 로 하면 안보임
        borderRadius: 10
    },
    content: {
        flex: 3
    }
});

export default MarkerCard;
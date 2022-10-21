import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import useApi from "@apis/useApi";
import {getMarkerDetail} from "@apis/apiServices";

const MarkerCard = ({marker}) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowDivider}>
                <Image style={styles.image} source={require("@assets/images/test.png")}></Image>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <Text style={styles.contentDetail}>{`장소 : ${marker.address}`}</Text>
                        <Text style={styles.contentDetail}>{`태그 : ${marker.address}`}</Text>
                        <Text style={styles.contentDetail}>{`평점 : ${marker.address}`}</Text>
                    </View>
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
    contentContainer: {
        flex: 3,
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between"
    },
    contentDetail: {
        color: "#fff"
    }
});

export default MarkerCard;
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import {Tag} from "@components/Tag";
import TextTicker from "react-native-text-ticker";
import StarRating from "react-native-star-rating-widget";

const MarkerCard = ({marker, style, deleteApi}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <View style={styles.rowDivider}>
                <Image style={styles.image} source={{uri: marker.image}}></Image>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                            <TextTicker
                                style={styles.contentDetail}
                                duration={5000}
                                loop
                                repeatSpacer={50}
                                marqueeDelay={500}
                            >
                                {marker.address}
                            </TextTicker>

                            <Tag tags={marker.tag} size={'s'}/>
                            <StarRating rating={5} onChange={()=> {}} starSize={15} starStyle={{marginHorizontal: 0}}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        elevation: 3
    },
    rowDivider: {
        flexDirection: "row"
    },
    image: {
        flex: 2,
        height: 120, // image는 % 로 하면 안보임
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    contentContainer: {
        flex: 3,
        padding: 10
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between"
    },
    contentDetail: {
        color: "#AE46FF",
        fontSize: 12
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start'
    }
});

export default MarkerCard;
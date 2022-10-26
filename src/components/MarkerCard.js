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
                        <View style={styles.detailContainer}>
                            <Text style={styles.contentDetail}>{"주소 : "}</Text>
                            <TextTicker
                                style={styles.contentDetail}
                                duration={5000}
                                loop
                                repeatSpacer={50}
                                marqueeDelay={500}
                            >
                                {marker.address}
                            </TextTicker>
                        </View>

                        <View style={styles.detailContainer}>
                            <Text style={styles.contentDetail}>{`태그 : `}</Text>
                            <Tag tags={marker.tag} size={'s'}/>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.contentDetail}>{`평점 : `}</Text>
                            <StarRating rating={5} onChange={()=> {}} starSize={15} starStyle={{marginHorizontal: 0}}/>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {deleteApi(marker.id)}}>
                    <Icon style={styles.deleteIcon} size={15} name={"delete"} color={"#AE46FF"} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingHorizontal: 15,
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        elevation: 5
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
        color: "#AE46FF",
        fontSize: 10
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    deleteIcon: {
        position: "absolute",
        top: 0,
        right: 0
    }
});

export default MarkerCard;
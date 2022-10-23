import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import {Tag} from "@components/Tag";


const MarkerCard = ({marker, style, deleteApi}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <View style={styles.rowDivider}>
                <Image style={styles.image} source={{uri: marker.image}}></Image>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <Text style={styles.contentDetail}>{`주소 : ${marker.address}`}</Text>
                        <View style={styles.tagContainer}>
                            <Text style={styles.contentDetail}>{`태그 :`}</Text>
                            <Tag tags={marker.tag} size={'s'}/>
                        </View>

                        <Text style={styles.contentDetail}>{`평점 : ${5}`}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {deleteApi(marker.id)}}>
                    <Icon style={styles.deleteIcon} size={15} name={"delete"} color={"white"} />
                </TouchableOpacity>

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
        color: "#fff",
        fontSize: 10
    },
    tagContainer: {
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
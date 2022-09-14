import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { vw, vh } from "react-native-css-vh-vw";
import { ScrollView } from 'react-native-gesture-handler';

const ShelterDetailBottomSheet = ({ navigation, bottomSheetModalRef, shelter }) => {

    return (
        <View style={styles.container}>
                <View style={styles.helperInfoContainer}>
                    <View style={styles.helperInfo}>
                        <View style={styles.profileImage}>

                        </View>
                        <View style={styles.helperInfoText}>
                            <Text style={styles.name}>{shelter.name}</Text>
                        </View>
                    </View>

                    <View style={styles.connectButton}>
                        <TouchableWithoutFeedback disabled={true}>
                            <Text style={{color: "#ffffff"}}>쉼터</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <Text style={{fontSize: 24}}>개요</Text>
                        <View style={styles.helperContentItem}>
                            <Text style={{color: "black"}}>{shelter.explanation}</Text>
                        </View>
                        <View style={styles.helperContentItem}>
                            <Text style={{color: "black"}}>{shelter.phone_number}</Text>
                        </View>
                    </View>
                </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingRight: "5%",
        paddingLeft: "5%",
        paddingBottom: "20%",
    },
    helperInfoContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "5%"
    },
    helperInfo: {
        display: "flex",
        flexDirection: "row",
    },
    profileImage: {
        width: 75,
        height: 75,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
    },
    helperInfoText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 10,
    },
    name: {
        color: "black",
        fontSize: 14,
        width: "85%"
    },
    helperStarContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 2,
        marginTop: 5
    },
    helperStar: {
        color: "#ffc107",
        marginLeft: 5,
        marginRight: 5
    },
    connectButton: {
        width: 75,
        height: 30,
        backgroundColor: "#0bc868",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: 10,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    canHelpInfo: {
        display: "flex",
        width: "70%",
        justifyContent: "space-between",
    },
    canHelpInfoText: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    tag: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10
    },
    tagItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        height: 30,
        backgroundColor: "white",
        borderColor: "lightgray",
        borderRadius: 50,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 3,
    },
    activityImages: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    activityImageContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: vw(2),
        height: vw(40)
    },
    activityImage1: {
        width: vw(80),
        height: vw(45),
        borderWidth: 1,
        borderColor: "black",
        borderRadius: vw(5),
    },
    activityImage2: {
        width: vw(40),
        height: vw(19),
        borderWidth: 1,
        borderColor: "black",
        borderRadius: vw(3),
    },
    helperContentItem: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        paddingBottom: 10,
        marginTop: 10
    },
    review: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20
    },
    reviewHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: 10
    },
    reviewHeaderLeft: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    reviewHeaderRight: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: vw(5),
        width: "100%"
    },
    reviewHeaderRightMoreButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        marginTop: 10
    }
});

export default ShelterDetailBottomSheet;

import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {vw} from "react-native-css-vh-vw";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Header = ({navigation, title}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <EvilIcons name="chevron-left" size={45} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 50,
        width: vw(100),
        position: "relative",
        backgroundColor: "#AE46FF",
        alignItems: "center",
        padding: 5,
        zIndex: 2 // backButton 누르기 위해 필요함
    },
    title: {
        color: "white"
    }
});

export default Header;
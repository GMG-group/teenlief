import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput} from "react-native";
import {getReverseGeocoding} from "@apis/apiServices";
import useApi from "@apis/useApi";

const UploadBottomSheet = ({ navigation, bottomSheetModalRef, cameraCoords }) => {
    const [address, setAddress] = useState("")
    const [loading, resolved, getAddr, setLoading] = useApi(getReverseGeocoding, false);

    useEffect(() => {
        getAddr(cameraCoords);
    },[cameraCoords])

    useEffect(() => {
        console.log("loading", loading);
        if(!loading) {
            console.log("resolved", JSON.stringify(resolved));
            if(resolved.status.code === 0)
                setAddress(`${resolved.results[0].region.area1.name} ${resolved.results[0].region.area2.name} ${resolved.results[0].region.area3.name} ${resolved.results[0].region.area4.name} ${resolved.results[0].land?.addition0.value}`);
            setLoading(true);
        }
    },[loading])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={address}
            >
                <Text>{address}</Text>
            </TextInput>
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
    input: {
        height: 40,
        marginHorizontal: 12,
        borderBottomWidth: 1,
        padding: 10,
    },
});

export default UploadBottomSheet;

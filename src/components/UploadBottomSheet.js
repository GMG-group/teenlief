import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getReverseGeocoding, postMarker} from "@apis/apiServices";
import useApi from "@apis/useApi";

const UploadBottomSheet = ({ navigation, bottomSheetModalRef, cameraCoords }) => {

    const [address, setAddress] = useState("")
    const [RGloading, RGresolved, getAddr, setLoading] = useApi(getReverseGeocoding, false);
    const [markerLoading, markerResolved, callApi] = useApi(postMarker, true);
    const [tags, setTags] = useState([
        {
            name: '식사',
            selected: false
        },
        {
            name: '숙박',
            selected: false
        }
    ]);

    useEffect(() => {
        getAddr(cameraCoords);
    },[cameraCoords])

    useEffect(() => {
        console.log("loading", RGloading);
        if(!RGloading) {
            console.log("resolved", JSON.stringify(RGresolved));
            if(RGresolved.status.code === 0) {
                setAddress(`${RGresolved.results[0].region.area1.name} ${RGresolved.results[0].region.area2.name} ${RGresolved.results[0].region.area3.name} ${RGresolved.results[0].region.area4.name} ${RGresolved.results[0].land?.name} ${RGresolved.results[0].land?.addition0.value}`);
            } else {
                setAddress('')
            }

            setLoading(true);
        }
    },[RGloading])

    useEffect(() => {
        console.log("selected", tags);
    },[tags])

    const uploadMarker = () => {
        console.log("upload");
        callApi(
            JSON.stringify({
                "longitude": cameraCoords.longitude,
                "latitude": cameraCoords.latitude,
                "image": null,
                "explanation": address
            }))
            .catch(err => {console.log(err)});
    }

    const handleChange = (idx) => {
        let items = [...tags];
        items[idx] = {
            ...items[idx],
            selected: !items[idx].selected
        };
        setTags(items);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={address}
            >
                <Text>{address}</Text>
            </TextInput>

            <View style={styles.tag}>
                {
                    tags.map((tag, idx) => (
                        <TouchableOpacity
                            onPress={() => {handleChange(idx)}}
                            key={idx}
                        >
                            <View style={{...styles.tagItem, backgroundColor: tags[idx].selected ? 'black' : 'white'}}>
                                <Text style={{color: tags[idx].selected ? 'white' : 'black'}}>{tag.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TouchableOpacity onPress={uploadMarker}>
                <Text style={styles.markerUploadButtonText}>
                    결정
                </Text>
            </TouchableOpacity>
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
    tag: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    tagItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        height: 30,
        borderWidth: 1,
        borderRadius: 50,
        marginRight: 10
    },
});

export default UploadBottomSheet;

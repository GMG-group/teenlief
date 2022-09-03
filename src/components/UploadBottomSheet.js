import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getReverseGeocoding, postMarker} from "@apis/apiServices";
import useApi from "@apis/useApi";
import {useSetRecoilState} from "recoil";
import {ACTION, actionState} from "@apis/atoms";
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from "react-native-image-modal";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const UploadBottomSheet = ({ navigation, bottomSheetModalRef, cameraCoords }) => {

    const setAction = useSetRecoilState(actionState);
    const [RGloading, RGresolved, getAddr, setLoading] = useApi(getReverseGeocoding, false);
    const [markerLoading, markerResolved, callApi] = useApi(postMarker, true);
    const [address, setAddress] = useState("");
    const [holder, setHolder] = useState(false);
    const [prevCoords, setPrevCoords] = useState(true);
    const [image, setImage] = useState(null);

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
        if(!holder && prevCoords !== JSON.stringify(cameraCoords)) {
            setHolder(true);
            setPrevCoords(JSON.stringify(cameraCoords));
            getAddr(cameraCoords)
            .then(() => {
                setTimeout(() => {
                    console.log("holder", holder);
                    setHolder(false);
                },3000)
            });
        }
    },[cameraCoords, holder])

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
            .then(() => {setAction(ACTION.Main)})
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

    const imagePicker = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeExif: true,
            mediaType: 'photo',
        }).then(image => {
            console.log(image.path);
            setImage(image);
        });
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
            {
                image ? (
                    <ImageModal style={styles.image} resizeMode={"contain"} source={{uri: image.path}}/>
                ) : (

                    <TouchableOpacity onPress={imagePicker}>
                        <View style={styles.imagePickerButton}>
                            <Text style={styles.imagePickerText}>
                                이미지
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }

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
    imagePickerButton: {
        width: "80%",
        height: vh/4,
        backgroundColor: 'lightgray',
        justifyContent: 'center'
    },
    imagePickerText: {
        alignSelf: 'center'
    },
    image: {
        width: vw/4 * 3,
        height: vh/4
    }
});

export default UploadBottomSheet;

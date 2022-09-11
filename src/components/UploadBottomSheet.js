import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {getReverseGeocoding, postMarker} from "@apis/apiServices";
import useApi from "@apis/useApi";
import {useSetRecoilState} from "recoil";
import {ACTION, actionState} from "@apis/atoms";
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from "react-native-image-modal";
import Toast from "react-native-toast-message";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const UploadBottomSheet = ({ navigation, bottomSheetModalRef, cameraCoords }) => {

    const setAction = useSetRecoilState(actionState);
    const [RGloading, RGresolved, getAddr, setLoading] = useApi(getReverseGeocoding, false);
    const [markerLoading, markerResolved, callApi] = useApi(postMarker, true);
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
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
        if(!address) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '이 위치에 등록할 수 없습니다',
            });
            return;
        } else if(!addressDetail) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '상세주소를 입력하세요',
            });
            return;
        } else if(!image) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '이미지를 추가해주세요',
            });
            return;
        }
        let flag = true;
        let formData = new FormData();
        formData.append("longitude", cameraCoords.longitude);
        formData.append("latitude", cameraCoords.latitude);
        formData.append("image", {
            uri: image.path,
            type: image.mime,
            name: 'addressimage.jpg'
        });
        formData.append("explanation", addressDetail);
        tags.forEach((tag, idx) => {
            if(tag.selected) {
                formData.append("tag", idx+1);
                flag = false;
            }
        })

        if(flag) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '태그를 하나 이상 선택해주세요',
            });
            return
        }

        callApi(formData)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: '업로드 성공'
                });
                setAction(ACTION.Main)
            })
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
                editable={false}
            >
                <Text>{address}</Text>
            </TextInput>

            <TextInput
                style={styles.input}
                onChangeText={setAddressDetail}
                placeholder={"상세주소"}
            >
                <Text>{addressDetail}</Text>
            </TextInput>

            <View style={styles.tag}>
                {
                    tags.map((tag, idx) => (
                        <TouchableOpacity
                            onPress={() => {handleChange(idx)}}
                            key={idx}
                        >
                            <View style={{...styles.tagItem, backgroundColor: tags[idx].selected ? 'black' : 'white'}}>
                                <Text style={{...styles.tagItemText, color: tags[idx].selected ? 'white' : 'black'}}>{tag.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            {
                image ? (
                    <ImageModal style={styles.image} resizeMode={"contain"} source={{uri: image.path}}/>
                ) : (
                    <TouchableOpacity onPress={imagePicker} style={styles.imagePickerButton}>
                        <View style={styles.imagePickerView}>
                            <Text style={styles.imagePickerText}>
                                이미지
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }

            <TouchableOpacity onPress={uploadMarker} style={styles.markerUploadButton}>
                <View style={styles.markerUploadView}>
                    <Text style={styles.markerUploadButtonText}>
                        등록
                    </Text>
                </View>
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
        marginVertical: 12
    },
    tagItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 24,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "lightgray",
        marginRight: 10,
        elevation: 5
    },
    tagItemText: {
        fontSize: 12
    },
    imagePickerButton: {
        width: "90%",
        height: vh/6,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10
    },
    imagePickerView: {
        height: "100%",
        justifyContent: 'center',
    },
    imagePickerText: {
        alignSelf: 'center'
    },
    image: {
        width: vw,
        height: vh/6,
    },
    markerUploadView: {

    },
    markerUploadButton: {
        width: "90%",
        height: vh/24,
        alignSelf: "center",
        backgroundColor: "black",
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "center"
    },
    markerUploadButtonText: {
        alignSelf: "center",
        color: "white",
        fontSize: 18
    }
});

export default UploadBottomSheet;

import React, {useEffect, useMemo, useRef, useState} from 'react';
import NaverMapView, { Marker } from "react-native-nmap";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Search from "@components/Search";
import HelperInfoBottomSheet from "@components/HelperInfoBottomSheet";
import {usePostMarkerCallback, usePostRegistrationCallback} from "@apis/apiCallbackes";
import useApi from "@apis/useApi";
import {getMarker, getUser, postMarker} from "@apis/apiServices";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Map = ({ navigation }) => {
	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['15%', '50%', '100%'], []);
	const [cameraCoords, setCameraCoords] = useState({latitude: 37.5828, longitude: 127.0107})
	const [loading, resolved, callApi] = useApi(postMarker, true);

	useEffect(() => {
		console.log(cameraCoords);
	},[cameraCoords]);

	useEffect(() => {
		console.log("loading:" , loading);

	},[loading])

	useEffect(() => {
		console.log("resolved:" , resolved);

	},[resolved])

	const uploadMarker = () => {
		console.log("upload");
		callApi(
			JSON.stringify({
			"longitude": cameraCoords.longitude,
			"latitude": cameraCoords.latitude,
			"image": null,
			"explanation": "test6"
		})).then(r => {console.log("marker upload finish", r.data)})
		.catch(err => {console.log(err)});
	}

	 return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
			>
				<HelperInfoBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} />
			</BottomSheetModal>
			<View style={styles.centerMarker}></View>
			<TouchableOpacity  style={styles.markerUploadButton} onPress={uploadMarker}>
				<Text style={styles.markerUploadButtonText}>
					결정
				</Text>
			</TouchableOpacity>
			<NaverMapView
				style={{width: '100%', height: '100%'}}
				showsMyLocationButton={false}
				useTextureView={true}
				onCameraChange={(e) => {
					setCameraCoords({
						latitude: e.latitude,
						longitude: e.longitude
					})
				}}
			>
				<Marker
					coordinate={{latitude: 37.5828, longitude: 127.0107}}
					onClick={() => {
						console.log("click");
						bottomSheetModalRef.current?.present();
					}}
				/>
			</NaverMapView>

			<Search />
		</>
	);
};

const styles = StyleSheet.create({
	centerMarker: {
		position: "absolute",
		width: 10,
		height: 10,
		backgroundColor: "red",
		left: vw/2-5,
		top: vh/2-5,
		zIndex: 2
	},
	markerUploadButton: {
		position: "absolute",
		width: 100,
		height: 30,
		backgroundColor: "blue",
		left: vw/2-50,
		top: vh/4 * 3 - 100,
		zIndex: 3,
		justifyContent: "center"
	},
	markerUploadButtonText: {
		alignSelf: "center",
		color: "white"
	}
});

export default Map;

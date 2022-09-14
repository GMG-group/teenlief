import React, {useEffect, useMemo, useRef, useState} from 'react';
import NaverMapView, { Marker } from "react-native-nmap";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Search from "@components/Search";
import MarkerDetailBottomSheet from "@components/MarkerDetailBottomSheet";
import useApi from "@apis/useApi";
import {getMarkerSimple, getShelters, getUser, postMarker} from "@apis/apiServices";
import {useRecoilValue} from "recoil";
import {ACTION, actionState} from "@apis/atoms";
import {BackButton} from "@components/BackButton";
import UploadBottomSheet from "@components/UploadBottomSheet";
import ShelterDetailBottomSheet from "@components/ShelterDetailBottomSheet";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Map = ({ route, navigation }) => {
	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const [cameraCoords, setCameraCoords] = useState({latitude: 37.5828, longitude: 127.0107})
	const [selectedMarkerId, setSelectedMarkerId] = useState();
	const [markersLoading, markers, getMarkers, setMarkersLoading] = useApi(getMarkerSimple, true);
	const [sheltersLoading, shelters, getSheltersCallback, setSheltersLoading] = useApi(getShelters, true);
	const [shelterPressed, setShelterPressed] = useState(false);
	const [selectedShelter, setSelectedShelter] = useState();
	const action = useRecoilValue(actionState);
	const snapPoints = useMemo(() => {
		if(action === ACTION.Main) {
			if(shelterPressed) {
				return ['34%'];
			} else {
				return ['15%', '50%', '100%'];
			}
		} else if (action === ACTION.Upload) {
			return ['20%', '50%'];
		}
	}
	, [action, shelterPressed]);

	useEffect(() => {
		console.log("action", action);
		getMarkers();
		getSheltersCallback();
	},[])

	useEffect(() => {
		if(!markersLoading) {
			console.log("markers", markers);
		}
	},[markersLoading])

	useEffect(() => {
		console.log(cameraCoords);
	},[cameraCoords]);

	useEffect(() => {
		if(action===ACTION.Upload) {
			bottomSheetModalRef.current?.present();
		}
	},[action])


	const handleBottomSheet = () => {
		if(action===ACTION.Upload) {
			return <UploadBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} cameraCoords={cameraCoords} />
		} else {
			if(shelterPressed) {
				return <ShelterDetailBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} shelter={selectedShelter}/>
			} else {
				return <MarkerDetailBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} selectedMarkerId={selectedMarkerId}/>
			}
		}
	}

	 return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				onDismiss={() => {
					if(action===ACTION.Upload) {
						bottomSheetModalRef.current?.present();
					}
				}}
			>
				{handleBottomSheet()}
				
			</BottomSheetModal>
			{
				action==="upload" ? (
					<>
						<BackButton/>
						<View style={styles.centerMarker}>
							<Text style={styles.centerMarkerText}>지정</Text>
						</View>
						<View style={styles.centerMarkerCol}></View>
					</>
				) : null
			}

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
				{
					(!markersLoading && action !== ACTION.Upload) && markers.map((marker, idx) => (
						<Marker
							key={idx}
							width={60}
							height={60}
							coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
							onClick={() => {
								console.log("click",marker.id);
								setSelectedMarkerId(marker.id);
								setShelterPressed(false);
								bottomSheetModalRef.current?.present();
							}}
						><View style={{flexDirection: 'row'}}>
							<Image
								source={require('../assets/images/marker_blue.png')}
								style={{width:60, height:60}}
								fadeDuration={0}
							/>
						</View>
						</Marker>
					))}
				{(!sheltersLoading && action !== ACTION.Upload) && shelters.map((shelter, idx) => (
						<Marker
							key={idx}
							width={60}
							height={60}
							coordinate={{latitude: parseFloat(shelter.latitude), longitude: parseFloat(shelter.longitude)}}
							onClick={() => {
								setShelterPressed(true);
								setSelectedShelter(shelter);
								bottomSheetModalRef.current?.present();
							}}
						><View style={{flexDirection: 'row'}}>
							<Image
								source={require('../assets/images/marker_blue.png')}
								style={{width:60, height:60}}
								fadeDuration={0}
							/>
						</View>
						</Marker>
					))
				}
			</NaverMapView>

			{
				action==="upload" ? null : <Search />
			}

		</>
	);
};

const styles = StyleSheet.create({
	centerMarker: {
		position: "absolute",
		width: 60,
		height: 30,
		backgroundColor: "black",
		left: vw/2-30,
		top: vh/2-70,
		zIndex: 2,
		justifyContent: "center",
		borderRadius: 5
	},
	centerMarkerCol: {
		position: "absolute",
		width: 2,
		height: 20,
		backgroundColor: "black",
		left: vw/2-1,
		top: vh/2-40,
		zIndex: 2
	},
	centerMarkerText: {
		color: "white",
		alignSelf: "center"
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

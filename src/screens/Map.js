import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import NaverMapView, { Marker } from "react-native-nmap";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {Dimensions, Image, Platform, StyleSheet, Text, View} from "react-native";
import Search from "@components/Search";
import MarkerDetailBottomSheet from "@components/MarkerDetailBottomSheet";
import useApi from "@apis/useApi";
import {getMarkerSimple, getShelters, getUser, postMarker} from "@apis/apiServices";
import {useRecoilValue} from "recoil";
import {ACTION, actionState} from "@apis/atoms";
import {BackButton} from "@components/BackButton";
import UploadBottomSheet from "@components/UploadBottomSheet";
import ShelterDetailBottomSheet from "@components/ShelterDetailBottomSheet";
import {CustomMarker} from "@components/CustomMarker";
import useSupercluster from "use-supercluster";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Map = ({ route, navigation }) => {
	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const [cameraInfo, setCameraInfo] = useState({latitude: 37.5828, longitude: 127.0107, zoom: 14, contentRegion: [{"latitude": 37.55385286915707, "longitude": 126.96997669210964}, {"latitude": 37.57936534636272, "longitude": 126.96997669210964}, {"latitude": 37.57936534636272, "longitude": 126.98679950788988}, {"latitude": 37.55385286915707, "longitude": 126.98679950788988}, {"latitude": 37.55385286915707, "longitude": 126.96997669210964}]})
	const [selectedMarkerId, setSelectedMarkerId] = useState();
	const [markersLoading, markers, getMarkers, setMarkersLoading] = useApi(getMarkerSimple, true);
	const [sheltersLoading, shelters, getSheltersCallback, setSheltersLoading] = useApi(getShelters, true);
	const [shelterPressed, setShelterPressed] = useState(false);
	const [selectedShelterId, setSelectedShelterId] = useState();

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
		getMarkers();
		getSheltersCallback();
	},[])

	useEffect(() => {
		console.log(cameraInfo);
	},[cameraInfo]);

	useEffect(() => {
		if(action===ACTION.Upload) {
			bottomSheetModalRef.current?.present();
		}
	},[action])


	const handleBottomSheet = () => {
		if(action===ACTION.Upload) {
			return <UploadBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} cameraCoords={{latitude:cameraInfo.latitude, longitude: cameraInfo.longitude}} />
		} else {
			if(shelterPressed) {
				return <ShelterDetailBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} shelterId={selectedShelterId}/>
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

			{!sheltersLoading && !markersLoading && <ClusterMap
				setCameraInfo={setCameraInfo}
				cameraInfo={cameraInfo}
				markersLoading={markersLoading}
				action={action}
				markers={markers}
				setSelectedMarkerId={setSelectedMarkerId}
				setShelterPressed={setShelterPressed}
				bottomSheetModalRef={bottomSheetModalRef}
				sheltersLoading={sheltersLoading}
				shelters={shelters}
				setSelectedShelterId={setSelectedShelterId}
			/>}

			{
				action==="upload" ? null : <Search displayTag={true}/>
			}

		</>
	);
};

const ClusterMap = ({cameraInfo, setCameraInfo, markersLoading, action, markers, setSelectedMarkerId, setShelterPressed, bottomSheetModalRef, sheltersLoading, shelters, setSelectedShelterId}) => {
	// const [zoom, setZoom] = useState(14);
	// const [bounds, setBounds] = useState([126.96785851679073 ,37.55217298991133, 126.98468133257103, 37.5776860423595]);

	const generatePoints = useCallback(() => {
		let markerPoints = [], shelterPoints = [];
		markerPoints = markers.map((marker) => ({
			type: "Feature",
			properties: { cluster: false, id: marker.id, category: 'marker' },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(marker.longitude),
					parseFloat(marker.latitude)
				]
			}
		}));
		shelterPoints = shelters.map((shelter) => ({
			type: "Feature",
			properties: { cluster: false, id: shelter.id, category: 'shelter' },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(shelter.longitude),
					parseFloat(shelter.latitude)
				]
			}
		}));
		return markerPoints + shelterPoints;
	}, [markers, shelters])


	const markerCluster = useSupercluster({
		points: markers.map((marker) => ({
			type: "Feature",
			properties: { cluster: false, id: marker.id, category: 'marker' },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(marker.longitude),
					parseFloat(marker.latitude)
				]
			}
		})),
		bounds: [cameraInfo.contentRegion[1].longitude, cameraInfo.contentRegion[3].latitude, cameraInfo.contentRegion[3].longitude, cameraInfo.contentRegion[1].latitude],
		zoom: cameraInfo.zoom,
		options: { radius: 20, maxZoom: 18 }
	});

	const shelterCluster = useSupercluster({
		points: shelters.map((shelter) => ({
			type: "Feature",
			properties: { cluster: false, id: shelter.id, category: 'shelter' },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(shelter.longitude),
					parseFloat(shelter.latitude)
				]
			}
		})),
		bounds: [cameraInfo.contentRegion[1].longitude, cameraInfo.contentRegion[3].latitude, cameraInfo.contentRegion[3].longitude, cameraInfo.contentRegion[1].latitude],
		zoom: cameraInfo.zoom,
		options: { radius: 50, maxZoom: 18 }
	});

	return (
		<NaverMapView
			style={{width: '100%', height: '100%'}}
			showsMyLocationButton={false}
			useTextureView={true}
			onCameraChange={(e) => {
				// setZoom(e.zoom);
				// setBounds([e.contentRegion[1].longitude, e.contentRegion[3].latitude, e.contentRegion[3].longitude, e.contentRegion[1].latitude]);
				setCameraInfo({
					...e,
				})
			}}
		>
			{markerCluster.clusters.map(cluster => {
				const [longitude, latitude] = cluster.geometry.coordinates;
				const {
					cluster: isCluster,
					point_count: pointCount
				} = cluster.properties;

				if (isCluster) {
					return (
					<CustomMarker
						key={`cluster-${cluster.properties.cluster_id}`}
						coordinate={{latitude: latitude, longitude: longitude}}
						idx={cluster.properties.id}
					>
						<Image
							source={require('../assets/images/cluster_marker.png')}
							style={{width:50, height:55}}
							fadeDuration={0}
						/>
					</CustomMarker>
					);
				}

				return (
					<CustomMarker
						key={`marker-${cluster.properties.id}`}
						coordinate={{latitude: latitude, longitude: longitude}}
						onClick={() => {
							console.log("marker!!!")
							setSelectedMarkerId(cluster.properties.id);
							setShelterPressed(false);
							bottomSheetModalRef.current?.present();
						}}
					>
						<Image
							source={require('../assets/images/marker_helper.png')}
							style={{width:60, height:60}}
							fadeDuration={0}
						/>
					</CustomMarker>
				);
			})}
			{shelterCluster.clusters.map(cluster => {
				const [longitude, latitude] = cluster.geometry.coordinates;
				const {
					cluster: isCluster,
					point_count: pointCount
				} = cluster.properties;

				if (isCluster) {
					return (
						<CustomMarker
							key={`cluster-${cluster.properties.cluster_id}`}
							coordinate={{latitude: latitude, longitude: longitude}}
							idx={cluster.properties.id}
						>
							<Image
								source={require('../assets/images/cluster_marker.png')}
								style={{width:50, height:55}}
								fadeDuration={0}
							/>
						</CustomMarker>
					);
				}

				return (
					<CustomMarker
						key={`shelter-${cluster.properties.id}`}
						coordinate={{latitude: latitude, longitude: longitude}}
						idx={cluster.properties.id}
						onClick={() => {
							console.log("shelter clicked")
							setShelterPressed(true);
							setSelectedShelterId(cluster.properties.id);
							bottomSheetModalRef.current?.present();

						}}
					>
						<Image
							source={require('../assets/images/marker_shelter.png')}
							style={{width:60, height:60}}
							fadeDuration={0}
						/>
					</CustomMarker>
				);
			})}
		</NaverMapView>
	)
}

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
	},
	clusterMarker: {
		color: "white",
		backgroundColor: "#1978c8",
		borderRadius: 10,
		padding: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	crimeMarker: {
		backgroundColor: "white",
	},
	crimeMarkerImage: {
		width: 25
	}
});

export default Map;

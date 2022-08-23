import React, {useMemo, useRef} from 'react';
import NaverMapView, { Marker } from "react-native-nmap";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {Dimensions, StyleSheet, View} from "react-native";
import Search from "@components/Search";
import HelperInfoBottomSheet from "@components/HelperInfoBottomSheet";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Map = ({ navigation }) => {
	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['15%', '50%', '100%'], []);

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
			>
				<HelperInfoBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} />
			</BottomSheetModal>

			<NaverMapView
				style={{width: '100%', height: '100%'}}
				showsMyLocationButton={false}
				useTextureView={true}
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
	}
});

export default Map;

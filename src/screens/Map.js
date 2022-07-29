import React, {useMemo, useRef} from 'react';
import { Text, View } from "react-native";
import NaverMapView, { Marker } from "react-native-nmap";
import Search from "@components/Search";
import {BottomSheetModal} from "@gorhom/bottom-sheet";

const Map = () => {
	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], []);

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
			>
				<Text>Awesome 🎉</Text>
			</BottomSheetModal>

			<NaverMapView
				style={{width: '100%', height: '100%'}}
				showsMyLocationButton={false}
			>
				<Marker coordinate={{latitude: 37.5828, longitude: 127.0107}} onClick={() => {
					console.log("click");
					bottomSheetModalRef.current?.present();
				}} />
			</NaverMapView>

			<Search />
		</>
	);
};

export default Map;

import React from 'react';
import NaverMapView from "react-native-nmap";
import Search from "@components/Search";
import { View } from "react-native";

const Map = () => {
	return (
		<View>
			<NaverMapView
				style={{width: '100%', height: '100%'}}
				showsMyLocationButton={true}
			>
			</NaverMapView>

			<Search />
		</View>
	);
};

export default Map;

import React from 'react';
import NaverMapView from "react-native-nmap";
import Search from "@components/Search";
import {Dimensions, StyleSheet, View} from "react-native";
import {Marker, Path, Polygon, Polyline} from "react-native-nmap/index";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Map = () => {
	const P0 = {latitude: 37.564362, longitude: 126.977011};
	const P1 = {latitude: 37.565051, longitude: 126.978567};
	const P2 = {latitude: 37.565383, longitude: 126.976292};

	return (
		<View>
			<View style={styles.centerMarker}></View>
			<NaverMapView
				style={{width: '100%', height: '100%'}}
				showsMyLocationButton={true}
			>
				<Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
				<Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
				<Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>

			</NaverMapView>

			<Search />
		</View>
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

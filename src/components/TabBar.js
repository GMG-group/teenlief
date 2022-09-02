import React, {useState} from 'react';
import {Alert, Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { scale } from 'react-native-utils-scale';
import Icon from 'react-native-vector-icons/Feather';

import Bookmark from "~/screens/Bookmark";
import Profile from "@screens/Profile";
import Map from "@screens/Map";

export const TabBar = ({ navigation }) => {
	const [route, setRoute] = useState("Map");
	const [markerUpload, setMarkerUpload] = useState(false);
	const _renderIcon = (routeName, selectedTab) => {
		let icon = '';
		switch (routeName) {
			case 'Bookmark':
				icon = 'bookmark';
				break;
			case 'Profile':
				icon = 'user';
				break;
		}

		return (
			<Icon
				name={icon}
				size={scale(25)}
				color={routeName === selectedTab ? 'black' : 'gray'}
			/>
		);
	};
	const renderTabBar = ({ routeName, selectedTab, navigate }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					setRoute(routeName);
					navigate(routeName);
				}}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				{_renderIcon(routeName, selectedTab)}
			</TouchableOpacity>
		);
	};

	const MapCircle = () => (
		<Animated.View style={styles.btnCircle}>
			<TouchableOpacity
				style={{
					flex: 1,
					justifyContent: 'center',
				}}
				onPress={() => {
					setRoute("Map");
					navigation.navigate("Map")
				}}>
				<Icon name={'search'} color="black" size={scale(25)} />
			</TouchableOpacity>
		</Animated.View>
	)

	const AddMarkerCircle = () => (
		<Animated.View style={styles.btnCircle}>
			<TouchableOpacity
				style={{
					flex: 1,
					justifyContent: 'center',
				}}
				onPress={() => {
					setMarkerUpload(markerUpload => !markerUpload);
					navigation.navigate("Map", {
						markerUpload: markerUpload
					})
				}}>
				<Icon name={'map-pin'} color="black" size={scale(25)} />
			</TouchableOpacity>
		</Animated.View>
	)

	return (
		<View style={{ flex: 1 }}>
			<CurvedBottomBar.Navigator
				style={styles.bottomBar}
				strokeWidth={0.5}
				height={scale(55)}
				circleWidth={scale(55)}
				bgColor="white"
				initialRouteName="Map"
				renderCircle={route==="Map" ? AddMarkerCircle : MapCircle}
				tabBar={renderTabBar}>
				<CurvedBottomBar.Screen
					options={{ headerShown: false }}
					name="Map"
					component={Map}
					initialParams={{ markerUpload: false }}
					position="CENTER"
				/>
				<CurvedBottomBar.Screen
					options={{ headerShown: false }}
					name="Bookmark"
					position="LEFT"
					component={Bookmark}
				/>
				<CurvedBottomBar.Screen
					options={{ headerShown: false }}
					name="Profile"
					component={Profile}
					position="RIGHT"
				/>
			</CurvedBottomBar.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: scale(20),
	},
	button: {
		marginVertical: scale(5),
	},
	bottomBar: {
	},
	btnCircle: {
		width: scale(60),
		height: scale(60),
		borderRadius: scale(35),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: scale(10),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 1,
		bottom: scale(30),
	},
	imgCircle: {
		width: scale(30),
		height: scale(30),
		tintColor: 'gray',
	},
	img: {
		width: scale(30),
		height: scale(30),
	},
});

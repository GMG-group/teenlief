import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { scale } from 'react-native-utils-scale';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chat from "~/screens/Chat";
import Profile from "@screens/Profile";
import Map from "@screens/Map";
import { useRecoilState, useRecoilValue } from "recoil";
import { ACTION, SCREEN, actionState, userState } from "@apis/atoms";

export const TabBar = ({ navigation }) => {
	const [route, setRoute] = useState("Map");
	const [action, setAction] = useRecoilState(actionState);
	const user = useRecoilValue(userState);

	const _renderIcon = (routeName, selectedTab) => {
		if(routeName === 'Chat') {
			return (
				<EntypoIcon
					name={'chat'}
					size={scale(25)}
					color={routeName === selectedTab ? 'black' : 'gray'}
				/>
			)
		} else if(routeName === 'Profile') {
			return (
				<Ionicons
					name={'person-circle-sharp'}
					size={scale(30)}
					color={routeName === selectedTab ? 'black' : 'gray'}
				/>
			)
		}
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
		<Animated.View style={{...styles.btnCircle, backgroundColor: user?.role==='Helper' ? '#AE46FF' : '#00A3FF'}}>
			<TouchableOpacity
				style={{
					flex: 1,
					justifyContent: 'center',
				}}
				onPress={() => {
					setRoute(SCREEN.Map);
					navigation.navigate(SCREEN.Map)
				}}>
				<EntypoIcon style={{alignSelf: 'center'}} name={'home'} color="white" size={scale(25)} />
				<Text  style={styles.btnCircleText}>홈 화면</Text>
			</TouchableOpacity>
		</Animated.View>
	)

	const AddMarkerCircle = () => {
		if (user.certificated) {
			return (
				<Animated.View
					style={{...styles.btnCircle, backgroundColor: user?.role === 'Helper' ? '#AE46FF' : '#00A3FF'}}>
					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: 'center'
						}}
						onPress={() => {
							setAction(ACTION.Upload);
							navigation.navigate(SCREEN.Map)
						}}>
						<EntypoIcon style={{alignSelf: 'center'}} name={'flag'} color="white" size={scale(25)}/>
						<Text style={styles.btnCircleText}>깃발 놓기</Text>
					</TouchableOpacity>
				</Animated.View>
			);
		} else {
			return (
				<Animated.View
					style={{...styles.btnCircle, backgroundColor: user?.role === 'Helper' ? '#AE46FF' : '#00A3FF'}}>
					<TouchableOpacity
						style={{
							flex: 1,
							justifyContent: 'center'
						}}
						onPress={() => {
							navigation.navigate(SCREEN.Certification);
						}}>
						<EntypoIcon style={{alignSelf: 'center'}} name={'flag'} color="white" size={scale(25)}/>
						<Text style={styles.btnCircleText}>본인 인증</Text>
					</TouchableOpacity>
				</Animated.View>
			);
		}
	}

	if(action === "upload") {
		return <Map navigation={navigation}/>
	}

	return (
		<View style={{ flex: 1 }}>
			<CurvedBottomBar.Navigator
				style={styles.bottomBar}
				strokeWidth={0.5}
				height={scale(60)}
				circleWidth={scale(60)}
				bgColor="white"
				initialRouteName="Map"
				renderCircle={route==="Map" && user?.role==="Helper" ? AddMarkerCircle : MapCircle}
				tabBar={renderTabBar}>
				<CurvedBottomBar.Screen
					options={{ headerShown: false }}
					name="Map"
					component={Map}
					position="CENTER"
				/>
				<CurvedBottomBar.Screen
					options={{ headerShown: false }}
					name="Chat"
					position="LEFT"
					component={Chat}
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
		width: scale(65),
		height: scale(65),
		borderRadius: scale(35),
		alignItems: 'center',
		justifyContent: 'center',
		padding: scale(10),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0.5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 5,
		bottom: scale(30),
	},
	btnCircleText: {
		marginTop: 4,
		color: 'white',
		fontSize: 9,
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

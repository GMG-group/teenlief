import React, {useEffect, useState} from 'react';
import { SafeAreaView, View } from "react-native";
import {
	NavigationContainer,
	NavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBar } from '@components/TabBar';
import Login from "@screens/Login"
import SignUp from '@screens/SignUp';
import ChatRoom from '@screens/ChatRoom';
import Review from "@screens/Review";
import Donate from "@screens/Donate";
import Certification from "@screens/Certification";
import {SCREEN} from "@apis/atoms";
import {useRecoilValue} from "recoil";
import {tokenState} from "@apis/atoms";
import Promise from "@screens/Promise";
import SplashScreen from '@screens/SplashScreen';
import MarkerManage from '@screens/profile/MarkerManage';
import Profile from '@screens/Profile';
import MarkerRiviewList from '@screens/MarkerReviewList';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
	React.createRef();
const Stack = createNativeStackNavigator();

const Main = () => {
	const token = useRecoilValue(tokenState);
	const [splash, setSplash] = useState(true);

	useEffect(() => {
		console.log("main.js", token);
	},[token]);

	return (
		<View style={{flex: 1}}>
			{
				splash ?
					<SplashScreen
						setSplash={setSplash}
					/>
					:
					<NavigationContainer ref={navigationRef}>
						<Stack.Navigator>
							{
								token.accessToken === "" ? (
									<>
										<Stack.Screen
											name={SCREEN.Login}
											component={Login}
											options={{
												headerShown: false,
											}}
										/>
										<Stack.Screen
											name={SCREEN.SignUp}
											component={SignUp}
											options
												={{
												headerShown: false,
											}}
										/>
									</>
								) : null
							}
							<Stack.Screen
								name={SCREEN.Home}
								component={TabBar}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={SCREEN.Review}
								component={Review}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={SCREEN.ChatRoom}
								component={ChatRoom}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={SCREEN.Promise}
								component={Promise}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={SCREEN.MarkerManage}
								component={MarkerManage}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={SCREEN.Donate}
								component={Donate}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name={SCREEN.Certification}
								component={Certification}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name='ReviewList'
								component={ReviewList}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name='MarkerRiviewList'
								component={MarkerRiviewList}
								options={{
									headerShown: false,
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
			}
		</View>
	);
};

export default Main;
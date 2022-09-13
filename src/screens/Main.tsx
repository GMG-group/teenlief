import React, {useEffect} from 'react';
import { SafeAreaView } from "react-native";
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
import {useRecoilValue} from "recoil";
import {tokenState} from "@apis/atoms";
import SplashScreen from '@screens/SplashScreen';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
	React.createRef();
const Stack = createNativeStackNavigator();

const Main = () => {
	const token = useRecoilValue(tokenState);

	useEffect(() => {
		console.log("main.js", token);
	},[token]);

	return (
		<SafeAreaView style={{flex: 1}}>
			<NavigationContainer ref={navigationRef}>
			    <Stack.Navigator>
					{
						token.accessToken === "" ? (
							<>
								<Stack.Screen
									name='Login'
									component={Login}
									options={{
										headerShown: false,
									}}
								/>
								<Stack.Screen
									name='Sign up'
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
						name='Home'
						component={TabBar}
						options={{
							headerShown: false,
					  	}}
					/>
					<Stack.Screen
						name='Review'
						component={Review}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='ChatRoom'
						component={ChatRoom}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			{/* <SplashScreen /> */}
		</SafeAreaView>
	);
};

export default Main;
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
	NavigationContainer,
	NavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBar } from '@components/TabBar';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
	React.createRef();
const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen
						name="Main"
						component={TabBar}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	)
}

export default App;

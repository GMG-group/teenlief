import React, {useEffect} from 'react';
import { SafeAreaView } from "react-native";
import {
	NavigationContainer,
	NavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBar } from '@components/TabBar';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
	React.createRef();
const Stack = createNativeStackNavigator();

const Main = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<NavigationContainer ref={navigationRef}>
				<TabBar />
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default Main;

import React, {useEffect} from 'react';
import { SafeAreaView } from "react-native";
import {
	NavigationContainer,
	NavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBar } from '@components/TabBar';

const Main = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<NavigationContainer>
				<TabBar />
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default Main;

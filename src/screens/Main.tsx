import React from 'react';
import { SafeAreaView } from "react-native";
import {
	NavigationContainer,
	NavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabBar } from '@components/TabBar';
import Login from "@screens/Login"
import SignUp from '@screens/SignUp';

const Main = () => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<NavigationContainer>
			    <Stack.Navigator>
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
					<Stack.Screen
						name='Home'
						component={TabBar}
						options={{
							headerShown: false,
					  	}}
						/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default Main;

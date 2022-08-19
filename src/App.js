import React from 'react';
import {RecoilRoot} from "recoil";
import ReactNativeRecoilPersist, {
	ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import Main from "@screens/Main"
import {Text} from "react-native";

const App = () => {
	return (
		<RecoilRoot>
			<ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
				<React.Suspense fallback={<Text>Loading...</Text>}>
					<Main />
				</React.Suspense>
			</ReactNativeRecoilPersistGate>
		</RecoilRoot>
	)
}

export default App;

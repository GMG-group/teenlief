import React from 'react';
import {RecoilRoot} from "recoil";
import ReactNativeRecoilPersist, {
	ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import Main from "@screens/Main"
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Text} from "react-native";

const App = () => {
	return (
		<RecoilRoot>
			<ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
				<React.Suspense fallback={<Text>Loading...</Text>}>
					<GestureHandlerRootView style={{flex: 1}}>
						<BottomSheetModalProvider>
							<Main />
						</BottomSheetModalProvider>
					</GestureHandlerRootView>
				</React.Suspense>
			</ReactNativeRecoilPersistGate>
		</RecoilRoot>
	)
}

export default App;

import React from 'react';
import {RecoilRoot} from "recoil";
import Main from "@screens/Main"
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Text} from "react-native";

const App = () => {
	return (
		<RecoilRoot>
			<React.Suspense fallback={<Text>Loading...</Text>}>
				<GestureHandlerRootView style={{flex: 1}}>
					<BottomSheetModalProvider>
						<Main />
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</React.Suspense>
		</RecoilRoot>
	)
}

export default App;

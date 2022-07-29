import React from 'react';
import {RecoilRoot} from "recoil";
import Main from "@screens/Main"
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {
	return (
		<RecoilRoot>
			<GestureHandlerRootView style={{flex: 1}}>
				<BottomSheetModalProvider>
					<Main />
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</RecoilRoot>
	)
}

export default App;

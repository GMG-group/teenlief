import React from 'react';
import {RecoilRoot} from "recoil";
import Main from "@screens/Main"
import {Text} from "react-native";

const App = () => {
	return (
		<RecoilRoot>
			<React.Suspense fallback={<Text>Loading...</Text>}>
				<Main />
			</React.Suspense>
		</RecoilRoot>
	)
}

export default App;

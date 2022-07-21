import React from 'react';
import {RecoilRoot} from "recoil";
import Main from "@screens/Main"

const App = () => {
	return (
		<RecoilRoot>
			<Main />
		</RecoilRoot>
	)
}

export default App;

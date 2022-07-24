import React from 'react';
import {RecoilRoot} from "recoil";
import Main from "@screens/Main"

const App = () => {
	return (
		<RecoilRoot>
			<React.Suspense>
				<Main />
			</React.Suspense>
		</RecoilRoot>
	)
}

export default App;

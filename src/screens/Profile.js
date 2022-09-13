import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useRecoilState} from "recoil";
import {Touchable} from "react-native-toast-message/lib/src/components/Touchable";
import {tokenState} from "@apis/atoms";
import RNRestart from "react-native-restart";

const Profile = () => {
	const [token, setToken] = useRecoilState(tokenState);

	const logout = () => {
		setToken(
			{
				accessToken: "",
				refreshToken: ""
			}
		)
		setTimeout(() => {
			RNRestart.Restart();
		},500)
	}

	return (
		<View style={{flex: 1}}>
			<Text>profile page</Text>
			<TouchableOpacity onPress={logout}>
				<Text>로그아웃</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Profile;

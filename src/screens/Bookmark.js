import React, {useRef, useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, FlatList} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";
import Icon from "react-native-vector-icons/Ionicons";
import ChatView from '@components/ChatView';
import test from "@components/img/test.png";
import useApi from "@apis/useApi";
import {getChatRoomList} from "@apis/apiServices";
import {useRecoilValue} from "recoil";
import {userState} from "@apis/atoms";

const Bookmark = ({navigation}) => {
	const filterTag = ["숙식", "숙식", "숙식", "숙식", "숙식", "숙식"];
	const tagListRef = useRef(null);

	const user = useRecoilValue(userState);
	const [loading, resolved, callApi] = useApi(getChatRoomList, true);
	const [chatroom, setChatroom] = useState([]);

	useEffect(() => {
		console.log("user", user);
		callApi(user.user.pk)
			.then((res) => {
				setChatroom(res);
			})
			.catch((err) => {
				console.log("Chat Room Error!", err);
			})
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.search}>
				<TextInput
					style={styles.input}
					placeholder={"여기서 검색해 주세요"} />
				<Icon name="search-outline" size={25}  />
			</View>

			<FlatList
				ref={tagListRef}
				data={filterTag}
				style={styles.filter}
				contentContainerStyle={{
					flexGrow: 1,
					alignItems: 'center',
					justifyContent: 'center',
					width: 650,
				}}
				renderItem={({item}) =>
					<View style={styles.filterItem} key={item.id}>
						<Text style={{color: 'black'}}>{ item }</Text>
					</View>
				}
				keyExtractor={(item, index) => 'key' + index}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>

			<FlatList
				scrollEnabled={true}
				style={styles.chatView}
				data={chatroom}
				renderItem={(item) => {
					return <ChatView
						data={{
							id: item.item.id,
							roomName: item.item.room_name,
							profile: test,
							name: item.item.teen.first_name,
							score: 5.0,
							favorite: false
						}}
						navigation={navigation}
					/>
				}}
				ListFooterComponent={<View style={{height: vh(8), backgroundColor: 'transparent',}} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	search: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: vw(90),
		height: 50,
		borderRadius: vw(7.5),
		paddingLeft: 20,
		paddingRight: 10,
		marginTop: 20,
		backgroundColor: '#fff',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		elevation: 10,
		color: '#000'
	},
	input: {
		width: vw(70),
	},
	filter: {
		display: "flex",
		flexDirection: "row",
		// width: vw(100),
		marginTop: 10,
		marginBottom: 30,
	},
	filterItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 90,
		height: 30,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#D3D3D3",
		borderRadius: 50,
		marginRight: 10
	},
	chatView: {
		display: 'flex',
		height: '80%',
		width: vw(90),
	},
	card: {
		height: vh(10),
		width: vw(95),
		backgroundColor: 'white',
		marginBottom: vh(1),
	},
});
export default Bookmark;

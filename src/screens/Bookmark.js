import React, {useRef, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView, FlatList} from "react-native";
import { vw, vh } from "react-native-css-vh-vw";
import Icon from "react-native-vector-icons/Ionicons";
import ChatView from '@components/ChatView';
import test from "@components/img/test.png";

const testData = [
	{
		name: '백준',
		score: 2.2,
		favorite: false,
	},
	{
		name: '길동홍',
		score: 3.0,
		favorite: true,
	},
	{
		name: '제인도',
		score: 1.9,
		favorite: false,
	},
	{
		name: '존도',
		score: 5.0,
		favorite: false,
	},
	{
		name: '흠길동',
		score: 4.5,
		favorite: false,
	},
	{
		name: '김안동',
		score: 3.5,
		favorite: false,
	},
	{
		name: '백준',
		score: 2.2,
		favorite: false,
	},
	{
		name: '백준',
		score: 2.5,
		favorite: true,
	},
	{
		name: '백준',
		score: 2.7,
		favorite: false,
	},
	{
		name: '백준',
		score: 2.1,
		favorite: true,
	},
	{
		name: '백준',
		score: 2.9,
		favorite: true,
	},
]
const Bookmark = ({navigation}) => {
	const filterTag = ["숙식", "숙식", "숙식", "숙식", "숙식", "숙식"];
	const tagListRef = useRef(null);
	return (
		<View style={styles.container}>
			<View style={styles.search}>
				
				<Icon name="logo-figma" size={25}  />
				
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
				data={testData}
                renderItem={({item}) => <ChatView 
											profile={test} 
											name={item.name} 
											score={item.score} 
											favorite={item.favorite}
											navigation={navigation} />}
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

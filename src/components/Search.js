import React, {useState, useRef, useEffect} from 'react';
import {
	TextInput,
	View,
	StyleSheet,
	Text,
	ScrollView, FlatList, TouchableOpacity, Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";
import { vw, vh } from "react-native-css-vh-vw";
import useApi from "@apis/useApi";
import {getTag} from "@apis/apiServices";

const Search = ({displayTag}) => {
	const [search, setSearch] = useState(null);
	const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
	const [filterTag, setFilterTag] = useState([]);

	useEffect(() => {
		if(!tagLoading) {
			setFilterTag(
				tagResolved.map(tag => (
					tag.tag
				))
			)
		}

	}, [tagLoading]);

	useEffect(() => {
		displayTag && tagApi()
	},[]);

	const tagListRef = useRef(null);

	return (
		<View style={styles.container}>
			<View style={styles.search}>
				<View style={styles.innerSearch}>
					<TextInput
						style={styles.input}
						onChangeText={setSearch}
						value={search}
						placeholder="여기서 검색"
					/>
				</View>
			</View>

			<FlatList
				ref={tagListRef}
				data={filterTag}
				style={styles.filter}
				contentContainerStyle={{
					flexGrow: 1,
					alignItems: 'center',
					justifyContent: 'center',
					width: filterTag.length * 110,
					// 6 -> 650
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

		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		position: 'absolute',
		alignSelf: 'center',
		alignItems: 'center',
	},
	search: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: vw(90),
		height: 50,
		borderRadius: vw(7.5),
		alignItems: 'center',
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
	innerSearch: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: vw(10),
		borderWidth: 1,
	},
	input: {
		width: vw(60)
	},
	filter: {
		display: "flex",
		flexDirection: "row",
		marginTop: 10,
	},
	filterItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 90,
		height: 30,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: '#c8c8c8',
		borderRadius: 50,
		marginRight: 10
	},
});

export default Search;

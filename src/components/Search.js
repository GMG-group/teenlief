import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from "react-native";
import { vw } from "react-native-css-vh-vw";
import useApi from "@apis/useApi";
import {getTag} from "@apis/apiServices";
import {Tag} from "@components/Tag";

const Search = ({ displayTag, filteredMarker, setFilterdMarker, setShelterFiltered }) => {
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

			{ displayTag && <Tag select all shelter onSelected={(selected) => {
				setShelterFiltered(!selected[selected.length-1].selected);
				setFilterdMarker(prev => (
					prev.map((marker) => {
						console.log("selected", selected);
						for(let el of selected) {
							console.log("el", el.id);
							console.log("marker", marker.tag);
							if(el.selected && marker.tag.includes(el.id)) {
								return {
									...marker,
									filtered: false
								}
							}
						}
						return {
							...marker,
							filtered: true
						}
					})
				))
			}}/> }
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
		color: '#000',
		marginBottom: 15,
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

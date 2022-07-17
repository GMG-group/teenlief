import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Dimensions, Text, FlatList, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Search = () => {
	const [search, setSearch] = useState(null);
	const filterTag = ["숙식", "숙식", "숙식", "숙식", "숙식", "숙식"]

	return (
		<View style={styles.container}>
			<View style={[ styles.search ]}>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Icon name="menu" size={25} color={'#000'} style={{ marginRight: 10 }} />
					<TextInput
						style={styles.input}
						onChangeText={setSearch}
						value={search}
						placeholder="여기서 검색"
					/>
				</View>
				<View style={[ styles.profileImage ]}></View>
			</View>

			<ScrollView
				style={styles.filter}
				horizontal={true}
				scrollEnabled={true}
			>
				{
					filterTag.map((item, index) => {
						return (
							<View style={styles.filterItem} key={index}>
								<Text style={{color: 'black'}}>{ item }</Text>
							</View>
						)
					})
				}
			</ScrollView>
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
		width: 0.9 * vw,
		height: 50,
		borderRadius: 0.075 * vw,
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
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 0.1 * vw,
		borderWidth: 1
	},
	input: {
		width: 0.6 * vw
	},
	filter: {
		display: "flex",
		flexDirection: "row",
		width: 0.9 * vw,
		marginTop: 10
	},
	filterItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 90,
		height: 30,
		backgroundColor: "white",
		borderWidth: 1,
		borderRadius: 50,
		marginRight: 10
	}
});

export default Search;

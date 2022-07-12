import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const Search = () => {
	const [search, setSearch] = useState(null);

	return (
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
	);
};

const styles = StyleSheet.create({
	search: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		position: 'absolute',
		alignSelf: 'center',
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
	}
});

export default Search;

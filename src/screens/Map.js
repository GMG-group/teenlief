import React, {useMemo, useRef} from 'react';
import NaverMapView, { Marker } from "react-native-nmap";
import {BottomSheetModal} from "@gorhom/bottom-sheet";

import Search from "@components/Search";
import HelperInfoBottomSheet from "@components/HelperInfoBottomSheet";

const Map = ({ navigation }) => {
	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['50%', '100%'], []);

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
			>
				<HelperInfoBottomSheet navigation={navigation} bottomSheetModalRef={bottomSheetModalRef} />
			</BottomSheetModal>

			<NaverMapView
				style={{width: '100%', height: '100%'}}
				showsMyLocationButton={false}
			>
				<Marker
					coordinate={{latitude: 37.5828, longitude: 127.0107}}
					onClick={() => {
						console.log("click");
						bottomSheetModalRef.current?.present();
					}}
				/>
			</NaverMapView>

			<Search />
		</>
	);
};

export default Map;

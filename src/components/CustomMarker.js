import React from 'react';
import {Image, View} from "react-native";
import {Marker} from "react-native-nmap";

export const CustomMarker = ({children, marker, idx, onClick}) => {
    return (
        <Marker
            key={idx}
            width={60}
            height={60}
            coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
            onClick={() => {
               onClick();
            }}
        ><View style={{flexDirection: 'row'}}>
            {children}
        </View>
        </Marker>
    )
}
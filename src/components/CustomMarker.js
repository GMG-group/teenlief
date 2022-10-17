import React from 'react';
import {Image, View} from "react-native";
import {Marker} from "react-native-nmap";

export const CustomMarker = ({children, coordinate, idx, onClick}) => {
    return (
        <Marker
            key={idx}
            width={60}
            height={60}
            coordinate={coordinate}
            onClick={() => {
               onClick();
            }}
        ><View style={{flexDirection: 'row'}}>
            {children}
        </View>
        </Marker>
    )
}
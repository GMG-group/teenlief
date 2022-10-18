import React from 'react';
import {Image, View} from "react-native";
import {Marker} from "react-native-nmap";

export const CustomMarker = ({children, coordinate, onClick}) => {
    return (
        <Marker
            width={50}
            height={50}
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
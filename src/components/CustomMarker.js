import React from 'react';
import {Image, View, Platform} from "react-native";
import {Marker} from "react-native-nmap";

export const CustomMarker = ({children, coordinate, onClick, image}) => {
    return (
        <>
            {
                Platform.OS === 'ios' ? (
                    <Marker coordinate={coordinate} width={50} height={50} image={require('../assets/images/cluster_marker.png')} onClick={onClick} />
                ) : (
                    <Marker
                        width={50}
                        height={50}
                        coordinate={coordinate}
                        onClick={() => {
                            onClick();
                        }}
                    >
                        <View style={{flexDirection: 'row'}}>
                            {children}
                        </View>
                    </Marker>
                )
            }
        </>
    )
}
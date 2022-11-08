import React from 'react';
import {Image, View, Platform} from "react-native";
import {Marker} from "react-native-nmap";

export const CustomMarker = ({
    coordinate,
    onClick,
    width,
    height,
    image
}) => {
    return (
        <>
            {
                Platform.OS === 'ios' ? (
                    <Marker coordinate={coordinate} width={50} height={50} image={require('../assets/images/cluster_marker.png')} onClick={onClick} />
                ) : (
                    <Marker
                        width={width}
                        height={height}
                        coordinate={coordinate}
                        onClick={() => {
                            onClick && onClick();
                        }}
                        image={image}
                    />
                )
            }
        </>
    )
}
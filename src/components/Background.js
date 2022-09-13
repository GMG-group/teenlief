import React, {useEffect, useState} from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, Image, Animated } from "react-native";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const color = '#1E90FF';

const Background = ({backgroundAnimation,blobChangeAnimation,blobColor, changeColor, color}) => {
    const [blobsAnimation, setBlobsAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(backgroundAnimation, {
            toValue: changeColor === 'Teen' ? 0 : 1,
            useNativerDriver: true,
            duration: 1000,
        }).start();
    }, [backgroundAnimation, changeColor]);

    useEffect(() => {
        Animated.timing(blobChangeAnimation, {
            toValue: changeColor === 'Teen' ? 0 : 1,
            useNativerDriver: true,
            duration: 1000,
        }).start();
    }, [blobChangeAnimation, changeColor]);

    useEffect(() => {
        Animated.sequence([
            Animated.delay(0),
            Animated.loop(
                Animated.timing(blobsAnimation, {
                    toValue: 1,
                    useNativerDriver: true,
                    duration: 10000
                })
            )
        ]).start();
    }, []);

    const dotInterpolate = blobsAnimation.interpolate({
        inputRange: [0, .3, .7, 1],
        outputRange: [40, 100, 200, 40]
    });
    return (
        <View>
            <Animated.View style={[styles.background ,{backgroundColor: color}]}>
                <Animated.View style={[styles.blobs, {
                    backgroundColor: blobColor,
                    borderBottomLeftRadius: 20+100,
                    borderBottomEndRadius: dotInterpolate,
                    borderTopLeftRadius: dotInterpolate,
                    borderTopRightRadius: 100+50,
                }]} />
            </Animated.View>
            <Text style={styles.top}>청소년을 보호하기 위한 teenlief 앱 입니다.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: 0.65 * vh,
        borderBottomRightRadius: 200,
        borderBottomLeftRadius: 40,
    },
    blobs: {
        position: "absolute",
        top: '20%',
        left: '20%',
        width: 220,
        height: 220,
        backgroundColor: '#B355FC',
        // borderTopStartRadius: 40,
        // borderTopRightRadius: 100,
        // borderBottomRightRadius: 70,
        // borderBottomStartRadius: 100,
    },
    top: {
        marginTop: 50,
        marginLeft: 20,
        color: 'white',
        fontSize: 27,
        width: '70%',
    },
});

export default Background;
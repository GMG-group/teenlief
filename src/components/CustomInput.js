import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, Image } from "react-native";

const CustomInput = ( {placeHolder, value, setValue, password} ) => {
    const onChange = (text) => {
        setValue(text);
    }
    return (
        <View>
            <TextInput 
                value={value}
                placeholder={placeHolder}
                style={styles.textInput}
                onChangeText={text => onChange(text)}
                secureTextEntry={password}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 17,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        marginBottom: 10,
    },
});
export default CustomInput;
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import Header from "@components/Header";
import {vh, vw} from "react-native-css-vh-vw";
import useApi from "@apis/useApi";
import {postPointEvent} from "@apis/apiServices";
import {useRecoilValue} from "recoil";
import {userState} from "@apis/atoms";
import Toast from "react-native-toast-message";

const Donate = ({ navigation, route }) => {
    const [postDonateLoading, postDonateResolved, donateApi] = useApi(postPointEvent, true);
    const user = useRecoilValue(userState);

    const donate = () => {
        if (user.user.id === route.params.helper.id) {
            Toast.show({
                type: 'error',
                text1: '후원 실패',
                text2: '자신에게는 후원할 수 없습니다.',
            });
            return;
        }
        console.log(route.params);
        const formData = new FormData();
        formData.append('point', 1000);
        formData.append('sender', user.user.id);
        formData.append('receiver', route.params.helper.id);

        donateApi(formData)
            .then((res) => {
                console.log(res);
                if (res === false) {
                    Toast.show({
                        type: 'error',
                        text1: '후원 실패',
                        text2: '후원에 실패했습니다.',
                    });
                } else {
                    Toast.show({
                        type: 'success',
                        text1: '후원 성공',
                        text2: '후원에 성공했습니다.',
                    });
                    navigation.goBack();
                }
            })
    }

    return (
        <View style={{ backgroundColor: "white", width: '100%', height: '100%', alignItems: 'center' }}>
            <Header title="마커 관리" navigation={navigation} />

            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardLeft} />
                    <View style={styles.cardRight} />
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>김홍길</Text>
                        <Text style={{ ...styles.cardText, fontSize: 20, marginTop: vh(1) }}>P 20000</Text>
                        <Text style={{ ...styles.cardText, fontSize: 20, marginTop: vh(1), letterSpacing: 3 }}>
                            •••• •••• •••• 1234
                        </Text>
                        <Text style={{ ...styles.cardText, fontSize: 24, marginTop: vh(4), fontStyle: 'italic' }}>
                            TEENLIEF CARD
                        </Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputItem}>
                        <Text style={{marginRight: 20}}>받는 사람</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#000"
                            maxLength={16}
                            editable={false}
                            color="#000"
                            value="김홍길"
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Text style={{marginRight: 20}}>포인트</Text>
                        <TextInput
                            style={{ marginLeft: vw(4) }}
                            placeholderTextColor="#000"
                            keyboardType="numeric"
                            maxLength={16}
                            color="#000"
                        />
                    </View>

                    <TouchableHighlight onPress={() => donate()} style={styles.donate}>
                        <Text style={{ color: 'white' }}>후원하기</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '80%',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        marginTop: vh(2.5),
    },
    cardLeft: {
        width: vw(65),
        height: vh(22.5),
        backgroundColor: '#AE46FF',
        borderTopLeftRadius: vw(5),
        borderBottomLeftRadius: vw(5),
        borderTopRightRadius: vw(25),
        borderBottomRightRadius: vw(25),
        zIndex: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 10,
    },
    cardRight: {
        width: vw(50),
        height: vh(22.5),
        backgroundColor: '#00A3FF',
        borderTopLeftRadius: vw(0),
        borderBottomLeftRadius: vw(0),
        borderTopRightRadius: vw(5),
        borderBottomRightRadius: vw(5),
        position: 'absolute',
        right: 0,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 10,
    },
    cardTextContainer: {
        position: 'absolute',
        zIndex: 11,
        left: vw(5),
        top: vh(2),
    },
    cardText: {
        fontSize: 16,
        fontWeight: '900',
        color: 'white'
    },
    inputContainer: {
        width: '100%',
        marginTop: vh(2.5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        width: '100%'
    },
    donate: {
        width: '100%',
        height: vh(5),
        backgroundColor: '#AE46FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vw(2),
        marginTop: vh(5),
    },
});

export default Donate;

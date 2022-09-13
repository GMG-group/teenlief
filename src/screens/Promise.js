import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {vh, vw} from "react-native-css-vh-vw";
import DateTimePicker from '@react-native-community/datetimepicker';

const Promise = ({ navigation, route }) => {
    const [promise, setPromise] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [mode, setMode] = useState('date');

    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    useEffect(() => {
        console.log(promise);
    }, [promise]);

    return (
        <View style={styles.container}>
            {
                showDateTimePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={promise}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || promise;
                            setPromise(currentDate);

                            if (mode === 'date') {
                                setMode('time');
                            } else {
                                setShowDateTimePicker(false);
                                setMode('date');
                            }
                        }}
                    />
                )
            }

            <View style={styles.nav}>
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <EvilIcons name="chevron-left" size={45} color={'black'} />
                    </TouchableOpacity>

                    <Text style={{fontSize: 16, color: 'black'}}>약속 설정</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={{marginTop: 15, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e5e5e5'}}>
                    <Text style={{fontWeight: 'bold', color: 'black', marginBottom: 20}}>약속 시간</Text>
                    <TouchableOpacity
                        onPress={() => setShowDateTimePicker(true)}
                    >
                        <Text style={{color: 'black'}}>{promise.getMonth() + 1}월 {promise.getDate()}일 ({dayOfWeek[promise.getDay()]}) {promise.getHours()}시 {promise.getMinutes()}분</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 5, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e5e5e5'}}>
                    <Text style={{marginTop: 15, fontWeight: 'bold', color: 'black', marginBottom: 20}}>약속 전 나에게 알림</Text>
                    <Text style={{color: 'black'}}>30분 전</Text>
                </View>

                <TouchableOpacity
                    onPress={() => route.params.ws.send(JSON.stringify({content: `/약속/${promise.getMonth() + 1}/${promise.getDate()}/${promise.getHours()}/${promise.getMinutes()}`}))}
                >
                    <View style={styles.finishButton}>
                        <Text style={{color: 'white'}}>완료</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: vh(7),
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e5e5',
    },
    navContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        paddingRight: 15,
        paddingLeft: 15,
        height: '100%',
    },
    finishButton: {
        marginTop: 30,
        width: '100%',
        height: 45,
        backgroundColor: '#00A3FF',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Promise;

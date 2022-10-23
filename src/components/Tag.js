import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useApi} from "@apis/useApi";
import {getTag} from "@apis/apiServices";
import {FlatList, Text, View} from "react-native";


export const Tag = ({tags, all=false, size='m'}) => {
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [filterTag, setFilterTag] = useState([]);
    const tagListRef = useRef(null);

    const height = size === 'm' ? 25 : 12;
    const width = size === 'm' ? 90 : 40;
    const fontSize = size === 'm' ? 14 : 9;

    useEffect(() => {
        tagApi()
    },[])

    useEffect(() => {
        if(!tagLoading && filterTag.length===0) {
            let newTag = []
            if(all) {
                newTag = tagResolved.map((tag) => (tag.tag));
            } else {
                tags.forEach((tag) => {
                    newTag.push(tagResolved[tag-1].tag);
                });
            }

            setFilterTag(newTag);
        }
    },[tagLoading])

    return (
        <FlatList
            ref={tagListRef}
            data={filterTag}
            style={styles.filter}
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: filterTag.length * 115,
            }}
            renderItem={({item}) =>
                <View style={{...styles.filterItem, width: width, height: height}} key={item.id}>
                    <Text style={{color: 'black', fontSize: fontSize}}>{ item }</Text>
                </View>
            }
            keyExtractor={(item, index) => 'key' + index}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    filter: {
        display: "flex",
        flexDirection: "row",
    },
    tagText: {
        color: 'black'
    },
    filterItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "lightgray",
        borderRadius: 50,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 3,
        margin: 3
    },
})
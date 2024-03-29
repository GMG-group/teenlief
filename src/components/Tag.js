import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useApi} from "@apis/useApi";
import {getTag} from "@apis/apiServices";
import {FlatList, Text, View} from "react-native";

export const Tag = ({tags, all=false, size='m', onSelected, select=false, shelter=false}) => { // 표시할 태그(숫자), 모두 표시할지, 사이즈, 쉘터 표시할지
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [filterTag, setFilterTag] = useState([]);
    const tagListRef = useRef(null);

    const height = size === 'm' ? 25 : 16;
    const width = size === 'm' ? 90 : 52;
    const fontSize = size === 'm' ? 14 : 11;

    useEffect(() => {
        tagApi();
    },[])

    useEffect(() => {
        if(!tagLoading && filterTag.length===0) {
            let newTag = []
            if(all) {
                newTag = tagResolved.map((tag) => ({...tag, selected: select}));
                if(shelter) newTag.push({id: tagResolved.length+1, tag: "쉘터", selected: select}); // 쉘터 옵션이 켜진 경우만 쉘터 표시
            } else {
                tags.forEach((tag) => {
                    newTag.push({...tagResolved[tag-1], selected: select});
                });
            }

            setFilterTag(newTag);
        }
    },[tagLoading])

    const handleChange = (idx) => {
        let items = [...filterTag];
        items[idx] = {
            ...items[idx],
            selected: !items[idx].selected
        };
        setFilterTag(items);
        onSelected && onSelected(items);
    }

    return (
        <FlatList
            ref={tagListRef}
            data={filterTag}
            style={styles.filter}
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: filterTag.length * (width * 1.3),
            }}
            renderItem={({item, index}) =>
                <TouchableOpacity
                    onPress={() => {
                        handleChange(index);
                    }}
                    key={`filterTag-${index}`}
                    disabled={!select}
                >
                    <View style={{...styles.filterItem, width: width, height: height, backgroundColor: item.selected ? 'black' : 'white'}}>
                        <Text style={{color: item.selected ? 'white' : 'black', fontSize: fontSize}}>{ item.tag }</Text>
                    </View>
                </TouchableOpacity>

                // <TouchableOpacity
                // onPress={() => {handleChange(idx)}}
                // key={idx}
                // >
                // <View style={{...styles.tagItem, backgroundColor: tags[idx].selected ? 'black' : 'white'}}>
                // <Text style={{...styles.tagItemText, color: tags[idx].selected ? 'white' : 'black'}}>{tag.tag}</Text>
                // </View>
                // </TouchableOpacity>
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

//https://www.npmjs.com/package/react-native-text-ticker
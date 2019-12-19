import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import styled from "styled-components";

const GuestItem = styled.View`
  backgroundColor: white
  width: 400;
  border-radius:5
  fontSize: 24;
  alignSelf: center;
  padding:  10px;
  margin: 5px 0

 
`;
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

function Item({title}) {
    return (
        <GuestItem>
            <Text style={styles.title}>{title}</Text>
        </GuestItem>
    );
}

export const ListGuest = () => (
    <SafeAreaView>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title}/>}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

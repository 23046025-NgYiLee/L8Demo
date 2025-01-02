import React, { useState, useEffect } from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { datasource } from './Data';

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);

    const loadData = async () => {
        const dataString = await AsyncStorage.getItem('alphaData');
        setMyData(dataString ? JSON.parse(dataString) : datasource);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadData);
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => navigation.navigate("Edit", { index, type: section.title, key: item.key })}
        >
            <Text style={styles.textStyle}>{item.key}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Letter"
                onPress={() => navigation.navigate("Add", { dataString: JSON.stringify(myData) })}
            />
            <SectionList
                sections={myData}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor || 'transparent' }]}>{title}</Text>
                )}
                keyExtractor={(item, index) => item.key + index}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: { fontSize: 15, margin: 10, textAlign: 'left' },
    opacityStyle: { borderWidth: 1, padding: 5 },
    headerText: { fontSize: 20, margin: 10, textAlign: 'center', fontWeight: 'bold' },
});

export default Home;

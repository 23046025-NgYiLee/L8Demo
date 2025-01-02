import React, { useState, useEffect } from 'react';
import { Alert, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    const [letter, setLetter] = useState(route.params?.key || '');
    const [myData, setMyData] = useState([]);

    const indexNum = route.params?.type === 'Vowels' ? 0 : 1;
    const index = route.params?.index;

    useEffect(() => {
        const loadData = async () => {
            const dataString = await AsyncStorage.getItem('alphaData');
            setMyData(dataString ? JSON.parse(dataString) : []);
        };
        loadData();
    }, []);

    const handleSave = async () => {
        if (!letter || !/^[a-zA-Z]$/.test(letter)) {
            Alert.alert('Validation Error', 'Please enter a valid single alphabet.');
            return;
        }

        if (!myData[indexNum]?.data[index]) {
            Alert.alert('Error', 'Invalid data structure or index.');
            return;
        }

        myData[indexNum].data[index].key = letter.toLowerCase();
        await AsyncStorage.setItem('alphaData', JSON.stringify(myData));
        navigation.navigate('Home');
    };

    const handleDelete = async () => {
        Alert.alert('Confirm Deletion', 'Are you sure you want to delete this letter?', [
            {
                text: 'Yes',
                onPress: async () => {
                    myData[indexNum].data.splice(index, 1);
                    await AsyncStorage.setItem('alphaData', JSON.stringify(myData));
                    navigation.navigate('Home');
                },
            },
            { text: 'No', style: 'cancel' },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Letter:</Text>
            <TextInput
                value={letter}
                maxLength={1}
                style={styles.input}
                onChangeText={(text) => setLetter(text.toLowerCase())}
            />
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 20, fontSize: 16 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default Edit;

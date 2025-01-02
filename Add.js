import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StatusBar } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [letter, setLetter] = useState('');
    const [type, setType] = useState('Vowels');

    const saveData = async (data) => {
        try {
            await AsyncStorage.setItem('alphaData', data);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Failed to save data.');
        }
    };

    const handleSubmit = () => {
        if (!letter || !/^[a-zA-Z]$/.test(letter)) {
            Alert.alert('Validation Error', 'Please enter a valid single alphabet.');
            return;
        }

        const myData = JSON.parse(route.params.dataString);
        const indexNum = type === 'Vowels' ? 0 : 1;
        myData[indexNum].data.push({ key: letter.toLowerCase() });

        saveData(JSON.stringify(myData));
    };

    return (
        <View style={{ padding: 20 }}>
            <StatusBar />
            <Text>Letter:</Text>
            <TextInput
                maxLength={1}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
                onChangeText={(text) => setLetter(text.toLowerCase())}
            />
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Vowels', value: 'Vowels' },
                    { label: 'Consonants', value: 'Consonants' },
                ]}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default Add;

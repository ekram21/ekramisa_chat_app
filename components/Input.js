import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import { Item, Label } from 'native-base';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

    return (

        <View style = {styles.container}>

            {/* <Item floatingLabel> */}
                <Text>{label}</Text>

                <TextInput
                    autoCorrect={false}
                    autoCapitalize = "none"
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    value={value}
                />

            {/* </Item> */}

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 15,
        width: '100%',
        borderColor: '#eee',
        borderBottomWidth: 2,
    },
    input: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#333',
        width: '100%'
    }
})

export { Input };
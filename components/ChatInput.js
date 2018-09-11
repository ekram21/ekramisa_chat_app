import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { Item, Label } from 'native-base';

const ChatInput = ({ value, onChangeText, onFocus, placeholder, secureTextEntry }) => {

    return (

        <View style={styles.container}>

            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={onChangeText}
                onFocus = {onFocus}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                value={value}
            />

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 15,
        width: '76%',
        borderColor: '#eee'
    },
    input: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 3,
        color: '#333',
        width: '100%'
    }
})

export { ChatInput };
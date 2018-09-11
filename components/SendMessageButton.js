import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const SendMessageButton = ({ onPress, children }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>

            <Text style={styles.text_}>{children}</Text>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        width: '20%',
        marginLeft: '4.3%',
        backgroundColor: 'black',
        borderRadius: 4,
        //alignItems: 'center'
    },
    text_: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12
    }
})

export { SendMessageButton }
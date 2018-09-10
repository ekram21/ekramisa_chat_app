import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress, children }) => {

    return (
        <TouchableOpacity style={styles.button} onPress = { onPress }>

            <Text style={styles.text_}>{ children }</Text>
        
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        padding: 20,
        width: '45%',
        marginLeft: '4.3%',
        backgroundColor: '#00aeef',
        borderRadius: 4,
        alignItems: 'center'
    },
    text_: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    }
})

export { Button }
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



const ChatMessage = ({ label, rightOrLeft }) => {

    return (

        <View style={styles.container}>

            <View style={[styles.innerMessageCont, { alignSelf: rightOrLeft} ]}>
                <Text style={styles.innerMessage}>{ label }</Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        //flex: 1,
        width: '100%',
    },
    innerMessageCont: {
        //alignSelf: 'flex-start',
        padding: 5,
        backgroundColor: 'beige',
        borderRadius: 5,
        maxWidth: '45%',
        //width: '50%'
    },
    innerMessage: {
        flexWrap: 'wrap',
        fontSize: 16,
        color: 'black'
    }
})

export { ChatMessage };
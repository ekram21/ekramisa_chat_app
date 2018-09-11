import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import firebase from 'firebase';

import { ChatInput } from '../components/ChatInput';
import { SendMessageButton } from '../components/SendMessageButton';
import { ChatMessage } from '../components/ChatMessage';

export default class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'find' : navigation.state.params.title,
    });

    SendMessage(){
        console.log('send message pressed!');
        console.log(this.props.navigation.getParam('clickedFriendEmail'));
        console.log(this.props.navigation.getParam('clickedFriendUID'));
    }

    render() {

        //change the title to be the person you are chatting with
        UserName = this.props.navigation.getParam('clickedFriendEmail').split('@')[0];
        this.props.navigation.setParams({ title: UserName })

        return (
            <View style={styles.container}>

                <ScrollView style={styles.ChatReceiveBox}>
                
                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-end'}></ChatMessage>

                    <ChatMessage label={'hi lol lol lol lol lol lol lol lol lol lol lol'} rightOrLeft={'flex-end'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-end'}></ChatMessage>

                    <ChatMessage label={'hi lol lol lol lol lol lol lol lol lol lol lol'} rightOrLeft={'flex-end'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-end'}></ChatMessage>

                    <ChatMessage label={'hi lol lol lol lol lol lol lol lol lol lol lol'} rightOrLeft={'flex-end'}></ChatMessage>

                    <ChatMessage label={'hi'} rightOrLeft={'flex-start'}></ChatMessage>

                
                </ScrollView>


                <View style={styles.footer_}>
                
                    <ChatInput 
                        placeholder='Enter your message..'
                    />

                    <SendMessageButton onPress={() => this.SendMessage()}>SEND</SendMessageButton>
                
                </View>


            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ChatReceiveBox: {
        backgroundColor: 'silver',
        flex: 1,
        width: '100%'
    },
    footer_: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    }
})
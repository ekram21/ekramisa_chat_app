import React from 'react';
import { ScrollView, View, StyleSheet, Keyboard } from 'react-native';
import firebase from 'firebase';

import { ChatInput } from '../components/ChatInput';
import { SendMessageButton } from '../components/SendMessageButton';
import { ChatMessage } from '../components/ChatMessage';

function EncodeString(inputString){
    outputstring = encodeURIComponent(inputString).replace(/\./g, '%2E');
    return outputstring;
}

function DecodeString(inputString){
    outputstring = decodeURIComponent(inputString);
    withoutdots = outputstring.replace('%2E','.');

    return withoutdots;
}
export default class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.title || 'a',});

    state = {
        messageWriterArr: [],
        innerMessageArr: [],
        keyboardDisplayed: false,
    }

    componentWillMount() {
        //change the title to be the person you are chatting with
        global.thisComponent = this;
        UserName = this.props.navigation.getParam('clickedFriendEmail').split('@')[0];
        console.log('UserName: ' + UserName);
        this.props.navigation.setParams({ title: UserName });

        //set up polling updater to check the keyboard display state and change the text box position accordingly
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        //set up the new message polling updater
        let OwnerUID = firebase.auth().currentUser.uid;
        let OwnerEmail = firebase.auth().currentUser.email;

        let FriendUID = this.props.navigation.getParam('clickedFriendUID');

        let ownRoomID = 'MessageRoom' + OwnerUID + FriendUID;

        let address = 'USERS/' + OwnerUID + '/' + EncodeString(OwnerEmail) + '/' + ownRoomID + '/';
        this.AutoUpdater(address);
    };

    inputFocused(){
        console.log('text input in focus');

        this.setState({
            keyboardDisplayed: true
        }) 
    }

    _keyboardDidHide() {
        console.log('Keyboard Hidden');

        global.thisComponent.setState({
            keyboardDisplayed: false
        }) 
    }

    SendMessage(){
        console.log('send message pressed!');

        //access the firebase database and store this message
        //first get all the relevant variables
        let messageToSend = this.state.innerMessage;

        let OwnerUID = firebase.auth().currentUser.uid;
        let OwnerEmail = firebase.auth().currentUser.email;

        let FriendUID = this.props.navigation.getParam('clickedFriendUID');
        let FriendEmail = this.props.navigation.getParam('clickedFriendEmail');

        //now send the message
        _SendMessage(OwnerUID, OwnerEmail, FriendUID, FriendEmail, messageToSend);

    }

    AutoUpdater(address) {
        //this function will keep checking to see if new child message has been added to the database for this address
        let database = firebase.database();
        let ref = database.ref(address);

        ref.limitToLast(1).on("child_added", function (snapshot, previousChildKey) { HandleNewMessageEvent("child_added", snapshot, previousChildKey) });
    }

    renderCurrentState(){
        //update render after 
        if (this.state.keyboardDisplayed) { //if keyboard is dislpayed
            return (
                <View style={styles.innerChatReceiveBox}>
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


                    <View ref='Footer_' style={styles.footer_}>

                        <ChatInput
                            placeholder='Enter your message..'
                            onChangeText={innerMessage => this.setState({ innerMessage })}
                            onFocus={() => this.inputFocused()}
                            value={this.state.innerMessage}
                        />

                        <SendMessageButton onPress={() => this.SendMessage()}>SEND</SendMessageButton>

                    </View>

                    <View style={styles.bottomSpacer}></View>
                </View>
            )
        }
        else {  // if keyboard is not displayed
            return (

                <View style={styles.innerChatReceiveBox}>

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


                    <View ref='Footer_' style={styles.footer_}>

                        <ChatInput
                            placeholder='Enter your message..'
                            onChangeText={innerMessage => this.setState({ innerMessage })}
                            onFocus={() => this.inputFocused()}
                            value={this.state.innerMessage}
                        />

                        <SendMessageButton onPress={() => this.SendMessage()}>SEND</SendMessageButton>

                    </View>

                </View>
            )
        }

    }

    render() {

        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ChatReceiveBox: {
        backgroundColor: 'silver',
        flex: 1,
        width: '100%'
    },
    innerChatReceiveBox: {
        flex: 1,
        width: '100%' 
    },
    footer_: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    bottomSpacer: {
        width: '100%',
        height: '36%',
        backgroundColor: 'white' 
    }
})

function _PullAllMessages(address){

    let database = firebase.database();
    let ref = database.ref(address);

}

function _SendMessage(ownerUID, ownerMail, friendUID, friendMail, innerMessage){

    //firebase function to send message

    let messageToSend = EncodeString(innerMessage);

    let OwnerUID = ownerUID;
    let OwnerEmail = ownerMail;

    let FriendUID = friendUID;
    let FriendEmail = friendMail;

    let messageWriter = EncodeString(OwnerEmail);

    let d = new Date();
    d.toUTCString();

    let onlyTime = String(d).split(' ')[4];

    let ownRoomID = 'MessageRoom' + OwnerUID + FriendUID;

    let database = firebase.database();

    let ref = database.ref('USERS/' + OwnerUID + '/' + EncodeString(OwnerEmail) + '/' + ownRoomID + '/');

    let data = {};

    data[messageWriter] = {};

    data[messageWriter] = {
        [onlyTime]: messageToSend
    };

    ref.push(data).then(function () {
        console.log('successfully sent message..');

        //now write this message in friends database
        let friendRoomID = 'MessageRoom' + FriendUID + OwnerUID;

        let database = firebase.database();

        let ref = database.ref('USERS/' + FriendUID + '/' + EncodeString(FriendEmail) + '/' + friendRoomID + '/');

        let data = {};

        data[messageWriter] = {};

        data[messageWriter] = {
            [onlyTime]: messageToSend
        };

        ref.push(data);

    })
}

function HandleNewMessageEvent(event, snapshot, optionalPreviousChildKey) {
    //make the new message box in receive chat box

    //now break it into useful components before injecting it into the chat receive box
    messageWriter = '';
    innerMessage = '';

    let key;
    for (key in snapshot.val()){
        messageWriter = DecodeString(key);

        let key2;
        for (key2 in snapshot.val()[key]){
            innerMessage = DecodeString(snapshot.val()[key][key2]);
        }
    }

    console.log(messageWriter);
    console.log(innerMessage);

}
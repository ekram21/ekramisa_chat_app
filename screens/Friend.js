import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class Friend extends React.Component {

    state = {
        dataFetchedBoolean : false,
        fetchedData: [],
    }

    componentWillMount(){

        let ownEmail_ = firebase.auth().currentUser.email;

        thisObject = this;

        let rows = [];

        let newDatabase = firebase.database();

        let ref = newDatabase.ref('USERS/').once('value').then(function (snapshot) {

            let friendUID_arr = [];
            let friendName_arr = [];

            let myData = snapshot.val();

            //need to iterate over this and extract the user names
            let key;
            for (key in myData) {
                friendUID_arr.push(key);
                name_ = myData[key]['UserName'];
                friendName_arr.push(name_);
            };

            //now create the elements for front end
            for (let i = 0; i < friendName_arr.length; i++) {

                if (friendName_arr[i] != ownEmail_) {

                    rows.push(<TouchableOpacity onPress={() => thisObject.openFriendChat(friendUID_arr[i], friendName_arr[i])} key={i} style={styles.button_}><Text style={styles.friendName}>{friendName_arr[i]}</Text></TouchableOpacity>)
                }

            }

            thisObject.setState({
                dataFetchedBoolean: true,
                fetchedData: rows
            })

        });
    }

    //access the firebase and get the name

    static navigationOptions = {
        title: 'Friends',
    };

    openFriendChat(friendUID, friendEmail){
        console.log(friendUID);
        console.log(friendEmail);

        //now just need to navigate to chat screen with these UID and Email name
        this.props.navigation.navigate('ChatScreen', { clickedFriendUID: friendUID, clickedFriendEmail: friendEmail});
    }

    renderCurrentState(){
        //update render after 
        if (!this.state.dataFetchedBoolean){
            return (
                <View>
                    <Text>Fetching from database please wait..</Text>
                </View>
            )
        }
        else {
            return(
                <ScrollView>
                    {this.state.fetchedData}
                </ScrollView>
            )
        }
    }

    render(){

        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button_: {
        marginTop: 10,
        padding: 20,
        width: '100%',
        backgroundColor: '#00aeef',
        borderRadius: 4,
        alignItems: 'center'
    },
    friendName: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    }
})
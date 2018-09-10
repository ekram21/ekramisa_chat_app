import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class Friend extends React.Component {

    state = {
        dataFetchedBoolean : false,
        fetchedData: [],
    }

    //access the firebase and get the name

    static navigationOptions = {
        title: 'Friends',
    };

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
                <View>
                    {this.state.fetchedData}
                </View>
            )
        }
    }

    render(){

        thisObject = this;

        let rows = [];

        let newDatabase = firebase.database();

        let ref = newDatabase.ref('USERS/').once('value').then(function (snapshot) {

            let friendName_arr = [];

            let myData = snapshot.val();

            //need to iterate over this and extract the user names
            let key;
            for (key in myData) {
                name_ = myData[key]['UserName'];
                friendName_arr.push(name_);
            };

            //now create the elements for front end
            for (let i = 0; i < friendName_arr.length; i++) {

                rows.push(<TouchableOpacity key={i} style={styles.button_}><Text style={styles.friendName}>{friendName_arr[i]}</Text></TouchableOpacity>)

            }

            thisObject.setState({
                dataFetchedBoolean: true,
                fetchedData : rows
            })

        });

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
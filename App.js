import React from 'react';
// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Login from './screens/Login';
import Friend from './screens/Friend';


const AppNavigator = createStackNavigator({
    LoginScreen: Login,
    FriendScreen: Friend,
});


export default class App extends React.Component {

    render() {
    return (

        <AppNavigator />

    );
  }
}





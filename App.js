import React from 'react';


import { createStackNavigator } from 'react-navigation';

import Login from './screens/Login';
import Friend from './screens/Friend';
import Chat from './screens/Chat';


const AppNavigator = createStackNavigator({
    LoginScreen: Login,
    FriendScreen: Friend,
});


export default class App extends React.Component {

    render() {
    return (
            <Chat />
    );
  }
}





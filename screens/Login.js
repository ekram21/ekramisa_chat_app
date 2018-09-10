import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'Log In / Sign Up',
    };

    state = {
        email: '',
        password: '',
        authenticating: false,
    }

    componentWillMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyCdJNWfU9U23Xwf7Bhe5WqyX5WiLzj4wQA",
            authDomain: "ekramisa-chat.firebaseapp.com",
            databaseURL: "https://ekramisa-chat.firebaseio.com",
            projectId: "ekramisa-chat",
            storageBucket: "ekramisa-chat.appspot.com",
            messagingSenderId: "534663980615"

        }

        firebase.initializeApp(firebaseConfig);

    };

    //this function will trigger when sign up is pressed
    onPressSignUp() {

        LoginThisObject = this;
        //first bring up the loading page
        LoginThisObject.setState({
            authenticating: true
        })

        //now carry out all the firebase stuff to authenticate
        console.log(this.state.email)
        console.log(this.state.password)

        const auth = firebase.auth()

        const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            console.log('signup successful now need to make the database for this new user')

            let curUser = firebase.auth().currentUser;

            //create the empty database for this new user
            let database = firebase.database();

            let ref = database.ref('USERS/' + curUser.uid);

            let data = {
                UserName: curUser.email
            }

            ref.update(data).then(function () {
                console.log('successfully created the database for this new user..');

                LoginThisObject.setState({
                    authenticating: false
                })

                LoginThisObject.props.navigation.replace('FriendScreen');

            });

        

        }, function (err) {
            console.log('hit an error on sign up');
        })
    }

    //this function will trigger when sign in is pressed
    onPressSignIn() {

        LoginThisObject = this;
        //first bring up the loading page
        LoginThisObject.setState({
            authenticating: true
        })

        //now carry out all the firebase stuff to authenticate
        console.log(this.state.email)
        console.log(this.state.password)

        const auth = firebase.auth()

        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            alert('Login Successful!');
            console.log('Login Successful');
 
            LoginThisObject.setState({
                authenticating: false 
            })

            LoginThisObject.props.navigation.replace('FriendScreen');

        }, function (err) {
            console.log('hit an error on sign in');
        })
    }

    renderCurrentState() {
        //add loading button if it is loading..
        if (this.state.authenticating) {
            return (
                <View style={styles.loadingCont}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        else {

            return (
                <View style={styles.form}>
                    <View style={styles.headingView}>
                        <Text style={styles.headingText}>EkRamisa Chat</Text>
                    </View>

                    <Input
                        placeholder='Enter your email..'
                        label='Email'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />

                    <Input
                        placeholder='Enter your password..'
                        label='Password'
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />

                    <View style={styles.ButtonCont}>
                        <Button onPress={() => this.onPressSignUp()}>Sign Up</Button>
                        <Button onPress={() => this.onPressSignIn()}>Sign In</Button>
                    </View>


                </View>
            )

        }
    }



    //MAIN RENDER FUNCTION
    render(){
        const { navigate } = this.props.navigation
        return(
        <View style={styles.container}>
            {this.renderCurrentState()}
        </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: '25%',
        padding: 20,
        paddingTop: 25,
        //alignItems: 'center',
        flexDirection: 'row'
    },
    loadingCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingView: {
        alignItems: 'center',
    },
    headingText: {
        fontSize: 44,
    },
    ButtonCont: {
        flexDirection: 'row'
    }
});

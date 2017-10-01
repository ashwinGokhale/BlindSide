import React, { Component } from 'react';
import { AppRegistry, Alert, Image, View, StyleSheet, Button, Text, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Login } from './Screens/Login.js';
import { Signup } from './Screens/Signup.js';
import {Main} from './Screens/Main.js';
import {LoginInput} from './Components/LoginInput.js';
import {Percent} from './Screens/Percent.js'
import {Alarm} from './Screens/Alarm.js'

class App extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Login navigation={navigate}/>
            </View>
        );
    }
}
// <View>
//     <Button
//         onPress={() => navigate('Login')}
//         title="Log In"
//     />
// </View>
// <View>
//     <Button
//         onPress={() => navigate('Signup')}
//         title="Sign Up" />
// </View>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // flexDirection: 'row',
        // alignItems: 'center',
    },

    title: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default start = StackNavigator({
        Home: { screen: App, navigationOptions: {
            header: null
            }},
        Login: { screen: Login },
        Signup: { screen: Signup },
        LoginInput: { screen: LoginInput },
        Main: { screen: Main, navigationOptions: {
            header: null
            } },
        Percent: {
            screen: Percent, navigationOptions: {
                header: null
            }
        },
        Alarm: {
            screen: Alarm, navigationOptions: {
                header: null
            }
        }
    },
    // {mode: 'modal'},
);

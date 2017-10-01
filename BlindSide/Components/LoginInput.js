import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Button, TextInput, Text } from 'react-native';
import {CustomButton} from './CustomButton.js';
import { StackNavigator } from 'react-navigation';
import {Main} from '../Screens/Main.js';
import start from '../App.js';

export class LoginInput extends Component {
    state = {
        'user': '',
        'pass': '',
    }

    setUser = (text) => {
        this.setState({ user: text });
    }

    setPass = (text) => {
        this.setState({ pass: text });
    }

    render() {
        const { navigate } = this.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{fontSize: 50}}>Login</Text>
                </View>
                <View style={styles.box}>
                    <View>
                        <TextInput
                            style={{marginBottom: 40, fontSize: 30}}
                            placeholder="Username"
                            onChangeText={this.setUser} />
                        <TextInput
                            style={{fontSize: 30}}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={this.setPass} />
                    </View>
                </View>
                <View style={styles.submit}>

                    <Button onPress={() => navigate('Main')} title='button' />
                </View>
            </View>
        )
    }
}
// <CustomButton name='Submit' />

// <View style={{flexDirection: 'row'}}>
//     <Text>Username</Text>
//
//
// </View>
// <Text>Password</Text>
// <TextInput
//     placeholder="Password"
//     secureTextEntry={true}
//     onChangeText={this.setPass} />

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        // alignItems: 'center',
    },

    title: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    submit: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})

// <start
//     screenProps={  }

// default login = StackNavigator ({
//     Login: { screen: LoginInput },
//     Main: { screen: Main },
// })

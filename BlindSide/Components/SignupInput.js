import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Button, TextInput, Text } from 'react-native';
import {CustomButton} from './CustomButton.js';

export class SignupInput extends Component {
    state = {
        'user': '',
        'pass': '',
        'confirmPass': ''
    }

    setUser = (text) => {
        this.setState({ user: text });
    }

    setPass = (text) => {
        this.setState({ pass: text });
    }

    setConfirm = (text) => {
        this.setState({ confirmPass: text });
    }

    checkPass = () => {
        return this.state.pass == this.state.confirmPass;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{fontSize: 50}}>Sign Up</Text>
                </View>
                <View style={styles.box}>
                    <View>
                        <TextInput
                            style={{marginBottom: 20, fontSize: 30}}
                            placeholder="Username"
                            onChangeText={this.setUser} />
                        <TextInput
                            style={{marginBottom: 20, fontSize: 30}}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={this.setPass} />

                        <TextInput
                            style={{fontSize: 30}}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            onChangeText={this.setConfirm} />
                    </View>
                </View>
                <View style={styles.submit}>
                    <CustomButton name='Submit' />
                </View>
            </View>
        )
    }
}


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
        // marginBottom: 40,
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

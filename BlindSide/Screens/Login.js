import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { LoginInput } from '../Components/LoginInput.js';

export class Login extends Component {
    state = {
        'user': '',
        'pass': '',
        'loggedIn': false,
    }

    setUser = (text) => {
        this.setState({ user: text });
    }

    setPass = (text) => {
        this.setState({ pass: text });
    }

    verify = () => {
        return fetch('')
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    loggedIn: true
                }, function() {
                    const navigate = this.props.navigation;
                    navigate('Main');
                })
            })
            .catch((error) => {
                console.log("Something went wrong!");
            })
    }

    register = () => {
        return fetch('')
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    loggedIn: true
                }, function() {
                    const navigate = this.props.navigation;
                    navigate('Main');
                })
            })
            .catch((error) => {
                console.log("Something went wrong!");
            })
    }

    render() {
        return (
            <Image style={{flex: 1, width: null, height: null}}
                source={require('../Assets/sunnyback.gif')} >
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{fontSize: 60}}>Welcome</Text>
                </View>
                <View style={styles.box}>
                    <View>
                        <TextInput
                            style={{marginBottom: 40, fontSize: 30, width: 300,
                                marginTop: 70, borderBottomWidth: 2, borderBottomColor: '#b0b0b0'}}
                            placeholder="Username"
                            onChangeText={this.setUser} />
                        <TextInput
                            style={{fontSize: 30, borderBottomWidth: 2, borderBottomColor: '#b0b0b0', width: 300}}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={this.setPass} />
                    </View>
                </View>
                <View style={styles.submit}>
                    <TouchableOpacity
                        style={{backgroundColor: '#15b9ff', padding: 10, width: 150, borderRadius: 50}}
                    >
                        <Button color='white' title="Login" onPress={() => this.props.navigation('Percent')}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{backgroundColor: '#15b9ff', padding: 10, width: 150, borderRadius: 50}}
                    >
                        <Button color='white' title="Register" onPress={() => this.props.navigation('Main')}/>
                    </TouchableOpacity>
                </View>
            </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: 'transparent'
    },

    title: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    box: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'transparent'
    },

    submit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet, TextInput, TouchableOpacity,
    Button, AsyncStorage, Alert } from 'react-native';
import { LoginInput } from '../Components/LoginInput.js';
import { Main } from './Main.js';
import axios from 'axios';

export class Login extends Component {
    state = {
        'user': '',
        'pass': '',
        // 'isLoaded': false,
    }

    // componentDidMount() {
    //     AsyncStorage.getItem('id_token').then((token) => {
    //         this.setState({ hasToken: token !== null, isLoaded: true })
    //     });
    // }

    setUser = (text) => {
        this.setState({ user: text });
    }

    setPass = (text) => {
        this.setState({ pass: text });
    }

    async saveToken(item, val){
        try {
            await AsyncStorage.setItem(item, val);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    verify = () => {
        if (this.state.user == '' || this.state.pass == ''){
            Alert.alert("Username and/or password cannot be empty!");
        }
        else {
            //https://secret-journey-73941.herokuapp.com
            console.log("Email: " + this.state.user + " PAss: " + this.state.pass);
            axios.post('https://secret-journey-73941.herokuapp.com/auth/login', {
                email: this.state.user,
                password: this.state.pass,
            }).then(response => {
                console.log(response);
                this.saveToken('id_token', response['data']['token']),
                this.props.navigation('Main', {navigation: this.props.navigation});
            })
            .catch(error => console.error(error))
        }
    }

    register = () => {
        if (this.state.user == '' || this.state.pass == ''){
            Alert.alert("Email and/or password cannot be empty!");
        }
        else {
            console.log("EMail: "  + this.state.user + " Pass: " + this.state.pass);
            axios.post('https://secret-journey-73941.herokuapp.com/auth/register', {
                email: this.state.user,
                password: this.state.pass,
            }).then(response => console.log(response))
            .catch(error => console.error(error))
        }
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
                                placeholder="Email"
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
                            <Button color='white' title="Login" onPress={this.verify}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{backgroundColor: '#15b9ff', padding: 10, width: 150, borderRadius: 50}}
                        >
                            <Button color='white' title="Register" onPress={this.register}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </Image>
            )
        // }
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

import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, StyleSheet } from 'react-native';
import { SignupInput } from '../Components/SignupInput.js';


export class Signup extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SignupInput />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
});

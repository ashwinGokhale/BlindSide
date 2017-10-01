import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, Alert } from 'react-native';

export class CustomButton extends Component {
    render() {
        return (
            <Button
                onPress={() => { Alert.alert('You tapped the button!')}}
                title={this.props.name}
            />
        )
    }
}

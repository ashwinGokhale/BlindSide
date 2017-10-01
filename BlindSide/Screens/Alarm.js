import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Button, Image, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Main} from './Main.js'

export class Alarm extends Component {
    state = {
        'hour': 0,
        'min': 0,
        'visible': true,
    }

    datePicked = (date) => {
        // this.setState({visible:false});
        this.setState(
            {
                hour: date.getUTCHours(),
                min: date.getUTCMinutes(),
            });

        let message = "Your alarm has been set for " + (date.getHours() % 12 != 0 ?
                                                        date.getHours() % 12 : "12") +
                    ":" + date.getMinutes() + (date.getHours() < 12 ? "AM" : "PM");
        Alert.alert('Confirmed!', message, [{
            text: 'OK', onPress: this.confirmed
        }])
    }

    confirmed = () => {
        this.setState({visible:false});
        this.props.navigation.navigate('Main');
    }

    goback = () => {
        this.props.navigation.navigate('Main')
        this.setState({visible:false});
    }

    render() {
        return (
            <Image style={{flex: 1, width: null, height: null,}}
                source={require('../Assets/sunnyback.gif')} >
                <View style={styles.container}>
                    <DateTimePicker
                        isVisible={this.state.visible}
                        onConfirm={this.datePicked}
                        onCancel={this.goback}
                        mode={'time'}
                    />
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
})

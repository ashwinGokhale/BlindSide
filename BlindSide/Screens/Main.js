import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Button, Image, TouchableOpacity, Text } from 'react-native';

export class Main extends Component {
    state = {
        'percent': 0,
    }

    render() {
        return (
            <Image style={{flex: 1, width: null, height: null,}}
                source={require('../Assets/sunnyback.gif')} >
                <View style={styles.container}>
                    <View style={[styles.buttons, {marginBottom: 20}]}>
                        <TouchableOpacity
                            style={{backgroundColor: '#15b9ff', padding: 10, width: 175, borderRadius: 50}}
                        >
                            <Button color='white' title="Adjust Shades" onPress={() => this.props.navigation.navigate('Percent')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttons, {marginBottom: 20, justifyContent: 'flex-start'}]}>
                        <TouchableOpacity
                            style={{backgroundColor: '#15b9ff', padding: 10, width: 175, borderRadius: 50}}
                        >
                            <Button color='white' title="Create an Alarm" onPress={() => this.props.navigation.navigate('Alarm')}/>
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
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },

    buttons: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10
    }
})

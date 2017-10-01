import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Button, Image, TouchableOpacity, Text } from 'react-native';

export class Percent extends Component {
    state = {
        'percent': 0,
    }

    increasePercent = () => {
        if (this.state.percent < 100){
            this.setState({ percent: this.state.percent + 10 });

        }
    }

    decreasePercent = () => {
        if (this.state.percent > 0)
            this.setState({ percent: this.state.percent - 10 });
    }

    render() {
        return (
            <Image style={{flex: 1, width: null, height: null,}}
                source={require('../Assets/sunnyback.gif')} >
                <View style={styles.container}>
                    <View style={styles.arrows}>
                        <TouchableOpacity onPress={this.increasePercent}>
                            <Image source={require('../Assets/uparrow.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.percentage}>
                        <Text style={{fontSize: 50}}>{this.state.percent}%</Text>
                    </View>
                    <View style={styles.arrows}>
                        <TouchableOpacity onPress={this.decreasePercent}>
                            <Image source={require('../Assets/downarrow.png')} />
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

    arrows: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    percentage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: null,
        height: null,
    }
})
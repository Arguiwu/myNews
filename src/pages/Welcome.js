import React from 'react'
import {
    StyleSheet,
	View,
    Text,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import { Modal } from 'antd-mobile'
import { AppLoading, Util } from 'expo'

const alert = Modal.alert

export default class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            percent: 40,
            time: 99,
            updateListener: null,
            timer: null
        }
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        const _that = this
        // _that.setState({
        //     timer: setInterval(() => {
        //         _that.setState({
        //             time: _that.state.time - 1
        //         })
        //         if(_that.state.time == 0) {
        //             _that._goIndex()
        //         }
        //     }, 1000)
        // })
    }
    _goIndex() {
        // this.setState({
        //     timer: null
        // })
        // this.props.navigation.navigate('Login')
    }
    render() {
        if(!this.state.isReady) {
            
        }
        return (
            <ImageBackground source={require('../assets/welcome.jpg')} style={styles.container}>
                <StatusBar hidden={true} />
                <TouchableOpacity activeOpacity={.5} style={styles.timeContainer} onPress={() => this._goIndex()}>
                    <Text>{this.state.time}</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    timeContainer: {
        position: 'absolute',
        right: 20,
        top: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    }
})

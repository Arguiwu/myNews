import React from 'react'
import {
	StyleSheet,
	StatusBar,
	View,
    Text,
    Platform,
} from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export default class MyStatusBar extends React.Component {
    constructor(props) {
		super(props)
    }
    render() {
        const { backgroundColor } = this.props
        return (
            <View style={[styles.statusBar, { backgroundColor }]}>
                <StatusBar translucent backgroundColor={backgroundColor} {...this.props} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})

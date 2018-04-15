import React from 'react'
import {
	StyleSheet,
	StatusBar,
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import config from '../../utils'
import MyStatusBar from '../../components/MyStatusBar'

const ABOUT_ME = 'aboutme'
const CONTACT_ME = 'contactme'
const ME_AVATAR = 'https://avatars1.githubusercontent.com/u/6263584?s=460&v=4'

export default class Me extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showWhat: 'aboutme'
		}
	}
	_itemChange = itemName => {
		this.setState({
			showWhat: itemName || 'aboutme'
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<MyStatusBar backgroundColor="#34495e" barStyle="light-content" />
				<TouchableOpacity activeOpacity={.5} style={[styles.meItem, this.state.showWhat === ABOUT_ME && styles.checkActive]} onPress={() => this._itemChange(ABOUT_ME)}>
					{
						this.state.showWhat === ABOUT_ME ?
						(
							<FontAwesome name="user-circle-o" color="#B77F24" size={20} />
						) : (
							<FontAwesome name="user-circle-o" color="#000" size={20} />
						)
					}
					<Text style={[styles.meItemTitle, this.state.showWhat === ABOUT_ME && styles.meItemTitleActive]}>Who I am</Text>
				</TouchableOpacity>
				{
					this.state.showWhat === ABOUT_ME ?
					(
						<View style={styles.aboutMe}>
							<View style={styles.photoContainer}>
								<Image source={{uri: ME_AVATAR}} style={styles.photo} />
							</View>
							<Text style={styles.myName}>吴小桂</Text>
							<Text style={styles.myDesc}>你好，我是吴小桂。专注前端二十年O(∩_∩)O哈哈~</Text>
						</View>
					) : null
				}
				<TouchableOpacity activeOpacity={.5} style={[styles.meItem, this.state.showWhat === CONTACT_ME && styles.checkActive]} onPress={() => this._itemChange(CONTACT_ME)}>
					{
						this.state.showWhat === CONTACT_ME ?
						(
							<MaterialIcons name="perm-contact-calendar" color="#B77F24" size={20} />
						) : (
							<MaterialIcons name="perm-contact-calendar" color="#000" size={20} />
						)
					}
					<Text style={[styles.meItemTitle, this.state.showWhat === CONTACT_ME && styles.meItemTitleActive]}>Contact Me</Text>
				</TouchableOpacity>
				{
					this.state.showWhat === CONTACT_ME ?
					(
						<View style={styles.contactMe}>
							<View style={styles.contactItem}>
								<Text style={styles.contactItemTitle}>Github</Text>
								<View style={styles.contactItemIcon}>
									<FontAwesome name="github" color="#fff" size={20} />
								</View>
							</View>
							<View style={styles.contactItem}>
								<Text style={styles.contactItemTitle}>Weixin</Text>
								<View style={styles.contactItemIcon}>
									<FontAwesome name="weixin" color="#fff" size={15} />
								</View>
							</View>
							<View style={styles.contactItem}>
								<Text style={styles.contactItemTitle}>QQ</Text>
								<View style={styles.contactItemIcon}>
									<FontAwesome name="qq" color="#fff" size={15} />
								</View>
							</View>
						</View>
					) : null
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	meItem: {
		flexDirection: 'row',
		paddingTop: config.helper.scaleSize(30),
		paddingLeft: config.helper.scaleSize(30),
		paddingRight: config.helper.scaleSize(30),
		paddingBottom: config.helper.scaleSize(30),
		alignItems: 'center',
		backgroundColor: '#B7AFA3',
	},
	checkActive: {
		backgroundColor: '#E8D0A9',
		borderBottomColor: 'rgba(0,0,0,.2)',
		borderBottomWidth: 1 / config.helper.pixelRatio,
	},
	meItemTitle: {
		marginLeft: 5,
		fontSize: config.helper.scaleSize(36),
		color: '#374046'
	},
	meItemTitleActive: {
		color: '#B77F24',
	},
	aboutMe: {
		flexDirection: 'column',
		paddingTop: config.helper.scaleSize(30),
		paddingLeft: config.helper.scaleSize(30),
		paddingRight: config.helper.scaleSize(30),
		paddingBottom: config.helper.scaleSize(30),
		alignItems: 'center',
	},
	myName: {
		marginTop: config.helper.scaleSize(30),
		fontWeight: '700',
		fontSize: config.helper.scaleSize(36),
		color: '#374046'
	},
	myDesc: {
		marginTop: config.helper.scaleSize(20),
		fontWeight: '300',
		fontSize: config.helper.scaleSize(32),
		color: '#374046'
	},
	photo: {
		width: config.helper.scaleSize(190),
		height: config.helper.scaleSize(190),
		borderRadius: config.helper.scaleSize(95),
		borderWidth: config.helper.scaleSize(8),
		borderColor: '#fff',
	},
	contactMe: {
		flexDirection: 'column',
	},
	contactItem: {
		flexDirection: 'row',
		paddingTop: config.helper.scaleSize(20),
		paddingLeft: config.helper.scaleSize(30),
		paddingRight: config.helper.scaleSize(30),
		paddingBottom: config.helper.scaleSize(20),
		alignItems: 'center',
		borderBottomWidth: 1 / config.helper.pixelRatio,
		borderBottomColor: 'rgba(0,0,0,.1)',
	},
	contactItemTitle: {
		flex: 1,
	},
	contactItemIcon: {
		width: config.helper.scaleSize(80),
		height: config.helper.scaleSize(44),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#665e51',
		borderRadius: config.helper.scaleSize(30)
	}
})

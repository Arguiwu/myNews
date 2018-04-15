import React from 'react'
import {
	StyleSheet,
	StatusBar,
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native'

import { Drawer } from 'antd-mobile'
import Placeholder from 'rn-placeholder'

import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons'

import config from '../../utils'
import MyStatusBar from '../../components/MyStatusBar'

const CNODEJS_ARTICLES = 'https://cnodejs.org/api/v1/topics'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			page: 1,
			tab: 'all',
			mdrender: 'true',
			limit: 10,
			isReady: false,
			open: false,
		}
	}
	componentWillMount() {
		this._getArticles()
	}
	_getArticles() {
		config.request({
			url: CNODEJS_ARTICLES,
			data: {
				page: this.state.page,
				tab: this.state.tab,
				mdrender: this.state.mdrender,
				limit: this.state.limit,
			}
		}).then(res => {
			this.setState({
				isReady: true,
				articles: res.data
			})
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<MyStatusBar backgroundColor="#34495e" barStyle="light-content" />
				<View style={styles.headContainer}>
					<View>
						<Foundation name="list" color="#fff" size={24} onPress={() => this.setState({open: !this.state.open})} />
					</View>
					<Text style={styles.articleRange}>全部</Text>
					<View>
						<MaterialCommunityIcons name="login-variant" color="#42b983" size={24} />
					</View>
				</View>
				<Drawer
					sidebar={this._sidebar()}
					drawerWidth={config.helper.scaleSize(400)}
					drawerBackgroundColor={'#fff'}
					open={this.state.open}
				>
					<Placeholder.ImageContent
						size={40}
						animate="fade"
						lineNumber={3}
						textSize={14}
						lineSpacing={5}
						lastLineWidth="30%"
						onReady={this.state.isReady}
					>
						<FlatList data={this.state.articles} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
					</Placeholder.ImageContent>
				</Drawer>
			</View>
		)
	}
	_sidebar() {
		return (
			<View style={styles.sideBar}>
				<View style={styles.userInfo}>
					<MaterialCommunityIcons name="login-variant" color="#42b983" size={24} />
					<Text style={styles.loginText}>请登录</Text>
				</View>
			</View>
		)
	}
	_keyExtractor = (item, index) => item.id
	_renderItem = data => {
		const article = data.item
		let typeClassName, typeName = '默认'
		switch (article.tab) {
			case 'share':
				typeName = '分享'
				typeClassName = 'share'
				break;
			case 'ask':
				typeName = '问答'
				typeClassName = 'ask'
				break;
			case 'good':
				typeName = '精华'
				typeClassName = 'good'
				break;
			case 'top':
				typeName = '置顶'
				typeClassName = 'top'
				break;
			default:
				typeName = '分享'
				typeClassName = 'share'
				break;
		}
		if (article.good) {
			typeName = '精华'
			typeClassName = 'good'
		}
		if(article.top) {
			typeName = '置顶'
			typeClassName = 'top'
		}
		return (
			<TouchableOpacity activeOpacity={.5} style={styles.articleContainer}>
				<View style={styles.articleTitle}>
					<Text style={[styles.articleType, styles[typeClassName]]}>{typeName}</Text>
					<Text style={styles.articleTitleText} numberOfLines={1}>{article.title}</Text>
				</View>
				<View style={styles.articleContent}>
					<Image source={{uri: article.author.avatar_url}} style={styles.articleAuthorImg} />
					<View style={styles.articleInfo}>
						<View style={styles.articleItem}>
							<Text style={styles.articleAuthorName}>{article.author.loginname}</Text>
							<Text>
								<Text style={styles.articleReply}>{article.reply_count}</Text> / {article.visit_count}
							</Text>
						</View>
						<View style={styles.articleItem}>
							<Text style={[styles.articleAuthorName, styles.articleTime]}>{config.helper.getStringDate(article.create_at)}</Text>
							<Text style={styles.articleTime}>{config.helper.getStringDate(article.last_reply_at)}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headContainer: {
		height: config.helper.scaleSize(88),
		paddingLeft: config.helper.scaleSize(30),
		paddingRight: config.helper.scaleSize(30),
		flexDirection: 'row',
		backgroundColor: '#34495e',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1 / config.helper.pixelRatio,
		borderBottomColor: '#ecf0f1'
	},
	articleRange: {
		fontSize: config.helper.scaleSize(32),
		color: '#fff'
	},
	articleContainer: {
		paddingLeft: config.helper.scaleSize(30),
		paddingRight: config.helper.scaleSize(30),
		paddingTop: config.helper.scaleSize(20),
		paddingBottom: config.helper.scaleSize(20),
		borderBottomColor: '#d5dbdb',
		borderBottomWidth: 1 / config.helper.pixelRatio,
	},
	articleTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	articleType: {
		paddingLeft: config.helper.scaleSize(12),
		paddingRight: config.helper.scaleSize(12),
		paddingTop: config.helper.scaleSize(10),
		paddingBottom: config.helper.scaleSize(10),
		marginRight: config.helper.scaleSize(20),
		borderRadius: config.helper.scaleSize(8),
		backgroundColor: '#e7e7e7',
		color: '#fff'
	},
	articleTitleText: {
		fontSize: config.helper.scaleSize(32),
		fontWeight: 'bold',
		color: '#2c3e50'
	},
	articleContent: {
		paddingTop: config.helper.scaleSize(20),
		flexDirection: 'row',
		alignItems: 'center',
	},
	articleAuthorImg: {
		width: config.helper.scaleSize(80),
		height: config.helper.scaleSize(80),
		borderRadius: config.helper.scaleSize(40),
		marginRight: config.helper.scaleSize(20),
		borderWidth: 1 / config.helper.pixelRatio,
		borderColor: '#ccc',
	},
	articleInfo: {
		flex: 1,
	},
	articleItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: config.helper.scaleSize(4),
		paddingBottom: config.helper.scaleSize(4),
	},
	articleAuthorName: {
		flex: 1,
	},
	articleReply: {
		color: '#42b983',
	},
	articleTime: {
		fontSize: config.helper.scaleSize(24),
	},
	share: {
		backgroundColor: '#1abc9c'
	},
	ask: {
		backgroundColor: '#3498db'
	},
	good: {
		backgroundColor: '#e67e22'
	},
	top: {
		backgroundColor: '#e74c3c'
	},
	sideBar: {

	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: config.helper.scaleSize(30),
		marginRight: config.helper.scaleSize(30),
		paddingTop: config.helper.scaleSize(30),
		paddingBottom: config.helper.scaleSize(30),
		borderBottomColor: '#d4d4d4',
		borderBottomWidth: 1 / config.helper.pixelRatio,
	},
	loginText: {
		marginLeft: config.helper.scaleSize(30),
		fontSize: config.helper.scaleSize(30),
		color: '#313131'
	}
})

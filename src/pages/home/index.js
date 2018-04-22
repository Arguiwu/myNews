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
					drawerWidth={200}
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
		height: 44,
		paddingLeft: 15,
		paddingRight: 15,
		flexDirection: 'row',
		backgroundColor: '#34495e',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1 / config.helper.pixelRatio,
		borderBottomColor: '#ecf0f1'
	},
	articleRange: {
		fontSize: 16,
		color: '#fff'
	},
	articleContainer: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomColor: '#d5dbdb',
		borderBottomWidth: 1 / config.helper.pixelRatio,
	},
	articleTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	articleType: {
		paddingLeft: 6,
		paddingRight: 6,
		paddingTop: 5,
		paddingBottom: 5,
		marginRight: 10,
		borderRadius: 4,
		backgroundColor: '#e7e7e7',
		color: '#fff'
	},
	articleTitleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#2c3e50'
	},
	articleContent: {
		paddingTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	articleAuthorImg: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
		borderWidth: 1 / config.helper.pixelRatio,
		borderColor: '#ccc',
	},
	articleInfo: {
		flex: 1,
	},
	articleItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 2,
		paddingBottom: 2,
	},
	articleAuthorName: {
		flex: 1,
	},
	articleReply: {
		color: '#42b983',
	},
	articleTime: {
		fontSize: 12,
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
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomColor: '#d4d4d4',
		borderBottomWidth: 1 / config.helper.pixelRatio,
	},
	loginText: {
		marginLeft: 15,
		fontSize: 15,
		color: '#313131'
	}
})

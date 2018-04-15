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

import Placeholder from 'rn-placeholder'
import { Picker, NoticeBar } from 'antd-mobile'

import config from '../../utils'
import MyStatusBar from '../../components/MyStatusBar'

const CITY_URL = 'https://api.douban.com/v2/loc/list?count=48'
const MOVIE_URL = 'https://api.douban.com/v2/movie/in_theaters'

export default class Movie extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			movieData: [],
			district: [],
			total: 0,
			isReady: false,
			cityVisible: false,
			cityLabel: '深圳',
			cityValue: ['118282']
		}
	}
	componentWillMount() {
		this._getCitys()
		this._getMovies()
	}
	_getCitys() {
		config.request({
			url: CITY_URL,
		}).then(res => {
			const district = res.locs.map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
			this.setState({
				district: district
			})
		})
	}
	_getMovies() {
		config.request({
			url: MOVIE_URL,
			data: {
				city: this.state.cityValue[0],
				count: 100
			}
		}).then(res => {
			this.setState({
				movieData: res.subjects,
				total: res.total,
				isReady: true,
			})
		})
	}
	_cityChange = v => {
		const that = this
		const label = this.state.district.find(item => {
			return item.value == v
		})
		this.setState({
			cityValue: v,
			cityVisible: false,
			cityLabel: label.label
		}, () => {
			that._getMovies()
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<MyStatusBar backgroundColor="#34495e" barStyle="light-content" />
				<View style={styles.headContainer}>
					<Text style={styles.headText} onPress={() => this.setState({cityVisible: true})}>{this.state.cityLabel}</Text>
					<Text style={styles.headText}>正在上映</Text>
					<Text style={styles.headText}>共{this.state.total}部</Text>
				</View>
				<NoticeBar mode="closable" icon={null} marqueeProps={{ loop: true }}>数据来源豆瓣网，点击地区可以切换</NoticeBar>
				<Placeholder.ImageContent
					size={108}
					animate="fade"
					lineNumber={6}
					textSize={14}
					lineSpacing={5}
					lastLineWidth="30%"
					onReady={this.state.isReady}
					style={{paddingTop: 60}}
				>
					<FlatList data={this.state.movieData} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
				</Placeholder.ImageContent>
				<Picker
					visible={this.state.cityVisible}
					cols={'1'}
					title="选择地区"
					data={this.state.district}
					value={this.state.cityValue}
					onOk={v => this._cityChange(v)}
					onDismiss={() => this.setState({cityVisible: false})}
				/>
			</View>
		)
	}
	_keyExtractor = (item, index) => item.id
	_renderItem = data => {
		const movie = data.item
		return (
			<TouchableOpacity activeOpacity={.5} style={styles.movieItem}>
				<Image source={{uri: movie.images.small}} style={styles.movieImg} />
				<View>
					<Text style={styles.moveDesc}>片名：{movie.title}</Text>
					<Text style={styles.moveDesc}>类型：{movie.genres.join(' / ')}</Text>
					<Text style={styles.moveDesc}>导演：{movie.directors[0].name}</Text>
					<Text style={styles.moveDesc}>豆瓣评分：<Text style={styles.moveRate}>{movie.rating.average}</Text></Text>
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
		height: config.helper.scaleSize(92),
		flexDirection: 'row',
		backgroundColor: '#34495e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headText: {
		marginRight: config.helper.scaleSize(20),
		fontSize: config.helper.scaleSize(36),
		color: '#fff',
	},
	movieItem: {
		flexDirection: 'row',
		marginTop: 1 / config.helper.pixelRatio,
		paddingTop: config.helper.scaleSize(32),
		paddingBottom: config.helper.scaleSize(32),
		paddingRight: config.helper.scaleSize(32),
		backgroundColor: '#ecf0f1',
		borderBottomWidth: 1 / config.helper.pixelRatio,
		borderBottomColor: '#bdc3c7'
	},
	movieImg: {
		width: config.helper.scaleSize(216),
		height: config.helper.scaleSize(320),
		marginRight: config.helper.scaleSize(50),
		marginLeft: config.helper.scaleSize(64),
	},
	moveDesc: {
		marginBottom: config.helper.scaleSize(10),
	},
	moveRate: {
		color: 'red'
	}
})

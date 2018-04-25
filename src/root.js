import React from "react"
import {
	Animated,
	Image,
	StyleSheet,
} from "react-native"
import {
	TabBarBottom,
	StackNavigator,
	TabNavigator,
} from 'react-navigation'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

import Home from './pages/home'
import Movie from './pages/movie'
import Me from './pages/me'
import Welcome from './pages/Welcome'

const MainTab = TabNavigator(
	{
		Home: {
			screen: Home,
			path: '/',
			navigationOptions: {
				tabBarLabel: '首页',
				tabBarIcon: ({ tintColor, focused }) => {
					if(focused) {
						return (
							<Ionicons name="md-home" color="#0af" size={24} />
						)
					}
					return <Ionicons name="md-home" color="#999" size={24} />
				}
			}
        },
        Movie: {
			screen: Movie,
			path: '/movie',
			navigationOptions: {
				tabBarLabel: '电影',
				tabBarIcon: ({ tintColor, focused }) => {
					if(focused) {
						return (
							<FontAwesome name="file-movie-o" color="#0af" size={22} />
						)
					}
					return <FontAwesome name="file-movie-o" color="#999" size={22} />
				}
			}
		},
		Me: {
			screen: Me,
			path: '/me',
			navigationOptions: {
				tabBarLabel: '我的',
				tabBarIcon: ({ tintColor, focused }) => {
					if(focused) {
						return (
							<FontAwesome name="user" color="#0af" size={24} />
						)
					}
					return <FontAwesome name="user" color="#999" size={24} />
				}
			}
		}
	},
	{
		tabBarOptions: {
			activeTintColor: '#0af',
			showIcon: true,
			indicatorStyle: {height: 0},
			labelStyle: {
				fontSize: 12,
			},
			style: {
				marginBottom: 3,
				backgroundColor: '#fcfcfc',
			},
		},
		lazy: true,                     //懒加载
		swipeEnabled: false,
		animationEnabled: false,        //关闭安卓底栏动画
		tabBarPosition: 'bottom',
		tabBarComponent: TabBarBottom,  //解决安卓底栏不显示图标问题
	}
)

const AppNavigator = StackNavigator({
	Welcome: { screen: Welcome },
	MainTab: { screen: MainTab },
}, {
	headerMode: 'none',
})

export default AppNavigator

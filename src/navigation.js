import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation'

import Home from './pages/home'
import Movie from './pages/movie'
import Me from './pages/me'

const Tabs = TabNavigator({
    Home: { screen: Home },
    Movie: { screen: Movie },
    Me: { screen: Me },
}, {
    tabBarOptions: {
        activeTintColor: '#7a86a2',
        showIcon: true,
        indicatorStyle: {height: 0},
        style: {
            backgroundColor: '#fff',
        },
    },
    lazy: true,                     //懒加载
    swipeEnabled: false,
    animationEnabled: false,        //关闭安卓底栏动画
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,  //解决安卓底栏不显示图标问题
})

const Navigation = StackNavigator({
    Tabs: { screen: Tabs },
}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#2D2D2D',
        },
        headerBackTitle: null,
        headerTintColor: '#FFFFFF',
    },
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal, // 安卓导航进入 左右方式
    }),
    headerMode: 'screen'
})

export default Navigation

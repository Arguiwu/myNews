import {
	AsyncStorage,
	Dimensions,
	StatusBar,
	Platform,
	PixelRatio,
} from 'react-native'

const getItem = options => {
    AsyncStorage.getItem(options.key, (err, result) => {
        if(err) {
            options.error(err)
        }else {
            options.success(result)
        }
    })
}

const setItem = options => {
	AsyncStorage.setItem(options.key, options.value, (err, result) => {
		if (err) {
			options.error(err)
		} else {
			options.success(result)
		}
	})
}

const removeItem = options => {
	AsyncStorage.removeItem(options.key, (err, result) => {
		if (err) {
			options.error(err)
		} else {
			options.success(result)
		}
	})
}

const {
	width,
	height,
} = Dimensions.get('window')

const getStringDate = (str) => {
	var date = new Date(str)
	var time = new Date().getTime() - date.getTime()
	if (time < 0) {
		return ''
	} else if (time / 1000 < 60) {
		return '刚刚'
	} else if ((time / 60000) < 60) {
		return parseInt((time / 60000)) + '分钟前'
	} else if ((time / 3600000) < 24) {
		return parseInt(time / 3600000) + '小时前'
	} else if ((time / 86400000) < 31) {
		return parseInt(time / 86400000) + '天前'
	} else if ((time / 2592000000) < 12) {
		return parseInt(time / 2592000000) + '月前'
	} else {
		return parseInt(time / 31536000000) + '年前'
	}
}

// 判断是否为 IOS设备
const isIOS = Platform.OS == 'ios'
// 状态栏高度
const statusBarHeight = isIOS ? 20 : StatusBar.currentHeight
// 字体大小缩放比
const fontScale = PixelRatio.getFontScale()
// 当前设备像素密度
const pixelRatio = PixelRatio.get()

export default {
	getItem,
	setItem,
	removeItem,
	width,
	height,
	getStringDate: getStringDate,
	isIOS: isIOS,
	pixelRatio: pixelRatio,
	statusBarHeight: statusBarHeight,
	contentHeight: height - statusBarHeight,
}
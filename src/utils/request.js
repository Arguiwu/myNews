import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(function(res) {
	return res
}, function(err) {
	return Promise.reject(err)
})

const fetch = (options) => {
	let {
		method = 'get',
		data,
		url,
		timeout = 30000
	} = options

	switch(method.toLowerCase()) {
		case 'get':
			if(data) {
				return axios.get(`${url}?${qs.stringify(data)}`)
			}else {
				return axios.get(`${url}`)
			}
			break;
		case 'post':
			return axios.post(url, data)
	}
};

export default function request(options) {
	Toast.loading('Loading...', 30)
	return fetch(options).then(response => {
		const { data } = response
		Toast.hide()
		if(response.status == 200) {
		}else {
			Toast.info('出错？', 1.5)
		}
		return  {
			...data
		}
	}).catch( () => {
		Toast.fail('请求繁忙，请稍候...', 1.5)
		return {
			code: 0,
			message: '请求繁忙，请稍候...'
		}
	})
};
import { hideLoading, showLoading } from "@/views/loading";
import { message } from "antd";
import axios, { AxiosError } from "axios";
import storage from "@/utils/storage";
import env from '@/config'
import { Result } from "../types/requestType";
/**
 * 创建实例（设置baseRL这些，对get、post请求进行封装）,封装请求拦截（config参数里面添加token、Loading组件设置）和响应拦截（对不同状态码进行不同的响应、Loading组件设置），最后给封装的get和post添加泛型，获取数据类型-进行环境变量的设置
 */

// 创建实例
const instance = axios.create({
	baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
	headers: {
    icode: 'B6E4677B4E669D59'
  }
})

//请求拦截器
instance.interceptors.request.use(
	config => {
		showLoading()
		const token = storage.get('token')
		if(token){
			config.headers.Authorization = 'Bearer ' + token
		}
		if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
		return {
			...config
		}
	},
	(err: AxiosError) => {
		return Promise.reject(err)
	}
)

//响应拦截器
instance.interceptors.response.use(response => {
	const data: Result = response.data
	hideLoading()
	if(data.code === 500001){//tokne认证失败
		message.error(data.msg)
		storage.remove('token')
		// 将当前页面的 URL 重定向到指定的路径 '/login'
		// location.href = '/login'
	}else if(data.code !== 0){
		message.error(data.msg)
		return Promise.reject(data)
	}
	return data.data
}, err => {
	hideLoading()
	message.error(err.message)
	return Promise.reject(err)
})


export default{
	get<T>(url: string, params?: object): Promise<T>{
		return instance.get(url,{ params })
	},
	post<T>(url: string, params?: object): Promise<T>{
		return instance.post(url,params)
	}
}

import request from "../request/request";
import { Login } from "./type";


// 登录
export function login(params: Login.params) {
	return request.post<string>('/users/login', params, { showLoading: false })
}

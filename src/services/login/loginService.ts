import request from "../request/request";
import Login from "../types";

export default {
	// 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },
}

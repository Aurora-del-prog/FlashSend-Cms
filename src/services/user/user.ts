import request from "../index"
import { User } from "./type"

// 获取用户信息
export function  getUsersInfo() {
	return request.get<User.UserItem>('/users/getUserInfo')
}

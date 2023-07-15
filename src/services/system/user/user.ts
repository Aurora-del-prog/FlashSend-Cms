import request from "@/services/request/request"
import { User } from "@/services/user/type"
import { ResultData } from "./type"

const user = {
	// 获取用户列表
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  // 创建用户
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  }
}

export default user

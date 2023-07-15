import { Login } from "@/services/login/type"
import { User } from "@/services/user/type"

export default interface user{
	token: string,
	userInfo: {
		_id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  },
	collapsed: boolean,
	getToken: (value: Login.params) => Promise<string>,
	getUserInfo: () => Promise<User.UserItem>,
	updateCollapsed: () => void
}

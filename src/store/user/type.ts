import { Login } from "@/services/login/type"

export default interface user{
	token: string,
	userInfo: {
    userEmail: string
    userName: string
  },
	getToken: (value: Login.params) => Promise<string>
}

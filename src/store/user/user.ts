import { create } from "zustand";
import user from "./type";
import { login } from "@/services/login/login";
import { Login } from "@/services/login/type";
import storage from "@/utils/storage";
import { getUsersInfo } from "@/services/user/user";

export const useUserStore = create<user>(
	(set,get) => ({
		token: '',
		userInfo: {
			_id: '',
			userId: 0,
			userName: '',
			userEmail: '',
			deptId: '',
			state: 0,
			role: 0,
			roleList: '',
			createId: 0,
			deptName: '',
			userImg: '',
		},
		collapsed: false,
		getToken: async (value: Login.params) => {
			const res = await login(value)
			set({token: res})
			storage.set('token', get().token)
			return get().token
		},
		getUserInfo: async () => {
			const res = await getUsersInfo()
			set({userInfo: res})
			return get().userInfo
		},
		updateCollapsed: () => set({collapsed:!get().collapsed})
	})
)

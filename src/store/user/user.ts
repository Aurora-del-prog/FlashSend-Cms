import { create } from "zustand";
import user from "./type";
import { login } from "@/services/login/login";
import { Login } from "@/services/login/type";
import storage from "@/utils/storage";

export const useUserStore = create<user>(
	(set,get) => ({
		token: '',
		userInfo: {
			userEmail: '',
			userName: ''
		},
		getToken: async (value: Login.params) => {
			const res = await login(value)
			set({token: res})
			storage.set('token', get().token)
			return res
		}
	})
)

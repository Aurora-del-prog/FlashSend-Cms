import request from '@/service/request'
import { memo, useEffect } from 'react'

const Login = memo(() => {
	useEffect(() => {
		request.get('/users/login',{
			id:1223
		})
	},[])
	return (
		<div>Login</div>
	)
})

export default Login

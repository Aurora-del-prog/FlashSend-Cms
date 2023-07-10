import { Button, Form, Input, message } from 'antd'
import React, { memo } from 'react'
import styles from './index.module.less'
import storage from '@/utils/storage'
import loginService from '@/services/login/loginService'
import LoginType from '@/services/types'

const Login = memo(() => {

	const onFinish = async (values: LoginType.params) => {
    try {
      const data = await loginService.login(values)
			console.log(data)
      storage.set('token', data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      // setTimeout(() => {//token失效，再次登录时候会跳转到之前的页面
      //   location.href = params.get('callback') || '/welcome'
      // })
    } catch (error) {
			console.log(error)
    }
  }

	return (
		<div className={styles.login}>
		<div className={styles.loginWrapper}>
			<div className={styles.title}>系统登录</div>
			<Form
			name='basic'
			initialValues={{ remember: true }}
			autoComplete='off'
			onFinish={onFinish}
			>
				<Form.Item name='userName'
				rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input placeholder="用户名" />
				</Form.Item>

				<Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password placeholder="密码" />
				</Form.Item>

				<Form.Item>
					<Button type='primary' block htmlType='submit' >
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	</div>
	)
})

export default Login

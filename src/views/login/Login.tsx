import { App, Button, Form, Input, message } from 'antd'
import { memo, useState } from 'react'
import styles from './index.module.less'
import { Login as LoginType } from '@/services/login/type'
import { useUserStore } from '@/store/user/user'

const Login = memo(() => {
	const getToken = useUserStore(state => state.getToken)
	const [loading, setLoading] = useState(false)
	const { message, notification, modal } = App.useApp();
	const onFinish = async (values: LoginType.params) => {
    try {
			setLoading(true)
      // const data = await login(values)
			const data = await getToken(values)
			data && setLoading(false)
      // storage.set('token', data)
      message.success('登录成功')
			// 处理 URL 查询参数和重定向页面
      const params = new URLSearchParams(location.search)
      setTimeout(() => {//token失效，再次登录时候会跳转到之前的页面
        location.href = params.get('callback') || '/index/userList'
      },1)
    } catch (error) {
			setLoading(false)
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
				initialValue="2744166358"
				>
					<Input placeholder="用户名"/>
				</Form.Item>

				<Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}
				initialValue="123456"
				>
					<Input.Password placeholder="密码" />
				</Form.Item>

				<Form.Item>
					<Button type='primary' block htmlType='submit'
					loading={loading}>
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	</div>
	)
})

export default Login

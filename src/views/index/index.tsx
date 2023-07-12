import NavHeader from '@/components/NavHeader'
import { Layout, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import { memo, useEffect } from 'react'
import styles from './index.module.less'
import { useUserStore } from '@/store/user/user'
import Menu from '@/components/Menu'
import { Outlet } from 'react-router-dom'

const index = memo(() => {
	const getUserInfo = useUserStore(state => state.getUserInfo)
	const collapsed = useUserStore(state => state.collapsed)
	useEffect(() =>{
		const userInfo = async () => {
			try {
				const res = await getUserInfo()
			} catch (error) {
				return Promise.reject(error)
			}
		}
		userInfo()
	},[])

	return (
	<Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
		<Layout>
			<Sider collapsed={collapsed}
			style={{width: collapsed ? 80 : 'auto'}}>
				<Menu />
			</Sider>
			<Layout>
				<Header className={styles.header} >
					<NavHeader></NavHeader>
				</Header>
				<Content className={styles.content} >
					<Outlet />
				</Content>
			</Layout>
		</Layout>
  </Space>
	)
})

export default index

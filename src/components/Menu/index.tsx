import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/user/user'
const SideMenu = () => {
  const navigate = useNavigate()
  const collapsed = useUserStore(state => state.collapsed)
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />
        }
      ]
    }
  ]
  const handleClickLogo = () => {
    navigate('/index/welcome')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' className={styles.img} />
        {collapsed ? '' : <span>慕慕货运</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        style={{
          width: collapsed ? 80 : 'auto'
        }}
        items={items}
      />
    </div>
  )
}

export default SideMenu

import { Suspense } from 'react'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import route from './router'
// import Router from './router'

import { ConfigProvider, App as AntdApp } from 'antd'
import GlobalMessage from './components/message/GlobalMessage'
import './App.less'

function App() {
	return (
		//路由懒加载需要添加suspense或者 使用startTransition函数来包装可能导致暂停的更新
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ed6c00'
				}
			}}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<AntdApp>
					<GlobalMessage />
					<RouterProvider router={route}/>
				</AntdApp>
			</Suspense>
		</ConfigProvider>

		// <BrowserRouter>
		// 	<Suspense fallback={<div>Loading...</div>}>
		// 		<Router/>
		// 	</Suspense>
		// </BrowserRouter>
	)
}

export default App

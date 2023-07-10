
import './App.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import Router from './router'
import route from './router'
import { Suspense } from 'react'
function App() {
	return (
		//路由懒加载需要添加suspense或者 使用startTransition函数来包装可能导致暂停的更新
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={route}/>
		</Suspense>

		// <BrowserRouter>
		// 	<Suspense fallback={<div>Loading...</div>}>
		// 		<Router/>
		// 	</Suspense>
		// </BrowserRouter>
	)
}

export default App

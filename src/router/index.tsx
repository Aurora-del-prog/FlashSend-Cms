import { lazy } from "react";
import { Navigate, createBrowserRouter, useRoutes } from "react-router-dom";

const Login = lazy( () => import('@/views/login/Login'))
const Errot403 = lazy( () => import('@/views/Error403'))
const Errot404 = lazy( () => import('@/views/Errot404'))
const Index = lazy( () => import('@/views/index/index'))



const routes = [
	{
		path:'/',
		element: <Navigate to='/login'/>
	},
	{
    path: '/index',
    element: <Index />
  },
	{
    path: '/login',
    element: <Login />
  },
	{
    path: '/404',
    element: <Errot404 />
  },
	{
    path: '/403',
    element: <Errot403 />
  },
	{
    path: '*',
    element: <Navigate to='/404'/>
  },
]

// export default () => {
// 	return useRoutes(router)
// }

export default createBrowserRouter(routes)

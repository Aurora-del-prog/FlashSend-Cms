import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const Login = lazy( () => import('@/views/Login'))
const Errot403 = lazy( () => import('@/views/Error403'))
const Errot404 = lazy( () => import('@/views/Errot404'))
const Welcome = lazy( () => import('@/views/Welcome'))



const routes = [
	{
		path:'/',
		element: <Welcome/>
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
    element: <Navigate to='@/views/Errot404'/>
  },
]

export default createBrowserRouter(routes)

import storage from '@/utils/storage';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useTokenGuard() {
  const navigate = useNavigate();
  const location = useLocation();
	console.log(location)

  useEffect(() => {
    const hasToken = storage.get('token') !== '';
    const isLoginPage = location.pathname === '/login';
		console.log(hasToken,isLoginPage)
    if (!hasToken && !isLoginPage) {
      navigate('/login'); // 重定向到登录页面
    }
  }, [navigate, location]);

  return null;
}

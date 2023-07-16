import React, { ReactNode, memo, useEffect } from 'react'
import { useTokenGuard } from '@/hook/useTokenGuard'

function RouteGuard(props: {children: JSX.Element}) {

  useTokenGuard();

  return props.children;
}
export default RouteGuard

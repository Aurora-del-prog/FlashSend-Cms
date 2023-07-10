import { Spin } from 'antd'
import { memo } from 'react'


const Loading = memo(({ tip = 'Loading' }: { tip?: string }) => {
	return (
		<Spin tip={tip} size='large' className='request-loading' >
			<div className="content" />
		</Spin>
	)

})

export default Loading

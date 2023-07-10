import ReactDOM from "react-dom/client"
import Loading from "./loading"
import './loading.less'
let count = 0

export const showLoading = () => {
	//多次请求只出现一次就行了
	if(!count){
		const loading = document.createElement('div')
		loading .setAttribute('id','loading')
		document.body.appendChild(loading)
		ReactDOM.createRoot(loading).render(<Loading />)
	}
	count++
}
export const hideLoading = () => {
	if(count < 0) return
	count--
	if(!count) document.removeChild(document.getElementById('loading') as HTMLDivElement)
}

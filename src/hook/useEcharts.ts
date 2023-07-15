import * as echarts from "echarts"
import { RefObject, useEffect, useRef, useState } from "react"

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.EChartsType | undefined] => {
	// 获取包含图表的 DOM 元素的引用
	const chartRef = useRef<HTMLDivElement>(null)
	// 存储 ECharts 实例的状态
	const [chartInstance,setChartInstance] = useState<echarts.EChartsType>()
	// 通过 echarts.init 方法初始化 ECharts 实例，并将其存储在 chartInstance 状态中
	useEffect(() => {
		const chart = echarts.init(chartRef.current as HTMLElement)
		setChartInstance(chart)
	},[])
	return [chartRef,chartInstance]
}

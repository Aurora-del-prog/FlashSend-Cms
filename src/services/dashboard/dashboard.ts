import request from "..";
import { Dashboard } from "./type";

export default {
	// 获取工作台汇总数据
	getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  // 获取城市分布数据
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  // 获取年龄分布数据
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  // 获取折线图数据
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  }
}

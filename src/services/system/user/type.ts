export interface PageParams {
  pageNum: number
  pageSize?: number
}

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

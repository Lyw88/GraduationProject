import type { Type } from '@/types/type'
import { request } from '@/utils/request'

// 分类
export const Typeapi = () => {
  return request<Type>('/type', 'get')
}

export const Type_detailApi = (s_id: number) => {
  return request('/type_detail', 'get', { s_id })
}

// 输入框搜索
export const searchApi = (data: object) => {
  return request('/product_search', 'get', data)
}

//标签搜索
export const TagSearchApi = (data: object) => {
  return request('/tag_search', 'get', data)
}

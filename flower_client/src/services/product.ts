import { request } from '@/utils/request'

//商品详情
export const product_itemApi = (p_id: any) => {
  return request('/product_item', 'get', { p_id })
}

//添加购物车
export const AddShopCarApi = (data: object) => {
  return request('/add_shopcar', 'get', data)
}

//渲染购物车
export const LoadShopCarApi = (u_id: number | undefined) => {
  return request('/load_shopcar', 'get', { u_id })
}

//删除购物车商品
export const DelProductApi = (data: object) => {
  return request('/delproduct', 'get', data)
}

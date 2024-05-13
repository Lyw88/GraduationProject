import type { User, addressInfo } from '@/types/user.d.ts'
import { request } from '@/utils/request'

//密码登录
export const loginByPassword = (u_phone: string, u_pwd: string) => {
  return request<User>('/login', 'post', { u_phone, u_pwd })
}

//验证码登录
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('/login', 'post', {
    mobile,
    code
  })
}

//用户注册
export const registerApi = (data: object) => {
  return request('/register', 'post', data)
}
//用户信息修改
export const edituserApi = (data: object) => {
  return request('/useredit', 'post', data)
}

//获取用户信息
export const getuserinfoApi = (u_phone: number | null) => {
  return request('/user', 'get', { u_phone })
}

// ------------------------------------------地址---------------------------------------
//获取用户收货地址
export const addressInfoApi = (u_id: number | undefined) => {
  return request<addressInfo>('/address', 'get', { u_id })
}

//修改收货地址
export const editaddressApi = (data: object) => {
  return request('/address/edit', 'post', data)
}
//新增收货地址
export const addaddressApi = (data: object) => {
  return request('/address/add', 'post', data)
}
//删除地址
export const deladdressApi = (id: number) => {
  return request('/address/del', 'get', { id })
}
//设置地址默认
export const toggledefaultApi = (id: number) => {
  return request('/address/default', 'get', { id })
}

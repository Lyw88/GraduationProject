import { useUserStore } from '@/stores'
import axios, { AxiosError, type Method } from 'axios'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  // maxHeaderSize: 8192,
  baseURL: 'http://localhost:3000/api',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // if (res.data.code !== 10000) {
    //   showToast(res.data.message || '业务失败')
    //   return Promise.reject(res.data)
    // }
    // TODO 4. 摘取核心响应数据
    return res.data
  },
  (err: AxiosError) => {
    // TODO 5. 处理401错误
    // if (err.response?.status === 401) {
    //   //清空用户数据
    //   const store = useUserStore()
    //   store.delUser()
    //   //跳转登录，带上接口失效所在地址的数据,登录完成后回跳使用
    //   router.push({
    //     path: '/login',
    //     query: {
    //       returnUrl: router.currentRoute.value.fullPath
    //     }
    //   })
    // }
    return Promise.reject(err)
  }
)

export default instance

type Data<T> = {
  code: number
  message: string
  data: T
}

export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

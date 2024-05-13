export type User = {
  /** 用户ID */
  u_id: number
  /** 手机号 */
  u_phone: string
  /** token */
  token: number
}

//获取验证码类型
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

// 个人信息
type OmitUser = Omit<User, 'token'>

export type addressInfo = {
  id: number
  name: string
  tel: string
  addressDetail: string
  isDefault: number
  province: string
  city: string
  county: string
}

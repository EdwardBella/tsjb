/**
 * 公用请求接口
 */

import axios from '@/utils/axios'

//登录
export const accessDataOs = params => axios({
  url: '/api/v1/auth/dataAuth',
  method: 'GET',
  params
})

//菜单及权限
export const getMenuList = params => axios({
  url: '/menu/menuTreeList',
  method: 'GET',
  params
})

//DATAOS认证依赖
export const userInfo = params => axios({
  url: '/api/dataos-login/user-info',
  method: 'GET',
  params
})

// 发送验证码
export const sendTelCode = params => axios({
  url: '/api/v1/auth/sendTelCode',
  method: 'POST',
  params
})

// 校验手机号
export const checkTelephone = params => axios({
  url: '/api/v1/user/checkTelephone',
  method: 'GET',
  params
})

// 检查手机号验证码
export const checkTelephoneCode = params => axios({
  url: '/api/v1/user/checkTelephoneCode',
  method: 'GET',
  params
})





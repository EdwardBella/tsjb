/**
 * 短信日志
 */

import axios from '@/utils/axios'

// 获取当前用户拥有的页面
export const list = params => axios({
  url: '/api/v1/sms/log/list',
  method: 'GET',
  params
})

/**
 * 我的案件相关接口
 */

import axios from '@/utils/axios'

// 案件列表
export const list = params => axios({
  url: '/api/v1/appraiseWorkOrder/list',
  method: 'GET',
  params
})

export const appraise = data => axios({
  url: '/api/v1/appraiseWorkOrder/appraise',
  method: 'POST',
  data
})

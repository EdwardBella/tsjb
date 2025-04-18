/**
 * 评价案件
 */

import axios from '@/utils/axios'

// 评价案件(针对已办结的案件)
export const appraise = data => axios({
  url: '/api/v1/workOrder/appraise/appraise',
  method: 'POST',
  data
})
// 详情
export const detail = id => axios({
  url: `/api/v1/workOrder/appraise/detail/${id}`,
  method: 'GET',
})
// 列表
export const list = params => axios({
  url: '/api/v1/workOrder/appraise/list',
  method: 'GET',
  params
})
// 流程详情
export const processDetails = id => axios({
  url: `/api/v1/workOrder/appraise/process/${id}`,
  method: 'GET',
})

// 上传补正材料
export const addAttachment = data => axios({
  url: '/api/v1/workOrder/distribute/addattachment',
  method: 'POST',
  data
})

/**
 * 审核案件
 */



import axios from '@/utils/axios'

// 查询审批记录
export const auditList = params => axios({
  url: '/api/v1/workOrder/audit/log/query',
  method: 'GET',
  params
})

// 详情
export const detail = auditId => axios({
  url: `/api/v1/workOrder/audit/detail/${auditId}`,
  method: 'GET',
})
// 驳回
export const fail = data => axios({
  url: '/api/v1/workOrder/audit/fail',
  method: 'POST',
  data
})
// 列表
export const list = params => axios({
  url: '/api/v1/workOrder/audit/list',
  method: 'GET',
  params
})
// 流程详情
export const processDetails = id => axios({
  url: `/api/v1/workOrder/audit/process/${id}`,
  method: 'GET',
})
// 通过
export const success = data => axios({
  url: '/api/v1/workOrder/audit/success',
  method: 'POST',
  data
})

// 查询审批记录
export const log = params => axios({
  url: '/api/v1/workOrder/audit/log/query',
  method: 'GET',
  params
})

// 查询审批流程记录
// export const log = params => axios({
//   url: '/api/v1/log/query',
//   method: 'GET',
//   params
// })

// 上传补正材料
export const addAttachment = data => axios({
  url: '/api/v1/workOrder/distribute/addattachment',
  method: 'POST',
  data
})


/**
 * 案件管理相关接口
 */

import axios from '@/utils/axios'

// 案件列表
export const list = params => axios({
  url: '/api/v1/workOrder/list',
  method: 'GET',
  params
})

export const add = data => axios({
  url: '/api/v1/workOrder/add',
  method: 'POST',
  data
})

export const details = id => axios({
  url: `/api/v1/workOrder/detail/${id}`,
  method: 'GET',
})

export const reject = data => axios({
  url: `/api/v1/workOrder/reject`,
  method: 'POST',
  data
})

export const distribute = data => axios({
  url: `/api/v1/workOrder/distribute`,
  method: 'POST',
  data
})

export const edit = data => axios({
  url: `/api/v1/workOrder/modify`,
  method: 'POST',
  data
})

export const cancelDistribute = workOrderNo => axios({
  url: `/api/v1/workOrder/canceldistribute/${workOrderNo}`,
  method: 'POST',
})


export const cancelReject = workOrderNo => axios({
  url: `/api/v1/workOrder/cancelreject/${workOrderNo}`,
  method: 'POST',
})

export const cancelPublish = workOrderNo => axios({
  url: `/api/v1/workOrder/cancelPublish/${workOrderNo}`,
  method: 'POST'
})

export const publish = workOrderNo => axios({
  url: `/api/v1/workOrder/publish/${workOrderNo}`,
  method: 'POST'
})

export const area = () => axios({
  url: `/api/v1/workOrder/area`,
  method: 'GET'
})

export const cancelFinish = data => axios({
  url: `/api/v1/workOrder/cancelfinish`,
  method: 'POST',
  data
})


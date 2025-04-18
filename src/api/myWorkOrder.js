/**
 * 我的案件相关接口
 */

import axios from '@/utils/axios'

// 案件列表
export const list = params => axios({
  url: '/api/v1/myWorkOrder/list',
  method: 'GET',
  params
})

export const details = id => axios({
  url: `/api/v1/workOrder/detailmy/${id}`,
  method: 'GET',
})

export const accept = workOrderNo => axios({
  url: `/api/v1/myWorkOrder/accept/${workOrderNo}`,
  method: 'POST',
})

export const cancelAccept = workOrderNo => axios({
  url: `/api/v1/myWorkOrder/cancelaccept/${workOrderNo}`,
  method: 'POST',
})

export const appeal = data => axios({
  url: `/api/v1/myWorkOrder/appeal`,
  method: 'POST',
  data
})

export const cancelAppeal = workOrderNo => axios({
  url: `/api/v1/myWorkOrder/cancelappeal/${workOrderNo}`,
  method: 'POST'
})

export const finish = data => axios({
  url: `/api/v1/myWorkOrder/finish`,
  method: 'POST',
  data
})

export const cancelFinish = workOrderNo => axios({
  url: `/api/v1/myWorkOrder/cancelfinish/${workOrderNo}`,
  method: 'POST',
})


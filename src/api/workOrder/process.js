/**
 * 案件处理, 承办中心
 */

import axios from '@/utils/axios'



/* 提交终止 */
export const submitOver = (data) =>
	axios({
		url: "/api/v1/workOrder/finish/over",
		method: "POST",
		data,
	});


// 回退案件(针对调查中的案件)
export const appeal = data => axios({
  url: '/api/v1/workOrder/process/appeal',
  method: 'POST',
  data
})
// 取消回退案件(针对回退中的案件)
export const cancelAppeal = workOrderNo => axios({
  url: `/api/v1/workOrder/process/cancelappeal/${workOrderNo}`,
  method: 'POST',
})
// 取消办结案件(针对已处理的案件)
export const cancelFinishProcess = workOrderNo => axios({
  url: `/api/v1/workOrder/process/cancelfinishprocess/${workOrderNo}`,
  method: 'POST',
})

// 详情(我的案件页面使用)
export const detail = id => axios({
  url: `/api/v1/workOrder/process/detail/${id}`,
  method: 'GET',
})
// 列表
export const list = params => axios({
  url: '/api/v1/workOrder/process/list',
  method: 'GET',
  params
})
// 开始处理案件(针对调查中的案件)
export const start = workOrderNo => axios({
  url: `/api/v1/workOrder/process/start/${workOrderNo}`,
  method: 'POST',
})
// 流程详情
export const processDetails = id => axios({
  url: `/api/v1/workOrder/process/process/${id}`,
  method: 'GET',
})

// 办结案件(针对处理中的案件)
export const finishProcess = data => axios({
  url: '/api/v1/workOrder/finish/finishProcess',
  method: 'POST',
  data
})

// 中止案件(针对处理中的案件)
export const stop = data => axios({
  url: '/api/v1/workOrder/process/stop',
  method: 'POST',
  data
})

// 延期案件(针对处理中的案件)
export const addtime = data => axios({
  url: '/api/v1/workOrder/process/addtime',
  method: 'POST',
  data
})

// 继续处理（针对已中止的案件）
export const continueProcess = workOrderNo => axios({
  url: `/api/v1/workOrder/process/continueprocess/${workOrderNo}`,
  method: 'POST',
})

// 终止案件(针对处理中的案件)
export const over = data => axios({
  url: '/api/v1/workOrder/process/over',
  method: 'POST',
  data
})

// 取消终止（针对已终止的案件）
export const cancelOver = workOrderNo => axios({
  url: `/api/v1/workOrder/process/cancelover/${workOrderNo}`,
  method: 'POST'
})

// 取消确认案件(针对已确认的案件)
export const cancelconfirmation = workOrderNo => axios({
  url: `/api/v1/workOrder/process/cancelconfirmation/${workOrderNo}`,
  method: 'POST'
})

// 上传补正材料
export const addAttachment = data => axios({
  url: '/api/v1/workOrder/process/addattachment',
  method: 'POST',
  data
})

export const addSupervision = (data) => axios({
  url: 'api/v1/workOrder/supervision/addSupervision',
  method: 'POST',
  data
})

export const cancelSupervision = (data) => axios({
  url: 'api/v1/workOrder/supervision/cancelSupervision',
  method: 'POST',
  data
})








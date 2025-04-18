// 待办事项
import axios from '@/utils/axios'

// 列表
export const add = data => axios({
  url: '/api/v1/workOrder/industrySector/add',
  method: 'POST',
  data
})

export const edit = data => axios({
  url: '/api/v1/workOrder/industrySector/edit',
  method: 'PUT',
  data
})

export const del = params => axios({
  url: '/api/v1/workOrder/industrySector/delete',
  method: 'DELETE',
  params
})

export const list = params => axios({
  url: '/api/v1/workOrder/industrySector/list',
  method: 'GET',
  params
})

export const allList = params => axios({
  url: '/api/v1/workOrder/industrySector/listAllIndustrySector',
  method: 'GET',
  params
})

export const listIndustrySector = params => axios({
  url: '/api/v1/workOrder/industrySector/listIndustrySector',
  method: 'GET',
  params
})

export const bind = data => axios({
  url: '/api/v1/workOrder/industrySector/bindingIndustrySector',
  method: 'POST',
  data
})

export const unBind = data => axios({
  url: '/api/v1/workOrder/industrySector/cancelBinding',
  method: 'POST',
  data
})

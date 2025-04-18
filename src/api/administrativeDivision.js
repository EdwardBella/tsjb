// 行政区划管理

import axios from '@/utils/axios'

// 新增
export const add = data => axios({
  url: '/api/v1/administrativedivision/add',
  method: 'POST',
  data
})

// 删除
export const del = id => axios({
  url: `/api/v1/administrativedivision/delete/${id}`,
  method: 'POST',
})

// 详情
export const detail = id => axios({
  url: `/api/v1/administrativedivision/detail/${id}`,
  method: 'GET',
})

// 下移
export const down = id => axios({
  url: `/api/v1/administrativedivision/down/${id}`,
  method: 'POST',
})

// 上移
export const up = id => axios({
  url: `/api/v1/administrativedivision/up/${id}`,
  method: 'POST',
})

// 当前行政区划的部门列表
export const list = id => axios({
  url: `/api/v1/administrativedivision/leaderdepartment/list/${id}`,
  method: 'GET',
})

// 设置主管部门
export const update = data => axios({
  url: '/api/v1/administrativedivision/leaderdepartment/update',
  method: 'POST',
  data
})

// 编辑
export const modify = data => axios({
  url: '/api/v1/administrativedivision/modify',
  method: 'POST',
  data
})

// 树(包含第一级、第二级和第三级)
export const tree = params => axios({
  url: '/api/v1/administrativedivision/tree',
  method: 'GET',
  params
})

// 一键匹配
export const match = params => axios({
  url: '/api/v1/administrativedivision/leaderdepartment/match',
  method: 'POST',
  params
})

// 编辑
// export const modify = data => axios({
//   url: '/api/v1/administrativedivision/modify',
//   method: 'POST',
//   data
// })

// 查询属于我的行政部门
export const myDepart = params => axios({
  url: '/api/v1/administrativedivision/leaderdepartment/querymydepart',
  method: 'GET',
  params
})

// 通过事发地行政区划查询部门信息
export const departByAddress = params => axios({
  url: '/api/v1/administrativedivision/leaderdepartment/querydepartbyaddress',
  method: 'GET',
  params
})







/**
 * 部门相关接口
 */

import axios from '@/utils/axios'

// 获取部门树
export const tree = params => axios({
  url: '/api/v1/department/tree',
  method: 'GET',
  params
})

// 获取行政区划树
export const list = params => axios({
  url: '/api/v1/department/administrativedivision/list',
  method: 'GET',
  params
})

// 设置行政区划
export const update = data => axios({
  url: '/api/v1/department/administrativedivision/update',
  method: 'POST',
  data
})

// 获取部门树(包含行政区划信息)
export const administrativeDivisionTree = params => axios({
  url: '/api/v1/department/tree/administrativedivision',
  method: 'GET',
  params
})

// 一键匹配
export const match = data => axios({
  url: '/api/v1/department/administrativedivision/match',
  method: 'POST',
  data
})

// 清除缓存
export const clearStore = params => axios({
  url: '/api/v1/department/administrativedivision/clearstore',
  method: 'GET',
  params
})

/**
 * 部门配置项接口
 */

import axios from '@/utils/axios'

// 获取列表
export const getList = params => axios({
  url: '/api/v1/workOrder/department/configure/getList',
  method: 'GET',
  params
})

export const getTypeList = params => axios({
  url: '/api/v1/workOrder/department/configure/getlist',
  method: 'GET',
  params
})

export const getTypeListData = params => axios({
  url: '/api/v1/workOrder/department/configure/getlistdata',
  method: 'GET',
  params
})

// 获取部门配置项
export const getConfigureMap = params => axios({
  url: '/api/v1/workOrder/department/configure/getConfigureMap',
  method: 'GET',
  params
})

// 根据类型查询配置
export const getConfigByType = params => axios({
  url: '/api/v1/workOrder/department/configure/getConfigByType',
  method: 'GET',
  params
})

// 编辑
export const edit = params => axios({
  url: '/api/v1/workOrder/department/configure/edit',
  method: 'POST',
  params
})



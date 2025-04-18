/**
 * 配置项接口
 */

import axios from '@/utils/axios'

// 获取列表
export const list = params => axios({
  url: '/api/v1/workOrderConfigure/getList',
  method: 'GET',
  params
})

// 编辑
export const edit = params => axios({
  url: '/api/v1/workOrderConfigure/edit',
  method: 'POST',
  params
})

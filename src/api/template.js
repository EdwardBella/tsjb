// 模板管理相关接口

import axios from "@/utils/axios";

// 列表
export const list = params => axios({
  url: '/api/v1/template/category/list',
  method: 'GET',
  params
})

// 详情
export const detail = id => axios({
  url: `/api/v1/template/detail/code/${id}`,
  method: 'GET',
})

// 详情
export const detailByCode = code => axios({
  url: `/api/v1/template/deatil/code/${code}`,
  method: 'GET',
})



// 发布
export const update = data => axios({
  url: '/api/v1/template/update',
  method: 'POST',
  data
})
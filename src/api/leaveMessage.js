import axios from '@/utils/axios'

export const all = params => axios({
  url: `/api/v1/comment/listall`,
  method: 'GET',
  params
})

// 分页留言信息（全部案件页面使用）
export const list = params => axios({
  url: '/api/v1/comment/list',
  method: 'GET',
  params
})


export const myAll = params => axios({
  url: `/api/v1/comment/listallmy`,
  method: 'GET',
  params
})

export const feedback = data => axios({
  url: `/api/v1/comment/feedback`,
  method: 'POST',
  data
})

export const add = data => axios({
  url: `/api/v1/comment/add`,
  method: 'POST',
  data
})

export const del = id => axios({
  url: `/api/v1/comment/delete/${id}`,
  method: 'POST',
})

// 删除
export const delMy = id => axios({
  url: `/api/v1/comment/deletemy/${id}`,
  method: 'POST',
})

/**
 * 事项管理相关接口
 */

import axios from '@/utils/axios'

export const itemcategoryList = params => axios({
  url: '/api/v1/itemcategory/list',
  method: 'GET',
  params
})

export const itemdetailTree = params => axios({
  url: '/api/v1/itemdetail/tree',
  method: 'GET',
  params
})

export const itemdetailDetails = id => axios({
  url: `/api/v1/itemdetail/detail/${id}`,
  method: 'GET',
})

export const addItemdetail = data => axios({
  url: '/api/v1/itemdetail/add',
  method: 'POST',
  data
})

export const editItemdetail = data => axios({
  url: '/api/v1/itemdetail/modify',
  method: 'POST',
  data
})

export const addItemcategory = data => axios({
  url: '/api/v1/itemcategory/add',
  method: 'POST',
  data
})

export const editItemcategory = data => axios({
  url: '/api/v1/itemcategory/modify',
  method: 'POST',
  data
})

export const deleteItemcategory = id => axios({
  url: `/api/v1/itemcategory/delete/${id}`,
  method: 'POST',
})

export const deleteItemdetail = id => axios({
  url: `/api/v1/itemdetail/delete/${id}`,
  method: 'POST',
})

export const upItemdetail = id => axios({
  url: `/api/v1/itemdetail/up/${id}`,
  method: 'POST',
})

export const upItemcategory = id => axios({
  url: `/api/v1/itemcategory/up/${id}`,
  method: 'POST',
})

export const downItemdetail = id => axios({
  url: `/api/v1/itemdetail/down/${id}`,
  method: 'POST',
})

export const downItemcategory = id => axios({
  url: `/api/v1/itemcategory/down/${id}`,
  method: 'POST',
})






/**
 * 菜单相关
 */

import axios from '@/utils/axios'

// 获取当前用户拥有的页面
export const tree = params => axios({
  url: '/api/v1/menu/tree',
  method: 'GET',
  params
})

// 获取菜单列表
// export const listMenu = params => axios({
//   url: '/api/v1/template/update',
//   method: 'POST',
//   params
// })

export const delMenu = data => axios({
  url: '/api/v1//uias-menu/delMenu',
  method: 'POST',
  data
})

export const addUpdateMenu = data => axios({
  url: '/api/v1/uias-menu/addUpdateMenu',
  method: 'POST',
  data
})

// 获取菜单列表
export const listMenu = data => axios({
  url: '/api/v1/uias-menu/listMenu',
  method: 'POST',
  data
})

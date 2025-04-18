import axios from '@/utils/axios'

/**
 * get 请求
 * @param params
 */
export const getList = params => axios({
  url: '/api/xxx/xxx',
  method: 'GET',
  params
})

/**
 * post 请求
 * @param data
 */
export const addRole = data => axios({
  url: '/xxx/xxx',
  method: 'POST',
  data
})
import axios from '@/utils/axios'

// 【发起举报】-事项树
export const tree = params => axios({
  url: '/api/v1/front/create/itemdetail/tree',
  method: 'GET',
  params
})

// 【发起举报】-事项详情
export const details = id => axios({
  url: `/api/v1/front/create/itemdetail/detail/${id}`,
  method: 'GET',
})
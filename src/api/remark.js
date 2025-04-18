import axios from "@/utils/axios";

// 投诉举报案件对象统计
export const add = data => axios({
  url: "/api/v1/workOrder/remark/add",
  method: "POST",
  data
});

export const del = params => axios({
  url: '/api/v1/workOrder/remark/delete',
  method: 'GET',
  params
})

export const queryMyWorkOrderRemark = params => axios({
  url: '/api/v1/workOrder/remark/queryMyWorkOrderRemark',
  method: 'GET',
  params
})


export const query = params => axios({
  url: '/api/v1/workOrder/remark/query',
  method: 'GET',
  params
})

// export const query = params => Promise.resolve(
//   {
//     "code": 0,
//     "msg": "成功",
//     "result": [
//       {
//         "accountId": "string",
//         "content": "string",
//         "createName": "string",
//         "departmentCode": "string",
//         "departmentName": "string",
//         "id": 0,
//         "remarkType": 0,
//         "remarkVisibleRange": 0,
//         "updateTime": "2023-09-06T03:09:03.079Z",
//         "createTime": "2023-09-06T03:09:03.079Z",
//         "updateUser": "string",
//         "workOrderId": "string",
//         "workOrderNo": "string"
//       },
//       {
//         "accountId": "string",
//         "content": "string",
//         "createName": "string",
//         "departmentCode": "string",
//         "departmentName": "string",
//         "id": 2,
//         "remarkType": 0,
//         "remarkVisibleRange": 0,
//         "updateTime": "2023-09-06T03:09:03.079Z",
//         "createTime": "2023-09-06T03:09:03.079Z",
//         "updateUser": "string",
//         "workOrderId": "string",
//         "workOrderNo": "string"
//       }
//     ]
//   }
// );
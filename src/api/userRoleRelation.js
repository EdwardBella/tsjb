/**
 * 案件管理相关接口
 */

import axios from "@/utils/axios";

// 编辑角色
export const add = data => axios({
  url: "/api/v1/uias-menu/addUpdateRole",
  method: "POST",
  data
});

export const authRoleMenu = data => axios({
  url: "/api/v1//uias-menu/authRoleMenu",
  method: "POST",
  data
});

export const listRoleMenuIds = data => axios({
  url: "/api/v1/uias-menu/listRoleMenuIds",
  method: "POST",
  data
});


// 获取列表
export const list = params => axios({
  url: "/api/v1//uias-menu/pageRole",
  method: "GET",
  params
});

// 通过行政区划获取列表
export const getListByCode = params => axios({
  url: '/api/v1/userRoleRelation/getListbycode',
  method: 'GET',
  params
})

// 检查是否有管理员权限
export const checkAdminRole = params => axios({
  url: '/api/v1/userRoleRelation/checkAdminRole',
  method: 'GET',
  params
})

// 省级营商主管部门
export const checkLeaderDepartment = params => axios({
  url: '/api/v1/administrativedivision/leaderdepartment/check',
  method: 'GET',
  params
})
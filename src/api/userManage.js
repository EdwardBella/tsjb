/* 用户相关接口 */
import axios from "@/utils/axios";

//获取用户列表
export const list = params => axios({
  url: "/api/v1/user/getList",
  method: "GET",
  params
});

// 获取本部门及下级部门树
export const userDeptTree = () => axios({
  url: "/api/v1/user/getUserDeptTree",
  method: "GET"
});

//新增或修改用户信息 
export const addOrUpdate = data => axios({
  url: "/api/v1/user/addOrUpdate",
  method: "POST",
  data
});
//用户详情
export const userDetail = params => axios({
  url: "/api/v1/user/getDetail",
  method: "GET",
  params
});
//获取本部门及下级部门树
export const getAllApplicationPermissionByRoles = params => axios({
  url: "/api/v1/user/getAllApplicationPermissionByRoles",
  method: "GET",
  params
});
//查询某个账户的权限列表
export const getAppList = params => axios({
  url: "/api/v1/user/getAccountRole",
  method: "GET",
  params
});
//修改用户状态
export const setStatus = params => axios({
  url: "/api/v1/user/status",
  method: "POST",
  params
});
//重置密码
export const resetPassword = data => axios({
  url: "/api/v1/user/password/reset",
  method: "POST",
  data
});
//修改密码
export const passWordModify = data => axios({
  url: "/api/v1/user/passWordModify",
  method: "POST",
  data
});
//密码校验
export const checkPassWord = data => axios({
  url: "/api/v1/user/checkPassWord",
  method: "POST",
  data
});
//字段验证
export const verifyByFiled = params => axios({
  url: "/api/v1/user/verifyByFiled",
  method: "GET",
  params
});
//该用户的部门是否为主管部门
export const isAuthority = params => axios({
  url: "/api/v1/user/isAuthority",
  method: "GET",
  params
});
//该用户的部门是否为顶级行政区划的主管部门
export const isTopAuthority = params => axios({
  url: "/api/v1/user/isTopAuthority",
  method: "GET",
  params
});
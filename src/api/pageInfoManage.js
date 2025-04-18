/* 页面信息相关接口 */
import axios from "@/utils/axios";

//获取用户列表
export const list = params => axios({
  url: "/api/v1/pageInformation/list",
  method: "GET",
  params
});
//列表详情
export const listDetail = params => axios({
  url: "/api/v1/pageInformation/getDetail",
  method: "GET",
  params
});
//文档详情
export const getDetail = params => axios({
  url: "/api/v1/front/getPageInformationDetailByName",
  method: "GET",
  params
});
//编辑
export const editSubmit = data => axios({
  url: "/api/v1/pageInformation/edit",
  method: "POST",
  data
});

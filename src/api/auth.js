import axios from "../utils/axios";

export const login = (data) => {
  return axios.post("/api/v1/auth/login", data);
};

export const uKeyLogin = () => {
  // TODO
};

export const checkAuth = (data) => {
  return axios.get("/api/v1/auth/checkAuth?appId=" + data);
};

export const loginout = (data) => {
  return axios.post("/api/v1/auth/loginout", data);
};

export const sendTelCode = (telephone, type) => {
  return axios.post("/api/v1/auth/sendTelCode?telephone=" + telephone + "&type=" + type);
};

export const mobileLogin = (telephone, code) => {
  return axios.post("/api/v1/auth/mobileLogin?telephone=" + telephone + "&code=" + code);
};

export const getuserinfo = () => {
  return axios.get("/api/v1/auth/getuserinfo");
};

// 该用户的部门是否为主管部门
export const isAuthority = () => {
  return axios.get("/api/v1/user/isAuthority");
};

// 该用户的部门是否为顶级行政区划的主管部
export const isTopAuthority = () => {
  return axios.get("/api/v1/user/isTopAuthority");
};

// 省级部门
export const isTop = () => {
  return axios.get("/api/v1/user/isTop");
};
// 消息数量
export const getNum = () => {
  return axios.get("/api/v1/notification/getNum");
};
// 消息列表
export const getNotificationList = (params) =>
  axios({
    url: "/api/v1/notification/list",
    method: "GET",
    params,
  });
// 消息已读
export const getMessageRead = (data) =>
  axios({
    url: "/api/v1/notification/messageRead",
    method: "POST",
    params:data,
  });

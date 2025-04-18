// 待办事项
import axios from "@/utils/axios";

// 列表
export const list = params => axios({
  url: "/api/v1/workOrder/waiting/list",
  method: "GET",
  params
});



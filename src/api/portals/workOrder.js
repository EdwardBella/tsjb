import axios from "@/utils/portalsAxios";

// 不受理复核
export const rejectReview = (data) =>
	axios({
		url: "/api/v1/front/rejectReview",
		method: "POST",
		data,
	});



// 【公开信息】-最新公开列表
export const latestList = (params) =>
	axios({
		url: "/api/v1/front/public/workorder/latestlist",
		method: "GET",
		params,
	});

// 【发起举报】-地区
export const area = (params) =>
	axios({
		url: "/api/v1/front/create/area",
		method: "GET",
		params,
	});

// 【发起举报】-新增案件
export const add = (data) =>
	axios({
		url: "/api/v1/front/create/workorder/add",
		method: "POST",
		data,
	});

// 【公开信息】-案件详情
export const details = (id) =>
	axios({
		url: `/api/v1/front/public/workorder/detail/${id}`,
		method: "GET",
	});

// 【公开信息】-分页列表
export const list = (params) =>
	axios({
		url: "/api/v1/front/public/workorder/list",
		method: "GET",
		params,
	});

// 【公开信息】-案件的留言信息
export const comments = (id) =>
	axios({
		url: `/api/v1/front/public/workorder/comment/${id}`,
		method: "GET",
	});

// 【我的投诉】-分页列表
export const myWorkOrderlist = (params) =>
	axios({
		url: "/api/v1/front/my/workorder/list",
		method: "GET",
		params,
	});

// 【我的投诉】-案件详情
export const myWorkOrderDetails = (id) =>
	axios({
		url: `/api/v1/front/my/workorder/detail/${id}`,
		method: "GET",
	});

// 【公开信息】-发布留言
export const addComment = (data) =>
	axios({
		url: "/api/v1/front/public/workorder/comment/add",
		method: "POST",
		data,
	});

// 【公开信息】-发布回复
export const addFeedback = (data) =>
	axios({
		url: "/api/v1/front/public/workorder/comment/addfeedback",
		method: "POST",
		data,
	});

// 【我的投诉】-发布留言
export const addCommentOfMyWorkOrder = (data) =>
	axios({
		url: "/api/v1/front/my/workorder/comment/add",
		method: "POST",
		data,
	});

// 【我的投诉】-发布回复
export const addFeedbackOfMyWorkOrder = (data) =>
	axios({
		url: "/api/v1/front/my/workorder/comment/addfeedback",
		mutation: "setCommentError",
		method: "POST",
		data,
	});

// 【我的投诉】-发布评价
export const appraise = (data) =>
	axios({
		url: "/api/v1/front/my/workorder/appraise",
		method: "POST",
		data,
	});

// 【我的投诉】-案件详情
export const detailsOfMyWorkOrder = (id, params) =>
	axios({
		url: `/api/v1/front/my/workorder/detail/${id}`,
		method: "GET",
		params,
	});

// 【我的投诉】-分页列表
export const listOfMyWorkOrder = (params) =>
	axios({
		url: "/api/v1/front/my/workorder/list",
		method: "GET",
		params,
	});

export const treeByParentCode = (params) =>
	axios({
		url: "/api/v1/dict/treeByParentCode",
		method: "GET",
		params,
	});



// 我的投诉】-查看案件的留言信息
export const commentsOfMyWorkOrder = (id, params) =>
	axios({
		url: `/api/v1/front/my/workorder/comment/${id}`,
		method: "GET",
		params,
	});

// 【公开信息或我的投诉】-取消留言
export const cancelComments = (data) =>
	axios({
		url: "/api/v1/front/public/workorder/comment/cancel",
		method: "POST",
		data,
	});


export const addNew = data => axios({
	url: '/api/v1/front/create/workorder/addNew',
	method: 'POST',
	data
})

// 【发起举报】-重新提交案件
export const resubmit = (data) =>
	axios({
		url: "/api/v1/front/create/workorder/resubmitNew",
		method: "POST",
		data,
	});

// 上传补正材料
export const addAttachment = (data) =>
	axios({
		url: "/api/v1/front/workorder/saveAndCommit",
		method: "POST",
		data,
	});

// 【发起举报】-暂存举报详情
export const getTemporaryStorage = (params) =>
	axios({
		url: "/api/v1/front/getTemporaryStorage",
		method: "GET",
		params,
	});

// 【发起举报】-暂存举报
export const temporaryStorage = (data) =>
	axios({
		url: "/api/v1/front/create/workorder/temporaryStorage",
		method: "POST",
		data,
	});

// 上传补正材料
// export const addAttachment = data => axios({
//   url: '/api/v1/front/workorder/saveAndCommit',
//   method: 'POST',
//   data
// })

// 工单上传记录
export const record = (workOrderId) =>
	axios({
		url: `/api/v1/front/record/${workOrderId}`,
		method: "GET",
	});

// 保存
export const save = (data) =>
	axios({
		url: "/api/v1/front/workorder/save",
		method: "POST",
		data,
	});

// 【发起举报】-暂存举报详情
export const getReplenishTemporaryStorage = (params) =>
	axios({
		url: "/api/v1/front/getTemporaryStorage",
		method: "GET",
		params,
	});

// 【发起举报】-事项树
export const getDraftfile = (params) =>
	axios({
		url: "/api/v1/front/workorder/getdraftfile",
		method: "GET",
		params,
	});

// 工单页面配置信息
export const configure = (params) =>
	axios({
		url: "/api/v1/front/workorderconfigure/get",
		method: "GET",
		params,
	});

// 通过事发地行政区划查询部门信息
export const departByAddress = (id) =>
	axios({
		url: "/api/v1/administrativedivision/leaderdepartment/list/" + id,
		method: "GET",
	});

export const revoke = (data) =>
	axios({
		url: "/api/v1/front/revoke",
		method: "POST",
		data,
	});

export const repeatCheck = (data) =>
	axios({
		url: "/api/v1/front/my/workorder/repeatCheck",
		method: "POST",
		data,
	});
/* 手机短信验证码 */
export const sendSmsCode = (data) =>
	axios({
		url: "/api/v1/front/sendSmsCode",
		method: "POST",
		data,
	});


/* 邮箱验证码 */
export const sendEmailCode = (data) =>
	axios({
		url: "/api/v1/front/sendMailCode",
		method: "POST",
		data,
	});
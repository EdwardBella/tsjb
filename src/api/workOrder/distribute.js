/**
 * 受理案件, 受理中心
 */

import axios from "@/utils/axios";

// 新增
export const add = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/add",
		method: "POST",
		data,
	});
// 地区
export const area = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/area",
		method: "GET",
		params,
	});

// 预审反馈
export const addReviewFeedBack = (data) =>
	axios({
		url: "api/v1/workOrder/supervision/addReviewFeedBack",
		method: "POST",
		data,
	});
// 获取预审反馈列表
export const listReviewFeedBack = (workOrderNo) =>
	axios({
		url: `/api/v1/workOrder/supervision/listReviewFeedBack/${workOrderNo}`,
		method: "GET",
	});
// 取消受理(针对调查中的案件)
export const cancelDistribute = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/cancelDistribute",
		method: "POST",
		data,
	});

// 申请复核
export const appeal = (data) =>
	axios({
		url: "/api/v1/workOrder/process/appeal",
		method: "POST",
		data,
	});
//确认承办
export const start = workOrderNo =>
	axios({
		url: `/api/v1/workOrder/process/start/${workOrderNo}`,
		method: "POST",
	});

// 修改案件名称
export const modifyWorkOrderTitle = (data) =>
	axios({
		url: "/api/v1/workOrder/all/modifyWorkOrderTitle",
		method: "POST",
		data,
	});
/* 中止 */
export const stopProcess = (data) =>
	axios({
		url: "/api/v1/workOrder/process/stop",
		method: "POST",
		data,
	});

/* 发起材料举证 */
export const updatematerial = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/updatematerial",
		method: "POST",
		data,
	});
/* 撤回材料举证 */
export const revoke = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/revoke",
		method: "POST",
		params,
	});
/* 延期工单 */
export const addtimeProcess = (data) =>
	axios({
		url: '/api/v1/workOrder/process/addtime',
		method: "POST",
		data
	});
/* 继续办理 */
export const continueprocess = (params) =>
	axios({
		url: `/api/v1/workOrder/process/continueProcess`,
		method: "POST",
		params
	});
// 确认接收办理
export const confirResieve = workOrderNo =>
	axios({
		url: `/api/v1/workOrder/process/start/${workOrderNo}`,
		method: "POST",
	});


export const giveUp = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/giveUp",
		method: "POST",
		data,
	});

// 取消办结案件(针对已办结的案件)
export const cancelfinish = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/cancelfinish",
		method: "POST",
		data,
	});
// 取消不受理（针对不受理的案件）
export const cancelReject = (workOrderNo) =>
	axios({
		url: `/api/v1/workOrder/distribute/cancelreject/${workOrderNo}`,
		method: "POST",
	});
// 详情
export const detail = (id) =>
	axios({
		url: `/api/v1/workOrder/distribute/detail/${id}`,
		method: "GET",
	});
// 详情
export const detailProcess = (id) =>
	axios({
		url: `/api/v1/workOrder/process/detail/${id}`,
		method: "GET",
	});
// 详情
export const detailFinish = (id) =>
	axios({
		url: `/api/v1/workOrder/finish/detail/${id}`,
		method: "GET",
	});
// 详情
export const detailApraise = (id) =>
	axios({
		url: `/api/v1/workOrder/appraise/detail/${id}`,
		method: "GET",
	});

// 详情
export const detailAudit = (id) =>
	axios({
		url: `/api/v1/workOrder/audit/detail/${id}`,
		method: "GET",
	});

// 列表
export const list = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/list",
		method: "GET",
		params,
	});
	export const allList = (params) =>
		axios({
			url: "/api/v1/workOrder/all/list",
			method: "GET",
			params,
		});
// 编辑
export const modify = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/modify",
		method: "POST",
		data,
	});
// 流程详情
export const process = (id) =>
	axios({
		url: `/api/v1/workOrder/distribute/process/${id}`,
		method: "GET",
	});

// 受理（针对待受理）
export const receive = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/receive",
		method: "POST",
		data,
	});


// 不受理（针对待受理、回退中的案件）
export const reject = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/reject",
		method: "POST",
		data,
	});


// 派发
export const acceptance = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/acceptance",
		method: "POST",
		data,
	});

//获取文书列表
export const attachmentListByDocumentCode = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/detail/attachmentListByDocumentCode",
		method: "GET",
		params,
	});

// 退回或补正（针对待受理的工单）
export const goBack = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/goBack",
		method: "POST",
		data,
	});
// 移除重复标签
export const removeDuplicated = (data) =>
	axios({
		url: "/api/v1/workOrder/supervision/removeDuplicated",
		method: "POST",
		data,
	});
export const removePushDepartment = (data) =>
	axios({
		url: "/api/v1/workOrder/supervision/removePushDepartment",
		method: "POST",
		data,
	});

// 线索推送
export const pushDepartment = (data) =>
	axios({
		url: "/api/v1/workOrder/supervision/pushDepartment",
		method: "POST",
		data,
	});





// 获取受理交办的部门树
export const transferDepartmentTree = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/transfer/department/tree",
		method: "GET",
		params,
	});

// 获取受理交办的部门树
export const distributeDepartmentTree = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/distribute/department/tree",
		method: "GET",
		params,
	});

// 受理交办(针对待受理、回退中的案件)
export const distribute = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/distribute",
		method: "POST",
		data,
	});



// 转移交办(回退中的案件)
export const distributeTransfer = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/distributeTransfer",
		method: "POST",
		data,
	});

// 移交(针对待受理的案件)
export const transfer = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/transferDepartment",
		method: "POST",
		data,
	});

// 流程详情
export const processDetails = (id) =>
	axios({
		url: `/api/v1/workOrder/distribute/process/${id}`,
		method: "GET",
	});

// 办结案件(针对已处理的案件)

export const finish = (data) =>
	axios({
		url: "/api/v1/workOrder/finish/makeSureFinish",
		method: "POST",
		data,
	});
export const over = (data) =>
	axios({
		url: "/api/v1/workOrder/finish/makeSureOver",
		method: "POST",
		data,
	});
// 取消办结案件(针对已办结的案件)
export const cancelFinish = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/cancelfinish",
		method: "POST",
		data,
	});

// 退回案件(针对已处理的案件)
export const back = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/back",
		method: "POST",
		data,
	});

// 中止案件(针对处理中的案件)
export const stop = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/stop",
		method: "POST",
		data,
	});
// 延期案件(针对处理中的案件)
export const addtime = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/addtime",
		method: "POST",
		data,
	});

// 上传补正材料
export const addAttachment = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/addattachment",
		method: "POST",
		data,
	});

// 【发起举报】-暂存举报详情
export const getTemporaryStorage = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/getTemporaryStorage",
		method: "GET",
		params,
	});

// 【发起举报】-暂存举报
export const temporaryStorage = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/temporaryStorage",
		method: "POST",
		data,
	});

// 发起补正材料
export const updateMaterial = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/updatematerial",
		method: "POST",
		data,
	});



export const recallApprove = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/approve",
		method: "POST",
		params,
	});

export const makeACopyFor = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/makeACopyFor",
		method: "POST",
		data,
	});

export const queryMakeACopyFor = (params) =>
	axios({
		url: "/api/v1/workOrder/distribute/queryMakeACopyFor",
		method: "GET",
		params,
	});
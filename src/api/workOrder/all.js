/**
 * 全部案件
 */

import axios from "@/utils/axios";

// 列表
export const list = (params) =>
	axios({
		url: "/api/v1/workOrder/all/list",
		method: "GET",
		params,
	});

// 详情
export const detail = (id) =>
	axios({
		url: `/api/v1/workOrder/all/detail/${id}`,
		method: "GET",
	});

export const _detail = (id) =>
	Promise.resolve({
		code: 0,
		msg: "操作成功",
		result: {
			acceptDepartment: "cs",
			acceptDepartmentCode: "101020",
			actualProcessDay: "",
			address: "郑州市",
			addressArea: "",
			addressCity: "",
			addressDepartmentCode: "101001002001",
			addressDepartmentName: "郑州市发展和改革委员会",
			addressId: 2,
			appraiseFlag: "N",
			appraiseFlagMy: "N",
			appraiseStatus: "N",
			attachmentList: [{
				behavivor: "WORK_ORDER_ADD",
				businessType: 0,
				createTime: "2023-08-31 10:07:14",
				createUser: "b067c30161024088ac890d2dae107a59",
				delFlag: "N",
				fileName: "系统演示脚本0626.docx",
				fileUrl: "group1/M00/00/08/wKiIH2Tv9c6AWdPmAABF01wB1Zc73.docx",
				id: 570,
				materialCorrectRecordId: "",
				processId: "",
				source: "",
				type: "",
				updateTime: "",
				updateUser: "",
				userId: "",
				workOrderId: "",
				workOrderNo: "20230831营商000005",
			}, ],
			auditFlag: "Y",
			canAudit: "",
			comment: "",
			companyAddress: "",
			companyContactIdNum: "",
			companyContactName: "",
			complaint: "",
			createTime: "2023-08-31 10:07:14",
			createType: 0,
			createUser: "b067c30161024088ac890d2dae107a59",
			createUsername: "正在",
			currentStepDeadline: "2023-09-07 23:59:59",
			deadline: "2023-11-08 23:59:59",
			debtAmount: 20000.0,
			delFlag: "N",
			exceptionTag: "",
			expireFlag: "Y",
			factReason: "1",
			filingTime: "2023-08-31 10:12:23",
			id: "87411c75e724468d9fb8a083dbc1ff97",
			idNumber: "372523198303299673",
			isArrear: true,
			itemDetailId: 31,
			itemDetailName: "违法干预市场主体正常经营活动",
			itemSource: 2,
			lastCompleteTime: "",
			mailAddress: "悄悄",
			mainApply: "1",
			makePayPlan: "",
			makePayPlanAmount: 8000.0,
			materialCorrectRecordId: "",
			materialCorrectStatus: "",
			materialCorrectionDtoList: "",
			mobile: "10166666666",
			orderPublishStatus: "",
			payAllAmount: "",
			payAmountNoPay: 8000.0,
			payAmountPayed: 0.0,
			payNote: "看看",
			payedAmount: 2000.0,
			processAttachmentList: [{
					behavivor: "WORK_ORDER_ADD",
					businessType: 0,
					createTime: "2023-08-31 10:07:14",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					fileName: "系统演示脚本0626.docx",
					fileUrl: "group1/M00/00/08/wKiIH2Tv9c6AWdPmAABF01wB1Zc73.docx",
					id: 570,
					materialCorrectRecordId: "",
					processId: "",
					source: "",
					type: "",
					updateTime: "",
					updateUser: "",
					userId: "",
					workOrderId: "",
					workOrderNo: "20230831营商000005",
				},
				{
					behavivor: "",
					businessType: 0,
					createTime: "2023-08-31 10:12:23",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					fileName: "立案审批表.doc",
					fileUrl: "group1/M00/00/08/wKiIH2Tv9waAGD-DAABKAB_rnCc226.doc",
					id: 571,
					materialCorrectRecordId: "",
					processId: "",
					source: "",
					type: "doc",
					updateTime: "",
					updateUser: "",
					userId: "",
					workOrderId: "",
					workOrderNo: "20230831营商000005",
				},
				{
					behavivor: "",
					businessType: 1,
					createTime: "2023-08-31 10:13:53",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					fileName: "系统演示脚本0626.docx",
					fileUrl: "group1/M00/00/08/wKiIH2Tv90KAZOFuAABF0022nDc63.docx",
					id: 573,
					materialCorrectRecordId: "",
					processId: "517794fc16c6440cbf288dea0bfb0e65",
					source: "",
					type: "docx",
					updateTime: "",
					updateUser: "",
					userId: "",
					workOrderId: "",
					workOrderNo: "20230831营商000005",
				},
			],
			processDepartment: "cs",
			processDepartmentCode: "101020",
			processLimitDay: 45,
			processList: [{
					acceptDepartment: "河南省发展和改革委员会",
					acceptDepartmentCode: "101002001",
					comment: "",
					correctRequirement: "",
					costTime: "",
					createTime: "2023-08-31 10:07:14",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					id: "1d0576b58dd14a24ba136cce3a5d246e",
					lastCompleteTime: "",
					lastCurrStepDeadline: "",
					makePayPlanAmount: "",
					operateName: "河南省发展和改革委员会创建了案件",
					operateType: "00",
					other: "",
					payNote: "",
					payedAmount: "",
					processUser: "liuwenjie",
					processUserId: "b067c30161024088ac890d2dae107a59",
					reason: "",
					satisfactionLevel: "",
					updateTime: "",
					updateUser: "",
					workOrderNo: "20230831营商000005",
				},
				{
					acceptDepartment: "cs",
					acceptDepartmentCode: "101020",
					comment: "* 管理员用户可以在“系统管理-回复模板管理”管理本模板",
					correctRequirement: "",
					costTime: 48,
					createTime: "2023-08-31 10:08:03",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					id: "586e9c6fe9444061a9c228bdd81675ec",
					lastCompleteTime: "",
					lastCurrStepDeadline: "2023-09-05 23:59:59",
					makePayPlanAmount: "",
					operateName: "移交给cs",
					operateType: "03",
					other: "",
					payNote: "",
					payedAmount: "",
					processUser: "liuwenjie",
					processUserId: "b067c30161024088ac890d2dae107a59",
					reason: "",
					satisfactionLevel: "",
					updateTime: "",
					updateUser: "",
					workOrderNo: "20230831营商000005",
				},
				{
					acceptDepartment: "cs",
					acceptDepartmentCode: "101020",
					comment: "办理",
					correctRequirement: "",
					costTime: 260,
					createTime: "2023-08-31 10:12:23",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					id: "1ee46ba930524a41980e998efbada273",
					lastCompleteTime: "",
					lastCurrStepDeadline: "2023-09-05 23:59:59",
					makePayPlanAmount: "",
					operateName: "cs自办",
					operateType: "04",
					other: "",
					payNote: "",
					payedAmount: "",
					processUser: "liuwenjie",
					processUserId: "b067c30161024088ac890d2dae107a59",
					reason: "",
					satisfactionLevel: "",
					updateTime: "",
					updateUser: "",
					workOrderNo: "20230831营商000005",
				},
				{
					acceptDepartment: "cs",
					acceptDepartmentCode: "101020",
					comment: "",
					correctRequirement: "",
					costTime: 17,
					createTime: "2023-08-31 10:12:40",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					id: "311b495391384d418795246d04dc573d",
					lastCompleteTime: "",
					lastCurrStepDeadline: "2023-09-07 23:59:59",
					makePayPlanAmount: "",
					operateName: "cs确认",
					operateType: "11",
					other: "",
					payNote: "",
					payedAmount: "",
					processUser: "liuwenjie",
					processUserId: "b067c30161024088ac890d2dae107a59",
					reason: "",
					satisfactionLevel: "",
					updateTime: "",
					updateUser: "",
					workOrderNo: "20230831营商000005",
				},
				{
					acceptDepartment: "cs",
					acceptDepartmentCode: "101020",
					comment: "* 管理员用户可以在“系统管理-回复模板管理”管理本模板",
					correctRequirement: "",
					costTime: 72,
					createTime: "2023-08-31 10:13:53",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					id: "517794fc16c6440cbf288dea0bfb0e65",
					lastCompleteTime: "",
					lastCurrStepDeadline: "2023-09-30 23:59:59",
					makePayPlanAmount: 8000.0,
					operateName: "cs提交办结",
					operateType: "16",
					other: "",
					payNote: "看看",
					payedAmount: 2000.0,
					processUser: "liuwenjie",
					processUserId: "b067c30161024088ac890d2dae107a59",
					reason: "\t 处理",
					satisfactionLevel: "satisfaction",
					updateTime: "",
					updateUser: "",
					workOrderNo: "20230831营商000005",
				},
			],
			publicIntention: "Y",
			publicStatus: "",
			reason: "",
			satisfactionLevel: "satisfaction",
			socialCreditNumber: "",
			status: 4,
			supervisionTag: "",
			title: "天气",
			updateTime: "2023-08-31 10:14:10",
			updateUser: "b067c30161024088ac890d2dae107a59",
			wordAttachmentList: [{
					behavivor: "WORK_ORDER_ADD",
					businessType: 5,
					createTime: "2023-08-31 10:07:14",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					fileName: "投诉书.doc",
					fileUrl: "group1/M00/00/08/wKiIH2Tv9dGAeYGoAAAsAG2cfuk923.doc",
					id: 569,
					materialCorrectRecordId: "",
					processId: "",
					source: "",
					type: "doc",
					updateTime: "",
					updateUser: "",
					userId: "",
					workOrderId: "",
					workOrderNo: "20230831营商000005",
				},
				{
					behavivor: "",
					businessType: 5,
					createTime: "2023-08-31 10:12:24",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					fileName: "受理通知书.doc",
					fileUrl: "group1/M00/00/08/wKiIH2Tv9weAHGCHAAAoACUO-rc328.doc",
					id: 572,
					materialCorrectRecordId: "",
					processId: "",
					source: "",
					type: "doc",
					updateTime: "",
					updateUser: "",
					userId: "",
					workOrderId: "",
					workOrderNo: "20230831营商000005",
				},
			],
			wordsFlag: "N",
			wordsFlagMy: "N",
			workOrderAppraise: "",
			workOrderAudit: {
				actionLogStatus: "",
				actionTypeNumber: "de7cb1c591c04c5cbd6100a40885da2c",
				applyComment: "* 管理员用户可以在“系统管理-回复模板管理”管理本模板",
				applyOther: "",
				applyReason: "",
				attachmentFile: "",
				auditCheck: "",
				auditRole: "一级审批",
				auditStatus: "一级审批审批",
				comment: "",
				createTime: "2023-08-31 10:14:10",
				createUser: "b067c30161024088ac890d2dae107a59",
				delFlag: "N",
				department: "cs",
				departmentCode: "101020",
				distributeType: "",
				filingTime: "2023-08-31 10:12:23",
				handleProcessId: "",
				id: "",
				makePayPlanAmount: "",
				nextDepartment: "",
				nextDepartmentCode: "",
				payNote: "",
				payedAmount: "",
				processId: "",
				publicStatus: "N",
				reportFile: "",
				satisfactionLevel: "satisfaction",
				source: "LOG",
				status: 6,
				title: "天气",
				type: "06",
				updateTime: "2023-08-31 10:14:10",
				updateUser: "b067c30161024088ac890d2dae107a59",
				updateUsername: "liuwenjie",
				workOrderNo: "20230831营商000005",
				workOrderNumber: "(2023)豫0100营商0016",
			},
			workOrderNo: "20230831营商000005",
			workOrderNumber: "(2023)豫0100营商0016",
			workOrderProcessOver: "",
			workOrderProcessResult: "",
			workOrderSubmitFinishResult: {
				attachmentList: [],
				comment: "* 管理员用户可以在“系统管理-回复模板管理”管理本模板",
				createTime: "2023-08-31 10:13:53",
				createUser: "b067c30161024088ac890d2dae107a59",
				delFlag: "N",
				id: "",
				processId: "",
				reason: "\t 处理",
				reportList: [{
					behavivor: "",
					businessType: 1,
					createTime: "2023-08-31 10:13:53",
					createUser: "b067c30161024088ac890d2dae107a59",
					delFlag: "N",
					fileName: "系统演示脚本0626.docx",
					fileUrl: "group1/M00/00/08/wKiIH2Tv90KAZOFuAABF0022nDc63.docx",
					id: 573,
					materialCorrectRecordId: "",
					processId: "517794fc16c6440cbf288dea0bfb0e65",
					source: "",
					type: "docx",
					updateTime: "",
					updateUser: "",
					userId: "",
					workOrderId: "",
					workOrderNo: "20230831营商000005",
				}, ],
				satisfactionLevel: "satisfaction",
				updateTime: "",
				updateUser: "",
				workOrderNo: "20230831营商000005",
			},
		},
	});

// 获取当前部门及以下的部门树
export const departmentTree = (params) =>
	axios({
		url: "/api/v1/workOrder/all/department/tree",
		method: "GET",
		params,
	});

// 流程详情
export const processDetails = (id) =>
	axios({
		url: `/api/v1/workOrder/all/process/${id}`,
		method: "GET",
	});

// 上传补正材料
export const addAttachment = (data) =>
	axios({
		url: "/api/v1/workOrder/distribute/addattachment",
		method: "POST",
		data,
	});
// 导入案件
export const importWordOrder = (data) =>
	axios({
		url: "/api/v1/workOrder/all/importWordOrder",
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		data,
	});
// 数据校验确认
export const checkImport = (data) =>
	axios({
		url: "/api/v1/workOrder/all/checkImport",
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		data,
	});
// 导出历史案件模板
export const exportTemplate = (id) =>
	axios({
		url: "/api/v1/workOrder/all/exportTemplate",
		method: "GET",
		responseType: "blob",
	});

// 是否受理部
export const isCompetent = () =>
	axios({
		url: `/api/v1/workOrder/all/getIsCompetent`,
		method: "GET",
	});

export const getProcessCodeList = (params) =>
	axios({
		url: `/api/v1/workOrder/all/getProcessCodeList`,
		method: "GET",
		params,
	});

export const queryMySubList = (params) =>
	axios({
		url: `/api/v1/administrativedivision/queryMySubList`,
		method: "GET",
		params,
	});

export const closeException = (params) =>
	axios({
		url: `/api/v1/workOrder/supervision/closeException`,
		method: "POST",
		params,
	});
/* 编辑跟踪 */
export const editSupervision = (data) =>
	axios({
		url: `/api/v1/workOrder/supervision/editSupervision`,
		method: "POST",
		data,
	});

/* 编辑异常 */
export const editException = (data) =>
	axios({
		url: `/api/v1/workOrder/supervision/editException`,
		method: "POST",
		data,
	});

export const addException = (data) =>
	axios({
		url: `/api/v1/workOrder/supervision/addException`,
		method: "POST",
		data,
	});

export const queryProvincialLevel = (params) =>
	axios({
		url: `/api/v1/workOrder/supervision/queryProvincialLevel`,
		method: "POST",
		params,
	});

export const queryPayPlan = (params) =>
	axios({
		url: `/api/v1/payPlan/queryPayPlan`,
		method: "GET",
		params,
	});

export const queryPayPlanOther = (params) =>
	axios({
		url: `/api/v1/payPlanOther/queryPayPlanOther`,
		method: "GET",
		params,
	});

export const addPayRecord = (data) =>
	axios({
		url: `/api/v1/payPlan/updatePayRecord`,
		method: "POST",
		data,
	});

export const addOrUpdatePayOtherRecord = (data) =>
	axios({
		url: `/api/v1/payPlanOther/addOrUpdatePayOtherRecord`,
		method: "POST",
		data,
	});


export const checkProcessDepartmentCode = (params) =>
	axios({
		url: `/api/v1/payPlan/checkProcessDepartmentCode`,
		method: "GET",
		params,
	});

export const addEvaluate = (data) =>
	axios({
		url: `/api/v1/workOrder/evaluate/addEvaluate`,
		method: "POST",
		data,
	});
// 详情界面查询二级分类文书列表
export const detailAttachmentList = (params) =>
	axios({
		url: `/api/v1/workOrder/distribute/detail/attachmentList`,
		method: "GET",
		params,
	});


export const applyCancelSupervision = (data) =>
	axios({
		url: `/api/v1/workOrder/supervision/applyCancelSupervision`,
		method: "POST",
		data,
	});


export const applyCloseException = (data) =>
	axios({
		url: `/api/v1/workOrder/supervision/applyCloseException`,
		method: "POST",
		data,
	});
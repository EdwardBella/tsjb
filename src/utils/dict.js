export const workOrderStatusDict = Object.freeze({
	0: "待受理",
	1: "回退中",
	2: "待确认",
	3: "调查中",
	4: "待办结",
	5: "已办结",
	6: "不受理",
	7: "已中止",
	8: "已终止",
	9: "撤回中",
	10: "已撤回",
	11: "已移交",
	// 9: '材料补正中',
	// 10: '补正材料已上传'
});
/* 案件类型 */
export const caseType = [{
	value: '',
	label: '全部'
}, {
	value: '1',
	label: '行政审批类'
}, {
	value: '2',
	label: '拖欠账款类'
}, {
	value: '3',
	label: '涉法涉诉类'
}, {
	value: '4',
	label: '要素保障类'
}, {
	value: '5',
	label: '执法监管类'
}, {
	value: '6',
	label: '违规项目类'
}, {
	value: '7',
	label: '其他'
}]


/* 案件状态 */
export const allStatusDict = Object.freeze([{
	value: '',
	label: "全部",
}, {
	value: '0',
	label: "待受理",
	children: [{
		value: '0,0',
		label: "正常",
	}, {
		value: '0,2',
		label: "材料补正中",
	}]
}, {
	value: '21',
	label: "待派发",
}, {
	value: '6',
	label: '不受理'
}, {
	value: '14',
	label: "放弃投诉举报",
}, {
	value: '2',
	label: "待确认办理",
}, {
	value: '3',
	label: "调查中",
	children: [{
		value: '3,0',
		label: "正常",
	}, {
		value: '3,3',
		label: "材料举证中",
	}, {
		value: '3,7',
		label: "已终止",
	}]
}, {
	value: '4',
	label: "待办结",
}, {
	value: '5',
	label: '已办结'
}, {
	value: '15',
	label: "待终止",
}, {
	value: '8',
	label: '已终止'
}, ]);
/* 案件状态 */
// export const allStatusDict = Object.freeze([{
// 		value: '',
// 		label: "全部",
// 	},{
// 		value: '0',
// 		label: "待受理",
// 		children: [{
// 			value: '0,0',
// 			label: "正常",
// 		}, {
// 			value: '0,2',
// 			label: "材料补正中",
// 		}]
// 	}, {
// 		value: '1',
// 		label: "回退中",
// 	}, {
// 		value: '2',
// 		label: "待确认办理",
// 	}, {
// 		value: '3',
// 		label: "调查中",
// 		children: [{
// 			value: '3,0',
// 			label: "正常",
// 		}, {
// 			value: '3,3',
// 			label: "材料举证中",
// 		}, {
// 			value: '3,7',
// 			label: "已终止",
// 		}]
// 	}, {
// 		value: '4',
// 		label: "待办结",
// 	}, {
// 		value: '5',
// 		label: '已办结'
// 	}, {
// 		value: '6',
// 		label: '不受理'
// 	}, {
// 		value: '8',
// 		label: '已终止'
// 	}, {
// 		value: '9',
// 		label: "撤回中",
// 	}, {
// 		value: '10',
// 		label: "已撤回",
// 	}, {
// 		value: '11',
// 		label: "已移交",
// 	}, {
// 		value: '13',
// 		label: "发起材料补正",
// 	}, {
// 		value: '14',
// 		label: "放弃投诉举报",
// 	}, {
// 		value: '15',
// 		label: "待终止",
// 	}, {
// 		value: '16',
// 		label: "复核中",
// 	}, {
// 		value: '17',
// 		label: "修正中",
// 	},
// 	{
// 		value: '21',
// 		label: "待派发",
// 	},

// ]);

/* 案件状态 */
export const ajztStatusDict = Object.freeze([{
		value: '0,21,2,1,9,16,10,13',
		label: "全部",
	}, {
		value: '0',
		label: "待受理",
		children: [{
			value: '0,0',
			label: "正常",
		}, {
			value: '0,2',
			label: "材料补正中",
		}]
	}, {
		value: '21',
		label: "待派发",
	}, {
		value: '2',
		label: "待确认办理",
	}, {
		value: '1',
		label: "回退中",
	}, {
		value: '9',
		label: "撤回中",
	},
	{
		value: '16',
		label: "待复核",
	},
	{
		value: '10',
		label: "已撤回",
	},
]);

/* 案件状态 */
export const ajztStatusDict2 = Object.freeze([{
	value: '16,2,3,7',
	label: "全部",
}, {
	value: '16',
	label: "复核中",
}, {
	value: '2',
	label: "待确认",
}, {
	value: '3',
	label: "调查中",
	children: [{
		value: '3,0',
		label: "正常",
	}, {
		value: '3,3',
		label: "材料举证中",
	}, {
		value: '3,7',
		label: "已中止",
	}]
},]);
export const ajztStatusDict3 = [{
	value: '4,5,15,8',
	label: '全部'
}, {
	value: '4',
	label: '待办结'
}, {
	value: '5',
	label: '已办结'
}, {
	value: '15',
	label: '待终止'
}, {
	value: '8',
	label: '已终止'
}]
// 审批类型
export const splxDict = [{
	value: '',
	label: '全部'
}, {
	value: '10',
	label: '指定办理审批'
}, {
	value: '11',
	label: '转办审批'
}, {
	value: '12',
	label: '交办审批'
}, {
	value: '21',
	label: '退回修改或补正审批'
}, {
	value: '22',
	label: '放弃投诉举报审批'
}, {
	value: '23',
	label: '提出复核审批'
}, {
	value: '24',
	label: '申请复核审批'
}, {
	value: '25',
	label: '提交终止审批'
}, {
	value: '26',
	label: '继续办理审批'
}, {
	value: '27',
	label: '待终止退回重办审批'
}, {
	value: '28',
	label: '待办结退回重办审批'
}, {
	value: '29',
	label: '预审确认审批'
}, {
	value: '30',
	label: '案件受理审批'
}, {
	value: '31',
	label: '确认退回审批'
}, {
	value: '32',
	label: '申请解除跟踪审批'
}, {
	value: '33',
	label: '申请解除异常审批'
}, {
	value: '34',
	label: '撤回投诉举报案件审批'
}, {
	value: '00',
	label: '延期审批'
}, {
	value: '01',
	label: '中止审批'
}, {
	value: '02',
	label: '确认终止审批'
}, {
	value: '03',
	label: '不受理审批'
}, {
	value: '04',
	label: '移交审批'
}, {
	value: '06',
	label: '确认办结审批'
}, {
	value: '07',
	label: '提交办结审批'
}, {
	value: '09',
	label: '直办审批'
}]




export const workOrderAuditTypeDict = Object.freeze({
	"00": "延期审批",
	"01": "中止审批",
	"02": "终止审批",
	"03": "不受理审批",
	"04": "移交审批",
	"05": "自办/转办审批",
	"06": "办结审批",
	"07": "提交办结审批",
	"08": "线索移交审批",
	"09": "直办审批",
	"10": "指定办理审批",
	"11": "转办审批",
});

export const workOrderAuditStatusDict = Object.freeze({
	0: "待审批",
	1: "审批通过",
	2: "审批不通过",
	3: "第二步 部门领导审批",
	4: "第三步 分管领导审批",
});

export const workOrderEventSourceDictOrder = [2, 1, 3, 0, 6, 5, 4];
export const workOrderEventSourceDict = Object.freeze({
	2: "上级交办",
	1: "特邀监督员",
	3: "其他部门移交",
	0: "线上投诉",
	6: "线下窗口",
	5: "历史案件",
	4: "其他",
});
export const workOrderEventSourceDict2 = [{
	code: 2,
	name: '上级交办'
}, {
	code: 1,
	name: '特邀监督员'
}, {
	code: 3,
	name: '其他部门移交'
}, {
	code: 0,
	name: '线上投诉'
}, {
	code: 6,
	name: '线下窗口'
}, {
	code: 5,
	name: '历史案件'
}, {
	code: 4,
	name: '其他'
}]



export const workOrderExpireFlagDict = Object.freeze({
	N: "未过期",
	Y: "已过期",
});

export const workOrderPublicIntentionDict = Object.freeze({
	Y: "同意公开",
	N: "不同意公开",
});

export const workOrderCreatorTypeDict = Object.freeze({
	0: "个人",
	1: "市场主体",
	// 2: "特邀监督员",
	// 3: "上级交办",
	// 4: "其他部门移交",
	// 5: "其他",
});

export const workOrderPublicStatusDict = Object.freeze({
	Y: "公开",
	N: "不公开",
});

// 评价状态
export const workOrderAppraiseStatusDict = Object.freeze({
	Y: "已评价",
	N: "未评价",
});

// 审核状态
export const workOrderProcessAuditStatusDict = Object.freeze({
	0: "待审核",
	1: "通过",
	2: "不通过",
});

export const workOrderOperateTypeDict = Object.freeze({
	"00": "创建",
	"01": "编辑",
	"02": "关闭",
	"03": "移交",
	"04": "受理交办",
	"05": "取消受理",
	"06": "不受理",
	"07": "取消不受理",
	"08": "回退",
	"09": "取消回退",
	10: "转移交办",
	11: "开始处理",
	12: "取消开始处理",
	13: "中止",
	14: "继续处理",
	15: "延期",
	16: "提交办结",
	17: "取消提交办结",
	18: "退回",
	19: "办结",
	20: "取消办结",
	21: "评价",
});

export const accountRoleTypeTypeDict = {
	// // 0: "部门成员",
	// 1: '部门领导',
	2: "案件受理管理员",
	3: "案件处理管理员",
	4: "案件评价员",
	// 5: '部门管理员',
	// 6: '案件管理员',
	// 7: '分管领导'
	// '1': '部门领导',
	// "2": "工单受理管理员",
	// "3": "工单处理管理员",
	// '4': '工单评价员',
	5: "部门管理员",
	// '6': '工单管理员',
	// '7': '分管领导',
	// 8: '一级审批',
	// 9: '二级审批',
	// 10: '三级审批',
	// 11: '四级审批'
};

export const workOrderTodoStatusDict = Object.freeze({
	N: "未处理",
	Y: "已处理",
});

export const workOrderProcessStatusDict = Object.freeze({
	0: "待审批",
	1: "已通过",
	2: "已驳回",
	3: "第二部 部门领导审核",
	4: "第三步 分管领导审核",
	5: "第一步 经办人承办",
});

// 投诉对象类型
export const workOrderComplaintObjectTypeDict = Object.freeze({
	0: "各级人民政府及有关部门",
	1: "各级监察委、人民法院、人民检察院、公安机关",
	2: "水电气热等公用企事业单位",
	3: "行业协会商会",
});

export const messageStatusDict = Object.freeze({
	0: "失败",
	1: "成功",
});

export const workOrderExpiresStatusDict = Object.freeze({
	Y: "已过期",
	N: "未过期",
});

export const workOrderAtisFactionLevelDict = Object.freeze({
	satisfaction: "满意",
	common: "基本满意",
	noSatisfaction: "不满意",
});

export const repaymentPlanStatusDict = Object.freeze({
	NO_PAY: "未还款",
	PAYED: "已还款",
});

export const remarkVisibleRangeDict = {
	0: "全部可见",
	1: "仅我可见的",
	2: "部门可见的",
};
remarkVisibleRangeDict.__keyConverter = Number;

export const remarkTypeDict = {
	0: "办案备注",
	1: "跟踪备注",
	2: "异常备注",
	3: "其他",
	4: "回访核实",
};
remarkTypeDict.__keyConverter = Number;

export const baseBoolDict = {
	0: "否",
	1: "是",
};
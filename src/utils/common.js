import store from "@/store";
import {
	Message
} from "element-ui";


// 获取url上的参数
export const getQueryString = (name) => {
	const url = window.location.href.substring(window.location.href.indexOf("?"));
	// console.log(url,'url');
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	const r = url.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
};

//处理树状渲染公共方法
export function setTreeData(data, code, pcode) {
	// 删除 所有 children,以防止多次调用
	data.forEach(function(item) {
		delete item.children;
	});
	// 将数据存储为 以 code 为 KEY 的 map 索引数据列
	var map = {};
	data.forEach(function(item) {
		map[item[code]] = item;
	});
	//console.log(map);
	var val = [];
	data.forEach(function(item) {
		// 以当前遍历项，的pcode,去map对象中找到索引的code
		var parent = map[item[pcode]];
		// 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
		if (parent) {
			(parent.children || (parent.children = [])).push(item);
		} else {
			//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			val.push(item);
		}
	});
	// console.log(val);
	return val;
}

//文字转化
export function setSType(value) {
	switch (value.toLowerCase()) {
		case "string":
			return "字符型C";
		case "int":
			return "整形I";
		case "long":
			return "数值型N";
		case "byte":
			return "备注型M";
		case "float":
			return "浮点型F";
		case "double":
			return "双精度型B";
		case "char":
			return "字符型C";
		case "boolean":
			return "逻辑型L";
		case "stream":
			return "通用型G";
		case "object":
			return "通用型G";
		default:
			return "字符型";
	}
}

/**
 * 获取用户信息
 * @type {function(): {}}
 */
export const getUserInfo = (() => {
	let userInfo = {}; // 缓存用户信息
	return () => {
		if (Object.keys(userInfo).length === 0) {
			try {
				userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			} catch (e) {
				console.warn("用户信息解析失败", e);
			}
		}
		return userInfo;
	};
})();

export const getAccount = () => {
	let account;
	try {
		account = JSON.parse(window.localStorage.getItem("accountToken"));
	} catch (e) {
		console.error("getAccount", e);
	}
	return account;
};

/**
 * 验证是否有权限
 * @param value String 权限
 * @returns {Boolean}
 */
export function checkPermission(value) {
	const permissions = store.state.permissions;
	const result = permissions.filter((item) => {
		if (value.includes(item.name)) {
			return item.value === "1";
		}
		return false;
	});
	return Boolean(result.length);
}

export function dict2Array(dict, isAll, type = String, filter) {
	const arr = isAll ? [{
		id: "",
		name: "全部"
	}] : [];

	for (const key in dict) {
		if (filter) {
			filter(key, dict[key]) && arr.push({
				id: type(key),
				name: dict[key]
			});
		} else {
			arr.push({
				id: type(key),
				name: dict[key]
			});
		}
	}
	return arr;
}

export function dict2options(dict, config = {}) {
	config = Object.assign({
			hasAll: false,
			filter: () => true,
		},
		config
	);
	const options = [];
	for (const key in dict) {
		if (key.indexOf("__") !== 0) {
			const value = dict.__keyConverter ? dict.__keyConverter(key) : key;
			const item = {
				key: value,
				value: value,
				label: dict[key],
			};
			if (config.filter(item)) {
				options.push(item);
			}
		}
	}
	if (config.hasAll) {
		options.unshift({
			key: "-1",
			value: "",
			label: "全部"
		});
	}
	return options;
}

export function order(orderArr, arr, key = "id") {
	return orderArr.map((o) => {
		return arr.find((item) => item[key] === o);
	});
}

export function deepObjectMerge(FirstOBJ, SecondOBJ) {
	// 深度合并对象
	for (const key in SecondOBJ) {
		FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ? deepObjectMerge(FirstOBJ[key],
			SecondOBJ[key]) : (FirstOBJ[key] = SecondOBJ[key]);
	}
	return FirstOBJ;
}

export function splitFileName(filename) {
	const fileNameArr = filename.split(".");
	const extensionName = fileNameArr[fileNameArr.length - 1];
	fileNameArr.pop();
	return [fileNameArr.join(""), extensionName];
}

export function isEmpty(val) {
	if (Array.isArray(val)) {
		return val.length === 0;
	}
	if (typeof val === "object") {
		if (val === null) return true;
		return Object.keys(val).length === 0;
	}

	return val === "" || val === undefined || val === null;
}

export function removeEmptyItem(obj) {
	const newObj = {};
	for (const key of Object.keys(obj)) {
		const value = obj[key];
		if (!isEmpty(value)) {
			newObj[key] = value;
		}
	}
	return newObj;
}

export function fileSize(file) {
	return file.size / 1024 / 1024;
}

export function downloadFile(url, filename) {
	const a = document.createElement("a");
	a.href = (window.gdosComplainFastdfsWeb.indexOf("http") != -1 ? window.gdosComplainFastdfsWeb : window.location
		.protocol + "//" + window.location.host + window.gdosComplainFastdfsWeb) + "/" + url;
	a.download = filename;
	document.body.appendChild(a);
	a.target = "_blank";
	a.click();
	window.URL.revokeObjectURL(url);
	a.parent.remove(a);
}

export function coverItemdetailDataToTree(data, hasAll) {
	const tree = hasAll ? [{
		id: "",
		name: "全部"
	}] : [];
	tree.push({
		id: data.id,
		name: data.name,
		label: data.name,
		sort: data.sort,
		itemDetailList: data.categoryList,
		children: data.categoryList,
	});
	return tree;
}

const defaultCoverTreeStructOptions = {};
export function coverTreeStruct(data, options = defaultCoverTreeStructOptions) {
	if (!Array.isArray(data)) {
		data = [data];
	}
	const loop = (rows) => {
		// TODO
	};
}

export function getCitiesByArea(areas, areaName) {
	for (const item of areas) {
		if (item.name === areaName) {
			return item.subList;
		}
	}
	return [];
}

export function postPortalsHeight(height, minHeight = 0) {
	const portalsEle = document.getElementById("portals");
	height = height ? height : portalsEle.clientHeight;
	height = height > minHeight ? height : minHeight;
	// debugger
	console.log("portals height：", height);
	window.parent.postMessage({
		type: "portals",
		message: {
			height
		}
	}, "*");
}

export function itemdetail2Tree(result) {
	return [{
			id: "",
			name: "全部",
		},
		{
			id: result.id || "1",
			name: result.name,
			sort: result.sort,
			itemDetailList: result.categoryList,
		},
	];
}

export function itemdetail2GroupOptions(result) {
	return result.categoryList.map((item) => {
		return {
			label: item.name,
			options: item.itemDetailList.map((item) => {
				return {
					...item,
					value: item.id,
					label: item.name,
				};
			}),
		};
	});
}

export function removeEmptyChildren(list) {
	for (const item of list) {
		if (item.children && item.children.length > 0) {
			removeEmptyChildren(item.children);
		} else {
			delete item.children;
		}
	}
}

export function department2Tree(result, hasAll = true) {
	removeEmptyChildren(result);
	if (hasAll) {
		result.unshift({
			code: "",
			name: "全部",
		});
	}
	return result;
}

export function getCMSUserInfo() {
	let userInfo;
	// userInfo = window.sessionStorage.getItem("cmsUserInfo")
	// try {
	// 	userInfo = JSON.parse(userInfo);
	// } catch (e) {
	// 	console.log("没有用户信息", e);
	// }
	// TEST 模拟userInfo
	userInfo = {
		buttonType: "",
		cmsAuthToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5MTQxMTUyNU1BM1hBOUFFWDAiLCJjcmVhdGVkIjoxNzQyOTUxMzEyMjExLCJ1c2VyU291cmNlIjoiYWRtaW4iLCJleHAiOjE3NDM4MTUzMTJ9.D-5sc63-2Ql_moZN1kiZo2EczHMScUl_D_TeL65GQdmM_7uR13cfABzMAIreV-ow1uOu1Rt-uePpso79Kr5_uA",
		cmsUserEmail: "18697731618@163.com",
		detailId: "",
		idNumber: "413026197012120638",
		socialCreditNumber: "91411525MA3XA9AEX0",
		url: "",
		userId: 5439,
		userName: "固始县方圆绿地食品有限责任公司",
		userType: 2
	}

	// userInfo = {
	// 	buttonType: '',
	// 	cmsAuthToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MTAxMDIxOTgzMDcyMjA2MTMiLCJjcmVhdGVkIjoxNjYzMTQyOTg5MTQ5LCJ1c2VyU291cmNlIjoiYWRtaW4iLCJleHAiOjE2NjQwMDY5ODl9.RxKL6aM3eSJEjuY3_tryj2nO-HHGYMvAUJvPDlNqtuYr2E5IY3t1u6QOO0xvt43N6Tbkglnztjig1tfd51kBaw',
	// 	cmsUserEmail: '1368600859@qq.com',
	// 	socialCreditNumber: '',
	// 	detailId: '',
	// 	idNumber: "610102198307220613",
	// 	url: '',
	// 	userId: 1457,
	// 	userName: '赵植',
	// 	userType: 1
	// }

	return userInfo || {};
}

export function menus2Tree(list) {
	const tree = [];
	for (const node1 of list) {
		if (node1.levels === 1) {
			node1.children = [];
			for (const node2 of list) {
				if (node1.id === node2.parentId) {
					node1.children.push(node2);
				}
			}
			tree.push(node1);
		}
	}
	return tree;
}

export function calcWorkOrderCountDownStatus(countDown, status) {
	if (status === 10) return 0;
	// 0.正常 1.即将过期 2过期(停止)
	if (countDown <= 0) return 2;
	if (
		// 待受理 小于 1 天
		(status === 0 && countDown < 86400000) ||
		// 待确认 回退中 小于 1 天
		((status === 2 || status === 1) && countDown < 86400000) ||
		// 调查中 小于 5 天
		(status === 3 && countDown < 432000000) ||
		// 待办结 小于 2 天
		(status === 4 && countDown < 172800000)
	) {
		return 1;
	}
	return 0;
}

//防抖
let timeout = null
export const vueDebounce = (fun, time = 500) => {
	if (timeout) {
		clearTimeout(timeout) // 规定时间内若定时器存在则清除
	}
	timeout = setTimeout(() => {
		fun() // 调用接口
	}, time);
}

// 节流
let flag = true
export const vueReduce = (fun, time = 500) => {
	if (flag) {
		setTimeout(() => {
			console.log('触发点击')
			fun() // 调用接口
			flag = true // 在定时器执行后 移除if阻断
		}, time);
	}
	flag = false // 在执行一次后 if阻断定时器继续执行
}

export function generateWorkOrderStatusArr(base, added) {
	const statusArr = base;
	for (const [condition, val] of added) {
		if (condition) {
			statusArr.push(val);
		}
	}

	const all = [];
	for (const item of statusArr) {
		all.push(item.id);
	}

	statusArr.unshift({
		id: all.join(","),
		name: "全部"
	});
	return statusArr;
}

export function mergeLeft(baseObj, targetObj) {
	const keys = Object.keys(baseObj);
	const newObj = {};
	for (const key of keys) {
		newObj[key] = targetObj[key];
	}
	return newObj;
}

export function deepGetItem(arr, cb) {
	const get = (arr) => {
		for (const item of arr) {
			if (!cb(item)) {
				if (item.children) {
					return get(item.children);
				}
			} else {
				return item;
			}
		}
	};
	console.log(get(arr), "get(arr)get(arr)");
	return get(arr) || {};
}

export function removeEmptyWithTree(tree,isStar = true) {
	const deep = (tree) => {
		const result = [];
		for (const item of tree) {
			if (!item) continue;
			let children;
			if (item.children && item.children.length) {
				children = deep(item.children);
			}
			if (item.is_leader_department && item.is_leader_department == true && isStar) {
				item.label = '* ' + item.name;
			} else {
				item.label = item.name;
			}

			item.value = item.deptCode;
			if (children) {
				item.children = children;
			}
			result.push(item);
		}
		return result;
	};
	return deep(tree);
}

export function flat(arr) {
	const flatArr = [];
	const recursion = (arr) => {
		for (const item of arr) {
			if (item) {
				item.label = item.name;
				item.value = item.deptCode;
				flatArr.push(item);
				if (item.children) {
					recursion(item.children);
				}
			}
		}
	};
	recursion(arr);
	return flatArr;
}

export function blobDataDownload(blob, filename = new Date().getTime()) {
	if (!blob.size) return Message.warning("暂时没有数据");
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.onload = (e) => {
		const a = document.createElement("a");
		a.download = filename;
		a.href = e.target.result;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
}

function removeArrayItem(array, callback) {
	const newArray = array.filter((item) => callback);
	return newArray;
}

export function findTreeItem(tree, callback, options = {
	childrenKey: "children"
}) {
	for (const item of tree) {
		if (callback(item)) return item

		if (item[options.childrenKey]) {
			const result = findTreeItem(item[options.childrenKey], callback, options)
			if (result) return result
		}
	}
	return null;
}

export function forEachTree(tree, callback, options = {
	childrenKey: "children"
}) {
	for (const item of tree) {
		callback(item)

		if (item[options.childrenKey]) {
			findTreeItem(item[options.childrenKey], callback, options)
		}
	}
	return tree
}

//正则手机验证
export function checkPhone(val) {
	var pattern =
		/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|16[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9]|19[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
	if (pattern.test(val)) {
		return true;
	}
	return false;
}

const allStatus = [{
	value: '0',
	label: "待受理",
}, {
	value: '0,2',
	label: "材料补正中",
}, {
	value: '1',
	label: "回退中",
}, {
	value: '2',
	label: "待确认",
}, {
	value: '3',
	label: "调查中",
}, {
	value: '3,3',
	label: "材料举证中",
}, {
	value: '3,7',
	label: "已中止",
}, {
	value: '4',
	label: "待办结",
}, {
	value: '5',
	label: '已办结'
}, {
	value: '6',
	label: '不受理'
}, {
	value: '7',
	label: "已中止",
}, {
	value: '8',
	label: '已终止'
}, {
	value: '9',
	label: "撤回中",
}, {
	value: '10',
	label: "已撤回",
}, {
	value: '11',
	label: '已移交'
}, {
	value: '13',
	label: '发起材料补正'
}, {
	value: '14',
	label: '放弃投诉举报'
}, {
	value: '15',
	label: "待终止",
}, {
	value: '16',
	label: "复核中",
}, {
	value: '17',
	label: '修正中'
}, {
	value: '21',
	label: "待派发",
}, ]


export function returnMainStatus(status) {
	let str = ''
	let a = allStatus.find(item => item.value == status)
	str = a.label
	return str;
}

export function returnAssistantStatus(status, subStatus) {
	let str = ''
	if (status == '0' && subStatus == '2') {
		str = '材料补正中'
	}
	if (status == '3' && subStatus == '3') {
		str = '材料举证中'
	}
	if (status == '3' && subStatus == '7') {
		str = '已中止'
	}
	return str;
}




export function returnStatus(status, subStatus) {
	let str = ''
	if (status == '0' && (subStatus == '' || subStatus == '0')) {
		str = '待受理'
	}
	if (status == '0' && subStatus == '2') {
		str = '材料补正中'
	}
	if (status == '3' && subStatus == '0') {
		str = '调查中'
	}
	if (status == '3' && subStatus == '3') {
		str = '材料举证中'
	}
	if (status == '3' && subStatus == '7') {
		str = '已中止'
	}
	if (status == '21' || status == '10' || status == '11' || status == '17' || status == '14' || status == '1' ||
		status == '9' || status == '16' || status == '2' ||
		status == '4' || status == '15' || status == '5' || status == '7' || status == '8' || status == '6' || status ==
		'13') {
		let a = allStatus.find(item => item.value == status)
		str = a.label
	}
	return str;
}
// 审批类型
export const splxDict = [{
	value: '',
	label: '全部'
}, {
	value: '10',
	label: '指定办理'
}, {
	value: '11',
	label: '转办'
}, {
	value: '12',
	label: '交办'
}, {
	value: '21',
	label: '退回修改或补正'
}, {
	value: '22',
	label: '放弃投诉举报'
}, {
	value: '23',
	label: '不受理复核'
}, {
	value: '24',
	label: '承办复核'
}, {
	value: '25',
	label: '申请终止'
}, {
	value: '26',
	label: '继续办理'
}, {
	value: '27',
	label: '待终止退回重办'
}, {
	value: '28',
	label: '待办结退回重办'
}, {
	value: '29',
	label: '预审确认'
}, {
	value: '30',
	label: '案件受理'
}, {
	value: '31',
	label: '确认退回'
}, {
	value: '32',
	label: '解除跟踪'
}, {
	value: '33',
	label: '解除异常'
}, {
	value: '34',
	label: '撤回投诉举报案件'
}, {
	value: '00',
	label: '申请延期'
}, {
	value: '01',
	label: '申请中止'
}, {
	value: '02',
	label: '确认终止'
}, {
	value: '03',
	label: '不受理'
}, {
	value: '04',
	label: '移交'
}, {
	value: '06',
	label: '确认办结'
}, {
	value: '07',
	label: '申请办结'
}, {
	value: '09',
	label: '直办'
}]

export function returnExamine(status) {
	let str = ''
	let a = splxDict.find(item => item.value == status)
	str = a.label
	return str;
}

export function todoStatus(status,subStatus) {
	let statusName = ''
	switch (status) {
		case 0:
			statusName = '待受理'
			break;
		case 1:
			statusName = '回退中'
			break;
		case 2:
			statusName = '待确认'
			break;
		case 3:
			statusName = '调查中'
			break;
		case 4:
			statusName = '待办结'
			break;
		case 5:
			statusName = '已办结'
			break;
		case 6:
			statusName = '不受理'
			break;
		case 7:
			statusName = '已中止'
			break;
		case 8:
			statusName = '已终止'
			break;
		case 9:
			statusName = '撤回中'
			break;
		case 10:
			statusName = '撤回'
			break;
		case 11:
			statusName = '已移交'
			break;
		case 12:
			statusName = '预审中'
			break;
		case 13:
			statusName = '已退回'
			break;
		case 14:
			statusName = '放弃投诉举报'
			break;
		case 15:
			statusName = '待终止'
			break;
		case 16:
			statusName = '复核中'
			break;
		case 17:
			statusName = '修正中'
			break;
		case 21:
			statusName = '待派发'
			break;
		default:
			break;
	}
	return statusName;
}

/* 计算两个日期间的时间差 */
export function timeDifference(start, end, type = 1) {
	let new_date; //新建一个日期对象，默认现在的时间
	if (start == '') {
		new_date = new Date();
	} else {
		new_date = new Date(start);
	}
	let old_date = new Date(end ? end : ''); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

	let difftime = (old_date - new_date) / 1000; //计算时间差,并把毫秒转换成秒
	

	let days = parseInt(difftime / 86400); // 天  24*60*60*1000 
	let hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数 
	let minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
	let seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数
	if (end == '') {
		return false
	} else {
		if (type == 1) {
			if (hours > 0) {
				return {
					days: days,
					hours: hours
				}
			} else {
				return {
					days: 0,
					hours: 0
				}
			}
		}
		if (type == 2) {
			return {
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			}
		}

	}

}

export function filterTimer(time, status, type) {
	let obj = timeDifference('', time)
	if (type == 1) {
		if (status == '0' || status == '2' || status == '4' || status == '15' || status == '21') { //待办
			if (obj.days >= 1) {
				return '#666'
			} else if (obj.hours > 0) {
				return '#e2a900'
			} else {
				return '#e44831'
			}
		}

		if (status == '3') { //调查中
			if (obj.days >= 3) {
				return '#666'
			} else if (obj.days > 0 || obj.hours > 0) {
				return '#e2a900'
			} else {
				return '#e44831'
			}
		}
		return '#666'
	}
	if (type == 2) {
		if (status == '0' || status == '2' || status == '4' || status == '15' || status == '21') { //待办
			if (obj.days >= 1) {
				return ''
			} else if (obj.hours > 0) {
				return require('@/assets/images/icon-light-yellow.png')
			} else {
				return require('@/assets/images/icon-light-red.png')
			}
		}

		if (status == '3') { //调查中
			if (obj.days >= 3) {
				return ''
			} else if (obj.days > 0 || obj.hours > 0) {
				return require('@/assets/images/icon-light-yellow.png')
			} else {
				return require('@/assets/images/icon-light-red.png')
			}
		}
		return ''
	}
}

/* 计算两个日期间的时间差 */
export function timeDifferenceList(start, end) {
	let new_date; //新建一个日期对象，默认现在的时间
	if (start == '') {
		new_date = new Date();
	} else {
		new_date = new Date(start);
	}
	let old_date = new Date(end ? end : ''); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

	let difftime = (old_date - new_date) / 1000; //计算时间差,并把毫秒转换成秒

	let days = parseInt(difftime / 86400); // 天  24*60*60*1000 
	let hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数 
	let minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
	let seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数

	if (days <= 0 && hours > 0) {
		return 1
	}
	if (days > 0) {
		return days
	}
	if (days <= 0 && hours <= 0) {
		return 0
	}
}

// 获取到期时间
export function getEndeTime(targetDate) {
	const now = new Date().getTime();
	// 解析截止日期时间戳
	const old = new Date(targetDate).getTime()
	const distance = old - now;
	let times = ''
	// 结束倒计时
	if (distance > 0) {
		const days = Math.floor(distance / (24 * 60 * 60 * 1000));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if (days >= 1) {
			return days + '天' + hours + '小时'
		} else {
			if (hours >= 1) {
				return hours + '小时' + minutes + '分种'
			} else {
				return minutes + '分种' + remainingSeconds + '秒'
			}
		
		}
	}
	return times
}

/* 秒转时分 */
export function secondsTransform(totalSeconds) {
	if (totalSeconds == '') {
		return ''
	}
	const days = Math.floor(totalSeconds / (24 * 3600));
	const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
	const minutes = Math.floor(((totalSeconds % (24 * 3600)) % 3600) / 60);
	const remainingSeconds = ((totalSeconds % (24 * 3600)) % 3600) % 60;
	if (days >= 1) {
		return days + '天' + hours + '时'
	} else {
		if (hours >= 1) {
			return hours + '时' + minutes + '分'
		} else {
			return minutes + '分' + remainingSeconds + '秒'
		}

	}
	return ''

}
export function fileSuffix(flag) {
	let suffix = flag.toLowerCase()
	if (suffix == '.bmp' || suffix == 'bmp') {
		return 'BMP.png'
	}
	if (suffix == '.csv' || suffix == 'csv') {
		return 'CSV.png'
	}
	if (suffix == '.doc' || suffix == 'doc') {
		return 'DOC.png'
	}
	if (suffix == '.docx' || suffix == 'docx') {
		return 'DOCX.png'
	}
	if (suffix == '.dps' || suffix == 'dps') {
		return 'DPS.png'
	}
	if (suffix == '.dpt' || suffix == 'dpt') {
		return 'DPT.png'
	}
	if (suffix == '.et' || suffix == 'et') {
		return 'ET.png'
	}
	if (suffix == '.ett' || suffix == 'ett') {
		return 'ETT.png'
	}
	if (suffix == '.excel' || suffix == 'excel') {
		return 'EXCEL.png'
	}
	if (suffix == '.flv' || suffix == 'flv') {
		return 'FLV.png'
	}
	if (suffix == '.gif' || suffix == 'gif') {
		return 'GIF.png'
	}
	if (suffix == '.image' || suffix == 'image') {
		return 'JPG.png'
	}
	if (suffix == '.mp4' || suffix == 'mp4') {
		return 'MP4.png'
	}
	if (suffix == '.other' || suffix == 'other') {
		return 'OTHER.png'
	}
	if (suffix == '.pdf' || suffix == 'pdf') {
		return 'PDF.png'
	}
	if (suffix == '.png' || suffix == 'png') {
		return 'PNG.png'
	}
	if (suffix == '.ppt' || suffix == 'ppt') {
		return 'PPT.png'
	}
	if (suffix == '.pptx' || suffix == 'pptx') {
		return 'PPTX.png'
	}
	if (suffix == '.svg' || suffix == 'svg') {
		return 'SVG.png'
	}
	if (suffix == '.tif' || suffix == 'tif') {
		return 'TIF.png'
	}
	if (suffix == '.txt' || suffix == 'txt') {
		return 'TXT.png'
	}
	if (suffix == '.word' || suffix == 'word') {
		return 'word.png'
	}
	if (suffix == '.wps' || suffix == 'wps') {
		return 'WPS.png'
	}
	if (suffix == '.wpt' || suffix == 'wpt') {
		return 'WPT.png'
	}
	if (suffix == '.wt' || suffix == 'wt') {
		return 'WT.png'
	}
	if (suffix == '.xls' || suffix == 'xls') {
		return 'XLS.png'
	}
	if (suffix == '.xlsx' || suffix == 'xlsx') {
		return 'XLSX.png'
	}
	if (suffix == '.xml' || suffix == 'xml') {
		return 'XML.png'
	}
	return 'PDF.png'
}

export function checkProv(val) {
	var pattern = /^[1-9][0-9]/;
	var provs = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门"
	};
	if (pattern.test(val)) {
		if (provs[val]) {
			return true;
		}
	}
	return false;
}
export function checkDate(val) {
	var pattern =
		/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	if (pattern.test(val)) {
		var year = val.substring(0, 4);
		var month = val.substring(10, 12);
		var date = val.substring(12, 14);
		var date2 = new Date(year + "-" + month + "-" + date);
		if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
			return true;
		}
	}
	return false;
}
//校验位的检测
export function checkParity(val) {
	var len = val.length;
	if (len == '18') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i, valnum;
		for (i = 0; i < 17; i++) {
			cardTemp += val.substr(i, 1) * arrInt[i];
		}
		valnum = arrCh[cardTemp % 11];
		if (valnum == val.substr(17, 1)) {
			return true;
		}
		return false;
	}
	return false;
}
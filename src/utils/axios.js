import axios from "axios";
import {
	Message
} from "element-ui";
import router from "@/router/index";
import Vue from "vue";
import baseUrl from "./env";
import store from "@/store";
import {
	tansParams
} from '@/utils/common'

const v = new Vue();
const qs = require("qs");

const codeMessage = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};

var instance = axios.create({
	// baseURL: baseUrl.gdosComplainServer,
	baseURL: '/dev-api',
	timeout: 180000,
	paramsSerializer: function(params) {
		return qs.stringify(params, {
			arrayFormat: "repeat"
		});
	},
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		if (localStorage.getItem("accountToken")) {
			const tokenData = JSON.parse(localStorage.getItem("accountToken"));
			Object.assign(config.headers, {
				accessToken: tokenData.accessToken,
				accountId: tokenData.accountId,
			});
		}
		return config;
	},
	(error) => {
		// Do something with request error
		console.log(error); // for debug
		Promise.reject(error);
	}
);
// respone拦截器
instance.interceptors.response.use(
	(response) => {
		const hash = window.location.hash;
		if (response.config.responseType === "blob") return response;
		// 校验Http状态码
		const status = response.status;
		if (status === 200) {
			// 判断是否二进制数据直接返回
			const res = response.data;
			if (Number(res.code) == 110123 || Number(res.code) === 200) return res;
			if (Number(res.code) !== 0) {
				const msg = res.msg || res.message;
				Message({
					message: msg,
					type: "error",
					offset: 300
				});
				if ([521, 755, 701, 518].includes(res.code) && hash.indexOf("/portals") < 0 && hash.indexOf(
						"/wap") < 0) {
					if (response.config.url === "/api/v1/user/checkPassWord" || response.config.url.includes(
							'/auth/login')) {
						// 修改密码错误接口会返回701, 不跳转到登录
					} else {
						store.dispatch('LogOut').then(() => {
							location.reload(true)
						})
					}
				}
				throw new Error(msg);
			}

			/**
			 * 部分接口返回code和message，需要自行判断结果
			 */
			if (res.msg === "token不能为空") {
				Message({
					message: res.errorMsg || res.message || res.msg || "网络超时",
					type: "error",
					offset: 300
				});
			}
			return res;
		} else {
			Message({
				message: status + response.statusText,
				type: "error",
				offset: 300,
				duration: 5 * 1000,
			});
			return Promise.reject('error')
		}
	},
	(error) => {
		console.log("error", error);
		if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
			// 请求超时提示
			Message({
				message: "网络或服务器繁忙，请稍后再试",
				type: "error",
				offset: 300,
				duration: 5 * 1000,
			});
		} else {
			const {
				response: {
					status,
					statusText,
					data: {
						code,
						msg = "网络超时"
					},
				},
			} = error;
			const text = msg || codeMessage[status] || statusText;
			Message({
				message: `${code || status}：${text}`,
				type: "error",
				offset: 300
			});
		}
		return Promise.reject(error);
	}
);
export default instance;
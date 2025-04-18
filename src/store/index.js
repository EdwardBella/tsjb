import Vue from "vue";
import Vuex from "vuex";
import * as menuAPI from "@/api/menu";
import * as configureAPI from "@/api/configure";
import {
	checkPermission,
	menus2Tree
} from "@/utils/common";
import * as authAPI from "@/api/auth";
import * as userRoleRelationAPI from "@/api/userRoleRelation";
// import generateRoutes from './generateRoutes'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		resverOffice: "", //设置数据服务挂接同步的初始页的值
		userInfo: null, //用户信息
		userRoles: {
			isTopAuthority: false, // 是否省级主管部门
			isTop: false, // 省级部门,
			isLeaderDepartment: false, //是否省级主管部门
		},
		hasUnreadRelay: false, //数据申请管理->未读消息
		menuTree: [],
		permissionsLoading: false,
		permissions: [],
		statistics: {
			selectArea: "",
		},
		commentError: {},
	},
	mutations: {
		setResverOffice(state, val) {
			state.resverOffice = val;
		},
		setHasUnreadRelay(state, val) {
			state.hasUnreadRelay = val;
		},
		setMenuTree(state, menuTree) {
			state.menuTree = menuTree;
		},
		setPermissions(state, permissions) {
			state.permissions = permissions;
		},
		setPermissionsLoading(state, loading) {
			state.permissionsLoading = loading;
		},
		setCommentError(state, error) {
			state.commentError = error;
		},
		setStatistics(state, data) {
			state.statistics = {
				...state.statistics,
				...data
			};
		},
		setUserInfo(state, data) {
			state.userInfo = data;
		},
		setUserRoles(state, data) {
			state.userRoles = Object.assign({}, state.userRoles, data);
		},
	},
	actions: {
		setResverOffice(context, val) {
			context.commit("setResverOffice", val);
		},
		setHasUnreadRelay(context, val) {
			context.commit("setHasUnreadRelay", val);
		},
		fetchMenuTree({
			commit
		}, val) {
			return new Promise(resolve => {
				// 向后端请求路由数据
				menuAPI.tree().then(res => {
					const list = res.result
					const tree = []
					for (let i = 0; i < list.length; i++) {
						if (list[i].menuVOS.length > 0) {
							list[i].children = []
							for (let j = 0; j < list[i].menuVOS.length; j++) {
								if (list[i].menuId === list[i].menuVOS[j].pid) {
									list[i].children.push(list[i].menuVOS[j])
								}
							}
							if (list[i].children.length === 0) delete list[i].children
							tree.push(list[i])
						} else {
							tree.push(list[i])
						}
					}
					commit("setMenuTree", tree);
					resolve(tree)
				})
			})
		},
		// 获取用户信息
		GetInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				authAPI.getuserinfo().then(res => {
					const user = res.result.data
					commit('setUserInfo', user)
					resolve(user)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 退出系统
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				authAPI.loginout().then(() => {
					commit('setUserInfo', null)
					localStorage.clear()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		setPermissionsLoading({
			commit
		}, val) {
			commit("setPermissionsLoading", val);
		},
		fetchUserPermissions({
			commit
		}) {
			return configureAPI.list().then((res) => {
				commit("setPermissions", res.result);
			});
		},
		fetchUserRoles({
			commit
		}) {
			authAPI.isTopAuthority().then((r) => {
				commit("setUserRoles", {
					isTopAuthority: r.result
				});
			});
			authAPI.isTop().then((r) => {
				commit("setUserRoles", {
					isTop: r.result
				});
			});
			userRoleRelationAPI.checkLeaderDepartment().then(r => {
				commit("setUserRoles", {
					isLeaderDepartment: r.result
				});
			});
		},
	},
	modules: {
		// generateRoutes
	},
});
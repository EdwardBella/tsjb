import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
		path: "/welcome",
		name: "welcome",
		component: () => import("@/views/layout/welcome"),
	},
	{
		path: "/",
		redirect: "login",
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login')
	},

	{
		path: "/index",
		name: "index",
		component: () => import("@/views/layout/layout"),
		children: [{
				path: '/home',
				name: '首页',
				component: () => import('@/views/home/home')
			},
			{
				path: '/approve',
				name: '审批中心',
				component: () => import('@/views/approve/index'),
				children:[{
					path: 'approve',
					name: '审批中心',
					component: () => import('@/views/approve/approve')
				}]
			},
			{
				path: '/workOrderManage',
				name: '案件管理',
				component: () => import('@/views/workOrderManage/index'),
				children: [{
						path: 'all',
						name: '案件管理',
						component: () => import('@/views/workOrderManage/all')
					},
				]
			},
			{
				path: '/appraiseCenter',
				name: '评价中心',
				component: () => import('@/views/appraiseCenter/index'),
				children: [{
						path: 'appraise',
						name: '评价中心',
						component: () => import('@/views/appraiseCenter/appraise')
					},
				]
			},
			{
				path: '/workOrder',
				name: '案件查办',
				component: () => import('@/views/workOrder/index'),
				children: [
					{
						path: 'accepted',
						name: '受理阶段',
						component: () => import('@/views/workOrder/accepted')
					},
					{
						path: 'process',
						name: '查办阶段',
						component: () => import('@/views/workOrder/process')
					},
					{
						path: 'finished',
						name: '结案阶段',
						component: () => import('@/views/workOrder/finished')
					},
				]
			},
			
			{
				path: '/system',
				name: '系统管理',
				component: () => import('@/views/system/index'),
				children: [{
						path: "menuManage",
						name: "菜单管理",
						component: () => import("@/views/system/menuManage"),
					},
					{
						path: "userManage",
						name: "用户管理",
						component: () => import("@/views/system/userManage"),
					},
					{
						path: "userInfoManage",
						name: "个人信息",
						component: () => import("@/views/system/userInfoManage"),
					},
					{
						path: "pageInfoManage",
						name: "页面信息管理",
						component: () => import("@/views/system/pageInfoManage"),
					},
					{
						path: 'dict',
						name: '数据字典',
						component: () => import('@/views/system/dict')
					},
					{
						path: 'template',
						name: '回复模板',
						component: () => import('@/views/system/template')
					},
					{
						path: 'organization',
						name: '组织机构',
						component: () => import('@/views/system/organization')
					},
					{
						path: 'administrativeDivision',
						name: '行政区划',
						component: () => import('@/views/system/administrativeDivision')
					},
					{
						path: 'role',
						name: '角色管理',
						component: () => import('@/views/system/role')
					},
					{
						path: 'configure',
						name: '全局配置项管理',
						component: () => import('@/views/system/configure')
					},
					{
						path: 'departmentConfigure',
						name: '部门配置',
						component: () => import('@/views/system/departmentConfigure')
					},
					{
						path: 'vocation',
						name: '行业领域',
						component: () => import('@/views/system/vocation.vue')
					},
					{
						path: 'message',
						name: '短信日志',
						component: () => import('@/views/system/message.vue')
					}
				]
			},

			{
				path: '/download',
				name: '下载中心',
				component: () => import('@/views/download/index'),
				children: [{
					path: 'download',
					name: '下载中心',
					component: () => import('@/views/download/download')
				}]
			},
			{
				path: '/statistics',
				name: '分析中心',
				component: () => import('@/views/statistics/index'),
				children: [{
						path: 'statistics',
						name: '',
						component: () => import('@/views/statistics/statistics/index'),
						children: [{
								path: 'home',
								name: '数据统计',
								component: () => import('@/views/statistics/statistics/home')
							},
							{
								path: 'details',
								name: '统计详情',
								component: () => import('@/views/statistics/statistics/details/index')
							}
						]
					},
					{
						path: 'statisticsDetails',
						name: '统计详情2',

					},
				]
			},
			{
				path: '/matters',
				name: '事项管理',
				component: () => import('@/views/matters/index'),
				children: [{
					path: 'matters',
					name: '事项管理',
					component: () => import('@/views/matters/matters')
				}]
			},
			{
				path: '/user',
				name: '用户管理2',
				component: () => import('@/views/user/index'),
				children: [{
						path: 'enterprise',
						name: '企业用户',
						component: () => import('@/views/user/enterprise')
					},
					{
						path: 'individual',
						name: '个人用户',
						component: () => import('@/views/user/individual')
					}
				]
			},
			{
				path: '/todo',
				name: '待办事项',
				component: () => import('@/views/todo/todo'),
				children: [{
					path: 'todo',
					name: '待办事项',
					component: () => import('@/views/todo/todo')
				}]
			},
			{
				path: '/404',
				name: '404',
				component: () => import('@/views/404')
			},
			{
				path: '/noPermission',
				name: '没有权限',
				component: () => import('@/views/noPermission')
			}
		]
	},
	{
		path: "/portals",
		name: "portals",
		component: () => import("@/views/layout/portals"),
		children: [{
				path: "index",
				name: "投诉举报",
				component: () => import("@/views/portals/index"),
			},
			{
				path: "createStep1",
				name: "创建投诉举报第一步",
				component: () => import("@/views/portals/createStep1"),
			},
			{
				path: "createStep2",
				name: "创建投诉举报第二步",
				component: () => import("@/views/portals/createStep2"),
			},
			{
				path: "authentication",
				name: "认证",
				component: () => import("@/views/portals/authentication"),
			},
			{
				path: "details",
				name: "投诉举报详情",
				component: () => import("@/views/portals/my/details"),
			},
			{
				path: "list",
				name: "投诉举报列表",
				component: () => import("@/views/portals/my/list"),
			},

			{
				path: 'my',
				name: '我的',
				component: () => import("@/views/portals/my/index"),
				children: [{
						path: "info/:type",
						name: "我的信息",
						component: () => import("@/views/portals/my/info"),
					},
					{
						path: "modifyPhoneNumber",
						name: "修改手机号码",
						component: () => import("@/views/portals/my/modifyPhoneNumber"),
					},
					{
						path: "list",
						name: "我的投诉举报列表",
						component: () => import("@/views/portals/my/list"),
					},
					{
						path: "details",
						name: "我的投诉举报详情",
						component: () => import("@/views/portals/my/details"),
					},
					{
						path: "replenish",
						name: "上传补充材料",
						component: () => import("@/views/portals/my/replenish"),
					},
				]
			},
			{
				path: "/404",
				name: "404",
				component: () => import("@/views/404"),
			},
		],
	},
	{
		path: "/wap",
		name: "wap",
		component: () => import("@/views/layout/wap"),
		children: [{
				path: "index",
				name: "投诉举报",
				component: () => import("@/views/wap/index"),
			},
			{
				path: "guide",
				name: "投诉指南",
				component: () => import("@/views/wap/guide"),
			},
			{
				path: "list",
				name: "公开信息",
				component: () => import("@/views/wap/list"),
			},
			{
				path: "details",
				name: "公开信息详情",
				component: () => import("@/views/wap/details"),
			},
			{
				path: "createStep1",
				name: "创建案件第一步",
				component: () => import("@/views/wap/createStep1"),
			},
			{
				path: "createStep2",
				name: "创建案件第二步",
				component: () => import("@/views/wap/createStep2"),
			},
			{
				path: "success",
				name: "创建成功",
				component: () => import("@/views/wap/success"),
			},
			{
				path: 'my',
				name: '我的',
				component: () => import("@/views/wap/my/index"),
				children: [{
						path: "list",
						name: "我的投诉举报列表",
						component: () => import("@/views/wap/my/list"),
					},
					{
						path: "details",
						name: "我的投诉举报详情",
						component: () => import("@/views/wap/my/details"),
					},
					{
						path: "replenish",
						name: "上传补充材料",
						component: () => import("@/views/wap/my/replenish"),
					},
				]
			},
		]
	}
];

const router = new VueRouter({
	scrollBehavior: () => ({
		x: 0,
		y: 0
	}),
	routes,
});

export default router;
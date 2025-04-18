import router from './router'
import store from './store'
import {
	Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	getToken
} from '@/utils/auth'

NProgress.configure({
	showSpinner: false
})

const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/portals/createStep1', '/portals/createStep2',
	'/portals/my/list', '/portals/details'
]
// /* 路由首位配置 */
// let pathList = [];
// let getRoutes = router.options.routes;

// function getAllPath(router, arr) {
//   router.forEach(item => {
//     if (item.name && arr.indexOf(item.name) == -1) {
//       arr.push(item.name);
//     }
//     if (item.children && item.children.length > 0) {
//       getAllPath(item.children, arr);
//     }
//   });
// }
// getAllPath(getRoutes, pathList);

router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		// to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
		/* has token*/
		if (to.path === '/login') {
			next({
				path: "/todo"
			})
			NProgress.done()
		} else {
			if (store.state.userInfo == null || store.state.userInfo.ruleId === '') {
				// 判断当前用户是否已拉取完user_info信息
				store.dispatch('GetInfo').then(() => {
					store.dispatch('fetchMenuTree').then(accessRoutes => {
						// 根据roles权限生成可访问的路由表
						// router.addRoutes(accessRoutes) // 动态添加可访问路由表
						if (accessRoutes.length == 0) {
							next({
								path: "/noPermission"
							});
						} else {
							next({
								...to,
								replace: true
							}) // hack方法 确保addRoutes已完成
						}

					})
				}).catch(err => {
					store.dispatch('LogOut').then(() => {
						Message.error(err)
						next({
							path: '/login'
						})
					})
				})
			} else {
				next()
			}
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
			NProgress.done()
		}
	}
	// next()

})

router.afterEach(() => {
	NProgress.done()
})
<template>
	<el-container class="layout">
		<el-aside :width="isFold ? '0' : '240px'">
			<div class="leftContent">
				<div class="logo">
					<p class="logoText">投诉举报管理系统</p>
				</div>
				<leftMenu />
			</div>
		</el-aside>
		<div @click="isFold = !isFold" class="pin fold-btn" :style="foldBtnStyle">
			<i :class="isFold ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
		</div>
		<el-container class="mainContent">
			<el-header class="header" height="60px">
				<div class="breadcrumb">
					<el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
						<template v-for="(item, index) in breadcrumbList">
							<el-breadcrumb-item v-if="item.name" :key="item.path"
								:class="{ 'color-primary': (index === breadcrumbList.length - 1) }">{{ item.name }}
							</el-breadcrumb-item>
						</template>
					</el-breadcrumb>
				</div>
				<div class="right">
					<div class="notice">
						<div class="todo" @click="jumpTodo">
							<!-- <i class="el-icon-s-order"></i> -->
							待办
							({{messageNum.numberOfPendingTasks}})
						</div>
						<div class="message" @click="showMessage()">
							<!-- <i class="el-icon-message-solid"></i> -->
							消息
							({{messageNum.numberOfUnreadNotifications}})
						</div>
					</div>
					<div class="user">
						<div class="info">
							<p>欢迎您，{{ UserInfo.accountName }}</p>
							<p>{{ UserInfo.orgName }}</p>
						</div>
						<el-dropdown trigger="click">
							<img class="avatar" :src="UserInfo.imgURL" alt="">
							<el-dropdown-menu slot="dropdown" class="content">
								<el-dropdown-item
									@click.native="$router.push('/system/userInfoManage')">个人中心</el-dropdown-item>
								<el-dropdown-item v-if="isShowLoginout"
									@click.native="loginout()">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</el-header>
			<el-main class="beautify-scroll" style="padding: 20px 10px 90px 20px;">
				<div v-if="permissionsLoading === false" class="content">
					<router-view />
				</div>
				<globalHelp></globalHelp>
			</el-main>
			<drawer :visible="messageDrawer.visible" :isShowClose="false" title="通知中心">
				<div>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane :label="item.label" :name="item.name" v-for="item in tabs" :key="item.label">

							<el-table :highlight-current-row="false" :show-header="false" :data="notificationList.data"
								style="width: 100%">
								<el-table-column prop="date" label="日期">
									<template slot-scope="{row}">
										<div @click="getMessageReadFun(row.id)">
											<div class="messageTitle">
												<span class="desc">[{{row.classification}}] </span>
												<span
													:class="row.readingStatus == 0 ? 'unreadTitle' : 'readTitle'">{{row.title}}</span>
											</div>
											<div class="meta">
												<span
													:class="row.readingStatus == 0 ? 'unreadStatus' : 'readStatus'">{{row.readingStatus == 0 ? '未读' : '已读'}}</span>
												<span class="type">{{row.notificationType}}</span>
												<span class="time">{{row.createTime}}</span>
											</div>
										</div>
									</template>
								</el-table-column>
							</el-table>
							<div
								style="width: 100%;padding: 15px;display: flex;align-items: center;justify-content: center;">
								<el-button class="closeBut" plain @click="messageDrawer.visible = false">关闭</el-button>
							</div>


							<!-- <pagination v-if="notificationList.total > 0" :total="notificationList.total"
								:page.sync="notificationList.pageNum" :pageSize="notificationList.pageSize"
								@pageChange="getNotificationListFun" /> -->
						</el-tab-pane>
						<!-- <el-tab-pane label="已读" name="second"></el-tab-pane>
            <el-tab-pane label="未读" name="third"></el-tab-pane> -->
					</el-tabs>

				</div>

			</drawer>
		</el-container>
	</el-container>
</template>

<script>
	import tablePage from "@/components/tablePage/index.vue";
	import tableColumnsCommon from "@/views/workOrder/components/tableColumnsCommon";
	import pagination from "@/components/pagination.vue";
	import {
		mapActions,
		mapState
	} from 'vuex'
	import leftMenu from '@/components/leftMenu'
	import globalHelp from "@/components/globalHelp";
	import {
		getuserinfo,
		loginout,
		getNum,
		getNotificationList,
		getMessageRead
	} from '@/api/auth'
	import * as commonAPI from '@/api/common'
	import baseUrl from '@/utils/env'
	import {
		getAccount
	} from '@/utils/common'
	import drawer from '@/components/drawer.vue'

	export default {
		name: 'layout',
		components: {
			leftMenu,
			globalHelp,
			drawer,
			pagination
		},
		data() {
			return {
				tabs: [{
					label: '全部',
					name: 'first'
				}, {
					label: '已读',
					name: 'second'
				}, {
					label: '未读',
					name: 'third'
				}],
				isFold: false,
				breadcrumbList: [],
				UserInfo: {
					accountName: '',
					orgName: '',
					imgURL: ''
				},
				loopRunning: true,
				isShowLoginout: localStorage.getItem("source") == 'welcome' ? false : true,
				messageDrawer: {
					visible: false,
				},
				messageNum: {},
				notificationList: {
					data: [],
					total: 0,
					pageNum: 1,
					pageSize: 10,
					status: 0, //0-未读，1-已读
				},
				activeName: 'first',
				timer: null
			}
		},
		computed: {
			...mapState(['permissionsLoading', 'userInfo']),
			foldBtnStyle() {
				if (this.isFold) {
					return `width: 40px; color: #000; border-top-right-radius: 4px; border-bottom-right-radius: 4px;`
				}
			}
		},
		watch: {
			$route: function(newVal) {
				let breadList = newVal.matched.filter((v, i) => i > 0)
				console.log(this.breadcrumbList, '________________________&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
				if(breadList.length == 1){
					this.breadcrumbList = breadList
				}
				if(breadList.length == 2){
					if (breadList[0].name == breadList[1].name) {
						this.breadcrumbList = [breadList[0]]
					} else {
						this.breadcrumbList = breadList
					}
				}
				
			},
		},

		created() {
			this.UserInfo.accountName = this.userInfo.name
			this.UserInfo.orgName = this.userInfo.orgName
			this.UserInfo.imgURL = baseUrl.appManagerImgUrl + this.userInfo.imgURL
			this.UserInfo.orgCode = this.userInfo.orgCode
			this.getNumFun()
			this.setPermissionsLoading(true)
			this.fetchUserPermissions()
				.then(() => {
					this.setPermissionsLoading(false)
				})
			this.fetchUserRoles()
			this.loop()


		},
		mounted() {
			this.getRouter()
		},
		beforeDestroy() {
			this.loopRunning = false
		},
		destroyed() {
			clearInterval(this.timer)
		},
		methods: {
			...mapActions(['fetchUserPermissions', 'setPermissionsLoading', 'fetchUserRoles']),
			loop(ms = 1000 * 30) {
				if (this.loopRunning === false) return
				const account = getAccount()
				if (account && account.accountId && account.accessToken && this.$route.path !== '/login') {
					commonAPI.accessDataOs({
							accountId: account.accountId,
							accessToken: account.accessToken
						})
						.catch(() => {
							window.localStorage.removeItem("accountToken")
							this.$router.replace('/login')
						})
						.finally(() => {
							setTimeout(this.loop, ms)
						})
				} else {
					setTimeout(this.loop, ms)
				}
			},
			getRouter() {
				let breadList = this.$route.matched.filter((v, i) => i > 0);
				if(breadList.length == 1){
					this.breadcrumbList = breadList
				}
				if(breadList.length == 2){
					if (breadList[0].name == breadList[1].name) {
						this.breadcrumbList = [breadList[0]]
					} else {
						this.breadcrumbList = breadList
					}
				}
				
			},
			loginout() {
				this.$store.dispatch("LogOut").then(() => {
					this.$router.push('/login')
				});
			},
			jumpTodo() {
				if (!this.$route.path.includes('/todo/todo')) {
					this.$router.push('/todo/todo')
				}
			},
			getNumFun() {
				getNum().then((res) => {
					const {
						code,
						result,
						msg
					} = res
					if (code == 0) {
						this.messageNum = result
					} else {
						this.$modal.msgError(msg)
					}
				})
				this.timer = setInterval(() => {
					getNum().then((res) => {
						const {
							code,
							result,
							msg
						} = res
						if (code == 0) {
							this.messageNum = result
						} else {
							this.$modal.msgError(msg)
						}
					})
				}, 60000)

			},
			showMessage() {
				this.messageDrawer.visible = true
				this.getNotificationListFun()
			},
			getNotificationListFun() {
				getNotificationList({
					pageNum: this.notificationList.pageNum,
					pageSize: this.notificationList.pageSize,
					status: this.activeName == 'first' ? '' : (this.activeName == 'second' ? 1 : 0), //0-未读，1-已读
				}).then((res) => {
					const {
						code,
						result,
						msg
					} = res
					if (code == 0) {
						this.notificationList.data = result.records
						this.notificationList.total = Number(result.total)
					} else {
						this.$modal.msgError(msg)
					}
				})
			},
			handleClick(tab, event) {
				console.log(tab, 'tab----')
				this.notificationList.pageNum = 1
				this.getNotificationListFun()
				// }else if(tab == 'second'){
				//   this.getNotificationListFun(0)
				// }else if(tab == 'third'){
				//   this.getNotificationListFun(1)
				// }
			},
			getMessageReadFun(id) {
				getMessageRead({
					id: id
				}).then((res) => {
					const {
						code,
						result,
						msg
					} = res
					if (code == 0) {
						this.getNotificationListFun()
					} else {
						this.$modal.msgError(msg)
					}
				})
			}
		},
	};
</script>

<style scoped lang="less">
	::v-deep .el-breadcrumb {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		font-size: 20px;
		font-weight: 600 !important;
		line-height: 22px;
	}

	.closeBut {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		height: 40px;
		min-width: 150px;
		line-height: 40px;
		font-weight: 600;
	}

	::v-deep .el-breadcrumb__inner {
		font-weight: 600 !important;
	}

	.layout {
		height: 100vh;
		width: 100%;

		.leftContent {
			box-sizing: border-box;
			padding-bottom: 50px;
			//overflow: auto;
			height: 100%;
			// background: linear-gradient(137deg,#0a65da 6%, #094dc4 93%);
			background-color: #2b65da;

			.logo {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				height: 60px;
				user-select: none;
				background-color: #fff;

				.logoText {
					color: @color-primary;
					line-height: 60px;
					font-size: 22px;
					font-weight: 600;
					letter-spacing: 1px;
				}
			}
		}

		.el-menu {
			height: 100%;

			a {
				color: #fff;
			}
		}

		.mainContent {
			background: #f8f8fb;
			height: 100vh;
			overflow: hidden;

			.el-header {
				height: 60px;
				position: relative;
			}

			.header {
				box-shadow: 0 1px 4px 0 rgba(9, 78, 197, 0.1);
			}


		}

		.breadcrumb {
			// background:#0A65DA;
			// color:#fff;
			height: 48px;
			line-height: 48px;

			/deep/ .el-breadcrumb {
				line-height: 48px;

				span {
					// color:#fff;
				}
			}
		}

		.content {
			// padding: 15px;
			// background: #ffffff;
			// border-radius: 2px;
			// box-shadow: 0px 2px 11px 0px #a1a1a133;
		}

		.pin.fold-btn {
			position: fixed;
			bottom: 0;
			width: 240px;
			text-align: center;
			left: 0;
			height: 50px;
			line-height: 50px;
			font-size: 20px;
			cursor: pointer;
			background: #2555b6;

			i {
				color: #fff;
			}
		}

		.right {
			position: absolute;
			right: 20px;
			top: 5px;
			flex-shrink: 0;
			cursor: pointer;
			display: flex;
			align-items: center;

			.notice {
				display: flex;
				align-items: center;
				cursor: pointer;
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				margin-right: 100px;
				background-color: #e8e8e8;
				border-radius: 40px;
				color: #666;
				font-weight: bold;

				i {
					color: #0A5DD3;
					font-size: 20px;
				}

				.message,
				.todo {
					display: flex;
					align-items: center;
				}

				.message {
					margin-left: 10px;
				}
			}

			.user {
				display: flex;
				align-items: center;

				.info {
					margin-right: 14px;
					text-align: right;

					p:first-child {
						font-size: 14px;
						font-weight: 600;
						color: #2d2d2d;
					}

					p:last-child {
						margin-top: 4px;
						font-size: 14px;
						font-weight: 400;
						color: #99999a;
					}
				}

				.avatar {
					border-radius: 3px;
					width: 48px;
					height: 48px;
				}
			}


		}

	}

	.messageTitle {
		font-size: 14px;

		.desc {
			color: #9E9E9E;
			margin-right: 10px
		}

		.unreadTitle {
			color: #000;
		}

		.readTitle {
			color: #666;
		}

	}

	.messageLi {
		margin-bottom: 10px;
	}

	.meta {
		margin-top: 5px;
		font-size: 14px;

		.unreadStatus {
			color: #0b5fd5;
			margin-right: 10px
		}

		.readStatus {
			color: #9E9E9E;
			margin-right: 10px
		}

		.type {
			color: #9E9E9E;
			margin-right: 10px
		}

		.time {
			color: #9E9E9E;
		}
	}

	/deep/ .el-dropdown-menu__item {
		font-size: 14px;
		font-weight: 400;
		color: #262626;
	}

	/deep/ .el-dropdown-menu__item:focus,
	.el-dropdown-menu__item:not(.is-disabled):hover {
		font-weight: 600;
		color: #2867D2;
	}
</style>
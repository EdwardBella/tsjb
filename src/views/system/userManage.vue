<template>
	<div class="dbContent">
		<!-- <el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 40px);"> -->
		<div>
			<div class="search-content">
				<el-form :model="queryParams" :inline="true" ref="queryForm" label-width="100px">
					<el-form-item label="所属组织:" prop="status">
						<el-cascader ref="cascader" style="width: 100%" v-model="queryParams.orgCode"
							:props="{ children: 'children', label: 'name', value: 'deptCode', expandTrigger: 'hover', emitPath: false, checkStrictly: true}"
							:options="departmentTree" :show-all-levels="false" placeholder="请选择部门"
							@change="statusChanged"></el-cascader>
					</el-form-item>
					<el-form-item label="用户名:" prop="name">
						<el-input v-model="queryParams.name" placeholder="请输入内容" style="width: 260px;"></el-input>
					</el-form-item>

				</el-form>
			</div>
			<div class="buttons-cn">
				<el-button icon="el-icon-plus" style="background: #1b5284;height: 40px;" type="primary"
					@click="addUser">新增本单位用户</el-button>
				<div style="display: flex; flex: 1;justify-content: flex-end;">
					<el-button icon="el-icon-search" plain style="height: 40px;margin-left: 10px;"
						@click="getList">查询</el-button>
					<el-button icon="el-icon-refresh" plain style="height: 40px;margin-left: 10px;"
						@click="resetQuery">重置</el-button>
				</div>
			</div>
			<div class="table-cn">
				<el-table v-loading="tableData.loading" element-loading-text="拼命加载中" border stripe style="width: 100%"
					:data="tableData.data" :header-row-style="{'height':'60px',}">
					<el-table-column label="用户名" prop="accountName" header-align="left" align="left" />
					<el-table-column label="姓名" prop="name" header-align="left" align="left" />
					<el-table-column prop="orgName" label="部门角色" show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.roleNames }}
						</template>
					</el-table-column>
					<el-table-column label="手机号" prop="telephone" header-align="left" align="left" />
					<el-table-column label="邮箱" prop="email" header-align="left" align="left" />
					<el-table-column label="操作" align="left" width="260" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" :disabled="loading" @click="editUserInfo(scope.row)" plain
								size="mini">编辑</el-button>
							<el-button type="primary" @click="setStatusFun(scope.row,1)" plain size="mini"
								v-if="scope.row.status == '0'">启用</el-button>
							<el-button type="primary" @click="setStatusFun(scope.row,0)" plain size="mini"
								v-if="scope.row.status == '1'">禁用</el-button>
							<el-button type="primary" @click="resetPasswordFun(scope.row)" plain
								size="mini">重置密码</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-cn" style="border: none;">
					<pagination :total="tableData.total" :page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize" @pagination="getList" />
				</div>
			</div>
		</div>
		<!-- 新增&&编辑-->
		<setUserInfoDialog :visible="visible" :type="type" :currentAccountId="currentAccountId" :userForm="userForm"
			:userInfo="userInfo" :oldTelephone="oldTelephone" :oldEmail="oldEmail"
			:accountRoleTypeTypeDict="accountRoleTypeTypeDict" @handleClose="handleClose" @getNewList="getList">
		</setUserInfoDialog>
	</div>
</template>

<script>
	import * as userManageAPI from '@/api/userManage'
	import * as statisticsApi from '@/api/statistics'
	import setUserInfoDialog from './components/setUserInfoDialog'
	import {
		userDetail,
		setStatus,
		resetPassword
	} from '@/api/userManage'
	import {
		accountRoleTypeTypeDict
	} from '@/utils/dict'
	import {
		removeEmptyChildren
	} from '@/utils/common'
	export default {
		name: "userManage",
		components: {
			setUserInfoDialog
		},
		data() {
			return {
				loading: false,
				departmentTree: [],
				tableData: {
					data: [],
					loading: false,
					total: 0
				},
				queryParams: {
					orgCode: "",
					name: "",
					pageNum: 1,
					pageSize: 15,
				},
				visible: false,
				type: 'add',
				currentAccountId: '',
				userInfo: null,
				oldEmail: '',
				oldTelephone: '',
				accountRoleTypeTypeDict,
				userForm: {
					accountId: '',
					loginName: '',
					region: [],
					roles: [],
					name: '',
					telephone: '',
					email: '',
					file: '',
					orgName: '',
					systemName: '',
					systemId: '',
					accountSystem: ''
				},
			};
		},
		created() {
			this.fetchDepartmentTree()

		},
		methods: {
			getList() {
				let params = {
					orgCode: this.queryParams.orgCode,
					name: this.queryParams.name,
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
				}
				this.tableData.loading = true
				userManageAPI.list(params).then(res => {
					console.log(res, ']]]]]]]]]]]]]]]]]')
					const result = res.result;
					this.tableData.data = result.records;
					this.tableData.total = Number(result.total);
				}).finally(() => this.tableData.loading = false);


			},
			statusChanged(value) {
				this.$refs.cascader.dropDownVisible = false
			},
			resetQuery() {
				this.queryParams.orgCode = ''
				this.queryParams.name = ''
				this.getList()
			},
			fetchDepartmentTree() {
				statisticsApi.getByCode()
					.then(res => {
						const result = res.result
						if (result) {
							removeEmptyChildren([result])
							this.departmentTree = [result]
							if (this.departmentTree.length > 0) {
								this.queryParams.orgCode = this.departmentTree[0].deptCode
							}
							this.getList()
						}
					})
			},
			//修改用户状态
			setStatusFun(row, type) {
				const vm = this
				const confirm = [`确认禁用${row.name}？`, '确定启用该用户？']
				this.$confirm(confirm[type], '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						accountId: row.accountId,
						status: type
					}
					setStatus(params).then(res => {
						const {
							code,
							msg
						} = res
						if (code == 0) {
							this.$modal.msgSuccess(msg)
							this.getList()
						} else {
							this.$modal.msgError(msg)
						}
					}).catch(err => {
						return Promise.reject(err)
					})
				}).catch(err => {
					return Promise.reject(err)
				})
			},
			//重置密码resetPassword
			resetPasswordFun(row) {
				this.$confirm(`确认重置${row.name}的密码？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						accountId: row.accountId,
						accountName: row.accountName,
						email: row.email,
						name: row.name
					}
					resetPassword(data).then(res => {
						const {
							code,
							msg
						} = res
						if (code === 0) {
							this.$modal.msgSuccess('密码重置成功')
							this.getList()
						} else {
							this.$modal.msgError(msg)
						}
					}).catch(err => {
						return Promise.reject(err)
					})
				}).catch(err => {
					return Promise.reject(err)
				})
			},
			//新增用户
			addUser() {
				this.userForm.accountId = ''
				this.userForm.loginName = ''
				this.userForm.region = []
				this.userForm.roles = ['0']
				this.userForm.name = ''
				this.userForm.telephone = ''
				this.userForm.email = ''
				this.userForm.file = ''
				this.userForm.orgName = ''
				this.userForm.orgCode = ''
				this.userForm.systemName = ''
				this.userForm.systemId = ''
				this.userForm.accountSystem = ''
				this.type = 'add'
				this.visible = true
				// console.log(this.$refs.tablePage);
			},
			//编辑用户
			editUserInfo(row) {
				let params = {
					userAccountId: row.accountId
				}
				this.currentAccountId = row.accountId
				this.loading = true
				userDetail(params).then(res => {
						const {
							code,
							msg,
							result
						} = res
						if (code === 0) {
							this.userInfo = result
							this.userForm.accountId = result.id
							this.userForm.loginName = result.accountName
							this.userForm.roles = result.complainRoles ? result.complainRoles.split(',') : [];
							!this.userForm.roles.find(k => k === "0") && this.userForm.roles.unshift('0')
							this.userForm.name = result.name
							this.userForm.telephone = result.telephone
							this.userForm.email = result.email
							this.oldEmail = result.email;
							this.oldTelephone = parseInt(result.telephone);
							this.userForm.file = result.imgURL
							this.userForm.orgName = result.orgName
							this.userForm.orgCode = result.orgCode
							this.userForm.systemName = result.systemName
							this.userForm.systemId = result.systemId
							this.userForm.accountSystem = result.accountSystem
							let region = []
							if (this.userInfo.orgId) {
								// region.push(this.userInfo.orgId.split(','))
								region = this.userInfo.orgId.split(',')
								region.reverse()
							}
							this.userForm.region = region
							this.type = 'edit'
							this.visible = true
						}
					})
					.finally(() => this.loading = false)
			},
			handleClose() {
				this.visible = false
			},

		}
	};
</script>

<style scoped lang="less">
	::v-deep .el-table .cell {
		font-size: 16px !important;
	}
	.dbContent {
		background: #f5f5f5;

		/* 搜索框样式*/
		.search-content {
			padding: 0px 20px;
			background-color: #fff;
			box-shadow: 0 2px 11px 0 hsla(0, 0%, 63.1%, .2);
			overflow: hidden;

			.el-input__inner {
				height: 42px !important;
				line-height: 42px;
				font-size: 16px;
			}

			.el-form-item__label {
				font-size: 18px;
				line-height: 42px;
				font-weight: normal;
			}

			.el-form--inline .el-form-item {
				margin-top: 12px !important;
				margin-bottom: 12px !important;
			}
		}

		.buttons-cn {
			display: flex;
			align-items: center;
			padding: 20px 0px;

			.is-plain {
				border-color: #1b5284;
			}
		}

		.table-cn {
			background: #fff;
			padding: 20px;
			box-shadow: 0 2px 11px 0 hsla(0, 0%, 63.1%, .2);

			::v-deep .el-table .cell .is-plain {
				border-color: #1b5284;
				color: #1b5284;
				background-color: #fff;
				box-shadow: 0 2px 4px 0 rgba(9, 78, 197, .3);
				height: 24px !important;
				padding: 0 15px;
			}
		}



		.el-radio-button__inner {
			background: #2b65da;
			border-color: #2b65da;
			color: #bfc0ea;
			font-size: 18px;
			width: 110px;
			padding: 12px 0px;
		}

		.el-radio-button:hover .el-radio-button__inner,
		.el-radio-button__orig-radio:checked+.el-radio-button__inner {
			background-color: #194aaa;
			border-color: #194aaa;
			color: #fff;
		}
	}
</style>
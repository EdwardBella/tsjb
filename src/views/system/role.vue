<template>
	<div>
		<div class="search-content">
			<el-form :model="queryParams" :inline="true" ref="queryForm" label-width="90px">
				<el-form-item label="角色名称:" prop="roleName">
					<el-input v-model="queryParams.roleName" placeholder="请输入角色名称" style="width: 260px;"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-button icon="el-icon-search" plain style="height: 40px;margin-left: 10px;"
						@click="getList">查询</el-button>
				</el-form-item>

			</el-form>
			<div>
				<el-button icon="el-icon-plus" type="primary" style="height: 40px;margin-left: 10px;"
					@click="addNew">添加</el-button>
			</div>
		</div>
		<div class="table-cn">
			<el-table v-loading="tableData.loading" element-loading-text="拼命加载中" border stripe row-key="id"
				style="width: 100%" :data="tableData.data" :header-row-style="{'height':'60px',}">
				<el-table-column label="序号" type="index" align="center" width="60" />
				<el-table-column label="角色名称" prop="roleName" header-align="left" align="left" />
				<el-table-column label="角色类型" prop="remark" header-align="left" align="left" />
				<el-table-column label="角色描述" prop="remark" header-align="left" align="left" />
				<el-table-column label="创建时间" prop="createTime" header-align="left" align="left" />
				<el-table-column label="修改时间" prop="updateTime" header-align="left" align="left" />
				<el-table-column label="操作" header-align="left" align="center" width="180">
					<template slot-scope="scope">
						<el-button plain @click.stop="openDetails(scope.row)">菜单权限</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-cn" style="border: none;">
				<pagination :total="tableData.total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
					@pagination="getList" />
			</div>
		</div>
		<roleEditorDialog :visible.sync="roleEditorDialog.visible" :details="currentRow" @success="handleEditSuccess">
		</roleEditorDialog>

		<menuRoleDialog :visible.sync="menuRoleDialog.visible" :roleId="roleId" :menuList='menuList'
			@success="handleEditSuccess">
		</menuRoleDialog>
	</div>

</template>

<script>
	import roleEditorDialog from "@/views/system/components/roleEditorDialog";
	import menuRoleDialog from "@/views/system/components/menuRoleDialog";
	import * as userRoleRelationAPI from "@/api/userRoleRelation";
	import * as menuAPI from "@/api/menu"


	export default {
		name: "role",
		components: {
			roleEditorDialog,
			menuRoleDialog
		},
		data() {
			return {
				tableData: {
					data: [],
					total: 0,
					loading: false,
				},
				queryParams: {
					roleName: "",
					pageNum: 1,
					pageSize: 10,
				},
				roleEditorDialog: {
					visible: false
				},
				menuRoleDialog: {
					visible: false
				},
				currentRow: {},
				menuList: [],
				roleId: '',
			};
		},
		created() {
			this.getList()
			this.getMenuList()
		},
		methods: {
			getList() {
				this.tableData.loading = true
				userRoleRelationAPI.list(this.queryParams).then(res => {
					console.log(res, ']]]]]]]]]]]]]]]]]')
					const result = res.result;
					this.tableData.data = result.records;
					this.tableData.total = Number(result.total);
				}).finally(() => this.tableData.loading = false);
			},
			openDetails(row) {
				this.roleId = row.id
				this.menuRoleDialog.visible = true
			},
			handleEditSuccess(res) {
				this.getList()
			},
			getMenuList() {
				menuAPI.listMenu().then(res => {
					let list = res.result
					const tree = []
					for (let i = 0; i < list.length; i++) {
						if (list[i].menuVOS.length > 0) {
							list[i].children = []
							for (let j = 0; j < list[i].menuVOS.length; j++) {
								if (list[i].id === list[i].menuVOS[j].pid) {
									list[i].children.push(list[i].menuVOS[j])
								}
							}
							if (list[i].children.length === 0) delete list[i].children
							tree.push(list[i])
						} else {
							tree.push(list[i])
						}
					}
					this.menuList = tree;
				});
			},
			addNew() {
				this.roleEditorDialog.visible = true
			}
		}
	};
</script>

<style scoped lang="less">
	::v-deep .el-table .cell {
		font-size: 16px !important;
	}

	/* 搜索框样式*/
	.search-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.table-cn {
		background: #fff;
		padding: 20px;
		margin-top: 20px;
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
</style>
<template>
	<div>
		<div class="search-content">
			<el-form :model="queryParams" :inline="true" ref="queryForm" label-width="90px">
				<el-form-item label="菜单名称:" prop="menuName">
					<el-input v-model="queryParams.menuName" placeholder="请输入菜单名称" style="width: 260px;"></el-input>
				</el-form-item>
				<el-form-item label="层级:" prop="menuLevel">
					<el-input v-model="queryParams.menuLevel" placeholder="请输入层级" style="width: 260px;"></el-input>
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
				<el-table-column label="菜单名称" prop="menuName" header-align="left" align="left" />
				<el-table-column label="菜单编号" prop="menuCode" header-align="left" align="left" />
				<el-table-column label="请求地址" prop="menuUrl" header-align="left" align="left" />
				<el-table-column label="排序" prop="orderby" width="80px" header-align="left" align="left" />
				<el-table-column label="层级" prop="menuLevel" header-align="left" align="left" />
				<el-table-column label="是否是菜单" prop="menuType" min-width="100px" header-align="left" align="left">
					<template slot-scope="scope">
						<span>{{scope.row.menuType == '1'?'是':'否'}}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="status" header-align="left" align="left">
					<template slot-scope="scope">
						<span>{{scope.row.status == '1'?'启用':'禁用'}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" header-align="left" align="center" width="180">
					<template slot-scope="scope">
						<el-button plain @click.stop="openDetails(scope.row)">修改</el-button>
						<el-button plain @click.stop="menuDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>

		<!-- 新增&&编辑 -->
		<menuManageDialog :visible.sync="menuManageDialog.visible" :title="title" :rowInfo="rowInfo"
			:menuArr="tableData.data" @success="menuManageSuccess">
		</menuManageDialog>
	</div>

</template>

<script>
	import menuManageDialog from "./components/menuManageDialog";
	import {
		dict2Array
	} from "@/utils/common";
	import * as messageAPI from "@/api/message"
	import * as menuAPI from "@/api/menu"

	export default {
		name: "menuManage",
		components: {
			menuManageDialog
		},
		data() {
			return {
				tableData: {
					data: [],
					loading: false,
				},
				queryParams: {
					menuName: "",
					menuLevel: "",
				},
				title: '新增菜单',
				menuManageDialog: {
					visible: false
				},
				rowInfo: null,
				listsDatas: [],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.tableData.loading = true
				menuAPI.listMenu(this.queryParams).then(res => {
					console.log(res, ']]]]]]]]]]]]]]]]]')
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
					this.tableData.data = tree;
				}).finally(() => this.tableData.loading = false);
			},
			openDetails(res) {
				this.title = '修改菜单'
				this.rowInfo = res
				this.menuManageDialog.visible = true
			},
			addNew() {
				this.title = '新增菜单'
				this.menuManageDialog.visible = true
			},
			menuManageSuccess(res) {
				this.menuManageDialog.visible = false
			},
			menuDel(row) {
				this.confirm("确定删除吗？")
					.then(() => menuAPI.delMenu({
						id: row.id
					}))
					.then(() => {
						this.getList();
					});
			},
			confirm(message) {
				return this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				});
			},
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
<template>
	<div class="dbContent">
		<!-- <el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 40px);"> -->
		<div>
			<div class="search-content">
				<el-form :model="queryParams" :inline="true" ref="queryForm" label-width="100px">
					<el-form-item label="用户名:" prop="smsRecipient">
						<el-input v-model="queryParams.smsRecipient" placeholder="请输入内容" style="width: 260px;"></el-input>
					</el-form-item>
					<el-form-item label="状态:" prop="smsSendStatus">
						<el-select v-model="queryParams.smsSendStatus" placeholder="请选择" style="width: 260px;">
							<el-option label="失败" value="0"></el-option>
							<el-option label="成功" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号:" prop="smsMobile">
						<el-input v-model="queryParams.smsMobile" placeholder="请输入手机号" style="width: 260px;"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="buttons-cn">
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
					<el-table-column prop="smsRecipient" label="收信人" width="200"
						show-overflow-tooltip></el-table-column>
					<el-table-column prop="smsMobile" label="手机号码" width="200" show-overflow-tooltip></el-table-column>
					<el-table-column prop="smsContent" label="短信内容" show-overflow-tooltip></el-table-column>
					<el-table-column prop="smsSendTime" label="发送时间" width="180" align="center"></el-table-column>
					<el-table-column prop="smsSendStatus" label="状态" width="100" align="center">
						<template slot-scope="{row}">{{row.smsSendStatus | messageStatus}}</template>
					</el-table-column>
					<el-table-column prop="smsBackResult" label="日志信息" show-overflow-tooltip></el-table-column>

				</el-table>
				<div class="page-cn" style="border: none;">
					<pagination :total="tableData.total" :page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize" @pagination="getList" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		list
	} from '@/api/message'
	export default {
		name: "message",
		components: {},
		data() {
			return {
				loading: false,
				tableData: {
					data: [],
					loading: false,
					total: 0
				},
				queryParams: {
					smsRecipient: "",
					smsSendStatus: "",
					smsMobile: "",
					pageNum: 1,
					pageSize: 15,
				},
			};
		},
		created() {
			this.getList()

		},
		methods: {
			getList() {
				this.tableData.loading = true
				list(this.queryParams).then(res => {
					console.log(res, ']]]]]]]]]]]]]]]]]')
					const result = res.result;
					this.tableData.data = result.records;
					this.tableData.total = Number(result.total);
				}).finally(() => this.tableData.loading = false);

			},
			resetQuery() {
				this.queryParams.smsSendStatus = ''
				this.queryParams.smsRecipient = ''
				this.queryParams.smsMobile = ''
				this.getList()
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
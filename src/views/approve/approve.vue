<!--案件审批-->
<template>
	<div class="dbContent">
		<!-- <el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 40px);"> -->
		<div>
			<div class="search-content">
				<el-form :model="queryParams" :inline="true" label-position="left" ref="queryForm" label-width="100px">
					<el-form-item label="审批类型:" prop="type">
						<el-select v-model="queryParams.type" filterable placeholder="请选择"
							style="width: 260px;" @change="handleQuery">
							<el-option v-for="item in eventSourceArr" :key="item.value" :label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审批状态:" prop="status">
						<el-select v-model="queryParams.status" filterable placeholder="请选择"
							style="width: 260px;" @change="handleQuery">
							<el-option v-for="item in statusArr" :key="item.value" :label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间:" prop="time">
						<el-date-picker v-model="queryParams.time" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
							style="width: 260px;" @change="handleQuery">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="案件名称:" prop="title">
						<el-input v-model="queryParams.title" placeholder="请输入案件名称关键字" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>
					<el-form-item label="案件编号:" prop="workOrderNumber">
						<el-input v-model="queryParams.workOrderNumber" placeholder="请输入案件编号" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
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
					<el-table-column label="案件编号" prop="workOrderNumber" header-align="left" show-overflow-tooltip width="220px"
						align="left" />
					<el-table-column label="案件名称" prop="pe_num" show-overflow-tooltip header-align="left"
						min-width="400px" align="left">
						<template slot-scope="scope">
							<span v-if="scope.row.status != 1 && scope.row.status != 2" class="chong">[待我审批]</span>
							<span>{{scope.row.title}}</span>
						</template>
					</el-table-column>
					<el-table-column label="审批类型" prop="name" show-overflow-tooltip width="140px" header-align="left" align="left">
						<template slot-scope="scope">
							<span>{{eventSourceArrTrans[scope.row.type]}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" prop="sex" header-align="left" width="230px" show-overflow-tooltip
						align="left">
						<template slot-scope="scope">
							<span
								:style="{color: scope.row.auditStatus == '审批不通过'?'#e44831':'#138a43'}">{{scope.row.auditStatus}}</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" width="170px" header-align="left" align="left" />
					<el-table-column label="审批剩余时限" prop="auditDeadLine" width="140px" header-align="left" align="left">
						<template slot-scope="scope">
							<span v-if="scope.row.auditDeadLine != ''"
								:style="{color: getEndeTime(scope.row.auditDeadLine) == ''?'#e44831':'#666'}">{{getEndeTime(scope.row.auditDeadLine)==''?'0小时0分钟':getEndeTime(scope.row.auditDeadLine)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="100">
						<template slot-scope="scope">
							<el-button v-if="scope.row.status == '1' || scope.row.status == '2'" plain
								@click.stop="openDetails(scope.row)">查看</el-button>
							<el-button v-else plain @click.stop="openDetails(scope.row)">审批</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-cn" style="border: none;">
					<pagination :total="tableData.total" :page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize" @pagination="getList" />
				</div>
			</div>
		</div>


		<!-- 抽屉 -->
		<el-drawer title="我是标题" size="85%" :visible.sync="drawer" :with-header="false" destroy-on-close>
			<caseDetails basicType='approve' :workOrderId="workOrderId" :id="workOrderId" :workOrderNo="workOrderNo"
				@closeDrawer="closeDetail"  @success="getList"/>
		</el-drawer>

	</div>
</template>

<script>
	import caseDetails from "../workOrder/components/caseDetails";
	import * as portalsApi from "@/api/portals";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as dictApi from "@/api/dict";
	import {
		splxDict
	} from "@/utils/dict";
	import {
		dict2Array,
		getEndeTime,
		removeEmptyWithTree
	} from '@/utils/common'
	import {
		mapState
	} from 'vuex'
	export default {
		name: "finished",
		components: {
			caseDetails,
		},
		data() {
			return {
				search: "",
				tableData: {
					data: [],
					loading: false,
					total: 0
				},
				queryParams: {
					type: "",
					status: '',
					time: [],
					createTimeStart: '',
					createTimeEnd: '',
					title: '',
					workOrderNumber: "",
					pageNum: 1,
					pageSize: 10,
				},
				eventSourceArr: splxDict, //案件来源
				eventSourceArrTrans: {},
				statusArr: [], //审批状态
				drawer: false,
				workOrderId: '',
				workOrderNo: "",
			};
		},
		computed: {
			...mapState(['userInfo']),
		},
		async created() {
			await this.getBasicData()
			this.eventSourceArr.forEach(item => {
				this.eventSourceArrTrans[item.value] = item.label
			})
			this.getList()
		},
		methods: {
			getEndeTime,
			getList() {
				let params = {
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
				}
				let keys = ['type', 'status', 'title', 'workOrderNumber']
				for (let i = 0; i < keys.length; i++) {
					if (this.queryParams[keys[i]] != '') {
						params[keys[i]] = this.queryParams[keys[i]]
					}
				}
				if (this.queryParams.time && this.queryParams.time.length != 0) {
					params.createTimeStart = this.queryParams.time[0]
					params.createTimeEnd = this.queryParams.time[1]
				}
				this.tableData.loading = true
				workOrderApi.audit.list(params).then(res => {
					console.log(res, ']]]]]]]]]]]]]]]]]')
					this.tableData.data = res.result.records;
					this.tableData.total = Number(res.result.total);
				}).finally(() => this.tableData.loading = false);
			},
			resetQuery() {
				this.queryParams.type = ''
				this.queryParams.status = this.statusArr[0].value
				this.queryParams.time = []
				this.queryParams.createTimeStart = ''
				this.queryParams.createTimeEnd = ''
				this.queryParams.title = ''
				this.queryParams.workOrderNumber = ''
				this.queryParams.pageNum = 1
				this.queryParams.pageSize = 15
				this.getList()
			},
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			/* 字典数据 */
			async getBasicData() {
				await dictApi.getAuditStatusList().then(res => {
					this.statusArr = res.result
					this.queryParams.status = res.result[0].value
				});

			},
			openDetails(row) {
				this.workOrderNo = row.workOrderNo
				this.workOrderId = row.id
				this.drawer = true
			},
			closeDetail(res) {
				this.drawer = false
			}

		}
	};
</script>

<style scoped lang="less">
	.chong {
		font-size: 16px;
		color: #e44831;
	}

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
			
			.el-form{
				margin: 6px 0px;
			}

			::v-deep .el-input__inner {
				height: 42px !important;
				line-height: 42px !important;
				font-size: 16px;
			}

			.el-form-item__label {
				font-size: 18px;
				line-height: 42px;
				font-weight: normal;
			}

			.el-form--inline .el-form-item {
				margin-top: 6px !important;
				margin-bottom: 6px !important;
			}
		}

		.buttons-cn {
			display: flex;
			align-items: center;
			padding: 12px 0px;

			.is-plain {
				border-color: #1b5284;
			}
		}

		.table-cn {
			background: #fff;
			padding: 10px;
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
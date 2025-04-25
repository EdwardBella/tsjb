<template>
	<div class="dbContent">
		<!-- <el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 40px);"> -->
		<div>
			<div class="search-content" :style="{height:heightSize}">
				<el-form :model="queryParams" :inline="true" label-position="left" ref="queryForm" label-width="100px">
					<el-form-item label="案件编号:" prop="workOrderNumber">
						<el-input v-model="queryParams.workOrderNumber" placeholder="请输入案件编号" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>
					<el-form-item label="案件名称:" prop="title">
						<el-input v-model="queryParams.title" placeholder="请输入案件名称" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>
					<el-form-item label="案件状态:" prop="status">
						<el-cascader v-model="queryParams.status" ref="status" :options="statusArr"
							:props="{ checkStrictly: true  ,expandTrigger: 'hover',emitPath: false,}" placeholder="请选择"
							style="width: 260px;" @change="statusChanged"></el-cascader>
					</el-form-item>
					<el-form-item label="提交时间:" prop="time">
						<el-date-picker v-model="queryParams.time" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
							style="width: 260px;" @change="handleQuery">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="受理时间:" prop="time2">
						<el-date-picker v-model="queryParams.time2" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
							style="width: 260px;" @change="handleQuery">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="承办单位:">
						<el-cascader v-model="queryParams.complainAddressId" :show-all-levels="false"
							ref="complainAddressId" style="width: 260px;" :options="areas"
							:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
							clearable @change="complainAddressIdChanged"></el-cascader>
						<el-select v-model="queryParams.processDepartmentCode" clearable placeholder="请选择"
							style="width: 260px;" @change="handleQuery">
							<el-option v-for="item in processDepartmentArr" :key="item.code" :label="item.name"
								:value="item.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="办理时限:" prop="timeForProcess">
						<el-select v-model="queryParams.timeForProcess" clearable placeholder="请选择"
							style="width: 260px;" @change="handleQuery">
							<el-option v-for="item in handleTimeLimit" :key="item.value" :label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>

				</el-form>
			</div>
			<div class="buttons-cn">
				<div style="display: flex; flex: 1;justify-content: flex-end;">
					<el-button v-if="heightSize =='auto'" icon="el-icon-arrow-up" plain style="height: 40px;"
						@click="closeDown">收起</el-button>
					<el-button v-else icon="el-icon-arrow-down" plain style="height: 40px;"
						@click="openUp">展开</el-button>
					<el-button icon="el-icon-search" plain style="height: 40px;margin-left: 10px;"
						@click="getList">查询</el-button>
					<el-button icon="el-icon-refresh" plain style="height: 40px;margin-left: 10px;"
						@click="resetQuery">重置</el-button>
				</div>
			</div>
			<div class="table-cn">
				<el-table v-loading="tableData.loading" element-loading-text="拼命加载中" border stripe style="width: 100%"
					:data="tableData.data" :header-row-style="{'height':'60px',}">
					<el-table-column label="案件编号" prop="workOrderNumber" show-overflow-tooltip width="220px"
						header-align="left" align="left" />
					<el-table-column label="案件名称" show-overflow-tooltip prop="title" min-width="500px"
						header-align="left" align="left">
						<template slot-scope="scope">
							<span v-if="scope.row.supervisionTag == '1' || scope.row.supervisionTag == '3'" class="chong"
								style="background-color: #e2a900;">跟踪</span>
							<span v-if="scope.row.exceptionTag == '1' || scope.row.exceptionTag == '3'" class="chong">异常</span>
							<span v-if="scope.row.repeatCheck == 'Y'" class="chong">复</span>
							<span v-if="scope.row.isDuplicated == 'Y'" class="chong"
								style="background-color: #f55b23;">重</span>
							<span v-if="scope.row.correctionStatus == '1'" class="bu">补</span>
							<span v-if="scope.row.superviseStatus == '1'" class="du">督</span>
							<span v-if="scope.row.auditFlag == 'Y'" class="shen">审</span>
							<span style="background-color: #8a72ff;" v-if="scope.row.appraiseFlag == 'Y'"
								class="du">评</span>
							<i v-if="scope.row.wordsFlag === 'Y'" class="img icon-liu"></i>
							<!-- <img style="width: 20px;" v-if="scope.row.expireFlag === 'Y' && scope.row.status !== 10"
								src="../../assets/images/icon-light-red.png" alt=""> -->
							<img style="width: 20px;"
								v-if="filterTimer(scope.row.currentStepDeadline,scope.row.status,2) != ''"
								:src="filterTimer(scope.row.currentStepDeadline,scope.row.status,2)"
								alt="" />

							<span
								:style="{color:filterTimer(scope.row.currentStepDeadline,scope.row.status,1)}">{{scope.row.title}}</span>
						</template>
					</el-table-column>
					<el-table-column label="反映事项" show-overflow-tooltip prop="itemDetailName" width="300px"
						header-align="left" align="left" />
					<el-table-column label="案件状态" prop="sex" width="120px" header-align="left" align="left">
						<template slot-scope="scope">
							<span>{{returnStatus(scope.row.status,scope.row.subStatus)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="阶段时限" prop="age" width="110px" header-align="left" align="left">
						<template slot-scope="scope">
							<span
								v-if="timeDifference('',scope.row.currentStepDeadline)"
								:style="{color:filterTimer(scope.row.currentStepDeadline,scope.row.status,1)}">{{timeDifference('',scope.row.currentStepDeadline).days +'天'+timeDifference('',scope.row.currentStepDeadline).hours+'小时'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="企业名称" prop="companyName" show-overflow-tooltip min-width="240px"
						header-align="left" align="left" />
					<el-table-column label="联系人" prop="createUsername" width="120px" show-overflow-tooltip
						header-align="left" align="left" />
					<el-table-column label="手机号码" prop="mobile" width="120px" header-align="left" align="left" />
					<el-table-column label="承办单位" prop="processDepartment" show-overflow-tooltip width="240px"
						header-align="left" align="left" />
					<el-table-column label="提交时间" prop="createTime" width="170px" header-align="left" align="left" />
					<el-table-column label="受理时间" prop="filingTime" width="170px" header-align="left" align="left" />
					<el-table-column label="操作" align="center" width="100" fixed="right">
						<template slot-scope="scope">
							<el-button plain @click.stop="openDetails(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-cn" style="border: none;">
					<pagination :total="tableData.total" :page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize" @pagination="getList" />
				</div>
			</div>
		</div>
		<!-- </el-scrollbar> -->
		<!-- 抽屉 -->
		<el-drawer title="我是标题" size="85%" :visible.sync="drawer" :with-header="false" destroy-on-close>
			<caseDetails @closeDrawer="closeDetail" :workOrderId="workOrderId" :workOrderNo="workOrderNo"
				basicType='process' @success="getList" />
		</el-drawer>
	</div>
</template>

<script>
	import caseDetails from "./components/caseDetails";
	import * as portalsApi from "@/api/portals";
	import * as workOrderApi from "@/api/workOrder/index";
	import {
		ajztStatusDict2
	} from "@/utils/dict";
	import {
		dict2Array,
		returnStatus,
		filterTimer,
		timeDifference,
		removeEmptyWithTree
	} from '@/utils/common'
	export default {
		name: "process",
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
					workOrderNumber: '',
					status: '16,2,3,7',
					time: [],
					time2: [],
					title: '',
					complainAddressId: "",
					processDepartmentCode: "",
					timeForProcess: '',
					pageNum: 1,
					pageSize: 10,
				},
				areas: [],
				processDepartmentArr: [],
				statusArr: ajztStatusDict2, //案件状态
				deptArr: [],
				heightSize: 'auto',
				drawer: false,
				workOrderId: "",
				workOrderNo: "",
				handleTimeLimit: [{
					label: '全部',
					value: ''
				}, {
					label: '正常',
					value: '0'
				}, {
					label: '临期',
					value: '1'
				}, {
					label: '超期',
					value: '2'
				}]
			};
		},
		created() {
			this.getBasicData()
			this.getList()
		},
		methods: {
			returnStatus,
			timeDifference,
			filterTimer,
			getList() {
				let params = {
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
				}
				let keys = ['workOrderNumber', 'title', 'complainAddressId', 'processDepartmentCode', 'timeForProcess']

				for (let i = 0; i < keys.length; i++) {
					if (this.queryParams[keys[i]] != '') {
						params[keys[i]] = this.queryParams[keys[i]]
					}
				}
				if (this.queryParams.time && this.queryParams.time.length != 0) {
					params.createTimeStart = this.queryParams.time[0]
					params.createTimeEnd = this.queryParams.time[1]
				}

				if (this.queryParams.time2 && this.queryParams.time2.length != 0) {
					params.filingTime = this.queryParams.time2[0]
					params.filingTimeEnd = this.queryParams.time2[1]
				}
				if (this.queryParams.status.split(',').length > 2 || this.queryParams.status.split(',').length == 1) {
					params.status = this.queryParams.status
					params.subStatus = ''
				}
				if (this.queryParams.status.split(',').length == 2) {
					params.status = this.queryParams.status.split(',')[0]
					params.subStatus = this.queryParams.status.split(',')[1]
				}
				this.tableData.loading = true
				workOrderApi.process.list(params).then(res => {
					console.log(res, ']]]]]]]]]]]]]]]]]')
					const result = res.result;
					this.tableData.data = result.records;
					this.tableData.total = Number(result.total);
				}).finally(() => this.tableData.loading = false);


			},
			resetQuery() {
				this.queryParams.workOrderNumber = ''
				this.queryParams.title = ''
				this.queryParams.status = '16,2,3,7'
				this.queryParams.time = []
				this.queryParams.time2 = []
				this.queryParams.title = ''
				this.queryParams.complainAddressId = ''
				this.queryParams.processDepartmentCode = ''
				this.queryParams.timeForProcess = ''
				this.queryParams.pageNum = 1
				this.getList()
			},
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			getBasicData() {
				portalsApi.workOrder.area()
					.then(res => {
						this.areas = [res.result]
					})
			},
			closeDown() {
				this.heightSize = '66px'
			},
			openUp() {
				this.heightSize = 'auto'
			},
			handleSizeChange(value) {
				console.log(value)
			},
			handleCurrentChange(value) {
				console.log(value)
			},
			openDetails(row) {
				this.workOrderNo = row.workOrderNo
				this.workOrderId = row.id
				this.drawer = true
			},
			closeDetail(res) {
				this.drawer = false
			},

			statusChanged(value) {
				this.$refs.status.dropDownVisible = false
				this.handleQuery()
			},
			complainAddressIdChanged(value) {
				this.$refs.complainAddressId.dropDownVisible = false
				if (value == null) {
					this.processDepartmentArr = []
					this.queryParams.processDepartmentCode = ''
				} else {
					this.processDepartmentArr = []
					this.queryParams.processDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.processDepartmentArr = removeEmptyWithTree(r.result)
							})
					})
				}
			},

		}
	};
</script>

<style scoped lang="less">
	::v-deep .el-table .cell {
		font-size: 16px !important;
	}

	.chong,
	.bu,
	.du,
	.shen {
		display: inline-block;
		background-color: #f55b23;
		padding: 0px 6px;
		font-size: 12px;
		color: #fff;
		border-radius: 2px;
		margin-right: 8px;
	}

	.du,
	.shen {
		background-color: rgb(19, 138, 67);
	}

	.icon-liu,
	.icon-ping {
		content: "";
		margin-right: 0;
		background-size: 28px;
		display: inline-block;
		width: 28px;
		height: 28px;
		background-position-y: 2px;
	}

	.icon-ping {
		background-image: url("../../assets/images/common/icon-ping.png");
	}

	.icon-liu {
		background-image: url("../../assets/images/common/icon-liu.png");
	}

	.dbContent {
		background: #f5f5f5;

		/* 搜索框样式*/
		.search-content {
			padding: 0px 20px;
			background-color: #fff;
			box-shadow: 0 2px 11px 0 hsla(0, 0%, 63.1%, .2);
			overflow: hidden;
			
			
			::v-deep .el-icon-circle-close {
				font-size: 22px;
				color: #606266;
			}
			

			.el-form {
				margin: 6px 0px;
			}

			::v-deep .el-input__inner {
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
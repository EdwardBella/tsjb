<template>
	<div class="dbContent">
		<div style="display: flex;align-items: center;">
			<div style="flex: 1;">
				<el-radio-group v-model="queryParams.status" @change="tabCheck">
					<el-radio-button label="">全部</el-radio-button>
					<el-radio-button label="1">受理阶段</el-radio-button>
					<el-radio-button label="2">查办阶段</el-radio-button>
					<el-radio-button v-if="userRoles.isLeaderDepartment" label="3">结案阶段</el-radio-button>
					<el-radio-button label="4">审批</el-radio-button>
				</el-radio-group>
			</div>
			<div class="search-content">
				<el-input v-model="queryParams.keywords" @keyup.enter.native="tabCheck" placeholder="请输入内容"></el-input>
				<el-button style="height: 42px;" type="primary" icon="el-icon-search" @click="getList"></el-button>
			</div>
		</div>
		<!-- <el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 78px); "> -->
		<div v-loading="tableData.loading" element-loading-text="拼命加载中">
			<div v-if="tableData.data.length>0">
				<div class="list-content">
					<div class="item" v-for="(item,index) in tableData.data" :key="index" @click="openDetails(item)">
						<div class="status-cn">
							<span v-if="item.stageName != '审批'" class="la">{{item.stageName}}</span>
							<span v-if="item.stageName == '审批'" class="la la-cn">审&nbsp;&nbsp;&nbsp;&nbsp;批</span>
							<span v-if="item.stageName != '审批'"
								class="lb">{{item.processStatusValue ?item.processStatusValue: todoStatus(item.status)}}</span>
							<span style="color: #138a43;" v-if="item.stageName == '审批'"
								class="lb">{{returnExamine(item.type)}}</span>
							<img v-if="filterTimer(item.currentStepDeadline,item.status,item.processStatusValue,3)"
								:src="filterTimer(item.currentStepDeadline,item.status,item.processStatusValue,3)"
								alt="" />
							<span class="lc" style="font-size: 18px;">{{item.title || '--'}}</span>
						</div>
						<div class="time-cn">
							<span style="width: 74px;text-align: center;">未处理</span>
							<template v-if="item.stageName == '审批'">
								<span v-if="item.auditDeadLine != '' && (item.type == '07' || item.type == '25')"
									style="color: #666;">审批剩余时限：</span>
								<span v-if="item.auditDeadLine != '' && (item.type == '07' || item.type == '25')"
									:style="{color: getEndeTime(item.auditDeadLine) == ''?'#e44831':'#666'}">{{getEndeTime(item.auditDeadLine)==''?'0小时0分钟':getEndeTime(item.auditDeadLine)}}</span>
							</template>
							<template v-else-if="item.status == '4' || item.status == '15'">
								<span style="color: #666;">剩余处理时限：</span>
								<span
									:style="{color: filterTimer(item.finishStepDeadline,item.status,item.processStatusValue,2)}">{{filterTimer(item.finishStepDeadline,item.status,item.processStatusValue)}}</span>
							</template>
							<template v-else>
								<span style="color: #666;">剩余处理时限：</span>
								<span
									:style="{color: filterTimer(item.currentStepDeadline,item.status,item.processStatusValue,2)}">{{filterTimer(item.currentStepDeadline,item.status,item.processStatusValue)}}</span>
							</template>

						</div>
					</div>
				</div>
				<div class="page-cn">
					<pagination :total="tableData.total" :page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize" @pagination="getList" />
				</div>
			</div>
			<div v-else>
				<el-empty :image-size="300" description="暂无数据"></el-empty>
			</div>

		</div>

		<!-- </el-scrollbar> -->

		<!-- 抽屉 -->
		<el-drawer title="我是标题" size="85%" :visible.sync="drawer" :with-header="false" destroy-on-close>
			<caseDetails @closeDrawer="closeDetail" :workOrderId="workOrderId" :id="id" :workOrderNo="workOrderNo"
				basicType='todo' :isAudit="isAudit" @success="getList" />
		</el-drawer>
	</div>
</template>

<script>
	import caseDetails from "../workOrder/components/caseDetails";
	import {
		list
	} from "@/api/waiting.js";
	import {
		mapState
	} from 'vuex'
	import {
		timeDifference,
		todoStatus,
		getEndeTime,
		returnExamine
	} from '@/utils/common'
	export default {
		name: "todo",
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
					handleStatus: '',
					itemDetailType: '',
					status: '',
					keywords: '',
					itemStatus: 'N',
					pageNum: 1,
					pageSize: 10,
				},
				drawer: false,
				workOrderId: '',
				workOrderNo: "",
				id: "",
				isAudit: false,
			};
		},
		computed: {
			...mapState(['userInfo', 'userRoles']),
		},
		created() {
			this.getList()
			console.log(this.userRoles, '--------------------------')
		},
		methods: {
			timeDifference,
			todoStatus,
			returnExamine,
			getEndeTime,
			tabCheck() {
				this.queryParams.pageNum = 1
				this.tableData.data = []
				this.tableData.total = 0
				this.getList()
			},
			getList() {
				this.tableData.loading = true
				list(this.queryParams).then(res => {
					const result = res.result;
					this.tableData.data = result.records;
					this.tableData.total = Number(result.total);
				}).finally(() => this.tableData.loading = false);

			},
			closeDetail(res) {
				this.drawer = false
			},
			openDetails(row) {
				this.drawer = true
				if (row.auditFlag == 'Y') {
					this.isAudit = true
					this.id = row.workOrderAuditId
				} else {
					this.isAudit = false
					this.id = row.id
				}
				this.workOrderNo = row.workOrderNo
				this.workOrderId = row.workOrderId
			},
			filterTimer(time, status, processStatusValue, type = 1) {
				let obj = timeDifference('', time)
				if (type == 1) {
					if (time == '') {
						return ''
					}
					if (obj.hours < 0) {
						return '0天0小时'
					} else {
						return obj.days + '天' + obj.hours + '小时'
					}

				}
				if (type == 2) {
					if (status == '0' || status == '2' || status == '4' || status == '15' || processStatusValue ==
						'预审反馈') { //待办
						if (obj.days >= 1) {
							return '#666'
						} else if (obj.hours > 0) {
							return '#e2a900'
						} else {
							return '#e44831'
						}
					}

					if (status == '3') { //调查中
						if (obj.days >= 3) {
							return '#666'
						} else if (obj.days > 0 || obj.hours > 0) {
							return '#e2a900'
						} else {
							return '#e44831'
						}
					}
					return '#666'
				}
				if (type == 3) {
					if (status == '0' || status == '2' || status == '4' || status == '15' || processStatusValue ==
						'预审反馈') { //待办
						if (obj.days >= 1) {
							return ''
						} else if (obj.hours > 0) {
							return require('@/assets/images/icon-light-yellow.png')
						} else {
							return require('@/assets/images/icon-light-red.png')
						}
					}

					if (status == '3') { //调查中
						if (obj.days >= 3) {
							return ''
						} else if (obj.days > 0 || obj.hours > 0) {
							return require('@/assets/images/icon-light-yellow.png')
						} else {
							return require('@/assets/images/icon-light-red.png')
						}
					}
					return ''
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	::v-deep .el-radio-button__inner {
		background: #2b65da;
		border-color: #2b65da;
		color: #bfc0ea;
		font-size: 18px;
		width: 110px;
		padding: 12px 0px;
	}

	::v-deep .el-empty {
		height: calc(100vh - 220px);
	}

	::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: #194aaa !important;
		border-color: #194aaa !important;
		color: #fff !important;
	}

	::v-deep .search-content .el-input__inner {
		width: 220px !important;
		height: 44px !important;
		font-size: 16px !important;
	}

	::v-deep .el-button.el-button--primary {
		border-color: #1b5284;
		background-color: #1b5284;
		color: #fff;
		margin-left: 4px;
	}

	::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		box-shadow: none;
	}

	.dbContent {

		.list-content {
			margin-top: 20px;

			.item {
				margin-bottom: 20px;
				background: #fff;
				border-radius: 4px;
				overflow: hidden;
				border: 1px solid #d9d9d9;
				cursor: pointer;

				.time-cn {
					display: flex;
					font-size: 16px;
					background: #fafafa;
					padding: 12px 20px;
					border-top: 1px solid #f0f0f0;
					color: #2b65da;

					span {
						margin-right: 10px;
					}
				}



				.status-cn {
					display: flex;
					align-items: center;
					padding: 12px 20px 15px;

					.la {
						font-size: 14px;
						height: 24px;
						line-height: 24px;
						padding: 0 8px;
						background-color: #2b65da;
						border-radius: 2px;
						color: #fff;
						margin-right: 10px;
						width: 58px;
						text-align: center;
					}

					.la-cn {
						background-color: #138a43;
					}

					.lb {
						font-size: 14px;
						height: 24px;
						line-height: 24px;
						padding: 0 8px;
						background-color: #e9effb;
						border-radius: 2px;
						color: #2b65da;
						margin-right: 10px;
					}

					.lc {
						margin-right: 10px;
					}

				}

				img {
					width: 24px;
					height: 24px;
					margin-right: 10px;
				}

			}
		}

		.search-content {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}


	}
</style>
<template>
	<div>
		<el-button @click="$router.push('/portals/index')" plain size="mini" style="margin: 5px 0px">关闭</el-button>
		<el-form :model="searchForm" :rules="searchFormRules" ref="searchForm" class="search-form" inline
			label-suffix=" :">
			<el-form-item label="提交时间" prop="dateRange">
				<el-date-picker type="daterange" v-model="searchForm.dateRange" range-separator="至"
					value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="" style="float: right">
				<el-button @click="handleSearch" plain icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item label="" prop="title" style="float:right;">
				<el-input v-model.trim="searchForm.title" maxlength="25" placeholder="请输入案件名称关键字"></el-input>
			</el-form-item>

		</el-form>
		<div class="search-form2">
			<el-button type="primary" @click="$router.push({path: '/portals/createStep1'})">我要投诉</el-button>
		</div>

		<el-table :data="rows" v-loading="loading" element-loading-text="拼命加载中" stripe height="calc(100vh - 204px)">
			<el-table-column prop="title" label="案件名称" show-overflow-tooltip></el-table-column>
			<el-table-column label="受理单位">
				<template slot-scope="{row}">
					<p class="ellipsis">{{row.acceptDepartment || '-'}}</p>
				</template>
			</el-table-column>
			<el-table-column label="承办单位">
				<template slot-scope="{row}">
					<p class="ellipsis">{{row.processDepartment || '-'}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="状态" width="120px">
				<template slot-scope="{row}">
					<!-- <span v-if="row.status === 0">待受理</span>
					<span v-if="row.status === 13">发起材料补正</span>
					<span v-if="row.status === 14">放弃投诉举报</span>
					<span v-if="row.status === 21 || row.status === 2">已受理</span>
					<span v-if="row.status === 3">调查处理中</span>
					<span v-if="row.status === 5 && row.appraiseStatus == 'Y'">已评价</span>
					<span v-if="row.status === 5 && row.appraiseStatus == 'N'">待评价</span>
					<span v-if="row.status === 6">不受理</span>-->
					<template v-if="row.status === 6">
						<span
							v-if="row.rejectReview == 'Y' && row.workOrderAudit == '' && (row.workOrderProcess == null || row.workOrderProcess == '')">不受理复核中</span>
						<span v-else>不受理</span>
					</template>
					<span v-else>{{returnStatus(row.status,row.subStatus)}}</span>

				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="提交时间" width="190px"></el-table-column>
			<el-table-column label="操作" width="80px">
				<template slot-scope="{row}">
					<div>
						<el-button :disabled="row.publicStatus === 'N'"
							@click="$router.push({path: '/portals/details', query: { id: row.id }})" plain
							size="mini">查看</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<pagination :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize"
			@pagination="getWorkOrders" />
	</div>
</template>

<script>
	import * as portalsApi from "@/api/portals";
	import * as mixins from "@/utils/mixins";
	import moment from "moment";
	import {
		getCMSUserInfo,
		postPortalsHeight,
		returnStatus,
	} from "@/utils/common";
	import {
		timeFormatDHMS
	} from "@/utils/filters";

	export default {
		name: "workOrderList",
		mixins: [mixins.form],
		components: {

		},
		data() {
			return {
				loading: false,
				searchForm: {
					title: "",
					createTimeStart: "",
					createTimeEnd: "",
					// dateRange: [moment().subtract(30, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
					dateRange: [],
					pageNum: 1,
					pageSize: 20,
				},
				searchFormRules: {
					dateRange: [{
						validator: (rule, value, callback) => {
							if (value.length === 2) {
								if (!moment(value[1]).isBetween(moment(value[0]).subtract(1, 'days'), moment(
										value[0]).add(32, 'days'), 'days')) {
									callback(new Error("时间跨度不可大于31天"));
									return
								}
							}
							callback()
						}
					}]
				},
				total: 0,
				rows: []
			};
		},

		created() {
			console.log(getCMSUserInfo(), ']]]]]]]]]]]');
			if (getCMSUserInfo().cmsAuthToken) {
				this.getWorkOrders()
			}
		},
		mounted() {
			// let that = this;
			// window.parent.postMessage({
			// 	name: "cmsUserInfo",
			// 	data: {},
			// 	replay: true
			// }, "*");
			// window.onmessage = (e) => {
			// 	console.log(e, "接收cms发送的cmsUserInfo");
			// 	if (e.data) {
			// 		if (e.data.name === "cmsUserInfo") {
			// 			sessionStorage.setItem("cmsUserInfo", JSON.stringify(e.data.data));

			// 		}
			// 	}
			// }
		},
		methods: {
			returnStatus,
			timeFormatDHMS,
			getWorkOrders() {
				this.loading = true;
				const userInfo = getCMSUserInfo();
				let params = {
					title: this.searchForm.title,
					createTimeStart: this.searchForm.dateRange && this.searchForm.dateRange.length != 0 ? this
						.searchForm.dateRange[0] : "",
					createTimeEnd: this.searchForm.dateRange && this.searchForm.dateRange.length != 0 ? this
						.searchForm.dateRange[1] : "",
					idNumber: userInfo.idNumber,
					socialCreditNumber: userInfo.socialCreditNumber,
					pageNum: this.searchForm.pageNum,
					pageSize: this.searchForm.pageSize,
				}
				portalsApi.workOrder.listOfMyWorkOrder(params)
					.then(res => {
						const result = res.result;
						this.rows = result.records;
						this.total = Number(result.total);
					})
					.then(() => this.$nextTick(() => postPortalsHeight(undefined, 350)))
					.finally(() => {
						this.loading = false;
					});
			},
			handleSearch() {
				this.searchForm.pageNum = 1
				this.getWorkOrders()
			}
		}
	};
</script>

<style scoped lang="less">
	.search-form {
		.is-plain {
			height: 40px;
			line-height: 40px;
		}
	}

	.search-form2 {
		margin-top: 10px;
		margin-bottom: 10px;

		.is-plain {
			height: 40px;
			line-height: 40px;
		}
	}

	::v-deep .el-table .cell {
		font-size: 16px;
		color: #666;
	}

	::v-deep .el-form--inline .el-form-item {
		margin-bottom: 0px;
	}
</style>
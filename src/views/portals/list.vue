<template>
	<div>
		<!-- <el-button @click="$router.push('/portals/index')" type="primary" plain size="mini"
			style="margin-bottom: 10px">返回</el-button> -->
		<el-form :model="searchForm" :rules="searchFormRules" ref="searchForm" class="search-form" inline
			label-suffix=" :">
			<el-form-item label="提交时间" prop="dateRange">
				<el-date-picker type="daterange" v-model="searchForm.dateRange" range-separator="至"
					value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="" style="float: right">
				<el-button @click="handleSearch" type="primary" plain style="height: 40px;"
					icon="img icon-search">查询</el-button>
			</el-form-item>
			<el-form-item label="" prop="title" style="float:right;">
				<el-input v-model="searchForm.title" maxlength="10" placeholder="请输入案件名称关键字"></el-input>
			</el-form-item>

		</el-form>

		<el-table :data="rows" v-loading="loading" stripe>
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
			<el-table-column prop="status" label="状态" width="85px">
				<template slot-scope="{row}">
					<span v-if="row.status === 0">待受理</span>
					<span v-if="(row.status >= 1 && row.status <= 4)  || row.status === 7">受理中</span>
					<span v-if="row.status === 5" style="color: #35E592">已办结</span>
					<span v-if="row.status === 6" style="color: #666666">不受理</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="提交时间" width="165px"></el-table-column>
			<el-table-column label="操作" width="80px">
				<template slot-scope="{row}">
					<div>
						<el-button :disabled="row.publicStatus === 'N'"
							@click="$router.push({path: '/portals/details', query: { id: row.id }})" type="primary"
							plain size="mini">查看</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<pagination :total="total" :page.sync="query.pageNum" :pageSize="query.pageSize" @pageChange="getWorkOrders" />
	</div>
</template>

<script>
	import pagination from "@/components/pagination.vue";
	import * as portalsApi from "@/api/portals";
	import moment from "moment";
	import * as mixins from "@/utils/mixins";
	import {
		postPortalsHeight
	} from "@/utils/common";
	import {
		timeFormatDHMS
	} from "@/utils/filters";

	export default {
		name: "workOrderList",
		mixins: [mixins.form],
		components: {
			pagination
		},
		data() {
			return {
				loading: false,
				searchForm: {
					dateRange: [],
					// dateRange: [moment().subtract(30, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
					title: ''
				},
				searchFormRules: {
					// dateRange: [
					//   {
					//     validator: (rule, value, callback) => {
					//       if (value.length === 2) {
					//         if (!moment(value[1]).isBetween(moment(value[0]).subtract(1, 'days'), moment(value[0]).add(32, 'days'), 'days')) {
					//           callback(new Error("时间跨度不可大于31天"));
					//           return
					//         }
					//       }
					//       callback()
					//     }
					//   }
					// ],
				},
				query: {
					pageSize: 10,
					pageNum: 1
				},
				total: 0,
				rows: [{
					title:"案件名称",
					status:"0",
					createTime:"2025-06-23",
					publicStatus:"S"
				}]
			}
		},
		created() {
			// this.getWorkOrders()
		},
		methods: {
			getWorkOrders() {
				this.loading = true
				const form = Object.assign({}, this.searchForm, this.query)
				if (form.dateRange && form.dateRange.length) {
					form.createTimeStart = form.dateRange[0]
					form.createTimeEnd = form.dateRange[1]
				}
				delete form.dateRange
				portalsApi.workOrder.list(form)
					.then(res => {
						const result = res.result;
						this.rows = result.records;
						this.total = Number(result.total);
					})
					.then(() => this.$nextTick(() => postPortalsHeight(undefined, 350)))
					.finally(() => {
						this.loading = false
					})
			},
			handleSearch() {
				this.query.pageNum = 1
				this.validate('searchForm')
					.then(() => this.getWorkOrders())

			}
		}
	};
</script>

<style scoped>

</style>
<template>
	<div>
		<el-select v-model="searchForm.remarkType" style="width: 100%">
			<el-option v-for="item in remarkTypes" :key="item.key" v-bind="item"></el-option>
		</el-select>
		<div v-loading="loading" ref="scroll" class="beautify-scroll">
			<div ref="scrollContent">
				<template v-if="remarks.length">
					<div v-for="item in remarks" class="item" :key="item.id">
						<header>
							<div>
								<span class="name color-primary">{{ item.createName }}</span><span
									class="sub-name">{{ item.departmentName }}</span>
							</div>
							<div class="tag primary">{{ item.remarkType | remarkType }}</div>
						</header>
						<section v-if="item.remarkType == 4">
							<div v-html="item.content"></div>
						</section>
						<section v-else>
							{{ item.content }}
						</section>

						<footer>
							<time>{{ item.createTime | dateformat }}</time>
							<div class="right">
								<span>{{ item.remarkVisibleRange | remarkVisibleRange }}</span>
								<span v-if="item.accountId === accountId" @click="onDelete(item.id)"
									class="color-danger">删除</span>
							</div>
						</footer>
					</div>
				</template>
				<div v-else style="text-align: center;color: #909399;margin-top: 20px;">暂无数据</div>
			</div>
		</div>
		<div v-if="isLeaderDepartment || isCurrentWorkWorkProcessor" style="padding: 14px 0;">
			<el-button @click="visible = true" type="primary" style="width: 96%">
				添加备注
			</el-button>
		</div>
		<addRemarkDialog @success="onSuccess" :visible.sync="visible" :work-order-no="workOrderNo"
			:work-order-id="workOrderId"></addRemarkDialog>
	</div>
</template>

<script>
	import drawer from "@/components/drawer.vue";
	import {
		dict2options,
		getAccount
	} from "@/utils/common";
	import {
		remarkTypeDict,
		remarkVisibleRangeDict
	} from "@/utils/dict";
	import * as remarkAPI from "@/api/remark";
	import {
		remarkType,
		remarkVisibleRange
	} from "@/utils/filters";
	import {
		queryProvincialLevel
	} from "@/api/workOrder/all";
	import {
		mapState
	} from "vuex";
	import addRemarkDialog from "@/views/workOrder/components/addRemarkDialog.vue";
	import {
		rolePermissionsMixin
	} from "@/views/workOrder/mixin";

	export default {
		name: "remarkDrawer",
		mixins: [rolePermissionsMixin],
		components: {
			addRemarkDialog
		},
		filters: {
			remarkType,
			remarkVisibleRange
		},
		props: {
			// visible: { type: Boolean, default: false },
			workOrderId: {
				type: String,
				default: ""
			},
			workOrderNo: {
				type: String,
				default: ""
			},
			details: {
				type: Object,
				default: Object
			},
		},
		data() {
			return {
				visible: false,
				submitting: false,
				loading: false,
				remarkTypes: dict2options(remarkTypeDict, {
					hasAll: true
				}),
				formRemarkTypes: [],
				searchForm: {
					remarkType: ""
				},
				remarks: [],
				accountId: ""
			};
		},
		computed: {
			...mapState(["userRoles"])
		},
		watch: {
			workOrderId: {
				handler(val) {
					console.log(val, "111111111111111111")
					if (!val) return
					this.loading = true;
					this.query().finally(() => this.loading = false);
					queryProvincialLevel().then(r => {
						const isProvincialLevel = r.result;
						this.formRemarkTypes = dict2options(remarkTypeDict, {
							filter: ({
								value
							}) => {
								return isProvincialLevel ? true : [0, 3].includes(value);
							}
						});
					});
				},
				deep: true,
				immediate: true
			},
			"searchForm.remarkType"() {
				this.loading = true;
				this.query()
					.then(() => {
						this.$nextTick(() => {
							this.$refs.scroll.scrollTop = 0;
						});
					})
					.finally(() => this.loading = false);
			}
		},
		created() {
			this.accountId = getAccount().accountId;
			this.$eventBus.$off('remarkList')
			this.$eventBus.$on('remarkList', (param) => {
				this.query()
			})
		},
		methods: {
			query() {
				const searchForm = {
					...this.searchForm
				};
				searchForm.workOrderId = this.workOrderId;
				return remarkAPI.query(searchForm)
					.then((r) => {
						this.remarks = r.result;
					});
			},
			onDelete(id) {
				this.$confirm("是否确认删除", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => remarkAPI.del({
						id
					}))
					.then(() => {
						this.query();
						this.$modal.msgSuccess("删除成功");
					});
			},
			onSuccess() {
				this.query()
					.then(this.$nextTick)
					.then(() => {
						this.$refs.scroll.scrollTop = 0;
					})
			}
		}
	};
</script>

<style lang="less" scoped>
	.wrapper {
		background-color: #fff;
		height: 100%;
		position: relative;
		z-index: 10;
	}

	.beautify-scroll {
		margin-top: 10px;
		height: calc(100vh - 236px);

		.item {
			margin-bottom: 10px;
			border-bottom: 1px solid #e3e3e3;
			padding-bottom: 5px;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.sub-name {
				color: #666;
				margin-left: 10px;
			}

			.tag {
				width: 50px;
				height: 22px !important;
			}
		}

		section {
			margin: 5px 0;
			color: #000;
		}

		footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			font-size: 14px;

			.right {
				span:last-child {
					cursor: pointer;
					margin-left: 10px;
				}
			}
		}
	}

	.drawer {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 9;


	}
</style>
<template>
	<el-row>
		<el-col :span="8">
			<el-form-item
				label="确认欠款">{{ detailsInfo.confirmUnPayAmount?(detailsInfo.confirmUnPayAmount+'万元'):''}}</el-form-item>
		</el-col>
		<el-col :span="8">
			<el-form-item label="累计还款">{{addAmount}}万元</el-form-item>
		</el-col>
		<el-col :span="8">
			<el-form-item
				label="投诉欠款">{{detailsInfo.questionMainInfo.govArrears.contractAmount}}万元</el-form-item>
		</el-col>
	</el-row>

</template>

<script>
	import * as mixins from "@/utils/mixins";
	import {
		multiply,
		add,
		subtract,
		divide
	} from "accurate-core";
	import {
		mapState
	} from 'vuex'

	export default {
		name: "repaymentInfo2",
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo'],
		data() {
			return {
				repaymentPlan: [],
				otherRepaymentPlan: [],
				planAllAmount: 0,
				otherPlanAllAmount: 0,
			};
		},
		computed: {
			...mapState(['userInfo', 'userRoles']),
			addAmount() {
				return add(add((this.detailsInfo.payedAmount || 0), (this.planAllAmount || 0)), (this.otherPlanAllAmount ||
					0))
			},
		},
		watch: {
			repaymentPlan: {
				handler(val) {
					let gentle = 0;
					for (let i = 0; i < val.length; i++) {
						if (val[i].status == 'PAYED') {
							gentle = add(gentle, Number(val[i].amount))
						}
					}
					this.planAllAmount = gentle
				},
				deep: true,
				immediate: true
			},
			otherRepaymentPlan: {
				handler(val) {
					let gentle = 0;
					for (let i = 0; i < val.length; i++) {
						if (val[i].amount != '') {
							gentle = add(gentle, Number(val[i].amount))
						}
					}
					this.otherPlanAllAmount = gentle
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.getPayPlan()
			this.getOtherPayPlan()
		},
		methods: {
			show() {
				// dictApi.list({
				// 		parentCode: "1006"
				// 	})
				// 	.then(res => {
				// 		this.optionList = res.result;
				// 	});

				// templateApi.detail(1021)
				// 	.then(res => {
				// 		this.form.comment = res.result.value;
				// 	});
			},
			
			getOtherPayPlan() {
				workOrderApi.all.queryPayPlanOther({
						workOrderId: this.detailsInfo.id
					})
					.then(res => {
						this.otherRepaymentPlan = res.result

					})
			},
			getPayPlan() {
				workOrderApi.all.queryPayPlan({
						workOrderId: this.detailsInfo.id
					})
					.then(res => {
						this.repaymentPlan = res.result

					})
			},
		}
	};
</script>

<style lang="less" scoped>
	::v-deep .el-table .cell {
		padding: 0px;
	}

	.addPlan-ico {
		background: #1b5284;
		font-size: 12px;
		height: 26px;
		display: flex;
		align-items: center;
		padding: 0px 15px;
	}

	.module-head {
		padding: 0 15px;
		min-height: 40px;
		background: linear-gradient(90deg, #0b5fd5 0, #e6f2ff);
		font-size: 20px;
		margin-bottom: 10px;
		color: #fff;
		display: flex;
		align-items: center;

		.isPlan-cn {
			font-size: 14px;
			line-height: 20px;
			border: 1px solid #1b5284;
			color: #1b5284;
			background-color: #fff;
			box-shadow: 0 2px 4px 0 rgba(9, 78, 197, .3);
			padding: 0 15px;
			border-radius: 4px;
			cursor: pointer;
		}
	}
</style>
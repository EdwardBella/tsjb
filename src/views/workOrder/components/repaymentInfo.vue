<template>
	<div>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;flex: 1;">欠款信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<template v-if="$route.path.includes('/portals/details')">
				<el-row>
					<el-col :span="8">
						<el-form-item
							label="确认欠款">{{ detailsInfo.confirmUnPayAmount?(detailsInfo.confirmUnPayAmount+'万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="累计还款">{{addAmount != ''?(addAmount + '万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="投诉欠款">{{detailsInfo.questionMainInfo.govArrears.contractAmount != ''?(detailsInfo.questionMainInfo.govArrears.contractAmount + '万元'):''}}</el-form-item>
					</el-col>
				</el-row>
			</template>
			<template v-else>
				<el-row>
					<el-col :span="8">
						<el-form-item
							label="确认欠款">{{ detailsInfo.confirmUnPayAmount?(detailsInfo.confirmUnPayAmount+'万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="已清欠款">{{detailsInfo.payedAmount?(detailsInfo.payedAmount+'万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="剩余欠款">{{detailsInfo.unPayAmount?(detailsInfo.unPayAmount+'万元'):''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="制定计划">{{ detailsInfo.makePayPlan == '1'?'是':'否'}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="计划还款">{{detailsInfo.makePayPlanAmount?(detailsInfo.makePayPlanAmount+'万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="其他还款">{{detailsInfo.otherAmount?(detailsInfo.otherAmount+'万元'):''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="累计还款">{{addAmount != ''?(addAmount + '万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="尚未还款">{{unAmount != ''?(unAmount + '万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="投诉欠款">{{detailsInfo.questionMainInfo.govArrears.contractAmount != ''?(detailsInfo.questionMainInfo.govArrears.contractAmount + '万元'):''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="detailsInfo.makePayPlan == '1'">
					<el-col :span="24">
						<el-form-item label="" label-width="8px">
							<span
								style="font-size: 16px; color: #323232;font-weight: bold;margin-top: 10px;">计划还款明细：</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="detailsInfo.makePayPlan == '1'">
					<el-col :span="24">
						<el-table :data="repaymentPlan" size="mini" border class="repayment-plan-table"
							style="width: 100%;">
							<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
							<el-table-column prop="planPayTime" label="计划还款日期" width="170"
								align="center"></el-table-column>
							<el-table-column prop="amount" label="还款金额(万元)" width="90" align="center"></el-table-column>
							<el-table-column prop="status" align="center" label="状态">
								<template slot-scope="{row}">
									{{ row.status | repaymentPlanStatus }}
								</template>
							</el-table-column>
							<el-table-column prop="actualPayTime" label="实际还款日期" width="170" align="center">
								<template slot-scope="{row}">
									{{ row.actualPayTime || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="operateTime" label="操作时间" width="170" align="center">
								<template slot-scope="{row}">
									{{ row.operateTime || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="operateUser" label="操作人" align="center">
								<template slot-scope="{row}">
									{{ row.operateUser || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="address" label="操作" width="140" align="center">
								<template slot-scope="{row}">
									<template v-if="$route.path.includes('/portals/details')">
										<el-button v-if="row.actualPayTime" type="primary" plain size="mini"
											@click="previewFile(row)">附件
										</el-button>
									</template>
									<template v-else>
										<el-button v-if="row.actualPayTime" type="primary" plain size="mini"
											@click="previewFile(row)">附件
										</el-button>
										<el-button
											v-if="row.actualPayTime =='' && userInfo.orgCode == detailsInfo.processDepartmentCode"
											type="primary" plain size="mini" @click="submitButton(row)">提交
										</el-button>
										<el-button v-if="userRoles.isLeaderDepartment && row.actualPayTime"
											type="primary" plain size="mini" @click="editButton(row)">修改
										</el-button>
									</template>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
					<el-col :span="24">
						<el-form-item label="按计划总还款">
							<span>{{planAllAmount != ''?(planAllAmount + '万元'):''}}</span>
						</el-form-item>
					</el-col>
				</el-row>


				<el-row v-if="(detailsInfo.status == 5 || detailsInfo.status == 8) && detailsInfo.otherAmount>0">
					<el-col :span="24">
						<el-form-item label="" label-width="8px">
							<div style="display: flex;align-items: center;margin-top: 10px;">
								<span
									style="font-size: 16px; color: #323232;font-weight: bold;margin-right: 20px;">其他还款明细：</span>
								<el-button class="addPlan-ico" icon="el-icon-plus" type="primary"
									v-if="userInfo != null && userInfo.orgCode == detailsInfo.processDepartmentCode"
									@click="addPlan">添加</el-button>
							</div>

						</el-form-item>
					</el-col>
				</el-row>
				<el-row
					v-if="(detailsInfo.status == 5 || detailsInfo.status == 8) && detailsInfo.otherAmount > 0 && otherRepaymentPlan.length > 0">
					<el-col :span="24">
						<el-table :data="otherRepaymentPlan" size="mini" border class="repayment-plan-table"
							style="width: 100%;">
							<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
							<el-table-column prop="amount" label="还款金额(万元)" align="center">
								<template slot-scope="{row}">
									{{ row.amount || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="actualPayTime" label="实际还款日期" width="170" align="center">
								<template slot-scope="{row}">
									{{ row.actualPayTime || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="operateTime" label="操作时间" width="170" align="center">
								<template slot-scope="{row}">
									{{ row.operateTime || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="operateUser" label="操作人" align="center">
								<template slot-scope="{row}">
									{{ row.operateUser || '-' }}
								</template>
							</el-table-column>
							<el-table-column prop="address" label="操作" width="140" align="center">
								<template slot-scope="{row}">
									<template v-if="$route.path.includes('/portals/details')">
										<el-button v-if="row.actualPayTime" type="primary" plain size="mini"
											@click="previewFile(row)">附件
										</el-button>
									</template>
									<template v-else>
										<el-button v-if="row.actualPayTime" type="primary" plain size="mini"
											@click="previewFile(row)">附件
										</el-button>
										<el-button v-if="userRoles.isLeaderDepartment && row.actualPayTime"
											type="primary" plain size="mini" @click="editOtherButton(row)">修改
										</el-button>
									</template>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
					<el-col :span="24"
						v-if="(detailsInfo.status == 5 || detailsInfo.status == 8) && detailsInfo.otherAmount>0">
						<el-form-item label="其他总还款">
							<span>{{otherPlanAllAmount != ''?(otherPlanAllAmount + '万元'):''}}</span>
						</el-form-item>
					</el-col>
				</el-row>
			</template>



		</el-form>

		<!-- 上传还款计划 -->
		<repaymentFuJianDialog v-if="repaymentFuJianDialog.visible" :visible.sync="repaymentFuJianDialog.visible"
			:title="title" :workOrderNo="detailsInfo.workOrderNo" :payInfo="payInfo" :payPlanId="payPlanId"
			@success="successBack">
		</repaymentFuJianDialog>

		<!-- 上传其他还款计划 -->
		<repaymentOtherFuJianDialog v-if="repaymentOtherFuJianDialog.visible"
			:visible.sync="repaymentOtherFuJianDialog.visible" :title="title" :workOrderNo="detailsInfo.workOrderNo"
			:payInfo="payInfo" :workOrderId="workOrderId" :payPlanOtherId="payPlanOtherId" @success="successOtherBack">
		</repaymentOtherFuJianDialog>

		<!-- 预览附件 -->
		<repaymentPlanDialog :visible.sync="repaymentPlanDialog.visible" :workOrderNo="detailsInfo.workOrderNo"
			:attachmentFile="attachmentFile">
		</repaymentPlanDialog>


	</div>

</template>

<script>
	import repaymentPlanDialog from "@/views/workOrder/components/repaymentPlanDialog";
	import repaymentOtherFuJianDialog from "@/views/workOrder/components/repaymentOtherFuJianDialog";
	import repaymentFuJianDialog from "@/views/workOrder/components/repaymentFuJianDialog";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'
	import {
		multiply,
		add,
		subtract,
		divide
	} from "accurate-core";
	import {
		mapState
	} from 'vuex'
	import {
		splxDict
	} from "@/utils/dict";
	import {
		money,
		repaymentPlanStatus,
		txt2HTML
	} from "@/utils/filters";

	export default {
		name: "repaymentInfo",
		filters: {
			money,
			repaymentPlanStatus
		},
		components: {
			repaymentOtherFuJianDialog,
			repaymentPlanDialog,
			repaymentFuJianDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo'],
		data() {
			return {
				repaymentPlan: [],
				otherRepaymentPlan: [],
				repaymentPlanDialog: {
					visible: false,
				},
				repaymentOtherFuJianDialog: {
					visible: false,
				},
				repaymentFuJianDialog: {
					visible: false,
				},
				title: '添加计划还款',
				planAllAmount: 0,
				payPlanId: "",
				payPlanOtherId: "",
				workOrderId: "",
				otherPlanAllAmount: 0,
				attachmentFile: [],
				payInfo: null,

			};
		},
		computed: {
			...mapState(['userInfo', 'userRoles']),
			addAmount() {
				return add(add((this.detailsInfo.payedAmount || 0), (this.planAllAmount || 0)), (this.otherPlanAllAmount ||
					0))
			},
			unAmount() {
				return subtract((this.detailsInfo.confirmUnPayAmount || 0), add(add((this.detailsInfo.payedAmount || 0), (
					this.planAllAmount || 0)), (this.otherPlanAllAmount || 0)))
			}
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
			console.log(this.$route.path, '======================')
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
			/* 新增其他还款金额计划 */
			addPlan() {
				// this.otherRepaymentPlan.push({
				// 	amount: '',
				// 	status: 'NO_PAY',
				// 	actualPayTime: '',
				// 	operateTime: '',
				// 	operateUser: '',
				// });
				this.otherSubmitButton()
			},
			previewFile(row) {
				this.attachmentFile = row.attachmentFile || []
				this.repaymentPlanDialog.visible = true
			},
			submitButton(row) {
				this.title = '添加计划还款'
				this.payInfo = null
				this.payPlanId = row.id
				this.repaymentFuJianDialog.visible = true
			},
			editButton(row) {
				this.title = '修改计划还款'
				this.payPlanId = row.id
				this.payInfo = row
				this.repaymentFuJianDialog.visible = true
			},
			otherSubmitButton() {
				this.title = '添加计划还款'
				this.payInfo = null
				this.workOrderId = this.detailsInfo.id
				this.payPlanOtherId = ""
				this.repaymentOtherFuJianDialog.visible = true
			},
			editOtherButton(row) {
				this.title = '修改计划还款'
				this.payPlanOtherId = row.id
				this.payInfo = row
				this.workOrderId = this.detailsInfo.id
				this.repaymentOtherFuJianDialog.visible = true
			},
			successOtherBack(res) {
				this.getOtherPayPlan()
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
			successBack(res) {
				this.getPayPlan()
			}
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
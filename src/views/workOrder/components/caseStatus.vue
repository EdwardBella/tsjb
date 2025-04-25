<template>
	<div>
		<div class="touming">
			<span class="ls"
				style="min-width: 100px;text-align: center;">{{returnMainStatus(detailsInfo.status)}}</span>
			<span v-if="returnAssistantStatus(detailsInfo.status,detailsInfo.subStatus)" class="ls"
				style="min-width: 100px;text-align: center;">{{returnAssistantStatus(detailsInfo.status,detailsInfo.subStatus)}}</span>
			<div v-if="detailsInfo.workOrderAudit != '' && detailsInfo.workOrderAudit.auditStatus != '审批通过' && detailsInfo.workOrderAudit.auditStatus != '审批不通过'"
				class="repeat"
				style="min-width: 100px;padding: 0px 10px;display: flex;justify-content: center;background-color: #138a43;">
				<span style="margin: 0px;">{{detailsInfo.workOrderAudit.auditStatus}}</span>
			</div>
			<div class="repeat" v-if="surpriseStatusInfo.id != '' && surpriseStatusInfo.superviseStatus == '1'"
				style="width: 100px;padding: 0px;display: flex;justify-content: center;background-color: #138a43;">
				<span style="margin: 0px;">督办</span>
			</div>
			<div class="repeat" v-if="detailsInfo.isDuplicated == 'Y'?true:false">
				<span>疑似重复</span>
				<i v-if="userRoles.isLeaderDepartment" class="el-icon-circle-close" style="cursor: pointer;"
					@click="isDuplicatedClose"></i>
			</div>

			<div class="repeat" v-if="detailsInfo.correctionStatus == '1'?true:false"
				style="width: 100px;padding: 0px;display: flex;justify-content: center;">
				<span style="margin: 0px;">补</span>
			</div>

			<div class="repeat" v-if="detailsInfo.supervisionTag == '1' || detailsInfo.supervisionTag == '3'"
				style="width: 100px;padding: 0px;display: flex;justify-content: center;background-color: #e2a900;">
				<span style="margin: 0px;">跟踪</span>
			</div>
			<div class="repeat" v-if="detailsInfo.exceptionTag == '1' || detailsInfo.exceptionTag == '3'"
				style="width: 100px;padding: 0px;display: flex;justify-content: center;background-color: #e44831;">
				<span style="margin: 0px;">异常</span>
			</div>
			<span class="lb">{{detailsInfo.workOrderNumber || ''}}</span>
			<template v-if="(audit || detailsInfo.auditFlag == 'Y') && isOverTime">
				<div class="time-cn">
					<i class="el-icon-time" style="font-weight: bold;margin-right: 8px;color: #138a43;"></i>
					<p style="font-size: 18px;color: #138a43;">审批剩余时限：<span
							:style="{color:times == '0天0小时0分钟0秒'?'#e44831':'#138a43'}">{{times}}</span></p>
				</div>
			</template>
			<template v-else-if="(detailsInfo.status == '4' || detailsInfo.status == '15') && isOverTime">
				<!-- 待办结&待终止展示倒计时 -->
				<div class="time-cn">
					<i class="el-icon-time" style="font-weight: bold;margin-right: 8px;"></i>
					<p style="font-size: 18px;color: #2b65da;">处理剩余时限：<span
							:style="{color:times == '0天0小时0分钟0秒'?'#e44831':'#2b65da'}">{{times}}</span></p>
				</div>
			</template>
			<template v-else>
				<!-- 待派发&已办结&已终止不展示倒计时 -->
				<div class="time-cn"
					v-if="isOverTime && detailsInfo.status != '21' && detailsInfo.status != '8' && detailsInfo.status != '5'">
					<i class="el-icon-time" style="font-weight: bold;margin-right: 8px;"></i>
					<p style="font-size: 18px;color: #2b65da;">处理剩余时限：<span
							:style="{color:times == '0天0小时0分钟0秒'?'#e44831':'#2b65da'}">{{times}}</span></p>
				</div>
			</template>
		</div>
		<div v-if="detailsInfo.supervisionTag == '1' || detailsInfo.supervisionTag == '3'" class="waring-cn"
			style="margin-top: 10px;">
			<i class="el-icon-warning" style="font-size: 28px;color: #e6a23c;margin-right: 7px;"></i>
			<div style="display: flex;flex-direction: column;font-size: 14px;color: #e6a23c;">
				<span style="font-size: 16px;font-weight: bold;">跟踪中</span>
				<span
					style="line-height: 24px;">{{detailsInfo.supervisionReasons?detailsInfo.supervisionReasons:'案件由于涉及已制定还款计划进入到跟踪状态。'}}</span>
			</div>
		</div>
		<div v-if="detailsInfo.exceptionTag == '1' || detailsInfo.exceptionTag == '3'" class="waring-cn"
			style="margin-top: 10px;">
			<i class="el-icon-warning" style="font-size: 28px;color: #f56c6c;;margin-right: 7px;"></i>
			<div style="display: flex;flex-direction: column;font-size: 14px;color:#f56c6c;;">
				<span style="font-size: 16px;font-weight: bold;">异常</span>
				<span
					style="line-height: 24px;">{{detailsInfo.exceptionReasons?detailsInfo.exceptionReasons:'案件由于未及时履行还款，已被标记为异常，请及时处理异常还款并联系省营商环境主管部门解除异常。'}}</span>
			</div>
		</div>
	</div>


</template>

<script>
	import repaymentPlanDialog from "@/views/workOrder/components/repaymentPlanDialog";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'
	import {
		mapState
	} from 'vuex'
	import {
		splxDict
	} from "@/utils/dict";
	import {
		returnStatus,
		returnMainStatus,
		returnAssistantStatus,
	} from '@/utils/common'

	export default {
		name: "caseStatus",
		components: {
			repaymentPlanDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo', 'surpriseStatusInfo', 'audit'],
		data() {
			return {
				repaymentPlanDialog: {
					visible: false
				},
				repaymentPlan: [],
				isOverTime: false,
				times: '',
				timer: null,
				supervisionReasons: '',
			};
		},
		computed: {
			...mapState(['userRoles', 'userInfo']),
		},
		watch: {
			detailsInfo: {
				handler(val) {
					if (val != null) {
						this.init()

					}
				},
				deep: true,
				immediate: true
			},
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer)
			}
		},
		created() {},
		methods: {
			returnStatus,
			returnMainStatus,
			returnAssistantStatus,
			init() {
				// 到期时间
				let targetDate = ''
				if (this.audit || this.detailsInfo.auditFlag == 'Y') {
					targetDate = this.detailsInfo.auditDeadLine
				} else {
					if (this.detailsInfo.status == '4' || this.detailsInfo.status == '15') {
						targetDate = this.detailsInfo.finishStepDeadline
					} else {
						if (this.detailsInfo.status != '21' && this.detailsInfo.status != '8' && this.detailsInfo.status !=
							'5') {
							if (this.detailsInfo.status == 0 && this.sameCurrentRole(this.detailsInfo
								.pushDepartmentList)) {
								targetDate = this.detailsInfo.previewFeedbackDeadline
							} else {
								targetDate = this.detailsInfo.currentStepDeadline
							}
						}
					}
				}

				if (targetDate == '') {
					this.isOverTime = false
				} else {
					if (this.detailsInfo.status == '3' && this.detailsInfo.subStatus == '7') {
						this.countTimes(targetDate)
					} else {
						if (this.timer) {
							clearInterval(this.timer)
						}
						this.countTimes(targetDate)
						this.timer = setInterval(() => {
							this.countTimes(targetDate)
						}, 1000);
					}


				}
			},
			countTimes(targetDate) {
				// 获取当前时间戳
				const now = new Date().getTime();
				// 解析截止日期时间戳
				const old = new Date(targetDate).getTime()
				const distance = old - now;
				// 结束倒计时
				if (distance <= 0) {
					this.times = '0天0小时0分钟0秒'
					clearInterval(this.timer);

				} else {
					this.isOverTime = true
					const days = Math.floor(distance / (24 * 60 * 60 * 1000));
					const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					const seconds = Math.floor((distance % (1000 * 60)) / 1000);
					this.times = days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
				}
			},
			sameCurrentRole(deptList) {
				if (deptList.length == 0) {
					return false
				}
				let obj = deptList.find(item => item.departmentCode == this.userInfo.orgCode)
				if (obj == undefined) {
					return false
				}
				return true
			},
			confirm(message) {
				return this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				});
			},
			/* 关闭疑似重复 */
			isDuplicatedClose() {
				this.confirm("确认要关闭疑似重复吗？")
					.then(() => workOrderApi.distribute.removeDuplicated({
						workOrderNo: this.detailsInfo.workOrderNo
					}))
					.then(() => {
						this.detailsInfo.isDuplicated = 'N'
					});
			},
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
		}
	};
</script>

<style lang="less" scoped>
	.waring-cn {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		background-color: #fdf6ec;
		margin-bottom: 10px;
	}

	.touming {
		height: 40px;
		font-size: 18px;
		display: flex;
		align-items: center;

		.time-cn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-weight: 700;

			span {
				color: #2b65da;
				font-size: 18px;
				margin-left: 8px;
			}
		}

		.ls {
			background: #2b65da;
			font-size: 16px;
			padding: 0 8px;
			height: 35px;
			line-height: 35px;
			color: #fff;
			border-radius: 3px;
			cursor: pointer;
			margin-right: 8px;
		}

		.repeat {
			display: flex;
			align-items: center;
			background: rgb(245, 91, 35);
			padding: 0 8px;
			border-radius: 3px;
			color: #fff;
			margin-right: 8px;

			span {
				font-size: 16px;
				height: 35px;
				line-height: 35px;
				border-radius: 3px;
				cursor: pointer;
				margin-right: 5px;
			}
		}

		.lb {
			font-size: 18px;
			color: #2b65da;
		}
	}
</style>
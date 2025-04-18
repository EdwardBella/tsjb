<template>
	<div class="work-order-details-buttons">
		<!--    <div class="">-->
		<template v-if="[9].includes(details.status) && isLeaderDepartment">
			<el-button @click="handleRecallApprove(1)" type="primary" plain>不同意撤回</el-button>
			<el-button @click="handleRecallApprove(0)" type="primary">同意撤回</el-button>
		</template>
		<template v-else-if="details.auditFlag === 'N' && details.materialCorrectStatus !== 0">
			<!-- 待受理 回退中 不受理-->
			<!--        <el-button v-permission="['允许编辑案件']" v-if="[0, 1, 6].includes(details.status)" @click="handleShowEditWorkOrderDialog(details)" type="primary" plain>编辑</el-button>-->
			<!-- 待确认 -->
			<el-button v-permission="['允许取消受理']" v-if="[2].includes(details.status) && isLeaderDepartment"
				@click="cancelAcceptDialog.visible = true" type="primary">取消受理</el-button>

			<!-- 待办结 -->
			<template v-if="[4].includes(details.status) && isLeaderDepartment">
				<el-button @click="backDialog.visible = true" type="primary" plain>退回</el-button>
				<el-button @click="finallyDialog.visible = true" type="primary">办结</el-button>
			</template>

			<!-- 已办结 -->
			<!--        <el-button v-permission="['允许取消办结']" v-if="[5].includes(details.status)" @click="cancelFinallyDialog.visible = true" type="primary">取消办结</el-button>-->

			<!-- 不受理 -->
			<el-button v-permission="['允许取消不受理']" v-if="[6].includes(details.status) && isLeaderDepartment"
				@click="handleCancelNoAccept" type="primary">取消不受理</el-button>

			<!-- 待受理 回退中 -->
			<template v-if="[0, 1].includes(details.status) && isLeaderDepartment">
				<el-button @click="notAcceptDialog.visible = true" type="primary" plain>不受理</el-button>
				<el-button @click="transferDialog.visible = true" type="primary">线索移交</el-button>
				<el-button @click="acceptAndTransferDialog.visible = true" type="primary">受理</el-button>
			</template>
		</template>
		<!--    </div>-->
		<!-- 创建编辑弹窗-->
		<createWorkOrderDialog :visible.sync="createWorkOrderDialog.visible" :isEdit="createWorkOrderDialog.isEdit"
			:details="createWorkOrderDialog.details" @success="rePlayLoadData"></createWorkOrderDialog>

		<!-- 不受理案件-->
		<notAcceptDialog :visible.sync="notAcceptDialog.visible" @success="rePlayLoadData"
			:workOrderNo="details.workOrderNo"></notAcceptDialog>

		<!-- 受理案件-->
		<acceptDialog :visible.sync="acceptDialog.visible" @success="rePlayLoadData" :workOrderNo="details.workOrderNo">
		</acceptDialog>

		<!-- 取消受理-->
		<cancelAcceptDialog :visible.sync="cancelAcceptDialog.visible" @success="rePlayLoadData"
			:workOrderNo="details.workOrderNo"></cancelAcceptDialog>

		<!-- 移交案件-->
		<transferDialog :visible.sync="transferDialog.visible" @success="rePlayLoadData"
			:workOrderNo="details.workOrderNo"></transferDialog>

		<!-- 受理办交案件 -> 自办/转办 受理-->
		<acceptAndTransferDialog :visible.sync="acceptAndTransferDialog.visible" @success="rePlayLoadData"
			:workOrderNo="details.workOrderNo" :itemCode="details.itemDetailId"></acceptAndTransferDialog>

		<!-- 转移交办-->
		<transferAndAcceptDialog :visible.sync="transferAndAcceptDialog.visible" @success="rePlayLoadData"
			:workOrderNo="details.workOrderNo"></transferAndAcceptDialog>

		<!-- 中止 -->
		<suspendDialog type="distribute" :visible.sync="suspendDialog.visible" :workOrderNo="details.workOrderNo"
			@success="rePlayLoadData"></suspendDialog>
		<!-- 延期 -->
		<postponeDialog type="distribute" :visible.sync="postponeDialog.visible" :workOrderNo="details.workOrderNo"
			@success="rePlayLoadData"></postponeDialog>
		<!-- 办结 -->
		<finallyDialog :visible.sync="finallyDialog.visible" :workOrderNo="details.workOrderNo"
			@success="rePlayLoadData"></finallyDialog>

		<!-- 退回 -->
		<backDialog :visible.sync="backDialog.visible" :workOrderNo="details.workOrderNo" @success="rePlayLoadData">
		</backDialog>

		<!-- 取消办结 -->
		<cancelFinallyDialog :visible.sync="cancelFinallyDialog.visible" :workOrderNo="details.workOrderNo"
			@success="rePlayLoadData"></cancelFinallyDialog>
	</div>
</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import backDialog from "@/views/workOrder/components/backDialog.vue";
	import cancelFinallyDialog from "@/views/workOrder/components/cancelFinallyDialog.vue";
	import transferAndAcceptDialog from "@/views/workOrder/components/transferAndAcceptDialog.vue";
	import finallyDialog from "@/views/workOrder/components/finallyDialog.vue";
	import detailsDialog from "@/views/workOrder/components/detailsDialog.vue";
	import leaveMessageDialog from "@/views/workOrder/components/leaveMessageDialog.vue";
	import createWorkOrderDialog from "@/views/workOrder/components/createWorkOrderDialog.vue";
	import notAcceptDialog from "@/views/workOrder/components/notAcceptDialog.vue";
	import transferDialog from "@/views/workOrder/components/transferDialog.vue";
	import acceptDialog from "@/views/workOrder/components/acceptDialog.vue";
	import acceptAndTransferDialog from "@/views/workOrder/components/acceptAndTransferDialog.vue";
	import cancelAcceptDialog from "@/views/workOrder/components/cancelAcceptDialog.vue";
	import suspendDialog from "@/views/workOrder/components/suspendDialog.vue";
	import postponeDialog from "@/views/workOrder/components/postponeDialog.vue";
	import * as mixins from "@/utils/mixins";
	import detailsButtonMixin from "@/views/workOrder/components/detailsButtonMixin";
	import {
		mapState
	} from "vuex";
	import {
		rolePermissionsMixin
	} from "@/views/workOrder/mixin";

	export default {
		name: "acceptedButton",
		mixins: [detailsButtonMixin, rolePermissionsMixin],
		components: {
			backDialog,
			cancelFinallyDialog,
			transferAndAcceptDialog,
			finallyDialog,
			detailsDialog,
			leaveMessageDialog,
			createWorkOrderDialog,
			notAcceptDialog,
			transferDialog,
			acceptDialog,
			acceptAndTransferDialog,
			cancelAcceptDialog,
			suspendDialog,
			postponeDialog
		},
		data() {
			return {
				leaveMessageDialog: {
					visible: false
				},
				createWorkOrderDialog: {
					details: {},
					isEdit: false,
					visible: false
				},
				notAcceptDialog: {
					visible: false
				},
				transferDialog: {
					visible: false
				},
				acceptDialog: {
					visible: false
				},
				acceptAndTransferDialog: {
					visible: false
				},
				cancelAcceptDialog: {
					visible: false
				},
				suspendDialog: {
					visible: false
				},
				postponeDialog: {
					visible: false
				},
				finallyDialog: {
					visible: false
				},
				backDialog: {
					visible: false
				},
				cancelFinallyDialog: {
					visible: false
				},
				transferAndAcceptDialog: {
					visible: false
				}
			};
		},
		methods: {
			// 撤回工单审批
			handleRecallApprove(status) {
				this.confirm("确定提交吗？")
					.then(() => workOrderApi.distribute.recallApprove({
						status,
						workOrderId: this.details.id
					}))
					.then(() => this.rePlayLoadData());
			},
			handleShowEditWorkOrderDialog(details) {
				const dialog = "createWorkOrderDialog";
				this[dialog].details = {
					...details
				};
				this[dialog].isEdit = true;
				this.handleShowDialog(dialog);
			},
			handleShowDialog(type, row) {
				this[type].visible = true;
			},
			// 取消不受理
			handleCancelNoAccept() {
				this.confirm("确定取消不受理吗？")
					.then(res => workOrderApi.distribute.cancelReject(this.details.workOrderNo))
					.then(() => this.rePlayLoadData());
			},
		}
	};
</script>

<style lang="less" scoped>
	.buttons {
		display: inline-block;
	}
</style>
<template>
	<el-dialog append-to-body title="添加还款记录" width="640px" top="20px" :visible="visible" @close="handleClose">
		<el-form :model="form" :rules="rules" label-suffix="：" ref="form" class="white-card">
			<el-form-item label="实际还款时间" prop="actualPayTime">
				<el-date-picker style="width: 100%;" v-model="form.actualPayTime" value-format="yyyy-MM-dd" type="date"
					placeholder="请选择还款日期">
				</el-date-picker>
			</el-form-item>
		</el-form>

		<div class="split" style="margin: 30px 0"></div>

		<div class="dialog-footer-btn">
			<el-button @click="handleClose" plain>关闭</el-button>
			<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import {
		addPayRecord
	} from "@/api/workOrder/all";

	export default {
		name: "addRepaymentPlanDialog",
		mixins: [mixins.loading, mixins.form, mixins.dialog],
		props: ["visible", "workOrderNo", "type", "workOrderId", "id"],
		data() {
			return {
				submitting: false,
				form: {
					actualPayTime: "",
				},
				rules: {
					actualPayTime: [{
						required: true,
						message: "请选择"
					}],
				},
				optionList: []
			};
		},
		methods: {
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(() => {
						this.submitting = true;
						return workOrderApi.all.addPayRecord({
							id: this.id,
							...this.form,
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => this.submitting = false);
			}
		}
	};
</script>

<style lang="less" scoped>
	.tips {
		text-align: center;
		margin-bottom: 20px;
	}
</style>
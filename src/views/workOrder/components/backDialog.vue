<!--不受理案件弹窗-->

<template>
	<el-dialog append-to-body v-dialogDrags title="案件撤回" width="640px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" label-width="140px" class="white-card">
			<el-form-item label="撤回备注:" prop="comment">
				<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入详细描述" type="textarea"
					style="width: 100%; height: 150px"></el-input>
			</el-form-item>

			<div class="split"></div>

			<div class="dialog-footer-btn">
				<el-button @click="handleClose" plain>关闭</el-button>
				<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
			</div>
		</el-form>
	</el-dialog>
</template>

<script>
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as templateApi from "@/api/template";
	import {
		dict2Array
	} from "@/utils/common";
	import {
		workOrderPublicIntentionDict
	} from "@/utils/dict";
	import {
		finish
	} from "@/api/workOrder/distribute";

	export default {
		name: "backDialog",
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderNo"],
		data() {
			return {
				form: {
					comment: ""
				},
				rules: {
					comment: [{
						required: true,
						message: "请填写撤回备注"
					}],
				},
				submitting: false
			};
		},
		methods: {
			show() {
				templateApi.detail(1003)
					.then(res => {
						this.form.comment = res.result.value || ''
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form",'确认提交吗？')
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.cancelDistribute({
							...this.form,
							workOrderNo: this.workOrderNo
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
					})
					.finally(() => {
						this.submitting = false;
					});
			}
		}
	};
</script>

<style scoped>

</style>
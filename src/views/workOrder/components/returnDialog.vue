<template>
	<el-dialog append-to-body title="案件退回重办" width="680px" :visible="visible" @close="handleClose">
		<el-form :model="form" :rules="rules" ref="form" class="white-card" label-width="110px">
			<el-form-item label="重办备注：" prop="comment">
				<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入重办备注" type="textarea"
					style="width: 100%; height: 150px"></el-input>
			</el-form-item>
		</el-form>

		<div class="split"></div>
		<div class="dialog-footer-btn">
			<el-button @click="handleClose" plain>关闭</el-button>
			<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";

	export default {
		name: "returnDialog",
		mixins: [mixins.loading, mixins.form, mixins.dialog],
		props: ["visible", "workOrderNo"],
		data() {
			return {
				submitting: false,
				form: {
					comment: ""
				},
				rules: {
					comment: [{
						required: true,
						message: "请填写重办备注"
					}]
				},
			};
		},
		methods: {
			show() {
				templateApi.detail(1010)
					.then(res => {
						this.form.comment = res.result.value;
					});
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(() => {
						this.submitting = true;
						return workOrderApi.distribute.back({
							...this.form,
							workOrderNo: this.workOrderNo
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
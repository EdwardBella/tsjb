<template>
	<el-dialog append-to-body title="发起材料举证" width="680px" top="20px" :visible="visible" @close="handleClose">
		<el-form :model="form" :rules="rules" ref="form" class="white-card" label-width="140px">
			<el-form-item label="举证时限:" prop="limitDay">
				<el-input type="number" v-model.number="form.limitDay" placeholder="请输入举证时限"></el-input>
			</el-form-item>
			<el-form-item label="举证内容:" prop="correctRequirement">
				<el-input v-model="form.correctRequirement" show-word-limit maxlength="300" placeholder="请输入举证内容" type="textarea"
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
		name: "adduceEvidenceDialog",
		mixins: [mixins.loading, mixins.form, mixins.dialog],
		props: ["visible", "workOrderNo"],
		data() {
			return {
				submitting: false,
				form: {
					limitDay: "",
					correctRequirement: ""
				},
				rules: {
					limitDay: [{
							required: true,
							message: "请输入举证时限"
						},
						// {
						// 	validator: (rule, value, callback) => {
						// 		if (!(/^[0-9]*$/.test(value))) {
						// 			callback(new Error("请输入正整数"));
						// 			return
						// 		}

						// 		if (value < 1) {
						// 			callback(new Error("请输入大于0的整数"));
						// 			return true;
						// 		}
						// 		if (value > 30) {
						// 			callback(new Error("最多延期30个自然日，请重新确认"));
						// 			return true;
						// 		}
						// 		callback();

						// 	}
						// }
					],
					correctRequirement: [{
						required: true,
						message: "请填写举证内容"
					}]
				},
				optionList: []
			};
		},
		methods: {
			show() {
				// dictApi.list({
				// 		parentCode: "1004"
				// 	})
				// 	.then(res => {
				// 		this.optionList = res.result;
				// 	});

				templateApi.detail(1022)
					.then(res => {
						this.form.correctRequirement = res.result.value;
					});
			},
			handleSubmit() {
				// if (this.form.limitDay > 30) return this.$modal.msgError("最多延期30个自然日，请重新确认");

				this.validateAndConfirm("form",'确认提交吗？')
					.then(() => {
						this.submitting = true;
						return workOrderApi.distribute.updatematerial({
							...this.form,
							workOrderId: this.workOrderNo
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
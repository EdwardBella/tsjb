<template>
	<el-dialog append-to-body title="添加回访记录" width="750px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
			<el-form-item label="回访日期：" prop="evaluateDate">
				<el-date-picker v-model="form.evaluateDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="回访结果：" prop="evaluateResult">
				<el-radio-group v-model="form.evaluateResult">
					<el-radio label="satisfaction">满意</el-radio>
					<el-radio label="common">基本满意</el-radio>
					<el-radio label="noSatisfaction">不满意</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注：" prop="evaluateNotes">
				<el-input v-model="form.evaluateNotes" show-word-limit maxlength="300" placeholder="请输入"
					type="textarea" style="width: 100%; height: 100px"></el-input>
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
	import * as mixins from '@/utils/mixins'
	import * as workOrderApi from '@/api/workOrder/index'
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import {
		updateMaterial
	} from '@/api/workOrder/distribute'

	export default {
		name: 'giveUpDialog',
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderNo'],
		data() {
			return {
				optionList: [],
				form: {
					evaluateDate: '',
					evaluateResult: 'satisfaction',
					evaluateNotes: ''
				},
				rules: {
					evaluateDate: [{
						required: true,
						message: '请选择'
					}],
					evaluateResult: [{
						required: true,
						message: '请选择'
					}],
					evaluateNotes: [{
						required: true,
						message: '请输入'
					}]
				},
				submitting: false,
			}
		},
		methods: {
			show() {
				// dictApi.list({
				// 		parentCode: "1020"
				// 	})
				// 	.then(res => {
				// 		this.optionList = res.result;
				// 	});

				// templateApi.detail(1019)
				// 	.then(res => {
				// 		this.form.giveUpReason = res.result.value
				// 	})
			},
			handleSubmit() {
				this.validateAndConfirm("form",'确认提交吗？')
					.then(res => {
						this.submitting = true;
						return workOrderApi.all.addEvaluate({
							...this.form,
							workOrderNo: this.workOrderNo
						})
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
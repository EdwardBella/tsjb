<template>
	<el-dialog append-to-body title="发起督办" width="750px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="120px">
			<el-form-item label="督办类型：" prop="superviseType">
				<el-radio-group v-model="form.superviseType">
					<el-radio label="全程督办">全程督办</el-radio>
					<el-radio label="重点督办">重点督办</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="督办内容：" prop="content">
				<el-input v-model="form.content" show-word-limit maxlength="300" placeholder="请输入" type="textarea"
					style="width: 100%; height: 100px"></el-input>
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
					superviseType: '全程督办',
					content: ''
				},
				rules: {
					superviseType: [{
						required: true,
						message: '请选择督办类型'
					}],
					content: [{
						required: true,
						message: '请输入督办内容'
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

				templateApi.detail(1025)
					.then(res => {
						this.form.content = res.result.value
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.finished.addSuperviseHandle({
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
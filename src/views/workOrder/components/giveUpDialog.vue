<template>
	<el-dialog append-to-body v-dialogDrags title="撤回于放弃" width="750px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
			<el-form-item label="放弃类型:" prop="giveUpType">
				<el-select v-model="form.giveUpType" style="width: 100%;" placeholder="请选择部门" clearable>
					<el-option v-for="item in optionList" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="放弃原因:" prop="giveUpReason">
				<el-input v-model="form.giveUpReason" show-word-limit maxlength="300" placeholder="请输入修改内容"
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
					giveUpType: '',
					giveUpReason: ''
				},
				rules: {
					giveUpReason: [{
						required: true,
						message: '请输入放弃原因'
					}],
					giveUpType: [{
						required: true,
						message: '请选择放弃类型'
					}]
				},
				submitting: false,
			}
		},
		methods: {
			show() {
				dictApi.list({
						parentCode: "1020"
					})
					.then(res => {
						this.optionList = res.result;
					});

				templateApi.detail(1019)
					.then(res => {
						this.form.giveUpReason = res.result.value
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.giveUp({
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
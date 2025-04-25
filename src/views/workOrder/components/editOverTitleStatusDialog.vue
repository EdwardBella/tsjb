<template>
	<el-dialog append-to-body title="修改结案状态" width="550px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
			<el-form-item label="结案状态:" prop="finishStatus">
				<el-select v-model="form.finishStatus" style="width: 100%;" placeholder="请选择部门" clearable>
					<el-option v-for="item in optionList" :key="item.id" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
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
					finishStatus: '',
				},
				rules: {
					finishStatus: [{
						required: true,
						message: '请选择结案状态'
					}]
				},
				submitting: false,
			}
		},
		methods: {
			show() {
				dictApi.list({
						parentCode: "1009"
					})
					.then(res => {
						this.optionList = res.result;
					});
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.finished.modifyFinishStatus({
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
<template>
	<el-dialog append-to-body title="案件名称修改" width="560px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
			<el-form-item label="案件名称:" prop="title">
				<el-input v-model="form.title" show-word-limit maxlength="40" placeholder="请输入" type="textarea"
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
		props: ['visible', 'workOrderId', 'title'],
		data() {
			return {
				optionList: [],
				form: {
					title: '',
				},
				rules: {
					title: [{
						required: true,
						message: '请输入案件名称'
					}],
				},
				submitting: false,
			}
		},
		watch: {
			title: {
				handler(val) {
					this.form.title = val || ''
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			handleSubmit() {
				this.validateAndConfirm("form",'确认提交吗？')
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.modifyWorkOrderTitle({
							...this.form,
							workOrderId: this.workOrderId
						})
					})
					.then(() => {
						this.$emit("success", this.form.title);
						this.handleClose()
					})
					.finally(() => {
						this.submitting = false;
					});
			}
		}
	};
</script>

<style scoped lang="less">
	::v-deep .white-card .el-form-item__label {
		line-height: 42px !important;
	}
</style>
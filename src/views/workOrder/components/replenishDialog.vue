<template>
	<el-dialog append-to-body v-dialogDrags title="发起材料补正" width="750px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
			<el-form-item label="补正时限:" prop="limitDay">
				<div style="display: flex;align-items: center;">
					<el-input type="number" placeholder="最大时限不超过30日" v-model.trim="form.limitDay"></el-input>
					<span style="font-size: 16px;color: #323232;">日</span>
				</div>

			</el-form-item>
			<el-form-item label="修改内容:" prop="modifyComment">
				<el-input v-model="form.modifyComment" show-word-limit maxlength="300" placeholder="请输入修改内容"
					type="textarea" style="width: 100%; height: 100px"></el-input>
			</el-form-item>
			<el-form-item label="补正内容:" prop="correctionComment">
				<el-input v-model="form.correctionComment" show-word-limit maxlength="300" placeholder="请输入补正内容"
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
	import * as templateApi from "@/api/template";
	import {
		updateMaterial
	} from '@/api/workOrder/distribute'

	export default {
		name: 'replenishDialog',
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderNo'],
		data() {
			return {
				form: {
					limitDay: '',
					modifyComment: '',
					correctionComment: '',
				},
				rules: {
					limitDay: [{
						required: true,
						message: '请输入补正时限'
					}, {
						validator: (rule, value, callback) => {
							if (!(/^[0-9]*$/.test(value))) {
								callback(new Error("请输入正整数"));
								return
							}

							if (value < 1) {
								callback(new Error("请输入大于0的整数"));
								return true;
							}
							if (value > 30) {
								callback(new Error("要求补正时限最多30个自然日，请重新确认"));
								return true;
							}
							callback();

						}
					}]
				},
				submitting: false,
				pickerOptions: {
					disabledDate: (time) => time.getTime() < Date.now() - 86400000
				}
			}
		},
		methods: {
			show() {
				templateApi.detail(1017)
					.then(res => {
						this.form.modifyComment = res.result.value
					})
				templateApi.detail(1018)
					.then(res => {
						this.form.correctionComment = res.result.value
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.goBack({
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
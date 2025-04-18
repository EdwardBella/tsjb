<template>
	<el-dialog title="绑定新手机号" width="640px" top="20px" :visible="visible" @close="handleClose">
		<div>
			<el-form ref="form" :model="form" :rules="rules">
				<el-form-item label="新手机号：" prop="name">{{form.phone}}</el-form-item>

				<el-form-item label="验证码：" prop="code">
					<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
						<el-input v-model="form.code" maxlength="4" placeholder="请输入验证码"></el-input>
						<el-button @click="handleClose" type="primary" style="margin-left: 16px">发送验证码</el-button>
					</div>
				</el-form-item>
			</el-form>

			<div class="split" style="margin: 30px 0"></div>

			<div class="dialog-footer-btn">
				<el-button @click="handleClose" type="primary" plain>关闭</el-button>
				<el-button @click="handleSubmit" :disabled="hasError" :loading="submitting"
					type="primary">提交</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from '@/utils/mixins'

	export default {
		name: 'verifyPhoneDialog',
		mixins: [mixins.dialog, mixins.form],
		data() {
			return {
				form: {},
				rules: []
			}
		},
		methods: {
			handleSubmit() {
				this.submitting = true
				this.validateAndConfirm('form','确认提交吗？')
					.then(() => {

					})
			}
		}
	}
</script>

<style scoped>

</style>
<template>
	<el-dialog :title="title" width="640px" :visible="visible" :show-close="isShowClose"
		@close="handleClose">
		<div>
			<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="120px">
				<el-alert v-if="type === 1" title="【安全提示】为了您的账号安全，您必须绑定手机号后使用本系统" :closable="false" type="error">
				</el-alert>
				<el-form-item v-if="type === 2 && step === 1" label="当前手机号：" prop="telephone">
					{{ form.telephone }}
				</el-form-item>
				<el-form-item v-else label="新手机号：" prop="telephone">
					<el-input v-model="form.telephone" placeholder="请输入新手机号" style="width: 100%;"></el-input>
				</el-form-item>

				<el-form-item label="验证码：" prop="code">
					<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
						<el-input v-model="form.code" maxlength="6" placeholder="请输入验证码"></el-input>
						<el-button @click="handleSendCode" :disabled="sending || second < 60" :loading="sending"
							type="primary" style="margin-left: 16px">{{ btnTxt }}</el-button>
					</div>
				</el-form-item>
			</el-form>

			<div class="split"></div>

			<div class="dialog-footer-btn">
				<el-button v-if="type === 2" @click="handleClose" plain>关闭</el-button>
				<el-button @click="handleSubmit" :loading="submitting || btnSubmitting" type="primary">提交</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from '@/utils/mixins'
	import * as commonAPI from '@/api/common'
	import * as userManageAPI from '@/api/userManage'
	import * as validators from '@/utils/validators'
	import {
		checkPermission
	} from '@/utils/common'

	export default {
		name: 'bindPhoneDialog',
		mixins: [mixins.dialog, mixins.form],
		props: {
			type: {
				type: Number,
				default: 1
			}, // 1.绑定新手机号 2.更换绑定手机号
			telephone: {
				type: String
			},
			systemId: {
				type: [String, Number]
			},
			btnSubmitting: {
				type: Boolean,
				default: false
			}
		},
		data() {
			const that = this
			return {
				submitting: false,
				sending: false,
				step: 2, // 更换绑定手机号步骤，1.验证当前手机号  2.绑定手机号
				form: {
					telephone: '',
					code: ''
				},
				second: 60,
				rules: {
					telephone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'change'
						},
						{
							validator: validators.phone()
						},
						{
							validator(rule, value, callback) {
								if ((that.type === 1 || that.step === 2) && that.telephone === value) {
									callback(new Error('新号码与当前手机号一致'))
								} else {
									callback()
								}
							}
						}
					],
					code: {
						required: true,
						message: '请输入验证码',
						trigger: 'change'
					}
				}
			}
		},
		computed: {
			btnTxt() {
				return this.second < 60 ? `${this.second}s` : '发送验证码'
			},
			title() {
				return (this.type === 2 && this.step === 1) ? '验证当前手机号' : '绑定新手机号'
			},
			isShowClose() {
				return this.type === 2 || checkPermission('允许取消手机绑定')
			}
		},
		watch: {
			step() {
				this.resetForm()

			}
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			show() {
				this.form.telephone = this.telephone
			},
			hide() {
				this.resetForm()
				this.step = 1
			},
			resetForm() {
				this.resetFields('form')
				this.form.telephone = ''
				clearInterval(this.timer)
				this.second = 60
			},
			startCountdown() {
				this.second--
				this.timer = setInterval(() => {
					this.second--
					if (this.second === 0) {
						this.second = 60
						clearInterval(this.timer)
					}
				}, 1000)
			},
			async handleSendCode() {
				try {
					if (this.type === 1 || this.step === 2) {
						await this.validateField('form', 'telephone')
					}
					this.sending = true
					if (this.type === 1 || this.step === 2) {
						const r = await userManageAPI.verifyByFiled({
							systemId: this.systemId,
							verifyFiled: 4,
							filedValue: this.form.telephone
						})
						if (r.code > 0) {
							const message = r.msg || '异常错误'
							this.$modal.msgError(message)
							throw new Error(message)
						}
					}

					await commonAPI.sendTelCode({
						telephone: this.form.telephone,
						type: this.type
					})

					this.$modal.msgSuccess('发送成功')
					this.startCountdown()
				} finally {
					this.sending = false
				}
			},
			async handleSubmit() {
				try {
					await this.validate('form')
					this.submitting = true
					await commonAPI.checkTelephoneCode({
						...this.form,
						type: this.type
					})

					if (this.type === 2 && this.step === 1) {
						this.step = 2
					} else {
						// const formData = new FormData()
						// formData.append(
						//   'AddUserVO',
						//   JSON.stringify({
						//     telephone: this.form.telephone
						//   })
						// )
						// await userManageAPI.addOrUpdate(formData)
						// this.$modal.msgSuccess('修改成功')
						this.$emit('success', this.form.telephone)
					}
				} catch (e) {
					console.error(e)
				} finally {
					this.submitting = false
				}

			}
		}
	}
</script>

<style scoped>

</style>
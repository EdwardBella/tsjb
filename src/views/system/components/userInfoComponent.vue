<template>
	<el-form :model="userForm" :rules="rules" class="user__form" label-width="100px" ref="userFrom">
		<el-form-item label="头像:">
			<div class="user_imageInfo">
				<div class="user__image">
					<img alt id="portrait1" src="~img/userIcon/defaultHeadBg.png"
						style="width: 60px; height: 60px; border-radius: 50%" v-if="img == 1" />
					<img alt id="portrait" src="~img/userIcon/defaultHeadBg.png"
						style="width: 60px; height: 60px; border-radius: 50%" v-show="img == 3" />
				</div>
				<div class="user__image-element">
					<el-button @click="uploadClick" round size="mini" style="width: 100px">点击上传</el-button>
					<!-- :disabled="accountSystem === '2'" -->
					<div class="el-upload__tip">支持上传png、jpg，大小不超过1M</div>
				</div>
			</div>
			<input accept=".jpg, .png" id="uoploadPicture" style="display: none" type="file" />
		</el-form-item>
		<el-form-item label="用户名:" prop="loginName" v-if="type == 'add'">
			<el-input maxlength="50" placeholder="请输入用户名" v-model="userForm.loginName"></el-input>
		</el-form-item>
		<el-form-item label="用户名:" class="loginName" v-if="type == 'edit'">{{ userForm.loginName }}</el-form-item>
		<el-form-item label="姓名:" prop="name">
			<el-input @input="check_inputLimits(userForm.name, 'name')" maxlength="50" placeholder="请输入姓名"
				v-model="userForm.name"></el-input>
			<!--      <span v-else>{{ userForm.name }}</span>-->
		</el-form-item>
		<el-form-item label="所属组织:" prop="region">
			<el-cascader ref="region" :options="dataList" :props="defaultProps" @focus="handleChange" :append-to-body="false"
				change-on-select placeholder="请选择组织类型" v-model="userForm.region" @change="regionValidator"
				:disabled="!setRoleLimit"></el-cascader>
		</el-form-item>

		<el-form-item label="邮箱:" prop="email">
			<el-input maxlength="50" placeholder="请输入邮箱" v-model="userForm.email"></el-input>
			<!-- :disabled="accountSystem === '2'" -->
		</el-form-item>
		<el-form-item v-if="hasTelephoneFormItem" label="手机号:" prop="telephone">
			<el-input maxlength="11" placeholder="请输入手机号" v-model="userForm.telephone"></el-input>
			<!--  :disabled="accountSystem === '2'" -->
			<!-- v-if="isDefaultPsd == 1" -->
		</el-form-item>
		<el-form-item v-if="hasTelephoneFormItem" label="" prop="">
			<div style="color: #7f8fa4;">至少填写一项联系方式</div>
		</el-form-item>
	</el-form>
</template>

<script>
	import {
		userDeptTree,
		verifyByFiled
	} from "@/api/userManage";
	import * as validators from '@/utils/validators'

	export default {
		name: "userInfoComponent",
		components: {},
		props: {
			type: {
				type: String,
				default: "add"
			},
			userForm: {
				type: Object,
				default: Object
			},
			oldEmail: {
				type: String,
				default: ""
			},
			oldTelephone: {
				type: String | Number,
				default: ""
			},
			setRoleLimit: {
				type: Boolean,
				default: true
			},
			hasTelephoneFormItem: {
				type: Boolean,
				default: true
			}
		},
		data() {
			const numberValidate = (rule, value, callback) => {
				this.userForm.telephone = JSON.stringify(value).replace(/[^0-9]/g, '')
				callback()
			}
			const typeValidate = (rule, value, callback, type) => {
				let verifyFiled = 0;
				for (let key in type) {
					if (key == 'loginName') {
						verifyFiled = 1;
					} else if (key == 'name') {
						verifyFiled = 2;
					} else if (key == 'email') {
						verifyFiled = 3;
					} else if (key == 'telephone') {
						verifyFiled = 4;
					}
				}
				if (value != '' && value != this.oldEmail && value != this.oldTelephone) {
					verifyByFiled({
						verifyFiled: verifyFiled,
						systemId: 1,
						filedValue: value
					}).then(res => { //systemId的值目前写死
						if (res.code == 0) {
							callback()
							return
						} else {
							callback(new Error(res.msg))
						}
					}).catch(error => {
						console.log(error)
					})
				} else if (verifyFiled != 1) {
					callback()
				}
			}
			return {
				rules: {
					loginName: [{
							required: true,
							trigger: 'blur',
							message: '用户名不能为空'
						},
						{
							min: 1,
							max: 50,
							pattern: /^[a-zA-Z0-9_]+$/, // 数字，字母，下划线
							message: '请输入英文,数字,下划线及其组合的用户名',
							trigger: 'blur'
						},
						{
							validator: typeValidate,
							trigger: 'blur'
						}
					],
					region: {
						type: 'array',
						required: true,
						message: '请选择该用户的所属组织',
						trigger: 'change'
					},
					name: [{
							required: true,
							message: '姓名不能为空',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
							message: '请输入1-50位非空格字符',
							trigger: 'blur'
						},
						{
							validator: typeValidate,
							trigger: 'blur'
						}
					],

					email: [{
							required: false,
							message: '邮箱不能为空',
							trigger: 'blur'
						},
						{
							pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
							message: '请输入正确的电子邮箱',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 50,
							message: '邮箱地址长度不能超过50位',
							trigger: 'blur'
						},
						{
							validator: typeValidate,
							trigger: 'blur'
						}
					],
					telephone: [{
							required: false,
							message: '手机号不能为空',
							trigger: 'blur'
						},
						{
							validator: validators.phone(),
							message: '请输入正确的手机号',
							trigger: 'blur'
						},
						// {
						//   message: '请输入正确的手机号',
						//   pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
						//   trigger: 'blur'
						// },
						{
							validator: typeValidate,
							trigger: 'blur'
						}
					]
				},
				dataList: [],
				defaultProps: {
					children: 'children',
					label: 'name',
					value: 'id'
				},
				img: 1,
				isUpload: false
			};
		},
		computed: {},
		watch: {
			'userForm.region': {
				handler(val) {
					console.log(val)
				},
				immediate: true
			},
		},
		methods: {
			uploadClick() {
				document.getElementById('uoploadPicture').click()
			},
			//获取图片
			getImage() {
				const vm = this
				document.getElementById('uoploadPicture').onchange = function() {
					const imgFile = this.files[0]
					const arr = imgFile.name.split('.')
					if (
						arr[arr.length - 1].toLowerCase() !== 'jpg' &&
						arr[arr.length - 1].toLowerCase() !== 'png'
					) {
						vm.$modal.msgError('请上传文件格式为jpg、png格式的图片！')
						return
					}
					const isLt1M = imgFile.size / 1024 / 1024 < 1
					if (!isLt1M) {
						vm.$modal.msgError('图片大小不能超过1M')
						this.value = ''
						return
					}
					vm.showTips = false;
					vm.showTipsError = '';
					vm.img = 3
					vm.$forceUpdate()
					const fr = new FileReader()
					fr.onload = function() {
						document.getElementById('portrait').src = fr.result
					}
					fr.readAsDataURL(imgFile)
					vm.userForm.file = imgFile
					vm.isUpload = true
				}
			},
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpg' || file.type === 'image/png'
				const isLt1M = file.size / 1024 / 1024 < 1

				if (!isJPG) {
					this.$modal.msgError('上传头像图片只能是 JPG、PNG 格式!')
				}
				if (!isLt1M) {
					this.$modal.msgError('图片大小不能超过1M')
				}
				return isJPG && isLt1M
			},
			// 输入限制
			check_inputLimits(obj, type) {
				if (type === 'name') {
					this.userForm.name = this.userForm.name.replace(/[ ]/, '')
				}
			},
			//获取组织列表
			handleChange() {
				const that = this
				userDeptTree().then(res => {
					const {
						code,
						msg,
						result
					} = res
					if (code === 0) {
						let dataList = [result]
						that.recursionGroup(dataList)
						that.userForm.region.splice(0, that.userForm.region.indexOf(dataList[0].id))
						that.dataList = dataList
						console.log(dataList, '=====================')
						that.$forceUpdate()
					} else {
						that.$modal.msgError(msg)
					}
				})
			},
			// 格式化数据
			recursionGroup(data) {
				if (data.length > 0) {
					data.forEach(item => {
						item.value = item.id
						item.label = item.name
						if (item.children && item.children.length > 0) {
							this.recursionGroup(item.children)
						} else {
							delete item.children
						}
					})
				} else {
					delete data.children
				}
			},
			regionValidator() {
				const codeID = this.userForm.region[this.userForm.region.length - 1]
				this.getOrgName(this.userForm.region, this.dataList, codeID)
				console.log(this.userForm.region);
			},
			// 格式化组织
			getOrgName(code, dataList, codeID) {
				dataList.forEach((item, i) => {
					// if (Number(item.level) == code.length) {
					if (item.id == codeID) {
						console.log(item);
						this.userForm.orgName = item.label
						this.userForm.systemName = item.systemName
						this.userForm.systemId = item.systemId
						this.userForm.accountSystem = item.accountSystem
					} else {
						if (item.children && item.children.length > 0) {
							this.getOrgName(code, item.children, codeID)
						}
					}
				})
			},
			//清除验证信息
			clearFormValidate() {
				this.$refs.userFrom.clearValidate()
			},
		},
		created() {
			console.log(this.userForm, '99999999999999999999999');


		},
		mounted() {
			this.getImage()
		},
	};
</script>

<style scoped lang="less">
	.user_imageInfo {
		display: flex;

		.user__image {
			width: 100px;
		}

		.user__image-element {
			align-items: flex-start;
			padding-left: 10px;
		}
	}
</style>
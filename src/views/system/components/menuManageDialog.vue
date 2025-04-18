<template>
	<el-dialog :title="title" width="840px" :visible="visible" @close="handleClose" destroy-on-close>
		<el-form ref="form" :model="form" :rules="rules" label-width="120px" class="white-card">
			<el-row>
				<el-col :span="12">
					<el-form-item label="名称：" prop="menuName">
						<el-input v-model="form.menuName" maxlength="4" placeholder="请输入名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="请求地址：" prop="menuUrl">
						<el-input v-model="form.menuUrl" placeholder="请输入请求地址"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单编号：" prop="menuCode">
						<el-input type="number" v-model="form.menuCode" maxlength="4" placeholder="请输入菜单编号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="排序：" prop="orderby">
						<el-input type="number" v-model="form.orderby" maxlength="4" placeholder="请输入排序"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="父级编号：" prop="pid">
						<el-cascader v-model="form.pid" ref="menuList" :options="menuArr" clearable
							:props="{ checkStrictly: true  ,expandTrigger: 'hover',emitPath: false,value:'id',label:'menuName'}"
							placeholder="请选择" @change="statusChanged" style="width: 100%;"></el-cascader>

					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否是菜单：" prop="menuType">
						<el-select v-model="form.menuType" placeholder="请选择" style="width: 100%;">
							<el-option label="是" value="1"></el-option>
							<el-option label="否" value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态：" prop="status">
						<el-select v-model="form.status" placeholder="请选择" style="width: 100%;">
							<el-option label="启用" value="1"></el-option>
							<el-option label="禁用" value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>


		</el-form>

		<div class="split"></div>

		<div class="dialog-footer-btn">
			<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
			<el-button @click="handleClose" plain>取消</el-button>

		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from '@/utils/mixins'
	import * as menuAPI from "@/api/menu"
	export default {
		name: 'menuManageDialog',
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderId', 'title', 'rowInfo', 'menuArr'],
		watch: {
			rowInfo: {
				handler(val) {
					if (val != null) {
						this.form = val
					} else {
						this.resetForm()
					}
				},
				deep: true,
				immediate: true
			},
		},
		data() {
			return {
				submitting: false,
				form: {
					id: '',
					menuName: "",
					menuUrl: "",
					menuCode: "",
					orderby: 0,
					pid: "",
					menuType: '1',
					status: '1',
				},
				rules: {
					menuName: [{
						required: true,
						message: "请输入"
					}],
					menuUrl: [{
						required: true,
						message: "请输入"
					}],
					menuCode: [{
						required: true,
						message: "请输入"
					}],
					orderby: [{
						required: true,
						message: "请输入"
					}],
					menuType: [{
						required: true,
						message: "请输入"
					}],
					status: [{
						required: true,
						message: "请选择"
					}],
				}
			}
		},
		methods: {
			resetForm() {
				this.form.id = ''
				this.form.menuName = ''
				this.form.menuUrl = ''
				this.form.menuCode = ''
				this.form.orderby = 0
				this.form.pid = ''
				this.form.menuType = '1'
				this.form.status = '1'
			},
			handleSubmit() {
				this.submitting = true
				this.validateAndConfirm('form')
					.then(() => {
						const form = {
							...this.form
						};
						console.log(form,'99999999999999999')
						return menuAPI.addUpdateMenu(form);
					}).then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => {
						this.submitting = false;
					});
			},
			statusChanged(value) {
				this.$refs.menuList.dropDownVisible = false
			},

		}
	}
</script>

<style scoped>

</style>
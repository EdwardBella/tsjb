<template>
	<el-dialog title="菜单权限" width="840px" :visible="visible" @close="handleClose" destroy-on-close>
		<el-form ref="form" :model="form" :rules="rules" label-width="120px" class="white-card">
			<el-row>
				<el-col :span="24">
					<el-form-item label="菜单权限：" prop="menuIds">
						<el-cascader v-model="form.menuIds" ref="menuList" :options="menuList" clearable collapse-tags
							:props="{ checkStrictly: true ,multiple: true,emitPath: false,value:'id',label:'menuName'}"
							placeholder="请选择" style="width: 100%;"></el-cascader>
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
	import * as userRoleRelationAPI from "@/api/userRoleRelation";
	export default {
		name: 'menuRoleDialog',
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderId', 'title', 'roleId', 'menuList'],
		watch: {
			roleId: {
				handler(val) {
					console.log(val,'[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]')
					if (val != '') {
						this.getDetails()
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
					menuIds: []
				},
				rules: {
					menuIds: [{
						required: true,
						message: "请选择"
					}],
				}
			}
		},
		created() {
			
		},
		methods: {
			getDetails() {
				userRoleRelationAPI.listRoleMenuIds({
					id: this.roleId
				}).then(res => {
					this.form.menuIds = res.result
				});
			},
			handleSubmit() {
				this.submitting = true
				this.validateAndConfirm('form')
					.then(() => {
						const form = {
							...this.form,
							roleId: this.roleId
						};
						return userRoleRelationAPI.authRoleMenu(form);
					}).then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => {
						this.submitting = false;
					});
			},

		}
	}
</script>

<style scoped lang="less">
	::v-deep .el-input__inner {
		height: auto !important;
	}
</style>
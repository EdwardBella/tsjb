<template>
	<el-dialog title="编辑角色" width="640px" :visible="visible" @close="handleClose" destroy-on-close>
		<div>
			<el-form ref="form" :model="form" :rules="rules" label-width="110px" class="white-card">
				<el-form-item label="角色名称:" prop="roleName">
					<el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
				</el-form-item>

				<el-form-item label="角色描述:" prop="remark">
					<el-input v-model="form.remark" placeholder="请输入角色描述"></el-input>
				</el-form-item>
			</el-form>

			<div class="split"></div>

			<div class="dialog-footer-btn">
				<el-button @click="handleClose" plain>关闭</el-button>
				<el-button @click="handleSubmit" :loading="submitting" type="primary">提交</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import * as userRoleRelationAPI from "@/api/userRoleRelation";
	import * as mixins from "@/utils/mixins";
	import {
		accountRoleTypeTypeDict
	} from "@/utils/dict";
	import {
		dict2Array
	} from "@/utils/common";

	export default {
		name: "roleEditor",
		mixins: [mixins.dialog, mixins.form],
		props: {
			details: {
				type: Object,
				default: Object
			}
		},
		data() {
			return {
				form: {
					roleName: '',
					remark: ''
				},
				submitting: false,
				rules: {
					roleName: [{
						required: true,
						message: "请输入"
					}],
				}
			};
		},
		methods: {
			show() {
				// if (this.details.roles) {
				// 	this.form.roles = this.details.roles.split(",");
				// } else {
				// 	this.form.roles = []
				// }
			},
			handleSubmit() {
				this.submitting = true;
				this.validateAndConfirm("form",'确认提交吗？')
					.then(() => userRoleRelationAPI.add(this.form))
					.then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => this.submitting = false);

			}
		}
	};
</script>

<style scoped>

</style>
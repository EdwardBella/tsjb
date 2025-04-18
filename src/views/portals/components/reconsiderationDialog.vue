<!--撤回案件-->

<template>
	<el-dialog title="申请复核" width="750px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card">
			<el-form-item label="理由：" prop="comment">
				<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入复核理由"
					type="textarea" style="width: 100%; height: 150px"></el-input>
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
	import * as mixins from "@/utils/mixins";
	import * as portalWorkOrderAPI from "@/api/portals/workOrder";
	import {
		fileSize,
		getCMSUserInfo,
		postPortalsHeight
	} from "@/utils/common";
	import {
		repeatCheck
	} from "@/api/portals/workOrder";
	import * as fileApi from "@/api/file";

	export default {
		name: "reconsiderationDialog",
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderId"],
		data() {
			return {
				fileList: [],
				uploading: false,
				form: {
					comment: "",
				},
				rules: {
					comment: [{
						required: true,
						message: "请填写复核理由"
					}],
				},
				submitting: false
			};
		},
		methods: {
			show() {},
			handleSubmit() {
				this.validate("form")
					.then(() => {
						const cmsUserInfo = getCMSUserInfo()
						this.submitting = true;
						return portalWorkOrderAPI.rejectReview({
							...this.form,
							workOrderNo: this.workOrderId
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
						this.$alert('提交成功', '提示', {
							customClass: 'top20'
						})
					})
					.finally(() => {
						this.submitting = false;
					});
			},
		}
	};
</script>

<style scoped>

</style>
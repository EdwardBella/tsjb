<!--不受理案件弹窗-->

<template>
	<el-dialog append-to-body title="终止案件" width="640px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="110px">
			<el-form-item label="终止备注：" prop="remark">
				<el-input v-model="form.remark" show-word-limit maxlength="300" placeholder="请输入详细描述" type="textarea"
					style="width: 100%; height: 150px"></el-input>
			</el-form-item>
			<el-form-item label="结案状态：" prop="finishStatus">
				<el-select v-model="form.finishStatus" placeholder="请选择" style="width: 100%">
					<el-option v-for="item in overStatusArr" :key="item.id" :label="item.name"
						:value="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="案件类型：" prop="workOrderType">
				<el-select v-model="form.workOrderType" placeholder="请选择" style="width: 100%">
					<el-option v-for="item in caseTypeStatusArr" :key="item.id" :label="item.name"
						:value="item.name"></el-option>
				</el-select>
			</el-form-item>
			<div class="split"></div>

			<div class="dialog-footer-btn">
				<el-button @click="handleClose" plain>关闭</el-button>
				<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
			</div>
		</el-form>
	</el-dialog>
</template>

<script>
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as templateApi from "@/api/template";
	import {
		dict2Array
	} from "@/utils/common";
	import {
		workOrderPublicStatusDict
	} from "@/utils/dict";
	import {
		finish
	} from "@/api/workOrder/distribute";

	export default {
		name: "confirmOverDialog",
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderNo"],
		data() {
			return {
				form: {
					remark: "",
					finishStatus: "",
					workOrderType: "",
				},
				rules: {
					remark: [{
						required: true,
						message: "请填写终止备注"
					}],
					finishStatus: [{
						required: true,
						message: "请选择结案状态"
					}],
					workOrderType: [{
						required: true,
						message: "请选择案件类型"
					}]
				},
				submitting: false,
				overStatusArr: [],
				caseTypeStatusArr: [],
			};
		},
		methods: {
			show() {
				dictApi.list({
						parentCode: "1009"
					})
					.then(res => {
						this.overStatusArr = res.result;
					});
				dictApi.list({
						parentCode: "1010"
					})
					.then(res => {
						this.caseTypeStatusArr = res.result;
					});

				templateApi.detail(1024)
					.then(res => {
						this.form.remark = res.result.value
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.over({
							...this.form,
							workOrderNo: this.workOrderNo
						});
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
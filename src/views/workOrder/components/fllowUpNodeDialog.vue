<!--不受理案件弹窗-->

<template>
	<el-dialog append-to-body title="回访核实记录" width="640px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card">
			<el-form-item label="">
				<el-checkbox v-model="checked1">投诉人回访记录</el-checkbox>
			</el-form-item>
			<el-form-item label="" prop="complainantRecord">
				<el-input :disabled="checked1?false:true" v-model="form.complainantRecord" show-word-limit
					maxlength="1000" placeholder="请输入" type="textarea" style="width: 100%; height: 150px"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-checkbox v-model="checked2">承办部门回访记录</el-checkbox>
			</el-form-item>
			<el-form-item label="" prop="orgRecord">
				<el-input :disabled="checked2?false:true" v-model="form.orgRecord" show-word-limit maxlength="1000"
					placeholder="请输入" type="textarea" style="width: 100%; height: 150px"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-checkbox v-model="checked3">主管部门回访记录</el-checkbox>
			</el-form-item>
			<el-form-item label="" prop="orgRecord1">
				<el-input :disabled="checked3?false:true" v-model="form.orgRecord1" show-word-limit maxlength="1000"
					placeholder="请输入" type="textarea" style="width: 100%; height: 150px"></el-input>
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
		name: "fllowUpNodeDialog",
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderNo", "workOrderId"],
		data() {
			return {
				checked1: true,
				checked2: false,
				checked3: false,
				form: {
					complainantRecord: "",
					orgRecord: "",
					orgRecord1: "",
				},
				rules: {
					remark: [{
						required: true,
						message: "请填写"
					}],
				},
				submitting: false
			};
		},
		methods: {
			show() {
				// dictApi.list({
				// 		parentCode: "1009"
				// 	})
				// 	.then(res => {
				// 		this.overStatusArr = res.result;
				// 	});
				// templateApi.detail(1024)
				// 	.then(res => {
				// 		this.form.remark = res.result.value
				// 	})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						let results =
							'<div><span style="font-weight: bold; color: #333; font-size: 16px">投诉人回访记录：</span><span style="color: #999; font-size: 16px">' +
							this.form.complainantRecord +
							'</span></div>\n<div><span style="font-weight: bold; color: #333; font-size: 16px">承办部门回访记录：</span><span style="color: #999; font-size: 16px">' +
							this.form.orgRecord +
							'</span></div>\n<div><span style="font-weight: bold; color: #333; font-size: 16px">主管部门回访记录：</span><span style="color: #999; font-size: 16px">' +
							this.form.orgRecord1 + '</span></div>'
						return workOrderApi.finished.addFllowUp({
							...this.form,
							remark: results,
							workOrderNo: this.workOrderNo,
							workOrderId: this.workOrderId
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
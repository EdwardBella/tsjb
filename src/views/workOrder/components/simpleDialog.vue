<!--不受理案件弹窗-->
<template>
	<div>
		<el-dialog append-to-body :title="simpleType" width="640px" :visible="visible" @close="handleClose">
			<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="130px">
				<el-form-item :label="labelName" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入详细描述"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<el-form-item v-if="simpleType == '申请解除跟踪' || simpleType == '申请解除异常'" label="附件" prop="attachmentFile">
					<FileUpload @fileDatas="fjFileList" :fileSizes="100" :isShowTip="true"
						tips="*支持图片、文档、压缩包格式文件，文件不大于 100M。" />
					<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handlePreview(row)" type="primary" plain size="mini"
									style="font-size: 14px;">预览</el-button>
								<el-button @click="handleRemoveFile($index,3)" type="primary" plain size="mini"
									style="font-size: 14px;">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>

			<div class="split"></div>
			<div class="dialog-footer-btn">
				<el-button @click="handleClose" plain>关闭</el-button>
				<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>

</template>

<script>
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as templateApi from "@/api/template";
	import {
		dict2Array
	} from "@/utils/common";
	import {
		workOrderPublicIntentionDict
	} from "@/utils/dict";
	import {
		finish
	} from "@/api/workOrder/distribute";

	export default {
		name: "simpleDialog",
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderNo", 'simpleType'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				form: {
					comment: "",
					attachmentList: [],
				},
				labelName: "",
				rules: {
					comment: [{
						required: true,
						message: "请填写详细描述"
					}],
				},
				submitting: false
			};
		},
		watch: {
			simpleType: {
				handler(val) {
					if (val == '发起跟踪' || val == '编辑跟踪') {
						this.labelName = '跟踪事由'
					}
					if (val == '发起异常' || val == '编辑异常') {
						this.labelName = '异常事由'
					}
					if (val == '解除跟踪' || val == '解除异常') {
						this.labelName = '解除备注'
					}
					if (val == '申请解除跟踪' || val == '申请解除异常') {
						this.labelName = '申请理由'
					}
				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			/* 附件 */
			fjFileList(res) {
				this.form.attachmentList = res
			},
			/* 附件删除 */
			handleRemoveFile(index, type) {
				this.form.attachmentList.splice(index, 1)
			},
			/* 附件预览 */
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				}
			},
			show() {
				// templateApi.detail(1003)
				// 	.then(res => {
				// 		this.form.comment = res.result.value || ''
				// 	})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						if (this.simpleType == '解除跟踪') {
							return workOrderApi.finished.cancelSupervision({
								cancelSupervisionReasons: this.form.comment,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '编辑跟踪') {
							return workOrderApi.all.editSupervision({
								supervisionReasons: this.form.comment,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '解除异常') {
							return workOrderApi.all.closeException({
								cancelException: this.form.comment,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '编辑异常') {
							return workOrderApi.all.editException({
								supervisionReasons: this.form.comment,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '发起跟踪') {
							return workOrderApi.finished.addSupervision({
								supervisionReasons: this.form.comment,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '发起异常') {
							return workOrderApi.all.addException({
								supervisionReasons: this.form.comment,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '申请解除跟踪') {
							return workOrderApi.all.applyCancelSupervision({
								cancelSupervisionReasons: this.form.comment,
								attachmentList: this.form.attachmentList,
								workOrderNo: this.workOrderNo
							});
						}
						if (this.simpleType == '申请解除异常') {
							return workOrderApi.all.applyCloseException({
								cancelSupervisionReasons: this.form.comment,
								attachmentList: this.form.attachmentList,
								workOrderNo: this.workOrderNo
							});
						}

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
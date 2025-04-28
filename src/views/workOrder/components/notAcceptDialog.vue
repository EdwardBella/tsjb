<!--不受理案件弹窗-->
<template>
	<div>
		<el-dialog append-to-body v-dialogDrags title="不受理案件" width="750px" :visible="visible" @close="handleClose">
			<el-form ref="form" :model="form" :rules="rules" label-width="140px" class="white-card">
				<el-form-item label="不受理原因:" prop="notAcceptReason">
					<el-select v-model="form.notAcceptReason" placeholder="请选择" style="width: 100%">
						<el-option v-for="item in optionList" :key="item.id" :label="item.name"
							:value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="不受理备注:" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入详细描述"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<el-form-item label="不受理告知书:" prop="rejectAttachments">
					<FileUpload @fileDatas="zzclFileList" :fileSizes="100" :isShowTip="true"
						tips="*支持图片、文档，文件不大于 100M。" />
					<el-table v-if="form.rejectAttachments.length > 0" :data="form.rejectAttachments" size="mini"
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

		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible"
			:filePath="previewDialog.fileURL" width="900px">
		</previewDialog>
	</div>
</template>

<script>
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'
	import upload from "@/components/upload";
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	export default {
		name: "notAcceptDialog",
		components: {
			upload,
			FileUpload,
			previewDialog
		},
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderNo"],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				uploading: false,
				form: {
					notAcceptReason: "",
					comment: "",
					rejectAttachments: []
				},
				rules: {
					notAcceptReason: [{
						required: true,
						message: "请选择不受理原因"
					}],
					rejectAttachments: [{
						required: true,
						message: "请选择通知书"
					}],
				},
				optionList: [],
				submitting: false
			};
		},
		created() {

		},
		methods: {
			beforeUpload() {
				this.uploading = true
			},
			onSuccess(file) {
				this.form.rejectAttachments = file;
				this.uploading = false
			},
			show() {
				dictApi.list({
						parentCode: "1001"
					})
					.then(res => {
						this.optionList = res.result;
					});

				templateApi.detail(1004)
					.then(res => {
						this.form.comment = res.result.value
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.reject({
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
			},
			zzclFileList(res) {
				this.form.rejectAttachments = res
			},
			/* 附件删除 */
			handleRemoveFile(index, type) {
				this.form.rejectAttachments.splice(index, 1)
			},
			/* 附件预览 */
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				}
			},
			/* 附件下载 */
			handleDownload(row) {
				fileApi.download({
					downloadFileName: row.fileName,
					filePath: row.fileUrl
				})
			},
		}
	};
</script>

<style scoped lang="less">
	::v-deep .el-table .cell {
		font-size: 16px;
	}
</style>
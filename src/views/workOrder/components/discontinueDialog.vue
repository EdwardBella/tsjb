<!--撤回案件-->

<template>
	<div>
		<el-dialog append-to-body title="案件中止" width="750px" :visible="visible" @close="handleClose">
			<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
				<el-form-item label="中止原因：" prop="reason">
					<el-select v-model="form.reason" style="width: 100%;" placeholder="请输入申请理由" clearable>
						<el-option v-for="item in optionList" :key="item.code" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="中止备注：" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入申请备注"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<el-form-item label="中止调查告知单" prop="attachmentFile">
					<FileUpload @fileDatas="zzclFileList" :fileSizes="100" :isShowTip="false"
						:downLoadUrl="downLoadUrl" />
					<el-table v-if="form.attachmentFile.length > 0" :data="form.attachmentFile" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handleDownload(row)" type="primary" plain size="mini"
									style="font-size: 14px;">下载</el-button>
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
	import * as mixins from "@/utils/mixins";
	import * as workOrderApi from "@/api/workOrder/index";
	import FileUpload from "@/views/portals/components/fileUpload3"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import {
		fileSize,
		getCMSUserInfo,
		postPortalsHeight
	} from "@/utils/common";
	import {
		repeatCheck
	} from "@/api/portals/workOrder";
	import * as fileApi from "@/api/file";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";

	export default {
		name: "discontinueDialog",
		mixins: [mixins.dialog, mixins.form],
		props: ["visible", "workOrderNo"],
		components: {
			FileUpload,
			previewDialog
		},
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				optionList: [],
				uploading: false,
				form: {
					reason: "",
					comment: "",
					attachmentFile: [],
				},
				rules: {
					reason: [{
						required: true,
						message: "请填写中止原因"
					}],
					comment: [{
						required: true,
						message: "请填写中止备注"
					}],
					attachmentFile: [{
						required: true,
						message: "请上传中止调查告知单"
					}],
				},
				submitting: false,
				downLoadUrl: null,
			};
		},
		methods: {
			show() {
				dictApi.list({
						parentCode: "1003"
					})
					.then(res => {
						this.optionList = res.result;
					});

				templateApi.detail(1007)
					.then(res => {
						this.form.comment = res.result.value
					})
				dictApi.fileList(10002)
					.then(res => {
						let fileExtension = res.result.value.slice(res.result.value.lastIndexOf("."));
						this.downLoadUrl = {
							downloadFileName: res.result.name + fileExtension,
							filePath: res.result.value
						}
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定要中止调查吗？")
					.then(() => {
						const cmsUserInfo = getCMSUserInfo()
						this.submitting = true;
						return workOrderApi.distribute.stopProcess({
							...this.form,
							workOrderNo: this.workOrderNo
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
					})
					.finally(() => this.submitting = false);
			},
			beforeUpload() {
				this.uploading = true
			},
			onSuccess(file) {
				this.form.attachmentFile = file;
				this.uploading = false
			},
			zzclFileList(res) {
				this.form.attachmentFile = res
			},
			/* 附件删除 */
			handleRemoveFile(index, type) {
				this.form.attachmentFile.splice(index, 1)
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

<style scoped>

</style>
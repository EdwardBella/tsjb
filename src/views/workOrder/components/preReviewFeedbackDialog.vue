<template>
	<div>
		<el-dialog append-to-body title="预审反馈" :visible.sync="visible" width="660px" :before-close="handleClose">
			<el-form :model="form" :rules="rules" label-position="left" ref="form" class="white-card"
				label-width="100px">
				<el-form-item label="反馈意见" prop="content">
					<el-input v-model="form.content" show-word-limit maxlength="300" placeholder="请输入反馈意见"
						type="textarea" style="width: 100%; height: 100px"></el-input>
				</el-form-item>
				<el-form-item label="反馈附件" prop="attachmentList">
					<FileUpload @fileDatas="jayjFileList" :fileSizes="100" :limit="5" :isShowTip="true"
						tips="*如需，可上传还款协议、以物抵债等附件，支持图片、文档、压缩包格式文件，文件不大于 100M。" />
					<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handleDownload(row)" type="primary" plain size="mini"
									style="font-size: 14px;">下载</el-button>
								<el-button @click="handlePreview(row)" type="primary" plain size="mini"
									style="font-size: 14px;">预览</el-button>
								<el-button @click="handleRemoveFile($index,1)" type="primary" plain size="mini"
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

		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>


	</div>

</template>

<script>
	import * as mixins from "@/utils/mixins";
	import * as fileApi from '@/api/file'
	import * as workOrderApi from "@/api/workOrder/index";
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";

	export default {
		name: "preReviewFeedbackDialog",
		mixins: [mixins.dialog, mixins.form],
		components: {
			FileUpload,
			previewDialog
		},
		props: ["workOrderNo", "id"],
		data() {
			return {
				submitting: false,
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				form: {
					content: '',
					attachmentList: []
				},
				rules: {
					content: [{
						required: true,
						message: "请输入反馈意见"
					}],
					// attachmentList: [{
					// 	required: true,
					// 	message: "请上传"
					// }]
				},

			};
		},
		methods: {
			jayjFileList(res) {
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
			/* 附件下载 */
			handleDownload(row) {
				fileApi.download({
					downloadFileName: row.fileName,
					filePath: row.fileUrl
				})
			},
			handleSubmit() {
				this.validateAndConfirm('form', "确定提交吗？")
					.then(() => {
						return workOrderApi.distribute.addReviewFeedBack({
							...this.form,
							workOrderWaitingId: this.id || '',
							workOrderNo: this.workOrderNo,
						});
						console.log(this.id)

					})
					.then(() => {
						this.$modal.msgSuccess("提交成功");
						this.handleClose();
						this.$emit("success");
					});

			}
		}
	};
</script>

<style scoped lang="less">

</style>
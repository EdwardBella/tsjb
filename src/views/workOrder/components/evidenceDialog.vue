<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="120px">
			<el-form-item label="举证要求：" prop="correctionComment">
				<el-input v-model="correctionComment" disabled show-word-limit maxlength="300" placeholder=""
					type="textarea" style="width: 100%; height: 100px"></el-input>
			</el-form-item>
			<el-form-item label="举证材料：" prop="attachmentList">
				<FileUpload @fileDatas="jatzsFileList" :fileSizes="100" :limit="1" :isShowTip="true"
					tips="*请按照补证要求提供与投诉举报事项相关的资料，上传的附件大小不能超过100M，附件类型支持图片、文档、视频等格式文件。" />
				<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
					:show-header="false" style="margin-top: 10px;">
					<el-table-column prop="fileName" label="文件名称"></el-table-column>
					<el-table-column label="操作" width="240px" align="center">
						<template slot-scope="{row, $index}">
							<el-button @click="handleDownload(row)" type="primary" plain size="mini"
								style="font-size: 14px;">下载</el-button>
							<el-button @click="handlePreview(row)" type="primary" plain size="mini"
								style="font-size: 14px;">预览</el-button>
							<el-button @click="handleRemoveFile($index,2)" type="primary" plain size="mini"
								style="font-size: 14px;">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>

		</el-form>
		<div class="split"></div>
		<div class="dialog-footer-btn" style="background-color: #fff;">
			<el-button @click="handleSubmit" :loading="submitting" type="primary"
				style="font-weight: normal;">提交举证材料</el-button>
		</div>
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>

</template>

<script>
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import * as mixins from '@/utils/mixins'
	import * as workOrderApi from '@/api/workOrder/index'
	import * as templateApi from "@/api/template";
	import {
		updateMaterial
	} from '@/api/workOrder/distribute'

	export default {
		name: 'replenishDialog',
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderNo', 'correctionComment', 'materialCorrectId'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				form: {
					attachmentList: [],
				},
				rules: {
					attachmentList: [{
						required: true,
						message: '请上传'
					}]
				},
				submitting: false,
			}
		},
		methods: {
			show() {
				templateApi.detail(1018)
					.then(res => {
						this.form.correctionComment = res.result.value
					})
			},
			jatzsFileList(res) {
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
				this.validateAndConfirm("form", "确定要提交举证材料吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.addAttachment({
							...this.form,
							code: 74,
							materialCorrectId: this.materialCorrectId,
							id: this.workOrderNo
						})
					})
					.then(() => {
						this.$emit("success");
						this.$modal.msgSuccess('提交成功')
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
	.dialog-footer-btn .el-button {
		width: auto;
	}
</style>
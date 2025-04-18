<template>
	<div>
		<el-dialog append-to-body title="请选择上传" :visible.sync="visible" width="600px" :before-close="handleClose">
			<el-form :model="form" :rules="rules" label-position="left" ref="form" class="white-card"
				label-width="60px">
				<el-form-item label="类型" prop="code">
					<el-cascader v-model="form.code" ref="code" :options="fileTypes" :show-all-levels="true"
						:props="{ checkStrictly: false , emitPath: false}" style="width: 100%;"
						@change="codeChanged"></el-cascader>
				</el-form-item>
				<el-form-item label="文件" prop="attachmentList">
					<FileUpload @fileDatas="jayjFileList" :fileSizes="100" :limit="5" :isShowTip="true"
						tips="*如需，可上传还款协议、以物抵债等附件，支持图片、文档、压缩包格式文件，文件不大于 100M。" />
					<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
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

		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible"
			:filePath="previewDialog.fileURL" width="900px">
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
		name: "uploadFileTypeDialog",
		mixins: [mixins.dialog, mixins.form],
		components: {
			FileUpload,
			previewDialog
		},
		props: ["workOrderId"],
		data() {
			return {
				submitting: false,
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				form: {
					code: '',
					attachmentList: []
				},
				rules: {
					code: [{
						required: true,
						message: "请选择类型"
					}],
					attachmentList: [{
						required: true,
						message: "请上传文件"
					}]
				},
				fileTypes: [{
						label: "预审阶段",
						value: 1,
						children: [{
							label: "其他资料",
							value: 84
						}]
					}, {
						label: "受理阶段",
						value: 2,
						children: [{
							label: "其他资料",
							value: 16
						}]
					}, {
						label: "查办阶段",
						value: 3,
						children: [{
							label: "其他资料",
							value: 75
						}]
					}, {
						label: "结案阶段",
						value: 4,
						children: [{
							label: "其他资料",
							value: 76
						}]
					}, {
						label: "跟踪问效",
						value: 5,
						children: [{
							label: "其他资料",
							value: 77
						}]
					},

				]
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
			codeChanged() {
				this.$refs.code.dropDownVisible = false
			},
			handleSubmit() {
				this.validateAndConfirm('form', "确定提交吗？")
					.then(() => {
						return workOrderApi.all.addAttachment({
							...this.form,
							id: this.workOrderId,
						});

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
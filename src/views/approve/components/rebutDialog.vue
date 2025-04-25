<template>
	<div>
		<el-dialog append-to-body title="驳回" width="640px" :visible="visible" @close="handleClose">
			<el-form :model="form" :rules="rules" ref="form" label-width="140px" class="white-card">
				<el-form-item label="驳回备注:" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入详细描述"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<el-form-item label="附件:" prop="attachmentList">
					<FileUpload @fileDatas="fjFileList" :fileSizes="100" :isShowTip="true" :limit="1"
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
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import {
		fail
	} from "@/api/workOrder/audit";

	export default {
		name: 'rebutDialog',
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog],
		props: ['visible', 'workOrderNo', 'id', 'type'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				submitting: false,
				form: {
					comment: '',
					attachmentList: [],
				},
				rules: {
					comment: [{
						required: true,
						message: '请填写驳回备注'
					}]
				},
				optionList: [],
			};
		},
		methods: {
			/* 附件 */
			fjFileList(res) {
				this.form.attachmentList = res
			},
			show() {
				// dictApi.list({ parentCode: "1002" })
				//   .then(res => {
				//     this.optionList = res.result;
				//   });
				//
				templateApi.detail(1028)
					.then(res => {
						this.form.comment = res.result.value;
					});
			},
			handleSubmit() {
				this.validateAndConfirm("form", "是否确认驳回？")
					.then(() => {
						this.submitting = true;
						return workOrderApi.audit.fail({
							...this.form,
							id: this.id,
							operation: this.type
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
					})
					.finally(() => this.submitting = false);
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
		}
	};
</script>

<style lang="less" scoped>
	.tips {
		text-align: center;
		margin-bottom: 20px;
	}
</style>
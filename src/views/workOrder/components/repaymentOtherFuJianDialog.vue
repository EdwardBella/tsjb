<template>
	<div>
		<el-dialog append-to-body :title="title" width="750px" :visible="visible" @close="handleClose"
			:destroy-on-close="true">
			<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
				<el-form-item label="实际还款金额：" prop="payPlanOtherAmount">
					<el-input-number v-model="form.payPlanOtherAmount"
						onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" :controls="false" :min="1"
						placeholder="请输入金额" style="width: 220px;"></el-input-number>
					万元
				</el-form-item>
				<el-form-item label="实际还款日期：" prop="actualPayTime">
					<el-date-picker v-model="form.actualPayTime" value-format="yyyy-MM-dd" type="date"
						placeholder="还款日期" style="width: 220px;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="附件：" prop="attachmentFile">
					<FileUpload @fileDatas="jaspdFileList" :datas="attachmentFile" :fileSizes="100" :limit="10"
						:isShowTip="true" tips="*支持图片、文档、压缩包格式文件，文件不大于 100M。" />
					<el-table v-if="form.attachmentFile.length > 0" :data="form.attachmentFile" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handleDownload(row)" type="primary" plain size="mini"
									style="font-size: 14px;">下载</el-button>
								<el-button @click="handlePreview(row)" type="primary" plain size="mini"
									style="font-size: 14px;">预览</el-button>
								<el-button @click="handleRemoveFile($index,4)" type="primary" plain size="mini"
									style="font-size: 14px;">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item label="" label-width="0px">
					<span style="font-size: 14px;color: #E44831;">提交之后信息将无法修改，请仔细填写</span>
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
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import * as mixins from '@/utils/mixins'
	import * as workOrderApi from '@/api/workOrder/index'
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import {
		updateMaterial
	} from '@/api/workOrder/distribute'

	export default {
		name: 'repaymentOtherFuJianDialog',
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderNo', 'title', "payInfo", "workOrderId", 'payPlanOtherId'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				form: {
					payPlanOtherAmount: '',
					actualPayTime: '',
					attachmentFile: []
				},
				rules: {
					payPlanOtherAmount: [{
						required: true,
						message: '请输入'
					}],
					attachmentFile: [{
						required: true,
						message: '请选择'
					}],
					actualPayTime: [{
						required: true,
						message: '请选择'
					}]
				},
				attachmentFile: [],
				submitting: false,
			}
		},
		watch: {
			payInfo: {
				handler(val) {
					console.log(val, '-------------------')
					if (val != null) {
						this.form.payPlanOtherAmount = val.amount
						this.form.actualPayTime = val.actualPayTime
						this.attachmentFile = val.attachmentFile
						this.form.attachmentFile = val.attachmentFile
					}else{
						this.form.payPlanOtherAmount = ''
						this.form.actualPayTime = ''
						this.attachmentFile = []
						this.form.attachmentFile = []
					}
				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.all.addOrUpdatePayOtherRecord({
							...this.form,
							payPlanOtherId: this.payPlanOtherId,
							workOrderId: this.workOrderId
						})
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
					})
					.finally(() => {
						this.submitting = false;
					});
			},
			/* 附件 */
			jaspdFileList(res) {
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
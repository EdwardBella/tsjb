<template>
	<div>
		<el-dialog append-to-body title="附件" width="700px" :visible="visible" @close="handleClose">
			<el-table v-if="attachmentFile && attachmentFile.length > 0" :data="attachmentFile" style="padding: 20px;" size="mini"
				:show-header="false">
				<el-table-column prop="fileName" label="文件名称"></el-table-column>
				<el-table-column label="操作" width="160px" align="center">
					<template slot-scope="{row}">
						<span style="font-size: 14px;color: #2b65da; cursor: pointer;"
							@click="handleDownload(row)">下载</span>
						<span style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
							@click="handlePreview(row)">预览</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="split"></div>

			<div class="dialog-footer-btn">
				<el-button @click="handleClose" plain>关闭</el-button>
			</div>

		</el-dialog>
		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>
</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import {
		checkProcessDepartmentCode
	} from "@/api/workOrder/all";

	export default {
		name: "repaymentPlanDialog",
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		components: {
			previewDialog
		},
		props: ["visible", "workOrderNo", "attachmentFile"],
		data() {
			return {
				submitting: false,
				previewDialog: {
					visible: false,
					fileURL: ''
				},
			};
		},
		computed: {},
		created() {

		},
		methods: {
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

<style lang="less" scoped>
	.tips {
		text-align: center;
		margin-bottom: 20px;
	}

	::v-deep .el-form-item__content {
		font-size: 16px;
	}

	::v-deep .el-table .cell {
		font-size: 16px !important;
	}
</style>
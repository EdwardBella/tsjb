<template>
	<div>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">结案信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				<el-col :span="24">
					<el-form-item label="办结类型">{{ detailsInfo.workOrderSubmitFinishResult.reason || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="办结理由">{{detailsInfo.workOrderSubmitFinishResult.comment || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="结案状态">{{detailsInfo.finishStatus || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item
						label="结案反馈">{{ satisfactionLevelTrans[detailsInfo.workOrderSubmitFinishResult.satisfactionLevel]}}</el-form-item>
				</el-col>
				</el-col>
				<el-col :span="24">
					<el-form-item label="结案审批单">
						<el-table
							v-if="detailsInfo.workOrderSubmitFinishResult.completedFinishFile && detailsInfo.workOrderSubmitFinishResult.completedFinishFile.length"
							:data="detailsInfo.workOrderSubmitFinishResult.completedFinishFile" size="mini" :show-header="false">
							<el-table-column prop="fileName" label="文件名称"></el-table-column>
							<el-table-column label="操作" align="left">
								<template slot-scope="{row}">
									<span style="font-size: 14px;color: #2b65da; cursor: pointer;"
										@click="handleDownload(row)">下载</span>
									<span style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
										@click="handlePreview(row)">预览</span>
								</template>
							</el-table-column>
						</el-table>
				
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="结案意见书">
						<el-table
							v-if="detailsInfo.workOrderSubmitFinishResult.reportList && detailsInfo.workOrderSubmitFinishResult.reportList.length"
							:data="detailsInfo.workOrderSubmitFinishResult.reportList" size="mini" :show-header="false">
							<el-table-column prop="fileName" label="文件名称"></el-table-column>
							<el-table-column label="操作" align="left">
								<template slot-scope="{row}">
									<span style="font-size: 14px;color: #2b65da; cursor: pointer;"
										@click="handleDownload(row)">下载</span>
									<span style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
										@click="handlePreview(row)">预览</span>
								</template>
							</el-table-column>
						</el-table>

					</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-form-item label="结案通知书">
						<el-table
							v-if="detailsInfo.workOrderSubmitFinishResult.reportNoticeFile && detailsInfo.workOrderSubmitFinishResult.reportNoticeFile.length"
							:data="detailsInfo.workOrderSubmitFinishResult.reportNoticeFile" size="mini"
							:show-header="false">
							<el-table-column prop="fileName" label="文件名称"></el-table-column>
							<el-table-column label="操作" align="left">
								<template slot-scope="{row}">
									<span style="font-size: 14px;color: #2b65da; cursor: pointer;"
										@click="handleDownload(row)">下载</span>
									<span style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
										@click="handlePreview(row)">预览</span>
								</template>
							</el-table-column>
						</el-table>

					</el-form-item>
				</el-col>
				
				<el-col :span="24">
					<el-form-item label="附件">
						<el-table
							v-if="detailsInfo.workOrderSubmitFinishResult.attachmentList && detailsInfo.workOrderSubmitFinishResult.attachmentList.length"
							:data="detailsInfo.workOrderSubmitFinishResult.attachmentList" size="mini"
							:show-header="false">
							<el-table-column prop="fileName" label="文件名称"></el-table-column>
							<el-table-column label="操作" align="left">
								<template slot-scope="{row}">
									<span style="font-size: 14px;color: #2b65da; cursor: pointer;"
										@click="handleDownload(row)">下载</span>
									<span style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
										@click="handlePreview(row)">预览</span>
								</template>
							</el-table-column>
						</el-table>

					</el-form-item>
				</el-col>

			</el-row>
		</el-form>
		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>

</template>

<script>
	import auditProcessRecord from "./auditProcessRecord";
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'

	export default {
		name: "closeaCaseInfo",
		components: {
			previewDialog,
			auditProcessRecord
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				satisfactionLevelTrans: {
					'satisfaction': "满意",
					'common': "基本满意",
					'noSatisfaction': "不满意",
				}

			};
		},
		methods: {
			show() {
				// dictApi.list({
				// 		parentCode: "1006"
				// 	})
				// 	.then(res => {
				// 		this.optionList = res.result;
				// 	});

				// templateApi.detail(1021)
				// 	.then(res => {
				// 		this.form.comment = res.result.value;
				// 	});
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

<style lang="less" scoped>
	.module-head {
		padding: 0 15px;
		min-height: 40px;
		background: linear-gradient(90deg, #0b5fd5 0, #e6f2ff);
		font-size: 20px;
		margin-bottom: 10px;
		color: #fff;
		display: flex;
		align-items: center;
	}
</style>
<template>
	<div>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">预审反馈信息</span>
		</div>
		<div style="padding-bottom: 12px;border-bottom: 1px solid #e8e8e8;" v-for="(item,index) in listReviewFeedBack"
			:key="index">
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="8">
						<el-form-item label="单位名称">{{ item.departmentName || ''}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="反馈时间">{{ item.createTime || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="反馈意见">{{item.content || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="反馈附件">
							<el-table v-if="item.attachmentList && item.attachmentList.length"
								:data="item.attachmentList" size="mini" :show-header="false">
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
		</div>

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
		name: "preReviewFeedbackInfo",
		components: {
			previewDialog,
			auditProcessRecord
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'listReviewFeedBack'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
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
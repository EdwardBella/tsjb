<template>
	<div>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">材料举证信息</span>
		</div>
		<div class="content-cn" v-for="(item,index) in listReviewFeedBack" :key="index">
			<div class="times-cn">
				<div class="dot-cn"></div>
				<span>第{{index+1}}次举证</span>
			</div>
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="24">
						<el-form-item label="举证内容">{{ item.correctRequirement || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="举证时限">{{ item.limitDay || ''}}天</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="提交时间">{{ item.initiateTime || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="举证材料">
							<el-table v-if="item.workOrderAttachments != ''"
								:data="item.workOrderAttachments" size="mini" :show-header="false">
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
		name: "adduceEvidenceInfo",
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

	.content-cn {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		flex-direction: column;
		padding-bottom: 12px;
		border-bottom: 1px solid #e8e8e8;

		.times-cn {
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 10px;


			.dot-cn {
				width: 8px;
				height: 8px;
				margin-right: 10px;
				border-radius: 8px;
				background-color: #2b65da;
			}
		}
	}
</style>
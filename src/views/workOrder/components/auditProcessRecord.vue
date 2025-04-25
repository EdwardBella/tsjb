<template>
	<div>
		<el-timeline class="audit-timeline" :class="size">
			<el-timeline-item v-for="(item, index) in records" :key="index" :color="index === 0 ? '#138a43' : ''">
				<div v-if="item.status > 2 && !item.actionLogStatus" class="meta">
					<span :class="{'color-primary': index === 0}">发起审批</span><span>{{ item.createTime }}</span>
				</div>
				<template v-else>
					<div class="meta">
						<span
							:class="{'color-primary': index === 0}">{{ records[index + 1].auditStatus }}</span><span>{{ item.updateTime }}</span>
					</div>
					<el-form class="key-value" label-width="100px" label-suffix="：">
						<el-form-item label="审批人">{{ item.updateUsername }}</el-form-item>
						<el-form-item label="审批意见">
							<template v-if="item.status > 2">
								{{ item.actionLogStatus | workOrderProcessAuditStatus }}
							</template>
							<template v-else>{{ item.status | workOrderProcessAuditStatus }}</template>
						</el-form-item>
						<el-form-item label="备注">
							<div v-html="txt2HTML(item.comment)"></div>
						</el-form-item>
						<el-form-item label="附件">
							<el-table v-if="item.auditAttachmentFile && item.auditAttachmentFile.length"
								:data="item.auditAttachmentFile" size="mini" :show-header="false">
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
					</el-form>
				</template>
			</el-timeline-item>
		</el-timeline>
		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>
	</div>
	
</template>

<script>
	import * as fileApi from "@/api/file";
	import {
		txt2HTML,
		workOrderProcessAuditStatus
	} from '@/utils/filters'
	import previewDialog from "@/views/workOrder/components/previewDialog";

	export default {
		name: 'auditProcessRecord',
		components: {
			previewDialog,
		},
		filters: {
			workOrderProcessAuditStatus,
		},
		props: {
			records: {
				type: Array,
				default: Array
			},
			size: {
				type: String,
				default: 'normal'
			} // normal, mini
		},
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
			};
		},
		methods: {
			txt2HTML,
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				}
			},
			handleDownload(row) {
				fileApi.download({
					downloadFileName: row.fileName,
					filePath: row.fileUrl
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.color-primary {
		color: #138a43;
	}

	.audit-timeline {

		//margin-top: 16px;
		.meta {
			position: relative;
			top: -2px;
			display: flex;
			align-items: center;
			color: #909399;

			span {
				flex: 1;

				&:first-child {
					font-size: 16px;
				}
			}
		}

		&.mini {
			.meta {
				span {
					&:first-child {
						font-size: 14px;
					}

					&:last-child {
						text-align: right;
						font-size: 12px;
					}
				}
			}
		}

		.content {
			margin-top: 12px;
			color: #000;
		}
	}
</style>
<style lang="less">
	.audit-timeline.mini {
		.el-timeline-item {
			padding-bottom: 5px;
		}

		.key-value .el-form-item {
			padding: 2px 0;
		}
	}
</style>
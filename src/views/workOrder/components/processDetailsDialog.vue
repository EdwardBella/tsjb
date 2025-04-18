<template>
	<div>
		<el-dialog append-to-body title="操作记录" width="680px" top="2vh" :visible="visible" @close="handleClose"
			destroy-on-close>
			<div style="width: 100%;max-height:calc(100vh - 200px);overflow: auto;">
				<el-form v-loading="loading" class="key-value white-card" label-width="180px">
					<el-form-item label="操作时间：">{{details.createTime}}</el-form-item>
					<el-form-item label="操作名称：">{{details.operateName}}</el-form-item>
					<el-form-item label="操作人：">{{details.processUser || '-'}}</el-form-item>
					<template v-if="details.operateType === '44'">
						<el-form-item label="补正时限：">
							<div>{{details.other}}天</div>
						</el-form-item>
						<el-form-item label="补正内容：">
							<div v-html="txt2HTML(details.reason)"></div>
						</el-form-item>
						<el-form-item label="修改内容：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '03'">
						<el-form-item label="移交备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '04'">
						<el-form-item label="交办备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '05'">
						<el-form-item label="取消受理备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '06'">
						<el-form-item label="不受理原因：">{{details.reason}}</el-form-item>
						<el-form-item label="不受理备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '08'">
						<el-form-item label="回退原因：">{{details.reason}}</el-form-item>
						<el-form-item label="回退备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>


					<template v-if="details.operateType === '10'">
						<el-form-item label="转移交办原因：">{{details.reason}}</el-form-item>
						<el-form-item label="转移交办备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '19'">
						<el-form-item label="是否公开：">{{ details.other === "Y" ? "是" : "否" }}</el-form-item>
						<el-form-item label="办结备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '14'">
						<el-form-item
							label="中止总时间：">{{ (Number(details.costTime) * 1000) | timeFormatDHM }}</el-form-item>
					</template>


					<template v-if="details.operateType === '20'">
						<el-form-item label="取消办结备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '15'">
						<el-form-item label="延期原因：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
						<el-form-item label="延期天数：">{{details.other !== 'null' ? details.other : 30}}天</el-form-item>
						<el-form-item label="是否通过：">{{details.auditStatus | workOrderProcessAuditStatus}}</el-form-item>
						<el-form-item label="附件：">
							<el-table v-if="details.addTimeAttachment && details.addTimeAttachment.length"
								:data="details.addTimeAttachment" size="mini" :show-header="false">
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
						
						</el-form-item>
					</template>

					<template v-if="details.operateType === '18'">
						<el-form-item label="退回备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '16'">
						<el-form-item label="办结类型：">{{details.reason}}</el-form-item>
						<el-form-item label="办结理由：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
						<el-form-item v-if="details.arrearsAmount != '' && details.arrearsAmount > 0"
							label="投诉欠款：">{{details.arrearsAmount?(details.arrearsAmount+'万元'):''}}</el-form-item>
						<template v-if="details.confirmUnPayAmount != '' && details.confirmUnPayAmount > 0">
							<el-form-item
								label="确认欠款：">{{details.confirmUnPayAmount?(details.confirmUnPayAmount+'万元'):''}}</el-form-item>
							<el-form-item
								label="已清欠款：">{{details.payedAmount?(details.payedAmount+'万元'):''}}</el-form-item>
							<el-form-item
								label="剩余欠款：">{{details.unPayAmount?(details.unPayAmount+'万元'):''}}</el-form-item>
							<el-form-item label="制定计划：">{{ details.makePayPlan == '1'?'是':'否'}}</el-form-item>
							<el-form-item label="还款计划：" v-if="details.makePayPlan == '1' && details.payPlanList">
								<el-table :data="details.payPlanList" size="mini" border class="repayment-plan-table"
									style="width: 100%;">
									<el-table-column type="index" label="序号" width="60"
										align="center"></el-table-column>
									<el-table-column prop="actualPayTime" label="计划支付日期" width="170" align="center">
										<template slot-scope="{row}">
											{{ row.actualPayTime || '-' }}
										</template>
									</el-table-column>
									<el-table-column prop="amount" label="支付金额(万元)" align="center">
										<template slot-scope="{row}">
											{{ row.amount || '-' }}
										</template>
									</el-table-column>


								</el-table>
							</el-form-item>
							<el-form-item label="计划还款：">{{planAllAmount}}万元</el-form-item>
							<el-form-item
								label="其他还款：">{{details.otherAmount?(details.otherAmount+'万元'):''}}</el-form-item>
							<el-form-item label="其他还款计划：" v-if="details.otherAmount > 0 && details.payPlanOtherList">
								<el-table :data="details.payPlanOtherList" size="mini" border
									class="repayment-plan-table" style="width: 100%;">
									<el-table-column type="index" label="序号" width="60"
										align="center"></el-table-column>
									<el-table-column prop="actualPayTime" label="计划支付日期" width="170" align="center">
										<template slot-scope="{row}">
											{{ row.actualPayTime || '-' }}
										</template>
									</el-table-column>
									<el-table-column prop="amount" label="支付金额(万元)" align="center">
										<template slot-scope="{row}">
											{{ row.amount || '-' }}
										</template>
									</el-table-column>


								</el-table>
							</el-form-item>
							<el-form-item label="其他计划还款：">{{otherPlanAllAmount}}万元</el-form-item>
							<el-form-item label="支付备注：">{{details.payNote || ''}}</el-form-item>

						</template>

						<el-form-item
							label="结案反馈：">{{ details.satisfactionLevel=='satisfaction' ? '满意' : (details.satisfactionLevel=='common' ? '一般' : (details.satisfactionLevel=='noSatisfaction' ? '不满意' : '')) }}</el-form-item>
						<el-form-item label="结案审批单：">
							<el-table v-if="details.finishAuditList && details.finishAuditList.length"
								:data="details.finishAuditList" size="mini" :show-header="false">
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

						</el-form-item>
						<el-form-item label="结案意见书：">
							<el-table v-if="details.finishProposal && details.finishProposal.length"
								:data="details.finishProposal" size="mini" :show-header="false">
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

						</el-form-item>

						<el-form-item label="结案通知书：">
							<el-table v-if="details.finishNotice && details.finishNotice.length"
								:data="details.finishNotice" size="mini" :show-header="false">
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

						</el-form-item>

						<el-form-item label="附件：">
							<el-table v-if="details.finishAttachments && details.finishAttachments.length"
								:data="details.finishAttachments" size="mini" :show-header="false">
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

						</el-form-item>

					</template>

					<template v-if="details.operateType === '22'">
						<el-form-item label="终止类型：">{{details.reason}}</el-form-item>
						<el-form-item label="终止理由：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
						<el-form-item v-if="details.arrearsAmount != '' && details.arrearsAmount > 0"
							label="投诉欠款：">{{details.arrearsAmount?(details.arrearsAmount+'万元'):''}}</el-form-item>
						<template v-if="details.confirmUnPayAmount != '' && details.confirmUnPayAmount > 0">
							<el-form-item
								label="确认欠款：">{{details.confirmUnPayAmount?(details.confirmUnPayAmount+'万元'):''}}</el-form-item>
							<el-form-item
								label="已清欠款：">{{details.payedAmount?(details.payedAmount+'万元'):''}}</el-form-item>
							<el-form-item
								label="剩余欠款：">{{details.unPayAmount?(details.unPayAmount+'万元'):''}}</el-form-item>
							<el-form-item label="制定计划：">{{ details.makePayPlan == '1'?'是':'否'}}</el-form-item>
							<el-form-item label="还款计划：" v-if="details.makePayPlan == '1' && details.payPlanList">
								<el-table :data="details.payPlanList" size="mini" border class="repayment-plan-table"
									style="width: 100%;">
									<el-table-column type="index" label="序号" width="60"
										align="center"></el-table-column>
									<el-table-column prop="actualPayTime" label="计划支付日期" width="170" align="center">
										<template slot-scope="{row}">
											{{ row.actualPayTime || '-' }}
										</template>
									</el-table-column>
									<el-table-column prop="amount" label="支付金额(万元)" align="center">
										<template slot-scope="{row}">
											{{ row.amount || '-' }}
										</template>
									</el-table-column>


								</el-table>
							</el-form-item>
							<el-form-item label="计划还款：">{{planAllAmount}}万元</el-form-item>
							<el-form-item
								label="其他还款：">{{details.otherAmount?(details.otherAmount+'万元'):''}}</el-form-item>
							<el-form-item label="其他还款计划：" v-if="details.otherAmount > 0 && details.payPlanOtherList">
								<el-table :data="details.payPlanOtherList" size="mini" border
									class="repayment-plan-table" style="width: 100%;">
									<el-table-column type="index" label="序号" width="60"
										align="center"></el-table-column>
									<el-table-column prop="actualPayTime" label="计划支付日期" width="170" align="center">
										<template slot-scope="{row}">
											{{ row.actualPayTime || '-' }}
										</template>
									</el-table-column>
									<el-table-column prop="amount" label="支付金额(万元)" align="center">
										<template slot-scope="{row}">
											{{ row.amount || '-' }}
										</template>
									</el-table-column>
								</el-table>
							</el-form-item>
							<el-form-item label="其他计划还款：">{{otherPlanAllAmount}}万元</el-form-item>
							<el-form-item label="支付备注：">{{details.payNote || ''}}</el-form-item>
						</template>

						<el-form-item
							label="结案反馈：">{{ details.satisfactionLevel=='satisfaction' ? '满意' : (details.satisfactionLevel=='common' ? '一般' : (details.satisfactionLevel=='noSatisfaction' ? '不满意' : '')) }}</el-form-item>
						<el-form-item label="结案审批单：">
							<el-table v-if="details.overAuditList && details.overAuditList.length"
								:data="details.overAuditList" size="mini" :show-header="false">
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

						</el-form-item>
						<el-form-item label="结案意见书：">
							<el-table v-if="details.overProposal && details.overProposal.length"
								:data="details.overProposal" size="mini" :show-header="false">
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

						</el-form-item>

						<el-form-item label="结案通知书：">
							<el-table v-if="details.overNotice && details.overNotice.length" :data="details.overNotice"
								size="mini" :show-header="false">
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

						</el-form-item>

						<el-form-item label="附件：">
							<el-table v-if="details.overAttachments && details.overAttachments.length"
								:data="details.overAttachments" size="mini" :show-header="false">
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

						</el-form-item>

					</template>

					<template v-if="details.operateType === '13'">
						<el-form-item label="中止原因：">{{details.reason}}</el-form-item>
						<el-form-item label="中止备注：">
							<div v-html="txt2HTML(details.comment)"></div>
						</el-form-item>
						<el-form-item label="审批状态：">{{details.auditStatus | workOrderProcessAuditStatus}}</el-form-item>
						<el-table v-if="details.attachmentFile && details.attachmentFile.length"
							:data="details.attachmentFile" size="mini">
							<el-table-column prop="fileName" label="附件"></el-table-column>
							<el-table-column label="文件名称">
								<template slot-scope="{row}">{{row.fileName | filename}}</template>
							</el-table-column>
							<el-table-column label="文件格式">
								<template slot-scope="{row}">{{row.fileName | extensionName}}</template>
							</el-table-column>
							<el-table-column label="操作" width="150px" align="center">
								<template slot-scope="{row, $index}">
									<el-button @click="handleDownload(row)" type="primary" plain
										size="mini">查看</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>

					<template v-if="details.operateType === '25'">
						<el-form-item label="截止时间：">{{details.lastCompleteTime}}</el-form-item>
						<el-form-item label="补正要求：">
							<div v-html="txt2HTML(details.correctRequirement)"></div>
						</el-form-item>
					</template>

					<template v-if="['32', '37'].includes(details.operateType)">
						<el-form-item label="跟踪内容：">
							<div v-html="txt2HTML(details.reason)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '33' || details.operateType === '35'">
						<el-form-item label="关闭内容：">
							<div v-html="txt2HTML(details.reason)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '34'">
						<el-form-item label="异常原因：">
							<div v-html="txt2HTML(details.reason)"></div>
						</el-form-item>
					</template>

					<template v-if="details.operateType === '36'">
						<el-form-item label="实际还款时间：">
							<div v-html="txt2HTML(details.reason)"></div>
						</el-form-item>
					</template>

					<el-form-item v-if="details.workOrderAuditList && details.workOrderAuditList.length"
						label="审批流程记录：">
						<auditProcessRecord :records="details.workOrderAuditList" size="mini" style="margin-top: 5px;">
						</auditProcessRecord>
					</el-form-item>


				</el-form>

			</div>

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
	import auditProcessRecord from '@/views/workOrder/components/auditProcessRecord'
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import * as mixins from "@/utils/mixins"
	import * as workOrderApi from "@/api/workOrder/index";
	import {
		extensionName,
		filename,
		timeFormatDHM,
		txt2HTML,
		workOrderProcessAuditStatus,
		money
	} from "@/utils/filters";
	import {
		multiply,
		add,
		subtract,
		divide
	} from "accurate-core";

	export default {
		name: "processDetailsDialog",
		mixins: [mixins.dialog, mixins.upload],
		components: {
			auditProcessRecord,
			previewDialog
		},
		filters: {
			extensionName,
			filename,
			timeFormatDHM,
			workOrderProcessAuditStatus,
			money
		},
		props: ['visible', 'id', 'type', 'records'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				loading: true,
				details: {
					workOrderAuditList: []
				},
				planAllAmount: 0,
				otherPlanAllAmount: 0,
			};
		},
		watch: {
			id: {
				handler(val) {
					console.log(val, '))))))))))))))))))))')
					if (val != '') {
						this.getProcessDetails()
					}
				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			txt2HTML,
			show() {

			},
			hide() {
				this.details = {}
			},
			getProcessDetails() {
				this.loading = true
				workOrderApi.all.processDetails(this.id)
					.then(res => {
						this.details = res.result
						console.log(this.details, 'this.details')
						if (res.result.payPlanList && res.result.payPlanList.length > 0) {
							let gentle = 0;
							for (let i = 0; i < res.result.payPlanList.length; i++) {
								if (res.result.payPlanList[i].status == 'PAYED') {
									gentle = add(gentle, Number(res.result.payPlanList[i].amount))
								}
							}
							this.planAllAmount = gentle
						}
						if (res.result.payPlanOtherList && res.result.payPlanOtherList.length > 0) {
							let gentle = 0;
							for (let i = 0; i < res.result.payPlanOtherList.length; i++) {
								if (res.result.payPlanOtherList[i].amount != '') {
									gentle = add(gentle, Number(res.result.payPlanOtherList[i].amount))
								}
							}
							this.otherPlanAllAmount = gentle
						}


					})
					.finally(() => this.loading = false)
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

<style scoped lang="less">
	::v-deep .el-form-item__content {
		font-size: 16px !important;
	}

	::v-deep .el-form-item__label {
		font-size: 16px !important;
	}
</style>
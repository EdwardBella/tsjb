<template>
	<div>
		<div class="module-head" style="margin-top: 10px;background: linear-gradient(90deg,#138a43 0,#eeffe6);">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">待审批信息</span>
		</div>
		<el-form class="key-value" label-width="140px" label-suffix="：">
			<!-- 确认退回审批，撤回投诉举报案件审批，移交审批 -->
			<el-row>
				<el-col :span="24">
					<el-form-item label="审批类型">{{ splxDictTrans(detailsInfo.workOrderAudit.type)}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="审批状态">{{detailsInfo.workOrderAudit.auditStatus || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 10" :span="24">
					<el-form-item label="指定办理备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 11" :span="24">
					<el-form-item label="转办备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '09'" :span="24">
					<el-form-item label="直办备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 12" :span="24">
					<el-form-item label="交办备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 21" :span="24">
					<el-form-item label="退回修改内容">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="['10','11','12','09'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="系统领域">{{detailsInfo.systemDomain}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 21" :span="24">
					<el-form-item label="退回补正内容">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="['32','33'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="申请理由">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<template v-if="detailsInfo.workOrderAudit.type == '24'">
					<el-col :span="24">
						<el-form-item label="申请理由">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="申请备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
					</el-col>
				</template>

				<el-col v-if="['23'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="复核理由">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="['29','30'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="案件名称">{{detailsInfo.workOrderAudit.title || ''}}</el-form-item>
				</el-col>
				<el-col v-if="['29','30'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="反映事项">{{detailsInfo.itemDetailName || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 30" :span="24">
					<el-form-item label="受理备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 29" :span="24">
					<el-form-item label="推送单位"></el-form-item>
				</el-col>
				<el-col v-if="['27','28'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="退回重办备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '00'" :span="24">
					<el-form-item label="延期原因">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '00'" :span="24">
					<el-form-item
						label="延期天数">{{detailsInfo.workOrderAudit.applyOther != ''?(detailsInfo.workOrderAudit.applyOther + '天'):''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '00'" :span="24">
					<el-form-item label="延期备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '01'" :span="24">
					<el-form-item label="中止原因">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '01'" :span="24">
					<el-form-item label="中止备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="['02','06'].includes(detailsInfo.workOrderAudit.type)" :span="24">
					<el-form-item label="是否公开">{{detailsInfo.workOrderAudit.publicStatus == 'Y'?'是':'否'}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '02'" :span="24">
					<el-form-item label="终止备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '06'" :span="24">
					<el-form-item label="办结理由">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '06'" :span="24">
					<el-form-item label="结案状态">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '06'" :span="24">
					<el-form-item label="结案类型">{{detailsInfo.workOrderAudit.applyOther || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '03'" :span="24">
					<el-form-item label="不受理原因">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '03'" :span="24">
					<el-form-item label="不受理备注">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '03'" :span="24">
					<el-form-item label="不受理告知书">
						<el-table v-if="detailsInfo.workOrderAudit.rejectFile != ''"
							:data="[detailsInfo.workOrderAudit.rejectFile]" size="mini" :show-header="false">
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

				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
					<el-form-item label="办结类型">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
					<el-form-item label="办结理由">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
					<el-form-item
						label="结果反馈">{{detailsInfo.workOrderAudit.satisfactionLevel =='common'?'一般':detailsInfo.workOrderAudit.satisfactionLevel =='satisfaction'?'满意':detailsInfo.workOrderAudit.satisfactionLevel =='noSatisfaction'?'不满意':'' }}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 25" :span="24">
					<el-form-item label="终止类型">{{detailsInfo.workOrderAudit.applyReason || ''}}</el-form-item>
				</el-col>
				<el-col v-if="detailsInfo.workOrderAudit.type == 25" :span="24">
					<el-form-item label="终止理由">{{detailsInfo.workOrderAudit.applyComment || ''}}</el-form-item>
				</el-col>

				<el-row
					v-if="(detailsInfo.workOrderAudit.type == 25 || detailsInfo.workOrderAudit.type == '07') && detailsInfo.questionMainInfo.isArrear">
					<el-col :span="8">
						<el-form-item
							label="投诉欠款">{{detailsInfo.questionMainInfo.govArrears.contractAmount != ''?(detailsInfo.questionMainInfo.govArrears.contractAmount +'万元'):""}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item
							label="确认欠款">{{detailsInfo.confirmUnPayAmount != ''?(detailsInfo.confirmUnPayAmount + '万元'):''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="已清欠款">{{detailsInfo.payedAmount != ''?(detailsInfo.payedAmount + '万元'):""}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item
							label="剩余欠款">{{detailsInfo.unPayAmount != ''?(detailsInfo.unPayAmount + '万元'):""}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="制定计划">{{ detailsInfo.makePayPlan == '1'?'是':'否'}}</el-form-item>
					</el-col>
					<el-col :span="24" v-if="detailsInfo.makePayPlan == '1'">
						<el-form-item label="还款计划">
							<el-table :data="repaymentPlan" size="mini" border class="repayment-plan-table"
								style="width: 100%;">
								<el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
								<el-table-column prop="planPayTime" label="计划还款日期" align="center"></el-table-column>
								<el-table-column prop="amount" label="还款金额（万元）" align="center"></el-table-column>
							</el-table>

						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="计划还款">{{detailsInfo.makePayPlanAmount != ''?(detailsInfo.makePayPlanAmount + '万元'):""}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="其他还款">{{detailsInfo.otherAmount != ''?(detailsInfo.otherAmount + '万元'):""}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="支付备注">{{detailsInfo.payNote || '-'}}</el-form-item>
					</el-col>
				</el-row>

				<el-col v-if="detailsInfo.workOrderAudit.type == '00'" :span="24">
					<el-form-item label="附件">
						<el-table v-if="detailsInfo.addTimeAttachment && detailsInfo.addTimeAttachment.length"
							:data="detailsInfo.addTimeAttachment" size="mini" :show-header="false">
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




				<el-col v-if="detailsInfo.workOrderAudit.type == '25'" :span="24">
					<el-form-item label="终止审批单">
						<el-table v-if="detailsInfo.overWorkOrderVo.completeFinishFile != ''"
							:data="[detailsInfo.overWorkOrderVo.completeFinishFile]" size="mini" :show-header="false">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '25'" :span="24">
					<el-form-item label="终止意见书">
						<el-table
							v-if="detailsInfo.overWorkOrderVo.reportFile && detailsInfo.overWorkOrderVo.reportFile.length"
							:data="detailsInfo.overWorkOrderVo.reportFile" size="mini" :show-header="false">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '25'" :span="24">
					<el-form-item label="终止通知书">
						<el-table
							v-if="detailsInfo.overWorkOrderVo.reportNoticeFile && detailsInfo.overWorkOrderVo.reportNoticeFile.length"
							:data="detailsInfo.overWorkOrderVo.reportNoticeFile" size="mini" :show-header="false">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == 25" :span="24">
					<el-form-item label="附件">
						<el-table
							v-if="detailsInfo.overWorkOrderVo.attachmentList && detailsInfo.overWorkOrderVo.attachmentList.length"
							:data="detailsInfo.overWorkOrderVo.attachmentList" size="mini" :show-header="false">
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



				<el-col v-if="detailsInfo.workOrderAudit.type == 24" :span="24">
					<el-form-item label="审批单">
						<el-table
							v-if="detailsInfo.applyReviewAttachmentList && detailsInfo.applyReviewAttachmentList.length"
							:data="detailsInfo.applyReviewAttachmentList" size="mini" :show-header="false">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
					<el-form-item label="结案审批单">
						<el-table
							v-if="detailsInfo.workOrderSubmitFinishResult.completedFinishFile && detailsInfo.workOrderSubmitFinishResult.completedFinishFile.length > 0"
							:data="detailsInfo.workOrderSubmitFinishResult.completedFinishFile" size="mini"
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
					<el-form-item label="结案意见书">
						<el-table
							v-if="detailsInfo.workOrderSubmitFinishResult.reportList && detailsInfo.workOrderSubmitFinishResult.reportList.length > 0"
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
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



				<el-col v-if="detailsInfo.workOrderAudit.type == '01'" :span="24">
					<el-form-item label="中止调查告知单">
						<el-table v-if="detailsInfo.workOrderAudit.attachmentFile != ''"
							:data="JSON.parse(detailsInfo.workOrderAudit.attachmentFile)" size="mini"
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
				<el-col v-if="detailsInfo.workOrderAudit.type == 30" :span="24">
					<el-form-item label="受理告知书">
						<el-table v-if="detailsInfo.receiveAttachments && detailsInfo.receiveAttachments.length"
							:data="detailsInfo.receiveAttachments" size="mini" :show-header="false">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '07'" :span="24">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '32'" :span="24">
					<el-form-item label="附件">
						<el-table v-if="detailsInfo.superviseAttachments && detailsInfo.superviseAttachments.length"
							:data="detailsInfo.superviseAttachments" size="mini" :show-header="false">
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
				<el-col v-if="detailsInfo.workOrderAudit.type == '33'" :span="24">
					<el-form-item label="附件">
						<el-table v-if="detailsInfo.exceptionAttachments && detailsInfo.exceptionAttachments.length"
							:data="detailsInfo.exceptionAttachments" size="mini" :show-header="false">
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

		<div class="module-head" style="margin-top: 10px;background: linear-gradient(90deg,#138a43 0,#eeffe6);">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">审批流程记录</span>
		</div>
		<div style="padding-left: 10px;">
			<auditProcessRecord :records="auditDatas" />
		</div>
		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible"
			:filePath="previewDialog.fileURL" width="900px">
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
	import {
		splxDict
	} from "@/utils/dict";

	export default {
		name: "overDialog",
		components: {
			previewDialog,
			auditProcessRecord
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo', 'auditDatas'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				repaymentPlan: [],
			};
		},
		created() {
			this.getPayPlan()
		},
		methods: {
			getPayPlan() {
				workOrderApi.all.queryPayPlan({
						workOrderId: this.detailsInfo.id
					})
					.then(res => {
						this.repaymentPlan = res.result

					})
			},
			splxDictTrans(code) {
				let obj = splxDict.find(item => item.value == code)
				return obj.label
			},

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
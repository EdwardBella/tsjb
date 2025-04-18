<template>
	<div v-loading="loading">
		<drawer title="案件详情" :visible="visible" @close="handleClose" :style="`width: 1550px; max-width: 100%`">
			<div class="work-order-details">
				<!--        <remarkDrawer :visible.sync="remarkDrawer.visible" ></remarkDrawer>-->
				<el-alert v-if="details.supervisionTag === '1'" style="margin-bottom: 10px; border-radius: 2px"
					title="跟踪中" type="warning" :closable="false" show-icon>
					案件由于涉及已制定还款计划进入到跟踪状态。
				</el-alert>
				<el-alert v-if="details.exceptionTag === '1'" style="margin-bottom: 10px; border-radius: 2px" title="异常"
					type="error" :closable="false" show-icon>
					案件由于未及时履行还款，已被标记为异常，请及时处理异常还款并联系省营商环境主管部门解除异常。
				</el-alert>
				<div class="details-content">
					<div v-if="['distribute', 'process', 'all', 'audit'].includes(type)" class="left">
						<el-tabs v-model="leftActiveTab">
							<el-tab-pane label="文书" name="1">
								<relatedDocuments :type="type" :uploadFileTypeDialog="uploadFileTypeDialog"
									:details="details" :playLoadData="playLoadData" :handlePreview="handlePreview">
								</relatedDocuments>
							</el-tab-pane>
							<el-tab-pane label="备注" name="2">
								<remarkDrawer :workOrderId="details.id" :workOrderNo="details.workOrderNo"
									:details="details"></remarkDrawer>
							</el-tab-pane>
						</el-tabs>
					</div>

					<div class="right" :style="`width : ${type==='appraise' ? '100%' : 'calc(100% - 300px)'};`">
						<div ref="contentScroll" class="beautify-scroll"
							:style="`height: calc(100vh - 36px - 20px - 74px - ${extendHeight ? extendHeight : '0px'} - ${details.exceptionTag === '1' ? '70px' : '0px'} - ${details.supervisionTag === '1' ? '70px' : '0px'});`">
							<!-- 不受理 && 没有 workOrderNumber 不显示-->
							<div v-if="!([6].includes(details.status) && !details.workOrderNumber)" class="card">
								<div class="header" style="border-bottom: none; background: transparent;">
									<div class="title point-none">
										<span v-if="details.materialCorrectStatus === 0"
											class="tag warning">材料补正中</span>
										<span v-if="[9].includes(details.status)" class="tag warning">投诉人撤回中</span>
										<span v-else-if="[10].includes(details.status)"
											class="tag warning">投诉人已撤回</span>
										<span v-else-if="details.auditFlag === 'Y'"
											class="tag success">{{ details.workOrderAudit.auditStatus }}</span>
										<span v-else-if="details.isDuplicated === 'Y'" class="tag orange"
											style="background: rgba(245,91,35)">疑似重复</span>
										<span v-else-if="![5, 6].includes(details.status)"
											class="tag primary">经办中</span>
										<span v-if="details.repeatCheck === 'Y'" class="tag primary">复议</span>
										&nbsp;{{ details.workOrderNumber }}
									</div>
									<div v-if="details.status < 5" class="time">
										<template v-if="details.materialCorrectStatus === 0">
											<span>补正截止日期：</span><span>{{ details.lastCompleteTime }}</span>
										</template>
										<template v-else>
											<i class="img icon-clock" style="width: 18px; height: 18px"></i>
											<span>处理剩余时限：</span>
											<span
												:class="['', 'color-warning', 'color-danger'][countDownStatus(details.countDown, details.status)]">{{
                          details.countDown | formatDHMS
                        }}</span>
										</template>
									</div>
								</div>
							</div>

							<el-alert v-if="[9, 10].includes(details.status)" style="margin: 20px 0; border-radius: 2px"
								title="撤回理由：" type="warning" :closable="false" show-icon>
								{{ details.reason || "-" }}
							</el-alert>

							<div class=" card">
								<div class="header">
									<div class="title">基本信息</div>
									<template v-if="[0, 2, 1, 3].includes(details.status) && details.auditFlag === 'N'">
										<span v-if="details.materialCorrectStatus === 0">
											<span>材料补正中</span>&nbsp
										</span>
									</template>
								</div>
								<el-form class="key-value" label-width="110px">
									<el-form-item label="案件标题：">{{ details.title }}</el-form-item>
									<el-form-item label="案件类型：">{{ details.itemDetailName }}</el-form-item>

									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item
												label="投诉人：">{{ details.createUsername || "-" }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="投诉人类型：" label-width="100px">
												{{ details.createType | workOrderCreatorType }}
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="联系电话：">{{ details.mobile || "-" }}</el-form-item>
										</el-col>
									</el-row>
									<el-form-item label="通讯地址：">{{ details.mailAddress || "-" }}</el-form-item>
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item v-if="details.companyContactName" label="企业联系人姓名："
												label-width="110px" class="line-height-2">
												<template v-slot:label>企业联系&nbsp;&nbsp;&nbsp;<br />人姓名：</template>
												{{ details.companyContactName }}
											</el-form-item>
											<el-form-item v-if="details.entrustedEnterpriseName" label="企业联系人姓名："
												label-width="110px" class="line-height-2">
												<template v-slot:label>受委托&nbsp;&nbsp;&nbsp;<br />企业名称：</template>
												{{ details.entrustedEnterpriseName }}
											</el-form-item>
											<el-form-item label="案件来源：" label-width="110px">
												{{ details.itemSource | workOrderEventSource }}
											</el-form-item>
											<el-form-item label="主管单位："
												label-width="110px">{{ details.acceptDepartment }}</el-form-item>
											<el-form-item label="办结时间：" label-width="110px">
												{{ workOrderProcessResult.createTime || "-" }}
											</el-form-item>
											<el-form-item
												label="案件状态：">{{ details.status | workOrderStatus }}</el-form-item>
											<el-form-item label="涉及欠款："
												label-width="110px">{{ details.debtAmount ? "是" : "否" }}</el-form-item>
											<el-form-item label="市场主体评价："
												label-width="110px">{{ workOrderAppraise.satisfiedScore }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item v-if="details.companyContactIdNum" label="企业联系人身份证号："
												label-width="100px" class="line-height-2">
												<template v-slot:label>企业联系人&nbsp;&nbsp;&nbsp;<br />身份证号：</template>
												{{ details.companyContactIdNum }}
											</el-form-item>
											<el-form-item v-if="details.entrustedEnterpriseIdNum" label-width="100px"
												class="line-height-2">
												<template v-slot:label>受委托&nbsp;&nbsp;&nbsp;<br />企业编码：</template>
												{{ details.entrustedEnterpriseIdNum }}
											</el-form-item>

											<el-form-item label="事发地："
												label-width="100px">{{ details.address }}</el-form-item>
											<el-form-item label="承办单位："
												label-width="100px">{{ details.processDepartment || "-" }}
											</el-form-item>
											<el-form-item label="实际用时："
												label-width="100px">{{ actualProcessDay }}</el-form-item>
											<!--                      <el-form-item label="公开状态：" label-width="100px">-->
											<!--                        <template v-if="details.status < 4">-</template>-->
											<!--                        <template v-else>-->
											<!--                          {{ details.publicStatus | workOrderPublicStatus }}-->
											<!--                        </template>-->
											<!--                      </el-form-item>-->
											<el-form-item label="欠款金额："
												label-width="100px">{{ details.debtAmount | money }}</el-form-item>
											<el-form-item label="回访结果："
												label-width="100px">{{ lastWorkOrderEvaluates.evaluateResult | workOrderAtisFactionLevel }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item v-if="details.companyAddress" label="企业住所地："
												label-width="110px">
												{{ details.companyAddress }}
											</el-form-item>
											<el-form-item label="投诉对象："
												label-width="110px">{{ details.addressDepartmentName }}
											</el-form-item>
											<el-form-item label="发布时间："
												label-width="110px">{{ details.createTime }}</el-form-item>
											<el-form-item label="评价时间："
												label-width="110px">{{ workOrderAppraise.createTime || "-" }}
											</el-form-item>
											<el-form-item label="立案时间："
												label-width="110px">{{ details.filingTime || "-" }}</el-form-item>
											<el-form-item label="结案反馈：" label-width="110px">
												{{
                          workOrderSubmitFinishResult.satisfactionLevel | workOrderAtisFactionLevel
                        }}
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</div>

							<template v-if="type === 'audit'">
								<div class=" card">
									<div class="header">
										<div class="title">待审批信息</div>
									</div>
									<el-form v-if="details.workOrderAudit" class="key-value" label-width="130px"
										label-suffix="：">
										<template v-if="details.workOrderAudit.type === '05'">
											<el-form-item
												label="类型">{{ details.workOrderAudit.type | workOrderAuditType }}</el-form-item>
											<el-form-item
												label="承办单位">{{ details.workOrderAudit.nextDepartment }}</el-form-item>
											<el-form-item label="自办/转办备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>
										</template>

										<template v-if="details.workOrderAudit.type === '03'">
											<el-form-item
												label="不受理原因">{{ details.workOrderAudit.applyReason }}</el-form-item>
											<el-form-item label="不受理备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>
										</template>

										<template v-if="details.workOrderAudit.type === '01'">
											<el-form-item
												label="中止原因">{{ details.workOrderAudit.applyReason }}</el-form-item>
											<el-form-item label="中止备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>

										</template>

										<template v-if="details.workOrderAudit.type === '07'">
											<el-form-item
												label="提交办结类型">{{ details.workOrderAudit.applyReason }}</el-form-item>
											<el-form-item label="提交办结备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>
										</template>

										<template v-if="details.workOrderAudit.type === '00'">
											<el-form-item
												label="延期原因">{{ details.workOrderAudit.applyReason }}</el-form-item>
											<el-form-item
												label="延期天数">{{ details.workOrderAudit.applyOther !== 'null' ? details.workOrderAudit.applyOther : 30 }}天</el-form-item>
											<el-form-item label="延期备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>
										</template>

										<template v-if="details.workOrderAudit.type === '04'">
											<el-form-item
												label="移交单位">{{ details.workOrderAudit.nextDepartment }}</el-form-item>
											<el-form-item label="移交备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>
										</template>


										<template v-if="details.workOrderAudit.type === '06'">
											<el-form-item
												label="是否公开">{{ details.workOrderAudit.publicStatus | workOrderPublicStatus }}</el-form-item>
											<el-form-item label="办结备注">
												<div v-html="txt2HTML(details.workOrderAudit.applyComment)"></div>
											</el-form-item>
										</template>

										<el-form-item label="结案反馈">
											{{ workOrderAudit.satisfactionLevel | workOrderAtisFactionLevel }}
										</el-form-item>

										<el-form-item
											label="审批状态">{{ details.workOrderAudit.auditStatus }}</el-form-item>

										<el-form-item v-if="details.workOrderAudit.attachmentFile.length" label="附件">
											<el-table :data="details.workOrderAudit.attachmentFile" size="mini">
												<el-table-column prop="fileName" label="附件"></el-table-column>
												<el-table-column prop="fileName" label="文件名称"></el-table-column>
												<el-table-column label="操作" width="160px" align="center">
													<template slot-scope="{row}">
														<el-button @click="handleDownload(row)" type="text"
															plain>下载</el-button>
														<el-button @click="handlePreview(row)" type="text"
															plain>预览</el-button>
													</template>
												</el-table-column>
											</el-table>
										</el-form-item>
										<el-form-item v-if="details.workOrderAudit.reportFile.length" label="报告">
											<el-table :data="details.workOrderAudit.reportFile" size="mini">
												<el-table-column prop="fileName" label="报告"></el-table-column>
												<el-table-column prop="fileName" label="文件名称"></el-table-column>
												<el-table-column label="操作" width="160px" align="center">
													<template slot-scope="{row}">
														<el-button @click="handleDownload(row)" type="text"
															plain>下载</el-button>
														<el-button @click="handlePreview(row)" type="text"
															plain>预览</el-button>
													</template>
												</el-table-column>
											</el-table>
										</el-form-item>

										<template
											v-if="details.status === 3 && details.auditFlag === 'Y' && type === 'audit'">
											<el-row :gutter="20">
												<el-col :span="8">
													<el-form-item
														label="欠款金额">{{ details.debtAmount | money }}</el-form-item>
													<el-form-item label="支付备注">
														<div v-html="txt2HTML(details.payNote)"></div>
													</el-form-item>
												</el-col>
												<el-col :span="8">
													<el-form-item
														label="已支付金额">{{ details.payedAmount | money }}</el-form-item>
												</el-col>
												<el-col :span="8">
													<el-form-item label="已制定支付计划金额" label-width="154px">
														{{ details.makePayPlanAmount | money }}
													</el-form-item>
												</el-col>
											</el-row>
										</template>
									</el-form>
								</div>

								<div class=" card">
									<div class="header" style="margin-bottom: 16px;">
										<div class="title">审批流程记录</div>
									</div>
									<auditProcessRecord :records="auditProcess"></auditProcessRecord>
								</div>
							</template>

							<div class="card">
								<div class="header">
									<div class="title">举报内容</div>
								</div>
								<el-form class="key-value" label-width="105px">
									<el-form-item label="主要诉求：">
										<div v-html="txt2HTML(details.mainApply)"></div>
									</el-form-item>
									<el-form-item label="事实与理由：">
										<div v-html="txt2HTML(details.factReason)"></div>
									</el-form-item>
								</el-form>

								<el-table v-if="details.attachmentList && details.attachmentList.length"
									:data="details.attachmentList" size="mini">
									<el-table-column prop="fileName" label="附件名称"></el-table-column>
									<el-table-column prop="fileName" label="文件名称"></el-table-column>
									<el-table-column label="操作" width="160px" align="center">
										<template slot-scope="{row}">
											<el-button @click="handleDownload(row)" type="text" plain>下载</el-button>
											<el-button @click="handlePreview(row)" type="text" plain>预览</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>

							<div v-if="details.repeatCheck === 'Y'" class=" card">
								<div class="header">
									<div class="title">复议申请</div>
								</div>

								<el-form class="key-value" label-width="90px">
									<el-form-item label="提出时间：">
										{{details.repeatCheckTime}}
									</el-form-item>
									<el-form-item label="提出理由：">
										<div v-html="txt2HTML(details.repeatCheckReason)"></div>
									</el-form-item>
								</el-form>

								<el-table v-if="details.repeatCheckAttachments && details.repeatCheckAttachments.length"
									:data="details.repeatCheckAttachments" size="mini" style="margin-top: 10px">
									<el-table-column prop="fileName" label="复议文件"></el-table-column>
									<el-table-column label="操作" width="160px" align="center">
										<template slot-scope="{row}">
											<el-button @click="handleDownload(row)" type="primary" plain
												size="mini">下载</el-button>
											<el-button @click="handlePreview(row)" type="primary" plain
												size="mini">预览</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>

							<div v-if="details.debtAmount > 0 && [4, 5].includes(details.status)" class=" card">
								<div class="header">
									<div class="title">还款信息</div>
									<el-button v-if="repaymentPlan.length" @click="onShowRepaymentPlanDialog"
										type="primary" plain size="mini">还款计划
									</el-button>
								</div>
								<el-form class="key-value" ref="appraiseForm" label-suffix="：">
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item label="欠款金额">{{ details.debtAmount | money }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="已支付金额">{{ details.payedAmount | money }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item
												label="确认欠款金额">{{ details.confirmUnPayAmount | money }}</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="8">
											<el-form-item
												label="是否已偿还全部欠款">{{ details.payAllAmount | baseBool }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item
												label="制定还款计划">{{ details.makePayPlan | baseBool }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item v-if="details.makePayPlan === '1'" label="制定计划金额">
												{{ details.makePayPlanAmount | money }}
											</el-form-item>
										</el-col>
									</el-row>

									<el-row v-if="details.makePayPlan === '1'" :gutter="20">
										<!--                    <el-col :span="8">-->
										<!--                      <el-form-item label="协商一致还款金额">{{ (details.makePayPlanAmount - details.payedAmount) | money }}</el-form-item>-->
										<!--                    </el-col>-->
										<el-col :span="8">
											<el-form-item
												label="计划已支付">{{ details.payAmountPayed | money }}</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item
												label="计划未支付">{{ details.payAmountNoPay | money }}</el-form-item>
										</el-col>
									</el-row>
									<el-form-item label="支付备注">
										<div v-html="txt2HTML(details.payNote)"></div>
									</el-form-item>
								</el-form>
							</div>

							<!-- 处理信息-->
							<div v-if="details.workOrderSubmitFinishResult" class=" card" style="margin-top: 20px">
								<div class="header">
									<div class="title">提交办结信息</div>
								</div>

								<el-form class="key-value" ref="appraiseForm" label-width="130px" label-suffix="：">
									<el-form-item
										label="提交办结类型">{{ details.workOrderSubmitFinishResult.reason }}</el-form-item>
									<el-form-item label="提交办结备注">
										<div v-html="txt2HTML(details.workOrderSubmitFinishResult.comment)"></div>
									</el-form-item>
									<el-form-item label="结案反馈">
										<div>
											{{ details.workOrderSubmitFinishResult.satisfactionLevel | workOrderAtisFactionLevel }}
										</div>
									</el-form-item>
									<!--              <el-form-item label="结案报告："></el-form-item>-->

									<el-table
										v-if="workOrderSubmitFinishResult.reportList && workOrderSubmitFinishResult.reportList.length"
										:data="details.workOrderSubmitFinishResult.reportList" size="mini"
										style="margin-top: 10px">
										<el-table-column prop="fileName" label="结案报告"></el-table-column>
										<el-table-column prop="fileName" label="文件名称"></el-table-column>
										<el-table-column label="操作" width="160px" align="center">
											<template slot-scope="{row}">
												<el-button @click="handleDownload(row)" type="primary" plain
													size="mini">下载</el-button>
												<el-button @click="handlePreview(row)" type="primary" plain
													size="mini">预览</el-button>
											</template>
										</el-table-column>
									</el-table>

									<el-table
										v-if="workOrderSubmitFinishResult.attachmentList && workOrderSubmitFinishResult.attachmentList.length"
										:data="details.workOrderSubmitFinishResult.attachmentList" size="mini"
										style="margin-top: 10px">
										<el-table-column prop="fileName" label="附件"></el-table-column>
										<el-table-column prop="fileName" label="文件名称"></el-table-column>
										<el-table-column label="操作" width="160px" align="center">
											<template slot-scope="{row}">
												<el-button @click="handleDownload(row)" type="primary" plain
													size="mini">下载</el-button>
												<el-button @click="handlePreview(row)" type="primary" plain
													size="mini">预览</el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-form>
							</div>

							<!-- 评价详情-->
							<div v-if="details.appraiseStatus === 'Y'" class=" card">
								<div class="header">
									<div class="title">市场主体评价</div>
								</div>
								<el-form class="key-value" ref="appraiseForm" label-width="120px">
									<el-row :gutter="0">
										<el-col :span="9">
											<el-form-item label="整体满意度：">
												<startAppraise :value="workOrderAppraise.satisfiedScore" readonly>
												</startAppraise>
											</el-form-item>
										</el-col>
										<!--                    <el-col :span="9">-->
										<!--                      <el-form-item label="处理时效性：">-->
										<!--                        <startAppraise :value="workOrderAppraise.processEffectiveScore" readonly></startAppraise>-->
										<!--                      </el-form-item>-->
										<!--                    </el-col>-->
										<!--                    <el-col :span="6">-->
										<!--                      <el-form-item label="处理有效性：">-->
										<!--                        <startAppraise :value="workOrderAppraise.processAvailableScore" readonly></startAppraise>-->
										<!--                      </el-form-item>-->
										<!--                    </el-col>-->
									</el-row>
									<el-form-item label="评价内容：">
										<div v-html="txt2HTML(details.workOrderAppraise.comment)"></div>
									</el-form-item>
								</el-form>
							</div>

							<div v-for="item in details.materialCorrectionDtoList" class=" card">
								<div class="header">
									<div class="title">补正材料</div>
								</div>
								<el-form class="key-value" ref="appraiseForm" label-width="120px" label-suffix="：">
									<el-form-item label="补正要求">
										<div v-html="txt2HTML(item.correctRequirement)"></div>
									</el-form-item>
									<el-form-item label="补正文件"></el-form-item>
									<el-table :data="item.workOrderAttachments" size="mini">
										<el-table-column prop="fileName" label="附件">
											<template slot-scope="{row}">
												{{ row.fileName | filename }}
											</template>
										</el-table-column>
										<el-table-column prop="fileName" label="文件名称"></el-table-column>
										<el-table-column label="操作" width="160px" align="center">
											<template slot-scope="{row}">
												<el-button @click="handleDownload(row)" type="primary" plain
													size="mini">下载</el-button>
												<el-button @click="handlePreview(row)" type="primary" plain
													size="mini">预览</el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-form>
							</div>

							<div v-if="details.status === 5" class=" card">
								<div class="header">
									<div class="title">评价回访</div>
									<el-button v-if="userRoles.isTopAuthority"
										@click="returnSurveysDialog.visible = true" size="mini" type="primary"
										plain>添加评价回访</el-button>
								</div>
								<template v-for="(item, index) in workOrderEvaluates">
									<div :key="item.id">
										<el-form class="key-value" label-width="80px" label-suffix=":"
											style="border-bottom: 1px dashed rgb(228 228 228);">
											<h3 style="margin-top: 10px;"><span class="dot"
													style="margin-right: 5px; vertical-align: top;margin-top: 6px;"></span>第
												{{ index + 1 }} 次回访</h3>
											<el-row style="margin-left: 5px;" :gutter="20">
												<el-col :span="8">
													<el-form-item label="回访日期">{{ item.evaluateDate }}</el-form-item>
												</el-col>
												<el-col :span="8">
													<el-form-item
														label="回访结果">{{ item.evaluateResult | workOrderAtisFactionLevel }}</el-form-item>
												</el-col>
												<el-col :span="8">
													<el-form-item label="操作人">{{ item.operateUser }}</el-form-item>
												</el-col>
											</el-row>
											<el-form-item label="备注">{{ item.evaluateNotes }}</el-form-item>
										</el-form>
									</div>
								</template>
							</div>

							<!-- 处理流程-->
							<div class=" card">
								<div class="header">
									<div class="title">处理流程</div>
								</div>

								<el-table :data="details.processList" size="mini" style="margin-top: 10px">
									<el-table-column prop="operateName" label="操作名称"></el-table-column>
									<el-table-column prop="processUser" label="操作人"></el-table-column>
									<el-table-column prop="processUser" label="总用时">
										<template slot-scope="{row}">
											<template
												v-if="!(row.operateName.indexOf('创建案件') > -1)">{{ row.costTime | hourMinute }}
											</template>
										</template>
									</el-table-column>
									<el-table-column prop="createTime" label="操作时间"></el-table-column>
									<el-table-column label="操作" width="80px" align="center">
										<template slot-scope="{row}">
											<el-button v-if="!hideProcessDetailsBtn(row.operateType)"
												@click="handleShowProcessDetailsDialog(row)" type="text" plain>查看
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>

						</div>
						<slot name="extend" :details="details"></slot>
						<div v-if="loading === false" class="dialog-footer-btn beautify-scroll"
							style="box-shadow: 0px -2px 5px 0px rgba(0,0,0,0.2); overflow-x: auto; display: flex; flex-wrap: nowrap; justify-content: center;">
							<el-button @click="handleClose" type="primary">关闭</el-button>
							<!-- 不在审核、待受理 -->
							<template
								v-if="details.auditFlag === 'N' && details.status === 0 && type === 'all' && isLeaderDepartment">
								<el-button v-if="details.materialCorrectStatus !== 0"
									@click="replenishDialog.visible = true" type="primary">发起材料补正</el-button>
								<el-button v-else @click="handleRevoke" type="primary">撤回材料补正</el-button>
							</template>
							<slot name="footer-btn" :details="details"></slot>


							<!--              <el-button @click="remarkDrawer.visible = true" type="primary">案件备注 {{ myWorkOrderRemark }}</el-button>-->
						</div>
					</div>
				</div>
			</div>

		</drawer>
		<processDetailsDialog :records="auditProcess" :type="type" :visible.sync="processDetailsDialog.visible"
			:id="processDetailsDialog.details.id"></processDetailsDialog>
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL"></previewDialog>
		<replenishDialog :visible.sync="replenishDialog.visible" :workOrderId="details.id" @success="replenishSuccess">
		</replenishDialog>

		<uploadFileTypeDialog :visible.sync="uploadFileTypeDialog.visible" :workOrderId="details.id"
			@success="playLoadData"></uploadFileTypeDialog>
		<!--    <el-dialog append-to-body-->
		<!--      title="请选择上传"-->
		<!--      :visible.sync="uploadFileTypeDialog.visible"-->
		<!--      width="600px"-->
		<!--      :before-close="() => uploadFileTypeDialog.visible = false">-->
		<!--      <div style="text-align: center">-->
		<!--        <upload  v-slot:default="{uploading}">-->
		<!--          <div v-loading="uploading">-->
		<!--            <el-button-group>-->
		<!--              <el-button @click="fileCode = 6" type="primary">投诉举报附件</el-button>-->
		<!--              <el-button @click="fileCode = 0" type="primary">投诉举报过程文件</el-button>-->
		<!--              <el-button @click="fileCode = 5" type="primary">投诉举报通知书</el-button>-->
		<!--            </el-button-group>-->
		<!--          </div>-->
		<!--        </upload>-->
		<!--      </div>-->
		<!--    </el-dialog>-->

		<repaymentPlanDialog :visible.sync="repaymentPlanDialog.visible" :workOrderDetails="details"
			:repaymentPlan="repaymentPlan" @success="playLoadData"></repaymentPlanDialog>

		<returnSurveysDialog @success="playLoadData" :visible.sync="returnSurveysDialog.visible"
			:workOrderNo="details.workOrderNo"></returnSurveysDialog>
	</div>
</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import fileList from "@/components/fileList/index.vue";
	import processDetailsDialog from "@/views/workOrder/components/processDetailsDialog";
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import replenishDialog from "@/views/workOrder/components/replenishDialog";
	import relatedDocuments from "@/views/workOrder/components/relatedDocuments";
	import uploadFileTypeDialog from "@/views/workOrder/components/uploadFileTypeDialog.vue";
	import upload from "@/components/upload";
	import drawer from "@/components/drawer.vue";
	import * as fileApi from "@/api/file";
	import {
		baseBool,
		filename,
		formatDHMS,
		hourMinute,
		money,
		timeFormatDHMS,
		timeRemaining,
		timeRemainingDHMS,
		txt2HTML,
		workOrderAppraiseStatus,
		workOrderAtisFactionLevel,
		workOrderAuditStatus,
		workOrderAuditType,
		workOrderComplaintObjectType,
		workOrderCreatorType,
		workOrderEventSource,
		workOrderProcessAuditStatus,
		workOrderPublicIntention,
		workOrderPublicStatus,
		workOrderStatus,
	} from "@/utils/filters";
	import * as mixins from "@/utils/mixins";
	import {
		calcWorkOrderCountDownStatus,
		isEmpty
	} from "@/utils/common";
	import * as dictApi from "@/api/dict";
	import moment from "moment";
	import startAppraise from "@/components/startAppraise/index.vue";
	import auditProcessRecord from "@/views/workOrder/components/auditProcessRecord";
	import repaymentPlanDialog from "@/views/workOrder/components/repaymentPlanDialog.vue";
	import remarkDrawer from "@/views/workOrder/components/remarkDrawer.vue";
	import returnSurveysDialog from "@/views/workOrder/components/returnSurveysDialog.vue";
	import * as remarkAPI from "@/api/remark";
	import {
		mapState
	} from "vuex";
	import {
		rolePermissionsMixin
	} from "@/views/workOrder/mixin";

	export default {
		name: "detailsDialog",
		components: {
			drawer,
			startAppraise,
			processDetailsDialog,
			previewDialog,
			upload,
			replenishDialog,
			fileList,
			auditProcessRecord,
			repaymentPlanDialog,
			remarkDrawer,
			returnSurveysDialog,
			relatedDocuments,
			uploadFileTypeDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.affirm, rolePermissionsMixin],
		filters: {
			workOrderEventSource,
			workOrderStatus,
			timeRemaining,
			workOrderCreatorType,
			workOrderPublicStatus,
			workOrderPublicIntention,
			timeRemainingDHMS,
			hourMinute,
			workOrderAppraiseStatus,
			timeFormatDHMS,
			formatDHMS,
			workOrderComplaintObjectType,
			filename,
			workOrderAuditType,
			workOrderAuditStatus,
			workOrderProcessAuditStatus,
			money,
			workOrderAtisFactionLevel,
			baseBool
		},
		props: ["visible", "id", "canShowAppraiseForm", "type", "extendHeight"],
		data() {
			return {
				publishing: false,
				loading: false,
				details: {},
				eventSourceArr: [],
				leftActiveTab: "1",
				processDetailsDialog: {
					details: {},
					visible: false
				},
				previewDialog: {
					fileURL: "",
					visible: false
				},
				repaymentPlanDialog: {
					visible: false
				},
				remarkDrawer: {
					visible: false
				},
				returnSurveysDialog: {
					visible: false
				},
				replenishDialog: {
					visible: false
				},
				uploadFileTypeDialog: {
					visible: false
				},
				auditProcess: [],
				uploadFileType: 1,
				fileCode: 0,
				repaymentPlan: [],
				myWorkOrderRemark: ""
			};
		},
		computed: {
			...mapState(["userRoles"]),
			actualProcessDay() {
				const actualProcessDay = this.details.actualProcessDay;
				if (isEmpty(actualProcessDay)) return "-";
				return `${timeFormatDHMS(Number(actualProcessDay) * 1000)}`;
			},
			workOrderProcessResult() {
				return this.details.workOrderProcessResult || {};
			},
			workOrderSubmitFinishResult() {
				return this.details.workOrderSubmitFinishResult || {};
			},
			workOrderAppraise() {
				return this.details.workOrderAppraise || {};
			},
			workOrderAudit() {
				return this.details.workOrderAudit || {};
			},
			workOrderEvaluates() {
				return this.details.workOrderEvaluates || [];
			},
			lastWorkOrderEvaluates() {
				return this.workOrderEvaluates[this.workOrderEvaluates.length - 1] || {};
			}
		},
		watch: {
			visible(val) {
				if (val) {

					this.playLoadData();

					this.$nextTick(() => {
						this.$refs.contentScroll.scrollTop = 0;
					});

				} else {
					this.$nextTick().then(() => {
						this.details = {};
						this.leftActiveTab = "1";
					})
				}
			},
			"remarkDrawer.visible"(val) {
				this.queryMyWorkOrderRemark();
			}
		},
		created() {

		},
		methods: {
			txt2HTML,

			countDownStatus: calcWorkOrderCountDownStatus,

			getAuditLog() {
				workOrderApi.audit.log({
						actionTypeNumber: this.details.workOrderAudit.actionTypeNumber

					})
					.then(r => {
						this.auditProcess = r.result;
					});
			},

			handleShowProcessDetailsDialog(details) {
				this.processDetailsDialog.details = details;
				this.processDetailsDialog.visible = true;
			},
			getEventSource() {
				return dictApi.list({
					parentCode: "1001"
				}).then(res => {
					this.eventSourceArr = res.result;
				});
			},
			hideProcessDetailsBtn(type) {
				return ["05", "09", "11", "12", "17", "21", "07", "00"].includes(type);
			},
			playLoadData() {
				clearInterval(this.timer);
				this.decorateLoading(() => {

					const api = workOrderApi[this.type] || workOrderApi.all;
					// const api =  workOrderApi.all;
					return api.detail(this.id)
						.then(res => {
							this.$emit("read");
							const data = res.result;

							if (data.workOrderAudit) {
								if (data.workOrderAudit.attachmentFile && data.workOrderAudit
									.attachmentFile !== "null") {
									data.workOrderAudit.attachmentFile = [JSON.parse(data.workOrderAudit
										.attachmentFile)];
								} else {
									data.workOrderAudit.attachmentFile = [];
								}

								if (data.workOrderAudit.reportFile && data.workOrderAudit.reportFile !==
									"null") {
									data.workOrderAudit.reportFile = [JSON.parse(data.workOrderAudit
										.reportFile)];
								} else {
									data.workOrderAudit.reportFile = [];
								}
							}

							// 投诉举报信息附件
							let allMaterialCorrectionDtoList = [];
							for (const item of data.materialCorrectionDtoList) {
								allMaterialCorrectionDtoList = allMaterialCorrectionDtoList.concat(item
									.workOrderAttachments.filter(item => {
										return Boolean(item.materialCorrectRecordId);
									}));
							}
							for (const item of data.processAttachmentList) {
								if (item.behavivor !== "") {
									allMaterialCorrectionDtoList.push(item);
								}
							}

							// 过程文件
							const processAttachmentList = [];
							for (const item of data.processAttachmentList) {
								if (item.behavivor === "") {
									processAttachmentList.push(item);
								}
							}

							data.processAttachmentList = processAttachmentList;
							data.allMaterialCorrectionDtoList = allMaterialCorrectionDtoList;


							// debugger
							this.details = data;


							if (this.type === "audit") this.getAuditLog();

							if (this.details.debtAmount > 0 && [4, 5].includes(this.details.status)) this
								.getPayPlan();

							this.queryMyWorkOrderRemark();

							const countDown = moment(this.details.currentStepDeadline).diff(moment(),
								"milliseconds");
							this.$set(this.details, "countDown", countDown);
							this.$emit("dataLoaded", this.details);


							if (countDown <= 0) return;
							clearInterval(this.timer);
							this.timer = setInterval(() => {
								this.details.countDown -= 1000;
								if (this.details.countDown <= 0) {
									clearInterval(this.timer);
									this.playLoadData();
								}

							}, 1000);


						});
				});
			},
			queryMyWorkOrderRemark() {
				remarkAPI.query({
					workOrderId: this.details.id
				}).then(r => {
					this.myWorkOrderRemark = r.result.length;
				});
			},
			getPayPlan() {
				workOrderApi.all.queryPayPlan({
						workOrderId: this.details.id
					})
					.then(r => {
						this.repaymentPlan = r.result;
					});
			},
			handleClose() {
				this.$emit("update:visible", false);
			},
			handleDownload(row) {
				fileApi.download({
					downloadFileName: row.fileName,
					filePath: row.fileUrl
				});
			},
			confirm(message) {
				return this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				});
			},
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				};
			},
			handleUploadSuccess({
				file,
				fileCode
			}) {
				// const file = fileList[fileList.length - 1]
				const data = {
					attachmentList: [file],
					id: this.details.id,
					code: fileCode
				};
				workOrderApi[this.type].addAttachment(data)
					.then(() => {
						// this.details.attachmentList.push(file)
						this.$modal.msgSuccess("上传成功");
						this.playLoadData();
						this.uploadFileTypeDialog.visible = false;
					});
			},
			handleRevoke() {
				this.confirm("确认撤销材料补正吗？")
					.then(() => workOrderApi.distribute.revoke({
						workOrderId: this.details.id
					}))
					.then(() => {
						this.playLoadData();
						this.$emit("replenishRevoke");
					});
			},
			replenishSuccess() {
				this.playLoadData();
				this.$emit("replenishSuccess");
			},
			onShowRepaymentPlanDialog() {
				this.repaymentPlanDialog.visible = true;
			}
		}
	};
</script>

<style lang="less" scoped>
	.card {
		.header {
			.title {
				font-size: 18px;
				color: @color-primary;
				display: flex;
				align-items: center;

				&.point-none::before {
					display: none;
				}
			}

			.time {
				display: flex;
				align-items: center;
				font-size: 18px;
				font-weight: 600;

				span:first-child {
					color: #323232;
				}
			}
		}
	}

	.process-list {}

	.process-item {
		//padding: 10px 0;
		height: 45px;
		display: flex;
		align-items: center;

		&>span {
			position: relative;
			min-height: 16px;
			flex: 1;

			&:first-child {
				padding-left: 30px;

				&::before {
					//margin-right: 20px;
					position: absolute;
					left: 0;
					top: 5px;
					content: "";
					width: 10px;
					height: 10px;
					background: #cccccc;
					border-radius: 50%;
					z-index: 2;
				}

				&::after {
					position: absolute;
					content: "";
					left: 4px;
					top: 5px;
					width: 1px;
					height: 45px;
					background: #cccccc;
					z-index: 1;
				}
			}
		}

		&.is-highlight {
			&>span {
				&:first-child {
					&::before {
						background: #0b5fd5;
						box-shadow: 0px 2px 4px 0px rgba(9, 78, 197, 0.30);
					}

					&::after {
						background-color: transparent;
					}
				}
			}
		}
	}

	.work-order-details {

		//position: relative;
		.details-content {
			display: flex;

			.left {
				width: 300px;
				margin-right: 20px;
			}

			//.right {
			//  width: calc(100% - 300px);
			//}

			/deep/ .el-tabs__nav {
				width: 100%;

				.el-tabs__item {
					width: 50%;
					text-align: center;
					font-size: 16px;
					color: #8C8C8C;
					border-bottom: none;

					&.is-active {
						border-bottom: 2px solid #0A6BF3;
						font-weight: 700;
						color: #0A6BF3;
					}
				}
			}
		}

		.beautify-scroll {
			overflow-x: hidden;
			height: calc(100vh - 36px - 20px - 74px);
		}
	}
</style>
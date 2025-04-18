<template>
	<div class="caseDetails" v-loading="loading" element-loading-text="拼命加载中">
		<div class="header-title">
			<span>案件详情</span>
		</div>
		<div class="content">
			<div class="left" v-if="basicType != 'appraise'">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="文书" name="first">
						<el-button plain style="width: 100%; height: 40px;margin-bottom: 10px;"
							@click="fileUp">上传文件</el-button>
						<el-cascader v-model="documentCode" ref="documentCode" :options="documentTypeList"
							:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'code',label:'name',children:'subDictList' }"
							filterable style="width: 100%; height: 40px;margin-bottom: 10px;"
							@change="addressIdChanged"></el-cascader>
						<el-scrollbar wrap-style="overflow-x:hidden;" style="width: 100%; height:calc(100vh - 222px);">
							<div class="table-con" style="display: flex;flex-direction: column; padding-right: 10px;">
								<div class="com-title">
									<span>预审阶段</span>
								</div>
								<div class="documentList" v-if="documentDatas['预审阶段'].length>0">
									<div class="item" v-for="(item,index) in  documentDatas['预审阶段']" :key="index">
										<img :src="require('@/assets/images/file/' + fileSuffix(item.type))"
											style="height: 30px;margin-right: 10px;" />

										<div style="flex: 1;min-width: 0px; display: flex;flex-direction: column;">
											<span class="file-name"
												style="font-size: 14px;color: #666666;">{{item.fileName}}</span>
											<span
												style="font-size: 14px;color: #999;">{{fileType(item.secondaryBusinessType,'预审阶段')}}</span>
										</div>
										<div
											style="width: 100px;display: flex;align-items: center;justify-content: flex-end;">
											<!-- <span v-show="item.createUser == userInfo.accountId"
												style="font-size: 14px;color: #f55b23; cursor: pointer;"
												@click="handleDel(item)">删除</span> -->
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handlePreview(item)">预览</span>
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handleDownload(item)">下载</span>
										</div>
									</div>
								</div>
								<div v-else class="empty-cn">
									<span>暂无数据</span>
								</div>
								<div class="com-title">
									<span>受理阶段</span>
								</div>
								<div class="documentList"
									v-if="documentDatas['受理阶段'] && documentDatas['受理阶段'].length>0">
									<div class="item" v-for="(item,index) in  documentDatas['受理阶段']" :key="index">
										<img :src="require('@/assets/images/file/' + fileSuffix(item.type))"
											style="height: 30px;margin-right: 10px;" />

										<div style="flex: 1;min-width: 0px; display: flex;flex-direction: column;">
											<span class="file-name" :title="item.fileName"
												style="font-size: 14px;color: #666666;">{{item.fileName}}</span>
											<span
												style="font-size: 14px;color: #999;">{{fileType(item.secondaryBusinessType,'受理阶段')}}</span>
										</div>
										<div
											style="width: 100px;display: flex;align-items: center;justify-content: flex-end;">
											<!-- <span v-show="item.createUser == userInfo.accountId"
												style="font-size: 14px;color: #f55b23; cursor: pointer;"
												@click="handleDel(item)">删除</span> -->
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handlePreview(item)">预览</span>
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handleDownload(item)">下载</span>
										</div>
									</div>
								</div>
								<div v-else class="empty-cn">
									<span>暂无数据</span>
								</div>
								<div class="com-title">
									<span>查办阶段</span>
								</div>
								<div class="documentList"
									v-if="documentDatas['查办阶段'] &&  documentDatas['查办阶段'].length>0">
									<div class="item" v-for="(item,index) in  documentDatas['查办阶段']" :key="index">
										<img :src="require('@/assets/images/file/' + fileSuffix(item.type))"
											style="height: 30px;margin-right: 10px;" />

										<div style="flex: 1;min-width: 0px; display: flex;flex-direction: column;">
											<span class="file-name"
												style="font-size: 14px;color: #666666;">{{item.fileName}}</span>
											<span
												style="font-size: 14px;color: #999;">{{fileType(item.secondaryBusinessType,'查办阶段')}}</span>
										</div>
										<div
											style="width: 100px;display: flex;align-items: center;justify-content: flex-end;">
											<!-- <span v-show="item.createUser == userInfo.accountId"
												style="font-size: 14px;color: #f55b23; cursor: pointer;"
												@click="handleDel(item)">删除</span> -->
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handlePreview(item)">预览</span>
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handleDownload(item)">下载</span>
										</div>
									</div>
								</div>
								<div v-else class="empty-cn">
									<span>暂无数据</span>
								</div>
								<div class="com-title">
									<span>结案阶段</span>
								</div>
								<div class="documentList"
									v-if="documentDatas['结案阶段'] && documentDatas['结案阶段'].length>0">
									<div class="item" v-for="(item,index) in  documentDatas['结案阶段']" :key="index">
										<img :src="require('@/assets/images/file/' + fileSuffix(item.type))"
											style="height: 30px;margin-right: 10px;" />

										<div style="flex: 1;min-width: 0px; display: flex;flex-direction: column;">
											<span class="file-name"
												style="font-size: 14px;color: #666666;">{{item.fileName}}</span>
											<span
												style="font-size: 14px;color: #999;">{{fileType(item.secondaryBusinessType,'结案阶段')}}</span>
										</div>
										<div
											style="width: 100px;display: flex;align-items: center;justify-content: flex-end;">
											<!-- <span v-show="item.createUser == userInfo.accountId"
												style="font-size: 14px;color: #f55b23; cursor: pointer;"
												@click="handleDel(item)">删除</span> -->
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handlePreview(item)">预览</span>
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handleDownload(item)">下载</span>
										</div>
									</div>
								</div>
								<div v-else class="empty-cn">
									<span>暂无数据</span>
								</div>
								<div class="com-title">
									<span>跟踪问效</span>
								</div>
								<div class="documentList"
									v-if="documentDatas['跟踪问效'] && documentDatas['跟踪问效'].length>0">
									<div class="item" v-for="(item,index) in  documentDatas['跟踪问效']" :key="index">
										<img :src="require('@/assets/images/file/' + fileSuffix(item.type))"
											style="height: 30px;margin-right: 10px;" />

										<div style="flex: 1;min-width: 0px; display: flex;flex-direction: column;">
											<span class="file-name"
												style="font-size: 14px;color: #666666;">{{item.fileName}}</span>
											<span
												style="font-size: 14px;color: #999;">{{fileType(item.secondaryBusinessType,'跟踪问效')}}</span>
										</div>
										<div
											style="width: 100px;display: flex;align-items: center;justify-content: flex-end;">
											<!-- <span v-show="item.createUser == userInfo.accountId"
												style="font-size: 14px;color: #f55b23; cursor: pointer;"
												@click="handleDel(item)">删除</span> -->
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handlePreview(item)">预览</span>
											<span
												style="font-size: 14px;color: #2b65da;margin-left: 5px; cursor: pointer;"
												@click="handleDownload(item)">下载</span>
										</div>
									</div>
								</div>
								<div v-else class="empty-cn">
									<span>暂无数据</span>
								</div>

							</div>
						</el-scrollbar>

					</el-tab-pane>
					<el-tab-pane label="备注" name="second">
						<remarkDrawer :workOrderId="details.id" />
					</el-tab-pane>
				</el-tabs>

			</div>
			<div class="right">
				<el-scrollbar wrap-style="overflow-x:hidden;"
					:style="{height:(details.appraiseStatus == 'N' && (details.status == 5 || details.status == 8) && basicType == 'appraise')?'calc(100vh - 335px)':'calc(100vh - 135px)'}">
					<caseBasicApprove v-if="basicType == 'approve' || (basicType == 'todo' && isAudit)"
						:detailsInfo="details" :auditDatas="auditDatas" :surpriseStatusInfo="surpriseStatusInfo"
						:listReviewFeedBack="listReviewFeedBack" @success="successBack()" />
					<caseBasic
						v-if="(basicType == 'todo' && !isAudit) || basicType == 'accepted' || basicType == 'all' || basicType == 'appraise'"
						:detailsInfo="details" :auditDatas="auditDatas" :surpriseStatusInfo="surpriseStatusInfo"
						:listReviewFeedBack="listReviewFeedBack" @success="successBack()" />
					<caseBasicFinish v-if="basicType == 'finish'" :detailsInfo="details" :auditDatas="auditDatas"
						:surpriseStatusInfo="surpriseStatusInfo" :listReviewFeedBack="listReviewFeedBack"
						@success="successBack()" />
					<caseBasicProcess v-if="basicType == 'process'" :detailsInfo="details" :auditDatas="auditDatas"
						:surpriseStatusInfo="surpriseStatusInfo" :listReviewFeedBack="listReviewFeedBack"
						@success="successBack()" />
				</el-scrollbar>
				<div v-if="basicType == 'approve' || (basicType == 'todo' && isAudit)" class="buttons-cn">
					<template
						v-if="details.workOrderAudit && details.workOrderAudit.status != '1' && details.workOrderAudit.status != '2'">
						<el-button v-if="details.auditFlag == 'Y'" type="primary" @click="throughButton">通过</el-button>
						<el-button v-if="details.auditFlag == 'Y'" type="primary" @click="rebutButton">驳回</el-button>
					</template>

					<el-button plain @click="closeDrawer">关闭</el-button>

				</div>
				<div v-else-if="basicType == 'appraise'">
					<div class="appraise-cn" v-if="details.appraiseStatus == 'N'">
						<el-form :model="formAppraise" ref="formAppraise" label-width="120px">
							<el-form-item label="整体满意度" prop="satisfiedScore">
								<el-rate v-model="formAppraise.satisfiedScore"></el-rate>
							</el-form-item>
							<el-form-item label="评价内容" prop="comment">
								<el-input v-model.trim="formAppraise.comment" type="textarea" :rows="4" maxlength="300"
									show-word-limit placeholder="请输入备注"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="buttons-cn">
						<el-button v-if="details.appraiseStatus == 'N'" type="primary"
							@click="submitApprise">提交评价</el-button>
						<el-button plain @click="closeDrawer">关闭</el-button>
					</div>


				</div>
				<div v-else class="buttons-cn">
					<template
						v-if="!(details.auditFlag == 'Y' && (basicType == 'accepted' || basicType == 'process' || basicType == 'finish'))">

						<template v-if="basicType != 'all'">

							<el-button v-if="details.status == 0 && sameCurrentRole(details.pushDepartmentList)"
								type="primary" @click="preReviewFeedbackButton">预审反馈</el-button>
							<template v-else>
								<el-button
									v-if="(details.status == 0 && details.subStatus == 0 && userRoles.isLeaderDepartment)"
									type="primary" style="margin-left: 10px;" @click="acceptButton">受理</el-button>
								<el-button
									v-if="(details.status == 0 && details.subStatus == 0 && userRoles.isLeaderDepartment)"
									plain @click="notAcceptButton">不受理</el-button>
								<el-button v-if="details.status == 0 && userRoles.isLeaderDepartment" plain
									@click="cluePushButton">线索推送</el-button>
								<el-button v-if="details.status == 0 && userRoles.isLeaderDepartment" plain
									@click="replenishButton">发起材料补正</el-button>
								<el-button v-if="details.status == 0 && userRoles.isLeaderDepartment" plain
									@click="giveUpButton">撤回与放弃</el-button>
							</template>

							<!-- <el-button v-if="details.status == 13" plain>撤回材料补正</el-button> -->

							<el-button v-if="details.status == 21 && userRoles.isLeaderDepartment" type="primary"
								@click="distributionButton">案件派发</el-button>

							<template v-if="userInfo.orgCode == details.processDepartmentCode">
								<el-button
									v-if="(details.status == 3 && details.subStatus == 0 && details.auditFlag == 'N')"
									@click="completeButton" type="primary">提交办结</el-button>
								<el-button
									v-if="(details.status == 3 && details.subStatus == 0 && details.auditFlag == 'N')"
									plain @click="overButton">提交终止</el-button>
								<el-button
									v-if="(details.status == 3 && details.subStatus == 0 && details.auditFlag == 'N')"
									plain @click="discontinueButton">中止</el-button>
								<el-button
									v-if="(details.status == 3 && details.subStatus == 0 && details.auditFlag == 'N')"
									plain @click="postponeButton">延期</el-button>
								<el-button
									v-if="(details.status == 3 && details.subStatus == 0 && details.auditFlag == 'N')"
									plain @click="adduceEvidenceButton">发起材料举证</el-button>
								<el-button v-if="(details.status == 3 && details.subStatus == 3)" plain
									@click="withdrawAdduceEvidenceButton">撤回材料举证</el-button>
								<el-button
									v-if="(details.status == 3 && details.subStatus == 7 && (basicType == 'process' || basicType == 'todo'))"
									type="primary" @click="continueHandle">继续办理</el-button>
							</template>

							<!-- 结案阶段 -->
							<template v-if="userRoles.isLeaderDepartment">
								<el-button v-if="(details.status == 4 || details.status == 15)" type="primary"
									@click="fllowUpNodeButton">回访核实</el-button>
								<el-button v-if="details.status == 15" type="primary"
									@click="confirmOverButton">确认终止</el-button>
								<el-button v-if="details.status == 4" type="primary"
									@click="finallyButton">确认办结</el-button>
								<el-button v-if="(details.status == 4 || details.status == 15)" plain
									@click="returnButton">退回重办</el-button>
								<el-button v-if="(details.status == 4 || details.status == 15)" plain
									@click="distributionButton">转其他部门重办</el-button>
								<el-button v-if="details.status == 5" plain
									@click="editOverTitleStatusButton">修改结案状态</el-button>
							</template>


							<!-- 待确认状态下，受理阶段展示撤回 -->
							<template
								v-if="details.status == 2 && basicType == 'accepted' && userRoles.isLeaderDepartment">
								<el-button type="primary" @click="backButton">撤回</el-button>
							</template>
							<!-- 推送单位功能按钮-->
							<template v-if="basicType == 'process' || basicType == 'todo'">
								<el-button
									v-if="details.status == 2 && userInfo.orgCode == details.processDepartmentCode"
									type="primary" @click="sureReceive">确认接收</el-button>
								<el-button
									v-if="details.status == 2 && details.repeatCheck == '' && userInfo.orgCode == details.processDepartmentCode"
									plain @click="reconsiderationButton">申请复核</el-button>
							</template>
						</template>

						<template v-else>
							<el-button v-if="details.status == 0 && sameCurrentRole(details.pushDepartmentList)"
								type="primary" @click="preReviewFeedbackButton">预审反馈</el-button>
							<el-button
								v-if="surpriseStatusInfo.id != '' && surpriseStatusInfo.superviseStatus == '0' && userRoles.isLeaderDepartment"
								type="primary" @click="superviseAndHandleButton">发起督办</el-button>
							<el-button
								v-if="surpriseStatusInfo.id != '' && surpriseStatusInfo.superviseStatus == '1' && userRoles.isLeaderDepartment"
								type="primary" @click="liftSuperviseAndHandleButton">解除督办</el-button>
						</template>


						<!-- 省级部门-->
						<template v-if="(details.status == 5 || details.status == 8) && userRoles.isLeaderDepartment">
							<el-button plain v-if="details.supervisionTag == '1' || details.supervisionTag == '3'"
								@click="simpleButton(1)">编辑跟踪</el-button>
							<el-button v-if="details.supervisionTag == '' || details.supervisionTag == '0'" plain
								@click="simpleButton(3)">发起跟踪</el-button>
							<el-button plain v-if="details.supervisionTag == '1' || details.supervisionTag == '3'"
								@click="simpleButton(5)">解除跟踪</el-button>
							<el-button plain v-if="details.exceptionTag == '1' || details.exceptionTag == '3'"
								@click="simpleButton(2)">编辑异常</el-button>
							<el-button v-if="details.exceptionTag == '' || details.exceptionTag == '0'" plain
								@click="simpleButton(4)">发起异常</el-button>
							<el-button plain v-if="details.exceptionTag == '1' || details.exceptionTag == '3'"
								@click="simpleButton(6)">解除异常</el-button>
						</template>
						<!-- 承办部门 -->
						<template v-if="(details.status == 5 || details.status == 8) && !userRoles.isLeaderDepartment">
							<el-button type="primary" v-if="(details.supervisionTag == '1')"
								@click="simpleButton(7)">申请解除跟踪</el-button>
							<el-button type="primary" v-if="(details.exceptionTag == '1')"
								@click="simpleButton(8)">申请解除异常</el-button>
						</template>

					</template>


					<el-button plain @click="closeDrawer">关闭</el-button>

				</div>
			</div>
		</div>
		<!-- 文书/文件上传-->
		<uploadFileTypeDialog :visible.sync="isVisible" v-dialogDrags :workOrderId="details.id" @success="changeModel">
		</uploadFileTypeDialog>

		<!-- 预审反馈 -->
		<preReviewFeedbackDialog :visible.sync="preReviewFeedbackDialog.visible" v-dialogDrags :id="id"
			:workOrderNo="details.workOrderNo" @success="preReviewFeedbackSuccess">
		</preReviewFeedbackDialog>

		<!-- 案件受理 -->
		<acceptAndTransferDialog :visible.sync="acceptDialog.visible" v-dialogDrags :title="details.title"
			:workOrderNo="details.workOrderNo" @success="successBack">
		</acceptAndTransferDialog>
		<!-- 不受理 -->
		<notAcceptDialog :visible.sync="notAcceptDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="notAcceptLoadData"></notAcceptDialog>
		<!-- 发起材料补正 -->
		<replenishDialog :visible.sync="replenishDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="successBack">
		</replenishDialog>
		<!-- 撤回与放弃 -->
		<giveUpDialog :visible.sync="giveUpDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo" @success="giveUpSuccess">
		</giveUpDialog>

		<!-- 案件派发 -->
		<distributionDialog :visible.sync="distributionDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="successBack">
		</distributionDialog>

		<!-- 线索推送 -->
		<cluePushDialog :visible.sync="cluePushDialog.visible" v-dialogDrags :pushDepartmentList="details.pushDepartmentList"
			:workOrderNo="details.workOrderNo" @success="successBack">
		</cluePushDialog>

		<!-- 申请复核 -->
		<reconsiderationDialog :visible.sync="reconsiderationDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="successBack">
		</reconsiderationDialog>


		<!-- 撤回 -->
		<backDialog :visible.sync="backDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo" @success="successBack">
		</backDialog>

		<!-- 驳回 -->
		<rebutDialog :visible.sync="rebutDialog.visible" v-dialogDrags :type="details.workOrderAudit.type" :id="id"
			@success="rebutLoadData"></rebutDialog>
		<!-- 通过 -->
		<throughDialog :visible.sync="throughDialog.visible" v-dialogDrags :type="details.workOrderAudit.type" :id="id"
			@success="throughLoadData"></throughDialog>




		<!-- 中止 -->
		<discontinueDialog :visible.sync="discontinueDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			:hasDebtAmount="details.questionMainInfo.isArrear" @success="successBack"></discontinueDialog>

		<!-- 延期 -->
		<postponeDialog :visible.sync="postponeDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			:addTimeNum="details.addTimeNum" @success="successBack"></postponeDialog>


		<!-- 发起举证材料 -->
		<adduceEvidenceDialog :visible.sync="adduceEvidenceDialog.visible" v-dialogDrags :workOrderNo="details.id"
			@success="successBack"></adduceEvidenceDialog>

		<!-- 退回重办 -->
		<returnDialog :visible.sync="returnDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo" @success="successBack">
		</returnDialog>


		<!-- 提交办结 -->
		<completeDialog :visible.sync="completeDialog.visible" v-dialogDrags :workOrderId="details.id"
			:workOrderNo="details.workOrderNo" :hasDebtAmount="details.questionMainInfo.isArrear"
			@success="successBack"></completeDialog>

		<!-- 提交终止 -->
		<overDialog :visible.sync="overDialog.visible" v-dialogDrags :workOrderId="details.id" :workOrderNo="details.workOrderNo"
			:isDebt="details.questionMainInfo.isArrear" @success="successBack">
		</overDialog>

		<!-- 确认办结 -->
		<finallyDialog :visible.sync="finallyDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo" @success="successBack">
		</finallyDialog>

		<!-- 确认终止 -->
		<confirmOverDialog :visible.sync="confirmOverDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="successBack">
		</confirmOverDialog>

		<!-- 回访核实 -->
		<fllowUpNodeDialog :visible.sync="fllowUpNodeDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			:workOrderId="details.id" @success="fllowUpNodeSuccess">
		</fllowUpNodeDialog>


		<!-- 修改结案状态 -->
		<editOverTitleStatusDialog :visible.sync="editOverTitleStatusDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="successBack">
		</editOverTitleStatusDialog>

		<!-- 跟踪，异常 -->
		<simpleDialog v-if="simpleDialog.visible" :visible.sync="simpleDialog.visible" v-dialogDrags
			:workOrderNo="details.workOrderNo" :simpleType="simpleType" @success="successBack">
		</simpleDialog>


		<!-- 发起督办 -->
		<superviseAndHandleDialog :visible.sync="superviseAndHandleDialog.visible" v-dialogDrags :workOrderNo="details.workOrderNo"
			@success="superviseAndHandleSuccess">
		</superviseAndHandleDialog>



		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" v-dialogDrags :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>
</template>

<script>
	import overDialog from "./overDialog";
	import confirmOverDialog from "./confirmOverDialog";
	import uploadFileTypeDialog from "./uploadFileTypeDialog";
	import finallyDialog from "./finallyDialog";
	import editOverTitleStatusDialog from "./editOverTitleStatusDialog";
	import reconsiderationDialog from "./reconsiderationDialog";
	import acceptAndTransferDialog from "./acceptAndTransferDialog";
	import fllowUpNodeDialog from "./fllowUpNodeDialog";
	import notAcceptDialog from "./notAcceptDialog";
	import adduceEvidenceDialog from "./adduceEvidenceDialog";
	import replenishDialog from "./replenishDialog";
	import backDialog from "./backDialog";
	import giveUpDialog from "./giveUpDialog";
	import cluePushDialog from "./cluePushDialog";
	import distributionDialog from "./distributionDialog";
	import discontinueDialog from "./discontinueDialog";
	import caseBasic from "./caseBasic";
	import caseBasicApprove from "../../approve/components/caseBasicApprove";
	import caseBasicFinish from "./caseBasicFinish";
	import postponeDialog from "./postponeDialog";
	import returnDialog from "./returnDialog";
	import caseBasicProcess from "./caseBasicProcess";
	import rebutDialog from "../../approve/components/rebutDialog";
	import throughDialog from "../../approve/components/throughDialog";
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import remarkDrawer from "./remarkDrawer";
	import completeDialog from "./completeDialog";
	import simpleDialog from "./simpleDialog";
	import superviseAndHandleDialog from "./superviseAndHandleDialog";
	import preReviewFeedbackDialog from "./preReviewFeedbackDialog";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as dictApi from "@/api/dict";
	import {
		mapState
	} from 'vuex'
	import {
		fileSuffix
	} from '@/utils/common'
	export default {
		name: "caseDetails",
		components: {
			preReviewFeedbackDialog,
			superviseAndHandleDialog,
			simpleDialog,
			editOverTitleStatusDialog,
			fllowUpNodeDialog,
			confirmOverDialog,
			finallyDialog,
			returnDialog,
			overDialog,
			adduceEvidenceDialog,
			completeDialog,
			caseBasicFinish,
			postponeDialog,
			caseBasicProcess,
			backDialog,
			previewDialog,
			rebutDialog,
			throughDialog,
			uploadFileTypeDialog,
			reconsiderationDialog,
			acceptAndTransferDialog,
			notAcceptDialog,
			replenishDialog,
			giveUpDialog,
			cluePushDialog,
			distributionDialog,
			discontinueDialog,
			caseBasic,
			remarkDrawer,
			caseBasicApprove
		},
		props: {
			workOrderId: {
				type: String,
				default: ''
			},
			workOrderNo: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: ''
			},
			basicType: {
				type: String,
				default: ''
			},
			isAudit: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				formAppraise: {
					satisfiedScore: "",
					comment: "",
				},
				documentCode: '',
				preReviewFeedbackDialog: {
					visible: false
				},
				superviseAndHandleDialog: {
					visible: false
				},
				simpleDialog: {
					visible: false
				},
				editOverTitleStatusDialog: {
					visible: false
				},
				fllowUpNodeDialog: {
					visible: false
				},
				confirmOverDialog: {
					visible: false
				},
				finallyDialog: {
					visible: false
				},
				returnDialog: {
					visible: false
				},
				overDialog: {
					visible: false
				},
				adduceEvidenceDialog: {
					visible: false
				},
				discontinueDialog: {
					visible: false
				},
				reconsiderationDialog: {
					visible: false
				},
				completeDialog: {
					visible: false
				},
				backDialog: {
					visible: false
				},
				cluePushDialog: {
					visible: false
				},
				distributionDialog: {
					visible: false
				},
				giveUpDialog: {
					visible: false
				},
				acceptDialog: {
					visible: false
				},
				notAcceptDialog: {
					visible: false
				},
				replenishDialog: {
					visible: false
				},
				rebutDialog: {
					visible: false
				},
				throughDialog: {
					visible: false
				},
				previewDialog: {
					fileURL: '',
					visible: false
				},
				postponeDialog: {
					fileURL: '',
					visible: false
				},
				isVisible: false,
				activeName: 'first',
				documentTypeList: [],
				value1: [],
				dataLists: [],
				details: null,
				loading: false,
				documentDatas: {
					'预审阶段': [],
					'受理阶段': [],
					'查办阶段': [],
					'结案阶段': [],
					'跟踪问效': []
				},
				auditDatas: [],
				simpleType: "",
				surpriseStatusInfo: null,
				listReviewFeedBack: [],
			};

		},
		computed: {
			...mapState(['userInfo', 'userRoles']),
		},
		watch: {
			workOrderId: {
				handler(val) {

				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.getDocumentType()
			this.init()
			/* 获取督办信息 */
			this.getSurpriseStatus()
			/* 预审反馈信息 */
			this.getReviewFeedBackList()
		},
		mounted() {

		},
		methods: {
			fileSuffix,
			init() {
				// this.loading = true
				workOrderApi.distribute[this.basicType == 'process' ? 'detailProcess' : this.basicType == 'finish' ?
						'detailFinish' : this.basicType == 'approve' ? 'detailAudit' : this.basicType == 'appraise' ?
						'detailApraise' : 'detail'
					](this.workOrderId)
					.then(res => {
						this.details = res.result;
						this.getDocument(res.result.id)
						if (res.result.workOrderAudit) {
							this.getAuditList(res.result.workOrderAudit.actionTypeNumber)
						}
					}).finally(() => this.loading = false);

			},
			getReviewFeedBackList() {
				workOrderApi.distribute.listReviewFeedBack(this.workOrderNo)
					.then(res => {
						this.listReviewFeedBack = res.result || []
					})
			},
			getDocumentType() {
				dictApi.treeByParentCode('document')
					.then(res => {
						let datas = res.result
						datas.unshift({
							code: '',
							name: '全部文书',
							parentCode: "document",
							value: '',
						})
						this.documentTypeList = datas
					})
			},
			getDocument(id) {
				workOrderApi.distribute.attachmentListByDocumentCode({
						id: id,
						documentCode: this.documentCode
					})
					.then(res => {
						this.documentDatas = res.result || null
					})
			},
			getAuditList(id) {
				workOrderApi.audit.auditList({
						actionTypeNumber: id,
					})
					.then(res => {
						this.auditDatas = res.result
					})
			},
			getSurpriseStatus() {
				workOrderApi.finished.getSuperviseStatus({
						workOrderNo: this.workOrderNo,
					})
					.then(res => {
						this.surpriseStatusInfo = res.result
					})
			},
			fileType(flag, type) {
				let arrys = this.documentTypeList.find(item => item.name == type)
				if (arrys != undefined) {
					let lists = arrys.subDictList
					let typeStr = lists.find(item => item.value == flag)
					if (typeStr != undefined) {
						return typeStr.name
					}
					return ''
				}
				return ''
			},
			sameCurrentRole(deptList) {
				if (deptList.length == 0) {
					return false
				}
				let obj = deptList.find(item => item.departmentCode == this.userInfo.orgCode)
				if (obj == undefined) {
					return false
				}
				return true
			},
			/* 提交评价 */
			submitApprise() {
				this.confirm("确认评价吗？")
					.then(() => workOrderApi.appraise.appraise({
						...this.formAppraise,
						workOrderNo: this.workOrderNo
					}))
					.then(() => {
						this.init()
					});
			},
			successBack(res) {
				this.init()
				this.$emit("success");
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			fileUp() {
				this.isVisible = true
			},
			changeModel(res) {
				this.isVisible = false
				this.getDocument(this.details.id)
			},
			preReviewFeedbackButton() {
				this.preReviewFeedbackDialog.visible = true
			},
			preReviewFeedbackSuccess(res) {
				this.$emit("success");
				this.$emit('closeDrawer')
				// this.getReviewFeedBackList()
			},
			acceptButton() {
				this.acceptDialog.visible = true
			},
			notAcceptButton() {
				this.notAcceptDialog.visible = true
			},
			notAcceptLoadData(res) {
				this.$emit('closeDrawer')
				this.$emit("success");
			},
			replenishButton() {
				this.replenishDialog.visible = true
			},
			giveUpButton() {
				this.giveUpDialog.visible = true
			},
			giveUpSuccess(res) {
				this.$emit('closeDrawer')
				this.$emit("success");
			},
			distributionButton() {
				this.distributionDialog.visible = true
			},
			cluePushButton() {
				this.cluePushDialog.visible = true
			},
			rebutButton() {
				this.rebutDialog.visible = true
			},
			rebutLoadData(res) {
				this.$emit('closeDrawer')
				this.$emit("success");
			},
			throughButton() {
				this.throughDialog.visible = true
			},
			throughLoadData(res) {
				this.$emit('closeDrawer')
				this.$emit("success");
			},
			backButton() {
				this.backDialog.visible = true
			},
			reconsiderationButton() {
				this.reconsiderationDialog.visible = true
			},
			completeButton() {
				this.completeDialog.visible = true
			},
			discontinueButton() {
				this.discontinueDialog.visible = true
			},
			postponeButton() {
				if (this.details.addTimeNum >= 3) {
					this.$confirm('延期次数已达到3次，无法再次延期', '提示', {
						confirmButtonText: '确定',
						type: 'warning'
					}).then(() => {}).catch(() => {});
				} else {
					this.postponeDialog.visible = true
				}
			},
			adduceEvidenceButton() {
				this.adduceEvidenceDialog.visible = true
			},
			overButton() {
				this.overDialog.visible = true
			},
			returnButton() {
				this.returnDialog.visible = true
			},
			finallyButton() {
				this.finallyDialog.visible = true
			},
			confirmOverButton() {
				this.confirmOverDialog.visible = true
			},
			fllowUpNodeButton() {
				this.fllowUpNodeDialog.visible = true
			},
			fllowUpNodeSuccess(res) {
				this.$eventBus.$emit('remarkList')
				this.$emit("success");
			},
			editOverTitleStatusButton() {
				this.editOverTitleStatusDialog.visible = true
			},

			simpleButton(type) {
				if (type == 1) {
					this.simpleType = '编辑跟踪'
				}
				if (type == 2) {
					this.simpleType = '编辑异常'
				}
				if (type == 3) {
					this.simpleType = '发起跟踪'
				}
				if (type == 4) {
					this.simpleType = '发起异常'
				}
				if (type == 5) {
					this.simpleType = '解除跟踪'
				}
				if (type == 6) {
					this.simpleType = '解除异常'
				}
				if (type == 7) {
					this.simpleType = '申请解除跟踪'
				}
				if (type == 8) {
					this.simpleType = '申请解除异常'
				}

				this.simpleDialog.visible = true
			},
			superviseAndHandleButton() {
				this.superviseAndHandleDialog.visible = true
			},
			superviseAndHandleSuccess(res) {
				this.init()
				this.getSurpriseStatus()
			},
			closeDrawer() {
				this.$emit('closeDrawer')
			},
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
			confirm(message) {
				return this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				});
			},
			/* 撤回材料补正 */
			handleRevoke() {
				this.confirm("确认撤销材料补正吗？")
					.then(() => workOrderApi.distribute.revoke({
						workOrderId: this.details.id
					}))
					.then(() => {
						this.init()
						this.$emit("success");
					});
			},
			/* 确认接受 */
			sureReceive() {
				this.confirm("是否确认办理该案件？")
					.then(() => workOrderApi.distribute.confirResieve(this.details.workOrderNo))
					.then(() => {
						this.init()
						this.$emit("success");
					});
			},
			/* 继续办理 */
			continueHandle() {
				this.confirm("确认继续办理此案件吗？")
					.then(() => workOrderApi.distribute.continueprocess({
						workOrderNo: this.details.workOrderNo
					}))
					.then(() => {
						this.init()
						this.$emit("success");
					});
			},
			/* 撤回材料举证 */
			withdrawAdduceEvidenceButton() {
				this.confirm("确认撤销材料举证吗？")
					.then(() => workOrderApi.distribute.revoke({
						workOrderId: this.details.id
					}))
					.then(() => {
						this.init()
						this.$emit("success");
					});
			},
			/* 解除督办 */
			liftSuperviseAndHandleButton() {
				this.confirm("确认解除督办吗？")
					.then(() => workOrderApi.finished.cancelSuperviseHandle({
						workOrderNo: this.details.workOrderNo
					}))
					.then(() => {
						this.init()
						this.getSurpriseStatus()
						this.$emit("success");
					});
			},
			/* 删除当前附件 */
			handleDel(item) {
				// this.confirm("确认删除当前文书吗？")
				// 	.then(() => workOrderApi.finished.cancelSuperviseHandle({
				// 		workOrderNo: this.details.workOrderNo
				// 	}))
				// 	.then(() => {
				// 		this.init()
				// 		this.getSurpriseStatus()
				// 	});
			},
			addressIdChanged(value) {
				this.$refs.documentCode.dropDownVisible = false
				this.getDocument(this.details.id)
			},
		}
	};
</script>

<style lang="less" scoped>
	.appraise-cn {
		border-top: 1px solid rgb(204, 204, 204);
		padding-top: 15px;

		.el-rate {
			margin-top: 9px;
		}

	}

	.documentList {
		padding: 10px 0px;
		display: flex;
		flex-direction: column;

		.item {

			padding: 8px 5px;
			display: flex;
			align-items: center;
			font-size: 14px;
			border-bottom: 1px solid #d8d8d8;

			.file-name {
				width: 100%;
				color: #323232;
				font-weight: bold;
				overflow: hidden;
				/*内容超出后隐藏*/
				text-overflow: ellipsis;
				/*超出内容显示为省略号*/
				white-space: nowrap;
				/*文本不进行换行*/
			}
		}
	}

	.empty-cn {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #909399;
		padding: 20px 0px;
	}


	::v-deep .el-tabs__nav {
		width: 100%;
		margin-left: 0px;
	}

	::v-deep .el-tabs__item {
		width: 50%;
		text-align: center;
		padding: 0px;
		font-size: 16px;
		font-weight: 700;
	}


	::v-deep .el-tabs__item.is-active {
		color: #0a6bf3;
	}

	::v-deep .el-tabs__active-bar {
		background: #0a6bf3;
	}

	::v-deep .el-input--medium .el-input__inner {
		height: 40px;
		line-height: 40px;
		font-size: 16px;
	}

	.buttons-cn {
		width: 100%;
		min-height: 36px;
		padding: 14px 0px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, .2);

		.el-button {
			height: 40px;
			min-width: 150px;
			font-size: 18px;
			font-weight: bold;
		}

		.el-button--primary {
			background-color: #1b5284;
		}

		.el-button.el-button--primary.is-plain {
			border-color: #1b5284;
			color: #1b5284;
		}
	}


	.caseDetails {
		width: 100%;

		.content {
			display: flex;
			padding: 10px 10px 0px;

			.left {
				width: 300px;

				.is-plain {
					border-color: #1b5284;
				}

				.com-title {
					height: 40px;
					background: linear-gradient(90deg, #0b5fd5 0, #e6f2ff);
					font-size: 18px;
					color: #fff;
					display: flex;
					align-items: center;
					padding: 0 15px;
				}

				.el-table::before {
					height: 0px;
				}
			}

			.right {
				flex: 1;
			}
		}

		.header-title {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22px;
			font-weight: 600;
			color: #fff;
			height: 56px;
			padding: 0 10px;
			background: #3a64d3;
		}
	}
</style>
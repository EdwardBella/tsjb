<template>
	<div class="contants" v-loading="loading" element-loading-text="提交中,请您耐心等待">
		<el-button @click="$router.push('/portals/my/list')" plain size="mini" style="margin: 5px 0px">关闭</el-button>
		<el-scrollbar wrap-style="overflow-x:hidden;"
			:style="{height:(details.appraiseStatus == 'N' && (details.status == 5 || details.status == 8))?'calc(100vh - 306px)':'calc(100vh - 46px)'}">
			<div v-if="(details.status == 13 && details.subStatus == 0)"
				style="display: flex;align-items: center;padding: 8px 16px;background-color: #fef0f0;color: #f56c6c;">
				<span style="font-size: 16px;font-weight: 800;">线索已退回</span>
				<span style="flex: 1;font-size: 14px;margin-left: 10px;">投诉举报内容需要修改完善或需补正材料，请按照要求尽快予以完善，重新提交。</span>
				<el-button type="primary" @click="repeatSubmit"
					style="display: flex;align-items: center;justify-content: center; font-size: 14px; height: 36px;line-height: 36px;font-weight: 600;">材料补正</el-button>
			</div>
			<div v-if="(details.status == 13 && details.subStatus == 0)" style="padding: 0px 16px;">
				<el-form class="key-value" label-width="130px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="补正时限：">{{details.backInfo.limitDay}}天</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="修改内容：">{{details.backInfo.modifyContent || '-'}}</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="补正内容：">{{details.backInfo.requireContent || '-'}}</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div v-if="(details.status == 3 && details.subStatus == 3)" style="display: flex;flex-direction: column;">
				<div
					style="display: flex;align-items: center;padding: 8px 16px;background-color: #fef0f0;color: #f56c6c;">
					<span style="font-size: 16px;font-weight: 800;">案件需举证材料</span>
					<span style="flex: 1;font-size: 14px;margin-left: 10px;">请按照要求提交相关举证材料；</span>
				</div>
				<!-- 发起材料举证 -->
				<evidenceDialog :correctionComment="correctionComment" :workOrderNo="details.id"
					:materialCorrectId="materialCorrectId" @success="evidenceSuccess" />

			</div>

			<div style="width: 100%;height: 46px;display: flex;align-items: center;background: #b8d6ff;">
				<div class="process-item">
					<div v-if="(details.status == 0 && details.subStatus == 0)"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls"></div>
						</div>
						<span class="ld">待受理</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="details.status == 10" style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls"></div>
						</div>
						<span class="ld">已撤回</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="details.status == 13" style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #E6A23B;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #E6A23B;">发起材料补正</span>
						<div class="lj" style="border-left: 20px solid #E6A23B;"></div>
					</div>
					<div v-else-if="details.status == 6" style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #ff4d4f;">
							<div class="ls"></div>
						</div>
						<span class="ld"
							style="background-color: #ff4d4f;">不受理{{details.rejectReview == 'Y'?('(已申请复核)'):''}}</span>
						<div class="lj" style="border-left: 20px solid #ff4d4f;"></div>
					</div>
					<div v-else-if="details.status == 14" style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #ff4d4f;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #ff4d4f;">放弃投诉举报</span>
						<div class="lj" style="border-left: 20px solid #ff4d4f;"></div>
					</div>
					<div v-else style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #03a113;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #03a113;">待受理</span>
						<div class="lj" style="border-left: 20px solid #03a113;"></div>
					</div>


				</div>
				<div class="process-item">
					<div v-if="details.status == 21 || details.status == 2 || details.status == 16"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">已受理</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="details.status == 3 || details.status == 5 || details.status == 8  ||  details.status == 4 ||  details.status == 15"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #03a113;">
							<div class="ls" style="border-left:20px solid rgb(184, 214, 255);"></div>
						</div>
						<span class="ld" style="background-color: #03a113;">已受理</span>
						<div class="lj" style="border-left: 20px solid #03a113;"></div>
					</div>

					<div v-else style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld"
							:style="{backgroundColor:'#bfbfbf',color:details.status == 6?'#bfbfbf':'#fff' }">已受理</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
				<div class="process-item">
					<div v-if="(details.status == 3 && details.subStatus == 0)  ||  details.status == 4 ||  details.status == 15"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">调查处理中</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="(details.status == 3 && details.subStatus == 3)"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">材料举证中</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="(details.status == 3 && details.subStatus == 7)"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">已中止</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="details.status == 5 || details.status == 8"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #03a113;">
							<div class="ls" style="border-left:20px solid rgb(184, 214, 255);"></div>
						</div>
						<span class="ld" style="background-color: #03a113;">调查处理中</span>
						<div class="lj" style="border-left: 20px solid #03a113;"></div>
					</div>
					<div v-else style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld"
							:style="{backgroundColor:'#bfbfbf',color:details.status == 6?'#bfbfbf':'#fff' }">调查处理中</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
				<div class="process-item">
					<div v-if="(details.status == 5 ||  details.status == 8) && !details.workOrderAppraise"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">结案待评价</span>
						<div class="lj"></div>
					</div>
					<div v-else-if="(details.status == 5 ||  details.status == 8) && details.workOrderAppraise"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #03a113;">
							<div class="ls" style="border-left:20px solid rgb(184, 214, 255);"></div>
						</div>
						<span class="ld" style="background-color: #03a113;">结案待评价</span>
						<div class="lj" style="border-left: 20px solid #03a113;"></div>
					</div>
					<div v-else style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld"
							:style="{backgroundColor:'#bfbfbf',color:details.status == 6?'#bfbfbf':'#fff' }">结案待评价</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
				<div class="process-item">
					<div v-if="(details.status == 5 ||  details.status == 8) && details.workOrderAppraise"
						style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">已评价</span>
						<div class="lj"></div>
					</div>
					<div v-else style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld"
							:style="{backgroundColor:'#bfbfbf',color:details.status == 6?'#bfbfbf':'#fff' }">已评价</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
			</div>

			<div class="module-head" style="margin-top: 10px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">投诉举报人基本信息</span>
			</div>
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系人">{{details.createUsername || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号">{{details.companyContactIdNum || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号码">{{details.mobile || ''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系邮箱">{{details.complainPersonMainInfo.email || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="企业名称">{{details.complainPersonMainInfo.companyName || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="社会信用代码">{{details.complainPersonMainInfo.socialCreditNumber || ''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="通讯地址">{{details.companyAddress || ''}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item
							label="所属行业">{{details.industryType?(details.industryType1+' / '+details.industryType):''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item
							label="是否授权">{{details.complainPersonMainInfo.auth == 'true'?'是':'否'}}</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="details.complainPersonMainInfo.auth == 'true'">
					<el-col :span="8">
						<el-form-item label="委托人">{{details.complainPersonMainInfo.mandator || ''}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="联系电话">{{details.complainPersonMainInfo.mandatorPhone || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="身份证">
							<el-table v-if="details.clientIdCardList && details.clientIdCardList.length"
								:data="details.clientIdCardList" size="mini" :show-header="false">
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
						<el-form-item label="授权委托书">
							<el-table v-if="details.attachmentList && details.attachmentList.length"
								:data="details.attachmentList" size="mini" :show-header="false">
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
			<div class="module-head" style="margin-top: 10px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">投诉对象基本信息</span>
			</div>
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="8">
						<el-form-item label="投诉对象">{{details.complainant.addressDepartmentName || ''}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="事发地">{{details.complainant.address || ''}}</el-form-item>
					</el-col>

				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系人">{{details.complainant.complaintContactName || ''}}</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="联系电话">{{details.complainant.complaintContactMobile || ''}}</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="module-head" style="margin-top: 10px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">反映问题基本信息</span>
			</div>
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="24">
						<el-form-item label="案件名称">{{details.title || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="主要诉求">{{details.mainApply || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="事实理由">{{details.factReason || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="拖欠账款">{{details.questionMainInfo.isArrear == true?'是':'否'}}</el-form-item>
					</el-col>
					<el-col :span="8" v-if="details.questionMainInfo.isArrear">
						<el-form-item
							label="欠款金额">{{details.questionMainInfo.govArrears.arrearsAmount || ''}}万元</el-form-item>
					</el-col>
					<el-col :span="16" v-if="details.questionMainInfo.isArrear">
						<el-form-item
							label="合同金额">{{details.questionMainInfo.govArrears.contractAmount || ''}}万元</el-form-item>
					</el-col>
					<el-col :span="8" v-if="details.questionMainInfo.isArrear">
						<el-form-item
							label="合同协议名称">{{details.questionMainInfo.govArrears.contractName || ''}}</el-form-item>
					</el-col>
					<el-col :span="16" v-if="details.questionMainInfo.isArrear">
						<el-form-item label="签订时间">{{details.questionMainInfo.govArrears.signTime || ''}}</el-form-item>
					</el-col>
					<el-col :span="24" v-if="details.questionMainInfo.isArrear">
						<el-form-item
							label="主要违约条款">{{details.questionMainInfo.govArrears.defaultClause || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="其它渠道">{{details.hasComplain || ''}}</el-form-item>
					</el-col>


					<el-col :span="24">
						<el-form-item label="佐证材料">
							<el-table
								v-if="details.questionMainInfo.wordAttachmentList && details.questionMainInfo.wordAttachmentList.length"
								:data="details.questionMainInfo.wordAttachmentList" size="mini" :show-header="false">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="left">
									<template slot-scope="{row}">
										<el-button @click="handleDownload(row)" plain size="mini">下载</el-button>
										<el-button @click="handlePreview(row)" plain size="mini">预览</el-button>
									</template>
								</el-table-column>
							</el-table>

						</el-form-item>
					</el-col>

				</el-row>

			</el-form>
			<div class="module-head" style="margin-top: 10px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">案件办理信息</span>
			</div>
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="8">
						<el-form-item label="案件编号">{{details.workOrderNumber || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="案件状态">{{details.statusStr || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="案件来源">线上投诉</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item
							label="受理单位">{{details.workOrderHandleInfo.acceptDepartmentName || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="承办单位">{{details.processDepartment || ''}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="案件归属地">{{details.belongingPlace || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="受理通知书">
							<el-table
								v-if="details.workOrderHandleInfo.acceptAttachmentList && details.workOrderHandleInfo.acceptAttachmentList.length"
								:data="details.workOrderHandleInfo.acceptAttachmentList" size="mini"
								:show-header="false">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="left">
									<template slot-scope="{row}">
										<el-button @click="handleDownload(row)" plain size="mini">下载</el-button>
										<el-button @click="handlePreview(row)" plain size="mini">预览</el-button>
									</template>
								</el-table-column>
							</el-table>

						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<!-- 还款信息-->
			<repaymentInfo v-if="[4,15,5,8].includes(details.status) && details.questionMainInfo.isArrear"
				:detailsInfo="details" />

			<!-- 终止信息-->
			<div v-if="details.status == 8" class="module-head" style="margin-top: 10px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">终止信息</span>
			</div>
			<el-form v-if="details.status == 8" class="key-value" label-width="130px" label-suffix="：">
				<!-- 确认退回审批，撤回投诉举报案件审批，移交审批 -->
				<el-row>
					<el-col :span="24">
						<el-form-item label="终止类型">{{ details.overWorkOrderVo.reason || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="终止审批单">
							<el-table v-if="details.overWorkOrderVo.completeFinishFile != ''"
								:data="[details.overWorkOrderVo.completeFinishFile]" size="mini"
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
						<el-form-item label="终止通知书">
							<el-table
								v-if="details.overWorkOrderVo.reportNoticeFile && details.overWorkOrderVo.reportNoticeFile.length"
								:data="details.overWorkOrderVo.reportNoticeFile" size="mini" :show-header="false">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="left">
									<template slot-scope="{row}">
										<el-button @click="handleDownload(row)" plain size="mini">下载</el-button>
										<el-button @click="handlePreview(row)" plain size="mini">预览</el-button>
									</template>
								</el-table-column>
							</el-table>

						</el-form-item>
					</el-col>


				</el-row>
			</el-form>

			<!-- 结案信息-->
			<div v-if="details.status == 5" class="module-head" style="margin-top: 20px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">结案信息</span>
			</div>
			<el-form v-if="details.status == 5" class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="24">
						<el-form-item label="办结类型">{{ details.workOrderSubmitFinishResult.reason || ''}}</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="结案审批单">
							<el-table
								v-if="details.workOrderSubmitFinishResult.completedFinishFile && details.workOrderSubmitFinishResult.completedFinishFile.length"
								:data="details.workOrderSubmitFinishResult.completedFinishFile" size="mini"
								:show-header="false">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="{row}">
										<el-button @click="handleDownload(row)" plain size="mini">下载</el-button>
										<el-button @click="handlePreview(row)" plain size="mini">预览</el-button>
									</template>
								</el-table-column>
							</el-table>

						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="结案通知书">
							<el-table
								v-if="details.workOrderSubmitFinishResult.reportNoticeFile && details.workOrderSubmitFinishResult.reportNoticeFile.length"
								:data="details.workOrderSubmitFinishResult.reportNoticeFile" size="mini"
								:show-header="false">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="left">
									<template slot-scope="{row}">
										<el-button @click="handleDownload(row)" plain size="mini">下载</el-button>
										<el-button @click="handlePreview(row)" plain size="mini">预览</el-button>
									</template>
								</el-table-column>
							</el-table>

						</el-form-item>
					</el-col>

				</el-row>
			</el-form>




			<!-- 经营主体评价-->
			<appraiseInfo v-if="details.appraiseStatus == 'Y'" :detailsInfo="details" />



			<div v-if="details.status == '6'" class="module-head" style="margin-top: 20px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">不受理信息</span>
			</div>
			<el-form v-if="details.status == '6'" class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="24">
						<el-form-item label="不受理原因">{{details.rejectWorkOrderDto.notAcceptReason || ''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="不受理备注">{{details.rejectWorkOrderDto.comment || ''}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="不予受理通知书" label-width="150px">
							<el-table
								v-if="details.rejectWorkOrderDto.rejectAttachments && details.rejectWorkOrderDto.rejectAttachments.length"
								:data="details.rejectWorkOrderDto.rejectAttachments" size="mini" :show-header="false">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="left">
									<template slot-scope="{row}">
										<el-button @click="handleDownload(row)" type="primary" plain
											size="mini">下载</el-button>
										<el-button @click="handlePreview(row)" type="primary" plain
											size="mini">预览</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>



			<div v-if="!((details.status == 5 ||  details.status == 8) && details.appraiseStatus == 'N')"
				class="footer-btn" style="display: flex;align-items: center;justify-content: center;">
				<el-button v-if="details.status == 6 && details.subStatus != 5 && details.rejectReview != 'Y'"
					@click="reviewApply" type="primary"
					style="display: flex;align-items: center;justify-content: center; font-size: 20px; height: 42px;line-height: 42px;font-weight: 600;">申请复核</el-button>
				<el-button @click="$router.back()" plain
					style="display: flex;align-items: center;justify-content: center; font-size: 20px; height: 42px;line-height: 42px;font-weight: 600;">关闭</el-button>
			</div>

		</el-scrollbar>
		<div v-if="(details.status == 5 ||  details.status == 8) && details.appraiseStatus == 'N'">
			<div class="appraise-cn">
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
				<el-button type="primary" @click="submitApprise">提交评价</el-button>
			</div>


		</div>
		<!-- 复核 -->
		<reconsiderationDialog :visible.sync="reconsiderationDialog.visible" :workOrderId="details.workOrderNo"
			@success="reconsiderationSuccess">
		</reconsiderationDialog>

		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible"
			:filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>
</template>

<script>
	import * as portalsApi from '@/api/portals'
	import * as workOrderApi from "@/api/workOrder/index";
	import {
		downloadFile,
		getCMSUserInfo,
		isEmpty,
		postPortalsHeight,
		returnStatus
	} from "@/utils/common";
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import reconsiderationDialog from "@/views/portals/components/reconsiderationDialog";
	import repaymentInfo from "@/views/workOrder/components/repaymentInfo";
	import terminationInfo from "@/views/workOrder/components/terminationInfo";
	import closeaCaseInfo from "@/views/workOrder/components/closeaCaseInfo";
	import appraiseInfo from "@/views/workOrder/components/appraiseInfo";
	import evidenceDialog from "@/views/workOrder/components/evidenceDialog";


	import {
		workOrderEventSource,
		workOrderStatus,
		timeRemaining,
		workOrderCreatorType,
		workOrderPublicStatus,
		workOrderPublicIntention,
		timeRemainingDHMS,
		hourMinute,
		filename,
		timeFormatDHMS,
		txt2HTML,
		workOrderComplaintObjectType,
		money
	} from '@/utils/filters'
	import * as fileApi from "@/api/file";

	export default {
		name: "workOrderDetails",
		components: {
			appraiseInfo,
			closeaCaseInfo,
			terminationInfo,
			repaymentInfo,
			previewDialog,
			reconsiderationDialog,
			evidenceDialog
		},
		data() {
			return {
				loading: false,
				details: null,
				comments: [],
				form: {
					comment: ''
				},
				replayObject: {

				},
				listItemMsg: '',
				previewDialog: {
					fileURL: '',
					visible: false
				},
				reconsiderationDialog: {
					visible: false
				},
				status: '0', //0待受理13已退回(材料补正中)6不受理14已放弃
				correctionComment: '',
				materialCorrectId: '',
				formAppraise: {
					satisfiedScore: "",
					comment: "",
				},
			}
		},
		created() {
			this.getDetails();
		},
		methods: {
			/* 提交评价 */
			submitApprise() {
				this.confirm("确认评价吗？")
					.then(() => workOrderApi.appraise.appraise({
						...this.formAppraise,
						workOrderNo: this.details.workOrderNo
					}))
					.then(() => {
						this.getDetails()
					});
			},
			confirm(message) {
				return this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				});
			},
			/* 申请复核 */
			reviewApply() {
				this.reconsiderationDialog.visible = true
			},
			reconsiderationSuccess() {
				this.reconsiderationDialog.visible = false
				this.getDetails();
			},
			evidenceSuccess() {
				this.getDetails();
			},
			repeatSubmit() {
				this.$router.push({
					path: '/portals/createStep2',
					query: {
						workOrderId: this.details.id
					}
				})
			},
			txt2HTML,
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				}
			},
			/* 获取详情 */
			getDetails() {
				this.loading = true
				const userInfo = getCMSUserInfo();
				portalsApi.workOrder.detailsOfMyWorkOrder(this.$route.query.id, {
						idNumber: userInfo.userType == '1' ? userInfo.idNumber : '',
						socialCreditNumber: userInfo.userType == '2' ? userInfo.socialCreditNumber : '',
					})
					.then(res => {
						this.details = res.result;
						this.details.statusStr = returnStatus(this.details.status, this.details.subStatus)
						this.correctionComment = this.details.adduceCorrectionDtoList.length > 0 ? this.details
							.adduceCorrectionDtoList[this.details.adduceCorrectionDtoList.length - 1]
							.correctRequirement :
							''
						this.materialCorrectId = this.details.adduceCorrectionDtoList.length > 0 ? this.details
							.adduceCorrectionDtoList[this.details.adduceCorrectionDtoList.length - 1]
							.id :
							''
						this.loading = false
					})
					.then(() => this.$nextTick(postPortalsHeight));
			},
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

	.appraise-cn {
		border-top: 1px solid rgb(204, 204, 204);
		padding-top: 15px;

		.el-rate {
			margin-top: 9px;
		}

	}

	::v-deep .el-form-item__label {
		font-size: 16px;
		color: #666;
		line-height: 32px !important;
	}

	::v-deep .el-form-item__content {
		font-size: 16px;
		line-height: 32px !important;
	}

	::v-deep .footer-btn .el-button--primary {
		background: #1b5284;
	}

	::v-deep .el-table .cell {
		font-size: 16px;
	}

	.process-item {
		flex: 1;
		height: 100%;
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 2px;
		display: flex;
		align-items: center;
		justify-content: center;

		.ls {
			width: 0px;
			height: 0px;
			border-top: 23px solid transparent;
			border-bottom: 23px solid transparent;
			border-left: 20px solid #fff;
		}

		.ld {
			flex: 1;
			height: 100%;
			background: #0b5fd5;
			color: #fff;
			text-align: center;
			line-height: 46px;
		}

		.lj {
			width: 0px;
			height: 0px;
			border-top: 23px solid transparent;
			border-bottom: 23px solid transparent;
			border-left: 20px solid #0b5fd5;
		}


	}

	.active {
		-webkit-clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
		clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
		background-color: #337ab7;
	}

	.normal {}

	.module-head {
		padding: 0 15px;
		min-height: 40px;
		background: linear-gradient(90deg, #0b5fd5 0, #e6f2ff);
		font-size: 20px;
		margin-bottom: 20px;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.comments {
		li {
			padding: 20px 0 20px 60px;
			border-bottom: 1px solid #E8E8E8;


			.info {
				display: flex;
				line-height: 20px;

				.name {
					font-weight: 600;
					color: #0E87F7;
				}

				.type {
					margin: 0 20px;
					font-weight: 400;
					color: #666666;
				}

				.time {
					flex: 1;
					text-align: right;
					color: #666666;
				}

				.replay {
					margin-left: 20px;
					color: @color-primary;
				}
			}


			.content {
				margin-top: 20px;
				color: #666666;
				line-height: 20px;
			}
		}
	}

	.comments-footer {
		margin-top: 30px;
		display: flex;

		.send-btn {
			margin-left: 10px;
			width: 100px;
			height: 36px;
		}
	}

	.prompt {
		font-size: 12px;
		color: #0B5FD5;
		line-height: 17px;
		padding: 8.5px 20px;
		background: rgba(114, 195, 255, 0.1);
		border-radius: 2px;
		border: 1px solid #3279F2;
		margin-bottom: 20px;
	}
</style>
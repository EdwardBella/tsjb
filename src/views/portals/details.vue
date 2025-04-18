<template>
	<div class="contants">
		<el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh); ">
			
			<div style="width: 100%;height: 46px;display: flex;align-items: center;background: #b8d6ff;">
				<div class="process-item">
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #0b5fd5;">
							<div class="ls"></div>
						</div>
						<span class="ld">待受理</span>
						<div class="lj"></div>
					</div> -->
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #bfbfbf;">待受理</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div> -->
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #E6A23B;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #E6A23B;">材料补正中</span>
						<div class="lj" style="border-left: 20px solid #E6A23B;"></div>
					</div> -->
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #ff4d4f;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #ff4d4f;">不受理</span>
						<div class="lj" style="border-left: 20px solid #ff4d4f;"></div>
					</div> -->
					<div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #ff4d4f;">
							<div class="ls"></div>
						</div>
						<span class="ld" style="background-color: #ff4d4f;">放弃投诉</span>
						<div class="lj" style="border-left: 20px solid #ff4d4f;"></div>
					</div>

				</div>
				<div class="process-item">
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div  style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">已受理</span>
						<div class="lj"></div>
					</div> -->
					<div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld" style="background-color: #bfbfbf;">已受理</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
				<div class="process-item">
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div  style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">调查处理中</span>
						<div class="lj"></div>
					</div> -->
					<div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld" style="background-color: #bfbfbf;">调查处理中</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
				<div class="process-item">
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div  style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">结案待评价</span>
						<div class="lj"></div>
					</div> -->
					<div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld" style="background-color: #bfbfbf;">结案待评价</span>
						<div class="lj" style="border-left: 20px solid #bfbfbf;"></div>
					</div>
				</div>
				<div class="process-item">
					<!-- <div style="display: flex;align-items: center;width: 100%;">
						<div  style="background-color: #0b5fd5;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld">已评价</span>
						<div class="lj"></div>
					</div> -->
					<div style="display: flex;align-items: center;width: 100%;">
						<div style="background-color: #bfbfbf;">
							<div class="ls" style="border-left: 20px solid #b8d6ff;"></div>
						</div>
						<span class="ld" style="background-color: #bfbfbf;">已评价</span>
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
						<el-form-item label="联系人"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号码"></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系邮箱"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="企业名称"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="社会信用代码"></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="通讯地址"></el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="所属行业"></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="是否授权"></el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="module-head" style="margin-top: 10px;">
				<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
				<span style="font-size: 18px;">投诉对象基本信息</span>
			</div>
			<el-form class="key-value" label-width="130px" label-suffix="：">
				<el-row>
					<el-col :span="12">
						<el-form-item label="投诉对象"></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="事发地"></el-form-item>
					</el-col>

				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="联系人"></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="社会信用代码"></el-form-item>
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
						<el-form-item label="案件名称"></el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item
							label="主要诉求">奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item
							label="事实理由">奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看奥斯卡看世界大会开始角度看</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="拖欠账款"></el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="作证材料">
							<el-table v-if="details.attachmentList && details.attachmentList.length"
								:data="details.attachmentList" size="mini" :show-header="false">
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
						<el-form-item label="案件编号"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="案件状态"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="案件来源"></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="受理单位"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="承办单位"></el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="案件归属地"></el-form-item>
					</el-col>
				</el-row>
			</el-form>



			<div class="footer-btn" style="display: flex;align-items: center;justify-content: center;">
				<el-button @click="$router.back()" plain
					style="display: flex;align-items: center;justify-content: center; font-size: 20px; height: 42px;line-height: 42px;font-weight: 600;">返回</el-button>

			</div>


		</el-scrollbar>


		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>
</template>

<script>
	import * as portalsApi from '@/api/portals'
	import {
		downloadFile,
		getCMSUserInfo,
		isEmpty,
		postPortalsHeight
	} from "@/utils/common";
	import previewDialog from "@/views/workOrder/components/previewDialog";
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
			previewDialog
		},
		filters: {
			workOrderEventSource,
			workOrderStatus,
			timeRemaining,
			workOrderCreatorType,
			workOrderPublicStatus,
			workOrderPublicIntention,
			timeRemainingDHMS,
			hourMinute,
			workOrderComplaintObjectType,
			money
		},
		data() {
			return {
				commentsLoading: false,
				loading: false,
				details: {
					"acceptDepartment": "河南省发展和改革委员会",
					"actualProcessDay": "",
					"addTimeNum": 0,
					"address": "固始县",
					"addressArea": "",
					"addressCity": "",
					"addressDepartmentCode": "101016007027",
					"addressDepartmentName": "固始县产业集聚区",
					"addressId": 148,
					"adduceCorrectionDtoList": "",
					"appraiseStatus": "N",
					"attachmentList": [1, 2, 3],
					"auditFlag": "N",
					"backInfo": {
						"backTime": "",
						"limitDay": "",
						"modifyContent": "",
						"requireContent": ""
					},
					"clientIdCardList": [],
					"comment": "",
					"companyAddress": "固始县阳关办事处金色雅居一期",
					"companyContactIdNum": "",
					"companyContactName": "",
					"complainAddress": "固始县",
					"complainAddressId": 148,
					"complainPersonMainInfo": {
						"attachmentList": [],
						"auth": "false",
						"companyAddress": "固始县阳关办事处金色雅居一期",
						"companyContactName": "",
						"companyName": "固始县方圆绿地食品有限责任公司",
						"createType": 1,
						"createUsername": "张正豪",
						"email": "18697731618@163.com",
						"idNumber": "413026197012120638",
						"mandator": "",
						"mandatorPhone": "",
						"mobile": "18697731618",
						"socialCreditNumber": "91411525MA3XA9AEX0"
					},
					"complainant": {
						"address": "固始县",
						"addressDepartmentName": "固始县产业集聚区",
						"complaintContactMobile": "",
						"complaintContactName": ""
					},
					"complaint": "",
					"copyDepartmentList": [],
					"correctRequirement": "",
					"createTime": "2025-03-05 16:14:44",
					"createType": 1,
					"createUsername": "张正豪",
					"currentStepDeadline": "2025-03-10 23:59:59",
					"deadline": "2025-05-12 23:59:59",
					"debtAmount": "",
					"entrustedEnterpriseIdNum": "",
					"entrustedEnterpriseName": "",
					"factReason": "一、拆迁人口安置补偿款未落实导致企业至今无资金购置设备恢复生产、已签订的订单合同逾期8个月无法履行\n    我司原厂房及住宅因政府项目征迁、于2022年8月阳关街道办事处（原固始县产业集聚区）在没有提前安置过度厂房、给我司过度生产情况下拆除，导致价值80万元的原料及半成品积压至今（现冷冻暂存、待作鱼饲料或报废处理）\n二、拆迁补偿政策执行严重失当和同一辖区双重标准选择性实施政策\n1. 双重标准执行、实施政策措施不依法平等对待各类市场主体问题\n2022年8月我司厂房及住宅拆迁过程中，阳关街道办强行采用已废止的《固政文〔2012〕287号》拆迁文件，拒绝执行现行有效的《固政办〔2020〕30号》拆迁文件。经查证：\n- 2020年5月21日开始县政府征地拆迁项目已全县统一执行新政：《固政办〔2020〕30号》拆迁文件\n- 县国土资源局已明确要求阳关街道办适用新标准（有证据提供）\n- 2020年5月21日至今、邻村拆迁项目均按新政执行，形成同一辖区双重标准、选择性实施歧视性政策文件，实施政策措施不依法平等对待各类市场主体\n2. 补偿资金拖欠事实\n货币安置补偿款：按《固政办〔2020〕30号》拆迁征收文件第十九条规定，未安置3人口、应获安置补偿费75万元，经多次书面申请货币安置便于购置设备未果\n3. 政策执行严重失当造成我司严重损失事实\n（1）80万元冷冻原料和半成品因厂房拆除积压至今，超保质期后只能作鱼饲料或报废处理\n（2）已签订2024年-2026年3600万元订单，因设备资金缺口导致至今逾期8个月\n三、严重违反法定程序、市场主体合法权益受到侵害\n1. 违反《土地管理法》第四十八条：未落实\"先补偿后搬迁\"法定程序，未安置的3人在未提前安置补偿情况下强制拆除；我司在没有提前安置过度厂房生产情况下强制拆除，导至我司80万元冷冻原料和半成品积压至今，超保质期后只能报废处理\n2. 违反《民法典》第一百一十七条：征收未依法给予公平补偿\n3. 违反国务院《优化营商环境条例》第二章 市场主体保护和第六十九条等相关条例，未保障市场主体合法权益，实施政策措施不依法平等对待各类市场主体。违反《河南省优化营商环境条例》第八十三条等相关条例，侵害市场主体利益，损害营商环境。\n4、责任单位长期无视企业诉求困境，故意刁难和歧视小微企业、故意设“ 卡 ”和阻碍小微企业发展\n  详情请了解附件内容！！",
					"filingTime": "",
					"finishStatus": "",
					"giveUpReason": "",
					"hasComplain": "",
					"id": "a30eac19c5e842d2b0bf22d0281178b4",
					"idNumber": "413026197012120638",
					"industryType": "制造业",
					"industryType1": "第二产业",
					"isArrear": false,
					"itemDetailId": "",
					"itemDetailName": "",
					"itemSource": 0,
					"lastCompleteTime": "",
					"mailAddress": "",
					"mainApply": "关于请求协调解决固始县阳关街道办事处政策执行偏差、实施歧视性政策文件、实施政策措施不依法平等对待市场主体导致企业陷入生存危机和市场主体合法权益受损并严重损害营商环境的紧急报告",
					"materialCorrectRecordId": "",
					"materialCorrectStatus": "",
					"materialCorrectionDtoList": "",
					"mobile": "18697731618",
					"orderPublishStatus": "",
					"overWorkOrderVo": {
						"attachmentList": [],
						"comment": "",
						"reason": "",
						"reportFile": [],
						"reportNoticeFile": [],
						"workOrderNo": ""
					},
					"powerOfAttorney": [],
					"principalIdCardList": [],
					"processAttachmentList": "",
					"processDepartment": "",
					"processLimitDay": 45,
					"processList": [{
						"acceptDepartment": "河南省发展和改革委员会",
						"acceptDepartmentCode": "101002001",
						"comment": "",
						"correctRequirement": "",
						"costTime": "",
						"createTime": "2025-03-05 16:14:44",
						"createUser": "5439",
						"delFlag": "N",
						"id": "84d41c13e3894c7dabbd4496510e6756",
						"lastCompleteTime": "",
						"lastCurrStepDeadline": "",
						"makePayPlanAmount": "",
						"modifyRequirement": "",
						"operateName": "网站用户创建了案件",
						"operateType": "00",
						"other": "",
						"payNote": "",
						"payedAmount": "",
						"processUser": "张正豪",
						"processUserId": "5439",
						"reason": "",
						"satisfactionLevel": "",
						"updateTime": "",
						"updateUser": "",
						"workOrderNo": "20250305营商000003"
					}],
					"publicStatus": "",
					"pushDepartmentList": [{
							"accountId": "",
							"createName": "",
							"createTime": "2025-03-05 16:14:44",
							"delFlag": "N",
							"departmentCode": "101016007017",
							"departmentName": "固始县发展和改革委员会",
							"id": 1421,
							"orderBy": 1,
							"relType": "PUSH",
							"remark": "",
							"updateTime": "",
							"updateUser": "",
							"workOrderId": "a30eac19c5e842d2b0bf22d0281178b4",
							"workOrderNo": "20250305营商000003"
						},
						{
							"accountId": "",
							"createName": "",
							"createTime": "2025-03-05 16:14:44",
							"delFlag": "N",
							"departmentCode": "101016012032",
							"departmentName": "信阳市营商环境服务中心",
							"id": 1422,
							"orderBy": 2,
							"relType": "PUSH",
							"remark": "",
							"updateTime": "",
							"updateUser": "",
							"workOrderId": "a30eac19c5e842d2b0bf22d0281178b4",
							"workOrderNo": "20250305营商000003"
						}
					],
					"questionMainInfo": {
						"factReason": "一、拆迁人口安置补偿款未落实导致企业至今无资金购置设备恢复生产、已签订的订单合同逾期8个月无法履行\n    我司原厂房及住宅因政府项目征迁、于2022年8月阳关街道办事处（原固始县产业集聚区）在没有提前安置过度厂房、给我司过度生产情况下拆除，导致价值80万元的原料及半成品积压至今（现冷冻暂存、待作鱼饲料或报废处理）\n二、拆迁补偿政策执行严重失当和同一辖区双重标准选择性实施政策\n1. 双重标准执行、实施政策措施不依法平等对待各类市场主体问题\n2022年8月我司厂房及住宅拆迁过程中，阳关街道办强行采用已废止的《固政文〔2012〕287号》拆迁文件，拒绝执行现行有效的《固政办〔2020〕30号》拆迁文件。经查证：\n- 2020年5月21日开始县政府征地拆迁项目已全县统一执行新政：《固政办〔2020〕30号》拆迁文件\n- 县国土资源局已明确要求阳关街道办适用新标准（有证据提供）\n- 2020年5月21日至今、邻村拆迁项目均按新政执行，形成同一辖区双重标准、选择性实施歧视性政策文件，实施政策措施不依法平等对待各类市场主体\n2. 补偿资金拖欠事实\n货币安置补偿款：按《固政办〔2020〕30号》拆迁征收文件第十九条规定，未安置3人口、应获安置补偿费75万元，经多次书面申请货币安置便于购置设备未果\n3. 政策执行严重失当造成我司严重损失事实\n（1）80万元冷冻原料和半成品因厂房拆除积压至今，超保质期后只能作鱼饲料或报废处理\n（2）已签订2024年-2026年3600万元订单，因设备资金缺口导致至今逾期8个月\n三、严重违反法定程序、市场主体合法权益受到侵害\n1. 违反《土地管理法》第四十八条：未落实\"先补偿后搬迁\"法定程序，未安置的3人在未提前安置补偿情况下强制拆除；我司在没有提前安置过度厂房生产情况下强制拆除，导至我司80万元冷冻原料和半成品积压至今，超保质期后只能报废处理\n2. 违反《民法典》第一百一十七条：征收未依法给予公平补偿\n3. 违反国务院《优化营商环境条例》第二章 市场主体保护和第六十九条等相关条例，未保障市场主体合法权益，实施政策措施不依法平等对待各类市场主体。违反《河南省优化营商环境条例》第八十三条等相关条例，侵害市场主体利益，损害营商环境。\n4、责任单位长期无视企业诉求困境，故意刁难和歧视小微企业、故意设“ 卡 ”和阻碍小微企业发展\n  详情请了解附件内容！！",
						"govArrears": "",
						"isArrear": false,
						"itemName": "",
						"mainApply": "关于请求协调解决固始县阳关街道办事处政策执行偏差、实施歧视性政策文件、实施政策措施不依法平等对待市场主体导致企业陷入生存危机和市场主体合法权益受损并严重损害营商环境的紧急报告",
						"name": "固始县方圆绿地食品有限责任公司反映固始县产业集聚区的问题",
						"wordAttachmentList": [{
							"behavivor": "WORK_ORDER_ADD",
							"businessType": 0,
							"createTime": "2025-03-05 16:14:44",
							"createUser": "5439",
							"delFlag": "N",
							"fileName": "省营商办新-关于请求协调解决固始县阳关街道办事处政策执行偏差导致市场主体合法权益受损的紧急报告.docx",
							"fileUrl": "group1/M00/00/6B/wKgQLWfH_xiAV5UkAA6LWg3xwHM73.docx",
							"id": 9397,
							"materialCorrectRecordId": "",
							"primaryBusinessType": 0,
							"processId": "",
							"secondaryBusinessType": 35,
							"source": "",
							"type": ".docx",
							"updateTime": "",
							"updateUser": "",
							"userId": "",
							"workOrderId": "",
							"workOrderNo": "20250305营商000003"
						}]
					},
					"rejectReview": "N",
					"rejectWorkOrderDto": {
						"comment": "",
						"notAcceptReason": "",
						"rejectAttachments": [],
						"workOrderNo": ""
					},
					"repeatCheck": "",
					"repeatCheckAttachments": "",
					"repeatCheckReason": "",
					"repeatCheckTime": "",
					"socialCreditNumber": "91411525MA3XA9AEX0",
					"status": 0,
					"subStatus": 0,
					"title": "固始县方圆绿地食品有限责任公司反映固始县产业集聚区的问题",
					"wordAttachmentList": [{
						"behavivor": "WORK_ORDER_ADD",
						"businessType": 0,
						"createTime": "2025-03-05 16:14:44",
						"createUser": "5439",
						"delFlag": "N",
						"fileName": "投诉书.doc",
						"fileUrl": "group1/M00/00/6B/wKgQLWfIB5CAfvy7AAA2ADpPlQs883.doc",
						"id": 9398,
						"materialCorrectRecordId": "",
						"primaryBusinessType": 10,
						"processId": "",
						"secondaryBusinessType": 34,
						"source": "",
						"type": ".doc",
						"updateTime": "",
						"updateUser": "",
						"userId": "",
						"workOrderId": "",
						"workOrderNo": "20250305营商000003"
					}],
					"workOrderAppraise": "",
					"workOrderAudit": "",
					"workOrderHandleInfo": {
						"acceptAttachmentList": [],
						"acceptDepartmentName": "",
						"itemSource": 0,
						"makeACopyForDepartment": "101016007017,101016012032",
						"ownershipCase": "固始县",
						"processDepartmentName": "",
						"status": "0",
						"supervisionCases": "",
						"supervisionDepartmentName": "",
						"workOrderNumber": ""
					},
					"workOrderMaterialRecordList": "",
					"workOrderNo": "20250305营商000003",
					"workOrderNumber": "",
					"workOrderProcessResult": "",
					"workOrderSubmitFinishResult": {
						"attachmentList": [],
						"comment": "",
						"createTime": "",
						"createUser": "",
						"delFlag": "",
						"id": "",
						"processId": "",
						"reason": "",
						"reportList": [],
						"reportNoticeFile": [],
						"satisfactionLevel": "",
						"updateTime": "",
						"updateUser": "",
						"workOrderNo": ""
					}
				},
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
				status: '0', //0待受理13已退回(材料补正中)6不受理14已放弃
			}
		},
		computed: {
			hasWorkOrderAppraise() {
				return Boolean(this.details.workOrderAppraise)
			},
			workOrderProcessResult() {
				return this.details.workOrderProcessResult || {};
			},
			workOrderAppraise() {
				return this.details.workOrderAppraise || {}
			},
			actualProcessDay() {
				const actualProcessDay = this.details.actualProcessDay
				if (isEmpty(actualProcessDay)) return '-'
				return `${timeFormatDHMS(Number(actualProcessDay) * 1000)}`
			},
			workOrderSubmitFinishResult() {
				return this.details.workOrderSubmitFinishResult || {}
			}
		},
		created() {
			// this.getDetails();
			// this.getComments();
		},
		mounted() {
			let that = this
			window.addEventListener('message', function(e) {
				console.log(e.data.data, '留言-回复-监听cms是否已返回登录及验证的状态,0:留言,1:回复,"":投诉按钮')
				// 来判断是留言还是回复
				if (e.data) {
					// 留言 0
					if (e.data.name == 'loginMsg' && e.data.data.buttonType === 0) that.handleComment()
					// 回复 1
					if (e.data.name == 'loginMsg' && e.data.data.buttonType === 1) that.handleSetReplay(that
						.listItemMsg)
					// 存储来自cms的用户信息
					if (e.data.name == 'loginMsg') sessionStorage.setItem('formCmsLoginMsg', JSON.stringify(e.data
						.data))
				}
			}, false);
		},
		methods: {
			txt2HTML,
			toVerify(type, item) {
				// type为回复时，保存行数据
				this.listItemMsg = item
				console.log('行数据：', this.listItemMsg)
				// 向父级申请当前用户状态是否为 已登录已验证 状态
				window.parent.postMessage({
						name: 'isCertification',
						data: {
							detailId: this.$route.query.id,
							url: '/portals/details',
							buttonType: type // 0:留言，1:回复
						},
					},
					"\*"
				)
				console.log(type, " - 投诉举报已发送isCertification - 0:留言，1:回复")
			},
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				}
			},
			getDetails() {
				portalsApi.workOrder.details(this.$route.query.id)
					.then(res => {
						this.details = res.result;
					})
					.then(() => this.$nextTick(postPortalsHeight));
			},
			getComments() {
				this.commentsLoading = true
				portalsApi.workOrder.comments(this.$route.query.id)
					.then(res => {
						this.comments = res.result;
					})
					.then(() => this.$nextTick(postPortalsHeight))
					.finally(() => this.commentsLoading = false)
			},
			handleDownload(row) {
				fileApi.download({
					downloadFileName: row.fileName,
					filePath: row.fileUrl
				})
			},
			handleComment() {
				const form = {
					...this.form
				}
				if (form.comment.length === 0) return
				const replayObject = this.replayObject
				const cmsUserInfo = getCMSUserInfo()
				// form.createUser = cmsUserInfo.userName
				form.publishUsername = cmsUserInfo.userName
				form.workOrderId = this.$route.query.id
				let promise = portalsApi.workOrder.addComment
				if (replayObject.publishUsername) {
					form.parentCommentId = replayObject.id
					form.parentPublishUsername = replayObject.publishUsername
					promise = portalsApi.workOrder.addFeedback
				}

				promise(form)
					.then(res => {
						this.form.comment = ''
						this.replayObject = {}
						this.getComments()
					})
			},
			handleSetReplay(item) {
				console.log(item)
				this.replayObject = {
					...item
				}
			},
			handleDeleteReplayObject(e) {
				if (this.canDelReplayObject) {
					this.replayObject = {}
					this.canDelReplayObject = false
					return
				}
				this.canDelReplayObject = this.form.comment === '';
			}
		}
	};
</script>

<style lang="less" scoped>
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

	.process-item {
		flex: 1;
		height: 100%;
		font-size: 20px;
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
		margin-bottom: 10px;
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
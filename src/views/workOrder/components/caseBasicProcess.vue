<template>
	<div class="caseBasic">
		<!-- 状态 -->
		<caseStatus :detailsInfo="detailsInfo" :surpriseStatusInfo="surpriseStatusInfo" />

		<!-- 督办内容-->
		<superviseAndHandleInfo v-if="surpriseStatusInfo.id != '' && surpriseStatusInfo.superviseStatus == '1'"
			:surpriseStatusInfo="surpriseStatusInfo" />



		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">投诉举报人基本信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				<el-col :span="8">
					<el-form-item label="联系人">{{detailsInfo.complainPersonMainInfo.createUsername || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="身份证号">{{detailsInfo.companyContactIdNum || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="手机号码">{{detailsInfo.mobile || ''}}</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="联系邮箱">{{detailsInfo.complainPersonMainInfo.email || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="企业名称">{{detailsInfo.complainPersonMainInfo.companyName || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item
						label="社会信用代码">{{detailsInfo.complainPersonMainInfo.socialCreditNumber || ''}}</el-form-item>
				</el-col>
			</el-row>


			<el-row>
				<el-col :span="8">
					<el-form-item label="通讯地址">{{detailsInfo.companyAddress || ''}}</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item
						label="所属行业">{{detailsInfo.industryType?(detailsInfo.industryType1+' / '+detailsInfo.industryType):''}}</el-form-item>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item
						label="是否授权">{{detailsInfo.complainPersonMainInfo.auth == 'true'?'是':'否'}}</el-form-item>
				</el-col>
				<el-col :span="8" v-if="detailsInfo.complainPersonMainInfo.auth == 'true'">
					<el-form-item label="委托人">{{detailsInfo.complainPersonMainInfo.mandator || ''}}</el-form-item>
				</el-col>
				<el-col :span="8" v-if="detailsInfo.complainPersonMainInfo.auth == 'true'">
					<el-form-item label="联系电话">{{detailsInfo.complainPersonMainInfo.mandatorPhone || ''}}</el-form-item>
				</el-col>
			</el-row>
			<el-col :span="24" v-if="detailsInfo.complainPersonMainInfo.auth == 'true'">
				<el-form-item label="身份证">
					<el-table v-if="detailsInfo.clientIdCardList && detailsInfo.clientIdCardList.length"
						:data="detailsInfo.clientIdCardList" size="mini" :show-header="false">
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
			<el-col :span="24" v-if="detailsInfo.complainPersonMainInfo.auth == 'true'">
				<el-form-item label="授权委托书">
					<el-table v-if="detailsInfo.attachmentList && detailsInfo.attachmentList.length"
						:data="detailsInfo.attachmentList" size="mini" :show-header="false">
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
		</el-form>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">投诉对象基本信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				<el-col :span="12">
					<el-form-item label="投诉对象">{{detailsInfo.complainant.addressDepartmentName || ''}}</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="事发地">{{detailsInfo.complainant.address || ''}}</el-form-item>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="联系人">{{detailsInfo.complainant.complaintContactName || ''}}</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="联系电话">{{detailsInfo.complainant.complaintContactMobile || ''}}</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">案件基本信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				
				<el-col :span="24">
					<el-form-item label="案件名称">{{detailsInfo.title || ''}}
						<span v-if="detailsInfo.title && userRoles.isLeaderDepartment"
							style="margin-left: 10px;color: #0c60d5;font-size: 16px;cursor: pointer;"
							@click="editTitle">修改</span>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="反映事项">{{detailsInfo.itemDetailName || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="系统领域">{{detailsInfo.systemDomain || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="部门归口">{{detailsInfo.belongType || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="主要诉求">{{detailsInfo.mainApply || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="事实理由">{{detailsInfo.factReason || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="拖欠账款">{{detailsInfo.questionMainInfo.isArrear == true?'是':'否'}}</el-form-item>
				</el-col>
				<el-col :span="8" v-if="detailsInfo.questionMainInfo.isArrear">
					<el-form-item
						label="合同金额">{{detailsInfo.questionMainInfo.govArrears.contractAmount || ''}}万元</el-form-item>
				</el-col>
				<el-col :span="16" v-if="detailsInfo.questionMainInfo.isArrear">
					<el-form-item
						label="欠款金额">{{detailsInfo.questionMainInfo.govArrears.arrearsAmount || ''}}万元</el-form-item>
				</el-col>
				<el-col :span="8" v-if="detailsInfo.questionMainInfo.isArrear">
					<el-form-item
						label="合同协议名称">{{detailsInfo.questionMainInfo.govArrears.contractName || ''}}</el-form-item>
				</el-col>
				<el-col :span="16" v-if="detailsInfo.questionMainInfo.isArrear">
					<el-form-item label="签订时间">{{detailsInfo.questionMainInfo.govArrears.signTime || ''}}</el-form-item>
				</el-col>
				<el-col :span="24" v-if="detailsInfo.questionMainInfo.isArrear">
					<el-form-item
						label="主要违约条款">{{detailsInfo.questionMainInfo.govArrears.defaultClause || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="佐证材料">
						<el-table v-if="detailsInfo.wordAttachmentList && detailsInfo.wordAttachmentList.length"
							:data="detailsInfo.wordAttachmentList" size="mini" :show-header="false">
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
					<el-form-item label="反应渠道">{{detailsInfo.hasComplain || ''}}</el-form-item>
				</el-col>

			</el-row>

		</el-form>

		<!-- 材料举证信息-->
		<adduceEvidenceInfo v-if="detailsInfo.adduceCorrectionDtoList.length > 0"
			:listReviewFeedBack="detailsInfo.adduceCorrectionDtoList" />

		<!-- 预审反馈信息-->
		<preReviewFeedbackInfo v-if="listReviewFeedBack.length > 0" :listReviewFeedBack="listReviewFeedBack" />

		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">案件办理信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				<el-col :span="8">
					<el-form-item label="案件编号">{{detailsInfo.workOrderNumber || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="案件状态">{{returnStatus(detailsInfo.status,detailsInfo.subStatus)}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="案件来源">{{itemResourceTrans[detailsInfo.itemSource]}}</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="受理单位">{{detailsInfo.workOrderHandleInfo.acceptDepartmentName || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="承办单位">{{detailsInfo.processDepartment || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="案件归属地">{{detailsInfo.belongingPlace || ''}}</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="推送单位">
						<div style="display: flex;align-items: center;flex-wrap: wrap;">
							<div style="position: relative;margin-right: 8px;"
								v-for="(item,index) in detailsInfo.pushDepartmentList" :key="index">
								<span>{{item.departmentName}},</span>
								<i @click="delPushDepartment(item)" v-if="userRoles.isLeaderDepartment"
									style="position: absolute;right: -7px;top: -5px;cursor: pointer;"
									class="el-icon-circle-close"></i>
							</div>
						</div>

					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item
						label="抄送单位">{{filteJson(detailsInfo.copyDepartmentList,'departmentName')}}</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="提交时间">{{detailsInfo.createTime || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="受理时间">{{detailsInfo.filingTime || ''}}</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="结案时间">{{detailsInfo.finishTime || ''}}</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<!-- 还款信息-->
		<repaymentInfo v-if="[4,15,5,8].includes(detailsInfo.status) && detailsInfo.questionMainInfo.isArrear"
			:detailsInfo="detailsInfo" />

		<!-- 终止信息-->
		<terminationInfo v-if="detailsInfo.status == '8'" :detailsInfo="detailsInfo" />


		<!-- 结案信息-->
		<closeaCaseInfo v-if="detailsInfo.status == '5' || detailsInfo.status == '4'" :detailsInfo="detailsInfo" />


		<!-- 经营主体评价-->
		<appraiseInfo v-if="detailsInfo.appraiseStatus == 'Y'" :detailsInfo="detailsInfo" />



		<!-- 结案回访-->
		<overFllowUpInfo v-if="detailsInfo.status == 5" :workOrderEvaluatesList="detailsInfo.workOrderEvaluates"
			:workOrderNo="detailsInfo.workOrderNo" @success="overFllowUpSuccess" />


		<!-- 操作记录-->
		<operateRecordsInfo :detailsInfo="detailsInfo" />



		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>
		<!-- 修改案件名称 -->
		<caseTitleDialog :visible.sync="caseTitleDialog.visible" :workOrderId="detailsInfo.id"
			@success="caseTitleSuccess">
		</caseTitleDialog>

	</div>
</template>

<script>
	import repaymentInfo from "@/views/workOrder/components/repaymentInfo";
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import caseTitleDialog from "./caseTitleDialog";
	import auditProcess from "@/views/workOrder/components/auditProcess";
	import terminationInfo from "@/views/workOrder/components/terminationInfo";
	import closeaCaseInfo from "@/views/workOrder/components/closeaCaseInfo";
	import overFllowUpInfo from "@/views/workOrder/components/overFllowUpInfo";
	import caseStatus from "@/views/workOrder/components/caseStatus";
	import superviseAndHandleInfo from "@/views/workOrder/components/superviseAndHandleInfo";
	import appraiseInfo from "@/views/workOrder/components/appraiseInfo";
	import preReviewFeedbackInfo from "@/views/workOrder/components/preReviewFeedbackInfo";
	import operateRecordsInfo from "@/views/workOrder/components/operateRecordsInfo";
	import adduceEvidenceInfo from "@/views/workOrder/components/adduceEvidenceInfo";


	import {
		returnStatus,
		returnMainStatus,
		returnAssistantStatus,
	} from '@/utils/common'
	import {
		workOrderEventSourceDict,
	} from "@/utils/dict";
	import * as fileApi from "@/api/file";
	import * as workOrderApi from "@/api/workOrder/index";
	import {
		mapState
	} from 'vuex'
	export default {
		name: "caseBasicProcess",
		components: {
			adduceEvidenceInfo,
			operateRecordsInfo,
			preReviewFeedbackInfo,
			appraiseInfo,
			superviseAndHandleInfo,
			caseStatus,
			previewDialog,
			caseTitleDialog,
			auditProcess,
			repaymentInfo,
			terminationInfo,
			closeaCaseInfo,
			overFllowUpInfo,
		},
		props: {
			detailsInfo: {
				type: Object,
				default: null
			},
			auditDatas: {
				type: Array,
				default: []
			},
			surpriseStatusInfo: {
				type: Object,
				default: null
			},
			listReviewFeedBack: {
				type: Array,
				default: []
			},
		},
		data() {
			return {
				caseTitleDialog: {
					visible: false
				},
				previewDialog: {
					fileURL: '',
					visible: false
				},
				details: null,
				timer: null,
				times: "",
				isOverTime: false,
				itemResourceTrans: workOrderEventSourceDict,
			};
		},
		computed: {
			...mapState(['userInfo', 'userRoles']),
		},
		watch: {
			detailsInfo: {
				handler(val) {
					if (val != null) {

					}
				},
				deep: true,
				immediate: true
			},
		},
		created() {

		},
		mounted() {

		},
		beforeDestroy() {

		},
		methods: {
			returnStatus,
			returnMainStatus,
			returnAssistantStatus,
			sure() {


			},
			closeDialog() {

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
			editTitle() {
				this.caseTitleDialog.visible = true
			},
			caseTitleSuccess(res) {
				this.detailsInfo.title = res
				this.$emit("success");
			},
			confirm(message) {
				return this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				});
			},
			/* 删除推送单位 */
			delPushDepartment(item) {
				this.confirm("确认要删除'" + item.departmentName + "'吗？")
					.then(() => workOrderApi.distribute.removePushDepartment({
						departmentCodeList: [item.departmentCode],
						workOrderNo: this.detailsInfo.workOrderNo
					}))
					.then(() => {

					});
			},
			filteJson(arry, key) {
				if (arry && arry.length > 0) {
					let strList = []
					for (let i = 0; i < arry.length; i++) {
						strList.push(arry[i][key])
					}
					return strList.toString()
				} else {
					return ''
				}

			},
			overFllowUpSuccess(res) {
				this.$emit("success");
			}
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

	.waring-cn {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 8px 16px;
		background-color: #fdf6ec;
		margin-bottom: 10px;
	}

	::v-deep .el-form-item__label {
		font-size: 16px;
		font-weight: normal;
		line-height: 24px !important;
	}

	::v-deep .el-form-item__content {
		font-size: 16px;
		line-height: 24px !important;
	}

	::v-deep .el-table .el-table__header-wrapper th.el-table__cell {
		background-color: #f0f0f0 !important;
	}

	::v-deep .el-table .el-table__body-wrapper .el-table__body tr.el-table__row--striped td.el-table__cell {
		background-color: #f0f0f0 !important;
	}

	::v-deep .el-form-item__content .el-table.el-table--mini .el-table__body-wrapper .el-table__row td.el-table__cell {
		height: auto !important;
		padding: 8px 0px;
	}

	::v-deep .el-table .cell {
		font-size: 16px;
	}

	.caseBasic {
		padding-left: 10px;
		padding-right: 20px;

		.touming {
			height: 40px;
			font-size: 18px;
			display: flex;
			align-items: center;

			.time-cn {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-weight: 700;

				span {
					color: #2b65da;
					font-size: 18px;
					margin-left: 8px;
				}
			}

			.ls {
				background: #2b65da;
				font-size: 16px;
				padding: 0 8px;
				height: 35px;
				line-height: 35px;
				color: #fff;
				border-radius: 3px;
				cursor: pointer;
				margin-right: 8px;
			}

			.repeat {
				display: flex;
				align-items: center;
				background: rgb(245, 91, 35);
				padding: 0 8px;
				border-radius: 3px;
				color: #fff;
				margin-right: 8px;

				span {
					font-size: 16px;
					height: 35px;
					line-height: 35px;
					border-radius: 3px;
					cursor: pointer;
					margin-right: 5px;
				}
			}

			.lb {
				font-size: 18px;
				color: #2b65da;
			}
		}

	}
</style>
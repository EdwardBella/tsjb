<template>
	<div v-loading="submitting" element-loading-text="提交中,请您耐心等待">
		<el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 12px); ">
			<!-- <el-button @click="handleGotoHome" type="primary" plain size="mini"
				style="margin-bottom: 10px">返回</el-button> -->
			<div
				style="width: 100%;font-size: 24px;text-align: center;background: #2b65da;height: 60px;color: #fff; line-height: 60px;margin-bottom: 20px;">
				投诉举报信息填报
			</div>
			<div class="explain">
				<span class="tit">投诉举报填写说明</span>
				<p>一、投诉举报书，主要包括投诉举报人和投诉举报对象的单位名称、联系方式、主要诉求以及事实与理由。请点击<span class="moban" @click="downloadTemplate">
						投诉举报书模板
					</span>下载查看。</p>
				<p>二、与投诉举报事项相关的资料，包括书面材料、照片、录音、录像等。</p>
				<p>三、委托他人代理投诉举报的，应当提供投诉举报人出具的授权委托书及受托人身份证明等相关材料。</p>
				<p>四、如投诉举报人需要相关补正事项的，应按期提交补正，如无正当理由逾期不补正的，则视为放弃投诉举报。</p>
				<p>五、投诉举报人反映情况、提供材料要客观真实准确。</p>
			</div>


			<el-form ref="form" :model="form" :rules="rules" label-width="190px" label-suffix="：">
				<div class="module-head" style="margin-top: 40px;">
					<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
					<span style="font-size: 18px;">投诉举报人基本信息</span>
				</div>
				<template>
					<el-row>
						<el-col :span="12">
							<el-form-item label="企业名称" prop="companyName" label-width="160px">
								<el-input :disabled="cmsUserInfo.userType == 2" v-model="form.companyName">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="统一社会信用代码" prop="socialCreditNumber">
								<el-input :disabled="cmsUserInfo.userType == 2" v-model="form.socialCreditNumber">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</template>

				<el-row>
					<el-col :span="12">
						<el-form-item label="联系人" prop="createUsername" label-width="160px">
							<el-input v-model="form.createUsername" placeholder="请填写联系人" maxlength="30">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号" prop="companyContactIdNum">
							<el-input v-model.trim="form.companyContactIdNum"
								oninput="value=value.replace(/[^a-zA-Z0-9]/g, '')" placeholder="请填写身份证号" maxlength="18">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="9">
						<el-form-item label="手机号码" prop="mobile" label-width="160px">
							<el-input v-model="form.mobile" oninput="value=value.replace(/[^\d.]/g,'')"
								placeholder="请填写手机号码" maxlength="11">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label-width="0px">
							<div v-if='isPhoneCode' @click="getPhoneCode"
								style="font-size: 16px;cursor: pointer; height: 40px;text-align: center;margin-left: 5px; line-height: 40px;border-radius: 4px;box-shadow: 0 2px 4px 0 rgba(9,78,197,.3); border: 1px solid #1b5284; font-weight: 600;">
								获取验证码</div>
							<div v-else
								style="font-size: 16px;cursor: pointer; height: 40px;text-align: center;margin-left: 5px; line-height: 40px;border-radius: 4px;box-shadow: 0 2px 4px 0 rgba(9,78,197,.3); border: 1px solid #1b5284;color: #1b5284;opacity: .5; font-weight: 600;">
								{{countDownPhone}}s
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="验证码" prop="mobileCode">
							<el-input v-model="form.mobileCode" placeholder="请填写验证码">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="9">
						<el-form-item label="联系邮箱" prop="email" label-width="160px">
							<el-input v-model="form.email" placeholder="请填写联系邮箱">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label-width="0px">
							<div v-if="isEmailCode" @click="getEmailCode"
								style="font-size: 16px; cursor: pointer; height: 40px;text-align: center;margin-left: 5px; line-height: 40px;border-radius: 4px;box-shadow: 0 2px 4px 0 rgba(9,78,197,.3); border: 1px solid #1b5284; font-weight: 600;">
								获取验证码</div>
							<div v-else
								style="font-size: 16px;cursor: pointer; height: 40px;text-align: center;margin-left: 5px; line-height: 40px;border-radius: 4px;box-shadow: 0 2px 4px 0 rgba(9,78,197,.3); border: 1px solid #1b5284;color: #1b5284;opacity: .5; font-weight: 600;">
								{{countDownEmail}}s
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="验证码" prop="emailCode">
							<el-input v-model="form.emailCode" placeholder="请填写验证码">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="通讯地址" prop="companyAddress" label-width="160px">
							<el-input v-model="form.companyAddress" placeholder="请填写通讯地址">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属行业" prop="sshy">
							<el-cascader v-model="form.sshy" style="width: 100%;" :options="sshyList"
								:props="{ expandTrigger: 'hover',value:'name',label:'name',children:'subDictList'}"
								@change="handleChange"></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="" label-width="160px">
							<p style="font-size: 14px;font-weight: 600;">
								<span style="color: #e44831;">温馨提示：</span>
								请确认填写信息准确无误。您所填写地址、邮箱、手机号视为案件办理期间的有效送达联系方式。相关文书、材料、信息等到达您提供的送达方式，即视为已送达。
							</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="是否授权" prop="auth" label-width="160px">
							<el-checkbox v-model="form.auth" @change="authChanged">是</el-checkbox>
							<span style="font-size: 14px;font-weight: 600;">（</span> <span
								style="color: #e44831;font-size: 14px;font-weight: 600;">温馨提示：</span><span
								style="font-size: 14px;font-weight: 600;">若您代表企业进行投诉，且联系人非法定代表人，请选择是。）</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.auth">
					<el-col :span="12">
						<el-form-item label="委托人" prop="mandator" label-width="160px">
							<el-input v-model="form.mandator" placeholder="请填写委托人">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话" prop="mandatorPhone">
							<el-input v-model="form.mandatorPhone" oninput="value=value.replace(/[^\d.]/g,'')"
								placeholder="请填写联系电话" maxlength="11">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.auth">
					<el-col :span="24">
						<el-form-item label="身份证" prop="clientIdCardList" label-width="160px">
							<FileUpload @fileDatas="sfzFileList" :datas="clientIdCardDatas" :fileSizes="20"
								tips="委托人身份证人像面和国徽面，上传的附件大小不能超过20M。" />
							<el-table v-if="form.clientIdCardList.length > 0" :data="form.clientIdCardList" size="mini"
								:show-header="false" style="margin-top: 10px">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="{row, $index}">
										<el-button @click="handleDownload(row)" type="primary" plain size="mini"
											style="font-size: 14px;">下载</el-button>
										<el-button @click="handlePreview(row)" type="primary" plain size="mini"
											style="font-size: 14px;">预览</el-button>
										<el-button @click="handleRemoveFile($index,1)" type="primary" plain size="mini"
											style="font-size: 14px;">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.auth">
					<el-col :span="24">
						<el-form-item label="授权委托书" prop="attachmentList" label-width="160px">
							<FileUpload @fileDatas="sqwtsFileList" :datas="attachmentDatas" :fileSizes="50"
								tips="请按照填报要求提供签字盖章的授权委托书资料，上传的附件大小不能超过50M，附件类型支持图片，视频，文档等格式文件。" />
							<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
								:show-header="false"
								style="margin-top: 10px">请按照填报要求提供签字盖章的授权委托书资料，上传的附件大小不能超过50M，附件类型支持图片，视频，文档等格式文件。
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="{row, $index}">
										<el-button @click="handleDownload(row)" type="primary" plain size="mini"
											style="font-size: 14px;">下载</el-button>
										<el-button @click="handlePreview(row)" type="primary" plain size="mini"
											style="font-size: 14px;">预览</el-button>
										<el-button @click="handleRemoveFile($index,2)" type="primary" plain size="mini"
											style="font-size: 14px;">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="module-head">
					<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
					<span style="font-size: 18px;">投诉对象基本信息</span>
				</div>
				<el-row>
					<el-col :span="12">
						<el-form-item label="事发地" prop="addressId" label-width="160px">
							<el-cascader v-model="form.addressId" :show-all-levels="false" ref="addressId"
								style="width: 100%;" :options="areas"
								:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
								clearable @change="addressIdChanged"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="投诉对象" prop="addressDepartmentCode">
							<div style="display: flex;align-items: center;">
								<el-cascader v-model="form.complainAddressId" :show-all-levels="false"
									ref="complainAddressId" style="flex: 1;" :options="areas"
									:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
									clearable @change="complainAddressIdChanged"></el-cascader>

								<el-select v-model="form.addressDepartmentCode" ref="addressDepartmentCode"
									style="flex: 1;" placeholder="请选择部门" clearable filterable>
									<el-option v-for="item in departmentTree" :key="item.code" :label="item.label"
										:value="item.code">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="联系人" prop="complaintContactName" label-width="160px">
							<el-input v-model="form.complaintContactName" placeholder="请填写联系人" maxlength="30">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话" prop="complaintContactMobile">
							<el-input v-model="form.complaintContactMobile" oninput="value=value.replace(/[^\d.]/g,'')"
								maxlength="11" placeholder="请填写联系电话">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="module-head">
					<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
					<span style="font-size: 18px;">反映问题基本信息</span>
				</div>
				<el-row>
					<el-col :span="24">
						<el-form-item label="主要诉求" prop="mainApply" label-width="160px">
							<el-input v-model="form.mainApply" show-word-limit maxlength="200" :placeholder="`请填写主要诉求`"
								type="textarea" style="width: 100%; height: 110px"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="事实理由" prop="factReason" label-width="160px">
							<el-input v-model="form.factReason" show-word-limit maxlength="1000"
								:placeholder="`请填写事实理由`" type="textarea" style="width: 100%; height: 110px"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="佐证材料" prop="supportAttachmentList" label-width="160px">
							<FileUpload @fileDatas="zzclFileList" :datas="supportAttachmentDatas" :fileSizes="100"
								tips="请按照填报要求提供与投诉举报事项相关的资料，上传的附件大小不能超过100M，附件类型支持图片，视频，文档等格式文件。" />
							<el-table v-if="form.supportAttachmentList.length > 0" :data="form.supportAttachmentList"
								size="mini" :show-header="false" style="margin-top: 10px">
								<el-table-column prop="fileName" label="文件名称"></el-table-column>
								<el-table-column label="操作" align="center">
									<template slot-scope="{row, $index}">
										<el-button @click="handleDownload(row)" type="primary" plain size="mini"
											style="font-size: 14px;">下载</el-button>
										<el-button @click="handlePreview(row)" type="primary" plain size="mini"
											style="font-size: 14px;">预览</el-button>
										<el-button @click="handleRemoveFile($index,3)" type="primary" plain size="mini"
											style="font-size: 14px;">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="拖欠账款" prop="isArrear" label-width="160px">
							<el-checkbox v-model="form.isArrear" @change="isArrearChanged">是</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.isArrear">
					<el-col :span="12">
						<el-form-item label="合同金额" prop="contractAmount" label-width="160px">
							<el-input v-model="form.contractAmount" placeholder="请填写合同金额">
								<template slot="append">万元</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="欠款金额" prop="arrearsAmount">
							<el-input v-model="form.arrearsAmount" placeholder="请填写欠款金额">
								<template slot="append">万元</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.isArrear">
					<el-col :span="12">
						<el-form-item label="合同协议名称" prop="contractName" label-width="160px">
							<el-input v-model="form.contractName" placeholder="请填写合同协议名称" maxlength="100"
								show-word-limit>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="签订时间" prop="signTime">
							<el-date-picker v-model="form.signTime" :picker-options="pickerOptions"
								value-format="yyyy-MM-dd" type="date" placeholder="请填写签订时间" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.isArrear">
					<el-col :span="24">
						<el-form-item label="主要违约条款" prop="defaultClause" label-width="160px">
							<el-input v-model="form.defaultClause" show-word-limit maxlength="1000"
								:placeholder="`请填写合同协议主要违约条款`" type="textarea"
								style="width: 100%; height: 110px"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="已反映的渠道" prop="isReflect" label-width="160px">
							<el-radio-group v-model="form.isReflect" @change="isReflectChanged">
								<el-radio label="1">有</el-radio>
								<el-radio label="0">无</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="form.isReflect == '1'?true:false">
					<el-col :span="24">
						<el-form-item label="其它渠道" prop="hasComplain" label-width="160px">
							<el-input v-model="form.hasComplain" placeholder="请填写其它渠道" maxlength="50" show-word-limit>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
			<div class="footer-btn" style="display: flex;align-items: center;justify-content: center;">
				<el-button v-if="!this.$route.query.workOrderId" @click="handleSave" :disabled="submitting"
					type="primary"
					style="display: flex;align-items: center;justify-content: center; font-size: 20px; height: 42px;line-height: 42px;font-weight: 600;">保存</el-button>
				<el-button @click="handleSubmit" :disabled="submitting" type="primary"
					style="display: flex;align-items: center;justify-content: center; font-size: 20px; height: 42px;line-height: 42px;font-weight: 600;">提交</el-button>

				<el-button @click="handleGotoHome" plain
					style="display: flex;align-items: center;justify-content: center; font-size: 20px; height: 42px;line-height: 42px;font-weight: 600;">关闭</el-button>


			</div>
		</el-scrollbar>

		<el-dialog class="dialog-tips" title="提示" :visible.sync="dialogVisible" :show-close="false"
			:close-on-click-modal="false" width="640px">
			<p style="font-size: 22px;margin: 30px 0;">提交成功!</p>
			<div class="split"></div>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary"
					@click="$router.replace(backPath || ($route.query.workOrderId ? '/portals/my/list' : '/portals/index'))">关闭</el-button>
			</span>
		</el-dialog>
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible"
			:filePath="previewDialog.fileURL" width="1200px">
		</previewDialog>
	</div>
</template>

<script>
	import * as portalsApi from '@/api/portals'
	import {
		dict2Array,
		downloadFile,
		fileSize,
		getCitiesByArea,
		getCMSUserInfo,
		mergeLeft,
		postPortalsHeight,
		removeEmptyWithTree,
		checkPhone,
		vueDebounce,
		checkDate,
		checkProv,
		checkParity,
	} from '@/utils/common'
	import * as validators from '@/utils/validators'
	import * as fileApi from '@/api/file'
	import * as mixins from '@/utils/mixins'
	import * as dictApi from "@/api/dict";
	import {
		txt2HTML
	} from '@/utils/filters'
	import {
		workOrderComplaintObjectTypeDict,
		workOrderCreatorTypeDict
	} from '@/utils/dict'
	import previewDialog from "@/views/workOrder/components/previewDialog";
	// import previewDialog from "@/components/previewDialog";
	import FileUpload from "@/views/portals/components/fileUpload"


	export default {
		name: 'createStep2',
		mixins: [mixins.affirm, mixins.form],
		components: {
			previewDialog,
			FileUpload
		},
		data() {
			return {
				totalSecond: 60,
				isPhoneCode: true,
				countDownPhone: 60,
				timer1: null,
				isEmailCode: true,
				countDownEmail: 60,
				timer2: null,
				submitting: false,
				dialogVisible: false,
				uploading: false,
				creatorTypeArr: dict2Array(workOrderCreatorTypeDict, false, Number),
				complaintObjectTypeArr: dict2Array(workOrderComplaintObjectTypeDict),
				form: {
					id: "",
					createUsername: '',
					companyContactIdNum: '',
					companyContactName: '',
					idNumber: '',
					mobile: '',
					mobileCode: '',
					email: '',
					emailCode: '',
					companyAddress: '',
					sshy: [],
					industryType1: '',
					industryType: "",
					companyName: "",
					socialCreditNumber: '',
					auth: false,
					mandator: "",
					mandatorPhone: "",
					addressId: "",
					address: "",
					complainAddressId: "",
					complainAddress: "",
					addressDepartmentName: "",
					addressDepartmentCode: "",
					complaintContactName: "",
					complaintContactMobile: "",
					mainApply: "",
					factReason: "",
					isArrear: false,
					contractAmount: "",
					contractCode: '',
					arrearsAmount: "",
					contractName: "",
					signTime: "",
					defaultClause: "",
					isReflect: "0",
					hasComplain: "",
					itemSource: "0",
					title: "",
					pushDepartmentCode: "",
					clientIdCardList: [], //身份证附件
					attachmentList: [], //委托书附件
					supportAttachmentList: [], //佐证材料

				},
				clientIdCardDatas: [],
				attachmentDatas: [],
				supportAttachmentDatas: [],
				sshyList: [],
				itemdetail: {},
				options: [],
				rules: {
					createUsername: [{
						required: true,
						message: "请填写联系人"
					}],
					companyContactIdNum: [{
						validator: (rule, value, callback) => {
							if (value == "") {
								callback(new Error("身份证号不能为空"));
							} else if (value.length != 18) {
								callback(new Error("格式不正确"));
							} else {
								if (checkDate(value)) {
									if (checkProv(value.substring(0, 2))) {
										if (checkParity(value)) {
											callback();
										} else {
											callback(new Error("格式不正确"));
										}
									} else {
										callback(new Error("格式不正确"));
									}
								} else {
									callback(new Error("格式不正确"));
								}
							}
						},
						required: true,
						trigger: ["change"]
					}],
					mobile: [{
							required: true,
							message: '请填写手机号码'
						},
						{
							validator: validators.phone()
						}
					],
					mobileCode: [{
						required: true,
						message: "请填写验证码"
					}],
					email: [{
						type: "email",
						required: true,
						message: "请填写联系邮箱"
					}],
					emailCode: [{
						required: true,
						message: "请填写验证码"
					}],
					companyAddress: [{
						required: true,
						message: "请填写通讯地址"
					}],
					sshy: [{
						required: true,
						message: "请填写所属行业"
					}],
					mandator: [{
						required: true,
						message: "请填写委托人"
					}],
					mandatorPhone: [{
						required: true,
						message: "请填写联系电话"
					}],
					clientIdCardList: [{
							required: true,
							message: '请上传身份证附件'
						},
						{
							validator: (rule, value, callback) => value.length ? callback() : callback(new Error(
								'请上传身份证附件'))
						}
					],
					attachmentList: [{
							required: true,
							message: '请上传授权委托书附件'
						},
						{
							validator: (rule, value, callback) => value.length ? callback() : callback(new Error(
								'请上传授权委托书附件'))
						}
					],
					addressId: [{
						required: true,
						message: "请选择事发地"
					}],
					addressDepartmentCode: [{
						required: true,
						message: "请选择投诉对象"
					}],
					mainApply: [{
						required: true,
						message: "请填写主要诉求"
					}],
					factReason: [{
						required: true,
						message: "请填写事实理由"
					}],
					supportAttachmentList: [{
							required: true,
							message: '请上传佐证材料附件'
						},
						{
							validator: (rule, value, callback) => value.length ? callback() : callback(new Error(
								'请上传佐证材料附件'))
						}
					],
					contractAmount: [{
						required: true,
						message: "请填写合同金额"
					}],
					arrearsAmount: [{
						required: true,
						message: "请填写欠款金额"
					}],
					contractName: [{
						required: true,
						message: "请填写合同协议名称"
					}],
					signTime: [{
						required: true,
						message: "请选择签订时间"
					}],
					defaultClause: [{
						required: true,
						message: "请填写主要违约条款"
					}],
					isReflect: [{
						required: true,
						message: "请选择已反映渠道"
					}],
					hasComplain: [{
						required: true,
						message: "请填写其它渠道"
					}],

				},
				areas: [],
				city: [],
				itemDetailId: '',
				departmentTree: [],
				departmentTreeLoading: false,
				backPath: '',
				cmsUserInfo: {},
				previewDialog: {
					fileURL: '',
					visible: false
				},
				loading: false,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > new Date().getTime()
					}
				},
			};
		},
		computed: {
			location() {
				return window.location || {}
			}
		},
		watch: {},
		async created() {
			const {
				workOrderId,
				id
			} = this.$route.query
			this.cmsUserInfo = getCMSUserInfo()
			if (this.cmsUserInfo.userType == 2) {
				this.form.companyName = this.cmsUserInfo.userName || ''
				this.form.socialCreditNumber = this.cmsUserInfo.socialCreditNumber || ''
			}
			this.backPath = window.localStorage.getItem('backPath')
			await this.getArea()
			await this.getArea2()
			if (!workOrderId) {
				/* 获取已保存的内容 */
				this.getWorkOrder()
			} else {
				this.getDetails(workOrderId)
			}
		},
		destroyed() {
			clearInterval(this.timer1)
			clearInterval(this.timer2)
		},
		beforeDestroy() {
			clearInterval(this.timer1)
			clearInterval(this.timer2)
		},
		methods: {
			downloadTemplate() {
				dictApi.fileList(10003)
					.then(res => {
						let fileExtension = res.result.value.slice(res.result.value.lastIndexOf("."));
						fileApi.download({
							downloadFileName: res.result.name + fileExtension,
							filePath: res.result.value
						})
					})
			},
			zzclFileList(res) {
				this.form.supportAttachmentList = res
			},
			sqwtsFileList(res) {
				this.form.attachmentList = res
			},
			sfzFileList(res) {
				this.form.clientIdCardList = res
			},
			/* 附件删除 */
			handleRemoveFile(index, type) {
				/* type:1身份证2授权委托书3佐证材料 */
				if (type == 1) {
					this.form.clientIdCardList.splice(index, 1)
				}
				if (type == 2) {
					this.form.attachmentList.splice(index, 1)
				}
				if (type == 3) {
					this.form.supportAttachmentList.splice(index, 1)
				}
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
			isReflectChanged(e) {
				if (e == 0) {
					this.form.hasComplain = ''
				}
			},
			authChanged(e) {
				if (e == false) {
					this.form.mandator = ''
					this.form.mandatorPhone = ''
					this.form.clientIdCardList = []
					this.form.attachmentList = []
				}
			},
			isArrearChanged(e) {
				if (e == false) {
					this.form.contractAmount = ''
					this.form.arrearsAmount = ''
					this.form.contractName = ''
					this.form.signTime = ''
					this.form.defaultClause = ''
				}
			},
			/* 获取短信验证码 */
			getPhoneCode() {
				if (this.form.mobile == '') {
					return this.$modal.msgError('请填写手机号')
				}
				if (!checkPhone(this.form.mobile)) {
					return this.$modal.msgError('请填写正确的手机号')
				}
				// 当前目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
				if (!this.timer1 && this.countDownPhone === this.totalSecond) {
					this.isPhoneCode = false
					// 开启倒计时
					this.timer1 = setInterval(() => {
						this.countDownPhone--

						if (this.countDownPhone <= 0) {
							clearInterval(this.timer1)
							this.timer1 = null // 重置定时器 id
							this.countDownPhone = this.totalSecond // 归位
							this.isPhoneCode = true
						}
					}, 1000)
					// 发送请求，获取验证码
					portalsApi.workOrder.sendSmsCode({
							telephone: this.form.mobile,
							userId: this.cmsUserInfo.userId
						})
						.then(res => {
							this.$modal.msgSuccess('发送成功')
						})

				}
			},
			/* 获取短信验证码 */
			getEmailCode() {
				if (this.form.email == '') {
					return this.$modal.msgError('请填写邮箱')
				}
				// 当前目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
				if (!this.timer2 && this.countDownEmail === this.totalSecond) {
					this.isEmailCode = false
					// 开启倒计时
					this.timer2 = setInterval(() => {
						this.countDownEmail--

						if (this.countDownEmail <= 0) {
							clearInterval(this.timer2)
							this.timer2 = null // 重置定时器 id
							this.countDownEmail = this.totalSecond // 归位
							this.isEmailCode = true
						}
					}, 1000)
					// 发送请求，获取验证码
					portalsApi.workOrder.sendEmailCode({
							mail: this.form.email,
							userId: this.cmsUserInfo.userId
						})
						.then(res => {
							this.$modal.msgSuccess('发送成功')
						})


				}
			},
			handleChange(value) {
				console.log(value);
			},
			addressIdChanged(value) {
				this.$refs.addressId.dropDownVisible = false
			},
			complainAddressIdChanged(value) {
				this.$refs.complainAddressId.dropDownVisible = false
				console.log(value)
				if (value == null) {
					this.departmentTree = []
					this.form.addressDepartmentCode = ''
				} else {
					this.departmentTree = []
					this.form.addressDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.departmentTree = removeEmptyWithTree(r.result, false)
							})
							.finally(() => this.departmentTreeLoading = false)
					})
				}

			},
			deptBackView(id, addressDepartmentCode) {
				portalsApi.workOrder.departByAddress(
						id
					)
					.then(r => {
						this.departmentTree = removeEmptyWithTree(r.result, false)
						this.$nextTick(() => {
							this.form.addressDepartmentCode = addressDepartmentCode
						})
					})
			},
			getDetails(workOrderId) {
				return portalsApi.workOrder.detailsOfMyWorkOrder(workOrderId, {
						idNumber: this.cmsUserInfo.userType == '1' ? this.cmsUserInfo.idNumber : '',
						socialCreditNumber: this.cmsUserInfo.userType == '2' ? this.cmsUserInfo.socialCreditNumber : ''
					})
					.then(res => {
						const details = res.result
						if (details != '') {
							this.form.id = details.id || ''
							this.form.createUsername = details.complainPersonMainInfo.createUsername || ''
							this.form.companyContactIdNum = details.companyContactIdNum || ''
							this.form.companyContactName = details.companyContactName || ''
							this.form.idNumber = details.complainPersonMainInfo.idNumber || ''
							this.form.mobile = details.complainPersonMainInfo.mobile || ''
							this.form.mobileCode = ''
							this.form.email = details.complainPersonMainInfo.email || ''
							this.form.emailCode = ''
							this.form.companyAddress = details.complainPersonMainInfo.companyAddress || ''
							if (details.industryType1 == '' || details.industryType == '') {
								this.form.sshy = []
							} else {
								this.form.sshy = [(details.industryType1 ? details.industryType1 : ''), (details
									.industryType ?
									details.industryType : '')]
							}

							this.form.companyName = details.complainPersonMainInfo.companyName || ''
							this.form.socialCreditNumber = details.complainPersonMainInfo.socialCreditNumber || ''
							this.form.auth = details.complainPersonMainInfo.auth == 'true' ? true : false
							this.form.mandator = details.complainPersonMainInfo.mandator || ''
							this.form.mandatorPhone = details.complainPersonMainInfo.mandatorPhone || ''
							this.form.addressId = Number(details.addressId)
							this.form.address = details.address || ''
							this.form.complainAddressId = details.complainAddressId || ''
							if (details.complainAddressId) {
								this.deptBackView(this.form.complainAddressId, details.addressDepartmentCode || '')
							}
							this.form.complaintContactName = details.complainant.complaintContactName || ''
							this.form.complaintContactMobile = details.complainant.complaintContactMobile || ''
							this.form.mainApply = details.mainApply || ''
							this.form.factReason = details.factReason || ''
							this.form.isArrear = details.questionMainInfo.isArrear
							if (details.questionMainInfo.isArrear) {
								this.form.contractAmount = details.questionMainInfo.govArrears.contractAmount || ''
								this.form.arrearsAmount = details.questionMainInfo.govArrears.arrearsAmount || ''
								this.form.contractName = details.questionMainInfo.govArrears.contractName || ''
								this.form.signTime = details.questionMainInfo.govArrears.signTime || ''
								this.form.defaultClause = details.questionMainInfo.govArrears.defaultClause || ''
							}
							this.form.contractCode = ''
							this.form.isReflect = details.hasComplain ? '1' : '0'
							this.form.hasComplain = details.hasComplain || ''
							this.form.itemSource = details.itemSource || '0'
							this.form.title = ''
							this.form.pushDepartmentCode = ''
							this.form.clientIdCardList = details.clientIdCardList || []
							this.form.attachmentList = details.complainPersonMainInfo.attachmentList || []
							this.form.supportAttachmentList = details.questionMainInfo.wordAttachmentList || []
							this.clientIdCardDatas = details.clientIdCardList || []
							this.attachmentDatas = details.complainPersonMainInfo.attachmentList || []
							this.supportAttachmentDatas = details.questionMainInfo.wordAttachmentList || []
						}
					})
					.then(() => this.$nextTick(postPortalsHeight))
			},
			txt2HTML,
			getWorkOrder() {
				return portalsApi.workOrder.getTemporaryStorage({
						createUserId: this.cmsUserInfo.userId
					})
					.then(res => {
						const details = res.result
						console.log(res, '[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]')
						if (details != '') {
							this.form.id = details.id || ''
							this.form.createUsername = details.createUsername || ''
							this.form.companyContactIdNum = details.companyContactIdNum || ''
							this.form.companyContactName = details.companyContactName || ''
							this.form.idNumber = details.idNumber || ''
							this.form.mobile = details.mobile || ''
							this.form.mobileCode = ''
							this.form.email = details.email || ''
							this.form.emailCode = ''
							this.form.companyAddress = details.companyAddress || ''
							if (details.industryType1 == '' || details.industryType == '') {
								this.form.sshy = []
							} else {
								this.form.sshy = [(details.industryType1 ? details.industryType1 : ''), (details
									.industryType ?
									details.industryType : '')]
							}
							this.form.companyName = details.companyName || ''
							this.form.socialCreditNumber = details.socialCreditNumber || ''
							this.form.auth = details.auth == 'true' ? true : false
							this.form.mandator = details.mandator || ''
							this.form.mandatorPhone = details.mandatorPhone || ''
							this.form.addressId = Number(details.addressId)
							this.form.address = details.address || ''
							this.form.complainAddressId = details.complainAddressId || ''
							if (details.complainAddressId) {
								this.deptBackView(this.form.complainAddressId, details.addressDepartmentCode || '')
							}
							this.form.complaintContactName = details.complaintContactName || ''
							this.form.complaintContactMobile = details.complaintContactMobile || ''
							this.form.mainApply = details.mainApply || ''
							this.form.factReason = details.factReason || ''
							this.form.isArrear = details.questionMainInfoVO.isArrear
							if (details.questionMainInfoVO.isArrear) {
								this.form.contractAmount = details.questionMainInfoVO.tbGovArrears.contractAmount || ''
								this.form.arrearsAmount = details.questionMainInfoVO.tbGovArrears.arrearsAmount || ''
								this.form.contractName = details.questionMainInfoVO.tbGovArrears.contractName || ''
								this.form.signTime = details.questionMainInfoVO.tbGovArrears.signTime || ''
								this.form.defaultClause = details.questionMainInfoVO.tbGovArrears.defaultClause || ''
							}
							this.form.contractCode = ''
							this.form.isReflect = details.hasComplain ? '1' : '0'
							this.form.hasComplain = details.hasComplain || ''
							this.form.itemSource = details.itemSource || '0'
							this.form.title = ''
							this.form.pushDepartmentCode = ''
							this.form.clientIdCardList = details.clientIdCardList || []
							this.form.attachmentList = details.attachmentList || []
							this.form.supportAttachmentList = details.supportAttachmentList || []
							this.clientIdCardDatas = details.clientIdCardList || []
							this.attachmentDatas = details.attachmentList || []
							this.supportAttachmentDatas = details.supportAttachmentList || []
						}
					})
					.then(() => this.$nextTick(postPortalsHeight))
			},

			handleAddressAreaChange() {
				this.city = getCitiesByArea(this.area, this.form.addressArea)
				this.form.addressCity = ''
			},
			async getArea() {
				await portalsApi.workOrder.area()
					.then(res => {
						this.areas = [res.result]
					})
			},
			async getArea2() {
				await portalsApi.workOrder.treeByParentCode()
					.then(res => {
						console.log(res, '============')
						this.sshyList = res.result
					})
			},
			generateFormData() {
				const form = JSON.parse(JSON.stringify(this.form))
				const cmsUserInfo = getCMSUserInfo()
				form.itemDetailId = this.$route.query.id || ''
				form.createUserId = cmsUserInfo.userId
				form.createUserType = cmsUserInfo.userType

				form.createUserName = form.companyName
				form.idNumber = form.companyContactIdNum
				form.workOrderId = form.id
				if (this.form.sshy.length != 0) {
					form.industryType1 = this.form.sshy[0]
					form.industryType = this.form.sshy[1]
				}
				const areaCascaderSelected = this.$refs.addressId.getCheckedNodes(false)[0]
				if (areaCascaderSelected) {
					form.address = areaCascaderSelected.data.name || ''
				}
				const complainAddressSelected = this.$refs.complainAddressId.getCheckedNodes(false)[0]
				if (complainAddressSelected) {
					form.complainAddress = complainAddressSelected.data.name || ''
				}
				if (this.form.addressDepartmentCode != '') {
					let obj = this.departmentTree.find(item => item.code == this.form.addressDepartmentCode)
					form.addressDepartmentName = obj.label || ''
				}
				if (cmsUserInfo.userType == 1) {
					form.createType = 0
				}
				if (cmsUserInfo.userType == 2) {
					form.createType = 1
				}
				return form
			},
			/* 保存 */
			handleSave() {
				vueDebounce(this.debounceForm, 500);
			},
			debounceForm() {
				const form = this.generateFormData()
				console.log(form, "[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]")
				this.submitting = true
				portalsApi.workOrder.temporaryStorage(form)
					.then(res => {
						this.form.id = res.result
						this.$modal.msgSuccess('保存成功');
					})
					.finally(() => {
						this.submitting = false
					})
			},
			handleSubmit() {
				this
					.validate('form', true)
					.then(() => this.confirm('请您核实填写信息是否准确，点击“确认”将无法修改信息内容，是否确认提交？'))
					.then(() => {
						const form = this.generateFormData()
						console.log(form, '===============')
						this.submitting = true
						return portalsApi.workOrder[this.$route.query.workOrderId ? 'resubmit' : 'addNew'](form)
					})
					.then(res => {
						this.resetFields('form')
						this.dialogVisible = true
					})
					.finally(() => {
						setTimeout(() => {
							this.submitting = false
						}, 100)
					})
			},
			handleGotoHome() {
				this.$confirm('确认返回吗？您所编辑的信息将不会被保存')
					.then(() => {
						this.$route.query.workOrderId ? this.$router.back() : this.$router.push(backPath ||
							'/portals/index')
					})
			},

		}
	};
</script>

<style lang="less" scoped>
	.dialog-tips {
		::v-deep .el-dialog__footer {
			padding: 14px 0px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		::v-deep .el-button {
			height: 40px;
			font-size: 18px;
		}
	}

	::v-deep .footer-btn .el-button--primary {
		background: #1b5284;
	}

	::v-deep .el-form-item__label {
		line-height: 42px;
	}

	.explain {
		border-radius: 2px;
		border: 1px solid #ccc;
		color: #8c8c8c;
		padding: 15px;
		white-space: pre-wrap;
		word-break: break-all;
		background: #f3f5f9;

		.tit {
			color: #333;
			font-weight: 600;
			font-size: 20px;
			white-space: normal;
		}

		p {
			line-height: 1.6;
			white-space: normal;
			font-size: 18px;
			color: #555;
			text-indent: 22px;

			.moban {
				color: #2b65da;
				white-space: normal;
				cursor: pointer;
				border: 1px solid #2b65da;
				border-radius: 2px;
				padding: 0 5px;
				font-weight: 600;
				margin: 0 8px;
			}
		}
	}

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

	.key-value {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;

		&>div {
			line-height: 20px;
			display: flex;

			&>span:first-child {
				font-weight: 600;
				color: #323232;
				flex-shrink: 0;
				width: 105px;
				text-align: right;
				padding-right: 12px;
				box-sizing: border-box;
			}

			&>span:last-child {
				color: #666;
			}
		}
	}
</style>
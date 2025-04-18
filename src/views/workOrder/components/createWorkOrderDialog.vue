<template>
	<div>
		<el-dialog append-to-body title="创建案件" width="65%" top="20px" :visible="visible" @close="handleClose">
			<el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 130px); ">
				<el-form ref="form" :model="form" :rules="rules" label-width="160px" label-suffix="："
					class="white-card">
					<el-row>
						<el-col :span="24">
							<el-form-item label="案件来源" prop="itemSource">
								<el-select v-model="form.itemSource" style="width: 100%;" placeholder="请选择反映事项">
									<el-option v-for="item in itemSourceArr" :key="item.id" :label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="module-head">
						<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
						<span style="font-size: 18px;">投诉对象基本信息</span>
					</div>

					<el-row>
						<el-col :span="12">
							<el-form-item label="联系人" prop="createUsername">
								<el-input v-model="form.createUsername" placeholder="请填写联系人" maxlength="30">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证号" prop="companyContactIdNum">
								<el-input v-model.trim="form.companyContactIdNum"
									oninput="value=value.replace(/[^a-zA-Z0-9]/g, '')" placeholder="请填写身份证号"
									maxlength="18">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="手机号码" prop="mobile">
								<el-input v-model="form.mobile" oninput="value=value.replace(/[^\d.]/g,'')"
									placeholder="请填写手机号码" maxlength="11">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系邮箱" prop="email">
								<el-input v-model="form.email" placeholder="请填写联系邮箱">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="通讯地址" prop="companyAddress">
								<el-input v-model="form.companyAddress" placeholder="请填写通讯地址">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属行业" prop="sshy">
								<el-cascader v-model="form.sshy" style="width: 100%;" :options="sshyList"
									:props="{ expandTrigger: 'hover',value:'name',label:'name',children:'subDictList'}"></el-cascader>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="企业名称" prop="companyName">
								<el-input v-model="form.companyName" placeholder="请填写企业名称">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="统一社会信用代码" prop="socialCreditNumber" label-width="180px">
								<el-input v-model="form.socialCreditNumber" placeholder="请填写统一社会信用代码" maxlength="18"
									show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="是否授权" prop="auth">
								<el-switch v-model="form.auth" active-color="#409eff" inactive-color="#dcdfe6">
								</el-switch>
								<span style="font-size: 14px;">（</span> <span
									style="color: #e44831;font-size: 14px;">注：</span><span
									style="font-size: 14px;">若您代表企业进行投诉，且联系人非法定代表人，请选择是。）</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="form.auth">
						<el-col :span="12">
							<el-form-item label="委托人" prop="mandator">
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
							<el-form-item label="身份证" prop="clientIdCardList">
								<FileUpload @fileDatas="sfzFileList" :fileSizes="20"
									tips="委托人身份证人像面和国徽面，上传的附件大小不能超过20M。" />
								<el-table v-if="form.clientIdCardList.length > 0" :data="form.clientIdCardList"
									size="mini" :show-header="false" style="margin-top: 10px">
									<el-table-column prop="fileName" label="文件名称"></el-table-column>
									<el-table-column label="操作" align="left">
										<template slot-scope="{row, $index}">
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">下载</el-button>
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">预览</el-button>
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="form.auth">
						<el-col :span="24">
							<el-form-item label="授权委托书" prop="attachmentList">
								<FileUpload @fileDatas="sqwtsFileList" :fileSizes="50"
									tips="请按照填报要求提供签字盖章的授权委托书资料，上传的附件大小不能超过50M，附件类型支持图片，视频，文档，压缩包等格式文件。" />
								<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
									:show-header="false"
									style="margin-top: 10px">请按照填报要求提供签字盖章的授权委托书资料，上传的附件大小不能超过50M，附件类型支持图片，视频，文档，压缩包等格式文件。
									<el-table-column prop="fileName" label="文件名称"></el-table-column>
									<el-table-column label="操作" align="left">
										<template slot-scope="{row, $index}">
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">下载</el-button>
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">预览</el-button>
											<el-button type="primary" plain size="mini"
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
							<el-form-item label="事发地" prop="addressId">
								<el-cascader v-model="form.addressId" ref="addressId" style="width: 100%;"
									:options="areas"
									:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
									clearable @change="addressIdChanged"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="投诉对象" prop="addressDepartmentCode">
								<div style="display: flex;align-items: center;">
									<el-cascader v-model="form.complainAddressId" ref="complainAddressId"
										style="flex: 1;" :options="areas"
										:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
										clearable @change="complainAddressIdChanged"></el-cascader>

									<el-select v-model="form.addressDepartmentCode" filterable ref="addressDepartmentCode"
										style="flex: 1;" placeholder="请选择部门">
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
							<el-form-item label="联系人" prop="complaintContactName">
								<el-input v-model="form.complaintContactName" placeholder="请填写联系人" maxlength="30">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="complaintContactMobile">
								<el-input v-model="form.complaintContactMobile"
									oninput="value=value.replace(/[^\d.]/g,'')" maxlength="11" placeholder="请填写联系电话">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<div class="module-head">
						<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
						<span style="font-size: 18px;">反映问题基本信息</span>
					</div>
					<!-- <el-row>
						<el-col :span="24">
							<el-form-item label="案件名称" prop="title">
								<el-input v-model="form.title" show-word-limit maxlength="200"
									:placeholder="`请填写投诉举报标题`"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="反映事项" prop="itemDetailId">
								<el-select v-model="form.itemDetailId" placeholder="请选择反映事项" style="width: 100%;">
									<el-option-group v-for="group in itemDetailIdTree" :key="group.id"
										:label="group.name">
										<el-option v-for="item in group.itemDetailList" :key="item.id"
											:label="item.name" :value="item.id">
										</el-option>
									</el-option-group>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row> -->
					<el-row>
						<el-col :span="24">
							<el-form-item label="主要诉求" prop="mainApply">
								<el-input v-model="form.mainApply" show-word-limit maxlength="200"
									:placeholder="`请填写主要诉求`" type="textarea"
									style="width: 100%; height: 110px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="事实理由" prop="factReason">
								<el-input v-model="form.factReason" show-word-limit maxlength="1000"
									:placeholder="`请填写事实理由`" type="textarea"
									style="width: 100%; height: 110px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="佐证材料" prop="supportAttachmentList">
								<FileUpload @fileDatas="zzclFileList" :fileSizes="100"
									tips="请按照填报要求提供与投诉举报事项相关的资料，上传的附件大小不能超过100M，附件类型支持图片，视频，文档，压缩包等格式文件。" />
								<el-table v-if="form.supportAttachmentList.length > 0"
									:data="form.supportAttachmentList" size="mini" :show-header="false"
									style="margin-top: 10px">
									<el-table-column prop="fileName" label="文件名称"></el-table-column>
									<el-table-column label="操作" align="left">
										<template slot-scope="{row, $index}">
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">下载</el-button>
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">预览</el-button>
											<el-button type="primary" plain size="mini"
												style="font-size: 14px;">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="拖欠账款" prop="isArrear">
								<el-switch v-model="form.isArrear" active-color="#409eff" inactive-color="#dcdfe6">
								</el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="form.isArrear">
						<el-col :span="12">
							<el-form-item label="合同金额" prop="contractAmount">
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
							<el-form-item label="合同协议名称" prop="contractName">
								<el-input v-model="form.contractName" placeholder="请填写合同协议名称" maxlength="100"
									show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="签订时间" prop="signTime">
								<el-date-picker v-model="form.signTime" value-format="yyyy-MM-dd" type="date"
									placeholder="请填写签订时间" style="width: 100%;">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="form.isArrear">
						<el-col :span="24">
							<el-form-item label="主要违约条款" prop="defaultClause">
								<el-input v-model="form.defaultClause" show-word-limit maxlength="1000"
									:placeholder="`请填写合同协议主要违约条款`" type="textarea"
									style="width: 100%; height: 110px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="已反映的渠道" prop="isReflect">
								<el-radio-group v-model="form.isReflect">
									<el-radio label="1">有</el-radio>
									<el-radio label="0">无</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="form.isReflect == '1'?true:false">
						<el-col :span="24">
							<el-form-item label="其它渠道" prop="hasComplain">
								<el-input v-model="form.hasComplain" placeholder="请填写其它渠道" maxlength="50"
									show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div class="dialog-footer-btn">
					<el-button @click="handleClose" plain>关闭</el-button>
					<el-button @click="handleSave" :loading="submitting" type="primary">保存</el-button>
					<el-button @click="handleSubmit" :loading="submitting2" type="primary">确定</el-button>
				</div>
			</el-scrollbar>
		</el-dialog>
		<!-- 预览-->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL"></previewDialog>
	</div>

</template>

<script>
	import FileUpload from "@/views/portals/components/fileUpload"
	import hierarchy from "./hierarchy/index.vue";
	import {
		getCMSUserInfo,
		dict2Array,
		fileSize,
		downloadFile,
		mergeLeft,
		removeEmptyWithTree,
		order,
		vueDebounce,
		checkDate,
		checkProv,
		checkParity,
	} from "@/utils/common";
	import {
		workOrderPublicIntentionDict,
		workOrderEventSourceDict,
		workOrderCreatorTypeDict,
		workOrderComplaintObjectType,
		workOrderComplaintObjectTypeDict,
		workOrderEventSourceDictOrder
	} from "@/utils/dict";
	import {
		extensionName,
		filename,
		txt2HTML
	} from "@/utils/filters";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as fileApi from "@/api/file";
	import * as mattersApi from "@/api/matters";
	import * as validators from "@/utils/validators";
	import * as minix from "@/utils/mixins.js";
	import * as dictApi from '@/api/dict'
	import previewDialog from '@/views/workOrder/components/previewDialog'
	import upload from '@/components/upload'
	import * as administrativeDivisionAPI from '@/api/administrativeDivision'
	import * as portalsApi from '@/api/portals'
	export default {
		name: 'createWorkOrderDialog',
		mixins: [minix.loading, minix.dialog, minix.form],
		components: {
			hierarchy,
			previewDialog,
			upload,
			FileUpload
		},
		filters: {
			extensionName,
			filename
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			isEdit: {
				type: Boolean,
				default: false
			},
			details: {
				type: Object,
				default: Object
			}
		},
		data() {
			return {
				form: {
					id: '',
					createUsername: '',
					companyContactIdNum: '',
					companyContactName: '',
					idNumber: '',
					mobile: '',
					email: '',
					companyAddress: '',
					sshy: [],
					industryType1: '',
					industryType: "",
					companyName: "",
					socialCreditNumber: '',
					auth: false,
					title: "",
					itemDetailId: "",
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
					itemSource: "",
					pushDepartmentCode: "",
					clientIdCardList: [], //身份证附件
					attachmentList: [], //委托书附件
					supportAttachmentList: [], //佐证材料
				},
				departmentTree: [],
				itemDetailIdTree: [],
				areas: [],
				sshyList: [],
				loading: false,
				submitting: false,
				submitting2: false,
				publicIntentionArr: dict2Array(workOrderPublicIntentionDict),
				creatorTypeArr: dict2Array(workOrderCreatorTypeDict, false, Number),
				complaintObjectTypeArr: dict2Array(workOrderComplaintObjectTypeDict),
				itemSourceArr: order(workOrderEventSourceDictOrder, dict2Array(workOrderEventSourceDict, false, Number)),
				rules: {
					itemSource: [{
						required: true,
						message: "请选择案件来源"
					}],
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
					email: [{
						type: "email",
						required: true,
						message: "请填写联系邮箱"
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
				fileList: [],
				uploading: false,
				areas: [],
				city: [],
				itemdetailDetails: {},
				hasError: true,
				departmentTree: [],
				departmentTreeLoading: false,
				previewDialog: {
					fileURL: '',
					visible: false
				}
			};
		},
		watch: {

		},
		created() {
			this.getWorkOrder1()
		},
		methods: {
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
								this.departmentTree = removeEmptyWithTree(r.result,false)
							})
							.finally(() => this.departmentTreeLoading = false)
					})
				}
			},
			addressIdChanged() {
				this.$refs.addressId.dropDownVisible = false
			},
			generateFormData() {
				const form = JSON.parse(JSON.stringify(this.form))
				const cmsUserInfo = getCMSUserInfo()
				form.createUserId = ""
				form.createUserType = ""
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
			handleSave() {
				vueDebounce(this.debounceForm, 500);
			},
			debounceForm() {
				this.validateAndConfirm('form', "确定提交吗？",true)
					.then(() => {
						const form = this.generateFormData()
						console.log(form, "[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]")
						this.submitting = true
						return workOrderApi.distribute.temporaryStorage(form)
					})
					.then(res => {
						this.$modal.msgSuccess('保存成功！')
					})
					.finally(() => {
						this.submitting = false;
					});
			},
			/* 获取保存详情 */
			getWorkOrder1() {
				workOrderApi.distribute.getTemporaryStorage()
					.then(res => {
						const details = res.result
						console.log(res, '[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]')
						if (details != '') {
							this.form.id = details.id || ''
							this.form.itemSource = details.itemSource || ''
							this.form.createUsername = details.createUsername || ''
							this.form.companyContactIdNum = details.companyContactIdNum || ''
							this.form.companyContactName = details.companyContactName || ''
							this.form.idNumber = details.idNumber || ''
							this.form.mobile = details.mobile || ''
							this.form.mobileCode = ''
							this.form.email = details.email || ''
							this.form.emailCode = ''
							this.form.companyAddress = details.companyAddress || ''
							this.form.sshy = [(details.industryType1 ? details.industryType1 : ''), (details
								.industryType ?
								details.industryType : '')]
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
							this.form.title = details.title || ''
							this.form.itemDetailId = details.itemDetailId
							this.form.pushDepartmentCode = ''
							this.form.clientIdCardList = details.clientIdCardList || []
							this.form.attachmentList = details.attachmentList || []
							this.form.supportAttachmentList = details.supportAttachmentList || []
							this.clientIdCardDatas = details.clientIdCardList || []
							this.attachmentDatas = details.attachmentList || []
							this.supportAttachmentDatas = details.supportAttachmentList || []
						}
					});
			},
			deptBackView(id, addressDepartmentCode) {
				portalsApi.workOrder.departByAddress(
						id
					)
					.then(r => {
						this.departmentTree = removeEmptyWithTree(r.result)
						this.$nextTick(() => {
							this.form.addressDepartmentCode = addressDepartmentCode
						})
					})
			},
			handleSubmit() {
				this.validateAndConfirm('form', '请您核实填写信息是否准确，点击“确认”将无法修改信息内容，是否确认提交？')
					.then(() => {
						const form = this.generateFormData()
						this.submitting2 = true
						return workOrderApi.distribute.add(form)
					})
					.then(res => {
						this.$emit('success')
						this.handleClose()
					})
					.finally(() => {
						this.submitting2 = false;
					});
			},
			handleClose() {
				this.$emit("update:visible", false);
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
			show() {
				portalsApi.workOrder.area()
					.then(res => {
						this.areas = [res.result]
					})
				portalsApi.workOrder.treeByParentCode()
					.then(res => {
						this.sshyList = res.result
					})
				mattersApi.itemdetailTree()
					.then(res => {
						this.itemDetailIdTree = res.result.categoryList
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

	.step {
		margin-top: -10px;
		margin-bottom: 20px;
		color: #323232;
		line-height: 20px;
	}

	.row {
		height: 20px;
		overflow: hidden;

		&>div {
			margin-bottom: 10px;

			&:first-child {
				flex: 1;
				display: flex;
				align-items: center;

				&>div {
					flex: 1;
				}
			}
		}

		.row {
			margin-left: 26px;

			span {
				line-height: 20px;
			}
		}

		&>.row>.row {
			display: flex;
			//& > div {
			//
			//}
		}
	}
</style>
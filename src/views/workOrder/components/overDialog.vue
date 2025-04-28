<template>
	<div>
		<el-dialog append-to-body v-dialogDrags title="案件提交终止" width="780px" top="20px" :visible="visible" @close="handleClose">
			<!-- <div class="tips color-danger">确认提交、审批通过后案件将进入终止状态，请谨慎使用该功能。</div> -->
			<el-form :model="form" :rules="rules" ref="form" class="white-card" label-width="140px">
				<el-form-item label="终止类型:" prop="reason">
					<el-select v-model="form.reason" placeholder="请选择" style="width: 100%">
						<el-option v-for="item in optionList" :key="item.id" :label="item.name"
							:value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="终止理由:" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入详细描述"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<template v-if="form.reason === isShowDeptPart && isDebt == true">
					<el-form-item label="确认欠款:" prop="confirmUnPayAmount">
						<el-input v-model="form.confirmUnPayAmount" @blur="confirmUnPayBlur"
							onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" style="width: 180px;"
							placeholder="请输入金额"></el-input>
						万元
					</el-form-item>
					<el-form-item label="已清欠款:" prop="payedAmount">
						<el-input v-model="form.payedAmount" @blur="payedAmountBlur"
							onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" style="width: 180px;"
							placeholder="请输入金额"></el-input>
						万元
					</el-form-item>
					<el-form-item label="已还全部欠款:" prop="payAllAmount">
						<el-radio-group v-model="form.payAllAmount" :disabled="isClearAmount">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>

					<template v-if="form.payAllAmount === 0">
						<el-form-item label="剩余欠款:" prop="unPayAmount">
							<el-input v-model="form.unPayAmount" readonly style="width: 180px;"></el-input>
							万元
						</el-form-item>
						<el-form-item style="margin-left: 9px;" label="" prop="makePayPlan">
							<el-checkbox v-model="form.makePayPlan" label="制定计划" :true-label="1" :false-label="0"
								@change="isMakePayPlan"></el-checkbox>
							<span style="margin-left: 40px;">计划还款：{{form.makePayPlanAmount}}万元</span>
							<span style="margin-left: 40px;">其它还款：{{form.otherAmount}}万元</span>
						</el-form-item>
						<template v-if="form.makePayPlan === 1">
							<el-form-item label="还款计划:" prop="payPlanList">
								<el-table v-if="form.payPlanList.length" :data="form.payPlanList" size="mini" border
									class="repayment-plan-table" style="width: 100%">
									<el-table-column type="index" label="序号" width="60"
										align="center"></el-table-column>
									<el-table-column prop="name" label="计划支付日期" align="center">
										<template slot-scope="{row, $index}">
											<el-date-picker v-model="row.planPayTime" value-format="yyyy-MM-dd"
												type="date" placeholder="日期" style="width: 100%;">
											</el-date-picker>
										</template>
									</el-table-column>
									<el-table-column label="支付金额(万元)" align="center">
										<template slot-scope="{row, $index}">
											<el-input-number v-model="row.amount"
												onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
												placeholder="金额" :min="0" :controls="false"
												style="width: 100%;"></el-input-number>
										</template>
									</el-table-column>
									<el-table-column width="100" label="操作" align="center">
										<template slot-scope="{row, $index}">
											<el-button @click="onDelete($index)" type="primary" plain
												size="mini">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<el-button @click="onAddRepaymentPlan" type="primary" plain size="mini"
									style="width: 100%;">新增一行
								</el-button>
							</el-form-item>
						</template>

					</template>
					<el-form-item label="支付备注:" prop="payNote">
						<el-input v-model="form.payNote" show-word-limit maxlength="300" placeholder="请输入支付备注"
							type="textarea" style="width: 100%; height: 150px"></el-input>
					</el-form-item>
				</template>

				<el-form-item label="结案反馈:" prop="satisfactionLevel">
					<el-radio-group v-model="form.satisfactionLevel">
						<el-radio label="satisfaction">满意</el-radio>
						<el-radio label="common">基本满意</el-radio>
						<el-radio label="noSatisfaction">不满意</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="终止审批单:" prop="completedFile">
					<FileUpload @fileDatas="zzspdFileList" :fileSizes="100" :limit="1" :isShowTip="true"
						tips="*支持图片、文档，文件不大于 100M。" />
					<el-table v-if="form.completedFile.length > 0" :data="form.completedFile" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
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

				<el-form-item label="终止意见书:" prop="reportFile">
					<FileUpload @fileDatas="jayjFileList" :fileSizes="100" :limit="1" :isShowTip="true"
						tips="*需要盖章后上传，仅办理端可见，支持图片、文档，文件不大于 100M。" />
					<el-table v-if="form.reportFile.length > 0" :data="form.reportFile" size="mini" :show-header="false"
						style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
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
				<el-form-item label="终止通知书:" prop="reportNoticeFile">
					<FileUpload @fileDatas="jatzsFileList" :fileSizes="100" :limit="1" :isShowTip="true"
						tips="*支持图片、文档，文件不大于 100M。" />
					<el-table v-if="form.reportNoticeFile.length > 0" :data="form.reportNoticeFile" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
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

				<el-form-item label="附件:" prop="attachmentFile">
					<FileUpload @fileDatas="fjFileList" :fileSizes="100" :isShowTip="true"
						tips="*支持图片、文档，文件不大于 100M。" />
					<el-table v-if="form.attachmentFile.length > 0" :data="form.attachmentFile" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handleDownload(row)" type="primary" plain size="mini"
									style="font-size: 14px;">下载</el-button>
								<el-button @click="handlePreview(row)" type="primary" plain size="mini"
									style="font-size: 14px;">预览</el-button>
								<el-button @click="handleRemoveFile($index,4)" type="primary" plain size="mini"
									style="font-size: 14px;">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>

			<div class="split"></div>

			<div class="dialog-footer-btn">
				<el-button @click="handleClose" plain>关闭</el-button>
				<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 预览 -->
		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px">
		</previewDialog>

	</div>

</template>

<script>
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'
	import {
		extensionName,
		filename
	} from "@/utils/filters";
	import {
		stop
	} from "@/api/workOrder/process";
	import {
		addtime
	} from "@/api/workOrder/distribute";
	import {
		multiply,
		add,
		subtract,
		divide
	} from "accurate-core";

	export default {
		name: "overDialog",
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		filters: {
			extensionName,
			filename
		},
		props: ["visible", "workOrderNo", 'type', 'workOrderId', 'isDebt'],
		data() {
			return {
				submitting: false,
				isClearAmount: false,
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				isShowDeptPart: "",
				form: {
					payNote: "",
					reason: "",
					comment: "",
					confirmUnPayAmount: '',
					payAllAmount: 1,
					payedAmount: '',
					makePayPlan: 0,
					payPlanList: [],
					unPayAmount: '',
					satisfactionLevel: "satisfaction",
					makePayPlanAmount: 0,
					otherAmount: 0,
					attachmentFile: [],
					reportFile: [],
					reportNoticeFile: [],
					completedFile: [],
				},
				rules: {
					reason: [{
						required: true,
						message: "请选择终止类型"
					}],
					unPayAmount: [{
						required: true,
						message: "请输入剩余欠款"
					}],
					comment: [{
						required: true,
						message: "请填写终止理由"
					}],
					satisfactionLevel: [{
						required: true,
						message: "请选择结案反馈"
					}],
					reportFile: [{
						required: true,
						message: "请选择终止意见书"
					}],
					confirmUnPayAmount: [{
						required: true,
						message: "请填写确认欠款",
						trigger: "blur"
					}],
					payedAmount: [{
						required: true,
						message: "请填写已清欠款",
						trigger: "blur"
					}],
					reportNoticeFile: [{
						required: true,
						message: "请选择终止通知书"
					}],
					completedFile: [{
						required: true,
						message: "请选择终止审批单"
					}],
					payPlanList: [{
						required: true,
						message: "请输入还款计划"
					}, {
						validator: (rule, value, callback) => {
							const errorNumbers = []
							value.forEach((item, i) => {
								if (!(item.planPayTime && item.amount)) {
									errorNumbers.push(i + 1)
								}
							})
							if (errorNumbers.length) {
								callback(new Error(`请设置序号 ${errorNumbers.join(',')} 的还款日期和还款金额`))
								return
							}
							callback()
						},
						trigger: 'blur'
					}],
				},
				attachmentFileUploading: false,
				optionList: []
			};
		},
		watch: {
			"form.payPlanList": {
				handler(val) {
					/* 总还款金额价*/
					let gentle = 0;
					for (let i = 0; i < val.length; i++) {
						gentle = add(gentle, Number(val[i].amount))
					}
					this.form.makePayPlanAmount = gentle
					if (this.form.unPayAmount > 0) {
						if (this.form.makePayPlanAmount > this.form.unPayAmount) {
							this.$modal.msgError('计划还款金额已超出未还款金额')
						}
						console.log('============================')
						this.form.otherAmount = subtract(this.form.unPayAmount, gentle).toFixed(2)
					}

				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			confirmUnPayBlur() {
				let val = this.form.confirmUnPayAmount
				if (val != 0 && val != '') {
					if (Number(val) < Number(this.form.payedAmount)) {
						this.$modal.msgError('确认欠款金额不能小于已清欠款')
						this.form.confirmUnPayAmount = ''
					} else {
						if (this.form.payedAmount === val) {
							this.form.payAllAmount = 1
							this.isClearAmount = true
							this.form.unPayAmount = 0
							this.form.otherAmount = 0
						} else {
							if (this.form.payedAmount != '') {
								this.form.payAllAmount = 0
								this.isClearAmount = true
								this.form.unPayAmount = subtract(val, this.form.payedAmount).toFixed(2)
								this.form.otherAmount = subtract(this.form.unPayAmount, this.form.makePayPlanAmount)
									.toFixed(2)
							}
						}
					}
				}
			},
			payedAmountBlur() {
				let val = this.form.payedAmount
				if (val != 0 && val != '') {
					if (this.form.confirmUnPayAmount != '') {
						if (Number(val) > Number(this.form.confirmUnPayAmount)) {
							this.$modal.msgError('已清欠款不能大于确认欠款金额')
							this.form.payedAmount = ''
							return
						} else {
							if (this.form.confirmUnPayAmount === val) {
								this.form.payAllAmount = 1
								this.isClearAmount = true
								this.form.unPayAmount = 0
								this.form.otherAmount = 0
							} else {
								if (this.form.confirmUnPayAmount != '') {
									this.form.payAllAmount = 0
									this.isClearAmount = true
									this.form.unPayAmount = subtract(this.form.confirmUnPayAmount, val).toFixed(2)
									this.form.otherAmount = subtract(this.form.unPayAmount, this.form.makePayPlanAmount)
										.toFixed(2)
								}
							}
						}
					}

				}
			},
			isMakePayPlan(e) {
				if (e == 1) {
					this.form.payPlanList = [{
						planPayTime: '',
						amount: ''
					}]
				} else {
					this.form.payPlanList = []
				}
				this.form.makePayPlanAmount = 0
				this.form.otherAmount = 0
			},
			onAddRepaymentPlan() {
				this.form.payPlanList.push({
					planPayTime: '',
					amount: ''
				});
			},
			onDelete(index) {
				if (this.form.payPlanList.length === 1) {
					return this.$modal.msgError('至少保留一条还款计划')
				}
				this.form.payPlanList.splice(index, 1)
				this.$nextTick(() => {
					this.validateField('form', 'payPlanList')
				})
			},
			show() {
				dictApi.list({
						parentCode: "1006"
					})
					.then(res => {
						this.optionList = res.result;
						this.isShowDeptPart = res.result[0].name
					});

				templateApi.detail(1021)
					.then(res => {
						this.form.comment = res.result.value;
					});
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定要终止该案件么？")
					.then(() => {
						this.submitting = true;
						let params = {
							payNote: this.form.payNote,
							reason: this.form.reason,
							comment: this.form.comment,
							attachmentFile: this.form.attachmentFile,
							reportFile: this.form.reportFile[0],
							reportNoticeFile: this.form.reportNoticeFile[0],
							completedFile: this.form.completedFile[0],
							confirmUnPayAmount: this.form.confirmUnPayAmount,
							otherAmount: this.form.otherAmount,
							payAllAmount: this.form.payAllAmount,
							payedAmount: this.form.payedAmount,
							makePayPlan: this.form.makePayPlan,
							satisfactionLevel: this.form.satisfactionLevel,
							payPlanList: this.form.payPlanList
								.map(item => {
									item.workOrderId = this.workOrderId;
									return item;
								}),
							unPayAmount: this.form.unPayAmount,
							makePayPlanAmount: this.form.makePayPlanAmount,
						}
						return workOrderApi.process.submitOver({
							...params,
							workOrderNo: this.workOrderNo
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
					})
					.finally(() => this.submitting = false);
			},
			/* 结案意见书 */
			jayjFileList(res) {
				this.form.reportFile = res
			},
			/* 结案通知书 */
			jatzsFileList(res) {
				this.form.reportNoticeFile = res
			},
			/* 终止审批单 */
			zzspdFileList(res) {
				this.form.completedFile = res
			},
			/* 附件 */
			fjFileList(res) {
				this.form.attachmentFile = res
			},
			/* 附件删除 */
			handleRemoveFile(index, type) {
				if (type == 1) {
					this.form.reportFile.splice(index, 1)
				}
				if (type == 2) {
					this.form.reportNoticeFile.splice(index, 1)
				}
				if (type == 3) {
					this.form.attachmentFile.splice(index, 1)
				}
				if (type == 4) {
					this.form.completedFile.splice(index, 1)
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
		}
	};
</script>

<style lang="less" scoped>
	.tips {
		text-align: center;
		margin-bottom: 20px;
	}

	::v-deep .el-table__cell .el-input__inner {
		border: none;
		width: 100%;
	}

	::v-deep .el-radio-button__inner,
	.el-radio-group {
		height: 42px;
		line-height: 42px;
		display: flex;
		align-items: center;
	}
</style>
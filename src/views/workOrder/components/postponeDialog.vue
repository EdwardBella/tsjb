<template>
	<div>
		<el-dialog append-to-body title="案件延期" width="680px" top="20px" :visible="visible" @close="handleClose">
			<el-form :model="form" :rules="rules" ref="form" class="white-card" label-width="140px">
				<el-form-item label="延期次数:">
					<span style="font-size: 16px;line-height: 42px;">第{{(addTimeNum+1)}}次延期</span>
				</el-form-item>
				<el-form-item label="延期天数:" :prop="addTimeNum < 2?'days':''">
					<el-input type="number" v-model.number="form.days"
						:placeholder="addTimeNum < 2?'最多延期30个自然日':'请输入延期天数'"></el-input>
				</el-form-item>
				<el-form-item label="延期情形:" prop="reason">
					<el-select v-model="form.reason" placeholder="请选择" style="width: 100%">
						<el-option v-for="item in optionList" :key="item.id" :label="item.name"
							:value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="延期理由:" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入详细描述"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<el-form-item label="附件:" prop="attachmentList">
					<FileUpload @fileDatas="fjFileList" :fileSizes="100" :isShowTip="true"
						tips="*支持图片、文档、压缩包格式文件，文件不大于 100M。" />
					<el-table v-if="form.attachmentList.length > 0" :data="form.attachmentList" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handlePreview(row)" type="primary" plain size="mini"
									style="font-size: 14px;">预览</el-button>
								<el-button @click="handleRemoveFile($index,3)" type="primary" plain size="mini"
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

	export default {
		name: "postponeDialog",
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog],
		props: ["visible", "workOrderNo", "addTimeNum"],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				submitting: false,
				form: {
					reason: "",
					days: "",
					comment: "",
					attachmentList: [],
				},
				rules: {
					reason: [{
						required: true,
						message: "请选择延期情形"
					}],
					days: [{
							required: true,
							message: "请输入延期天数"
						},
						{
							validator: (rule, value, callback) => {
								if (!(/^[0-9]*$/.test(value))) {
									callback(new Error("请输入正整数"));
									return
								}

								if (value < 1) {
									callback(new Error("请输入大于0的整数"));
									return true;
								}
								console.log(this.addTimeNum)
								if (value > 30 && this.addTimeNum < 2) {
									callback(new Error("最多延期30个自然日，请重新确认"));
									return true;
								}
								callback();

							}
						}
					],
					comment: [{
						required: true,
						message: "请填写延期理由"
					}],
					attachmentList: [{
						required: true,
						message: "请选择延期审批单"
					}],
				},
				optionList: []
			};
		},
		methods: {
			show() {
				dictApi.list({
						parentCode: "1004"
					})
					.then(res => {
						this.optionList = res.result;
					});

				templateApi.detail(1008)
					.then(res => {
						this.form.comment = res.result.value;
					});
			},
			handleSubmit() {
				if (this.form.days > 30 && this.addTimeNum < 2) return this.$modal.msgError("最多延期30个自然日，请重新确认");

				this.validateAndConfirm("form", "确定要延期该案件么？")
					.then(() => {
						this.submitting = true;
						return workOrderApi.distribute.addtimeProcess({
							...this.form,
							workOrderNo: this.workOrderNo
						});
					})
					.then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => this.submitting = false);
			},
			/* 附件 */
			fjFileList(res) {
				this.form.attachmentList = res
			},
			/* 附件删除 */
			handleRemoveFile(index, type) {
				this.form.attachmentList.splice(index, 1)
			},
			/* 附件预览 */
			handlePreview(row) {
				this.previewDialog = {
					visible: true,
					fileURL: row.fileUrl
				}
			},
		}
	};
</script>

<style lang="less" scoped>
	.tips {
		text-align: center;
		margin-bottom: 20px;
	}
</style>
<!--案件受理 受理交办弹窗-->

<template>
	<div>
		<el-dialog append-to-body v-dialogDrags title="案件受理" width="750px" :visible="visible" @close="handleClose">
			<el-form ref="form" :model="form" :rules="rules" label-width="140px" class="white-card">
				<el-form-item label="案件名称:" prop="title">
					<el-input v-model="form.title" placeholder="请输入" style="width: 100%" show-word-limit maxlength="40">
					</el-input>
				</el-form-item>
				<el-form-item label="反映事项:" prop="itemCode">
					<el-select v-model="form.itemCode" placeholder="请选择" clearable style="width: 100%">
						<el-option-group v-for="group in itemdetailTree" :key="group.label" :label="group.label">
							<el-option v-for="item in group.options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-option-group>
						
					</el-select>
				</el-form-item>
				<el-form-item label="系统领域:" prop="systemDomain">
					<el-select v-model="form.systemDomain" placeholder="请选择" clearable filterable style="width: 100%;">
						<el-option v-for="item in systemArear" :key="item.id" :label="item.name"
							:value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门归口:" prop="belongType">
					<el-select v-model="form.belongType" placeholder="请选择" clearable filterable style="width: 100%;">
						<el-option v-for="item in belongTypeArr" :key="item.code" :label="item.name"
							:value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="受理备注:" prop="comment">
					<el-input v-model="form.comment" show-word-limit maxlength="100" placeholder="请输入详细描述"
						type="textarea" style="width: 100%; height: 150px"></el-input>
				</el-form-item>
				<el-form-item label="受理告知书:" prop="receiveAttachments">
					<FileUpload @fileDatas="fjFileList" :fileSizes="100" :isShowTip="true" :limit="1"
						tips="*支持图片、文档，文件大小不大于 100M。" />
					<el-table v-if="form.receiveAttachments.length > 0" :data="form.receiveAttachments" size="mini"
						:show-header="false" style="margin-top: 10px;">
						<el-table-column prop="fileName" label="文件名称"></el-table-column>
						<el-table-column label="操作" width="240px" align="center">
							<template slot-scope="{row, $index}">
								<el-button @click="handleDownload(row)" type="primary" plain size="mini"
									style="font-size: 14px;">下载</el-button>
								<el-button @click="handlePreview(row)" type="primary" plain size="mini"
									style="font-size: 14px;">预览</el-button>
								<el-button @click="handleRemoveFile($index)" type="primary" plain size="mini"
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

		<previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible"
			:filePath="previewDialog.fileURL" width="900px">
		</previewDialog>
	</div>

</template>

<script>
	import * as mixins from "@/utils/mixins";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as templateApi from "@/api/template";
	import * as dictApi from "@/api/dict";
	import * as fileApi from "@/api/file";
	import * as statisticsApi from "@/api/statistics";
	import FileUpload from "@/views/portals/components/fileUpload"
	import previewDialog from "@/views/workOrder/components/previewDialog";
	import {
		department2Tree,
		findTreeItem,
		forEachTree,
		itemdetail2GroupOptions,
		removeEmptyChildren
	} from "@/utils/common";
	import * as mattersApi from "@/api/matters";
	import {
		mapState
	} from "vuex";

	export default {
		name: "acceptAndTransferDialog",
		components: {
			FileUpload,
			previewDialog
		},
		mixins: [mixins.dialog, mixins.form],
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			workOrderNo: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				uploading: false,
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				form: {
					title: '',
					itemCode: "",
					itemName: "",
					receiveAttachments: [],
					comment: "",
					systemDomain: "",
					belongType: "",
					workOrderNo: ''
				},
				rules: {
					title: [{
						required: true,
						message: "请填写案件名称"
					}],
					itemCode: [{
						required: true,
						message: "请选择案件类型"
					}],
					belongType: [{
						required: true,
						message: "请选择部门归口"
					}],
					systemDomain: [{
						required: true,
						message: "请选择系统领域"
					}],
					comment: [{
						required: true,
						message: "请填写受理备注"
					}],
					receiveAttachments: [{
						required: true,
						message: "请选择受理告知书"
					}]
				},
				submitting: false,
				belongTypeArr: [],
				systemArear: [],
				itemdetailTree: [],
				departmentTree: []
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		watch: {
			title: {
				handler(val) {
					this.form.title = val || ''
				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			fjFileList(res) {
				this.form.receiveAttachments = res
			},
			show() {
				mattersApi.itemdetailTree().then(res => {
					this.itemdetailTree = itemdetail2GroupOptions(res.result);
				});
				templateApi.detail(1001)
					.then(res => {
						this.form.comment = res.result.value;
					});
				dictApi.belongType()
					.then(res => {
						this.belongTypeArr = res.result
					});
				dictApi.list({
						parentCode: '1011'
					})
					.then(res => {
						this.systemArear = res.result
					})

				workOrderApi.all.departmentTree().then(res => {
					this.departmentTree = forEachTree(department2Tree(res.result, false), (a) => {
						if (a.code === this.userInfo.orgCode) {
							a.disabled = true
						}
					});
				});
			},
			handleSubmit() {
				this.validateAndConfirm("form", '确认提交吗？')
					.then(res => {
						this.submitting = true;
						const form = {
							...this.form
						};
						form.workOrderNo = this.workOrderNo;
						form.itemName = findTreeItem(this.itemdetailTree, (item) => item.value === this.form
							.itemCode, {
								childrenKey: 'options'
							}).label;
						return workOrderApi.distribute.receive(form);
					})
					.then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => {
						this.submitting = false;
					});
			},
			/* 附件删除 */
			handleRemoveFile(index) {
				this.form.receiveAttachments.splice(index, 1)
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

<style scoped>

</style>
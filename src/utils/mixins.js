import {
	fileSize
} from "@/utils/common";
import * as fileApi from "@/api/file";
import {
	extensionName
} from "@/utils/filters";

export const loading = {
	methods: {
		decorateLoading(func, key = "loading") {
			this[key] = true;
			return func().finally(() => {
				this[key] = false;
			});
		},
		confirm(message) {
			return this.$confirm(message, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			});
		},
	},
};

export const affirm = {
	methods: {
		confirm(message = "确认提交吗？") {
			return this.$confirm(message, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			});
		},
	},
};

export const form = {
	data() {
		return {
			valid: false,
		};
	},
	methods: {
		validate(ref, autoScroll = false) {
			return new Promise((resolve, reject) => {
				this.$refs[ref].validate((valid) => {
					// this.isValid = valid
					if (valid) {
						resolve(valid);
					} else {
						this.$nextTick(() => {
							let isError = document.getElementsByClassName('is-error')
							let messageStr = isError[0].getElementsByClassName(
								'el-form-item__error')[0].innerText || '请完善必填信息'
							this.$modal.msgError(messageStr)
							if (autoScroll) {
								isError[0].scrollIntoView({
									// 滚动到指定节点
									// 值有start,center,end，nearest，当前显示在视图区域中间
									block: 'start',
									// 值有auto、instant,smooth，缓动动画（当前是慢速的）
									behavior: 'smooth',
								})
							}

						})

						reject(valid);
					}
				});
			});
		},
		validateField(ref, field) {
			return new Promise((resolve, reject) => {
				this.$refs[ref].validateField(field, (errorMessage) => {
					errorMessage ? reject(errorMessage) : resolve();
				});
			});
		},
		resetFields(ref) {
			this.$refs[ref] && this.$refs[ref].resetFields();
		},
		clearValidate(ref) {
			this.$refs[ref] && this.$refs[ref].clearValidate();
		},
		// 验证表单并且确认是否提交
		validateAndConfirm(ref, message = "确认提交吗？") {
			return this.validate(ref).then(() =>
				this.$confirm(message, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
			);
		},
	},
};

export const dialog = {
	props: {
		visible: {
			type: Boolean,
			default: false
		},
	},
	watch: {
		visible: {
			handler(val) {
				if (val) {
					this.show();
				} else {
					this.hide();
				}
			},
			immediate: true,
		},
	},
	methods: {
		show() {
			// TODO
		},
		hide() {
			// 如果混入了 form 隐藏弹窗时清空表单
			this.resetFields && this.resetFields("form");
		},
		handleClose() {
			this.$emit("update:visible", false);
		},
	},
};

export const tablePage = {
	data() {
		return {
			currentRowIndex: -1,
			currentRow: {},
		};
	},
	methods: {
		handleShowDialog(dialog, row, index) {
			this[dialog].visible = true;
			this.currentRow = {
				...row
			};
			this.currentRowIndex = index;
		},
	},
};

export const upload = {
	methods: {
		bindFileChangeEvent(ref, limit) {
			this.$refs[ref + "Input"].addEventListener("change", (e) => this.upload(ref, e, limit), false);
		},
		handleUploadFile(ref) {
			this.$refs[ref + "Input"].click();
		},
		clearFileInput(ref) {
			this.$refs[ref + "Input"].value = "";
		},
		upload(ref, e, limit) {
			const file = e.target.files[0];
			if (fileSize(file) > 100) {
				this.clearFileInput(ref);
				return this.$modal.msgError("请上传100M以内的文件");
			}

			const formData = new FormData();
			formData.append("file", file);
			this[ref + "Uploading"] = true;
			fileApi
				.upload(formData)
				.then((res) => {
					this.$modal.msgSuccess("上传成功");
					if (limit === 1 && this.form[ref].length === 1) {
						this.form[ref] = [];
					}
					this.form[ref].push({
						fileName: file.name,
						type: extensionName(file.name),
						fileUrl: res.data,
					});
				})
				.finally(() => {
					this.clearFileInput(ref);
					this[ref + "Uploading"] = false;
				});
		},
		handleDownload(row) {
			fileApi.download({
				downloadFileName: row.fileName,
				filePath: row.fileUrl,
			});
		},
		handleDelete(ref, index) {
			this.form[ref].splice(index, 1);
		},
	},
};
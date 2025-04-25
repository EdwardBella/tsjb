<template>
	<div style="display: flex; align-items: center;">
		<input @change="handleFileChange" ref="fileInput" id="fileInput" class="vision-hide" type="file"
			accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf">
		<el-button :loading="uploading" @click="handleUploadFile" type="primary" plain
			style="font-size: 16px;cursor: pointer; height: 40px;text-align: center; line-height: 40px;border-radius: 4px;box-shadow: 0 2px 4px 0 rgba(9,78,197,.3); border: 1px solid #1b5284; font-weight: 600;">上传附件</el-button>
		<p v-if="isShowTip" style="font-size: 14px;line-height: 20px;margin-left: 8px;"><span
				style="color: #e44831;">温馨提示：</span>{{tips}}
		</p>
	</div>
</template>

<script>
	import * as fileApi from '@/api/file'
	import {
		fileSize
	} from '@/utils/common'
	export default {
		props: {
			value: [String, Object, Array],
			// 图片数量限制
			limit: {
				type: Number,
				default: 5,
			},
			datas: {
				type: Array,
				default: () => [],
			},
			// 大小限制(MB)
			fileSizes: {
				type: Number,
				default: 5,
			},
			// 文件类型, 例如['png', 'jpg', 'jpeg']
			fileType: {
				type: Array,
				default: () => ["png", "jpg", "jpeg"],
			},
			// 是否显示提示
			isShowTip: {
				type: Boolean,
				default: true
			},
			tips: {
				type: String,
				default: '',
			},
		},
		watch: {
			datas: {
				handler(val) {
					this.fileList = val
				},
				deep: true,
				immediate: true
			}
		},
		data() {
			return {
				uploading: false,
				fileList: []
			};
		},
		methods: {
			handleUploadFile() {
				this.$refs.fileInput.click()
			},
			handleFileChange(e) {
				console.log(this.fileList, '0000000000000000000000')
				if ((this.fileList.length + 1) > this.limit) {
					this.clearFileInput()
					return this.$modal.msgError('限制最多上传' + this.limit + '个文件')
				}
				const file = e.target.files[0]
				if (fileSize(file) > this.fileSizes) {
					this.clearFileInput()
					return this.$modal.msgError('请上传' + this.fileSizes + 'M以内的文件')
				}
				const formData = new FormData()
				formData.append('file', file)
				this.uploading = true
				fileApi.upload(formData).then(res => {
						this.$modal.msgSuccess('上传成功!')
						let fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
						this.fileList.push({
							fileName: file.name,
							fileUrl: res.data,
							fileType: fileExtension
						})
						this.$emit('fileDatas', this.fileList)
					})
					.finally(() => {
						this.clearFileInput();
						this.uploading = false;
						// this.$nextTick(postPortalsHeight)
					})
			},
			clearFileInput() {
				document.getElementById("fileInput").value = "";
			},
		}
	};
</script>
<style scoped lang="less">
	// .el-upload--picture-card 控制加号部分
	::v-deep.hide .el-upload--picture-card {
		display: none;
	}

	// 去掉动画效果
	::v-deep .el-list-enter-active,
	::v-deep .el-list-leave-active {
		transition: all 0s;
	}

	::v-deep .el-list-enter,
	.el-list-leave-active {
		opacity: 0;
		transform: translateY(0);
	}
</style>
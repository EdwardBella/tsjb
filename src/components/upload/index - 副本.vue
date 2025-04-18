<template>
	<div v-if="showType === 'default'" class="upload" @click="handleOpenUpload">
		<slot :uploading="uploading"></slot>
		<input ref="fileInputEle" id="fileInput" class="vision-hide" type="file"
			accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z">
	</div>
	<el-upload v-else
		accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z"
		:limit="1" :on-change="handleChange" :auto-upload="false" :on-exceed="handleExceed" :file-list="fileList">
		<el-button size="small" plain style="font-size: 16px;font-weight: 600;">上传附件</el-button>
		<span style="font-size: 14px;line-height: 20px;">温馨提示：* 支持图片、文档、压缩包格式文件，文件大小不大于 100M</span>
	</el-upload>

</template>

<script>
	import {
		fileSize
	} from '@/utils/common'
	import * as fileApi from '@/api/file'

	export default {
		name: 'index',
		props: {
			params: {
				type: Object,
				default: Object
			},
			showType: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				fileList: [],
				uploading: false
			}
		},
		mounted() {
			this.fileInputEle = this.$refs.fileInputEle
			this.fileInputEle.addEventListener('change', this.handleChange, false)
		},
		beforeDestroy() {
			this.fileInputEle.removeEventListener('change', this.handleChange)
		},
		methods: {
			handleExceed(files, fileList) {
				this.$modal.msgWarning(`只能上传1个文件`);
			},
			handleOpenUpload() {
				const fileInputEle = this.$refs.fileInputEle
				if (this.uploading === false && fileInputEle) {
					fileInputEle.click()
				}
			},
			handleChange(e) {
				const file = e.raw ? e.raw : e.target.files[0]
				if (fileSize(file) > 100) {
					this.clearFileInput()
					return this.$modal.msgError('请上传100M以内的文件')
				}

				const formData = new FormData()

				formData.append('file', file)
				this.uploading = true
				this.$emit('beforeUpload')
				fileApi.upload(formData, this.params).then(res => {
						// this.$modal.msgSuccess('上传成功')

						// this.fileList.push()
						this.$emit('success', {
							fileName: file.name,
							fileUrl: res.data
						})
					})
					.finally(() => {
						this.clearFileInput()
						this.uploading = false
					})
			},
			onUpload(e) {
				console.log(e, '...........')
				// fileApi.upload(formData, this.params).then(res => {
				//   // this.$modal.msgSuccess('上传成功')
				//
				//   // this.fileList.push()
				//   this.$emit('success', {
				//     fileName: file.name,
				//     fileUrl: res.data
				//   })
				// })
				//   .finally(() => {
				//     this.clearFileInput()
				//     this.uploading = false
				//
				//   })
			},
			clearFileInput() {
				this.fileInputEle.value = ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.upload {
		display: inline-block;
	}

	::v-deep .el-button.el-button--primary.is-plain {
		border-color: #1b5284;
		color: #1b5284;
		font-weight: 600;
		font-size: 16px;
	}
</style>
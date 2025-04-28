<template>
	<div v-if="showType === 'default'" class="upload" @click="handleOpenUpload">
		<slot :uploading="uploading"></slot>
		<input ref="fileInputEle" id="fileInput" class="vision-hide" type="file"
			accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z">
	</div>
	<el-upload v-else style="position: relative;" action=''
		accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z"
		:limit="1" :on-change="handleChange" :auto-upload="false" :on-remove="clearFileInput" :on-exceed="handleExceed" :file-list="fileList">
		<el-button size="small" plain style="font-size: 16px;font-weight: 600;">上传附件</el-button>
		<div v-if="isShowTip" slot="tip" class="el-upload__tip">
			<p>
				<span style="color: #e44831;font-weight: bold;">温馨提示：</span>{{tips}}

			</p>
		</div>
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
			},
			isShowTip: {
				type: Boolean,
				default: false
			},
			tips: {
				type: String,
				default: '* 支持图片、文档，文件大小不大于 100M。'
			},
		},
		data() {
			return {
				fileList: [],
				uploading: false
			}
		},
		mounted() {
			// this.fileInputEle = this.$refs.fileInputEle
			// this.fileInputEle.addEventListener('change', this.handleChange, false)
		},
		beforeDestroy() {
			// this.fileInputEle.removeEventListener('change', this.handleChange)
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

						let fileExtension = "";
						if (file.name.lastIndexOf(".") > -1) {
							fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
						}

						this.$emit('success', {
							fileName: file.name,
							fileUrl: res.data,
							type: fileExtension
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
			clearFileInput(file,fileList) {
				this.$emit('success', JSON.parse(JSON.stringify(fileList)))
			}
		}
	}
</script>

<style lang="less" scoped>
	// .upload {
	// 	display: inline-block;
	// }

	::v-deep .el-button.el-button--primary.is-plain {
		border-color: #1b5284;
		color: #1b5284;
		font-weight: 600;
		font-size: 16px;
	}

	.el-upload__tip {
		position: absolute;
		top: 0px;
		margin-top: 0px;
		left: 110px;
		font-size: 14px;
		line-height: 18px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		height: 36px;
	}
</style>
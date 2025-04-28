<template>
	<el-dialog append-to-body v-dialogDrags title="预览" top="20px" :width="width" :visible="visible" @close="handleClose">
		<div v-loading="loading">
			<iframe :src="previewURL" width="100%" style="height:calc(100vh - 134px);" allowfullscreen></iframe>
		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from '@/utils/mixins'
	import {
		Base64
	} from 'js-base64'
	import * as fileAPI from '@/api/file'
	import {
		tif2png
	} from '@/api/file'

	export default {
		name: 'previewDialog',
		props: {
			filePath: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '1200px'
			}
		},
		data() {
			return {
				loading: false,
				fileType: '',
				previewURL: ''
			}
		},
		mixins: [mixins.dialog, mixins.upload],
		methods: {
			async show() {
				const fileURLSplit = this.filePath.split('.')
				this.fileType = fileURLSplit[fileURLSplit.length - 1]
				// 相对
				const baseURL = (gdosComplainFastdfsPath.indexOf('http') > -1 ? gdosComplainFastdfsPath : (
					`${window.location.protocol}//${window.location.host}${window.gdosComplainFastdfsPath}`))
				// 绝对
				const baseFullURL = (gdosComplainFastdfsFullPath.indexOf('http') > -1 ? gdosComplainFastdfsFullPath : (
					`${window.location.protocol}//${window.location.host}${window.gdosComplainFastdfsFullPath}`
					))
				const previewBaseURL = (gdosComplainPreview.indexOf('http') > -1 ? gdosComplainPreview : (
					`${window.location.protocol}//${window.location.host}${window.gdosComplainPreview}`))
				let originURL = baseFullURL + '/' + this.filePath

				if ('.bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb'.includes(this.fileType)) {
					originURL = baseURL + '/' + this.filePath
				}

				if ('mov,avi,wmv,rmvb,mp4'.includes(this.fileType)) {
					// 采用原生预览
					if (this.fileType === 'mp4') {
						this.previewURL = originURL
					} else {
						this.loading = true
						const res = await fileAPI.convert2mp4({
							originUrl: baseFullURL + '/' + this.filePath
						}).finally(() => this.loading = false)
						this.previewURL = baseURL + '/' + res.data
					}
				} else {
					if ('tif'.includes(this.fileType)) {
						this.loading = true
						const res = await fileAPI.tif2png({
							originUrl: baseFullURL + '/' + this.filePath
						}).finally(() => this.loading = false)
						originURL = baseURL + '/' + res.data
					}
					this.previewURL =
						`${previewBaseURL}/onlinePreview?url=${encodeURIComponent(Base64.encode(originURL))}`
				}
				console.log(originURL)
			},
			hide() {
				this.previewURL = ''
			},
		}
	}
</script>

<style lang="less">
	iframe {
		border: none
	}
</style>
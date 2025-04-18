<template>
	<el-dialog append-to-body title="预览" top="20px" :width="width" :visible="visible" @close="handleClose">
		<div class="pre-content" v-loading="loading">
			<!-- docx预览 -->
			<vue-office-docx v-if="fileType === 'docx'" :src="fileUrl" style="height: 100%; overflow-y: auto"
				@rendered="renderedHandler" @error="errorHandler" />
			<!-- docx预览 -->
			<div v-html="htmlContent" v-else-if="fileType === 'doc'" style="height: 100%; overflow-y: auto"></div>
			<!-- excel预览 -->
			<vue-office-excel v-else-if="fileType === 'xlsx' || fileType === 'xls'" :src="fileUrl"
				:options="{xls:(fileType === 'xls'?true:false),}" style="height: 100%; overflow-y: auto"
				@rendered="renderedHandler" @error="errorHandler" />
			<!-- pdf预览 -->
			<pdf v-else-if="fileType === 'pdf'" :hidePage="false" :pdfUrl="fileUrl" />
			<!-- 预览图片 -->
			<div style="width: 100%; height: 100%;" v-else-if="'.bmp,.jpg,.jpeg,.png,.tif,.gif'.includes(fileType)">
				<iframe :src="fileUrl" width="100%" style="height:100%;" allowfullscreen></iframe>
			</div>
			<!-- 预览视频 -->
			<div style="width: 100%; height: 100%;" v-else-if="'.mov,.avi,.wmv,.rmvb,.mp4'.includes(fileType)">
				<video controls muted controlsList="nodownload" autoplay style="width: 100%;height: 100%;">
					<track kind="captions" />
					<source :src="fileUrl" type="video/mp4" />
				</video>
			</div>
			<div v-else>
				<span style="font-size: 16px;line-height: 60px;margin-left: 30px;">暂不支持该格式预览</span>
			</div>

		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from '@/utils/mixins'
	// 引入相关样式
	import '@vue-office/docx/lib/index.css';
	import '@vue-office/excel/lib/index.css';
	import VueOfficeDocx from "@vue-office/docx";
	import VueOfficeExcel from "@vue-office/excel";
	import pdf from "@/components/pdf.vue";
	import {
		Base64
	} from 'js-base64'
	import * as fileAPI from '@/api/file'
	import {
		tif2png
	} from '@/api/file'

	export default {
		name: 'previewDialog',
		components: {
			VueOfficeDocx,
			VueOfficeExcel,
			pdf
		},
		props: {
			filePath: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '1200px'
			},
		},
		data() {
			return {
				loading: false,
				fileUrl: '', //设置文档网络地址，可以是相对地址
				fileType: "",
				htmlContent: "",
			}
		},
		mixins: [mixins.dialog, mixins.upload],
		methods: {
			async show() {
				// 相对
				const baseURL = (gdosComplainFastdfsPath.indexOf('http') > -1 ? gdosComplainFastdfsPath : (
					`${window.location.protocol}//${window.location.host}${window.gdosComplainFastdfsPath}`))
				const previewBaseURL = (gdosComplainPreview.indexOf('http') > -1 ? gdosComplainPreview : (
					`${window.location.protocol}//${window.location.host}${window.gdosComplainPreview}`))
				const fileURLSplit = this.filePath.split('.')
				this.fileType = fileURLSplit[fileURLSplit.length - 1].toLowerCase()
				if ('.bmp,.jpg,.jpeg,.png,.tif,.gif'.includes(this.fileType)) {
					let originURL = baseURL + '/' + this.filePath
					this.fileUrl =
						`${previewBaseURL}/onlinePreview?url=${encodeURIComponent(Base64.encode(originURL))}`
				} else {
					const urls =
						"http://222.143.33.224:8091/complain-manage-inside/complain-manage-dfs/fileUpload/download?filePath=/" +
						this.filePath
					if ('.doc'.includes(this.fileType)) {
						console.log(urls, '111111111112333333333333333333')
						const mammoth = require("mammoth");
						mammoth.convertToHtml({
								path: urls
							})
							.then(function(result) {
								var html = result.value; // 生成的 HTML
								var messages = result.messages; // 任何警告或信息
								console.log(html, '-------------htmlContent--------------');
							})
							.done();
					} else {
						this.fileUrl = urls
					}
				}
				console.log(this.filePath, '))))))))))))))))))))))))0')
			},
			renderedHandler() {
				console.log("渲染完成");
			},
			errorHandler(res) {
				console.log("渲染失败", res);
			},
		}
	}
</script>

<style lang="less" scoped>
	.pre-content {
		width: 100%;
		height: calc(100vh - 135px);
	}
</style>
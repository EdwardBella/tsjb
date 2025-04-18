<template>
	<el-main class="preview" v-loading="loading">
		<div class="preview_wrap" id="preview_wrap">
			<pdf ref="ppt" :src="src" :page="pageNum" :rotate="pageRotate" @progress="loadedRatio = $event"
				@page-loaded="pageLoaded($event)" @num-pages="pageTotalNum = $event" @link-clicked="page = $event" />
			<div v-if="error.visible" class="error">
				<div style="text-align: center">
					<h4 style="margin-bottom: 10px">文件预览错误</h4>
					<p class="desc">{{ error.name }}</p>
				</div>
			</div>
		</div>
		<div class="toolbar" v-if="hidePage">
			<el-button :disabled="pageNum == 1" type="text" @click.stop="prePage">
				<i class="el-icon-arrow-left" /> 上一页
			</el-button>
			<div class="page">
				当前第<span>{{ pageNum }}</span>页，共<span>{{ pageTotalNum }}</span>页
			</div>
			<el-button type="text" :disabled="pageNum == pageTotalNum" @click.stop="nextPage">下一页<i
					class="el-icon-arrow-right" /></el-button>

		</div>
	</el-main>
</template>

<script>
	import pdf from 'vue-pdf'
	import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
	export default {
		name: 'Wpdf',
		props: {
			pdfUrl: {
				type: String,
				default: ''
			},
			hidePage: {
				type: Boolean,
				default: false
			}
		},
		components: {
			pdf
		},
		data() {
			return {
				rightData: {},
				patientInfo: {},
				pageNum: 1,
				pageRotate: 0,
				loadedRatio: 0,
				pageTotalNum: 0,
				loading: true,
				src: '',
				error: {
					visible: false,
					name: ''
				},
				scale: 100
			}
		},
		watch: {
			pdfUrl: {
				handler(val) {
					if (val != '') {
						this.src = val
						// this.src = pdf.createLoadingTask({
						//   url: val,
						//   CMapReaderFactory() { // 重点方法
						//     const CMapReader = new CMapReaderFactory();
						//     this.fetch = function(query) {
						//       return CMapReader.fetch(query).then((data) => {
						//         return {
						//           // 重建一个Uint8Array，修复第二次打开不能显示后端动态添加文字的问题
						//           cMapData: new Uint8Array(data.cMapData),
						//           compressionType: data.compressionType,
						//         };
						//       });
						//     };
						//   }
						// }); //解决汉字不显示的问题

					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			pageLoaded(ev) {
				this.loading = false;
				if (typeof ev === 'number') {
					this.error.visible = false
				}
			},
			pdfError(err) {
				this.loading = false;
				this.error.visible = true
				this.error.name = err.name
			},
			prePage() {
				let page = this.pageNum
				page = page > 1 ? page - 1 : this.pageTotalNum
				this.pageNum = page
			},
			nextPage() {
				let page = this.pageNum
				page = page < this.pageTotalNum ? page + 1 : 1
				this.pageNum = page
			},
			scaleBig() {
				this.scale += 10;
				console.log(this.scale)
				this.$refs.ppt.$el.style.width = parseInt(this.scale) + "%";
			},
			scaleSmall() {
				if (this.scale == 100) {
					return;
				}
				this.scale += -10;
				this.$refs.ppt.$el.style.width = parseInt(this.scale) + "%";
			},
		}
	}
</script>

<style lang="less" scoped>
	.preview {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0 auto;
		position: relative;


		.preview_wrap {
			height: 100%;
			position: relative;


			.error {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, 0.4);
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.toolbar {
			width: 100%;
			position: absolute;
			bottom: 50px;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			padding: 5px 16px;
		}
	}
</style>
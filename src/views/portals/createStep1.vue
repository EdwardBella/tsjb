<template>
	<el-form :model="form" :rules="formRules">
		<!-- <el-button @click="$router.push($route.query.backPath || '/portals/index')" type="primary" plain size="mini"
			style="margin-bottom: 10px">返回</el-button> -->


		<div class="details">
			<div class="title">投诉举报须知</div>

			<div v-loading="loading" class="info beautify-scroll" v-html="getTextHtml"></div>

			<div style="text-align: center; margin-top: 20px;font-size: 18px;">
				<template v-if="timing">
					请仔细阅读举报须知！{{sec}}s
				</template>
				<el-checkbox v-else v-model="agree">已阅读，并同意《投诉举报须知》的要求。</el-checkbox>
			</div>
			<div class="footer-btn" style="display: flex;align-items: center;justify-content: center;">
				<div style="font-size: 20px;width: 170px;cursor: pointer; height: 42px;margin-right: 8px; line-height: 40px;border-radius: 4px;box-shadow: 0 2px 4px 0 rgba(9,78,197,.3); border: 1px solid #1b5284; font-weight: 600;letter-spacing: 4px;"
					@click="$router.back()">返回</div>
				<el-button class="submit" :disabled="!agree" @click="handleSubmit" type="primary"
					style="font-size: 20px;width: 170px;height: 44px;font-weight: 600;line-height: 41px;">确认投诉</el-button>
			</div>
		</div>
		<!--    <el-dialog-->
		<!--      title="投诉指南"-->
		<!--      :visible.sync="dialogVisible"-->
		<!--      top="50px"-->
		<!--      width="80%"-->
		<!--    >-->
		<!--      <div class="guide-details" v-html="txt2HTML(getTextHtml)">-->
		<!-- <div class="title">投诉指南</div>
        <div class="text">
          <p>举报中心欢迎公民、法人或其他组织参与互联网违法和不良信息举报监督。</p>
          <p>二、互联网违法和不良信息主要包括</p>
          <p>1．危害国家安全、荣誉和利益的；</p>
          <p>2．煽动颠覆国家政权、推翻社会主义制度的；</p>
          <p>3．煽动分裂国家、破坏国家统一的；</p>
          <p>4．宣扬恐怖主义、极端主义的；</p>
          <p>5．宣扬民族仇恨、民族歧视的；</p>
          <p>6．传播暴力、淫秽色情信息的；</p>
          <p>7．编造、传播虚假信息扰乱经济秩序和社会秩序的；</p>
          <p>8．侵害他人名誉、隐私等合法权益的；</p>
          <p>9．互联网相关法律法规禁止的其他内容。</p>
          <p>三、举报方式</p>
          <p>1.登录举报中心官网https://www.12377.cn举报；</p>
          <p>2.下载安装“网络举报”客户端举报；</p>
          <p>3.关注举报中心官方微博“国家网信办举报中心”，点击“私信举报”；</p>
          <p>4.关注举报中心官方微信公众帐号“国家网信办举报中心”，点击“一键举报”；</p>
          <p>5.拨打12377举报热线举报；</p>
          <p>6.发送邮件至邮箱jubao@12377.cn举报。</p>
          <p>四、举报材料及要件</p>
          <p>举报互联网违法和不良信息时，举报主体应提供与网络举报事项相应的信息网址或者足以准确定位举报信息的相关说明、样本截图等举报基本材料，以及相关证明证据材料等举报要件。</p>
          <p>五、举报协助处置</p>
          <p>举报主体在网上成功提交举报信息后，将收到一个查询码，通过查询码，可以确认举报的信息已收到。举报中心受理的举报，将依据相关规定转交各地网信部门、相关网站或相关部门依法依规研处。</p>
          <p>六、注意事项</p>
          <p>1.举报主体应根据举报信息所属类别，选择相应类别的举报入口提交举报。若选择类别错误，所提交的举报可能无效。</p>
          <p>2.举报主体无需重复提交举报内容。为保障举报主体的合法权益，限制恶意重复举报，提高网上举报的运行效益，每位举报主体24小时内原则上最多举报50次，超过50次将无法举报成功。</p>
          <p>3.网络侵权信息举报请通过“侵权类”举报入口提交，举报人须实名举报。</p>
          <p>4.有待查证辟谣的网络谣言线索，请提交至“中国互联网联合辟谣平台”。</p>
          <p>5.举报主体应对举报事项的客观性、真实性负责。对于借举报故意捏造事实、诬告陷害，伪造举报证据的，或以举报为名制造事端，干扰国家机关正常工作的，将依法承担相应的法律责任。</p>
        </div> -->
		<!--      </div>-->
		<!--    </el-dialog>-->
	</el-form>
</template>

<script>
	import * as portalsApi from '@/api/portals'
	import {
		coverItemdetailDataToTree,
		getCMSUserInfo,
		isEmpty,
		itemdetail2GroupOptions,
		mergeLeft,
		postPortalsHeight
	} from '@/utils/common'
	import {
		txt2HTML
	} from "@/utils/filters";
	import {
		getDetail
	} from "@/api/pageInfoManage";
	import treeSelect from '@/components/treeSelect'
	import globalHelp from "@/components/globalHelp";

	const sec = 30

	export default {
		name: "create",
		components: {
			treeSelect,
			globalHelp
		},
		data() {
			return {
				sec,
				timing: false,
				loading: false,
				dialogVisible: false,
				getTextHtml: null,
				title: "",
				form: {
					itemDetailId: '',
				},
				formRules: {
					itemDetailId: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}],
					agree: [{
						required: true,
						message: '请勾选',
						trigger: 'change'
					}]
				},
				itemdetail: {},
				agree: false,
			}
		},
		watch: {

		},
		computed: {
			hasItemDetails() {
				return !isEmpty(this.itemdetail)
			}
		},
		created() {
			this.getDetailFun('投诉指南')
			clearInterval(this.timer)
			this.timing = true
			this.sec = sec
			this.timer = setInterval(() => {
				this.sec--
				if (this.sec === 0) {
					this.timing = false
					this.sec = sec
					clearInterval(this.timer)
				}
			}, 1000)
			window.localStorage.setItem('backPath', this.$route.query.backPath || '')
		},
		mounted() {
			this.fetchTemporaryStorage()
			postPortalsHeight(1200)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			txt2HTML,
			fetchTemporaryStorage() {
				const cmsUserInfo = getCMSUserInfo()
				portalsApi.workOrder.getTemporaryStorage({
						createUserId: cmsUserInfo.userId
					})
					.then(res => {
						const result = res.result
						if (result) {
							this.$router.push({
								path: '/portals/createStep2',
								query: {
									id: result.itemDetailId
								}
							})
						}
					})
			},
			handleSubmit() {
				// TODO 判断是否认证
				// this.$router.push({
				//   path: '/portals/authentication',
				//   query: { id: this.form.itemDetailId }
				// })
				// 企业举报投诉
				this.$router.push({
					path: '/portals/createStep2',
					query: {
						id: ''
					}
				})
			},
			//获取投诉举报指南
			getDetailFun(name) {
				let params = {
					name: name
				}
				getDetail(params).then(res => {
					console.log(res, '------------')
					const {
						code,
						msg,
						result
					} = res
					if (code == 0) {
						if (!result) return this.$modal.msgError({
							duration: '1000',
							message: '获取失败，请联系管理员'
						});
						this.getTextHtml = result.content
						this.title = name
						this.dialogVisible = true
					} else {
						this.$modal.msgError({
							duration: '1000',
							message: msg
						})
					}
				}).catch(err => {
					return Promise.reject(err)
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	::v-deep .el-checkbox__label {
		font-size: 18px;
	}

	::v-deep .el-button--primary {
		background: #1b5284;
	}

	.details {
		.title {
			margin-top: 10px;
			text-align: center;
			font-size: 22px;
			font-weight: 600;
			color: #323232;
			line-height: 25px;
		}

		.info {
			margin-top: 30px;
			padding: 20px 30px;
			height: 400px;
			box-sizing: border-box;
			background: #dbe9fc;
			border-radius: 2px;
			border: 1px solid #E8E8E8;
		}

		.explain {
			color: #666;
		}

		.links {
			margin-top: 10px;
			padding-left: 30px;

			span {
				position: relative;
				color: @color-primary;
				font-weight: 600;
				line-height: 20px;

				&::after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 1px;
					background: #0B5FD5;
				}
			}
		}

		.key-value {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;

			&>div {
				line-height: 20px;

				&>span:first-child {
					font-weight: 600;
					color: #323232;
				}

				&>span:last-child {
					color: #666;
				}
			}
		}
	}

	.guide-details {
		.title {
			font-size: 30px;
			font-weight: 600;
			color: #323232;
			line-height: 42px;
			text-align: center;
			padding-bottom: 18px;
			margin-bottom: 27px;
			border-bottom: 10px solid #E8E8E8;
		}

		.text {
			color: #666666;
			line-height: 30px;
		}

	}
</style>
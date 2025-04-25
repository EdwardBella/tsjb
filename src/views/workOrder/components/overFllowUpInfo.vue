<template>
	<div>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;flex: 1;">结案回访</span>
			<span class="isPlan-cn" @click="addFllowUp" v-if="userRoles.isLeaderDepartment">添加</span>
		</div>
		<div style="display: flex;flex-direction: column;">
			<div class="content-cn" v-for="(item,index) in workOrderEvaluatesList" :key="item.id">
				<div class="times-cn">
					<div class="dot-cn"></div>
					<h3>第{{index+1}}次回访</h3>
				</div>
				<el-form class="key-value" label-width="130px" label-suffix="：">
					<el-row>
						<el-col :span="8">
							<el-form-item label="回访日期">{{item.evaluateDate || ''}}</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="回访结果">{{evaluateResultTrans[item.evaluateResult]}}</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="操作人">{{item.operateUser || ''}}</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注">{{item.evaluateNotes || ''}}</el-form-item>
						</el-col>
			
					</el-row>
				</el-form>
			</div>
		</div>
		

		<!-- 新增 -->
		<addFlloeUpDialog :visible.sync="addFlloeUpDialog.visible" :workOrderNo="workOrderNo"
			@success="addFlloeUpSucess"></addFlloeUpDialog>

	</div>

</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'
	import addFlloeUpDialog from "./addFlloeUpDialog";
	import {
		mapState
	} from 'vuex'

	export default {
		name: "overFllowUpInfo",
		components: {
			addFlloeUpDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'workOrderEvaluatesList', 'workOrderNo'],
		data() {
			return {
				addFlloeUpDialog: {
					visible: false
				},
				evaluateResultTrans: {
					'satisfaction': '满意',
					'common': '基本满意',
					'noSatisfaction': '不满意'
				},
				dataLists: [],
				isShow: false,
			};
		},
		watch: {
			workOrderEvaluatesList: {
				handler(val) {
					console.log(val, '00000000000000000---------------00')
					this.$forceUpdate()
				},
				deep: true,
				immediate: true
			},
		},
		computed: {
			...mapState(['userInfo', 'userRoles']),
		},
		methods: {
			show() {
				// dictApi.list({
				// 		parentCode: "1006"
				// 	})
				// 	.then(res => {
				// 		this.optionList = res.result;
				// 	});

				// templateApi.detail(1021)
				// 	.then(res => {
				// 		this.form.comment = res.result.value;
				// 	});
			},
			addFllowUp() {
				this.addFlloeUpDialog.visible = true
			},
			addFlloeUpSucess(res) {
				this.$emit("success");
				console.log('----------------------')
			}

		}
	};
</script>

<style lang="less" scoped>
	.content-cn {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		flex-direction: column;

		.times-cn {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 10px;


			.dot-cn {
				width: 8px;
				height: 8px;
				margin-right: 10px;
				border-radius: 8px;
				background-color: #2b65da;
			}
		}
	}


	.module-head {
		padding: 0 15px;
		min-height: 40px;
		background: linear-gradient(90deg, #0b5fd5 0, #e6f2ff);
		font-size: 20px;
		margin-bottom: 10px;
		color: #fff;
		display: flex;
		align-items: center;

		.isPlan-cn {
			font-size: 14px;
			line-height: 20px;
			border: 1px solid #1b5284;
			color: #1b5284;
			background-color: #fff;
			box-shadow: 0 2px 4px 0 rgba(9, 78, 197, .3);
			padding: 0 15px;
			border-radius: 4px;
			cursor: pointer;
		}
	}
</style>
<template>
	<div>
		<div class="module-head" style="margin-top: 10px;background: linear-gradient(90deg,#138a43 0,#eeffe6);">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">督办信息</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				<el-col :span="8">
					<el-form-item label="督办类型">{{surpriseStatusInfo.superviseType || ''}}</el-form-item>
				</el-col>
				<el-col :span="16">
					<el-form-item label="督办时间">{{surpriseStatusInfo.createTime || ''}}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="督办内容">{{surpriseStatusInfo.superviseContent || ''}}</el-form-item>
				</el-col>

			</el-row>
		</el-form>

	</div>

</template>

<script>
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'

	export default {
		name: "superviseAndHandleInfo",
		components: {

		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'workOrderNo','surpriseStatusInfo'],
		data() {
			return {
				previewDialog: {
					visible: false,
					fileURL: ''
				},
				satisfactionLevelTrans: {
					'satisfaction': "满意",
					'common': "基本满意",
					'noSatisfaction': "不满意",
				}

			};
		},
		mounted() {
			this.getData()
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
			getData() {
				workOrderApi.finished.getSuperviseStatus({
						workOrderNo: this.workOrderNo
					})
					.then(res => {

					})
			}
		}
	};
</script>

<style lang="less" scoped>
	.module-head {
		padding: 0 15px;
		min-height: 40px;
		background: linear-gradient(90deg, #0b5fd5 0, #e6f2ff);
		font-size: 20px;
		margin-bottom: 10px;
		color: #fff;
		display: flex;
		align-items: center;
	}
</style>
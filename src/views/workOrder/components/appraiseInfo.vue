<template>
	<div>
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">经营主体评价</span>
		</div>
		<el-form class="key-value" label-width="130px" label-suffix="：">
			<el-row>
				<el-col :span="24">
					<el-form-item label="整体满意度">
						<el-rate disabled v-model="value1"></el-rate>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="评价内容">{{detailsInfo.workOrderAppraise.comment || ''}}</el-form-item>
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
	import {
		splxDict
	} from "@/utils/dict";

	export default {
		name: "appraiseInfo",
		components: {

		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo'],
		data() {
			return {
				value1: 0,
			};
		},
		watch: {
			detailsInfo: {
				handler(val) {
					console.log(val,'======================')
					if (val != null) {
						this.value1 = Number(val.workOrderAppraise.satisfiedScore) || 0
					}
				},
				deep: true,
				immediate: true
			},
		},
		created() {

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
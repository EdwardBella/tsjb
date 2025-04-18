<template>
	<div style="width: 100%;">
		<div class="module-head" style="margin-top: 10px;">
			<img src="@/assets/images/title-arrow.png" style="height: 20px;margin-right: 10px;" />
			<span style="font-size: 18px;">操作记录</span>
		</div>
		<el-table v-if="detailsInfo.processList && detailsInfo.processList.length" :data="detailsInfo.processList"
			size="mini">
			<el-table-column prop="operateName" show-overflow-tooltip label="操作名称" min-width="350px" header-align="left"
				align="left"></el-table-column>
			<el-table-column prop="processUser" label="操作人" show-overflow-tooltip width="220px" header-align="left"
				align="left"></el-table-column>
			<el-table-column prop="fileName" label="总用时" header-align="left" align="left">
				<template slot-scope="scope">
					<span>{{secondsTransform(scope.row.costTime)}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="操作时间" header-align="left" width="170px"
				align="left"></el-table-column>
			<el-table-column label="详情" width="100px" align="center">
				<template slot-scope="scope">
					<el-button type="primary" plain size="mini" @click="seeDetails(scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 查看 -->
		<processDetailsDialog v-if="processDetailsDialog.visible" :visible.sync="processDetailsDialog.visible" :id="id">
		</processDetailsDialog>

	</div>

</template>

<script>
	import processDetailsDialog from "@/views/workOrder/components/processDetailsDialog";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as mixins from "@/utils/mixins";
	import * as dictApi from "@/api/dict";
	import * as templateApi from "@/api/template";
	import * as fileApi from '@/api/file'
	import {
		secondsTransform
	} from '@/utils/common'

	export default {
		name: "operateRecordsInfo",
		components: {
			processDetailsDialog
		},
		mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
		props: ["visible", 'type', 'detailsInfo'],
		data() {
			return {
				id: '',
				processDetailsDialog: {
					visible: false
				},
			};
		},
		methods: {
			secondsTransform,
			seeDetails(row) {
				this.id = row.id
				this.processDetailsDialog.visible = true
			},
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
	}
</style>
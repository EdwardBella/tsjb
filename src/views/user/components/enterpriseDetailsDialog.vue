<template>
	<el-dialog title="企业信息" width="640px" top="20px" :visible="visible" @close="handleClose">
		<div class="light-blue-box card">
			<div class="header">
				<div class="title">基本信息</div>
			</div>
			<el-form class="key-value" label-width="125px">
				<el-form-item label="企业名称：">{{ details.createUsername || "-" }}</el-form-item>
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="用户类型：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="统一社会信用代码：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="联系电话：">{{ details.createUsername || "-" }}</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="注册时间：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="法定代表人：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="邮政编码：">{{ details.createUsername || "-" }}</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="企业地址：">{{ details.createUsername || "-" }}</el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script>
	import * as minix from '@/utils/mixins'

	export default {
		name: "enterpriseDetailsDialog",
		mixins: [minix.dialog],
		props: {},
		data() {
			return {
				details: {}
			}
		}
	};
</script>

<style scoped>

</style>
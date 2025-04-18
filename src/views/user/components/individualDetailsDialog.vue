<template>
	<el-dialog title="个人信息" width="640px" top="20px" :visible="visible" @close="handleClose">
		<div class="light-blue-box card">
			<div class="header">
				<div class="title">基本信息</div>
			</div>
			<el-form class="key-value" label-width="125px">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="用户类型：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="姓名：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="身份证号：">{{ details.createUsername || "-" }} <span class="color-success"
								style="margin-left: 20px">已认证</span></el-form-item>

					</el-col>
					<el-col :span="12">
						<el-form-item label="注册时间：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="性别：">{{ details.createUsername || "-" }}</el-form-item>
						<el-form-item label="手机号：">{{ details.createUsername || "-" }}</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="联系地址：">{{ details.createUsername || "-" }}</el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script>
	import * as minix from "@/utils/mixins";

	export default {
		name: "individualDetailsDialog",
		mixins: [minix.dialog],
		props: {},
		data() {
			return {
				details: {}
			};
		}
	};
</script>

<style scoped>

</style>
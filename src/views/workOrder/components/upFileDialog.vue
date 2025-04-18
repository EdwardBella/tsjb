<template>
	<div class="flex">
		<el-dialog title="请选择上传" :visible.sync="dialogVisible" width="600px" @close="closeDialog" append-to-body>
			<el-form class="formCard" :rules="rules" label-position="left" :model="queryParams" ref="queryForm"
				label-width="60px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="类型:" prop="execDepart">
							<el-input v-model="queryParams.execDepart" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
				</el-row>


			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button plain @click="dialogVisible = false">关 闭</el-button>
				<el-button type="primary" @click="sure">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: "upFileDialog",
		props: {
			isVisible: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				dialogVisible: false,
				isGuidelines: false,
				isInspectionBarcode: false,
				queryParams: {},
				rules: {
					execDepart: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
				}
			};
		},
		computed: {},
		watch: {
			isVisible: {
				handler(val) {
					this.init()
				},
				deep: true,
				immediate: true
			},
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.dialogVisible = this.isVisible

			},
			sure() {
				this.dialogVisible = false

			},
			closeDialog() {
				this.$emit('changeModel', this.dialogVisible)
			}
		}
	};
</script>

<style lang="less" scoped>
	::v-deep .el-dialog .el-dialog__header .el-dialog__title {
		font-size: 18px;
		font-weight: 600;
		color: #323232;
	}

	::v-deep .el-input--medium .el-input__inner {
		height: 42px;
		line-height: 42px;
		font-size: 16px;
	}

	::v-deep .el-form-item--medium .el-form-item__label,
	.el-form-item__label {
		font-size: 16px;
		line-height: 42px;
		font-weight: normal;
	}
	
	::v-deep .el-dialog__header{
		height: 50px;
		
	}

	::v-deep .el-dialog__footer {
		padding: 14px;
		height: auto;
		line-height: 1px;
	}

	.dialog-footer {
		.is-plain {
			border-color: #1b5284;
			height: 40px;
			min-width: 150px;
			font-size: 18px;
			color: #1b5284;
			font-weight: 600;
		}

		.el-button.el-button--primary {
			height: 40px;
			min-width: 150px;
			font-size: 18px;
			background-color: #1b5284;
			font-weight: 600;
		}
	}

	.formCard {
		padding: 20px;
	}
</style>
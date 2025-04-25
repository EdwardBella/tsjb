<template>
	<el-dialog append-to-body title="添加备注" width="640px" top="20px" :visible="visible" @close="handleClose">
		<el-form :model="form" :rules="rules" ref="form" class="white-card" label-width="140px">
			<el-form-item v-if="userRoles.isTopAuthority" label="可见范围:" prop="remarkVisibleRange">
				<el-select v-model="form.remarkVisibleRange" style="width: 100%">
					<el-option v-for="item in remarkVisibleRanges" :key="item.key" v-bind="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注类型:" prop="remarkType">
				<el-select v-model="form.remarkType" style="width: 100%">
					<template v-for="item in formRemarkTypes">
						<el-option v-bind="item"></el-option>
					</template>
				</el-select>
			</el-form-item>
			<el-form-item label="备注类容:" prop="content">
				<el-input v-model.trim="form.content" type="textarea" :rows="4" maxlength="1000" show-word-limit
					placeholder="请输入备注"></el-input>
			</el-form-item>

		</el-form>

		<div class="split"></div>

		<div class="dialog-footer-btn">
			<el-button @click="handleClose" plain>关闭</el-button>
			<el-button @click="onSubmit" :loading="submitting" type="primary">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from "@/utils/mixins";
	import {
		dict2options
	} from "@/utils/common";
	import {
		remarkTypeDict,
		remarkVisibleRangeDict
	} from "@/utils/dict";
	import * as remarkAPI from "@/api/remark";
	import {
		mapState
	} from "vuex";
	import {
		queryProvincialLevel
	} from "@/api/workOrder/all";

	export default {
		name: "addRemarkDialog",
		mixins: [mixins.loading, mixins.form, mixins.dialog],
		props: ["visible", "workOrderNo", "type", "workOrderId", "id"],
		data() {
			return {
				submitting: false,
				form: {
					content: "",
					remarkType: "",
					remarkVisibleRange: ""
				},
				rules: {
					remarkType: [{
						required: true,
						message: "请选择"
					}],
					remarkVisibleRange: [{
						required: true,
						message: "请选择"
					}],
					content: [{
						required: true,
						message: "请填写"
					}]
				},
				remarkVisibleRanges: dict2options(remarkVisibleRangeDict),
				remarkTypes: dict2options(remarkTypeDict, {
					hasAll: true
				}),
				formRemarkTypes: []
			};
		},
		computed: {
			...mapState(["userRoles"])
		},
		watch: {
			"userRoles.isTopAuthority": {
				handler(val) {
					if (val) {
						this.form.remarkVisibleRange = 2;
					} else {
						this.form.remarkVisibleRange = 0;
					}
				},
				immediate: true
			},
			"searchForm.remarkType"() {
				this.loading = true;
				this.query()
					.then(() => {
						this.$nextTick(() => {
							this.$refs.scroll.scrollTop = 0;
						});
					})
					.finally(() => this.loading = false);
			}
		},
		methods: {
			show() {
				this.loading = true;
				queryProvincialLevel().then(r => {
					const isProvincialLevel = r.result;
					this.formRemarkTypes = dict2options(remarkTypeDict, {
						filter: ({
							value
						}) => {
							return isProvincialLevel ? true : [0, 3].includes(value);
						}
					});
				});
			},
			onSubmit() {
				this.$refs.form.validate()
					.then(() => {
						const form = {
							...this.form
						};
						form.workOrderId = this.workOrderId;
						form.workOrderNo = this.workOrderNo;
						this.submitting = true;
						if (!this.userRoles.isTopAuthority) form.remarkVisibleRange = 0;
						return remarkAPI.add(form);
					})
					.then(() => {
						this.$emit("success");
						this.handleClose();
					})
					.finally(() => {
						this.submitting = false;
					});
			}
		}
	};
</script>

<style lang="less" scoped>
	.tips {
		text-align: center;
		margin-bottom: 20px;
	}
</style>
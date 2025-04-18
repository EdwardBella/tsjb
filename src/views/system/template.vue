<template>
	<card>
		<template slot="content">
			<el-form ref="form" :model="form" :rules="formRules">
				<div class="light-blue-box flex space-between">
					<el-form-item label="" prop="id" ref="id" style="margin-bottom: 0">
						<el-select v-model="form.id" placeholder="请选择">
							<el-option v-for="item in list" :key="item.id" :value="item.id"
								:label="item.name"></el-option>
						</el-select>
					</el-form-item>

					<el-button @click="handleSubmit" :loading="submitting" type="primary">发布</el-button>
				</div>

				<div class="light-blue-box" ref="value" style="margin-top: 10px">
					<el-form-item label="" prop="value" style="margin-bottom: 0">
						<el-input v-model="form.value" v-loading="loading" type="textarea" show-word-limit
							maxlength="300" placeholder="请输入模板内容" style="height: 450px;"></el-input>
					</el-form-item>
				</div>
			</el-form>
		</template>
	</card>
</template>

<script>
	import card from "@/components/card/index.vue";
	import * as mixins from "@/utils/mixins";
	import * as templateApi from "@/api/template";
	import * as validators from "@/utils/validators";

	export default {
		name: "_template",
		mixins: [mixins.affirm, mixins.form],
		components: {
			card
		},
		data() {
			return {
				loading: false,
				submitting: false,
				hasError: false,
				list: [],
				details: {},
				form: {
					id: "",
					value: ""
				},
				formRules: {
					id: [{
						required: true,
						message: "请选择"
					}],
					value: [{
						required: true,
						message: "请填写"
					}]
				}
			};
		},
		watch: {
			"form.id"(val) {
				if (!val) return;
				this.loading = true;
				templateApi.detail(val)
					.then(res => {
						this.form.value = res.result.value;
						this.$nextTick(() => this.clearValidate("form"));
					})
					.finally(() => this.loading = false);
			}
		},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				templateApi.list()
					.then(res => {
						this.list = res.result;
					});
			},
			handleSubmit() {
				this.validate("form")
					.then(() => this.confirm("是否确认发布？"))
					.then(() => {
						// TODO
						this.submitting = true;
						return templateApi.update(this.form);
					})
					.then(res => {
						this.$modal.msgSuccess("发布成功");
					})
					.finally(() => this.submitting = false);
			}
		}
	};
</script>

<style scoped>

</style>
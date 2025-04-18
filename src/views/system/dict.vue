<template>
	<div>
		<card>
			<el-form slot="content" class="search-form">
				<div class="light-blue-box">
					<el-select placeholder="请选择" v-model="selectCategoryCode">
						<el-option v-for="item in categoryList" :key="item.id" :value="item.code"
							:label="item.name"></el-option>
					</el-select>
				</div>

				<div class="light-blue-box" style="margin-top: 10px">
					<el-input v-model="form.name" placeholder="请输入名字"></el-input>
					<el-button @click="handleAddItem" :loading="creating" type="primary" icon="img icon-add-blue" plain
						style="margin-left: 20px">创建新数据
					</el-button>
				</div>
			</el-form>
		</card>

		<card style="margin-top: 20px">
			<el-table slot="content" v-loading="loading" :data="list" stripe>
				<el-table-column type="index" label="序号" width="200"></el-table-column>
				<el-table-column prop="name" label="数据"></el-table-column>
				<el-table-column label="操作" width="120px" align="center">
					<template slot-scope="{row}">
						<el-popconfirm @confirm="handleDeleteItem(row.id)" title="确认删除吗？">
							<el-button slot="reference" type="primary" plain size="mini">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</card>

		<!--    <pagination-->
		<!--      :total="total"-->
		<!--      :page.sync="pageQuery.pageNum"-->
		<!--      :pageSize="pageQuery.pageSize"-->
		<!--      @pageChange="playLoadData"-->
		<!--    />-->
	</div>
</template>

<script>
	import card from "@/components/card/index.vue";
	import pagination from "@/components/pagination.vue";
	import tablePage from "@/components/tablePage/index.vue";
	import * as dictApi from "@/api/dict";

	export default {
		name: "dict",
		components: {
			tablePage,
			card
		},
		data() {
			return {
				form: {
					name: ""
				},
				selectCategoryCode: "",
				categoryList: [],
				list: [],
				total: 0,
				deleting: false,
				loading: false,
				creating: false
				// pageQuery: {
				//   pageNum: 1,
				//   pageSize: 10
				// }
			};
		},
		watch: {
			selectCategoryCode(val) {
				if (val) this.getList();
			}
		},
		created() {
			this.getCategoryList();
		},
		methods: {
			getCategoryList() {
				return dictApi.categoryList().then(res => {
					const result = res.result;
					this.categoryList = res.result;
					this.selectCategoryCode = result[0].code;
				});
			},
			getList() {
				this.loading = true;
				return dictApi.list({
						parentCode: this.selectCategoryCode
					}).then(res => {
						this.list = res.result;
					})
					.finally(() => {
						this.loading = false;
					});
			},
			handleDeleteItem(id) {
				this.deleting = true;
				return dictApi.del(id).then(res => {
						this.$modal.msgSuccess("删除成功");
						this.getList();
					})
					.finally(() => {
						this.deleting = false;
					});
			},
			handleAddItem() {
				const form = {
					...this.form
				};
				if (!form.name) return this.$modal.msgError("请输入名字");
				form.parentCode = this.selectCategoryCode;
				this.$confirm("是否确认创建", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(res => {
						this.creating = true;
						return dictApi.add(form).then(res => {
							this.$modal.msgSuccess("创建成功");
							this.form.name = "";
						});
					})
					.then(() => {
						return this.getList();
					})
					.finally(() => {
						this.creating = false;
					});
			}
		}
	};
</script>

<style scoped lang="less">
	::v-deep .el-table .cell {
		font-size: 16px !important;
	}
</style>
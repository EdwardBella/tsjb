<template>
	<div :class="{'hidden':hidden}" class="pagination-container">
		<el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize"
			:layout="layout" :page-sizes="pageSizes" :pager-count="pagerCount" :total="total" v-bind="$attrs"
			@size-change="handleSizeChange" @current-change="handleCurrentChange" />
	</div>
</template>

<script>
	import {
		scrollTo
	} from '@/utils/scroll-to'

	export default {
		name: 'Pagination',
		props: {
			total: {
				required: true,
				type: Number
			},
			page: {
				type: Number,
				default: 1
			},
			limit: {
				type: Number,
				default: 20
			},
			pageSizes: {
				type: Array,
				default () {
					return [10, 20, 30, 50]
				}
			},
			// 移动端页码按钮的数量端默认值5
			pagerCount: {
				type: Number,
				default: document.body.clientWidth < 992 ? 5 : 7
			},
			layout: {
				type: String,
				default: 'total, sizes, prev, pager, next, jumper'
			},
			background: {
				type: Boolean,
				default: true
			},
			autoScroll: {
				type: Boolean,
				default: true
			},
			hidden: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			currentPage: {
				get() {
					return this.page
				},
				set(val) {
					this.$emit('update:page', val)
				}
			},
			pageSize: {
				get() {
					return this.limit
				},
				set(val) {
					this.$emit('update:limit', val)
				}
			}
		},
		methods: {
			handleSizeChange(val) {
				this.$emit('pagination', {
					page: this.currentPage,
					limit: val
				})
				if (this.autoScroll) {
					scrollTo(0, 800)
				}
			},
			handleCurrentChange(val) {
				this.$emit('pagination', {
					page: val,
					limit: this.pageSize
				})
				if (this.autoScroll) {
					scrollTo(0, 800)
				}
			}
		}
	}
</script>

<style scoped lang="less">
	/* 分页样式 */
	::v-deep .el-select .el-input .el-select__caret {
		height: 31px !important;
	}

	::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
		background: #1b5284;
	}

	::v-deep .el-pagination__editor.el-input .el-input__inner {
		height: 28px !important;
	}

	::v-deep .el-pagination .el-select .el-input .el-input__inner {
		height: 30px !important;
		line-height: 30px !important;
		font-size: 14px !important;
	}
	::v-deep .el-pagination__total{
		height: 30px !important;
		line-height: 30px !important;
	}

	.pagination-container {
		display: flex;
		justify-content: flex-end;
		padding: 20px 0px;
		border-top: 1px solid #e8e8e8;




	}

	.pagination-container {
		// background: #fff;
		padding: 20px 0px 0px 16px;
	}

	.pagination-container.hidden {
		display: none;
	}
</style>
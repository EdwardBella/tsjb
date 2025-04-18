<template>
	<ul class="tree">
		<li v-for="(node, index) in tree" :key="node.deptCode"
			:class="{'is-unfold': unfoldMap[`${level}-${node.deptCode}`]}">
			<div class="row" :class="{'is-selected': selectedRowIndex === `${level}-${node.deptCode}`}">
				<div @click="handleUnfold(level, index, node)" class="name ellipsis"
					:style="`padding-left: ${28 * (level - 1) + 10}px`" :title="node.name">
					<i :class="`img icon-${unfoldMap[`${level}-${node.deptCode}`] ? '' : 'un'}fold`"
						:style="`display: ${((node.children && node.children.length) || level < 3) ? 'inline-block' : 'none'}`"></i>
					<!--          <i v-if="node.children && node.children.length" :class="`img icon-${unfoldMap[`${level}-${node.deptCode}`] ? '' : 'un'}fold`"></i>-->
					{{ node.name }}
				</div>
				<div class="deadline ellipsis" :title="node.administrativeDivisionName">
					{{ node.administrativeDivisionName }}
				</div>
				<div class="deadline" style="width: calc(50% - 100px)">
					<el-tooltip class="item" effect="dark" :content="node.industrySectorName" placement="top-start">
						<div class="ellipsis">{{ node.industrySectorName }}</div>
					</el-tooltip>
				</div>

				<div class="operate" style="width: 100px;">
					<el-button @click="$emit('showUpdateOrganizationDialog', { node, type: 1, level, index })"
						type="primary" plain size="mini">编辑</el-button>
				</div>
			</div>
			<!-- <organizationTree v-bind="$attrs" v-on="$listeners" v-if="node.children" :tree="node.children" :level="level + 1"></organizationTree> -->
			<organizationTree v-bind="$attrs" v-on="$listeners" v-if="childrenIsShow" :tree="node.children"
				:level="level + 1"></organizationTree>
		</li>
	</ul>
</template>

<script>
	export default {
		name: "organizationTree",
		props: {
			tree: {
				type: Array,
				required: true
			},
			level: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				list: [],
				unfoldMap: {},
				selectedRowIndex: "",
				childrenIsShow: false,
			};
		},
		created() {
			this.list = this.tree;
		},
		methods: {
			handleUnfold(level, index, node) {
				this.$set(this.unfoldMap, `${level}-${node.deptCode}`, !this.unfoldMap[`${level}-${node.deptCode}`]);
				this.childrenIsShow = true
			},
		}
	};
</script>

<style lang="less" scoped>
	.tree {

		li {
			height: 40px;
			overflow: hidden;

			&.is-unfold {
				height: auto;
			}
		}

		.row {
			display: flex;
			padding: 8px 0;
			cursor: pointer;
			user-select: none;
			width: 100%;

			&>div {
				box-sizing: border-box;
				padding: 0 10px;
				width: calc(100% / 4);

			}

			&:hover {
				background: #f5f9ff;
			}

			.name {
				box-sizing: border-box;
				//width: 390px;
				line-height: 24px;
				//padding-left: 28px;

				i {
					position: relative;
					top: 2px;
				}
			}
		}
	}
</style>
<style lang="less">
	.tree {
		.info {
			&>* {
				margin: 0 20px 0 0;
			}
		}
	}
</style>
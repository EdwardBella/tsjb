/** * 作者 ：zn * * 日期 ：2017/12/08 * * 描述 ：公共左侧菜单组件 */
<template>
	<div class="leftMenu beautify-scroll mini">
		<el-menu background-color="#0a65da" text-color="#b5ccef" active-text-color="#ffffff"
			:default-active="$route.path" router unique-opened>
			<template v-for="item in options">
				<MItems :item='item' :indexp="item.menuId"></MItems>
			</template>
		</el-menu>
	</div>
</template>
<script>
	import MItems from './leftBarChild';

	export default {
		name: 'LeftBar',
		props: ["options"],
		components: {
			MItems
		},
		data() {
			return {
				opens: [], // 默认展开的菜单
				activeIndex: '',
			};
		},
		mounted: function() {
			// 根据路由匹配index
			// requestMenu({}).then(data => {
			//   let {code, msg, result} = data;
			// if (code == 'OK') {

			//     let arr = this.treeToPath(result);
			//     //循环扁平化之后的数组
			//     arr.forEach(item => {
			//       if (item.split('-')[0].toString() == this.$route.path) {
			//         this.opens = [];
			//         this.opens.push(item.split('-')[1].toString());
			//         this.activeIndex = item.split('-')[1].toString();
			//       }

			//     });
			//   }
			// });

		},
		methods: {
			handleSelect(val) {
				if (val !== this.$route.path && val !== "/") {
					this.$router.push({
						path: val
					});
				} else {
					// this.reload()
				}
			},
			// 将多层次的数组扁平化处理
			treeToPath(tree, path, currentPath) {
				currentPath = currentPath || [];
				path = path || [];
				for (let i = 0; i < tree.length; i++) {
					if (i !== 0) {
						currentPath.pop();
					}
					currentPath.push(tree[i].url + '-' + tree[i].id);

					if (tree[i].children.length) {
						this.treeToPath(tree[i].children, path, currentPath);
					} else {
						path.push(currentPath.slice(0));
					}
				}

				currentPath.pop();

				let res = [];
				for (let i in path) {
					res.push(path[i]);
				}
				res = res.join().split(',');
				return res;
			}

		}
	};
</script>
<style lang="less">
	.leftMenu {
		height: calc(100vh - 110px);
		overflow: auto;


		.el-menu {
			width: 100%;
			border: 0;




			/deep/ .el-submenu__title i {
				color: #b5ccef;
			}

			/deep/ .el-submenu.is-active>.el-submenu__title {
				color: #ffffff !important;
			}
		}

		.read {
			display: inline-block;
			height: 4px;
			width: 4px;
			border-radius: 50%;
			background: red;
		}

		// .el-submenu.is-active .el-submenu__title,
		// .el-submenu.is-opened .el-submenu__title {
		// 	background-color: rgba(60, 130, 251, .8) !important;
		// }

		.el-submenu.is-active .el-menu-item,
		.el-submenu.is-opened .el-menu-item {
			// background-color: #2456b7 !important;
		}

		.el-submenu.is-opened .router-link-exact-active {
			color: #fff;
		}

		.el-submenu.is-opened .router-link-exact-active i {
			color: #fff;
		}
	}

	.leftMenu .el-menu li {
		font-size: 20px !important;
		background-color: #2b65da !important;
	}

	.el-submenu__title {
		font-size: 20px !important;
		background-color: #2b65da !important;
	}

	.leftMenu .el-submenu.is-opened .el-submenu__title {
		background-color: #477ce5 !important;
	}
	.leftMenu .el-menu-item.is-active{
		background-color: #3871e1 !important;
	}
	.leftMenu .el-submenu.is-opened .el-menu-item{
		background-color: #18459d !important;
	}
	.leftMenu .el-submenu.is-active .el-menu-item.is-active{
		background-color: #2456b7 !important;
	}
	.el-submenu .el-submenu__icon-arrow.el-icon-arrow-down:before{
		width: 30px;
		height: 30px;
		background-size: 30px;
	}
	.el-submenu .el-submenu__icon-arrow.el-icon-arrow-down{
		margin-top: -15px;
	}
	.el-menu-item::after{
		width: 8px;
		height: 16px;
		margin-top: -8px;
	}
</style>
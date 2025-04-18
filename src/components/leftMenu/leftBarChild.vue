<template>
	<el-menu-item v-if="!item.children" :index="item.menuUrl">
		<template slot="title">
			<i v-if="item.menuImagePath" class="iconfont" :class="item.menuImagePath"
				style="width:20px;height:20px;font-size: 22px; margin: -4px 8px 0 4px;"></i>
			{{ item.menuName }}
		</template>
	</el-menu-item>

	<!-- 存在子菜单 -->
	<el-submenu v-else :index="item.menuId.toString()">
		<template slot="title">
			<i v-if="item.menuImagePath" class="iconfont" :class="item.menuImagePath"
				style="width:20px;height:20px;font-size: 22px; margin: -4px 8px 0 4px;"></i>
			{{ item.menuName }}
		</template>
		<template v-for="itemChild in item.children">
			<items :item="itemChild" :indexp="itemChild.menuId.toString()"></items>
		</template>
	</el-submenu>
</template>
<script>
	export default {
		name: 'items',
		props: ['item', 'indexp']
	}
</script>

<style lang="less">
	.leftMenu {
		.iconfont{
			color: #b5ccef;
			vertical-align: bottom;
		}
		.el-menu {
			

			a,
			li,
			.el-submenu__title {
				font-size: 22px;
				color: rgba(255, 255, 255, .8);

				&:active,
				&:hover {
					color: rgba(255, 255, 255, 1);
				}
			}
		}

		.icon {
			/*width: 16px;*/
			margin-top: -5px;
			margin-right: 18px;
		}
	}
	

	.leftMenu>.is-opened>.el-submenu__title a {
		color: #7cb6fb;
		font-weight: bold;
	}

	.el-icon-arrow-down:before {
		font-weight: bold;
	}

	.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
		color: #7cb6fb;
	}

	/deep/ .el-submenu.is-active>.el-submenu__title a {
		color: #ffffff !important;
	}

	.el-submenu.is-active.is-opened .el-submenu__title i {
		color: #fff;
	}


	.el-submenu.is-active .el-submenu__title a,
	.el-submenu.is-active .el-submenu__title a i {
		color: #fff;
	}

	.el-submenu.is-opened .el-submenu__title a,
	.el-submenu.is-opened .el-submenu__title a i {
		color: #fff;
	}

	.el-menu-item.is-active a {
		color: #fff;
	}

	.el-submenu__title i {
		color: #b5ccef;
	}

	.el-menu-item {
		//padding: 10px;
	}

	.xxzygl-icon {
		background: url('../../assets/images/menuIcon/xxzygl-icon.png');
	}

	.xxzybqgl-icon {
		background: url('../../assets/images/menuIcon/xxzybqgl-icon.png');
	}

	.xxzygzgl-icon {
		background: url('../../assets/images/menuIcon/xxzygzgl-icon.png');
	}

	.xxzydtzx-icon {
		background: url('../../assets/images/menuIcon/xxzydtzx-icon.png');
	}

	.xtgl-icon {
		background: url('../../assets/images/menuIcon/xtgl-icon.png');
	}

	.grzx-icon {
		background: url('../../assets/images/menuIcon/grzx-icon.png');
	}

	.rzgl-icon {
		background: url('../../assets/images/menuIcon/rzgl-icon.png');
	}

	.sjzd-icon {
		background: url('../../assets/images/menuIcon/sjzd-icon.png');
	}

	.el-submenu {

		&.is-opened,
		&.is-active {
			.xxzygl-icon {
				background: url('../../assets/images/menuIcon/xxzygl-icon-active.png');
			}

			.xxzybqgl-icon {
				background: url('../../assets/images/menuIcon/xxzybqgl-icon-active.png');
			}

			.xxzygzgl-icon {
				background: url('../../assets/images/menuIcon/xxzygzgl-icon-active.png');
			}

			.xxzydtzx-icon {
				background: url('../../assets/images/menuIcon/xxzydtzx-icon-active.png');
			}

			.xtgl-icon {
				background: url('../../assets/images/menuIcon/xtgl-icon-active.png');
			}

			.grzx-icon {
				background: url('../../assets/images/menuIcon/grzx-icon-active.png');
			}

			.rzgl-icon {
				background: url('../../assets/images/menuIcon/rzgl-icon-active.png');
			}

		}
	}

	.el-submenu {
		.el-menu-item {
			text-align: right;
			
		}
	}

	.el-menu-item {
		padding-right: 50px !important;
		position: relative;
		font-size: 20px !important;
		

		&::after {
			position: absolute;
			top: 50%;
			right: 25px;
			margin-top: -4px;
			margin-left: 24px;
			content: "";
			display: inline-block;
			width: 4px;
			height: 8px;
			background: transparent;
			border-radius: 2px;


		}

		&.is-active {
			.sjzd-icon {
				background: url('../../assets/images/menuIcon/sjzd-icon-active.png');
			}

			&::after {
				background-color: #fff;
			}

		}
	}
</style>
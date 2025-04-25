<template>
	<div class="tabs-contants" :style="{width:widthValue}">
		<span class="item" :class="[isActive === item.name ?'active':'normal']" v-for="(item,index) in tabsList"
			:key="index" @click="tabsChange(item)">{{item.name}}</span>
	</div>
</template>

<script>
	export default {
		name: 'tabs',
		props: {
			widthValue: {
				type: String,
				default: '100%'
			},
			tabOrigin: {
				type: String,
				default: ''
			},
			tabsList: {
				type: Array,
				default: []
			},
		},
		data() {
			return {
				isActive: "",
			}
		},
		watch: {
		  tabOrigin: {
		    handler(val) {
		      this.isActive = val
		    },
		    deep: true,
		    immediate: true
		  }
		},
		created() {

		},
		methods: {
			tabsChange(res) {
				this.isActive = res.name
			}

		}
	}
</script>

<style scoped lang="less">
	.tabs-contants {
		display: flex;
		align-items: center;
		background-color: #F0F5FF;
		border: 1px solid #2C65DA;
		border-radius: 4px;
		cursor: pointer;

		.item {
			flex: 1;
			font-size: 16px;
			line-height: 30px;
			text-align: center;
			border-radius: 3px;
			font-weight: bold;
		}

		.active {
			background-color: #2C65DA;
			color: #fff;
		}

		.normal {
			background-color: #F0F5FF;
			color: #2C65DA;
		}
	}
</style>
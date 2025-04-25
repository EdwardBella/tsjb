<template>
	<card>
		<div slot="content" style="position: relative;display: flex;flex-direction: column;">
			<div style="margin-bottom: 10px;display: flex;align-items: center;">
				<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
				<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">结案案件</span>
			</div>
			<div class="contents-top">
				<div class="header-tab" style="flex: 1;color: #666;">
					<span style="font-size: 18px;font-weight: 900;">结案</span>
					<span style="font-size: 18px;font-weight: 900;">案件</span>
				</div>
				<div class="header-tab" style="flex: 1;">
					<span style="font-size: 28px;font-weight: bold;color: #2C65DA;">167</span>
				</div>
			</div>
			<div style="width: 100%;height: 34px;"></div>
			<div class="contents-bot" style="margin-top: 12px;">
				
				<div class="header-tab" style="width: 49%;border-right: 1px solid #fff;border-bottom: 1px solid #fff;">
					<span class="lb">办结案件</span>
					<span class="ls">167</span>
				</div>
				<div class="header-tab" style="width: 49%;border-left: 1px solid #fff;border-bottom: 1px solid #fff;">
					<span class="lb">终止案件</span>
					<span class="ls">167</span>
				</div>
				<div class="header-tab" style="width: 49%;border-right: 1px solid #fff;border-top: 1px solid #fff;">
					<span class="lb">环比</span>
					<span class="ls">167</span>
				</div>
				<div class="header-tab" style="width: 49%;border-left: 1px solid #fff;border-top: 1px solid #fff;">
					<span class="lb">环比</span>
					<span class="ls">167</span>
				</div>
				
			</div>

		</div>
	</card>
</template>

<script>
	import card from '@/components/card'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'jajdLeft',
		components: {
			card,
		},
		props: {
			department: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				loading: false,
				noData: false,
				tabsList: [{
					name: '案件划分',
					value: 1,
				}, {
					name: '投诉人所属行业',
					value: 2,
				}],
				seamlessScrollOptions: {
					step: 0.4, // 数值越大速度滚动越快
					limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				},
				dataLists: [{
					name: '不作为不担当',
					count: 200,
					rate: '3.2%'
				}, {
					name: '不作为不担当',
					count: 200,
					rate: '3.2%'
				}, {
					name: '不作为不担当',
					count: 200,
					rate: '3.2%'
				}]
			}
		},
		watch: {
			department: {
				handler(val) {
					
				},
				immediate: true
			}
		},
		mounted() {
			
		},
		methods: {
			
		},


	}
</script>

<style scoped lang="less">
	.slaj-lists .auto-scroll-table>div>div:nth-child(1) .li-item:nth-child(even),
	.slaj-lists .auto-scroll-table>div>div:nth-child(2) .li-item:nth-child(odd) {
		background-color: transparent !important;
	}

	.li-item {
		display: flex;
		height: 40px;
		line-height: 40px;
		padding-left: 12px;

		.num-persent {
			display: flex;
			align-items: center;

			.num {
				width: 40px;
			}

			.out-rate {
				flex: 1;
				height: 12px;
				background-color: #DEE9FF;
				border-radius: 0px 6px 6px 0px;

				.in-rate {
					width: 50%;
					height: 100%;
					background: linear-gradient(90deg, #2C65DA 0%, #9B7AFF 100%);
					border-radius: 0px 6px 6px 0px;
				}
			}
		}

		span {
			text-align: left !important;
			font-size: 16px !important;
		}

		//&:nth-child(odd) {
		//  background-color: #fff;
		//}

		//&:nth-of-type(even) {
		//  background-color: #EBF3FE;
		//}

	}

	.contents-top {
		width: 100%;
		height: 100px;
		display: flex;
		background-color: #F0F5FF;
		align-items: center;
		border-radius: 5px;

		.header-tab {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			color: #333;
			font-weight: 900;
		}
	}

	.contents-bot {
		height: 170px;
		padding: 15px;
		display: flex;
		flex-wrap: wrap;
		background-color: #F0F5FF;
		align-items: center;
		border-radius: 5px;

		.header-tab {
			height: 49%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 16px;
			color: #333;
			font-weight: 900;

			.lb {
				padding-left: 12px;
				font-size: 16px;
				color: #666666;
				font-weight: 500;
			}

			.ls {
				margin-top: 12px;
				font-size: 20px;
				font-weight: bold;
				color: #2C65DA;
				padding-left: 12px;
			}
		}



	}

	.contents {
		width: 100%;
		height: 70px;
		display: flex;

		.header-tab {
			display: flex;
			flex-direction: column;
			font-size: 16px;
			color: #333;
			font-weight: 900;

			.lb {
				padding-left: 12px;
				font-size: 16px;
				color: #666666;
				font-weight: 500;
			}

			.ls {
				margin-top: 12px;
				font-size: 22px;
				font-weight: bold;
				color: #2C65DA;
				padding-left: 12px;
			}
		}



	}
</style>
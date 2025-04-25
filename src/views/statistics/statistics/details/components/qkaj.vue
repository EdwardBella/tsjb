<template>
	<card>
		<div slot="content" style="position: relative;">
			<div style="margin-bottom: 10px;display: flex;align-items: center;">
				<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
				<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">欠款案件</span>
				<span style="font-size: 12px;color: #666;margin-left: 12px;">单位（万元）</span>
			</div>
			<div class="contents">
				<div class="contents-left" style="width: 30%; height: 300px;">
					<div class="header-tab">
						<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
							<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">累计受理欠款</span>
							<span class="lg" style="font-size: 24px;">167</span>
						</div>
						<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
							<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">累计确认欠款</span>
							<span class="lg" style="font-size: 24px;">167</span>
						</div>
						<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
							<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">累计清理欠款</span>
							<span class="lg" style="font-size: 24px;">167</span>
						</div>

					</div>
					<div>
						<div class="header-tab">
							<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
								<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">受理欠款</span>
								<span class="lg" style="font-size: 24px;">167</span>
							</div>
							<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
								<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">确认欠款</span>
								<span class="lg" style="font-size: 24px;">167</span>
							</div>
							<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
								<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">清理欠款</span>
								<span class="lg" style="font-size: 24px;">167</span>
							</div>
						
						</div>
						<div class="header-tab">
							<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
								<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">环比</span>
								<div style="display: flex;align-items: center;">
									<span class="lg" style="font-size: 24px;">167</span>
									<img src="@/assets/images/up-ico.png" style="width: 24px;" />
								</div>
							</div>
							<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
								<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">环比</span>
								<div style="display: flex;align-items: center;">
									<span class="lg" style="font-size: 24px;">167</span>
									<img src="@/assets/images/up-ico.png" style="width: 24px;" />
								</div>
							</div>
							<div style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
								<span class="lb" style="font-size: 16px;color: #333;font-weight: 600;">环比</span>
								<div style="display: flex;align-items: center;">
									<span class="lg" style="font-size: 24px;">167</span>
									<img src="@/assets/images/down-ico.png" style="width: 24px;" />
								</div>
							</div>
						
						</div>
					</div>
					
					
				</div>
				<div style="display: flex;flex-direction: column;width: 70%; margin-left: 12px;">
					<tabs :tabsList="tabsList" tabOrigin="受理欠款金额TOP10" widthValue="400px" />
					<div class="slaj-lists">
						<div class="header-tab">
							<span style="flex: 2.2;">案件名称</span>
							<span style="flex: 1;">受理欠款金额(万元)</span>
							<span style="flex: 1;">所属区域</span>
						</div>
						<vueSeamlessScroll :data="dataLists" :class-option="seamlessScrollOptions"
							style="height: 218px; overflow: hidden" class="auto-scroll-table">
							<ul>
								<li v-for="(item, index) in dataLists" :key="index" class="li-item">
									<span class="ellipsis" style="flex: 2.2;">{{ item.name }}</span>
									<span style="flex: 1;">{{ item.count }}</span>
									<span class="ellipsis" style="flex: 1;">{{ item.count }}</span>
								</li>
							</ul>
						</vueSeamlessScroll>
					</div>
				</div>
			</div>

		</div>
	</card>

</template>

<script>
	import tabs from "./tabs";
	import card from '@/components/card'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'qkaj',
		components: {
			card,
			tabs
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
					name: '受理欠款金额TOP10',
					value: 1,
				}, {
					name: '清理欠款金额TOP10',
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
		mounted() {
			
		},
		methods: {
			
		},


	}
</script>

<style scoped lang="less">
	
	.contents-left{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.header-tab{
			padding: 12px;
			height: 70px;
			background-color: #F0F5FF;
			display: flex;
			.lb{
				font-size: 16px;
				color: #666;
			}
			.lg{
				font-size: 16px;
				color: #7E96D8;
				font-weight: 900;
			}
		}
	}
	
	.auto-scroll-table>div>div:nth-child(1) .li-item:nth-child(even),
	.auto-scroll-table>div>div:nth-child(2) .li-item:nth-child(odd) {
		background-color: #EBF3FE;
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

		&:nth-child(odd) {
		 background-color: #fff;
		}

		&:nth-of-type(even) {
		 background-color: #EBF3FE;
		}

	}

	.contents {
		width: 100%;
		display: flex;

		.slaj-lists {
			display: flex;
			flex-direction: column;

			.header-tab {
				height: 50px;
				display: flex;
				align-items: center;
				padding-left: 12px;
				font-size: 18px;
				color: #333;
				font-weight: 900;
			}
		}

		.ls {
			font-size: 16px;
			font-weight: bold;
			color: #2C65DA;
			padding-left: 12px;
		}
	}
</style>
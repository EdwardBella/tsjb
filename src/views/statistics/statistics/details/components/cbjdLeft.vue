<template>
	<div style="width: 100%;display: flex;">
		<card style="width: 50%;">
			<div slot="content" style="position: relative;">
				<div style="margin-bottom: 10px;display: flex;align-items: center;">
					<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
					<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">查办案件</span>
				</div>
				<div ref="chart" style="width: 100%; height: 180px"></div>
				<div class="contents">
					<div class="header-tab" style="flex: 1.3;">
						<span class="lb">确认接收</span>
						<span class="ls">167</span>
					</div>
					<div class="header-tab" style="flex: 1;">
						<span class="lb">环比</span>
						<div style="margin-top: 12px;">
							<span class="ls">3.5%</span>
						</div>

					</div>
				</div>
				<div class="contents-bot">
					<div class="header-tab" style="flex: 1.3;">
						<div>
							<span class="lb">直办案件</span>
							<span class="ls">167</span>
						</div>
						<div>
							<span class="lb">交办案件</span>
							<span class="ls">167</span>
						</div>

					</div>
					<div class="header-tab" style="flex: 1;">
						<div>
							<span class="lb">转办案件</span>
							<span class="ls">167</span>
						</div>
						<div>
							<span class="lb">指定办理</span>
							<span class="ls">167</span>
						</div>

					</div>
				</div>

			</div>
		</card>
		<card style="width: 50%;margin-top: 0px;margin-left: 10px;">
			<div slot="content" style="position: relative;">
				<div class="contents-bot" style="height: 120px;">
					<div class="header-tab" style="flex: 1.5;justify-content: center;">
						<span class="lb" style="font-size: 18px;font-weight: bold;">当前终止案件</span>
						<span class="lg ls">167</span>
					
					</div>
					<div class="header-tab" style="flex: 1;">
						<div>
							<span class="lb" style="font-size: 16px;">发起终止</span>
							<span class="lg ls">167</span>
						</div>
						<div>
							<span class="lb" style="font-size: 16px;">继续办理</span>
							<span class="lg ls">167</span>
						</div>
					
					</div>
				</div>
				<div class="contents-bot" style="height: 234px;margin-top: 12px;">
					<div class="header-tab" style="flex: 1.5;justify-content: center;">
						<span class="lb" style="font-size: 18px;font-weight: bold;">当前延期案件数</span>
						<span class="lg ls">167</span>
					</div>
					<div class="header-tab" style="flex: 1;">
						<div>
							<span class="lb" style="font-size: 16px;">一次延期</span>
							<span class="lg ls">167</span>
						</div>
						<div>
							<span class="lb" style="font-size: 16px;">二次延期</span>
							<span class="lg ls">167</span>
						</div>
						<div>
							<span class="lb" style="font-size: 16px;">三次延期</span>
							<span class="lg ls">167</span>
						</div>
					
					</div>
				</div>

			</div>
		</card>
	</div>

</template>

<script>
	import card from '@/components/card'
	import * as echarts from 'echarts'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'cbjdLeft',
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
			this.playLoadData()
		},
		methods: {
			playLoadData() {
				// this.loading = true
				// statisticsAPI[this.api]({
				// 		administrativeDivisionId: this.department
				// 	})
				// 	.then(res => {
				// 		if (!res.result) {
				// 			this.noData = true
				// 		}
				// 		this.$nextTick(() => this.initChart(res.result || []))
				// 	})
				// 	.finally(() => {
				// 		this.loading = false
				// 	})
				this.initChart()
			},

			initChart() {
				if (!this.chart) {
					this.chart = echarts.init(this.$refs.chart)
				}

				let option = {
					tooltip: {
						trigger: 'item'
					},
					title: {
						text: '总数',
						top: '37%',
						left: 'center',
						subtext: '1000'
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						center: ['50%', '50%'],
						radius: ['60%', '95%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: 'Search Engine'
							},
							{
								value: 735,
								name: 'Direct'
							},
							{
								value: 580,
								name: 'Email'
							}
						]
					}]
				};

				this.chart.setOption(option)
			}
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

	.contents-bot {
		width: 100%;
		height: 80px;
		display: flex;
		background-color: #F0F5FF;
		align-items: center;
		border-radius: 5px;

		.header-tab {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 16px;
			color: #333;
			font-weight: 900;

			.lb {
				padding-left: 12px;
				font-size: 15px;
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
			.lg{
				font-size: 24px;
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
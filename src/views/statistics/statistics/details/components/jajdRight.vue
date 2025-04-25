<template>
	<card>
		<div slot="content" style="position: relative;">
			<div class="contents">
				<div style="margin-bottom: 10px;display: flex;align-items: center;">
					<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
					<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">满意度</span>
				</div>
				<tabs :tabsList="tabsList" tabOrigin="评价满意度" widthValue="300px" />
				<div ref="chart" style="width: 100%; height: 314px"></div>
			</div>

		</div>
	</card>
</template>

<script>
	import tabs from "./tabs";
	import card from '@/components/card'
	import * as echarts from 'echarts'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'jajdRight',
		components: {
			card,
			tabs,
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
					name: '评价满意度',
					value: 1,
				}, {
					name: '回访满意度',
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
						top: '40%',
						left: '25%',
						subtext: '1000'
					},
					legend: {
						type: "scroll",
						orient: "vertical",
						right: "10%",
						top: "center",
						itemGap: 30,
						selectedMode: true,
						data: ["5星", "4星", "3星","2星","1星"],
						textStyle: {
							color: "#77899c",
							rich: {
								uname: {
									width: 60,
									fontSize: 16,
								},
								unum: {
									color: "#4ed139",
									width: 40,
									fontSize: 18,
									align: "right",
								},
							},
						},
						formatter(name) {
							return `{uname|${name}}{unum|1132}`;
						},
					},
					series: [{
						name: '满意度',
						type: 'pie',
						center: ['30%', '50%'],
						radius: ['40%', '70%'],
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
								name: '5星'
							},
							{
								value: 735,
								name: '4星'
							},
							{
								value: 580,
								name: '3星'
							},{
								value: 580,
								name: '2星'
							},{
								value: 580,
								name: '1星'
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
	.auto-scroll-table>div>div:nth-child(1) .li-item:nth-child(even),
	.auto-scroll-table>div>div:nth-child(2) .li-item:nth-child(odd) {
		// background-color: #EBF3FE;
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

	.contents {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
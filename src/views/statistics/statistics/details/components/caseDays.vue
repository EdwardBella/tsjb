<template>
	<div ref="chart" style="width: 100%; height: 170px"></div>
</template>

<script>
	import * as echarts from 'echarts'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'caseDays',
		components: {

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
						trigger: "axis",
						confine: true,
						axisPointer: {
							type: "shadow",
						},
					},
					grid: {
						left: "4%",
						right: "2%",
						top: "3%",
						bottom: "2%",
						containLabel: true,
					},
					xAxis: {
						type: "category",
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
						axisLine: {
							lineStyle: {
								color: "#d2e0f4",
							},
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							show: false,
							color: "#333",
						},
					},
					yAxis: {
						type: "value",
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: "#e6effc",
							},
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#d2e0f4",
							},
						},
						axisLabel: {
							show: false,
							color: "#333",
						},
					},
					barWidth: 30,
					series: [{
						name: "收到线索",
						type: "line",
						smooth: true,
						showSymbol: false,
						symbol: "circle",
						symbolSize: 6,
						data: [
							"1200",
							"1400",
							"1008",
							"1411",
							"1026",
							"1288",
							"1300",
						],
						itemStyle: {
							normal: {
								color: "#FFE668",
							},
						},
						lineStyle: {
							normal: {
								width: 2,
							},
						},
					}, {
						name: "受理案件",
						type: "line",
						smooth: true,
						showSymbol: false,
						symbol: "circle",
						symbolSize: 6,
						data: [
							"800",
							"678",
							"345",
							"654",
							"900",
							"345",
							"657",
						],
						itemStyle: {
							normal: {
								color: "#2C65DA",
							},
						},
						lineStyle: {
							normal: {
								width: 2,
							},
						},
					}, {
						name: "结案案件",
						type: "line",
						smooth: true,
						showSymbol: false,
						symbol: "circle",
						symbolSize: 6,
						data: [
							"234",
							"123",
							"89",
							"453",
							"344",
							"278",
							"99",
						],
						itemStyle: {
							normal: {
								color: "#6BB2FF",
							},
						},
						lineStyle: {
							normal: {
								width: 2,
							},
						},
					}, ],
				};

				this.chart.setOption(option)
			}
		},


	}
</script>

<style scoped lang="less">
	.auto-scroll-table>div>div:nth-child(1) .li-item:nth-child(even),
	.auto-scroll-table>div>div:nth-child(2) .li-item:nth-child(odd) {
		background-color: #EBF3FE;
	}

	.li-item {
		display: flex;
		height: 40px;
		line-height: 40px;
		padding-left: 12px;

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
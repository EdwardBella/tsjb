<template>
	<card>
		<div slot="content" style="position: relative;">
			<div style="margin-bottom: 10px;display: flex;align-items: center;">
				<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
				<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">投诉对象</span>
			</div>
			<div class="contents">
				<div style="display: flex;flex-direction: column;flex: 1;">
					<tabs :tabsList="tabsList" tabOrigin="所属区域" widthValue="300px" />
					<div v-loading="loading" ref="chart" class="chart" style="width: 100%; height: 350px">
						<div v-if="noData" class="tips">没有数据</div>
					</div>
				</div>
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
		name: 'tsdx',
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
					name: '所属区域',
					value: 1,
				}, {
					name: '部门归口',
					value: 2,
				}],
				customOptionsMap: [{
						key: 'commitNumber',
						name: '提交数'
					},
					{
						key: 'acceptNumber',
						name: '受理数'
					},
					{
						key: 'handledNumber',
						name: '结案数'
					}
				]
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
						axisPointer: {
							type: "shadow",
						},
					},
					grid: {
						left: "2%",
						right: "2%",
						bottom: "5%",
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
							color: "#333",
						},
					},
					yAxis: {
						type: "value",
						name: "单位(件)",
						nameTextStyle:{
							color:"#333"
						},
						splitLine: {
							show: false,
							lineStyle: {
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
							color: "#333",
						},
					},
					barWidth: 30,
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: "bar",
						label: {
							show: true,
							position: "top"
						},
						itemStyle: {
							color: '#2C65DA',
							borderRadius: [4, 4, 0, 0],
						},
					}, ],
				};

				this.chart.setOption(option)
			}
		},


	}
</script>

<style scoped>

</style>
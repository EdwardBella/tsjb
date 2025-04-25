<template>
	<card>
		<div slot="content" style="position: relative;">
			<div style="margin-bottom: 10px;display: flex;align-items: center;">
				<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
				<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">办案质效统计</span>
				<div style="flex: 1;display: flex;justify-content: flex-end;">
					<el-select v-model="searchValue" placeholder="请选择" style="width: 260px;" @change="search">
						<el-option label="结案情况" value="1"></el-option>
						<el-option label="跟踪问效" value="2"></el-option>
						<el-option label="清理欠款" value="3"></el-option>
					</el-select>
				</div>
			</div>
			<div class="contents">
				<div ref="chart11" style="width: 100%; height: 330px"></div>
			</div>

		</div>
	</card>
</template>

<script>
	import card from '@/components/card'
	import * as echarts from 'echarts'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'bazxtj',
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
				searchValue: '1',
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
			search() {

			},
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
					this.chart = echarts.init(this.$refs.chart11)
				}

				let option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
						},
					},
					legend: {
						left: '2%',
						data: [
							"直接访问",
							"邮件营销",
							"联盟广告",
							"视频广告",
							"搜索引擎",
							"百度",
							"谷歌",
							"必应",
							"其他",
						],
					},
					grid: {
						left: "2%",
						right: "2%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: [{
						type: "category",
						axisLine: {
							lineStyle: {
								color: "#d2e0f4",
							},
						},
						axisLabel: {
							color: "#333",
						},
						data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
					}],
					yAxis: [{
						type: "value",
						splitLine: {
							show: false,
						},
						axisLabel: {
							color: "#333",
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#d2e0f4",
							},
						},
					}, ],
					series: [{
							name: "直接访问",
							type: "bar",
							data: [320, 332, 301, 334, 390, 330, 320],
						},
						{
							name: "邮件营销",
							type: "bar",
							stack: "广告",
							data: [120, 132, 101, 134, 90, 230, 210],
						},
						{
							name: "联盟广告",
							type: "bar",
							stack: "广告",
							data: [220, 182, 191, 234, 290, 330, 310],
						},
						{
							name: "视频广告",
							type: "bar",
							stack: "广告",
							data: [150, 232, 201, 154, 190, 330, 410],
						},
						{
							name: "搜索引擎",
							type: "bar",
							data: [862, 1018, 964, 1026, 1679, 1600, 1570],
						},
						{
							name: "百度",
							type: "bar",
							barWidth: 5,
							stack: "搜索引擎",
							data: [620, 732, 701, 734, 1090, 1130, 1120],
						},
						{
							name: "谷歌",
							type: "bar",
							stack: "搜索引擎",
							data: [120, 132, 101, 134, 290, 230, 220],
						},
						{
							name: "必应",
							type: "bar",
							stack: "搜索引擎",
							data: [60, 72, 71, 74, 190, 130, 110],
						},
						{
							name: "其他",
							type: "bar",
							stack: "搜索引擎",
							data: [62, 82, 91, 84, 109, 110, 120],
						},
					],
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
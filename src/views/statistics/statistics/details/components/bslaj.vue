<template>
	<card>
		<div slot="content" style="position: relative;">
			<div style="margin-bottom: 10px;display: flex;align-items: center;">
				<img src="@/assets/images/title-pre-ico.png" style="width: 40px;" />
				<span style="font-size: 18px;color: #2C65DA;font-weight: 900;">不受理案件</span>
			</div>
			<div class="contents">
				<div style="width: 50%; display: flex;">
					<div style="display: flex;flex-direction: column;flex: 1;">
						<div ref="chart" style="width: 100%; height: 282px"></div>
					</div>
				</div>

				<div style="width: 50%;">
					<div class="slaj-lists">
						<div class="header-tab">
							<span style="flex: 4;">不受理类型</span>
							<span style="flex: 1;">数量</span>
						</div>
						<vueSeamlessScroll :data="dataLists" :class-option="seamlessScrollOptions"
							style="height: 232px; overflow: hidden" class="auto-scroll-table">
							<ul>
								<li v-for="(item, index) in dataLists" :key="index" class="li-item">
									<div class="dot-cn"></div>
									<span class="ellipsis" style="flex: 4;">{{ item.name }}</span>
									<span style="flex: 1;color: #2C65DA;">{{ item.count }}</span>
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
	import vueSeamlessScroll from "@/components/vue-seamless-scroll";
	import tabs from "./tabs";
	import card from '@/components/card'
	import * as echarts from 'echarts'
	import * as statisticsAPI from '@/api/statistics'
	export default {
		name: 'bslaj',
		components: {
			card,
			tabs,
			vueSeamlessScroll,
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

				var qxzbData = [{
						name: "处理中",
						value: 500,
						full: 1000, // 最大值
					},
					{
						name: "超期中",
						value: 756,
						full: 1000,
					},
					{
						name: "延期中",
						value: 800,
						full: 1000,
					},
				];
				var returnData = function(qxzbData, name) {
					for (var a = 0; a < qxzbData.length; a++) {
						if (qxzbData[a].name == name) {
							return qxzbData[a].value;
						}
					}
				};

				let option = {
					tooltip: {
						trigger: "item",
						formatter: function(rsp) {
							if (rsp.name != "") {
								return (
									rsp.name +
									"<br/>" +
									rsp.marker +
									" " +
									rsp.value +
									" （" +
									rsp.percent +
									"）"
								);
							}
						},
					},
					color: ["#FFC400", "#34C7E5", "#2B69BB"],
					series: [{
							name: qxzbData[0].name, //最里面的圈
							type: "pie",
							clockWise: true, //顺时加载
							radius: ["25%", "32%"],
							center: ["50%", "50%"],
							label: {
								normal: {
									show: false,
								},
							},
							labelLine: {
								show: false,
							},
							itemStyle: {
								emphasis: {
									show: false,
								},
							},
							data: [{
									value: qxzbData[0].value,
									name: qxzbData[0].name,
								},
								{
									value: qxzbData[0].full,
									itemStyle: {
										normal: {
											color: "#CEFFCB",
										},
									},
								},
							],
						},
						{
							name: qxzbData[1].name, //第二个圈
							type: "pie",
							clockWise: true, //顺时加载
							radius: ["33%", "40%"],
							center: ["50%", "50%"],
							label: {
								normal: {
									show: false,
								},
							},
							labelLine: {
								show: false,
							},
							itemStyle: {
								emphasis: {
									show: false,
								},
							},
							data: [{
									value: qxzbData[1].value,
									name: qxzbData[1].name,
								},
								{
									value: qxzbData[1].full,
									itemStyle: {
										normal: {
											color: "#CEFFCB",
										},
									},
								},
							],
						},
						{
							name: qxzbData[2].name, //最外层圈
							type: "pie",
							clockWise: true, //顺时加载
							radius: ["41%", "48%"],
							center: ["50%", "50%"],
							label: {
								normal: {
									show: false,
								},
							},
							labelLine: {
								show: false,
							},
							itemStyle: {
								emphasis: {
									show: false,
								},
							},
							data: [{
									value: qxzbData[2].value,
									name: qxzbData[2].name,
								},
								{
									value: qxzbData[2].full,
									itemStyle: {
										normal: {
											color: "#CEFFCB",
										},
									},
								},
							],
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
		align-items: center;
		.dot-cn{
			width: 14px;
			height: 14px;
			border-radius: 2px;
			background-color: #6BB2FF;
			margin-right: 10px;
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
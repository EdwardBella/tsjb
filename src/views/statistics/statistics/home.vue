<template>
	<div style="margin-top: 10px;">
		<el-row :gutter="10">
			<el-col :span="13">
				<div>
					<tabs :tabsList="tabsList1" tabOrigin="近7天" />
					<card style="margin-top: 12px;">
						<div class="one" slot="content" style="position: relative;">
							<div class="one-left" style="padding-right: 18px;">
								<span class="title">收到线索</span>
								<span class="value">172</span>
								<span class="rate">环比</span>
								<div class="bj-rate">
									<span>3.2%</span>
								</div>
							</div>
							<div class="one-left"
								style="padding: 10px 18px;border-left: 1px solid #E5E5E5;border-right: 1px solid #E5E5E5;">
								<span class="title">受理案件</span>
								<span class="value">172</span>
								<span class="rate">环比</span>
								<div class="bj-rate">
									<span>3.2%</span>
								</div>
							</div>
							<div class="one-left" style="padding-left: 18px;">
								<span class="title">结案案件</span>
								<span class="value">172</span>
								<span class="rate">环比</span>
								<div class="bj-rate">
									<span>3.2%</span>
								</div>
							</div>
							<div style="flex: 1;">
								<div ref="chart" style="width: 100%; height: 170px"></div>
							</div>

						</div>
					</card>
				</div>
			</el-col>
			<el-col :span="11">
				<card>
					<div slot="content">
						<div class="cardList" slot="content">
							<div style="width: 100%;display: flex;margin-bottom: 12px;">
								<div class="cardItem" style="margin-right: 12px;">
									<div class="cardTitle">累计收到线索</div>
									<div class="cardContent">
										<span style="flex: 1;text-align: left;font-size: 32px;color:#2C65DA;">0</span>
										<div style="display: flex;align-items: center;">
											<span
												style="flex: 1;text-align: left;font-size: 15px;color:#4E5969;">日均：</span>
											<span style="color: #4E5969;font-size: 24px;">18</span>
										</div>
									</div>
								</div>
								<div class="cardItem">
									<div class="cardTitle">累计受理案件</div>
									<div class="cardContent">
										<span style="flex: 1;text-align: left;font-size: 32px;color:#2C65DA;">0</span>
										<div style="display: flex;align-items: center;">
											<span
												style="flex: 1;text-align: left;font-size: 15px;color:#4E5969;">日均：</span>
											<span style="color: #4E5969;font-size: 24px;">18</span>
										</div>
									</div>
								</div>
							</div>
							<div style="width: 100%;display: flex;">
								<div class="cardItem" style="margin-right: 12px;">
									<div class="cardTitle">累计结案案件</div>
									<div class="cardContent">
										<span style="flex: 1;text-align: left;font-size: 32px;color:#2C65DA;">0</span>
										<div style="display: flex;align-items: center;">
											<span
												style="flex: 1;text-align: left;font-size: 15px;color:#4E5969;">日均：</span>
											<span style="color: #4E5969;font-size: 24px;">18</span>
										</div>
									</div>
								</div>
								<div class="cardItem">
									<div class="cardTitle">结案率</div>
									<div class="cardContent">
										<span style="flex: 1;text-align: left;font-size: 32px;color:#2C65DA;">
											1%
										</span>
									</div>
								</div>
							</div>


						</div>

					</div>
				</card>
			</el-col>
			<el-col :span="24">
				<div class="card-title">
					<span>受理阶段分析</span>
				</div>
			</el-col>


		</el-row>

		<el-row style="margin-bottom: 10px;" :gutter="10">
			<el-col :span="12">
				<slaj />
			</el-col>
			<el-col :span="12">
				<bslaj />
			</el-col>
		</el-row>

		<el-row style="margin-bottom: 10px;" :gutter="10">
			<el-col :span="8">
				<topTen title="投诉举报人" />
			</el-col>
			<el-col :span="8">
				<topTen title="投诉对象" />
			</el-col>
			<el-col :span="8">
				<topTen title="系统领域" />
			</el-col>
		</el-row>
		<!-- 投诉对象 -->
		<el-row>
			<el-col :span="24">
				<tsdx />
			</el-col>

		</el-row>
		<el-row>
			<el-col :span="24">
				<div class="card-title">
					<span>查办阶段分析</span>
				</div>
			</el-col>
		</el-row>

		<el-row :gutter="10">
			<el-col :span="12">
				<cbjdLeft />
			</el-col>
			<el-col :span="12">
				<cbjdRight />
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="24">
				<div class="card-title">
					<span>结案阶段分析</span>
				</div>
			</el-col>
		</el-row>

		<el-row style="margin-bottom: 10px;" :gutter="10">
			<el-col :span="4">
				<jajdLeft />
			</el-col>
			<el-col :span="10">
				<jajdMid />
			</el-col>
			<el-col :span="10">
				<jajdRight />
			</el-col>
		</el-row>

		<!-- 跟踪问效 -->
		<el-row style="margin-bottom: 10px;">
			<el-col :span="24">
				<gzwx />
			</el-col>
		</el-row>

		<!-- 欠款案件 -->
		<el-row style="margin-bottom: 10px;">
			<el-col :span="24">
				<qkaj />
			</el-col>
		</el-row>

		<!-- 办案质效统计 -->
		<el-row>
			<el-col :span="24">
				<bazxtj />
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import bazxtj from "./details/components/bazxtj";
	import qkaj from "./details/components/qkaj";
	import jajdRight from "./details/components/jajdRight";
	import jajdMid from "./details/components/jajdMid";
	import jajdLeft from "./details/components/jajdLeft";
	import cbjdLeft from "./details/components/cbjdLeft";
	import cbjdRight from "./details/components/cbjdRight";
	import tsdx from "./details/components/tsdx";
	import gzwx from "./details/components/gzwx";
	import slaj from "./details/components/slaj";
	import topTen from "./details/components/topTen";
	import bslaj from "./details/components/bslaj";
	import tabs from "./details/components/tabs";
	import * as statisticsAPI from "@/api/statistics";
	import {
		queryWorkOrderByType,
		queryWorkOrderDepartment,
		queryWorkOrderDepartmentWithParam,
		queryworkorderIndustry,
		queryWorkorderIndustryDetail,
		queryWorkOrderSatisfactionLevel,
		queryWorkOrderSource,
		queryWorkOrderSurvey,
		queryWorkOrderSurveyChart,
		queryWorkOrderType,
		satisfactionStatusByCity
	} from "@/api/statistics";
	import * as echarts from "echarts";
	import card from "@/components/card";
	import {
		workOrderEventSourceDict,
		workOrderStatusDict
	} from "@/utils/dict";

	export default {
		name: "home",
		components: {
			card,
			tabs,
			slaj,
			bslaj,
			topTen,
			tsdx,
			cbjdLeft,
			cbjdRight,
			jajdLeft,
			jajdMid,
			jajdRight,
			gzwx,
			qkaj,
			bazxtj,
		},
		data() {
			return {
				loading: true,
				tabsList1: [{
					name: '近7天',
					value: 7,
				}, {
					name: '近30天',
					value: 30,
				}, {
					name: '自定义',
					value: 0,
				}],
				chart: null,
				currentData: null,
			};
		},
		watch: {

		},
		created() {},
		mounted() {
			this.initChart()
		},
		methods: {
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
						left: "6%",
						right: "2%",
						top: "3%",
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
						name: "今日",
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
								color: "#f7b851",
							},
						},
						lineStyle: {
							normal: {
								width: 3,
							},
						},
					}, ],
				};

				this.chart.setOption(option)
			}
		}
	};
</script>

<style lang="less" scoped>
	::v-deep .el-radio-group {
		width: 100%;
	}

	.card-title {
		width: 100%;
		height: 47px;
		background-color: #fff;
		box-shadow: 0px 0px 1px 0px rgba(19, 51, 115, 0.25);
		margin: 12px 0px;
		display: flex;
		align-items: center;
		font-size: 22px;
		color: #2C65DA;
		font-weight: bold;
		border-radius: 4px;

		span {
			margin-left: 20px
		}
	}

	.one {
		display: flex;



		.one-left {
			padding: 10px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 16px;
				color: #666;
			}

			.value {
				font-size: 28px;
				font-weight: bold;
				color: #2C65DA;
			}

			.rate {
				font-size: 15px;
				color: #666;
			}

			.bj-rate {
				font-size: 20px;
				color: #478D24;
				font-weight: bold;
			}
		}
	}


	.cardList {
		display: flex;
		flex-direction: column;
	}

	.cardItem {
		flex: 1;
		height: 101px;
		box-sizing: border-box;
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
		background: linear-gradient(180deg, #F2F9FE 0%, #E6F4FE 100%);
	}


	.cardTitle {
		height: 33px;
		line-height: 33px;
		width: 100%;
		padding-left: 15px;
		font-size: 18px;
		font-weight: bold;
		color: #1D252F;
	}

	.cardContent {
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.cardContent {
		padding: 17px 15px 0px 15px;
	}

	.back {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000
	}

	.topBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tableSelect {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.table-header {
		background-color: #EBF3FE;
		font-weight: bold;
	}
</style>

<style lang="less">
	.auto-scroll-table>div>div:nth-child(1) .li-item:nth-child(even),
	.auto-scroll-table>div>div:nth-child(2) .li-item:nth-child(odd) {
		background-color: #EBF3FE;
	}

	.table-header,
	.li-item {
		display: flex;
		height: 40px;
		line-height: 40px;

		//&:nth-child(odd) {
		//  background-color: #fff;
		//}

		//&:nth-of-type(even) {
		//  background-color: #EBF3FE;
		//}

		&>span:last-child,
		&>span:first-child {
			width: 180px;
			text-align: center;
		}

		&>span:nth-child(2) {
			flex: 1;
		}
	}
</style>
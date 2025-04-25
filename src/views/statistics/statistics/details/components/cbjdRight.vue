<template>
	<card>
		<div slot="content" style="position: relative;">
			<div class="contents">
				<tabs :tabsList="tabsList" tabOrigin="承办案件用时TOP10" widthValue="80%" />
				<div class="slaj-lists">
					<div class="header-tab">
						<span style="flex: 2;">案件名称</span>
						<span style="flex: 1;">办理时间</span>
						<span style="flex: 1;">承办单位</span>
					</div>
					<vueSeamlessScroll :data="dataLists" :class-option="seamlessScrollOptions"
						style="height: 294px; overflow: hidden" class="auto-scroll-table">
						<ul>
							<li v-for="(item, index) in dataLists" :key="index" class="li-item">
								<span class="ellipsis" style="flex: 2;">{{ item.name }}</span>
								<span style="flex: 1;">{{ item.count }}</span>
								<span class="ellipsis" style="flex: 1;">{{ item.rate }}</span>
								
							</li>
						</ul>
					</vueSeamlessScroll>
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
		name: 'cbjdRight',
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
				tabsList: [{
					name: '承办案件用时TOP10',
					value: 1,
				}, {
					name: '办理超期TOP10',
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
				dataLists:[{
					name:'不作为不担当',
					count:200,
					rate:'3.2%'
				},{
					name:'不作为不担当',
					count:200,
					rate:'3.2%'
				},{
					name:'不作为不担当',
					count:200,
					rate:'3.2%'
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
						top: '50%',
						left: 'center',
						subtext: '1000'
					},
					legend: {
						top: '5%',
						left: 'center',
						itemWidth: 14,
						itemHeight: 14
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						center: ['50%', '60%'],
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
		background-color: #EBF3FE;
	}
	.li-item {
		display: flex;
		height: 40px;
		line-height: 40px;
		padding-left: 12px;
		
		.num-persent{
			display: flex;
			align-items: center;
			.num{
				width: 40px;
			}
			.out-rate{
				flex: 1;
				height: 12px;
				background-color: #DEE9FF;
				border-radius: 0px 6px 6px 0px;
				.in-rate{
					width: 50%;
					height: 100%;
					background: linear-gradient(90deg, #2C65DA 0%, #9B7AFF 100%);
					border-radius: 0px 6px 6px 0px;
				}
			}
		}
		
		span{
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

		.slaj-lists {
			width: 100%;
			display: flex;
			flex-direction: column;

			.header-tab {
				height: 40px;
				display: flex;
				align-items: center;
				padding-left: 12px;
				font-size: 16px;
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
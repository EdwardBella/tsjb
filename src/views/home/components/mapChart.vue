<template>
	<div v-loading="loading" ref="chart" class="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
	import card from '@/components/card'
	import * as echarts from 'echarts'
	import * as statisticsAPI from '@/api/statistics'
	import {
		henan
	} from './HeNan'
	export default {
		name: 'mapChart',
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
				
				// var timeFn = null;
				
				// //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
				// this.chart.on("click", function (params) {
				//   clearTimeout(timeFn);
				//   //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
				//   timeFn = setTimeout(function () {
				//     var name = params.name; //地区name
				//     var mapCode = provinces[name]; //地区的json数据
				//     if (!mapCode) {
				//       alert("无此区域地图显示");
				//       return;
				//     }
				
				//     loadMap(mapCode, name);
				//   }, 250);
				// });
				
				// // 绑定双击事件，返回全国地图
				// this.chart.on("dblclick", function (params) {
				//   //当双击事件发生时，清除单击事件，仅响应双击事件
				//   clearTimeout(timeFn);
				
				//   //返回全国地图
				//   loadMap("/asset/get/s/data-1527045631990-r1dZ0IM1X.json", "china");
				// });

				//各省份的数据
				var allData = [{
						name: "郑州市",
						value: 100,
					},
					{
						name: "开封市",
						value: 100,
					},
					{
						name: "洛阳市",
						value: 100,
					},
					{
						name: "平顶山市",
						value: 100,
					},
					{
						name: "安阳市",
						value: 100,
					},
					{
						name: "鹤壁市",
						value: 100,
					},
					{
						name: "新乡市",
						value: 100,
					},
					{
						name: "焦作市",
						value: 100,
					},
					{
						name: "濮阳市",
						value: 100,
					},
					{
						name: "许昌市",
						value: 100,
					},
					{
						name: "漯河市",
						value: 100,
					},
					{
						name: "三门峡市",
						value: 100,
					},
					{
						name: "南阳市",
						value: 100,
					},
					{
						name: "商丘市",
						value: 100,
					},
					{
						name: "信阳市",
						value: 100,
					},
					{
						name: "周口市",
						value: 100,
					},
					{
						name: "驻马店市",
						value: 100,
					},
					{
						name: "济源市",
						value: 100,
					}

				];
				
				console.log(henan,'======================')
				echarts.registerMap('henan', henan);
				var option = {
					tooltip: {
						show: true,
						formatter: function(params) {
							if (params.data) return params.name + "：" + params.data["value"];
						},
					},
					visualMap: {
						type: "continuous",
						text: ["", ""],
						showLabel: true,
						left: "50",
						min: 0,
						max: 100,
						inRange: {
							color: ["#edfbfb", "#b7d6f3", "#40a9ed", "#3598c1", "#215096"],
						},
						splitNumber: 0,
					},
					series: [{
						name: "河南",
						type: "map",
						mapType: 'henan',
						selectedMode: "false", //是否允许选中多个区域
						label: {
							normal: {
								show: true,
							},
							emphasis: {
								show: true,
							},
						},
						data: allData,
					}, ],
				};
				this.chart.setOption(option);

				
			}
		},


	}
</script>

<style scoped>

</style>
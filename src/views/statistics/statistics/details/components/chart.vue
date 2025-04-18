<template>
  <div v-loading="loading" ref="chart" class="chart" style="width: 100%; height: 550px">
    <div v-if="noData" class="tips">没有数据</div>
  </div>
</template>

<script>
import card from '@/components/card'
import * as echarts from 'echarts'
import * as statisticsAPI from '@/api/statistics'
export default {
  name: 'chart',
  components: { card },
  props: {
    api: { type: String, required: true },
    department: { type: Number, default: 0 }
  },
  data() {
    return {
      loading: false,
      noData: false,
      customOptionsMap: [
        { key: 'commitNumber', name: '提交数' },
        { key: 'acceptNumber', name: '受理数' },
        { key: 'handledNumber', name: '结案数' }
      ]
    }
  },
  watch: {
    department: {
      handler(val) {
        this.playLoadData()
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    playLoadData() {
      this.loading = true
      statisticsAPI[this.api]({ administrativeDivisionId: this.department })
        .then(res => {
          if (!res.result) {
            this.noData = true
          }
          this.$nextTick(() => this.initChart(res.result || []))
        })
        .finally(() => {
          this.loading = false
        })
    },

    initChart(rawData) {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart)
      }

      const xAxisData = []
      const series = []
      const labelOption = {
        show: false,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      }
      for (const item of this.customOptionsMap) {
        series.push({
          name: item.name,
          type: 'bar',
          barGap: 0,
          label: labelOption,
          // barWidth: 20,
          data: []
        })
      }
      for (const item of rawData) {
        xAxisData.push(item.typeName)
        for (let i = 0, l = this.customOptionsMap.length; i < l; i++) {
          series[i].data.push(item[this.customOptionsMap[i].key])
        }
      }

      let option = {}
      let app = {}

      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        // align: {
        //   options: {
        //     left: 'left',
        //     center: 'center',
        //     right: 'right'
        //   }
        // },
        // verticalAlign: {
        //   options: {
        //     top: 'top',
        //     middle: 'middle',
        //     bottom: 'bottom'
        //   }
        // },
        // position: {
        //   options: posList.reduce(function (map, pos) {
        //     map[pos] = pos;
        //     return map;
        //   }, {})
        // },
        distance: {
          min: 0,
          max: 100
        }
      };
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        // onChange: function () {
        //   const labelOption = {
        //     rotate: app.config.rotate,
        //     align: app.config.align,
        //     verticalAlign: app.config.verticalAlign,
        //     position: app.config.position,
        //     distance: app.config.distance
        //   };
        //   chart.setOption({
        //     series: [
        //       {
        //         label: labelOption
        //       },
        //       {
        //         label: labelOption
        //       },
        //       {
        //         label: labelOption
        //       },
        //       {
        //         label: labelOption
        //       }
        //     ]
        //   });
        // }
      };
      option = {
        grid: {
          left: '2%',
          bottom: xAxisData.length > 10 ? '30%' : '5%',
          right: xAxisData.length > 10 ? '8%' : '1%',
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   // TODO
        //   data: this.xAxisData
        // },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLabel: {
              interval: 0,
              rotate: xAxisData.length > 10 ? -40 : 0
            },
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      };

      this.chart.setOption(option)
    }
  },


}
</script>

<style scoped>

</style>
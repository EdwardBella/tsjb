<template>
  <div class="home">
    <card class="operate-card" :loading="loading">
      <template slot="title">
        <div class="header">
          <div class="title">{{ userInfo.accountName }}，欢迎使用河南省营商环境投诉举报系统</div>
          <div class="right">
            <div class="item">
              <img src="../../assets/images/home/icon-1.png" alt="">
              <div class="info">
                <div class="label">待办事项</div>
                <div class="num">{{ waitingNumber }}</div>
              </div>
            </div>
            <div v-if="overdueNumber" class="item">
              <img src="../../assets/images/home/icon-2.png" alt="">
              <div class="info">
                <div class="label">超期事项</div>
                <div class="num" style="color: #FA5151;">{{ overdueNumber }}</div>
              </div>
            </div>
            <el-button @click="$router.push('/todo/todo')" type="primary" style="margin-left: 40px">立即处理</el-button>
          </div>

        </div>
      </template>

    </card>

    <card title="部门统计">
      <div slot="content">
        <div v-if="userRoles.isLeaderDepartment" class="detail-totals">
          <div class="title">受理案件</div>
          <ul>
            <li v-for="item in accept.items" :key="item.name">
              <img src="../../assets/images/home/icon-3.png" alt="">
              <div class="info">
                <div class="label">{{ item.name }}</div>
                <div class="num">{{ statistics[item.key] }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="detail-totals">
          <div class="title">承办案件</div>
          <ul>
            <li v-for="item in process.items" :key="item.name">
              <img src="../../assets/images/home/icon-3.png" alt="">
              <div class="info">
                <div class="label">{{ item.name }}</div>
                <div class="num">{{ statistics[item.key] }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </card>

    <card title="案件趋势">
      <div slot="content">
        <div ref="chart" style="width: 100%; height: 258px"></div>
      </div>
    </card>
  </div>
</template>

<script>
import * as statisticsAPI from "@/api/statistics";
import card from "@/components/card/index.vue";
import { mapState } from "vuex";
import * as echarts from "echarts";
import { isAuthority } from "@/api/userManage";

export default {
  name: "home.vue",
  components: { card },
  data() {
    return {
      loading: false,
      noData: false,
      isAuthority: false,
      role: {
        acceptDepartmentRole: false,
        processDepartmentRole: false
      },
      statistics: {},
      overdueNumber: 0,
      waitingNumber: 0,
      accept: {
        items: [
          { name: "收到案件", key: "receiveNumber" },
          { name: "受理案件", key: "acceptNumber" },
          { name: "不受理案件", key: "noAcceptNumber" },
          { name: "移交案件", key: "transferNumber" },
          { name: "撤回案件", key: "recallNumber" },
          { name: "办结案件", key: "finishedNumber" }
        ]
      },
      process: {
        items: [
          { name: "收到案件", key: "receiveProcessNumber" },
          { name: "确认承办案件", key: "pendingConfirmNumber" },
          { name: "中止案件", key: "stopNumber" },
          { name: "提交办结案件", key: "pendProcessFinishedNumber" },
          { name: "办结案件", key: "processFinishedNumber" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["userInfo", "userRoles"])
  },
  created() {
    this.queryOrderWaiting();
    this.queryDepartmentStatistics();
  },
  mounted() {
    this.initChart();
    isAuthority().then(r => {
      this.isAuthority = r.result;
      this.queryWorkOrderCaseTrends();
    });
  },
  methods: {
    queryDepartmentStatistics() {
      statisticsAPI.queryDepartmentStatistics({
        isAcceptDepartment: 1,
        isProcessDepartment: 1
      })
        .then(r => {
          this.statistics = r.result;
        });
    },
    queryWorkOrderCaseTrends() {
      statisticsAPI.queryWorkOrderCaseTrends()
        .then(r => {
          let data;
          if (this.userRoles.isLeaderDepartment) {
            data = r.result.map(item => {
              return [`${item.countYear}-${item.countMonth}`, item.acceptNum, item.processNum];
            });
            data.unshift(["时间", "受理数", "承办数"]);
          } else {
            data = r.result.map(item => {
              return [`${item.countYear}-${item.countMonth}`, item.processNum];
            });
            data.unshift(["时间", "承办数"]);
          }

          this.updateChart(data);
        });
    },
    queryOrderWaiting() {
      statisticsAPI.queryOrderWaiting()
        .then(r => {
          this.overdueNumber = r.result.overdueNumber;
          this.waitingNumber = r.result.waitingNumber;
        });
    },
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
    },
    updateChart(data) {
      const baseSeries = (lineColor, areaColor) => {
        return {
          type: "line",
          lineStyle: {
            width: 1,
            color: lineColor
          },
          showSymbol: false,
          symbol: "emptyCircle",
          symbolSize: 9,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: areaColor
                },
                {
                  offset: 1,
                  color: "rgba(0, 0, 0, 0)"
                }
              ]
            }
          },
          emphasis: {
            focus: "series"
          }
        };
      };
      const options = {
        color: [
          "rgba(138, 56, 245, 1)",
          "rgba(67, 144, 253, 1)"
        ],
        dataset: {
          source: data
        },
        tooltip: {
          trigger: "axis",
          appendToBody: true,
          confine: true,
          className: "line-chart-tooltip",
          formatter(params) {
            // const title = params.un
            // const value = params.value.shift()
            // const dimensionNames = params.dimensionNames.shift()

            return `
              <div>
                <div class="title">${params[0].name}</div>
                <ul class="content" style="background-color: #fff">
                  ${params.map((item, index) => {
              if (item.value[index + 1] === undefined) return "";
              return `<li>${item.marker}${item.seriesName}: ${item.value[index + 1]}</li>`;
            }).join("")}
                </ul>
              </div>
            `;
          }
        },
        legend: {
          show: true,
          bottom: 0,
          itemWidth: 8,
          itemHeight: 5,
          textStyle: {
            color: "rgba(102, 102, 102, 1)"
          },
          icon: "roundRect"
        },
        grid: {
          left: 20,
          right: 30,
          bottom: 40,
          top: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            inverse: true,
            boundaryGap: false,
            axisLabel: {
              color: "rgba(134, 144, 156, 1)"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(134, 144, 156, 1)",
              formatter: (value) => value === parseInt(value) ? value : ""
            },
            splitLine: {
              lineStyle: {
                color: "rgba(229, 230, 235, 1)"
              }
            }
          }
        ],
        series: [
          baseSeries("rgba(138, 56, 245, 1)", "rgba(138, 56, 245, 0.2)"),
          baseSeries("rgba(67, 144, 253, 1)", "rgba(67, 144, 253, 0.2)")
        ]
      };

      this.chartInstance.setOption(options);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .operate-card {
    padding: 8px 10px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      //padding-bottom: 14px;
      .title {
        font-size: 16px;
        font-weight: 500;
        color: #0A6BF3;
        line-height: 23px;
        padding-bottom: 0;

        &:before {
          display: none;
        }
      }
    }

    .right {
      display: flex;
      justify-content: right;
      align-items: center;
      //padding: 25px 0 11px 0;

      .item {
        margin-right: 10px;
        min-width: 160px;
        height: 45px;
        box-sizing: border-box;
        padding: 4px 17px;
        border-radius: 2px;
        border: 1px solid #F7F7F7;
        display: flex;
        align-items: center;

        &:last-child {
          border-color: rgba(255, 237, 237, 1);
        }

        img {
          width: 36px;
          height: 36px;
        }

        .info {
          //margin-left: 9px;
          display: flex;
          align-items: center;
          //flex-direction: column;
          //justify-content: space-between;

          .num {
            font-size: 20px;
            font-weight: 700;
            color: #4E86F7;
            line-height: 45px;
            margin-left: 10px;
          }

          .label {
            font-size: 12px;
            font-weight: 500;
            color: #9E9E9E;
            line-height: 45px;
            margin-left: 10px;
          }
        }
      }
    }
  }

  .detail-totals {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #333333;
      line-height: 23px;
      margin-left: 5px;
    }

    ul {
      margin-top: 10px;
      display: flex;

      li {
        box-sizing: border-box;
        min-width: 200px;
        margin-right: 20px;
        padding: 25px 15px 25px 25px;
        display: flex;
        box-shadow: 0px 2px 4px 0px rgba(212, 212, 212, 0.1);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #F7F7F7;
        align-items: center;

        &:last-child {
          margin-right: 0;
        }

        img {
          width: 54px;
          height: 54px;
        }

        .info {
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .num {
            font-size: 24px;
            font-weight: 700;
            color: #4E86F7;
            line-height: 35px;
            //margin-top: 10px;
          }

          .label {
            font-size: 14px;
            font-weight: 500;
            color: #9E9E9E;
            line-height: 17px;
          }
        }
      }
    }
  }
}
</style>
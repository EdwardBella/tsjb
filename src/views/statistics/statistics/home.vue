<template>
  <div style="margin-top: 10px;">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="24">
        <card>
          <div class="topBox" slot="content">
            <el-select style="width: 240px;" v-model="administrativeDivisionId" placeholder="请选择"
                       @change="handleSelectChange">
              <el-option
                v-for="item in geoCoordMap"
                :key="item.administrativeDivisionId"
                :label="item.name"
                :value="item.administrativeDivisionId">
              </el-option>
            </el-select>
            <span style="font-weight:bold">投诉举报统计中心</span>
            <span style="width: 240px; text-align: right">
<!--              数据时间：{{ currentDate + " 4:00" }}-->
            </span>
          </div>
        </card>
      </el-col>
    </el-row>

    <card v-if="currentData" title="案件统计" style="margin-bottom: 10px;">
      <div class="cardList" slot="content">
        <div class="cardItem">
          <div class="cardTitle">投诉案件总数</div>
          <div class="cardContent">{{ currentData.complaintTotalNum }}条</div>
        </div>
        <div class="cardItem">
          <div class="cardTitle">受理案件数</div>
          <div class="cardContent">{{ currentData.acceptTotalNum }}条</div>
        </div>
        <div class="cardItem">
          <div class="cardTitle">办结案件数</div>
          <div class="cardContent">{{ currentData.concludeTotalNum }}条</div>
        </div>
        <div class="cardItem">
          <div class="cardTitle">结案率</div>
          <div class="cardContent">
            {{ (currentData.concludeTotalNum / currentData.acceptTotalNum * 100).toFixed(2) || 0 }}%
          </div>
        </div>
      </div>
    </card>

    <el-row style="margin-bottom: 10px;" :gutter="20">
      <el-col :span="8">
        <card title="投诉举报事项类型对比分析">
          <div slot="content" style="position: relative;">
            <el-button type="primary" class="back" @click="back" v-if="secondLevel">返回</el-button>
            <div ref="chart0" id="chart" style="width: 100%; height: 300px"></div>
          </div>
        </card>
      </el-col>
      <el-col :span="8">
        <card title="投诉举报来源对比">
          <div slot="content">
            <div ref="chart1" style="width: 100%; height: 300px"></div>
          </div>
        </card>
      </el-col>
      <el-col :span="8">
        <card title="投诉举报结案反馈">
          <div slot="content">
            <div ref="chart2" style="width: 100%; height: 300px"></div>
          </div>
        </card>
      </el-col>
    </el-row>

    <card title="投诉举报行业领域分析">
      <el-row slot="content" style="margin-bottom: 10px;" :gutter="20">
        <el-col :span="8">
          <div ref="chart3" id="chart" style="width: 100%; height: 300px"></div>
        </el-col>
        <el-col :span="16">
          <div class="title"
               style="padding-bottom: 10px; border-bottom: 1px solid rgba(161, 161, 161, 0.2); margin-bottom: 10px">
            各部门单位{{industrySectorName}}领域案件分析
          </div>

          <div class="table-header">
            <span>序号</span>
            <span class="ellipsis">部门名称</span>
            <span>案件数量</span>
          </div>
          <vueSeamlessScroll :data="industryList" :class-option="seamlessScrollOptions"
                             style="height: 210px; overflow: hidden" class="auto-scroll-table">
            <ul>
              <li v-for="(item, index) in industryList" :key="index" class="li-item">
                <span>{{ index + 1 }}</span>
                <span class="ellipsis">{{ item.departmentName }}</span>
                <span>{{ item.count }}</span>
              </li>
            </ul>
          </vueSeamlessScroll>
        </el-col>
      </el-row>
    </card>

    <card title="投诉举报案件区域分析">
      <template slot="content">
        <div ref="barChart0" style="width: 100%; height: 300px"></div>
      </template>
    </card>

    <card title="投诉举报案件部门分析">
      <template slot="content">
        <el-cascader
          ref="cascader"
          style="margin-bottom: 10px"
          v-model="acceptDepartmentCode"
          :props="{ children: 'childList', label: 'name', value: 'id', expandTrigger: 'hover', emitPath: false, checkStrictly: true }"
          :options="transferDepartmentTree"
          :show-all-levels="false"
          @change="$refs.cascader && $refs.cascader.toggleDropDownVisible(false);"
        ></el-cascader>
        <div ref="barChart1" style="width: 100%;"></div>
      </template>
    </card>
  </div>
</template>

<script>
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
import detail from "@/views/statistics/statistics/details";
import vueSeamlessScroll from "@/components/vue-seamless-scroll";
import { workOrderEventSourceDict, workOrderStatusDict } from "@/utils/dict";

export default {
  name: "home",
  components: { card, detail, vueSeamlessScroll },
  data() {
    return {
      loading: true,
      isCompetentAuthorities: false,
      tableSelect: [
        {
          name: "案件状态信息",
          id: "caseStatusAdministrativeCount",
          deptId: "caseStatusDepartmentCount",
          role: ["competentAuthorities"],
          exportType: 1,
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseStatusAdministrativeCount&exportType=1"
        },
        {
          name: "案件时效信息",
          id: "caseTimelinessAdministrativeCount",
          deptId: "caseTimelinessDepartmentCount",
          role: ["competentAuthorities"],
          exportType: 3,
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseTimelinessAdministrativeCount&exportType=3"
        },
        {
          name: "政府欠款统计",
          id: "administrativeCount",
          deptId: "complaintCount",
          role: ["competentAuthorities"],
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=administrativeCount&exportType=6"
        }
      ],
      currentSelect: {
        name: "案件状态信息",
        id: "caseStatusAdministrativeCount",
        deptId: "caseStatusDepartmentCount",
        role: ["competentAuthorities"],
        exportType: 1,
        path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseStatusAdministrativeCount&exportType=1"
      },
      rows: [
        // competentAuthorities 主管部门，organizers 承办单位
        {
          name: "案件状态信息（行政区划）",
          role: ["competentAuthorities"],
          exportType: 1,
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseStatusAdministrativeCount&exportType=1"
        },
        {
          name: "案件状态信息（承办部门）",
          role: ["competentAuthorities", "organizers"],
          exportType: 2,
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseStatusDepartmentCount&exportType=2"
        },
        {
          name: "案件时效信息（行政区划）",
          role: ["competentAuthorities"],
          exportType: 3,
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseTimelinessAdministrativeCount&exportType=3"
        },
        {
          name: "案件时效信息（承办部门）",
          role: ["competentAuthorities", "organizers"],
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=caseTimelinessDepartmentCount&exportType=4"
        },
        {
          name: "案件类型统计",
          role: ["competentAuthorities"],
          path: "/statistics/statistics/details?type=chart&hasDropDownSelector=true&api=caseTypeCount"
        },
        {
          name: "案件来源统计",
          role: ["competentAuthorities"],
          path: "/statistics/statistics/details?type=chart&hasDropDownSelector=true&api=caseSourceCount"
        },
        {
          name: "案件投诉对象统计",
          role: ["competentAuthorities"],
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=true&api=departmentCount&exportType=5"
        },
        {
          name: "投诉人类型统计",
          role: ["competentAuthorities"],
          path: "/statistics/statistics/details?type=chart&hasDropDownSelector=true&api=casePeopleTypeCount"
        },
        {
          name: "政府欠款统计（行政区划）",
          role: ["competentAuthorities"],
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=false&api=administrativeCount&exportType=6"
        },
        {
          name: "政府欠款统计（投诉对象部门）",
          role: ["competentAuthorities", "organizers"],
          path: "/statistics/statistics/details?type=table&hasDropDownSelector=true&api=complaintCount&exportType=7"
        }
      ],
      chart: null,
      chart2: null,
      total: 0,
      total2: 0,
      chartData: [],
      pieData: [],
      secondLevel: false,
      administrativeDivisionId: 1,
      countYear: 2023,
      geoCoordMap: [],
      currentData: [],
      switchValue: false,
      selectArea: [],
      currentDate: "",
      showSelect: true,
      pieChartInstances: new Array(4).fill(null),
      barChartInstances: new Array(2).fill(null),
      acceptDepartmentCode: "",
      transferDepartmentTree: [],
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
      industryList: [],
      industrySectorName: ''
    };
  },

  watch: {
    acceptDepartmentCode() {
      this.queryWorkOrderDepartmentFun();
    }
  },

  created() {
    statisticsAPI.check()
      .then(res => {
        const currentUserRole = res.result ? "competentAuthorities" : "organizers";
        this.isCompetentAuthorities = res.result;
        this.rows = this.rows.filter(item => {
          if (item.role.includes(currentUserRole)) {
            return true;
          }
          return false;
        });
      })
      .finally(() => {
        this.loading = false;
      });
    this.queryWorkOrderSatisfactionLevelFun();

    this.querySatisfactionStatusByCityFun();
  },
  mounted() {
    this.currentDate = this.getNowFormatDate();
    this.queryWorkOrderSurveyChartFun();
    this.initCharts("pieChartInstances", "chart");
    this.initCharts("barChartInstances", "barChart");
    this.setChart("pieChartInstances", 0, instance => {
      instance.off("click");
      instance.on("click", params => {
        if (!this.secondLevel) {
          this.queryWorkOrderByTypeFun(params.data.caseType);
        }
      });
    });
    this.setChart("pieChartInstances", 3, instance => {
      instance.off("click").on("click", params => {
        this.queryWorkorderIndustryDetailFun(params.data.name);
      });
    });
  },
  methods: {

    handleShow(data) {
      this.showSelect = data;
    },
    getNowFormatDate() {
      let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate(); // 获取当前日(1-31)
      if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
      if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

      return `${year}-${month}-${strDate}`;
    },
    back() {
      this.secondLevel = !this.secondLevel;
      this.queryWorkOrderTypeFun();
    },

    initCharts(dataKey, refKey) {
      this[dataKey] = this[dataKey].map((item, index) => {
        const ref = this.$refs[`${refKey}${index}`];
        if (ref) {
          return echarts.init(ref);
        }
        console.warn(`ref 不存在`, `${refKey}${index}`, ref);
      });
    },

    setChart(dataKey, index, callback) {
      const instance = this[dataKey][index];
      instance && callback(instance);
    },
    updatePieChartOption(index, options) {
      const instance = this.pieChartInstances[index];
      instance && instance.clear();
      instance && instance.setOption(options);
    },
    updateBarChartOption(index, options) {
      const instance = this.barChartInstances[index];
      instance && instance.clear();
      instance && instance.setOption(options, false);
    },
    generatePieChartOptions(data) {
      return {
        tooltip: {
          appendToBody: true,
          trigger: "item",
          formatter(params) {
            let name = params.name
            return `<div style="display: flex; align-items: center"><div style="max-width: 200px; word-break: break-all; white-space: break-spaces">${name}</div><div>: ${params.value} (${params.percent}%)</div></div>`
          }
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{c} ({d}%)"
                }
              }
            }
          }
        ]
      };
    },

    generateBarChartOptions(xAxisData, statusMap, direction = 'vertical') {
      const emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0,0,0,0.3)"
        }
      };

      const options = {
        dataZoom: xAxisData.length > 20 && [
          {
            type: "slider",
            zoomLock: true,
            bottom: 0,
            showDetail: false,
            brushSelect: false,
            startValue: 0,
            endValue: 10,
            show: true
          }
        ],
        tooltip: {
          trigger: 'axis',
          appendToBody: true,
          formatter(params) {
            let total = 0
            const itemsHtml =  params.map(item => {
              total += item.value
              return `<div style="display: flex; align-items: center">${item.marker} <span style="width: 70px; margin-right: 10px">${item.seriesName}</span>${item.value}</div>`
            }).join('')
            return `<div style="font-weight: bold;">${params[0].name}</div>${itemsHtml}<div style="display: flex; align-items: center; margin-left: 14px; font-weight: bold"><span style="width: 70px; margin-right: 10px">总数</span><span>${total}</span></div>`
          }
        },
        xAxis: {
          data: xAxisData,
          name: "",
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false },
          minorTick: { show : true },



        },
        yAxis: {
        },
        grid: {
          bottom: xAxisData.length > 20 ? 55 : 20,
          left: 30,
          right: 10,
          top: 20
        },
        series: Object.keys(statusMap).map(key => {
          return {
            barWidth: 30,
            name: workOrderStatusDict[key],
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: statusMap[key]
          };
        })
      };

      if (direction === 'cross') {
        options.yAxis.type = 'category'
        options.yAxis.data = xAxisData
        options.yAxis.splitLine = { show: true }
        options.xAxis.type = 'value'
        options.grid.left = 180
        options.grid.right = 50
        options.grid.bottom = 20
      }

      return options
    },

    queryWorkOrderSurveyChartFun() {
      queryWorkOrderSurveyChart(
        {
          administrationId: this.administrativeDivisionId//行政区划代码
        }
      ).then((res) => {
        if (res.code == 0) {
          this.geoCoordMap = [];
          res.result.forEach((item, index) => {
            // if(item.areaName!='省直辖'){
            this.geoCoordMap.push(
              {
                name: item.areaName == "省直辖" ? "济源市" : item.areaName,
                administrativeDivisionId: item.administrativeDivisionId
              }
            );
            // }
            // if(item.areaName=='省直辖' && itemMap.name=='济源市'){
            //   this.geoCoordMap.push(
            //       { name: itemMap.name, value: itemMap.value ,num: item[this.value],administrativeDivisionId:item.administrativeDivisionId }
            //     )
            // }
          });
          this.geoCoordMap.unshift({
            name: "全省总览", administrativeDivisionId: 1
          });
          this.handleSelectChange();
        }
      });
    },
    queryWorkOrderSurveyFun() {
      queryWorkOrderSurvey(
        {
          isMySelf: 0,
          administrationId: this.administrativeDivisionId//行政区划代码
        }
      ).then((res) => {

        if (res.code == 0) {
          this.currentData = res.result;
          //   .filter(item=>{
          //   return item.isMySelf == '0'
          // })
          console.log(this.currentData, "currentData");
          // 被投诉案件总数-complaintTotalNum
          // 办结案件总数-concludeTotalNum
          // 受理案件总数-acceptTotalNum
          // 是否包含下级:isMySelf
          // 行政区划代码-administrativeDivisionCode
        }
      });
    },
    queryWorkOrderSourceFun() {
      queryWorkOrderSource(
        {
          administrationId: this.administrativeDivisionId//行政区划代码
        }
      ).then((res) => {
        if (res.code == 0) {
          this.pieData = [];

          // for (var i = 0; i < res.result.length; i++) {
            // this.total2=0
            for (var i = 0; i < res.result.length; i++) {
              // this.total += res.result[i].caseNum
              this.$set(res.result[i], "name", workOrderEventSourceDict[res.result[i].caseSource]);
              this.$set(res.result[i], "value", res.result[i].caseNum);
            }
            // for(var i=0;i<res.result.length;i++){
            //     this.$set(res.result[i],'value',(res.result[i].caseNum*100/this.total).toFixed(2))
            // }
            this.updatePieChartOption(1, this.generatePieChartOptions(res.result));
          // }
          // this.initChart2()
        }
      });
    },
    queryWorkOrderTypeFun(code) {
      queryWorkOrderType(
        {
          administrationId: this.administrativeDivisionId//行政区划代码
        }
      ).then((res) => {
        if (res.code == 0) {
          this.chartData = [];
          // this.total = 0
          for (var i = 0; i < res.result.length; i++) {
            // this.total += res.result[i].caseNum
            this.$set(res.result[i], "name", res.result[i].caseType);
            this.$set(res.result[i], "value", res.result[i].caseNum);
          }

          this.chartData = res.result;

          this.updatePieChartOption(0, this.generatePieChartOptions(res.result));

        }
      });
    },
    queryWorkOrderByTypeFun(caseType) {
      // 列表
      queryWorkOrderByType(
        {
          // countYear:this.countYear,//年份-
          administrationId: this.administrativeDivisionId,//行政区划代码
          caseType: caseType
        }
      ).then((res) => {

        if (res.code == 0) {
          this.secondLevel = true;
          // this.total=0
          for (var i = 0; i < res.result.length; i++) {
            // this.total += res.result[i].caseNum
            this.$set(res.result[i], "name", res.result[i].caseName);
            this.$set(res.result[i], "value", res.result[i].caseNum);
          }

          this.updatePieChartOption(0, this.generatePieChartOptions(res.result));
          // 案件类型名称-caseName
          // 案件数量-caseNum
        }
      });
    },

    queryDepartmentTree() {
      queryWorkOrderDepartmentWithParam({ administrationId: this.administrativeDivisionId })
        .then(res => {
          this.acceptDepartmentCode = Number(res.result.administrativeDivision.id);
          this.transferDepartmentTree = this.cleanTheAdministrativeDivisionData(res.result);

        });
    },

    cleanTheAdministrativeDivisionData(rawData) {
      const clean = (rawData) => {
        const data = [];
        for (const item of rawData) {
          let newItem;
          if (item.administrativeDivision) {
            newItem = { ...item.administrativeDivision };
          } else {
            newItem = { ...item };
          }

          if (item.childList && item.childList.length) {
            newItem.childList = clean(item.childList);
          }
          data.push(newItem);
        }

        return data;

      };
      return clean([rawData]);
    },

    queryWorkOrderSatisfactionLevelFun() {
      queryWorkOrderSatisfactionLevel({
        administrationId: this.administrativeDivisionId//行政区划代码
      })
        .then(r => {
          const data = r.result;
          this.updatePieChartOption(2, this.generatePieChartOptions([
            {
              name: "满意",
              value: data.satisfactionNumber
            },
            {
              name: "基本满意",
              value: data.commonNumber
            },
            {
              name: "不满意",
              value: data.noSatisfactionNumber
            }
          ]));
        });
    },

    querySatisfactionStatusByCityFun() {
      satisfactionStatusByCity({ administrativeDivisionId: this.administrativeDivisionId })
        .then(r => {
          const xAxisData = [];
          const statusMap = {};
          r.result.forEach(item => {
            if (item.administrativeDivisionName) {
              xAxisData.push(item.administrativeDivisionName);
              item.statusWorkOrders.forEach(item => {
                if (!statusMap[item.status]) {
                  statusMap[item.status] = [];
                }
                statusMap[item.status].push(item.workOrderNumber);
              });
            }
          });
          this.updateBarChartOption(0, this.generateBarChartOptions(xAxisData, statusMap));
        });
    },

    queryWorkOrderDepartmentFun() {
      queryWorkOrderDepartment({ administrationId: this.acceptDepartmentCode })
        .then(r => {
          const xAxisData = [];
          const statusMap = {};

          r.result.forEach(item => {
            if (item.departmentName) {
              xAxisData.push(item.departmentName);
              item.departmentStatus.forEach(item => {
                if (!statusMap[item.status]) {
                  statusMap[item.status] = [];
                }
                statusMap[item.status].push(item.count);
              });
            }
          });

          let len = r.result.length
          this.barChartInstances[1].resize({
            height: 60 * (len < 6 ? 6 : len)
          })
          this.updateBarChartOption(1, this.generateBarChartOptions(xAxisData, statusMap, 'cross'));
        });
    },

    queryworkorderIndustryFun() {
      queryworkorderIndustry({ administrationId: this.administrativeDivisionId })
        .then(r => {
          const data = r.result.map(item => {
            return {
              name: item.industrySectorName,
              value: item.count
            };
          });
          data.sort((a, b) => b.value - a.value);
          this.updatePieChartOption(3, this.generatePieChartOptions(data));
          this.queryWorkorderIndustryDetailFun(data.length ? data[0].name : '');
        });
    },

    queryWorkorderIndustryDetailFun(industrySectorName) {
      this.industrySectorName = industrySectorName
      if (!industrySectorName) {
        this.industryList = []
        return
      }
      queryWorkorderIndustryDetail({
        administrationId: this.administrativeDivisionId,
        industrySectorName
      }).then(r => {
        this.industryList = r.result.sort((a, b) => b.count - a.count);
      });
    },

    handleSelectChange() {
      this.secondLevel = false;
      // this.queryWorkOrderTypeByTypeFun()
      // 投诉举报案件状况
      this.queryWorkOrderSurveyFun();
      // 投诉举报事项类型对比分析
      this.queryWorkOrderTypeFun();
      // 投诉举报案件来源分析
      this.queryWorkOrderSourceFun();

      this.queryWorkOrderSatisfactionLevelFun();

      this.querySatisfactionStatusByCityFun();

      this.queryworkorderIndustryFun();

      this.queryDepartmentTree();

    }
  }
};
</script>

<style lang="less" scoped>
.cardList {
  display: flex;
  justify-content: space-around;
}

.cardItem {
  width: 298px;
  height: 138px;
  padding: 16px 18px;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.cardItem:nth-child(1) {
  background: url('../../../assets/images/card1.png');
  color: #4270BB
}

.cardItem:nth-child(2) {
  background: url('../../../assets/images/card2.png');
  color: #42867E
}

.cardItem:nth-child(3) {
  background: url('../../../assets/images/card3.png');
  color: #6152A9;
  margin-right: 0
}

.cardItem:nth-child(4) {
  background: url('../../../assets/images/card4.png');
  color: #A96D52;
  margin-right: 0
}

.cardTitle {
  height: 33px;
  line-height: 33px;
  width: 100%;
  padding-left: 15px;
}

.cardContent {
  text-align: center;
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
}

.cardContent {
  padding: 10px 0;
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
.auto-scroll-table > div > div:nth-child(1) .li-item:nth-child(even),
.auto-scroll-table > div > div:nth-child(2) .li-item:nth-child(odd) {
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

  & > span:last-child,
  & > span:first-child {
    width: 180px;
    text-align: center;
  }

  & > span:nth-child(2) {
    flex: 1;
  }
}
</style>
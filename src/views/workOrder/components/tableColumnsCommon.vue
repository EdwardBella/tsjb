<template>
  <div>
    <el-table-column label="" width="5px"></el-table-column>
<!--    <el-table-column type="index" label="序号" width="80"></el-table-column>-->
    <el-table-column prop="workOrderNumber" label="案件编号" width="200" align="center"></el-table-column>
    <el-table-column prop="title" label="案件标题" width="680px" show-overflow-tooltip>
      <template slot-scope="{row}">
        <div class="ellipsis title">
          <span v-if="row.supervisionTag === '1'" class="tag warning" style="margin: 0 8px 0 0;">跟踪</span>
          <span v-if="row.exceptionTag === '1'" class="tag danger" style="margin: 0 8px 0 0;">异常</span>
          <span v-if="row.repeatCheck === 'Y'" class="tag primary" style="margin: 0 8px 0 0;">复</span>
          <span v-if="row.isDuplicated === 'Y'" class="tag organge" style="margin: 0 8px 0 0;">重</span>
          <img v-if="row.expireFlag === 'Y' && row.status !== 10" src="../../../assets/images/icon-light-red.png" alt="">
          <img v-if="countDownStatus(row.currentStepDeadline, row.status) === 1 && row.status !== 10" src="../../../assets/images/icon-light-yellow.png" alt="">
          <i v-if="row.appraiseFlag === 'Y'" class="img icon-ping"></i>
          <i v-if="row.wordsFlag === 'Y'" class="img icon-liu"></i>
          <span :class="{'color-danger': row.expireFlag === 'Y' && row.status !== 10, 'color-warning': countDownStatus(row.currentStepDeadline, row.status) === 1 && row.status !== 10}">{{ row.title }}</span>
        </div>
<!--        <div v-if="row.supervisionTag === '1'" class="ellipsis title"><img src="../../../assets/images/icon-supervisionTag.png" alt="">&nbsp;{{ row.title }}</div>-->
<!--        <div v-else-if="row.exceptionTag === '1'" class="ellipsis title"><img src="../../../assets/images/icon-exceptionTag.png" alt="">&nbsp;{{ row.title }}</div>-->
<!--        <div v-else-if="row.expireFlag === 'Y' && row.status !== 10" class="color-danger ellipsis title"><img src="../../../assets/images/icon-light-red.png" alt="">&nbsp;{{ row.title }}</div>-->
<!--        <div v-else-if="countDownStatus(row.currentStepDeadline, row.status) === 1 && row.status !== 10" class="color-warning ellipsis title"><img src="../../../assets/images/icon-light-yellow.png" alt="">&nbsp;{{ row.title }}</div>-->
<!--        <div v-else class="ellipsis title">-->
<!--          <i v-if="row.appraiseFlag === 'Y'" class="img icon-ping"></i>-->
<!--          <i v-if="row.wordsFlag === 'Y'" class="img icon-liu"></i>-->
<!--          &nbsp;{{ row.title }}-->
<!--        </div>-->
      </template>
    </el-table-column>
    
    <el-table-column  v-if="type !== 'process' && type !== 'accepted'" label="结案反馈" width="100px">
      <template slot-scope="{row}">{{ row.satisfactionLevel | workOrderAtisFactionLevel}}</template>
    </el-table-column>
    <el-table-column v-if="type !== 'process' && type !== 'accepted'" label="评价得分">
      <template slot-scope="{row}">{{ row.satisfiedScore }}</template>
    </el-table-column>
    <el-table-column v-if=" type === 'appraise'" label="评价状态">
      <template slot-scope="{row}">{{ row.appraiseStatus | workOrderAppraiseStatus }}</template>
    </el-table-column>
    <el-table-column prop="itemDetailName" label="案件类型" width="140px"></el-table-column>
    <el-table-column label="状态">
      <template slot-scope="{row}">
        <template>{{ row.status | workOrderStatus }}</template>
      </template>
    </el-table-column>

    <template v-if="type !== 'appraise'">
      <el-table-column label="阶段剩余时限" width="120px">
        <template slot-scope="{row}">
          <div :class="['', 'color-warning', 'color-danger'][countDownStatus(row.currentStepDeadline, row.status)]">
            <span>{{ row.currentStepDeadline | timeRemaining }}</span><span v-if="row.currentStepDeadline">天</span>
          </div>
        </template>
      </el-table-column>
<!--      <el-table-column label="总剩余时限" width="120px">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.deadline | timeRemaining }}</span><span v-if="row.deadline">天</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </template>

    <el-table-column prop="createUsername" label="投诉人" width="150px" show-overflow-tooltip></el-table-column>
    <el-table-column prop="mobile" label="联系电话" width="140px"></el-table-column>
    <el-table-column label="案件来源">
      <template slot-scope="{row}">{{ row.itemSource | workOrderEventSource }}</template>
    </el-table-column>
    <el-table-column prop="acceptDepartment" label="主管单位" width="160px" show-overflow-tooltip></el-table-column>
    <el-table-column prop="processDepartment" label="承办单位" width="160px" show-overflow-tooltip></el-table-column>
    <el-table-column v-if=" type !== 'appraise'" label="评价状态">
      <template slot-scope="{row}">{{ row.appraiseStatus | workOrderAppraiseStatus }}</template>
    </el-table-column>
<!--    <el-table-column label="公开状态" width="90px">-->
<!--      <template slot-scope="{row}">{{ row.publicStatus | workOrderPublicStatus }}</template>-->
<!--    </el-table-column>-->
    <el-table-column v-if="type === 'all'" label="回访情况" width="90px">
      <template slot-scope="{row}">{{ row.evaluateResult | workOrderAtisFactionLevel }}</template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="160px"></el-table-column>
    <el-table-column prop="filingTime" label="立案时间" width="160px"></el-table-column>
    <el-table-column label="操作" width="150" align="center" :fixed="fixed">
      <template slot-scope="{row}">
        <el-button @click="$emit('showDetailsDialog', row)" type="primary" plain size="mini">查看</el-button>
        <el-button v-permission="['允许留言']" v-if="type !== 'appraise'" @click="$emit('showLeaveMessageDialog', row)" type="primary" plain size="mini">留言</el-button>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import { calcWorkOrderCountDownStatus, dict2Array } from '@/utils/common'
import {
  workOrderStatus,
  timeRemaining,
  workOrderPublicStatus,
  workOrderEventSource,
  workOrderAppraiseStatus,
  workOrderAtisFactionLevel
} from "@/utils/filters";
import { workOrderEventSourceDict, workOrderExpireFlagDict, workOrderPublicIntentionDict, workOrderStatusDict } from '@/utils/dict'
import moment from 'moment'

export default {
  name: 'tableColumnsCommon',
  filters: { workOrderStatus, timeRemaining, workOrderPublicStatus, workOrderEventSource, workOrderAppraiseStatus, workOrderAtisFactionLevel },
  props: {
    fixed: { type: [String, Boolean], default: false },
    type: { type: String, default: '' }
  },
  data() {
    return {
      statusArr: dict2Array(workOrderStatusDict),
      eventSourceArr: dict2Array(workOrderEventSourceDict),
      expireFlagArr: dict2Array(workOrderExpireFlagDict),
      publicStatusArr: dict2Array(workOrderPublicIntentionDict, 1)
    };
  },
  methods: {
    countDownStatus(currentStepDeadline, status) {
      // 0.正常 1.即将过期 2过期(停止)
      const countDown = moment(currentStepDeadline).diff(moment(), 'milliseconds')
      return calcWorkOrderCountDownStatus(countDown, status)
      // if (countDown <= 0) return 2
      // if (
      //   // 待受理 小于 1 天
      //   (status === 0 && countDown < 86400000) ||
      //   // 待确认 回退中 小于 1 天
      //   ((status === 2 || status === 1) && countDown < 86400000) ||
      //   // 调查中 小于 5 天
      //   (status === 3 && countDown < 432000000) ||
      //   // 待办结 小于 2 天
      //   (status === 4 && countDown < 172800000)
      // ) {
      //   return 1
      // }
      // return 0
    },
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;

  .icon-liu,
  .icon-ping {
    content: "";
    margin-right: 0;
    background-size: 28px;
    display: inline-block;
    width: 28px;
    height: 28px;
    background-position-y: 2px;
  }

  img {
    width: 20px;
  }

  .icon-ping {
    background-image: url("../../../assets/images/common/icon-ping.png");
  }
  .icon-liu {
    background-image: url("../../../assets/images/common/icon-liu.png");
  }
}
.organge{
  background: rgba(245,91,35);
}
</style>
<template>
  <div class="work-order-details-buttons">
<!--    <div>-->
      <template v-if="details.auditFlag === 'N' && details.materialCorrectStatus !== 0">
        <!-- 回退中-->
        <template v-if="details.status === 1">
<!--          <el-button v-permission="['允许取消回退']" @click="handleCancel" type="primary">取消回退</el-button>-->
        </template>
        <!-- 待确认-->
        <template v-if="details.status === 2 && isCurrentWorkWorkProcessor">
          <el-button @click="appealDialog.visible = true" type="primary">回退</el-button>
          <el-button @click="handleStart" type="primary">确认</el-button>
        </template>
        <!-- 办理中、处理中-->
        <template v-if="details.status === 3">
<!--          <el-button v-permission="['允许取消确认']" @click="handleCancelStart" type="primary" plain>取消确认</el-button>-->
          <template v-if="isCurrentWorkWorkProcessor">
            <el-button @click="suspendDialog.visible= true" type="primary" plain>中止</el-button>
            <el-button @click="postponeDialog.visible= true" type="primary" plain>延期</el-button>
            <!-- <el-button @click="overDialog.visible= true" type="danger" plain>终止</el-button>-->
            <el-button @click="completeDialog.visible= true" type="primary">提交办结</el-button>
          </template>
        </template>
        <!-- 待办结 -->
        <template v-if="details.status === 4">
<!--          <el-button v-permission="['允许取消提交办结']" @click="handleCancelComplete" type="primary">取消提交办结</el-button>-->
        </template>
        <!-- 已中止-->
        <template v-if="details.status === 7 && isCurrentWorkWorkProcessor">
          <el-button @click="handleContinueProcess" type="primary">继续调查</el-button>
        </template>
      </template>
<!--    </div>-->

    <!-- 回退 -->
    <appealDialog :visible.sync="appealDialog.visible" :workOrderNo="details.workOrderNo" @success="rePlayLoadData"></appealDialog>
    <!-- 中止 -->
    <suspendDialog type="process" :visible.sync="suspendDialog.visible" :workOrderNo="details.workOrderNo" @success="rePlayLoadData"></suspendDialog>
    <!-- 延期 -->
    <postponeDialog type="process" :visible.sync="postponeDialog.visible" :workOrderNo="details.workOrderNo" @success="rePlayLoadData"></postponeDialog>
    <!-- 完成 -->
    <completeDialog :visible.sync="completeDialog.visible" :workOrderNo="details.workOrderNo" :workOrderId="details.id" :hasDebtAmount="details.debtAmount > 0" @success="rePlayLoadData"></completeDialog>

    <!-- 终止 -->
    <overDialog :visible.sync="overDialog.visible" :workOrderNo="details.workOrderNo" @success="rePlayLoadData"></overDialog>
  </div>
</template>

<script>
import detailsButtonMixin from "@/views/workOrder/components/detailsButtonMixin";
import appealDialog from "@/views/workOrder/components/appealDialog.vue";
import suspendDialog from "@/views/workOrder/components/suspendDialog.vue";
import postponeDialog from "@/views/workOrder/components/postponeDialog.vue";
import completeDialog from "@/views/workOrder/components/completeDialog.vue";
import overDialog from "@/views/workOrder/components/overDialog.vue";
import * as workOrderApi from "@/api/workOrder/index";
import { rolePermissionsMixin } from "@/views/workOrder/mixin";

export default {
  name: "processButton",
  mixins: [detailsButtonMixin, rolePermissionsMixin],
  components: { appealDialog, suspendDialog, postponeDialog, completeDialog, overDialog },
  data() {
    return {
      appealDialog: { visible: false },
      suspendDialog: { visible: false },
      postponeDialog: { visible: false },
      completeDialog: { visible: false },
      overDialog: { visible: false },
    };
  },
  methods: {
    handleStart() {
      this.confirm('确定要开始处理该案件么？')
        .then(() => workOrderApi.process.start(this.details.workOrderNo))
        .then(this.rePlayLoadData)
    },
    handleCancel() {
      this.confirm('确定要取消回退该案件么？')
        .then(() => workOrderApi.process.cancelAppeal(this.details.workOrderNo))
        .then(this.rePlayLoadData)
    },
    handleCancelComplete() {
      this.confirm('确定要取消提交办结该案件么？')
        .then(() => workOrderApi.process.cancelFinishProcess(this.details.workOrderNo))
        .then(this.rePlayLoadData)
    },
    handleContinueProcess() {
      this.confirm('确定要继续处理该案件么？')
        .then(() => workOrderApi.process.continueProcess(this.details.workOrderNo))
        .then(this.rePlayLoadData)
    },
    handleCancelStart() {
      this.confirm('确定要取消确认案件么？')
        .then(() => workOrderApi.process.cancelconfirmation(this.details.workOrderNo))
        .then(this.rePlayLoadData)
    }
  }
};
</script>

<style scoped>

</style>
<template>
  <el-dialog append-to-body
    :title="title"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" label-suffix="：" ref="form">
      <el-form-item :label="commentLabel" prop="reason">
        <el-input
          v-model="form.reason"
          show-word-limit
          maxlength="1000"
          placeholder="请输入详细描述"
          type="textarea"
          style="width: 100%; height: 150px"></el-input>
      </el-form-item>
    </el-form>

    <div class="split" style="margin: 30px 0"></div>

    <div class="dialog-footer-btn">
      <el-button @click="handleClose" type="primary" plain>关闭</el-button>
      <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as workOrderApi from "@/api/workOrder/index";
import * as mixins from "@/utils/mixins";

export default {
  name: "addSupervisionStatus",
  mixins: [mixins.loading, mixins.form, mixins.dialog],
  props: ["visible", "workOrderNo", "type"],
  data() {
    return {
      submitting: false,
      form: {
        reason: "",
      },
      rules: {
        reason: [{ required: true, message: "请填写" }],
      },
      optionList: []
    };
  },
  computed: {
    title() {
      return ['添加跟踪状态', '取消跟踪状态', '关闭异常'][this.type - 1]
    },
    commentLabel() {
      return ['跟踪事由', '关闭备注', '关闭备注'][this.type - 1]
    }
  },
  watch: {
    type() {
      if (this.type === 2) {
        this.$nextTick(() => {
          this.form.reason = '该案件跟踪事项已办理完毕，经研判，取消跟踪状态。'
        })
      }
    }
  },
  methods: {
    handleSubmit() {
      this.validateAndConfirm("form", "确定提交吗？")
        .then(() => {
          this.submitting = true;
          console.log({workOrderNo: this.workOrderNo})
          return [
            () => workOrderApi.process.addSupervision({
              workOrderNo: this.workOrderNo,
              supervisionReasons: this.form.reason
            }),
            () => workOrderApi.process.cancelSupervision({
              workOrderNo: this.workOrderNo,
              cancelSupervisionReasons: this.form.reason
            }),
            () => workOrderApi.all.closeException({
              workOrderNo: this.workOrderNo,
              cancelException: this.form.reason
            })
          ][this.type - 1]();
        })
        .then(() => {
          this.$emit("success");
          this.handleClose();
        })
        .finally(() => this.submitting = false);
    }
  }
};
</script>

<style lang="less" scoped>
.tips {
  text-align: center;
  margin-bottom: 20px;
}
</style>
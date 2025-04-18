<!--不受理案件弹窗-->

<template>
  <el-dialog append-to-body title="案件取消办结" width="640px" :visible="visible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="取消办结备注：" prop="comment">
        <el-input
          v-model="form.comment"
          show-word-limit
          maxlength="300"
          placeholder="请输入详细描述"
          type="textarea"
          style="width: 100%; height: 150px"></el-input>
      </el-form-item>

      <div class="split" style="margin: 30px 0"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" type="primary" plain>关闭</el-button>
        <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import * as mixins from "@/utils/mixins";
import * as dictApi from "@/api/dict";
import * as workOrderApi from "@/api/workOrder/index";
import * as templateApi from "@/api/template";

export default {
  name: "cancelFinallyDialog",
  mixins: [mixins.dialog, mixins.form],
  props: ["visible", "workOrderNo"],
  data() {
    return {
      form: {
        comment: ""
      },
      rules: {
        comment: [{ required: true, message: "请填写" }],
      },
      optionList: [],
      submitting: false
    };
  },
  methods: {
    show() {
      // dictApi.list({ parentCode: "1001" })
      //   .then(res => {
      //     this.optionList = res.result;
      //   });

      templateApi.detailByCode(1012)
        .then(res => {
          this.form.comment = res.result.value
        })
    },
    handleSubmit() {
      this.validateAndConfirm("form",'确认提交吗？')
        .then(res => {
          this.submitting = true;
          return workOrderApi.distribute.cancelFinish({
            ...this.form,
            workOrderNo: this.workOrderNo
          });
        })
        .then(() => {
          this.$emit("success");
          this.handleClose()
        })
        .finally(() => {
          this.submitting = false;
        });
    }
  }
};
</script>

<style scoped>

</style>
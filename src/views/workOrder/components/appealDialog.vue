<template>
  <el-dialog append-to-body
    title="案件回退"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div class="tips">如需回退，请填写回退理由</div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="回退原因：" prop="reason">
        <el-select v-model="form.reason" placeholder="请选择" style="width: 100%">
          <el-option v-for="item in optionList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回退备注：" prop="comment">
        <el-input
          v-model="form.comment"
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
import * as dictApi from "@/api/dict";
import * as templateApi from "@/api/template";

export default {
  name: "appealDialog",
  mixins: [mixins.loading, mixins.form, mixins.dialog],
  props: ["visible", "workOrderNo"],
  data() {
    return {
      submitting: false,
      form: {
        reason: "",
        comment: ""
      },
      rules: {
        reason: [{ required: true, message: "请选择" }],
        comment: [{ required: true, message: "请填写" }]
      },
      optionList: []
    };
  },
  methods: {
    show() {
      dictApi.list({ parentCode: "1002" })
        .then(res => {
          this.optionList = res.result;
        });

      templateApi.detailByCode(1005)
        .then(res => {
          this.form.comment = res.result.value;
        });
    },
    handleSubmit() {
      this.validateAndConfirm("form", "确定要回退该案件么？")
        .then(() => {
          this.submitting = true;
          return workOrderApi.process.appeal({
            ...this.form,
            workOrderNo: this.workOrderNo
          });
        })
        .then(() => {
          this.$emit("success");
          this.handleClose()
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
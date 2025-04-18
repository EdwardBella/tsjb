<template>
  <el-dialog append-to-body
    title="提示"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="备注：" prop="notAcceptReason">
        <el-input v-model="form.notAcceptReason" show-word-limit maxlength="500" placeholder="请输入详细描述" type="textarea" style="width: 100%; height: 110px"></el-input>
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
import * as workOrderApi from "@/api/workOrder";
import * as minix from "@/utils/mixins";
import { cancelReject } from "../../../api/workOrder";

export default {
  name: "reRejectDialog",
  mixins: [minix.loading],
  props: ['visible', 'workOrderNo'],
  data() {
    return {
      submitting: false,
      form: {
        notAcceptReason: ''
      },
      rules: {
        // notAcceptReason: [{ required: true, message: "备注" }],
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.confirm("确认取消分配吗？")
          .then(() => {
            this.decorateLoading(() => {
              return workOrderApi.cancelReject(this.workOrderNo)
                .then(res => {
                  this.$emit("success");
                  this.handleClose();
                });
            }, "submitting");
          });
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
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
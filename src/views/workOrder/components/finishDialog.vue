<template>
  <el-dialog append-to-body
    title="提示"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
<!--    <div class="tips">请输入反馈信息进行办结</div>-->
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="请输入反馈信息进行办结" class="label-center" prop="result">
        <el-input v-model="form.result" show-word-limit maxlength="500" placeholder="请输入详细描述" type="textarea" style="width: 100%; height: 110px"></el-input>
      </el-form-item>
    </el-form>

    <div class="split" style="margin: 30px 0"></div>

    <div class="dialog-footer-btn">
      <el-button @click="handleClose" type="primary" plain>关闭</el-button>
      <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
    </div>l
  </el-dialog>
</template>

<script>
import * as myWorkOrderApi from "@/api/myWorkOrder";
import * as minix from "@/utils/mixins";

export default {
  name: "finishDialog",
  mixins: [minix.loading],
  props: ['visible', 'workOrderNo'],
  data() {
    return {
      submitting: false,
      form: {
        result: ''
      },
      rules: {
        result: [{ required: true, message: "请输入" }],
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.confirm("确认办结吗？")
          .then(() => {
            this.decorateLoading(() => {
              const form = { ...this.form };
              form.workOrderNo = this.workOrderNo;
              return myWorkOrderApi.finish(form)
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
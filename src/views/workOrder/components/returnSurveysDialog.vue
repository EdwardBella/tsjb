<template>
  <el-dialog append-to-body
    title="添加回访记录"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="form" label-suffix=":">
      <el-form-item label="回访日期" prop="evaluateDate">
        <el-date-picker
          v-model="form.evaluateDate"
          type="date"
          value-format="yyyy-MM-dd"
          :pickerOptions="pickerOptions"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回访结果" prop="evaluateResult">
        <el-radio-group v-model="form.evaluateResult">
          <el-radio v-for="item in atisFactionLevels" :key="item.key" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="evaluateNotes">
        <el-input
          v-model="form.evaluateNotes"
          show-word-limit
          maxlength="300"
          placeholder="请输入支付备注"
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
import * as workOrderAPI from "@/api/workOrder/index";
import * as minix from "@/utils/mixins";
import { dict2options } from "@/utils/common";
import { workOrderAtisFactionLevelDict } from "@/utils/dict";
import { addEvaluate } from "@/api/workOrder/all";

export default {
  name: "returnSurveysDialog",
  mixins: [minix.loading],
  props: ['visible', 'workOrderNo'],
  data() {
    return {
      submitting: false,
      atisFactionLevels: dict2options(workOrderAtisFactionLevelDict),
      form: {
        evaluateDate: "",
        evaluateNotes: "",
        evaluateResult: "",
      },
      rules: {
        evaluateDate: [{ required: true, message: "请选择" }],
        evaluateResult: [{ required: true, message: "请选择" }],
        evaluateNotes: [{ required: true, message: "请输入" }],
      },
      pickerOptions: {
        disabledDate: (time) => time.getTime() > Date.now()
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.decorateLoading(() => {
          const form = { ...this.form };
          form.workOrderNo = this.workOrderNo;
          return workOrderAPI.all.addEvaluate(form)
            .then(res => {
              this.$emit("success");
              this.handleClose();
            });
        }, "submitting");
      });
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
};
</script>

<style lang="less" scoped>
</style>
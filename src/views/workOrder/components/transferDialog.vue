<!--移交案件弹窗-->

<template>
  <el-dialog append-to-body title="线索移交" width="640px" :visible="visible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-suffix="：">
      <el-form-item label="移交部门" prop="transferDepartmentCode">
        <el-select v-model="form.transferDepartmentCode" placeholder="请选择" style="width: 100%">
          <el-option v-for="item in transferDepartments" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="移交理由" prop="transferNotes">
        <el-input
          v-model.trim="form.transferNotes"
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
import * as workOrderApi from "@/api/workOrder/index";
import * as templateApi from "@/api/template";
import { list } from "@/api/dict";
import * as dictAPI from "@/api/dict";

export default {
  name: "notAcceptDialog",
  mixins: [mixins.dialog, mixins.form],
  props: ["visible", "workOrderNo"],
  data() {
    return {
      form: {
        transferDepartmentCode: "",
        transferDepartmentName: "",
        transferNotes: ""
      },
      rules: {
        transferNotes: [{ required: true, message: "请填写" }],
        transferDepartmentCode: [{ required: true, message: "请选择" }]
      },
      transferDepartments: [],
      submitting: false,
    };
  },

  methods: {
    show() {
      this.form.transferDepartmentName = ''
      dictAPI.list({ parentCode: "1007" }).then(r => {
        this.transferDepartments = r.result
      })
      templateApi.detailByCode(1002)
        .then(res => {
          this.form.transferNotes = res.result.value;
        });
    },
    handleSubmit() {
      this.validateAndConfirm("form", "确定提交吗？")
        .then(res => {
          this.submitting = true;
          const checkedNode = this.transferDepartments.find(a => a.id === this.form.transferDepartmentCode)
          this.form.transferDepartmentName = checkedNode.name
          return workOrderApi.distribute.transfer({
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
    },
  }
};
</script>

<style scoped>

</style>
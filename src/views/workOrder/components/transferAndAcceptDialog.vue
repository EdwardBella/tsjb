<!--转移办弹窗-->

<template>
  <el-dialog append-to-body title="转移交办" width="640px" :visible="visible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-suffix="：">
      <el-form-item label="选择您要交办的本级部门" prop="processDepartmentCode">
        <!--        <el-cascader-->
        <!--          v-model="form.notAcceptReason"-->
        <!--          :props="{ children: 'itemDetailList', label: 'name', value: 'id', expandTrigger: 'hover', emitPath: false }"-->
        <!--          :options="transferDepartmentTree"-->
        <!--          :show-all-levels="false"-->
        <!--        ></el-cascader>-->

        <el-select v-model="form.processDepartmentCode" placeholder="请选择" style="width: 100%">
          <el-option v-for="item in distributeDepartmentTree" :key="item.id" :label="item.name" :value="item.code"></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="交办备注" prop="comment">
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
import * as workOrderApi from "@/api/workOrder/index";
import * as templateApi from "@/api/template";
import { distribute, distributeTransfer } from "@/api/workOrder/distribute";
import { detailByCode } from "@/api/template";

export default {
  name: "transferAndAcceptDialog",
  mixins: [mixins.dialog, mixins.form],
  props: ["visible", "workOrderNo"],
  data() {
    return {
      form: {
        processDepartmentCode: "",
        comment: ""
      },
      rules: {
        comment: [{ required: true, message: "请填写" }],
        processDepartmentCode: [{ required: true, message: "请选择" }]
      },
      distributeDepartmentTree: [],
      submitting: false,
    };
  },
  methods: {
    show() {
      workOrderApi.distribute.distributeDepartmentTree()
        .then(res => {
          this.distributeDepartmentTree = res.result;
        });
      templateApi.detailByCode(1001)
        .then(res => {
          this.form.comment = res.result.value;
        });
    },
    handleSubmit() {
      this.validateAndConfirm("form", "确定提交吗？")
        .then(res => {
          this.submitting = true;
          const item = this.distributeDepartmentTree.find(item => item.code === this.form.processDepartmentCode)
          return workOrderApi.distribute.distributeTransfer({
            ...this.form,
            processDepartment: item.name,
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
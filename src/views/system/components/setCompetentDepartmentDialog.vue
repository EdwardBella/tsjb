<template>
  <el-dialog
    title="设置主管单位"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" class="white-card">
        <el-form-item v-if="visible" label="选择主管单位：" prop="code">
          <el-select v-model="form.code" placeholder="请选择" style="width: 100%" ref="select">
            <el-option label="无" :value="-1"></el-option>
            <el-option v-for="item in list" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="split"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" plain>关闭</el-button>
        <el-button @click="handleSubmit" :disabled="hasError" :loading="submitting" type="primary">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import * as administrativeDivision from "@/api/administrativeDivision";
import * as mixins from "@/utils/mixins";
import * as validators from "@/utils/validators";
import { update } from "@/api/administrativeDivision";

export default {
  name: "setCompetentDepartmentDialog",
  mixins: [mixins.dialog, mixins.form],
  props: {
    id: { type: Number, default: 0 },
    leaderDepartmentCode: { type: String, default: "" },
  },
  data() {
    return {
      list: [],
      form: {
        code: ""
      },
      rules: {
        code: [{ required: true, message: "请选择" }]
      },
      hasError: false,
      submitting: false
    };
  },
  watch: {
    form: {
      handler() {
        this.hasError = validators.validate(this.form, this.rules);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    show() {
      this.list = []
      this.form.code = this.leaderDepartmentCode

      this.getList();
    },

    getList() {
      administrativeDivision.list(this.id)
        .then(res => {
          this.list = res.result;
        });
    },
    handleSubmit() {
      this.submitting = true;
      this.validateAndConfirm("form",'确认提交吗？')
        .then(() => {
          let item;
          if (this.form.code === -1) {
            item = {
              code: "",
              name: ""
            };
          } else {
            item = this.getItemByCode(this.list, this.form.code);
          }
          return administrativeDivision.update({
            "id": this.id,
            "leaderDepartmentCode": item.code,
            "leaderDepartmentName": item.name
          });
        })
        .then(() => {
          this.$emit("success");
          this.handleClose();
        })
        .finally(() => this.submitting = false);
    },
    getItemByCode(list, code) {
      for (const item of list) {
        if (item.code === code) return item;
      }
    },
  }
};
</script>

<style scoped>

</style>
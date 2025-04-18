<template>
  <el-dialog
    :title="`${type === 1 ? '添加' : '编辑'}分类`"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="white-card">
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" style="width: 100%;"></el-input>
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
import * as mattersApi from "@/api/matters";
import * as validators from "@/utils/validators";
const form = {
  name: "",
}
export default {
  name: "addItemcategoryDialog",
  props: {
    visible: { type: Boolean, default: false },
    type: { type: Number, default: 1 },
    node: { type: Object, default: Object },
  },
  data() {
    return {
      loading: false,
      submitting: false,
      hasError: false,
      form: {...form},
      rules: {
        name: [
          { required: true, message: "请填写事项名称" },
          { validator: validators.limitMax(200) }
        ],
      }
    };
  },
  watch: {
    form: {
      handler() {
        this.hasError = validators.validate(this.form, this.rules)
      },
      deep: true,
      immediate: true
    },
    visible() {
      this.handleReset()
      if (this.type === 2) {
        this.loading = true
        this.form.name = this.node.name
        this.$nextTick(() => {
          this.loading = false
        })
      }
    },
  },
  methods: {
    handleClose() {
      this.handleReset()
      this.$emit("update:visible", false);
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        const form = {...this.form}
        let promise
        if (this.type === 1) {
          promise = mattersApi.addItemcategory
        } else {
          form.id = this.node.id
          promise = mattersApi.editItemcategory
        }

        this.submitting = true;
        promise(form)
          .then(res => {
            this.$modal.msgSuccess("提交成功");
            this.handleClose();
            this.handleReset();
            this.$emit("success", res.result);
          })
          .finally(() => {
            this.submitting = false;
          });
      });

    },
    handleReset() {
      this.form = {...form}
      this.$refs.form && this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
  color: #666666;
  margin-left: 10px;
}
</style>
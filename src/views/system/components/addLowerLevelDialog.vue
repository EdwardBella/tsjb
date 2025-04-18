<template>
  <el-dialog
    title="创建下级"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" class="white-card">
        <el-form-item label="输入下级名称：" prop="name">
          <el-input v-model="form.name" maxlength="50" placeholder="请输入下级名称" style="width: 100%;"></el-input>
        </el-form-item>

        <el-form-item label="编号：" prop="code">
          <el-input v-model="form.code" maxlength="4" placeholder="请输入编号" style="width: 100%"></el-input>
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
import * as mixins from "@/utils/mixins"
import * as validators from "@/utils/validators"
import { limit } from '@/utils/validators'

export default {
  name: "addLowerLevelDialog",
  mixins: [mixins.dialog, mixins.form],
  props: {
    id: { type: Number, default: 0 },
    type: { type: String, default: 'add' },
    name: { type: String, default: '' },
    code: { type: String, default: '' }
  },
  data() {
    return {
      form: {
        name: '',
        code: undefined
      },
      rules: {
        name: [{ required: true, message: '请填写输入下级名称' }],
        code: [
          { required: true, message: '请填写输入编号' },
          { validator: validators.number() },
          { validator: validators.limitMax(4, '请输入4位编号') },
          { validator: validators.limitMin(4, '请输入4位编号') }
        ]
      },
      hasError: false,
      submitting: false
    }
  },
  watch: {
    form: {
      handler() {
        this.hasError = validators.validate(this.form, this.rules)
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    show() {
      if (this.type === 'edit') {
        this.form = {
          code: this.code,
          name: this.name
        }
      }
    },
    handleSubmit() {
      this.submitting = true
      this.validateAndConfirm('form')
        .then(() => {
          const form = { ...this.form }
          form[this.type === 'add' ? 'parentId' : 'id'] = this.id
          if (this.type === 'edit') {
            form.parentId = this.id
            return administrativeDivision.modify(form)
          }
          form.id = this.id
          return administrativeDivision.add(form)
        })
        .then(() => {
          this.$emit('success')
          this.handleClose()
        })
        .finally(() => this.submitting = false)
    }
  }
};
</script>

<style scoped>

</style>
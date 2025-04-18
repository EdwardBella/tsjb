<template>
  <el-dialog
    title="编辑配置项"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="95px" label-suffix="：">
        <el-form-item label="配置项">{{ details.name }}</el-form-item>

        <el-form-item label="值" prop="value">
          <el-input v-model="form.value" type="text"></el-input>
        </el-form-item>

      </el-form>

      <div class="split" style="margin: 30px 0"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" type="primary" plain>关闭</el-button>
        <el-button @click="handleSubmit" :loading="submitting" type="primary">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import * as configureAPI from '@/api/configure'
import * as departmentConfigureAPI from '@/api/departmentConfigure'
import * as mixins from '@/utils/mixins'
import * as validators from '@/utils/validators'

export default {
  name: 'roleEditor',
  mixins: [mixins.dialog, mixins.form],
  props: {
    type: { type: String, default: 'configure' },
    details: { type: Object, default: Object }
  },
  data() {
    return {
      form: {
        value: ''
      },
      rules: {
        value: [
          validators.required(),
          {
            validator(rule, value, callback) {
              const values = value.split(';')
              if (values.length !== 2 && this.type === 'departmentConfigure') {
                callback(new Error('请使用英文`;`分割填写'))
              }
              callback()
            }
          }
        ]
      },
      submitting: false
    };
  },
  methods: {
    show() {
      if (this.type === 'departmentConfigure') {
        this.form.value = this.details.value + ';' + this.details.customName
      } else {
        this.form.value = this.details.value
      }

    },
    hide() {
    },
    handleSubmit() {
      this.submitting = true
      this.validateAndConfirm('form')
        .then(() => {
          const [value, customName] = this.form.value.split(';')
          const params = {
            value,
            customName,
            id: this.details.id
          }
          if (this.type === 'configure') {
            return configureAPI.edit(params)
          } else {
            params.deptCode = this.details.deptCode
            params.configureId = this.details. configureId
            return departmentConfigureAPI.edit(params)
          }
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
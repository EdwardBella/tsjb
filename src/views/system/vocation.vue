<template>
  <div>
    <el-button @click="handleOpen()" type="primary" style="margin-bottom: 20px">创建行业领域</el-button>

    <tablePage
      ref="tablePage"
      hide-search
      :requestFunc="requestFunc"
    >
      <template slot="rows">
        <el-table-column prop="industrySectorName" label="行业领域" show-overflow-tooltip></el-table-column>
        <el-table-column prop="departmentCount" label="包含部门数"></el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" plain size="mini" @click="handleOpen(row)">编辑</el-button>
            <el-button type="primary" plain size="mini" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </tablePage>

    <el-dialog
      :title="`${editorDialog.isEdit ? '编辑' : '创建'}行业领域`"
      width="640px"
      top="20px"
      :visible="editorDialog.visible"
      @close="handleClose"
    >
      <div>
        <el-form ref="form"  :model="editorDialog.form" :rules="editorDialog.rules" class="white-card">
          <el-form-item label="名称：" prop="name">
            <el-input placeholder="请输入名称" maxlength="100" v-model.trim="editorDialog.form.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="split"></div>
        <div class="dialog-footer-btn">
          <el-button @click="handleClose" plain>关闭</el-button>
          <el-button @click="handleSubmit" :loading="editorDialog.submitting" type="primary">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tablePage from '@/components/tablePage'
import configEditorDialog from '@/views/system/components/configEditorDialog'
import * as vocationAPI from '@/api/vocation'


export default {
  name: 'vocation',
  components: { configEditorDialog, tablePage },
  data() {
    return {
      searchForm: {
        code: ''
      },
      departmentTree: [],
      editorDialog: {
        visible: false,
        isEdit: true,
        form: {
          name: '',
        },
        rules: {
          name: { required: true, message: '请输入名称'},
        },
        submitting: false
      },
      currentRow: {}
    }
  },
  methods: {
    requestFunc: vocationAPI.list,
    handleOpen(row) {
      this.editorDialog.visible = true
      const isEdit = Boolean(row)
      this.editorDialog.isEdit = isEdit
      if (isEdit) {
        this.currentRow = row
        this.$nextTick(() => {
          this.editorDialog.form.name = row.industrySectorName
        })
      }
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.editorDialog.visible = false
      this.currentRow = {}
    },
    handleSubmit() {
      this.$refs.form.validate()
        .then(() => {
          const form = { newIndustrySectorName: this.editorDialog.form.name }
          this.editorDialog.submitting = true
          return this.editorDialog.isEdit
            ? vocationAPI.edit({...form, oldIndustrySectorName: this.currentRow.industrySectorName})
            : vocationAPI.add(form)
        })
        .then(() => {
          this.$modal.msgSuccess('提交成功')
          this.$refs.tablePage.playLoadData()
          this.handleClose()
        })
        .finally(() => {
          this.editorDialog.submitting = false
        })
    },
    handleDelete(row) {
      if (row.departmentCount > 0) return this.$modal.msgWarning('当前行业领域存在关联部门，无法删除！')
      return this.$confirm('是否确认删除', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return vocationAPI.del({ industrySectorName: row.industrySectorName })
        })
        .then(() => {
          this.$modal.msgSuccess('删除成功')
          this.$refs.tablePage.playLoadData()
        })
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <tablePage
      ref="tablePage"
      hideSearch
      :searchForm="searchForm"
      :requestFunc="requestFunc"
    >
      <template slot="search-form">
        <el-form-item prop="code">
          <el-cascader
            ref="cascader"
            style="width: 100%"
            v-model="searchForm.code"
            :props="{ children: 'children', label: 'name', value: 'deptCode', expandTrigger: 'hover', emitPath: false, checkStrictly: true}"
            :options="departmentTree"
            :show-all-levels="false"
            placeholder="请选择部门"
            @change="$refs.cascader && $refs.cascader.toggleDropDownVisible(false);"
          ></el-cascader>
        </el-form-item>
      </template>
      <template slot="rows">
        <el-table-column type="index" label="序号" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="配置项" show-overflow-tooltip></el-table-column>
        <el-table-column prop="value" label="值">
          <template slot-scope="{row}">
            {{ row.value }};{{ row.customName }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" plain size="mini" @click="handleShowRoleEditorDialog(row)">编辑</el-button>
          </template>
        </el-table-column>


      </template>

    </tablePage>
    <configEditorDialog type="departmentConfigure" :visible.sync="configEditorDialog.visible" :details="currentRow" @success="handleEditSuccess"></configEditorDialog>
  </div>
</template>

<script>
import tablePage from '@/components/tablePage'
import configEditorDialog from '@/views/system/components/configEditorDialog'
import * as departmentConfigureAPI from '@/api/departmentConfigure'
import * as statisticsApi from '@/api/statistics'
import { removeEmptyChildren } from '@/utils/common'


export default {
  name: 'departmentConfigure',
  components: { configEditorDialog, tablePage },
  data() {
    return {
      searchForm: {
        code: ''
      },
      departmentTree: [],
      configEditorDialog: {
        visible: false
      },
      currentRow: {}
    }
  },
  created() {
    this.fetchDepartmentTree()
  },
  methods: {
    requestFunc: departmentConfigureAPI.getList,
    fetchDepartmentTree() {
      statisticsApi.getByCode()
        .then(res => {
          const result = res.result
          if (result) {
            removeEmptyChildren([result])
            this.departmentTree = [result]
          }
        })
    },
    handleEditSuccess() {
      this.$refs.tablePage.playLoadData()
    },
    handleShowRoleEditorDialog(row) {
      this.currentRow = { ...row }
      this.configEditorDialog.visible = true
    }
  }
}
</script>

<style scoped>

</style>
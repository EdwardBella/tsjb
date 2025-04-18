<!--案件时效信息（承办部门）-->

<template>
  <el-table
    slot="content"
    :data="rows"
    stripe
    v-loading="loading"
    row-key="administrativeDivisionId"
    lazy
    :load="handleLoad"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    ></el-table-column>
  </el-table>
</template>

<script>
import * as statisticsAPI from '@/api/statistics'

export default {
  name: 'caseTimelinessDepartmentCount',
  props: {
    department: { type: Number, default: undefined }
  },
  data() {
    return {
      loading: false,
      rows: [],
      // 案件状态信息（行政区划）
      columns: [
        { label: '部门名称', prop: 'departmentName', width: '500px' },
        // { label: '超期未受理案件', prop: 'overUnAcceptNumber' },
        { label: '超期未处理案件', prop: 'overUnHandlerNumber' },
        { label: '超期未结案案件', prop: 'overHandlerNumber' },
        { label: '超期未审批案件', prop: 'overUnApprovalNumber' },
      ]
    }
  },
  watch: {
    department: {
      handler(val) {
        this.playLoadData()
      },
      immediate: true
    }
  },
  methods: {
    playLoadData() {
      this.loading = true
      statisticsAPI.caseTimelinessDepartmentCount({ administrativeDivisionId: this.department })
        .then(res => {
          if (res.result) {
            this.rows = res.result.map(item => {
              // item.children = []
              item.hasChildren = item.hasSubAdministration
              return item
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleLoad(tree, treeNode, resolve) {
      statisticsAPI.caseTimelinessDepartmentCode({ code: tree.code })
        .then(res => {
          const result = res.result.map(item => {
            item.hasChildren = true
            return item
          })
          if (result.length === 0) this.$modal.msgWarning('没有下级数据!')
          resolve(result)
        })
        .catch(() => resolve([]))
    }
  }
}
</script>

<style scoped>

</style>
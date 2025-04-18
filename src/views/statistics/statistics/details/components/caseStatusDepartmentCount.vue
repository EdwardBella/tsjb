<!--案件状态信息（承办部门）-->

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
      v-for="(item, idx) in columns"
      :key="idx"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    ></el-table-column>
  </el-table>
</template>

<script>
import * as statisticsAPI from '@/api/statistics'
import { caseStatusDepartmentCount } from '@/api/statistics'

export default {
  name: 'caseStatusDepartmentCount',
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
        { label: '承办总数', prop: 'processTotalNumber' },
        { label: '待确认', prop: 'unConfirmNumber' },
        { label: '回退中', prop: 'appealingNumber' },
        { label: '调查中', prop: 'surveyNumber' },
        { label: '已中止', prop: 'terminatedNumber' },
        { label: '待办结', prop: 'unCompleteNumber' },
        { label: '已办结', prop: 'completedNumber' },
        // { label: '待受理', prop: 'unApplyNumber' },
        // { label: '不受理', prop: 'unAcceptedNumber' }
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
      statisticsAPI.caseStatusDepartmentCount({ administrativeDivisionId: this.department })
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
      statisticsAPI.caseStatusDepartmentCode({ code: tree.code })
        .then(res => {
          const result = res.result.map(item => {
            item.hasChildren = item.hasSubAdministration
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
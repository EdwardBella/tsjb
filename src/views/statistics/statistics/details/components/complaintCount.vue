<!--案件状态信息（承办部门）-->

<template>
  <el-table
    slot="content"
    :data="rows"
    stripe
    v-loading="loading"
    row-key="administrativeDivisionId"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column
      v-for="(item, idx) in columns"
      :key="idx"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
  </el-table-column>
  </el-table>
</template>

<script>
import * as statisticsAPI from '@/api/statistics'
import { caseStatusDepartmentCount } from '@/api/statistics'

export default {
  name: 'complaintCount',
  props: {
    department: { type: Number, default: undefined }
  },
  data() {
    return {
      loading: false,
      rows: [],
      // 案件状态信息（行政区划）
      columns: [
        { label: '部门', prop: 'administrativeName', width: '500px' },
        { label: '已受理总欠款（元）', prop: 'acceptedAmount' },
        { label: '已办结总欠款（元）', prop: 'finishedAmount' },
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
      statisticsAPI.complaintCount({ administrativeDivisionId: this.department })
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
      statisticsAPI.complaintCount({ code: tree.code })
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
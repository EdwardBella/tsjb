<template>
  <el-table
    slot="content"
    :data="rows"
    stripe
    row-key="administrativeName"
    :lazy="tableOptions.lazy"
    :load="handleLoad"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column
      v-for="item in caseStatusAdministrativeCount.columns"
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
  name: 'detailsTable',
  props: {
    api: { type: String, required: true }
  },
  data() {
    return {
      rows: [],
      departmentCode: '101',
      // 案件状态信息（行政区划）
      caseStatusAdministrativeCount: {
        lazy: true,
        columns: [
          { label: '行政区划', prop: 'administrativeName', width: '500px' },
          { label: '待确认', prop: 'unConfirmNumber' },
          { label: '回退中', prop: 'appealingNumber' },
          { label: '调查中', prop: 'surveyNumber' },
          { label: '已中止', prop: 'terminatedNumber' },
          { label: '已办结', prop: 'completedNumber' },
          { label: '不受理', prop: 'unAcceptedNumber' }
        ],
      },
      caseStatusDepartmentCount: {
        lazy: false,
        columns: [
          { label: '行政区划', prop: 'administrativeName', width: '500px' },
          { label: '待确认', prop: 'unConfirmNumber' },
          { label: '回退中', prop: 'appealingNumber' },
          { label: '调查中', prop: 'surveyNumber' },
          { label: '已中止', prop: 'terminatedNumber' },
          { label: '已办结', prop: 'completedNumber' },
          { label: '不受理', prop: 'unAcceptedNumber' }
        ],
      }
    }
  },
  computed: {
    tableOptions() {
      return this[this.api]
    }
  },
  created() {
    this.playLoadData()
  },
  methods: {
    playLoadData() {
      statisticsAPI[this.api]({ administrativeDivisionId : this.departmentCode })
        .then(res => {
          this.rows = res.result.map(item => {
            item.hasChildren = true
            return item
          })
        })
    },
    handleLoad(tree, treeNode, resolve) {
      // TODO
      statisticsAPI[this.api]({ departmentCode: tree.departmentCode || '101' })
      .then(res => {
        const result = res.result.map(item => {
          item.hasChildren = true
          // TODO
          item.administrativeName = tree.administrativeName + '001'
          return item
        })
        console.log(result)
        resolve(result)
      })
    }
  }
}
</script>

<style scoped>

</style>
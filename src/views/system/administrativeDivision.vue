<template>
  <div>
    <card>
      <template slot="content">
        <el-form inline>
          <el-form-item label="" prop="">
            <el-input v-model="keyword" placeholder="请输入主管单位识别文本"></el-input>
          </el-form-item>
<!--          <el-form-item label="" prop="">-->
<!--            <el-button @click="handleSet" type="primary" :loading="matching" maxlength="1000">一键设置主管单位</el-button>-->
<!--          </el-form-item>-->
        </el-form>
      </template>
    </card>
    <card class="administrative-division">
      <template slot="content">
        <tree ref="tree"></tree>
      </template>
    </card>
  </div>
</template>

<script>
import card from '@/components/card'
import tree from './components/hierarchy'
import * as administrativeDivision from '@/api/administrativeDivision'

export default {
  name: 'administrativeDivision',
  components: { card, tree },
  data() {
    return {
      keyword: '',
      matching: false
    }
  },
  methods: {
    handleSet() {
      this.matching = true
      administrativeDivision.match({ keyword: this.keyword })
        .then(() => {
          this.$refs.tree.getTree()
          this.keyword = ''
        })
        .finally(() => this.matching = false)

    }
  }
}
</script>

<style scoped>

</style>
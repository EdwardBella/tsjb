<template>
  <div v-loading="loading">
    <div class="header">
      <div>事项名称</div>
<!--      <div>受理时间</div>-->
<!--      <div>主管单位</div>-->
    </div>
    <tree :tree="tree" @select="handleSelect" :selectedRowIndex="selectedRowIndex"></tree>
  </div>
</template>

<script>
import tree from './tree'
import { itemdetailTree } from '@/api/matters'
export default {
  name: "index",
  components: { tree },
  data() {
    return {
      loading: true,
      tree: [],
      selectedRowIndex: ''
    }
  },
  created() {
    this.getItemdetailTree()
  },

  methods: {
    getItemdetailTree() {
      this.loading = true
      itemdetailTree().then(res => {
        const result = res.result
        this.tree = [
          {
            id: result.id,
            name: result.name,
            sort: result.sort,
            itemDetailList: result.categoryList
          }
        ]
      })
      .finally(() => {
        this.loading = false
      })
    },
    handleSelect(node) {
      this.selectedRowIndex = `${node.item_category_id}-${node.id}`
      this.$emit('select', node)
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  margin: 0 -30px 0 -30px;
  padding: 0 20px;
  background-color: #f5f9ff;
  height: 40px;
  line-height: 40px;
  display: flex;
  font-weight: 600;
  text-align: left;
  color: #666666;
  letter-spacing: 1px;
  margin-bottom: 14px;

  & > div {
    padding: 0 10px;
    width: 50%;
    box-sizing: border-box;

    //&:first-child {
    //  width: 285px;
    //}

    //&:last-child,
    //&:nth-child(2) {
    //  width: 167.5px;
    //}

    //&:last-child {
    //  text-align: right;
    //}
  }


}
</style>
<template>
  <ul class="tree">
    <li v-for="(node, index) in tree" :key="node.id" :class="{'is-unfold': unfoldMap[`${level}-${node.id}`]}">
      <div class="row">
        <div @click="handleUnfold(level, index, node)" class="name" :style="`padding-left: ${28 * (level - 1)}px`">
          <i v-if="level < 3 " :class="`img icon-${unfoldMap[`${level}-${node.id}`] ? '' : 'un'}fold`"></i>{{node.name}}
        </div>
        <div class="info">
          <el-button v-if="[1].includes(level)" @click="$emit('showDialog', { node, type: 1, level, index })" type="primary" plain size="mini">添加分类</el-button>
          <el-button v-if="[2].includes(level)" @click="$emit('showDialog', { node, type: 1, level, index })" type="primary" plain size="mini">添加事项</el-button>
          <el-button v-if="[2, 3].includes(level)" @click="$emit('showDialog', { node, type: 2, level, index })" type="primary" plain size="mini">编辑</el-button>
<!--          <template v-if="node.itemDetailList && !node.itemDetailList.length">-->
            <el-popconfirm v-if="[3].includes(level) || ([2].includes(level) && node.itemDetailList && !node.itemDetailList.length)" title="确认删除吗？" @confirm="$emit('delete',{id: node.id, level, index})">
              <el-button slot="reference" type="primary" plain size="mini">删除</el-button>
            </el-popconfirm>
<!--          </template>-->
          <el-button v-if="[2, 3].includes(level) && index !== 0" @click="$emit('prev', { node, level, index })" type="primary" plain size="mini">上移</el-button>
          <el-button v-if="[2, 3].includes(level) && index !== tree.length - 1" @click="$emit('next', { node, level, index })" type="primary" plain size="mini">下移</el-button>
        </div>
      </div>
      <tree v-bind="$attrs" v-on="$listeners" v-if="node.itemDetailList" :tree="node.itemDetailList" :level="level + 1"></tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree",
  props: {
    tree: { type: Array, required: true },
    level: { type: Number, default: 1 }
  },
  data() {
    return {
      list: [],
      unfoldMap: {}
    }
  },
  created() {
    this.list = this.tree
  },
  methods: {
    getLevelTree(level, index, id) {
      if (level === 1) {
        return this.tree[0]
      }
      if (level === 2) {
        return this.tree[0].itemDetailList[index]
      }
      // return this.tree[0].itemDetailList[index].find(item => item.id == id)
    },

    handleUnfold(level, index, node) {
      this.$set(this.unfoldMap, `${level}-${node.id}`, !this.unfoldMap[`${level}-${node.id}`])
      console.log(this.unfoldMap)
    }
  }
};
</script>

<style lang="less" scoped>
  .tree {

    li {
      height: 30px;
      overflow: hidden;

      &.is-unfold {
        height: auto;
      }
    }

    .row {
      display: flex;
      //margin: 8px 0;
      cursor: pointer;
      user-select:none;
      margin-bottom: 1px;

      &:hover {
        background: #f5f9ff;
      }

      .info {
        display: flex;
        align-items: center;
      }

      .name {
        box-sizing: border-box;
        width: 500px;
        line-height: 30px;
        word-wrap: break-word;
        word-break: break-all;
        margin-right: 8px;
        //padding-left: 28px;

        i {
          position: relative;
          top: 2px;
        }
      }
    }
  }
</style>
<style lang="less">
.tree {
  .info {
    &>* {
      margin: 0 20px 0 0;
    }
  }
}
</style>
<template>
  <ul class="tree">
    <li v-for="(node, index) in tree" :key="node.id" :class="{'is-unfold': unfoldMap[`${level}-${node.id}`]}">
      <div class="row" :class="{'is-selected': selectedRowIndex === `${level}-${node.id}`}">
        <div @click="handleUnfold(level, index, node)" class="name" :style="`padding-left: ${28 * (level - 1) + 10}px`">
          <i
            v-if="level < 3 " :class="`img icon-${unfoldMap[`${level}-${node.id}`] ? '' : 'un'}fold`"
          ></i>{{ node.name }}
        </div>
        <div class="deadline">{{ node.leaderDepartmentName }}</div>

        <div class="operate">
          <el-button v-if="[1, 2].includes(level)" @click="$emit('showAddLowerLevelDialog', { node, type: 1, level, index })" type="primary" plain size="mini">创建下级</el-button>
          <el-button v-if="[1, 2, 3].includes(level)" @click="$emit('showSetCompetentDepartmentDialog', { node, type: 1, level, index })" type="primary" plain size="mini">设置主管单位</el-button>
          <el-button v-if="[2, 3].includes(level)" @click="$emit('edit', { node, type: 1, level, index })" type="primary" plain size="mini">编辑</el-button>
          <el-button v-if="[2, 3].includes(level) && index !== 0" @click="$emit('prev', { node, level, index })" type="primary" plain size="mini">上移</el-button>
          <el-button v-if="[2, 3].includes(level) && index !== tree.length - 1" @click="$emit('next', { node, level, index })" type="primary" plain size="mini">下移</el-button>
          <el-button v-if="[2, 3].includes(level)" @click="$emit('del', { node, type: 1, level, index })" type="primary" plain size="mini">删除</el-button>
        </div>
      </div>
      <tree v-bind="$attrs" v-on="$listeners" v-if="node.subList" :tree="node.subList" :level="level + 1"></tree>
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
      unfoldMap: {},
      selectedRowIndex: ""
    };
  },
  created() {
    this.list = this.tree;
  },
  methods: {
    handleUnfold(level, index, node) {
      this.$set(this.unfoldMap, `${level}-${node.id}`, !this.unfoldMap[`${level}-${node.id}`]);
    },
  }
};
</script>

<style lang="less" scoped>
.tree {

  li {
    height: 40px;
    overflow: hidden;

    &.is-unfold {
      height: auto;
    }
  }

  .row {
    display: flex;
    padding: 8px 0;
    cursor: pointer;
    user-select: none;
    width: 100%;

    & > div {
      box-sizing: border-box;
      padding: 0 10px;
      width: calc(100% / 3);

      &.operate {
        min-width: 480px;
      }
    }

    &:hover {
      background: #f5f9ff;
    }

    .name {
      box-sizing: border-box;
      //width: 390px;
      line-height: 24px;
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
    & > * {
      margin: 0 20px 0 0;
    }
  }
}
</style>
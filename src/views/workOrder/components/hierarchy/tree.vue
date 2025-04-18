<template>
  <ul class="tree">
    <li v-for="(node, index) in tree" :key="node.id" :class="{'is-unfold': unfoldMap[`${level}-${node.id}`]}">
      <div class="row" :class="{'is-selected': selectedRowIndex === `${node.item_category_id}-${node.id}`}" @click="handleSelect(level, node)">
        <div @click="handleUnfold(level, index, node)" class="name" :style="`padding-left: ${28 * (level - 1)}px`">
          <i v-if="level < 3 " :class="`img icon-${unfoldMap[`${level}-${node.id}`] ? '' : 'un'}fold`"></i>{{node.name}}
        </div>
        <template v-if="level === 3">
<!--          <div class="deadline">{{node.deadline}}个工作日</div>-->
<!--          <div class="department">{{node.accept_department}}</div>-->
        </template>
      </div>
      <tree v-bind="$attrs" v-on="$listeners" v-if="node.itemDetailList" :tree="node.itemDetailList" :level="level + 1" :selectedRowIndex="selectedRowIndex"></tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree",
  props: {
    tree: { type: Array, required: true },
    level: { type: Number, default: 1 },
    selectedRowIndex: { type: String, default: '' }
  },
  data() {
    return {
      list: [],
      unfoldMap: {},
    }
  },
  created() {
    this.list = this.tree
  },
  methods: {

    handleUnfold(level, index, node) {
      this.$set(this.unfoldMap, `${level}-${node.id}`, !this.unfoldMap[`${level}-${node.id}`])
    },
    handleSelect(level, node) {
      if (level === 3) {
        // this.selectedRowIndex = `${level}-${node.item_category_id}-${node.id}`
        this.$emit('select', {...node})
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .tree {
    li {
      height: 20px;
      margin: 5px 0;
      overflow: hidden;
      &.is-unfold {
        height: auto;
      }
    }
    .row {
      display: flex;
      cursor: pointer;
      user-select:none;

      &.is-selected,
      &:hover {
        background: #f5f9ff;
      }
      .name {
        box-sizing: border-box;
        width: 100%;
        line-height: 20px;

        i {
          position: relative;
          top: 3px;
        }
      }

      .deadline,
      .department {
        box-sizing: border-box;
        padding: 0 10px;
        width: 50%;
        line-height: 20px;
      }

      .deadline {
        padding: 0 10px 0 20px;
      }

      .department {
        padding: 0 10px;
        text-align: right;
      }
    }
  }
</style>
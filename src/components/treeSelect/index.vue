<template>
  <el-popover
    ref="popover"
    placement="bottom-start"
    width="800"
    @show="suffixIcon = 'el-icon-arrow-down'"
    @hide="suffixIcon = 'el-icon-arrow-up'"
    trigger="click">
    <el-tree
      class="tree-select"
      ref="tree"
      :data="rawData"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick">
    </el-tree>

    <el-input
      style="width: 500px"
      :value="selected.name"
      readonly
      slot="reference"
      popper-class="tree-select"
      placeholder="请选择"
      :suffix-icon="suffixIcon"
    >
    </el-input>
<!--    <el-select v-model="value" ></el-select>-->
  </el-popover>
</template>

<script>
export default {
  name: 'index',
  props: {
    rawData: { type: Array, default: Array },
    value: { type: [Number, String], required: true }
  },
  data() {
    return {
      suffixIcon: 'el-icon-arrow-up',
      selected: {},
      defaultProps: {
        children: 'itemDetailList',
        label: 'name'
      }
    }
  },
  watch: {
    rawData: {
      handler(val) {
        if (val.length && this.value && !this.selected[this.defaultProps.label]) {
          for (const item of val) {
            for (const item of item.itemDetailList) {
              if (item.id === this.value) {
                this.selected = {...item}
              }
            }
          }
        }
      },
      immediate: true
    },

  },
  methods: {
    handleNodeClick(data) {
      if (!data[this.defaultProps.children]) {
        this.selected = { ...data }
        this.$emit('input', this.selected.id)
        this.$refs.popover.showPopper = false
      }

    }
  }
}
</script>

<style lang="less">
.tree-select.el-select-dropdown {
  display: none;
}

.tree-select {
  flex: 1;
  .el-tree-node {
    white-space: normal;

    .el-tree-node__content {
      height: auto;
      min-height: 26px;
    }
  }
}
</style>
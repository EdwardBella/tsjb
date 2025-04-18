<template>
  <div class="multi-checkbox">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="width: auto;">全选</el-checkbox>
    <div class="split"></div>
    <el-checkbox-group  v-model="model" @change="handleCheckedItemChange">
      <el-checkbox v-for="node in items" :label="node.id" :key="node.id" :style="`width: ${itemWidth}`">{{ node.name }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    items: { type: Array, default: Array },
    value: { type: Array, default: [] },
    itemWidth: { type: String, default: 'inherit' }
  },
  data() {
    return {
      isIndeterminate: false,
      checkAll: false,
      checkedValues: [],
      model: []
    }
  },
  watch: {
    value: {
      handler(val) {
        let checkedCount = val.length;
        this.checkAll = checkedCount === this.items.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length;
        this.model = [...this.value]
      },
      immediate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.$emit('input', val ? this.items.map(node => node.id) : [])
    },
    handleCheckedItemChange(val) {
      this.$emit('input', val)
    }
  }
};
</script>

<style scoped lang="less">
.multi-checkbox {
}
</style>

<style lang="less">

</style>
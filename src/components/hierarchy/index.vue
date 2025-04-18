<template>
  <tree :tree="tree" v-slot:default="{node}">
    <slot :node="node"></slot>
  </tree>
</template>

<script>
import tree from './tree'
import { itemdetailTree } from '@/api/matters'
export default {
  name: "index",
  components: { tree },
  data() {
    return {
      tree: []
    }
  },
  created() {
    this.getItemdetailTree()
  },

  methods: {
    getItemdetailTree() {
      itemdetailTree().then(res => {
        this.tree = res.result
      })
    }
  }
};
</script>

<style scoped>

</style>
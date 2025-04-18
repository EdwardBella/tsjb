<template>
<div class="warp" v-loading="loading">
  <div v-if="noData" class="no-data">
    暂时没有数据！
  </div>
  <slot v-else></slot>
</div>
</template>

<script>
export default {
  name: "warp",
  props: {
    loading: { type: Boolean, default: false },
    noData: { type: Boolean, default: false }
  }
};
</script>

<style scoped>

</style>
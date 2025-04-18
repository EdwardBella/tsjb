<template>
  <div v-loading="loading" class="complain-list">
    <template v-if="list.length">
      <template v-for="item in list">
        <slot :item="item"></slot>
      </template>
    </template>
    <p v-else class="tips">没有数据</p>
  </div>

</template>

<script>
import complainItem from "@/views/wap/components/complainItem";

export default {
  name: "complainList",
  props: {
    list: { type: Array, default: Array },
    path: { type: String, default: String },
    loading: { type: Boolean, default: false }
  },
  components: { complainItem }
};
</script>

<style lang="less" scoped>
.complain-list {
  width: 100%;

}
</style>
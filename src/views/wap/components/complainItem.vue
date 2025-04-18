<template>
  <div class="complain-item">
    <div class="title ellipsis-2">{{ item.title }}</div>
    <div v-if="hideContent === false" class="content ellipsis-4">{{ item.comment }}</div>
    <div class="footer">
      <span class="time">{{ item.createTime | yyyymmdd }}</span>
      <span>
        <template >
          <slot name="bottom-right" :item="item">{{ item.itemDetailName }}</slot>
        </template>
<!--        <template v-else>-->
<!--          {{ item.itemDetailName }}-->
<!--        </template>-->

      </span>
    </div>
  </div>
</template>

<script>
import { yyyymmdd } from "@/utils/filters";
import * as mixins from '@/views/wap/mixin'
export default {
  name: "complainItem",
  mixins: [mixins.iframe],
  filters: { yyyymmdd },
  props: {
    item: { type: Object, default: Object },
    path: { type: String, default: String },
    hideContent: { type: Boolean, default: false }
  }
};
</script>

<style lang="less" scoped>
.complain-item {

  padding: .2rem;
  border-bottom: 1px solid #f2f2f2;
  .title {
    margin-bottom: .2rem;
  }

  .content {
    margin-bottom: .2rem;
    font-size: 0.24rem;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.24rem;
    color: #ccc;
  }
}
</style>
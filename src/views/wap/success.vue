<template>
  <warp :hasPrevRoute="routerMap[$route.path]">
    <div style="padding: .2rem">
    <i class="el-icon-success"></i>
    <p>提交成功</p>
    <p class="text">投诉举报内容已经提交成功，我们将会在第一时间受理，请耐心等待</p>

    <button class="full-button primary" @click="handleBlack">返回</button>
    </div>
  </warp>
</template>

<script>
import warp from "@/views/wap/components/warp";
import * as mixins from '@/views/wap/mixin'
export default {
  name: "success",
  mixins: [mixins.iframe, mixins.router],
  components: { warp },
  methods: {
    handleBlack() {
      const backPath = this.$route.query.backPath
      backPath ? this.$router.replace(backPath) : this.backIndex()
    }
  }
};
</script>

<style lang="less" scoped>
  div {
    text-align: center;
    i {
      color: @color-success;
      margin-top: .2rem;
      font-size: 2.5rem !important;
    }
    p {
      margin-top: .2rem;
    }

    .text {
      font-size: .26rem;
      color: @color-text;
    }
  }

</style>
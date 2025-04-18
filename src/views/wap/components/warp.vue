<template>
  <div class="complain-warp-wap">
    <div v-if="hideHeader === false" class="header">
      <div class="left" @click="handleBack"><img src="../../../assets/images/wap/icon-right.png" alt=""></div>
      <div class="center">{{title}}</div>
      <div class="right">
        <slot name="right"></slot>
<!--        <img src="../../../assets/images/wap/icon-search.png" alt="">-->
      </div>
    </div>
    <div v-loading="loading">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import * as mixins from '@/views/wap/mixin'

export default {
  name: "warp",
  mixins: [mixins.iframe],
  props: {
    title: { type: String, default: "投诉举报" },
    loading: { type: Boolean, default: false },
    hideHeader: { type: Boolean, default: false },
    hasPrevRoute: { type: Boolean, default: false}
  },
  mounted() {
    if (window.history.length <= 1) {
      if (location.href.indexOf("?") === -1) {
        window.location.href = location.href + "?goindex=true";
      } else if (location.href.indexOf("?") !== -1 && location.href.indexOf("goindex") === -1) {
        window.location.href = location.href + "&goindex=true";
      }
    }

  },
  methods: {
    handleBack() {
      if (this.hasPrevRoute) {
        this.$router.back()
      } else {
        if (this.$route.path.indexOf('/my') > -1) {
          this.backPersonCenter()
        } else {
          this.backIndex();
        }

      }
    }
  }
};
</script>

<style scoped lang="less">
.complain-warp-wap {
  font-size: .3rem;
  -webkit-overflow-scrolling:touch;
  overflow:auto;
  //min-height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: .38rem;
    width: 100%;
    height: .96rem;
    position: sticky;
    z-index: 20;
    top: 0;
    left: 0;
    padding: .28rem .39rem;
    box-sizing: border-box;
    background: linear-gradient(165deg, #0080FF 0%, #0F36B8 100%);

    .left,
    .right {
      height: .33rem;
      width: .33rem;
      img {
        display: block;
        width: 100%;
      }
    }

    .center {
      font-size: .32rem;
      color: #fff;
      line-height: .4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
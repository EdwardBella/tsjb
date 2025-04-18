<template>
  <div>
    <div v-if="visible" class="mask" @click="handleClose"></div>
    <div class="drawer" :class="{'visible' : visible}">
      <div class="header">
        <div></div>
        <div class="title">{{ title }}</div>
        <div @click="handleClose"><i class="el-icon-close close"></i></div>
      </div>

      <div class="content">
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "drawer",
  props: {
    title: { type: String, default: "" },
    visible: { type: Boolean, default: false }
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    }
  }
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
  z-index: 99;
}

.drawer {
  z-index: 100;
  position: fixed;
  width: 100%;
  bottom: -1000%;
  left: 0;
  background-color: #fff;

  &.visible {
    bottom: 0;

  }

  .header {
    display: flex;
    align-items: center;
    padding: .2rem;
    border-bottom: 1px solid #efefef;

    & > div {
      width: .5rem;
    }

    .title {
      flex: 1;
      width: auto;
      text-align: center;
      font-size: .4rem;
    }

    .close {
      font-size: .4rem;
    }
  }

  .content {
    padding: .2rem;
  }
}
</style>
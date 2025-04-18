<template>
  <div v-if="visible" class="drawer" :style="styleWidth">
    <div class="wrapper">
      <div class="header">
        <div class="left" v-if="isShowClose"><el-button @click="$emit('close')" type="primary" plain>关闭</el-button></div>
        <span class="title" style="font-size: 22px;letter-spacing: 4px;">{{title}}</span>
        <!-- <div class="right"><slot name="headerRight"></slot></div> -->
      </div>
      <div class="body">
        <slot></slot>
      </div>
<!--      <div class="footer"></div>-->
    </div>
    <div class="v-modal"></div>
  </div>
</template>

<script>
export default {
  name: "drawer",
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false },
    styleWidth: { type: String, default: 'width: 50%' },
	isShowClose: { type: Boolean, default: true },
  }
};
</script>

<style lang="less" scoped>
.drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;

  & > .wrapper {
    background-color: #fff;
    height: 100%;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 600;
      color: #323232;
      height: 36px;
      padding: 10px;

      background: #3A64D3;

      .left, .right {
        width: 120px;
      }

      & > .title {
		  width: 100%;
        text-align: center;
        color: #fff;
      }
    }

    & > .body {
      padding: 10px;
      height: calc(100% - 70px);
    }
  }
}
</style>
<template>
    <a class="global-help" :class="type" :href="href" target="_blank">
      <img v-if="showQrCode" src="../../assets/images/qrcode.png" alt="">
    </a>
</template>

<script>
export default {
  name: "index",
  props: {
    type: { type: String, default: 'admin' },  // admin, front
    showQrCode: { type: Boolean, default: false }
  },
  computed: {

    href() {
      return  `${window.frontBaseURL}/${this.type}Help`
      // return this.type === 'admin' ? 'https://docs.qq.com/doc/DWU9PclN3RFViYWZW' : 'https://docs.qq.com/doc/DWUlvWHJ4ZkRSTmhG'
    }
  }
};
</script>

<style lang="less" scoped>
  .global-help {
    display: block;
    background-size: 100%;



    &.admin {
      z-index: 99;
      width: 119px;
      height: 48px;
      position: fixed;
      right: 40px;
      bottom: 20px;
      background-image: url("../../assets/images/global-help-1.png");

      img {
        width: 200px;
        margin-left: -45px;
        margin-top: -250px;
      }
    }

    &.front {
      flex-shrink: 0;
      display: block;
      height: 36px;
      width: 126px;
      background-image: url("../../assets/images/global-help-2.png");
    }
  }

</style>
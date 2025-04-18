<template>
  <div id="portals" class="portals">
    <router-view />
  </div>
</template>

<script>
import '../portals/style.less'
export default {
  name: "portals",
  data() {
    return {
      isShowBackHomeBtn: false
    }
  },
};
</script>

<style lang="less" scoped>
.portals {
  padding: 0 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #323232;
  background: #FAFCFF;
}
</style>
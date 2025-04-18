<template>
    <router-view />
</template>

<script>
import '../wap/style.less'
export default {
  name: "wap",
  mounted() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
    document.body.setAttribute("class", "wap");
  },
  beforeDestroy() {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("class");
  }
};
</script>

<style scoped>

</style>
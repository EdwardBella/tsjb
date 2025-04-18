<template>
  <div ref="scroll" class="scroll" :style="$attrs.style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "scroll",
  props: {
    maxHeight: { type: String, default: ''},
  },
  mounted() {
    this.$refs.scroll.addEventListener("scroll", this.handleScroll, false);
  },
  beforeDestroy() {
    this.$refs.scroll.removeEventListener("scroll", this.handleScroll, false)
  },
  methods: {
    handleScroll() {
      const el = this.$refs.scroll;
      const scrollTop = el.scrollTop || el.scrollTop;

      const height = el.clientHeight || el.clientHeight;

      const scrollHeight = el.scrollHeight || el.scrollHeight;

      if (scrollTop + height >= scrollHeight - 100) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$emit('bottom')
        }, 100)

      }
    },
    toBottom() {
      const el = this.$refs.scroll;
      el.scrollTop = el.scrollHeight;
    }
  }
};
</script>

<style lang="less" scoped>
  .scroll {
    max-height: calc(100vh - .96rem);
    overflow: auto;
  }
</style>
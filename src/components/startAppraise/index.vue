<template>
  <div class="start-appraise" :class="{readonly: 'readonly'}" @mouseout="handleMouseout" :style="!readonly && 'height: 36px;'">
    <span
      v-for="i in total"
      :key="i"
      @mouseover="handleMouseover(i)"
      @click="handleClick(i)"
      :class="{ active: i <= value || i <= hoverActive }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    total: { type: Number, default: 5 },
    value: { type: Number, default: 0 },
    readonly: { type: Boolean, default: false }
  },
  data() {
    return {
      hoverActive: 0
    }
  },
  methods: {
    handleMouseout() {
      if (this.readonly) return
      this.hoverActive = 0
    },
    handleMouseover(i) {
      if (this.readonly) return
      this.hoverActive = i
    },
    handleClick(i) {
      if (this.readonly) return
      this.$emit('input', i)
    }
  }
};
</script>

<style lang="less" scoped>
.start-appraise {
  //position: relative;
  //top: 11px;
  display: inline-flex;
  align-items: center;

  span {
    cursor: pointer;
    //margin: 0 3px;
    width: 22px;
    height: 23px;
    display: block;
    background-size: 16px;
    background-position-x: center;
    background-position-y: 3px;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/common/icon-start.png");

    &.active {
      background-position: 0 0;
      background-size: 23px;
      background-image: url("../../assets/images/common/icon-start-active.png");
    }
  }
}
</style>
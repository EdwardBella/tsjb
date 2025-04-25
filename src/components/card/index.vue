<template>
  <div class="card" v-loading="loading" :style="`height: ${height}`">
    <template v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <template v-else>
      <div class="card-title" v-if="title">
        <div class="titleBox"><span class="block"></span>{{title}}</div>
        <slot v-if="$slots.headerRight" name="headerRight"></slot>
      </div>
    </template>

    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    loading: { type: Boolean, default: false },
    height: { type: String, default: 'auto' },
    title: { type: String, default: '' }
  }
};
</script>

<style lang="less" scoped>
.card {
  padding: 12px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 11px 0 rgba(161, 161, 161, 0.20);
  overflow: hidden;

  .card-title {
    font-size: 16px;
    border-bottom: 1px solid rgba(161, 161, 161, 0.20);
    margin-bottom: 20px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.titleBox{
  display: flex;
  align-items: center;
}
.block{
  width: 4px;
  height: 16px;
  background: #0A6BF3;
  border-radius: 4px 4px 4px 4px;
  display: inline-block;
  margin-right:5px;
}
</style>

<style lang="less">
.card + .card {
  margin-top: 20px;
}
</style>
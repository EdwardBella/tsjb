<template>
  <div class="search-bar">
    <input @input="handleInput" @keydown.enter="$emit('enter')" :value="value" @focus="isFocus = true" @blur="handleBlur" placeholder="搜索投诉举报公开信息" type="text">
    <span v-if="isFocus" @click="handleCancel">取消</span>
  </div>
</template>

<script>
export default {
  name: "searchBar",
  props: {
    value: { type: String, default: "" }
  },
  data() {
    return {
      isFocus: false
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.currentTarget.value);
    },
    handleCancel() {
      this.$emit("input", '');
    },
    handleBlur() {
      setTimeout(() => {
        this.isFocus = false
      }, 0)
    }
  }
};
</script>

<style lang="less" scoped>
.search-bar {
  display: flex;
  background-color: rgba(240, 240, 240, 1);
  padding: .2rem;

  input {
    flex: 1;
    height: 0.6rem;
    border-radius: 5px;
    border: none;
    background-color: #fff;
    padding: 0 .2rem;
  }

  span {
    display: block;
    padding: 0 .2rem;
    line-height: .6rem;
    color: #0B5FD5;
  }
}
</style>
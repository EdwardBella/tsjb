<template>
  <el-dialog append-to-body
    :title="title"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
  </el-dialog>
</template>

<script>
export default {
  name: "commonDialog",
  props: ['title', 'visible'],
  data() {
    return {

    }
  },
  watch: {
    visible(val) {
      if (val) {
        // TODO
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
  }
};
</script>

<style scoped>

</style>
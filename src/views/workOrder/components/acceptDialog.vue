<!--受理案件弹窗-->

<template>
  <el-dialog append-to-body title="受理交办" width="640px" :visible="visible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-suffix="：">
      <el-form-item label="选择您要交办的本级部门" prop="publicStatus">
        <el-select v-model="form.publicStatus" placeholder="请选择" style="width: 100%">
          <!--          <el-option v-for="item in publicStatusArr" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="交办备注" prop="comment">
        <el-input
          v-model="form.comment"
          show-word-limit
          maxlength="300"
          placeholder="请输入详细描述"
          type="textarea"
          style="width: 100%; height: 150px"></el-input>
      </el-form-item>
      <div class="split" style="margin: 30px 0"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" type="primary" plain>关闭</el-button>
        <el-button @click="handleSubmit" type="primary">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "acceptDialog",
  props: ['visible'],
  data() {
    return {
      form: {
        // TODO
      },
      rules: {
        // TODO
      }
    }
  },
  methods: {
    handleSubmit() {
      // TODO
      this.$emit('success')
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
  }
};
</script>

<style scoped>

</style>
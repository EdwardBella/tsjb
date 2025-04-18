<!--撤回案件-->

<template>
  <el-dialog title="撤回投诉举报案件" width="60%" :visible="visible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="撤回原因：" prop="reason">
        <el-input
          v-model="form.reason"
          show-word-limit
          maxlength="300"
          placeholder="请输入详细描述"
          type="textarea"
          style="width: 100%; height: 150px"></el-input>
      </el-form-item>

      <div class="split" style="margin: 30px 0"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" type="primary" plain>关闭</el-button>
        <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import * as mixins from "@/utils/mixins";
import * as portalWorkOrderAPI from "@/api/portals/workOrder";
import { getCMSUserInfo } from "@/utils/common";

export default {
  name: "recallDialog",
  mixins: [mixins.dialog, mixins.form],
  props: ["visible", "workOrderId"],
  data() {
    return {
      form: {
        reason: ""
      },
      rules: {
        reason: [{ required: true, message: "请填写" }],
      },
      optionList: [],
      submitting: false
    };
  },
  methods: {
    show() {
		// templateApi.detail(1021)
		// 	.then(res => {
		// 		this.form.comment = res.result.value;
		// 	});
    },
    handleSubmit() {
      this.validate("form")
        .then(() => {
          const cmsUserInfo = getCMSUserInfo()
          this.submitting = true;
          return portalWorkOrderAPI.revoke({
            ...this.form,
            accountId: cmsUserInfo.userId,
            name: cmsUserInfo.userName,
            workOrderId: this.workOrderId
          });
        })
        .then(() => {
          this.$emit("success");
          this.handleClose()
          this.$alert('撤回提交成功，请等到相关主管单位审批通过。', '提示', {customClass: 'top20'})
        })
        .finally(() => {
          this.submitting = false;
        });
    }
  }
};
</script>

<style scoped>

</style>
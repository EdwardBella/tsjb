<template>
  <drawer title="复议" :visible="visible" @close="$emit('update:visible', false)">
    <div class="drawer-form">
      <div class="drawer-form-item">
        <div class="key required">复议原因</div>
        <div class="value">
          <textarea v-model="form.repeatCheckReason" maxlength="300" placeholder="请输入复议原因"></textarea>
        </div>
      </div>

      <div class="form">
        <div class="form-item">
          <div class="key required">佐证材料</div>
          <div class="value">
            <label for="fileInput" class="placeholder">请选择</label>
            <input
              @change="handleFileChange"
              ref="fileInput"
              id="fileInput"
              class="vision-hide"
              type="file"
              accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z">
          </div>
        </div>
        <template v-if="form.attachmentList.length">
          <div v-for="(item, index) in form.attachmentList" class="form-item">
            <div class="key color-primary" style="width: auto; flex: 1">{{ item.fileName }}</div>
            <div class="value" style="display: flex; justify-content: right;">
              <span @click="handleRemoveFile(index)" class="color-danger">删除</span>
            </div>
          </div>
        </template>
      </div>




      <div class="drawer-form-item">
        <button class="full-button primary" :disabled="submitting" @click="handleSubmit">提交</button>
      </div>
    </div>
  </drawer>
</template>

<script>
import drawer from "@/views/wap/components/drawer.vue";
import { fileSize, getCMSUserInfo } from "@/utils/common";
import * as portalWorkOrderAPI from "@/api/portals/workOrder";
import * as fileApi from "@/api/file";

export default {
  name: "reconsiderationDrawer",
  components: { drawer },
  props: {
    visible: { type: Boolean, default: false },
    workOrderId: { type: String, default: "" }
  },
  data() {
    return {
      submitting: false,
      form: {
        repeatCheckReason: "",
        attachmentList: []
      }
    };
  },
  watch: {
    visible() {
      this.visible ? this.show() : this.hide();
    }
  },
  methods: {
    show() {

    },
    hide () {
      this.form = {
        repeatCheckReason: "",
        attachmentList: []
      }
    },
    handleRemoveFile(index) {
      this.form.attachmentList.splice(index, 1);
    },
    handleFileChange(e) {
      if (this.uploading) return;
      const file = e.target.files[0];
      if (fileSize(file) > 100) {
        this.clearFileInput();
        return this.$modal.msgError("请上传100M以内的文件");
      }

      const formData = new FormData();
      formData.append("file", file);

      this.uploading = true;
      fileApi.upload(formData).then(res => {
        this.$modal.msgSuccess("上传成功");
        this.form.attachmentList.push({
          fileName: file.name,
          fileUrl: res.data
        });
      })
        .finally(() => {
          this.clearFileInput();
          this.uploading = false;
        });
    },
    clearFileInput() {
      document.getElementById("fileInput").value = "";
    },
    handleSubmit() {
      if (!this.form.repeatCheckReason) return this.$modal.msgError("请填写复议原因");
      if (!this.form.attachmentList.length) return this.$modal.msgError("请上传佐证材料");
      const cmsUserInfo = getCMSUserInfo();
      this.submitting = true;

      return portalWorkOrderAPI.repeatCheck({
        ...this.form,
        createUser: cmsUserInfo.userId,
        workOrderId: this.workOrderId
      })
        .then(() => {
          this.$emit("success");
          this.$emit("update:visible", false);
          this.$alert("提交成功", "提示", {});
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
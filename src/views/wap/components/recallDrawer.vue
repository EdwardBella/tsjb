<template>
  <drawer title="撤回投诉举报案件" :visible="visible" @close="$emit('update:visible', false)">
    <div class="drawer-form">
      <div class="drawer-form-item">
        <div class="key required">撤回原因</div>
        <div class="value">
          <textarea v-model="form.reason" maxlength="300" placeholder="请输入撤回原因"></textarea>
        </div>
      </div>

      <div class="drawer-form-item">
        <button class="full-button primary" :disabled="submitting" @click="handleSubmit">提交</button>
      </div>
    </div>
  </drawer>
</template>

<script>
import drawer from '@/views/wap/components/drawer'
import 'video.js/dist/video-js.min.css'
import * as fileAPI from '@/api/file'
import { Base64 } from 'js-base64'
import * as portalWorkOrderAPI from "@/api/portals/workOrder";
import { getCMSUserInfo } from "@/utils/common";

export default {
  name: 'previewDrawer',
  components: { drawer },
  props: {
    visible: { type: Boolean, default: false },
    workOrderId: { type: String, default: '' }
  },
  data() {
    return {
      submitting: false,
      form: {
        reason: ''
      }
    }
  },
  watch: {
    visible() {
      this.visible ? this.show() : this.hide()
    }
  },
  methods: {
    show() {

    },
    hide() {
    },
    handleSubmit() {
      if (!this.form.reason) return this.$modal.msgError('请填写撤回原因')
      const cmsUserInfo = getCMSUserInfo()
      this.submitting = true;

      return portalWorkOrderAPI.revoke({
        ...this.form,
        accountId: cmsUserInfo.userId,
        name: cmsUserInfo.userName,
        workOrderId: this.workOrderId
      })
        .then(() => {
          this.$emit('success')
          this.$emit("update:visible", false);
          this.$alert('撤回提交成功，请等到相关主管单位审批通过。', '提示', {})
        })
        .finally(() => {
          this.submitting = false
        })

    }
  }
}
</script>

<style lang="less">
iframe {
  border: none;
}
</style>
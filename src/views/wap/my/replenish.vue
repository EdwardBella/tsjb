<template>
  <warp title="我要投诉" :hasPrevRoute="routerMap[$route.path]">
    <div class="complain-details-warp">
      <div class="key-values">

        <div class="key-value-item">
          <div class="key">补正要求</div>
          <div class="value" style="text-align: left;">
            <div v-html="txt2HTML(details.correctRequirement)"></div>
          </div>
        </div>

        <div class="key-value-item">
          <div class="key">附件</div>
          <div class="value">
            <upload @success="handleUploadSuccess" class="color-primary" v-slot:default="{uploading}">上传</upload>
          </div>
        </div>
        <div v-for="(item, index) in fileList" class="key-value-item">
          <div class="key color-primary" style="flex: 1">{{ item.fileName }}</div>
          <div class="value" style="display: flex; justify-content: right;">
            <span class="color-primary" @click="handlePreview(item)">预览</span>
            <span class="color-primary" @click="handleDownload(item)" style="margin: 0 8px;">下载</span>
            <span @click="handleRemoveFile(index)" class="color-danger">删除</span>
          </div>
        </div>
      </div>

      <div class="footer" style="padding: 0 .2rem">
        <button class="full-button primary" :disabled="submitting || fileList.length === 0" @click="handleSave" style="margin-right: .2rem;">保存</button>
        <button class="full-button primary" @click="handleSubmit" :disabled="submitting || fileList.length === 0">保存并提交</button>
      </div>

      <previewDrawer :visible.sync="previewDrawer.visible" :filePath="previewDrawer.filePath"></previewDrawer>
      <iframe :src="downloadURL" style="border: none; height: 0; "></iframe>
    </div>
  </warp>
</template>

<script>
import warp from '@/views/wap/components/warp'
import upload from '@/components/upload'
import { txt2HTML } from '@/utils/filters'
import * as mixins from '@/views/wap/mixin'
import { getCMSUserInfo } from '@/utils/common'
import * as portalsApi from '@/api/portals'
import * as fileApi from "@/api/file";
import previewDrawer from '@/views/wap/components/previewDrawer'

export default {
  name: 'replenish',
  components: { warp, upload, previewDrawer },
  mixins: [mixins.router],
  data() {
    return {
      submitting: false,
      details: {},
      fileList: [],
      previewDrawer: {
        visible: false,
        filePath: ''
      },
      downloadURL: ''
    }
  },
  created() {
    this.fetchDraftfile()
    this.fetchAskFor()
  },
  methods: {
    txt2HTML,
    handlePreview(row) {
      this.previewDrawer = {
        visible: true,
        filePath: row.fileUrl
      }
    },
    fetchAskFor() {
      portalsApi.workOrder.record(this.$route.query.id)
        .then(res => {
          this.details = res.result
        })
    },
    handleUploadSuccess(file) {
      this.fileList.push(file)
    },
    fetchDraftfile() {
      portalsApi.workOrder.getDraftfile({id: this.$route.query.id})
        .then(res => {
          // debugger
          this.fileList = res.result.attachmentList
        })
    },
    handleDownload(row) {
      if (this.downloading) return
      this.downloading = true
      this.downloadURL = fileApi.download({
        downloadFileName: row.fileName,
        filePath: row.fileUrl
      }, false) + `&_=${Math.random()}`
      setTimeout(() => {
        this.downloading = false
      }, 500)
    },
    handleSave() {
      const cmsUserInfo = getCMSUserInfo()
      portalsApi.workOrder.save({
        attachmentList: this.fileList,
        createUserId: cmsUserInfo.userId,
        id: this.$route.query.id
      })
        .then(() => {
          this.$modal.msgSuccess('保存成功')
        })
    },
    handleSubmit() {
      if (this.fileList.length === 0) return this.$modal.msgError('请上传补正材料')
      const cmsUserInfo = getCMSUserInfo()
      this.submitting = true
      portalsApi.workOrder.addAttachment({
        attachmentList: this.fileList,
        createUserId: cmsUserInfo.userId,
        id: this.$route.query.id
      })
        .then(() => {
          this.$router.back()
        })
        .finally(() => {
          this.submitting = false
        })
    },
    handleRemoveFile(index) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  button {
    flex: 1;
  }
}
</style>
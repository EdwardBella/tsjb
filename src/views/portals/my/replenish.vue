<template>
  <div>
    <div class="portals-card">
      <div class="header">
        <div class="title">基本信息</div>
      </div>

      <el-form class="key-value" label-width="110px" label-suffix="：">
        <el-form-item label="补正要求">
          <div v-html="txt2HTML(details.correctRequirement)"></div>
        </el-form-item>

        <el-form-item label="补正材料">
          <upload @success="handleUploadSuccess" v-slot:default="{uploading}">
            <el-button :loading="uploading" type="primary" plain size="mini">上传</el-button>
            <span class="color-danger" style="margin-left: 20px">* 支持图片，文档，文件大小不大于100M</span>
          </upload>
        </el-form-item>

        <el-table :data="fileList" size="mini" style="margin-top: 10px">
          <el-table-column prop="fileName" label="附件名称"></el-table-column>
          <el-table-column prop="fileName" label="文件名称"></el-table-column>
          <el-table-column label="操作" width="240px" align="center">
            <template slot-scope="{$index, row}">
              <el-button @click="handleDownload(row)" type="primary" plain size="mini">下载</el-button>
              <el-button @click="handlePreview(row)" type="primary" plain size="mini">预览</el-button>
              <el-button @click="handleRemoveFile($index)" type="primary" plain size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="footer-btn">
          <el-button @click="$router.back()" type="primary" plain>返回</el-button>
          <el-button @click="handleSave" :disabled="submitting || fileList.length === 0" type="primary">保存</el-button>
          <el-button @click="handleSubmit" :disabled="submitting || fileList.length === 0" type="primary">保存并提交</el-button>
        </div>
      </el-form>
      <previewDialog v-if="previewDialog.visible" :visible.sync="previewDialog.visible" :filePath="previewDialog.fileURL" width="900px"></previewDialog>
    </div>
  </div>
</template>

<script>
import * as portalsApi from "@/api/portals";
import upload from '@/components/upload'
import { txt2HTML } from '@/utils/filters'
import { getCMSUserInfo } from '@/utils/common'
import { getDraftfile } from '@/api/portals/workOrder'
import * as fileApi from "@/api/file";
import previewDialog from "@/views/workOrder/components/previewDialog";

export default {
  name: 'replenish',
  components: { upload, previewDialog },
  data() {
    return {
      submitting: false,
      details: {},
      fileList: [],
      previewDialog: {
        fileURL: '',
        visible: false
      }
    }
  },
  created() {
    this.fetchAskFor()
    this.fetchDraftfile()
  },

  methods: {
    txt2HTML,
    fetchAskFor() {
      portalsApi.workOrder.record(this.$route.query.id)
        .then(res => {
          this.details = res.result
        })
    },

    fetchDraftfile() {
      portalsApi.workOrder.getDraftfile({id: this.$route.query.id})
      .then(res => {
        // debugger
        this.fileList = res.result.attachmentList
      })
    },

    handleUploadSuccess(file) {
      this.fileList.push(file)
    },
    handleDownload(row) {
      fileApi.download({
        downloadFileName: row.fileName,
        filePath: row.fileUrl
      })
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
    },
    handlePreview(row) {
      this.previewDialog = {
        visible: true,
        fileURL: row.fileUrl
      }
    },
  }
}
</script>

<style scoped>

</style>
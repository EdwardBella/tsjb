<template>
  <el-dialog append-to-body
    title="案件中止"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="中止原因：" prop="reason">
        <el-select v-model="form.reason" placeholder="请选择" style="width: 100%">
          <el-option v-for="item in optionList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="中止备注：" prop="comment">
        <el-input
          v-model="form.comment"
          show-word-limit
          maxlength="300"
          placeholder="请输入详细描述"
          type="textarea"
          style="width: 100%; height: 150px"></el-input>
      </el-form-item>

      <el-form-item label="附件：" prop="attachmentFile">
        <el-button @click="handleUploadFile('attachmentFile', 1)" :loading="attachmentFileUploading" type="primary" plain size="mini">上传附件</el-button>
        <input @change="upload('attachmentFile', $event, 1)" ref="attachmentFileInput" id="fileInput" class="vision-hide" type="file" accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z">
      </el-form-item>

      <el-table :data="form.attachmentFile" size="mini">
        <el-table-column prop="fileName" label="附件名称"></el-table-column>
        <el-table-column label="文件名称">
          <template slot-scope="{row}">{{row.fileName | filename}}</template>
        </el-table-column>
        <el-table-column label="文件格式">
          <template slot-scope="{row}">{{row.fileName | extensionName}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="{row, $index}">
            <el-button @click="handleDownload(row)" type="primary" plain size="mini">查看</el-button>
            <el-button @click="handleDelete('attachmentFile', $index)" type="primary" plain size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <div class="split" style="margin: 30px 0"></div>

    <div class="dialog-footer-btn">
      <el-button @click="handleClose" type="primary" plain>关闭</el-button>
      <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as workOrderApi from "@/api/workOrder/index";
import * as mixins from "@/utils/mixins";
import * as dictApi from "@/api/dict";
import * as templateApi from "@/api/template";
import { extensionName, filename } from "@/utils/filters";
import { stop } from "@/api/workOrder/process";
import { addtime } from "@/api/workOrder/distribute";

export default {
  name: "suspendDialog",
  mixins: [mixins.loading, mixins.form, mixins.dialog, mixins.upload],
  filters: { extensionName, filename },
  props: ["visible", "workOrderNo", 'type'],
  data() {
    return {
      submitting: false,
      form: {
        reason: "",
        comment: "",
        attachmentFile: []
      },
      rules: {
        reason: [{ required: true, message: "请选择" }],
        comment: [{ required: true, message: "请填写" }]
      },
      attachmentFileUploading: false,
      optionList: []
    };
  },
  methods: {
    show() {
      dictApi.list({ parentCode: "1003" })
        .then(res => {
          this.optionList = res.result;
        });

      templateApi.detailByCode(1007)
        .then(res => {
          this.form.comment = res.result.value;
        });

      // this.$nextTick(() => {
      //   this.bindFileChangeEvent('attachmentFile', 1)
      // })
    },
    handleSubmit() {
      this.validateAndConfirm("form", "确定要中止该案件么？")
        .then(() => {
          this.submitting = true;
          return workOrderApi[this.type].stop({
            ...this.form,
            attachmentFile: this.form.attachmentFile[0],
            workOrderNo: this.workOrderNo
          });
        })
        .then(() => {
          this.$emit("success");
          this.handleClose()
        })
        .finally(() => this.submitting = false);
    }
  }
};
</script>

<style lang="less" scoped>
.tips {
  text-align: center;
  margin-bottom: 20px;
}
</style>
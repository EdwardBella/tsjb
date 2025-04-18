<template>
<div class="file-list">
  <div class="title">{{ title }}</div>
  <template v-if="list.length">
    
    <div v-for="(item, index) in list" class="item">
      <img :src="item.fileName | extensionName | fileIcon" alt="">
      <div style="margin-left: 10px; flex: 1;">
        <span class="name ellipsis" :title="item.fileName">{{ item.fileName }}</span>
        <span style="color: #999999; font-size: 14px; line-height: 13px; display: block" :title="item.fileName">{{options[item.secondaryBusinessType] ? options[item.secondaryBusinessType] : '投诉举报附件'}}</span>
      </div>
      <div style="font-size: 12px; margin-left: 5px; flex-shrink: 0;">
<!--        <span v-if="item.source === 'BACKEND'" @click="handleDelete(item, index)" class="color-danger pointer">删除</span>&nbsp;-->
        <span v-if="(item.secondaryBusinessType != 21 && item.secondaryBusinessType != 22 && item.secondaryBusinessType != 26 && item.secondaryBusinessType != 11 && item.secondaryBusinessType != 12 && item.secondaryBusinessType != 13 && item.secondaryBusinessType != 14) && (isCurrentWorkWorkProcessor || isLeaderDepartment)" @click="handleDelete(item, index)" class="color-danger pointer">删除</span>&nbsp;
        <span @click="$emit('preview', item)" class="color-primary pointer">预览</span>&nbsp;
        <span @click="handleDownload(item)" class="color-primary pointer">下载</span>
      </div>
    </div>
  </template>
  <p v-else class="tips" style="margin: 10px 0">没有数据</p>
</div>
</template>

<script>
import { extensionName, filename } from '@/utils/filters'
import * as fileApi from '@/api/file'
import * as mixins from '@/utils/mixins'
import { delAttachment } from '@/api/file'
import { rolePermissionsMixin } from "@/views/workOrder/mixin";

export default {
  name: 'index',
  mixins: [mixins.dialog, mixins.form, rolePermissionsMixin],
  filters: {
    extensionName, filename,
    fileIcon(val) {
      if ('.mov,.avi,.mp4,.wmv,.rmvb'.includes(val)) val = 'mp4'
      if ('.zip,.7z,.rar'.includes(val)) val = 'other'
      return require(`../../assets/images/file/${val.toUpperCase()}.png`)
    }
  },
  data() {
    return {
      options:{
        11:'投诉举报附件',
        12:'授权委托书',
        13:'补正材料附件',
        14:'复议附件',
        15:'投诉书',
        16:'其他办案资料',
        21:'中止附件',
        22:'提交办结附件',
        23:'调查笔录',
        24:'审批表',
        25:'其他过程文档',
        26:'结案报告',
        27:'结案附件',
        31:'受理通知书',
        32:'不受理通知书',
        33:'结案通知书',
        34:'其他通知书'
      },
    }
  },
  props: {
    title: { type: String, default: '' },
    list: { type: Array, default: Array },
    canDelete: { type: Boolean, default: false },
    details: { type: Object, default: Object }
  },
  methods: {
    handleDownload(row) {
      fileApi.download({
        downloadFileName: row.fileName,
        filePath: row.fileUrl
      })
    },

    handleDelete(item, index) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => fileApi.delAttachment({ id: item.id }))
      .then(res => {
        this.$modal.msgSuccess('删除成功')
        this.$emit('delete')
      })
      //
    }
  }
    // .bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z
}
</script>

<style lang="less" scoped>
.file-list {
  .title {
    padding: 2px 10px;
    background: linear-gradient(270deg, rgba(213, 223, 248, 0) 0%, #D6E0F9 100%);
    font-size: 18px;
    color: #0b5fd5;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #D8D8D8;

    &:last-child {
      border-bottom: none;
    }
    img {
      width: 30px;
      height: 30px;
    }

    .name {
      flex: 1;
      flex-shrink: 0;
    }
  }
}
</style>
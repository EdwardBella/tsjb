<template>
  <tablePage
    ref="tablePage"
    hideSearch
    :searchForm="searchForm"
    :requestFunc="requestFunc"
  >
    <template slot="left">
      <upload v-if="isAdmin" :params="{ type: 'downloadCenter' }" v-slot:default="{uploading}" @success="handleUploadSuccess">
        <el-button :loading="uploading" type="primary">上传新文件</el-button>
      </upload>
    </template>

    <template slot="rows">
      <el-table-column type="index" label="序号" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="文件名称" show-overflow-tooltip>
        <template slot-scope="{row}">{{row.fileName | filename}}</template>
      </el-table-column>
      <el-table-column prop="value" label="格式" width="100px">
        <template slot-scope="{row}">.{{row.fileName | extensionName}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain size="mini" @click="handleDownload(row)">下载</el-button>
          <el-button v-if="isAdmin" type="primary" plain size="mini" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </tablePage>
</template>

<script>
import tablePage from '@/components/tablePage'
import upload from '@/components/upload'
import { extensionName, filename } from '@/utils/filters'
import * as fileAPI from '@/api/file'
import * as userRoleRelationAPI from '@/api/userRoleRelation'
import { affirm } from '@/utils/mixins'

export default {
  name: 'download',
  mixins: [affirm],
  filters: { extensionName, filename },
  components: { tablePage, upload },
  data() {
    return {
      searchForm: {
        type: 'downloadCenter',
      },
      isAdmin: false,
    }
  },
  created() {
    userRoleRelationAPI.checkAdminRole().then(r => {
      this.isAdmin = r.result
    })
  },
  methods: {
    requestFunc: fileAPI.query,
    handleRemove(row) {
      this.confirm('确认删除吗？')
        .then(() => fileAPI.remove({ id: row.id }))
        .then(() => this.$refs.tablePage.playLoadData())
    },
    handleUploadSuccess() {
      this.$refs.tablePage.playLoadData()
    },
    handleDownload(row) {
      fileAPI.download({
        downloadFileName: row.fileName,
        filePath: row.filePath
      })
    },
  }
}
</script>

<style scoped>

</style>
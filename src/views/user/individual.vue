<template>
  <tablePage
    ref="tablePage"
    :searchForm.sync="searchForm"
    :searchFormRules="searchFormRules"
    :requestFunc="requestFunc"
  >
    <template slot="search-form">
      <div class="light-blue-box">
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="searchForm.mobile" placeholder="请输入"></el-input>
        </el-form-item>
      </div>
    </template>

    <template slot="rows">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="title" label="真实姓名"></el-table-column>
      <el-table-column prop="title" label="性别"></el-table-column>
      <el-table-column prop="title" label="身份证号"></el-table-column>
      <el-table-column prop="title" label="手机号"></el-table-column>
      <el-table-column prop="title" label="注册时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row, $index}">
          <el-button @click="handleShowDialog('individualDetailsDialog', row)" type="primary" plain size="mini">查看</el-button>
        </template>
      </el-table-column>
    </template>

    <template slot="other">
      <individualDetailsDialog :visible.sync="individualDetailsDialog.visible"></individualDetailsDialog>
    </template>
  </tablePage>
</template>

<script>
import tablePage from "@/components/tablePage/index.vue";
import individualDetailsDialog from "./components/individualDetailsDialog";
import * as validators from '@/utils/validators'
import * as mixins from '@/utils/mixins'

export default {
  name: "individual",
  mixins: [mixins.tablePage],
  components: { tablePage, individualDetailsDialog },
  data() {
    return {
      searchForm: {
        name: '',
        mobile: ''
      },
      searchFormRules: {
        mobile: [
          { validator: validators.phone() }
        ],
      },
      individualDetailsDialog: {
        visible: true
      },
    }
  },
  methods: {
    requestFunc() {
      // TODO
    }
  }
};
</script>

<style scoped>

</style>
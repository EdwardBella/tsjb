<template>
  <card>
    <div slot="content">
      <el-table class="page-table" :data="rows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="配置项" show-overflow-tooltip></el-table-column>
        <el-table-column prop="value" label="值" width="100px"></el-table-column>
        <el-table-column label="操作" width="120px" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" plain size="mini" @click="handleShowRoleEditorDialog(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <configEditorDialog :visible.sync="configEditorDialog.visible" :details="currentRow" @success="handleEditSuccess"></configEditorDialog>
    </div>
  </card>
</template>

<script>
import tablePage from "@/components/tablePage";
import card from "@/components/card";
import configEditorDialog from "@/views/system/components/configEditorDialog";
import * as configureAPI from "@/api/configure";
import { accountRoleTypeTypeByString } from "@/utils/filters";
import { mapActions, mapState } from "vuex";


export default {
  name: "config",
  components: { tablePage, configEditorDialog, card },
  filters: { accountRoleTypeTypeByString },
  data() {
    return {
      loading: true,
      // rows: [],
      configEditorDialog: {
        visible: false
      },
      currentRow: {}
    };
  },
  computed: {
    ...mapState({
      rows: state => state.permissions
    })
  },
  created() {
    this.playLoadData();
  },
  methods: {
    ...mapActions(['fetchUserPermissions']),
    requestFunc: configureAPI.list,
    playLoadData() {
      this.loading = true;

      this.fetchUserPermissions()
        // .then(res => {
        //   this.rows = res.result;
        // })
        .finally(() => this.loading = false);
    },
    handleEditSuccess() {
      this.playLoadData();
    },
    handleShowRoleEditorDialog(row) {
      this.currentRow = { ...row };
      this.configEditorDialog.visible = true;
    }
  }
};
</script>

<style scoped>

</style>
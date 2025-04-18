<template>
  <div>
    <card >
      <template v-slot:headerRight>
        <el-button :loading="exporting" @click="handleExport" v-if="isShowExportBtn" type="primary">导出为Excel文件</el-button>
      </template>
      <div slot="content">
        <div class="meta">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb" :class="{'isHome': isHome}">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ breadcrumb }}</el-breadcrumb-item>
          </el-breadcrumb>

          <div v-if="!isHome" @click="$router.back()" class="color-primary pointer"><i class="el-icon-arrow-left"></i>返回
          </div>
        </div>
      </div>
    </card>

    <router-view></router-view>
  </div>
</template>

<script>
import * as statisticsAPI from "@/api/statistics";
import card from "@/components/card";
import { blobDataDownload } from "@/utils/common";
import { mapState } from "vuex";

export default {
  name: "statistics",
  components: { card },
  data() {
    return {
      exporting: false,
      isHome: false,
      breadcrumb: ""
    };
  },
  watch: {
    "$route": {
      handler(to) {
        this.isHome = this.$route.path === "/statistics/statistics/home";
        this.breadcrumb = this.isHome ? "" : to.query.name;
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(["statistics"]),
    isShowExportBtn() {
      return Boolean(this.$route.query.exportType);
    }
  },
  methods: {
    handleExport() {
      const { exportType, name } = this.$route.query;
      this.exporting = true;
      statisticsAPI.exportExcel({
        administrativeDivisionId: this.statistics.selectArea,
        dataType: exportType
      })
        .then(r => {
          blobDataDownload(r.data, name + ".xls");
        })
        .finally(() => {
          this.exporting = false;
        });
    }
  }

};
</script>

<style lang="less" scoped>
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 24px;
    border-bottom: 1px solid rgba(161, 161, 161, 0.20);
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
}
</style>
<style>
.isHome .el-breadcrumb__separator {
  display: none;
}
</style>
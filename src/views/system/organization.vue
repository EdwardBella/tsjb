<template>
  <div>
    <card>
      <template slot="content">
<!--        <el-button @click="handleMatch" type="primary" :loading="matching">一键匹配行政区划</el-button>-->
        <el-button @click="handleClear" :loading="clearing">清除缓存</el-button>
      </template>
    </card>
    <card>
      <template slot="content">
        <div class="header">
          <div>组织机构名称</div>
          <div>所在行政区划</div>
          <div style="width: calc(50% - 100px)">所在行业领域</div>
          <div style="width: 100px;">操作</div>
        </div>
        <div v-loading="loading">
          <organizationTree :tree="tree" @showUpdateOrganizationDialog="handleShowUpdateOrganizationDialog"></organizationTree>
        </div>

        <updateOrganizationDialog :visible.sync="updateOrganizationDialog.visible" :id="current.id" :industrySectorName="current.industrySectorName" :administrativeDivisionId="current.administrativeDivisionId" :code="current.deptCode" :name="current.name" @success="getTree"></updateOrganizationDialog>
      </template>
    </card>
  </div>
</template>

<script>
import card from "@/components/card/index.vue";
import organizationTree from "@/views/system/components/organizationTree";

import * as validators from "@/utils/validators";
import * as departmentApi from "@/api/department";
import { workOrderStatus, timeRemaining, workOrderPublicStatus } from "@/utils/filters";
import * as mixins from "@/utils/mixins";
import updateOrganizationDialog from "@/views/system/components/updateOrganizationDialog";
import { administrativeDivisionTree, clearStore, match } from '@/api/department'

export default {
  name: "organization",
  mixins: [mixins.affirm],
  components: { card, updateOrganizationDialog, organizationTree },
  filters: { workOrderStatus, timeRemaining, workOrderPublicStatus },
  data() {
    return {
      clearing: false,
      loading: true,
      tree: [],
      current: {},
      searchForm: {},
      matching: false,
      searchFormRules: {
        dateRange: [{ validator: validators.maxDay(31) }],
        title: [{ validator: validators.limitMax(10) }
        ]
      },
      updateOrganizationDialog: {
        visible: false
      }
    };
  },
  created() {
    this.getTree()
  },
  methods: {
    getTree() {
      this.loading = true;
      departmentApi.administrativeDivisionTree()
        .then(res => {
          this.tree = res.result;
        })
        .finally(() => this.loading = false);
    },

    handleShowUpdateOrganizationDialog({node}) {
      this.updateOrganizationDialog.visible = true
      this.current = node
    },

    handleMatch() {
      this.matching = true
      departmentApi.match()
      .then(this.getTree)
      .finally(() =>  this.matching = false)
    },
    handleClear() {
      this.clearing = true
      departmentApi.clearStore()
        .then(this.getTree)
        .finally(() => this.clearing = false)
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  //margin: 0 -30px 0 -30px;
  padding: 6px 0;
  background-color: #f5f9ff;
  height: 40px;
  line-height: 40px;
  display: flex;
  font-weight: 600;
  text-align: left;
  color: #666666;
  letter-spacing: 1px;
  margin-bottom: 14px;

  & > div {
    box-sizing: border-box;
    padding: 0 10px;
    width: calc(100% / 4);
  }
}
</style>
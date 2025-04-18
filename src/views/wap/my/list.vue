<template>
  <warp title="我的投诉举报" :hasPrevRoute="routerMap[$route.path]">
    <div class="tags">
      <div v-for="item in tagsOptions" :key="item.value" class="tag-item" @click="form.status = item.value" :class="{active: item.value === form.status}">{{item.name}}</div>
    </div>
    <scroll ref="scroll" @bottom="handleLoadMore" style="max-height: calc(100vh - .96rem - .8rem)">
      <div v-loading="loading">
        <template v-if="list.length">
          <complainItem v-for="item in list" :item="item" :key="item.id" @click.native="onGotoDetails(item)" hideContent>
            <template v-slot:bottom-right="{item}">
              <span v-if="item.status === 0" class="color-success">待受理</span>
              <span v-if="(item.status >= 1 && item.status <= 4) || item.status === 7" class="color-success">受理中</span>
              <template v-if="item.status === 5">
                <span v-if="item.appraiseStatus === 'N'">待评价</span>
                <span v-else style="color: #35E592">已办结</span>
              </template>
              <span v-if="item.status === 6" style="color: #666666">不受理</span>
              <span v-if="item.status === 9" style="color: #666666">撤回中</span>
              <span v-if="item.status === 10" style="color: #666666">已撤回</span>
            </template>
          </complainItem>
        </template>
        <p v-else class="tips">没有数据</p>
      </div>
    </scroll>
  </warp>
</template>

<script>
import warp from "@/views/wap/components/warp";
import scroll from "@/views/wap/components/scroll";
import complainItem from "@/views/wap/components/complainItem";
import { timeFormatDHMS } from "@/utils/filters";
import * as portalsApi from "@/api/portals";
import { getCMSUserInfo, postPortalsHeight } from '@/utils/common'
import * as mixins from "@/views/wap/mixin";

export default {
  name: "list",
  components: { warp, scroll, complainItem },
  mixins: [mixins.router, mixins.iframe],
  data() {
    return {
      loading: true,
      tagsOptions: [
        { name: "全部", value: "" },
        { name: "待受理", value: "0" },
        { name: "受理中", value: "1,2,3,4" },
        { name: "已办结", value: "5" },
        { name: "不受理", value: "6" }
      ],
      moreLoading: false,
      totalPage: 0,
      list: [],
      form: {
        status: "-1"
      },
      query: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  watch: {
    'form.status': {
      handler() {
        this.query.pageNum = 1;
        this.list = [];
        this.loading = true;
        this.getWorkOrders()
          .then(() => {
            this.$nextTick(() => {
              this.$refs.scroll.handleScroll();
            });
          })
          .finally(() => this.loading = false);
      }
    }
  },
  mounted() {
    this.addListenerPostMessage("cmsUserInfo", this.saveCMSUserInfoToLocal);
    window.addEventListener("message", this.postMessageEventListener, false);
  },
  // created() {
  //   this.getWorkOrders().finally(() => this.loading = false)
  // },
  methods: {
    timeFormatDHMS,
    onGotoDetails(item) {
      this.$router.push(`/wap/my/details?id=${item.id}`)
    },
    saveCMSUserInfoToLocal(data) {
      window.sessionStorage.setItem('cmsUserInfo', JSON.stringify(data))
      this.form.status = "";
    },
    getWorkOrders() {
      this.moreLoading = true;
      const form = Object.assign({}, this.form, this.query);
      const userInfo = getCMSUserInfo()
      form.idNumber = userInfo.idNumber
      form.socialCreditNumber = userInfo.socialCreditNumber
      return portalsApi.workOrder.listOfMyWorkOrder(form)
        .then(res => {
          const { records, pages } = res.result;
          this.list = this.list.concat(records);
          this.totalPage = Number(pages);
        })
        .finally(() => {
          this.moreLoading = false;
        });
    },
    handleLoadMore() {
      if (this.query.pageNum < this.totalPage && this.moreLoading === false) {
        this.query.pageNum++
        this.getWorkOrders()
      }
    },
  }
};
</script>

<style lang="less" scoped>
.tags {
  display: flex;
  align-items: center;

  .tag-item {
    flex: 1;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
    height: .8rem;
    line-height: .8rem;
    box-sizing: border-box;

    &.active {
      color: @color-primary-light;
      border-bottom: 3px solid @color-primary-light;
    }
  }
}
</style>
<template>
  <warp hideHeader>
    <scroll @bottom="handleLoadMore" style="max-height: 100vh">
      <div>
        <img src="../../assets/images/portals/banner-wap.jpg" alt="" style="width: 100%; display: block;">
      </div>
      <div class="buttons">
        <div @click="gotoCreateComplain">我要投诉</div>
        <div @click="openFullIframe('/wap/guide')">投诉指南</div>
      </div>
<!--      <div class="section-header">-->
<!--        <span class="title">最新公开</span>-->
<!--        <span @click="openFullIframe('/wap/list')" class="more">更多></span>-->
<!--      </div>-->
<!--      <complainList :list="list" :loading="loading" :moreLoading="moreLoading">-->
<!--        <template v-slot:default="{item}">-->
<!--          <complainItem :item="item" @click.native="openFullIframe(`/wap/details?id=${item.id}`)"></complainItem>-->
<!--        </template>-->
<!--      </complainList>-->
    </scroll>
  </warp>
</template>

<script>
import * as portalsApi from "@/api/portals";

import complainList from "@/views/wap/components/complainList";
import complainItem from "@/views/wap/components/complainItem";
import warp from "@/views/wap/components/warp";
import scroll from "@/views/wap/components/scroll";

import * as mixins from '@/views/wap/mixin'

export default {
  name: "index",
  mixins: [mixins.iframe],
  components: { complainList, complainItem, warp, scroll },
  data() {
    return {
      loading: true,
      moreLoading: false,
      list: [],
      totalPage: 0,
      query: {
        pageSize: 10,
        pageNum: 1
      }
    };
  },
  created() {
    this.getLatestList().finally(() => this.loading = false);
  },
  mounted() {
    this.addListenerPostMessage("cmsUserInfo", this.saveCMSUserInfoToLocal);
    window.addEventListener('message', this.postMessageEventListener, false)
  },

  methods: {
    saveCMSUserInfoToLocal(data) {
      console.log('11111111111', data)
      window.sessionStorage.setItem('cmsUserInfo', JSON.stringify(data))
    },
    getLatestList() {
      this.moreLoading = true
      return portalsApi.workOrder.list(this.query)
        .then(res => {
          const { records, pages } = res.result;
          this.list = this.list.concat(records);
          this.totalPage = Number(pages)
        })
      .finally(() => {
        this.moreLoading = false
      })
    },
    handleLoadMore() {
      if (this.query.pageNum < this.totalPage && this.moreLoading === false) {
        this.query.pageNum++
        this.getLatestList()
      }
    },
    gotoCreateComplain() {
      // this.checkIsCertification('/wap/createStep1')
      this.openFullIframe('/wap/createStep1', true)
    }
  }
};
</script>

<style lang="less" scoped>
.section-header {
  position: relative;
  text-align: center;
  margin: .2rem;
  .title {
    font-size: .34rem;
    line-height: .5rem;
  }
  .more {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.24rem;
    line-height: .5rem;
  }
}

.buttons {
  //text-align: center;
  display: flex;
  align-items: center;
  //justify-content: center;

  & > div {
    font-size: .3rem;
    flex: 1;
    display: block;
    border: 1px solid #0080FF;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    background-color: #0080FF;
    box-sizing: border-box;
    color: #fff;

    &:last-child {
      border-left: 1px solid #4fa7ff;
    }
  }
}
</style>
<template>
  <div v-loading="loading">
    <div class="banner pointer" @click="toVerify()">
      <img src="../../assets/images/portals/banner.png" alt="banner">
<!--      <button></button>-->
    </div>

<!--    <div class="new-list">-->
<!--      <div class="header">-->
<!--        <span class="title">最新公开</span>-->
<!--        <span @click="$router.push('/portals/list')" class="more pointer">更多 ></span>-->
<!--      </div>-->
<!--      <ul>-->
<!--        <li-->
<!--          v-for="item of list"-->
<!--          :key="item.id"-->
<!--          @click="$router.push({path: '/portals/details', query: { id: item.id }})"-->
<!--          class="pointer"-->
<!--        >-->
<!--          <span class="title">{{item.title}}</span>-->
<!--          <span class="time">{{item.createTime | yyyymmdd}}</span>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>

<script>
import * as portalsApi from '@/api/portals'
import { yyyymmdd } from '@/utils/filters'
import { postPortalsHeight } from "@/utils/common";

export default {
  name: "index",
  filters: { yyyymmdd },
  data() {
    return {
      loading: true,
      list: []
    }
  },
  created() {
    this.getLatestList()
      .then(() => this.$nextTick(postPortalsHeight))
      .finally(() => this.loading = false)
  },
  mounted(){
    let that = this

    window.addEventListener('message',function(e){
      console.log(e.data.data,'投诉举报按钮-监听cms是否已返回登录及验证的状态')
	  // that.$router.push('/portals/createStep1')
      // if(e.data){
      //   // 允许打开页面
      //   if(e.data.name == 'loginMsg' && e.data.data.buttonType === ''){
      //     // 存储来自cms的用户信息
      //     sessionStorage.setItem('cmsUserInfo',JSON.stringify(e.data.data))
      //     that.$router.push('/portals/createStep1')
      //     return
      //   }
      //   if (e.data.name === 'loginMsg' && e.data.data.detailId && e.data.data.url) {
      //     that.$router.push({path: '/portals/details', query: { id: e.data.data.detailId }})
      //   }
      // }
    },false);
  },
  methods: {
    // 向父级申请当前用户状态是否为 已登录已验证 状态
    toVerify(){
      window.parent.postMessage({ 
          name: 'isCertification',
          data: {
              detailId:'', 
              url:'',
              buttonType:'',
          },
      },
      "\*"
      )
      console.log("投诉举报已发送isCertification")
    },
    getLatestList() {
      return portalsApi.workOrder.latestList()
        .then(res => {
          this.list = res.result;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  img {
    width: 100%;
  }
}

.new-list {
  margin-top: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #323232;
    border-bottom: 1px solid #E8E8E8;

    .title {
      font-size: 16px;
      line-height: 22px;
      padding: 10px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 4px;
        background: #323232;
        border-radius: 2px;
        bottom: -1.5px;
        left: 50%;
        margin-left: -10px;
      }
    }

    .more {
      font-size: 14px;
      line-height: 20px;
    }
  }

  ul {
    li {
      padding: 10px 0 10px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F2F2F2;

      .title {
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;

        &::before {
          display: inline-block;
          margin-right: 10px;
          content: "";
          width: 4px;
          height: 6px;
          background: #323232;
          border-radius: 2px;
          vertical-align: middle;
          margin-top: -3px;
        }
      }

      .time {
        font-family: Helvetica;
        color: #CCCCCC;
        line-height: 17px;
      }
    }
  }
}
</style>
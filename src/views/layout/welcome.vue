<template>
  <div class="welcome">
    <div class="loading" v-loading="true"></div>
  </div>
</template>

<script>
import { accessDataOs, userInfo } from '@/api/common'
import { setToken, setId, getQueryString } from '@/utils/common'
import * as menuAPI from "@/api/menu";

export default {
  name: "welcome",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    let accessToken = getQueryString("accountToken");
    let accountId = getQueryString("accountId");
    if (accessToken && accountId) {
      // setToken(accessToken);
      // setId(accountId);
      const accountData = {
        accountToken: accessToken,
      };
      localStorage.setItem(
        "accountToken",
        JSON.stringify({
          accessToken: accessToken,
          accountId: accountId,
        })
      )
      localStorage.setItem("source", 'welcome')
      if (accessToken) {
       
        accessDataOs(accountData).then((res) => {
          // TODO 0 是否表示请求成功
          const { code, result } = res
          if (code === 0) {
            localStorage.setItem("accountName", result.accountName)

            // TODO 暂时没有接口 不请求, 直接跳转
            // this.getUserInfo()
            // this.$router.push({ path: '/workOrder/all' });
            menuAPI.tree()
              .then(res => {
                const list = res.result
                // list.length = 0
                if (list.length === 0) {
                  this.$confirm('您没有任何权限，请找管理员授权后，重新登录', '错误', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                  })
                  return
                }

                for (const node1 of list) {
                  if (node1.levels === 1) {
                    if (node1.url) {
                      this.$router.push(node1.url)
                      return
                    }
                    for (const node2 of list) {
                      if (node1.id === node2.parentId) {
                        this.$router.push(node2.url)
                        return
                      }
                    }
                  }
                }
              })
          }
        })
        .catch(e => {
          const message = e.message || '服务器异常'
          this.$confirm(message, '错误', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          })
        })
      }
    }
  },
  methods: {
    getUserInfo() {
      userInfo().then((res) => {
        if (res.code == 200) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.response));
          this.$router.push({ path: "/xaddResourceBasic//xaddResourceBasic" });
        }
      });
    },
  },
};
</script>

<style scoped>
.welcome {
  height: 100vh;
  width: 100%;
  position: relative;
}
.welcome .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

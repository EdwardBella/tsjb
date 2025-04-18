<template>
  <div class="henan-login-web" :class="theme">
    <header>
      <div class="logo">
        <h1>河南省营商环境投诉举报管理系统</h1>
        <p>Henan Business Environment Complaint and Reporting Management System</p>
      </div>
    </header>
    <main :style="`height: calc(100vh - ${headerHeight}px - ${footerHeight}px)`">
      <slot></slot>
    </main>
    <footer v-if="hasFooter">
      <img src="../assets/images/official.png" alt="">
      <div class="info">
        <p>主办单位：河南省发展和改革委员会</p>
        <!-- <p>技术支持：北京华通人商用信息有限公司</p> -->
      </div>
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/common";

export default {
  name: "layout",
  props: {
    theme: { type: String, default: "white" },  // white blue
    hasFooter: { type: Boolean, default: true },
    hasBgIMG: { type: Boolean, default: true },
  },
  data() {
    return {
      menus: [],
      userInfo: getUserInfo()
    };
  },
  computed: {
    headerHeight() {
      return this.theme === "white" ? 120 : 64;
    },
    footerHeight() {
      return this.hasFooter ? 100 : 0;
    }
  },
  created() {
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.henan-login-web {
  background-image: url("../assets/images/bg.webp");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #000;


  &.white {
    header {
      height: 120px;

      .logo {
        color: #30519B;

        h1 {
          font-size: 32px;
          font-weight: 600;
        }

        p {
          color: rgba(48, 81, 155, .5);
          margin-top: 4px;
          font-size: 14px;
        }
      }
    }
  }

  &.blue {
    header {
      height: 64px;
      background: rgba(48, 81, 155, 1);

      .logo {
        color: #fff;

        h1 {
          font-size: 24px;
          font-weight: 600;
          color: #FFFFFF;
        }

        p {
          display: none;
        }
      }

      .right {
        .user {
          .info {
            p:first-child {
              color: #FFFFFF;
            }

            p:last-child {
              color: rgba(255, 255, 255, .6);
            }
          }
        }
      }
    }

  }
}

header {
  box-sizing: border-box;
  width: 100%;

  padding: 0 40px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menus {
    margin-left: 28px;
    flex: 1;
    border: none;
    background: none;

    /deep/ .el-submenu {
      &.is-opened {
        .el-submenu__title {
          background: none !important;
        }
      }

      &.is-active {
        .el-submenu__title {
          color: rgba(255, 255, 255, 1);
        }
      }

      .el-submenu__title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, .7);
        border: none;
        padding: 0 12px;

        .el-submenu__icon-arrow {
          display: none;
        }

        &:hover {
          background: none;
          color: rgba(255, 255, 255, 1);
        }
      }

    }


  }


  .right {
    cursor: pointer;

    .user {
      display: flex;
      align-items: center;

      .info {
        margin-right: 16px;
        text-align: right;

        p:first-child {
          font-size: 16px;
          font-weight: 600;
          color: #262626;
        }

        p:last-child {
          margin-top: 4px;
          font-size: 16px;
          font-weight: 400;
          color: #262626;
        }
      }

      .avatar {
        border-radius: 3px;
        width: 48px;
        height: 48px;
      }
    }

  }
}

footer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 120px;
  height: 100px;
  //background-color: #000;

  img {
    margin-right: 16px;
    width: 40px;
    height: 48px;
  }

  .info {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, .6);

    p {
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.login-btn {
  padding: 0;
  width: 88px;
  height: 40px;
  background: #0A5DD3;
  border: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
}
</style>
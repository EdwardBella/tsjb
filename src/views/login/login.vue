<template>
  <layout>
    <div class="login">
      <el-tabs v-model="activeTag">
        <el-tab-pane label="用户名/密码登录" name="1">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="accountName">
              <el-input v-model="form.accountName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="accountPasswd">
              <el-input v-model="form.accountPasswd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button :loading="submitting" :disabled="disabled" type="primary" @click="handleLogin">登 录
            </el-button>
            <!-- <p class="tip">* 忘记密码请联系技术中心</p> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="3">
          <el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm">
            <el-form-item prop="phone">
              <el-input v-model="phoneForm.phone" placeholder="请输入手机号" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item prop="phoneCode">
              <div class="phoneCodeBox">
                <el-input v-model="phoneForm.phoneCode" placeholder="请输入验证码" class="phoneCodeInput" maxlength="6"></el-input>
                <el-button :disabled="isTimer" type="primary" class="phoneCodeBtn" @click="getPhoneCode">{{phoneCodeText}}</el-button>
              </div>
            </el-form-item>
            <el-button :loading="submitting" :disabled="disabled" type="primary" @click="mobileLogin">登 录</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <a class="global-help admin" >
      <img  src="../../assets/images/qrcode.png" alt="">
    </a> -->
  </layout>
</template>

<script>
import * as authAPI from "@/api/auth";
import crypto from "@/utils/crypto.js";
import { checkPermission, getUserInfo } from '@/utils/common'
import layout from "@/components/layout.vue"
import globalHelp from "@/components/globalHelp";
import * as validators from '@/utils/validators'
import { mapActions } from 'vuex'
export default {
  name: "login",
  components: { layout, globalHelp },
  data() {
      var checkphone = (rule, value, callback) => {
        if (value == "" || value == undefined) {
          callback(new Error("请输入手机号"));
        } else if (/^1[3456789]\d{9}$/.test(value) == false) {//引入methods中封装的检查手机格式的方法
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
    return {
      activeTag: "1",
      submitting: false,
      form: {
        accountName: "",
        accountPasswd: ""
      },
      rules: {},
      phoneForm:{
        phone:"",
        phoneCode:""
      },
      phoneRules:{
        phone: [
          {required: true, trigger: 'blur', message: '请输入手机号'},
          { validator: validators.phone() }
        ],
        phoneCode:[
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      phoneCodeText:'获取验证码',
      timer:null,
      num:60,
      isTimer:false,
      url: "/daas/#/"
    };
  },
  computed: {
    disabled() {
      if (this.activeTag === "1") {
        return !(this.form.accountPasswd && this.form.accountPasswd);
      } else if(this.activeTag === "3"){
        return !(this.phoneForm.phone && this.phoneForm.phoneCode);
      } else {
        return false;
      }
    }
  },
  mounted() {
    localStorage.removeItem('accountToken')
    localStorage.removeItem('accountName')
  },
  methods: {
    ...mapActions(['fetchUserPermissions', 'setPermissionsLoading']),
    handleLogin() {
      const form = { ...this.form };
      form.accountPasswd = encodeURIComponent(crypto.encryption(form.accountPasswd));
      this.submitting = true;
      const loginPromise = this.activeTag === "1" ? authAPI.login(form) : authAPI.uKeyLogin();
      loginPromise
        .then(r => {
          const { accessToken, accountId, accountName, telephone } = r.result;
          localStorage.setItem(
            "accountToken",
            JSON.stringify({
              accessToken: accessToken,
              accountId: accountId,
            })
          )
		  
		  this.$router.push({ path: '/todo' });
		  
          // if ('development' === process.env.NODE_ENV) {
          //   this.$router.push({ path: '/todo' });
          //   return
          // }
          localStorage.setItem("accountName", accountName)
		  
		  localStorage.setItem("source", 'login')
		  // if (telephone) {
		  //   this.$router.push({ path: '/todo' });
		  //   return
		  // }
          // return this.checkAuth(telephone);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    checkAuth(telephone){
      // this.$router.push({ path: '/system/userInfoManage'});
      authAPI.checkAuth(window.appId).then(r => {
        const {code, result } = r
        if(code == 0){
          if(result){
            localStorage.setItem("source", 'login')
            if (telephone) {
              this.$router.push({ path: '/todo' });
              return
            }
            this.fetchUserPermissions()
              .then(() => {
                if (checkPermission('允许取消手机绑定')) {
                  this.$router.push({ path: '/todo' });
                } else {
                  this.$router.push({ path: '/system/userInfoManage'});
                }
              })
          }else{
            this.$modal.msgError('您没有对应权限，请联系系统管理员')
          }
        }     
      })
    },
    getPhoneCode(){
      this.$refs.phoneForm.validateField('phone',err=>{
        if(err)return;
        authAPI.sendTelCode(this.phoneForm.phone,'0').then(res=>{
        const {code,message} = res
          if(code===0){
            this.$modal.msgSuccess('发送成功，请在手机上查看')
          }
        })
        this.phoneCodeText = 60
        this.isTimer = true
        this.timer = setInterval(()=>{
          if(this.phoneCodeText==1){
            clearInterval(this.timer)
            this.isTimer = false
            this.phoneCodeText='获取验证码'
            return
          }
          this.phoneCodeText--
        },1000)
      })

    },
    mobileLogin(){
      this.$refs.phoneForm.validate(valid=>{
        if(!valid)return
        this.submitting = true;
        authAPI.mobileLogin(this.phoneForm.phone,this.phoneForm.phoneCode).then(res=>{
          const {code,message,result} = res
          if(code!==0)return;
          const { accessToken, accountId, accountName, telephone } = result;
          localStorage.setItem(
            "accountToken",
            JSON.stringify({
              accessToken: accessToken,
              accountId: accountId,
            })
          )
          localStorage.setItem("accountName", accountName)
          return this.checkAuth(telephone);
        }).finally(() => {
          this.submitting = false;
        });
      })
    },
    handleMenuChange(e) {
      console.log("change", e);
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }, 
};
</script>

<style lang="less" scoped>
.login {
  margin: 0 auto;
  height: 100%;
  width: 360px;
  display: flex;
  align-items: center;
  //justify-content: center;

  .tip {
    margin-top: 16px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, .5);
  }

  .u-key {
    box-sizing: border-box;
    width: 360px;
    height: 128px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    border: 1px dashed rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 64px;
      height: 64px;
    }

    p {
      margin-top: 12px;
      font-size: 12px;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

  /deep/ .el-tabs__header {
    margin-bottom: 24px;

    .el-tabs__item {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, .5);
      padding: 0 16px 0 0;
      height: auto;
      line-height: normal;

      &.is-active {
        border-bottom: none;
        font-size: 16px;
        font-weight: 600;
        color: #FFFFFF;
      }
    }

    .el-tabs__active-bar,
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }

  /deep/ .el-input__inner {
    width: 360px;
    height: 48px !important;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    &:focus{
      background:#fff;
      color: #262626;
    }
  }

  /deep/ .el-button {
    margin-top: 16px;
    font-size: 16px;
    width: 360px;
    height: 48px;
    background: #0A5DD3;
    border: none;
    border-radius: 6px;

    &[disabled] {
      opacity: 0.5;
    }
  }

}
.phoneCodeBox{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .phoneCodeInput{
    width:220px;
    /deep/  .el-input__inner{
      width:200px;
    }
  }
  .phoneCodeBtn{
    width:140px;
    margin-top:0;
  }
}
.global-help {
    display: block;
    background-size: 100%;



    &.admin {
      z-index: 99;
      width: 119px;
      height: 48px;
      position: fixed;
      right: 40px;
      bottom: 20px;
      // background-image: url("../../assets/images/global-help-1.png");

      img {
        width: 200px;
        margin-left: -45px;
        margin-top: -250px;
      }
    }

    &.front {
      flex-shrink: 0;
      display: block;
      height: 36px;
      width: 126px;
      background-image: url("../../assets/images/global-help-2.png");
    }
  }
</style>
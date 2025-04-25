<template>
  <div v-loading="loading" class="userInfoManage">
    <div class="userInfoBox">
      <div class="boxHeader">
        <p class="boxTitle">个人信息</p>
        <el-button type="primary" @click="setUserInfo" :loading="submitting">更新</el-button>
      </div>
      <div style="margin:20px 0;">
        <userInfoComponent :hasTelephoneFormItem="false" :setRoleLimit="setRoleLimit" :userForm="userForm" :type="type" :oldEmail="oldEmail" :oldTelephone="oldTelephone" ref="userInfoComponent"></userInfoComponent>
      </div>
    </div>
    <div class="passWordModifyBox">
      <div class="boxHeader">
        <p class="boxTitle">登录密码修改</p>
        <el-button type="primary" @click="passWordModifyFun" :loading="pwdModifyLoading">修改</el-button>
      </div>
      <div style="margin:20px 0;">
        <el-form :model="pwdForm" :rules="pwdRules" class="pwd__form" label-width="100px" ref="pwdForm">
          <el-form-item label="旧密码:" prop="oldPwd">
            <el-input maxlength="50" placeholder="请输入原密码" type="password" v-model="pwdForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="newPwd">
            <el-popover
              ref="popover"
              placement="right"
              width="200"
              trigger="focus"
              content="长度至少为8个字符,大写字母、小写字母、数字及特殊字符中,至少包含三种类型的字符">
            </el-popover>
            <el-input v-popover:popover maxlength="50" placeholder="请输入新密码" type="password" v-model="pwdForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="reNewPwd">
            <el-input maxlength="50" placeholder="请确认新密码" type="password" v-model="pwdForm.reNewPwd"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="passWordModifyBox">
      <div class="boxHeader">
        <p class="boxTitle">绑定手机修改</p>
        <el-button type="primary" @click="handleShowBindPhoneDialog">绑定新手机</el-button>
      </div>
      <el-form class="pwd__form" label-width="100px">
        <el-form-item label="手机号:" prop="oldPwd">{{ userForm.telephone }}</el-form-item>
      </el-form>
    </div>

    <bindPhoneDialog :visible.sync="bindPhoneDialog.visible" :type="bindPhoneDialog.type" :telephone="userForm.telephone" :systemId="userForm.systemId" @success="handleBindPhone" :btn-submitting="submitting"></bindPhoneDialog>
  </div>
</template>

<script>
import userInfoComponent from './components/userInfoComponent';
import bindPhoneDialog from './components/bindPhoneDialog';
import {
  userDetail,
  addOrUpdate,
  getAllApplicationPermissionByRoles,
  checkPassWord,
  passWordModify
} from "@/api/userManage";
import baseUrl from '@/utils/env'
import crypto from '@/utils/crypto.js'
import * as validators from '@/utils/validators'
import { checkPermission } from '@/utils/common'

export default {
  name: "userInfoManage",
  components: {
    userInfoComponent,
    bindPhoneDialog
  },
  data() {
    const resetPassWord = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };    
    return {
      loading: true,
      setRoleLimit:false,
      submitting:false,
      backUpUserForm: {},
      pwdModifyLoading:false,
      type:"edit",
      userForm:{
        accountId: '',
        loginName: '',
        region: [],
        roles: [],
        name: '',
        telephone: '',
        email: '',
        file: '',
        orgName: '',
        systemName: '',
        systemId: '',
        accountSystem: '',
      },
      oldEmail:'',
      oldTelephone:"",
      userInfo:null,
      pwdForm:{
        oldPwd:"",
        newPwd:"",
        reNewPwd:""
      },
      pwdRules:{
        oldPwd: [
          { required: true, trigger: 'blur', message: '请输入原密码' }
        ],
        newPwd: [
          { required: true, trigger: 'blur', message: '请输入新密码' },
          { required: true, trigger: 'blur', validator: validators.password() }
        ],
        reNewPwd: [
          { required: true, trigger: 'blur', validator: resetPassWord }
        ]
      },
      bindPhoneDialog: {
        visible: false,
        type: 1
      }
    };
  },
  watch: {},
  methods: {
    handleShowBindPhoneDialog() {
      if (checkPermission('允许取消手机绑定') === true && !this.userForm.telephone) {
        this.bindPhoneDialog.type = 1
      } else {
        this.bindPhoneDialog.type = 2
      }
      this.bindPhoneDialog.visible = true

    },
    //获取用户信息
    getUserInfo(row) {
      let params = {
        userAccountId: row.accountId
      }
      this.loading = true
      userDetail(params).then(res => {
        const { code, msg, result } = res
        if (code === 0) {
          this.userInfo = result
          this.userForm.accountId = result.id
          this.userForm.loginName = result.accountName
          this.userForm.roles = result.complainRoles
          this.userForm.name = result.name
          this.userForm.telephone = result.telephone
          this.userForm.email = result.email
          this.oldEmail = result.email
          this.oldTelephone = parseInt(result.telephone)
          this.userForm.file = result.imgURL
          this.userForm.orgName = result.orgName
          this.userForm.systemName = result.systemName
          this.userForm.systemId = result.systemId
          this.userForm.accountSystem = result.accountSystem
          const region = []
          if (this.userInfo.orgId) {
            region.push(this.userInfo.orgId.split(',')[0])
          }
          this.userForm.region = region
          this.type = 'edit'
          this.$refs.userInfoComponent.handleChange()
          if (this.userInfo.ruleId != undefined) {
            this.userForm.userRole = this.userInfo.ruleId.split(',').map(Number)
          }
          this.$refs.userInfoComponent.img = 3
          document.getElementById('portrait').src = baseUrl.appManagerImgUrl + this.userInfo.imgURL
          this.$refs.userInfoComponent.getImage()
          this.$forceUpdate()

          if (checkPermission('允许取消手机绑定') === false) {
            if (!this.userForm.telephone) {
              this.bindPhoneDialog.visible = true
            }
          }

          this.backUpUserForm = { ...this.userForm }

        }
      })
      .finally(() => {
        this.loading = false
      })
    },
    // 数组转字符串 xx,xx,xx格式
    arrToString(data) {
      const dataString = JSON.stringify(data)
      if (data.length > 0) {
        return dataString.slice(1, dataString.length - 1)
      } else {
        return ''
      }
    },
    handleBindPhone(telephone) {
      this.backUpUserForm.telephone = telephone
      this.setUserInfo(1)
    },
    //修改用户信息
    setUserInfo(type = 1) {
      const userForm = type === 1 ? this.backUpUserForm : this.userForm

      if (!userForm.email && !userForm.telephone) {
        // this.$refs.userInfoComponent.rules.email[0].required = true
        this.$modal.msgError('至少填写一项联系方式!')
        return
      }
      this.$refs.userInfoComponent.$refs.userFrom.validate(async valid => {
        if (!valid) return
        const myForm = new FormData()
        this.submitting = true

        let rolesIdList = []
        this.userInfo.roles.forEach(k => {
          k.isCheck == '1' && rolesIdList.push(k.id)
        })
        let checkAppList = []
        const appList = this.userInfo.appLicationNotAppDefultList
        if (appList.length > 0) {
          appList.forEach(item => {
            item.isCheck != 0 && item.readOnly == '0' && checkAppList.push(item.appId)
          })
        }
        if (checkAppList.length == 0) checkAppList = null

        let appIdList = []
        this.userInfo.appLicationAppDefultList.forEach(k=>{
          appIdList.push(k.appId)
        })

        let rolesArr = []
        this.userInfo.roles.forEach(k=>{
          k.isCheck==1&&rolesArr.push(k.id);
        })
        let params = {
          roleIds: this.arrToString(rolesArr),
          projectIds: appIdList,
          personRoleId: this.userInfo.personRole,
          flag: true
        }
        const applicationPermission = await getAllApplicationPermissionByRoles(params)
        const roleListChildren = applicationPermission.result
        let checkRoleList = []
        roleListChildren&&roleListChildren.length>0&&roleListChildren.forEach((value, index) => {
          // debugger
          roleListChildren[index].children.forEach((item, h) => {
            if (item.checked == '1') {
              checkRoleList.push(item.resourceId)
              if (item.children) {
                roleListChildren[index].children[h].children.forEach(i => {
                  checkRoleList.push(i.resourceId)
                })
              }
            } else if (item.checked == '2') {
              // checkRoleList.push(item.resourceId);
              roleListChildren[index].children[h].children.forEach(i => {
                if (i.checked == '1') {
                  checkRoleList.push(i.resourceId)
                }
              })
            }
          })
        })
        myForm.append(
          'AddUserVO',   
          JSON.stringify({
            accountName: userForm.loginName,
            orgId: userForm.region[userForm.region.length - 1],
            orgName: userForm.orgName,
            name: userForm.name,
            telephone: userForm.telephone,
            email: userForm.email,
            roleIds: rolesIdList,
            extraApps: checkAppList,
            extraMenus: checkRoleList,
            id: userForm.accountId,
            accountId: this.userInfo.accountId,
            appIdList: appIdList,
            roles: userForm.roles
          })
        )
        if (this.$refs.userInfoComponent.isUpload && userForm.file) {
          myForm.append('file', userForm.file)
        }
        return addOrUpdate(myForm).then(res => {
          const { code, msg } = res
          this.submitting = false

          this.userForm.telephone = userForm.telephone
          this.bindPhoneDialog.visible = false

          if (code === 0) {
            this.$confirm('修改成功, 您需要重新登录!', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              showClose: false,
              closeOnClickModal: false,
              type: 'success',
            }).then(() => {
              this.$router.replace('/login')
            })
          } else {
            this.$modal.msgError({
              duration: '1000',
              message: msg
            })
          }
        })
        .catch(err=> {
            this.submitting = false
            return Promise.reject(error)
          })
        
      })
    },
    //修改密码
    passWordModifyFun(){
      this.$refs.pwdForm.validate(valid=>{
        console.log(valid);
        if(!valid)return;
        /* gdos需要编码，否则会变短不成功 */
        let checkData={
          accountName: this.userInfo.accountName,
          accountPasswd: encodeURIComponent(crypto.encryption(this.pwdForm.oldPwd)),
          systemId: this.userInfo.systemId
        }
        this.pwdModifyLoading = true
        checkPassWord(checkData).then(res=>{
          if(res.code==0){
            // console.log(crypto);
            let data = {
              accountId: this.userInfo.accountId,
              accountName: this.userInfo.accountName,
              confirmPass: encodeURIComponent(crypto.encryption(this.pwdForm.reNewPwd)),
              name: this.userInfo.name,
              newPassword: encodeURIComponent(crypto.encryption(this.pwdForm.newPwd)),
              oldPassword: encodeURIComponent(crypto.encryption(this.pwdForm.oldPwd)),
              systemId: this.userInfo.systemId
            }
            passWordModify(data).then(res=>{
              const {code,msg} = res
              if(code==0){
                this.$modal.msgSuccess({duration: '1000',message: msg})
                this.pwdForm.newPwd = ""
                this.pwdForm.oldPwd = ""
                this.pwdForm.reNewPwd = ""
              }else{
                this.$modal.msgError({duration: '1000',message: msg})
              }
              this.pwdModifyLoading = false
            }).catch(err=>{
              this.pwdModifyLoading = false
              return Promise.reject(err)
            })
          }else{
            this.pwdModifyLoading = false
            this.$modal.msgError({duration: '1000',message: msg})
          }
        }).catch(err=>{
          this.pwdModifyLoading = false
          return Promise.reject(err)
        })
      })
    }
  },
  created() {
    let userInfoObj = localStorage.getItem('accountToken')
    // console.log(userInfoObj);
    if(!userInfoObj)return;
    userInfoObj = JSON.parse(userInfoObj)
    this.getUserInfo(userInfoObj)
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.userInfoManage{
  .userInfoBox,
  .passWordModifyBox{
    width:50%;
  }
  .boxHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .boxTitle{
      position: relative;
      padding-left:20px;
      &::before{
        content: "";
        width:4px;
        height:21px;
        background: #0b5fd5;
        position: absolute;
        left:0;
        top:1px;
        // border-radius: 4px;
      }
    }
  }
}
</style>

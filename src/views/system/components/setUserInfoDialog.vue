<template>
  <el-dialog
    :title="type==='add'?'新增用户':'编辑用户'"
    width="1000px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div class="userInfoBox">
      <div class="userInfo">
        <userInfoComponent :userForm="userForm" :type="type" :oldEmail="oldEmail" :oldTelephone="oldTelephone" ref="userInfoComponent"></userInfoComponent>
      </div>
      <div v-loading="loading2" class="userRole">
        <el-checkbox-group v-model="userForm.roles">
<!--          <el-checkbox label="0" disabled>部门成员</el-checkbox>-->
          <div v-for="item in accountRoleTypeTypeArr" :key="item.id">
            <el-checkbox :disabled="item.id === 0" :label="item.id">{{ item.rolename }}</el-checkbox>
          </div>
          <!--          <div v-for="item in configureMap" :key="item.id">-->
          <!--            <el-checkbox :label="String(item.id)">{{ item.customName }}</el-checkbox>-->
          <!--          </div>-->
        </el-checkbox-group>
      </div>
    </div>
    <div class="dialog-footer-btn">
      <el-button @click="handleClose" plain>关闭</el-button>
      <el-button @click="handleSubmit" :loading="submitting" type="primary">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { accountRoleTypeTypeDict } from "@/utils/dict";
import { deepGetItem, dict2Array } from '@/utils/common'
import userInfoComponent from './userInfoComponent'
import { addOrUpdate, getAllApplicationPermissionByRoles, isAuthority, getAppList, isTopAuthority } from '@/api/userManage'
import baseUrl from '@/utils/env'
import * as departmentConfigureAPI from '@/api/departmentConfigure'
import { getList, getTypeList } from '@/api/departmentConfigure'
import * as userRoleRelationAPI from '@/api/userRoleRelation'
import { checkLeaderDepartment } from "@/api/userRoleRelation";

export default {
  name: 'setUserInfoDialog',
  components: {
    userInfoComponent
  },
  props: {
    loading: false,
    visible: { type: Boolean, default: false },
    type: { type: String, default: 'add' },
    userForm: { type: Object, default: Object },
    userInfo: { type: Object, default: null },
    oldEmail: { type: String, default: '' },
    currentAccountId: { type: String, default: '' },
    oldTelephone: { type: String | Number, default: '' },
    accountRoleTypeTypeDict: { type: Object, default: Object }
  },
  data() {
    return {
      submitting: false,
      accountRoleTypeTypeArr: [],
	  loading2:false,
    }
  },
  watch: {
	  userInfo: {
	    handler(val) {
	      console.log(val,')))))))))))')
	      },
	    immediate: true
	  },
	  loading: {
	    handler(val) {
	      this.loading2 = val
	      },
	    immediate: true
	  },
    visible(val, oldval) {

      if (val) {
        // this.accountRoleTypeTypeArr = dict2Array(this.accountRoleTypeTypeDict)
        this.$nextTick(() => {
          this.$refs.userInfoComponent.isUpload = false
          this.$refs.userInfoComponent.img = 1
          this.submitting = false
          this.$refs.userInfoComponent.clearFormValidate()
          // this.setRolesAndUser()
          if (this.type === 'edit') {
            this.$refs.userInfoComponent.handleChange()
            // console.log(this.userForm.region );
            if (this.userInfo.ruleId != undefined) {
              this.userForm.userRole = this.userInfo.ruleId.split(',').map(Number)
            }
            this.$refs.userInfoComponent.img = 3
            document.getElementById('portrait').src = baseUrl.appManagerImgUrl + this.userInfo.imgURL
            this.$refs.userInfoComponent.getImage()
            this.$forceUpdate()
          }
        })
      }
    },
    'userForm.region': {
      handler(val, oldVal = []) {
        this.userForm.roles = []
        this.accountRoleTypeTypeArr = []

        if (this.$refs.userInfoComponent && this.$refs.userInfoComponent.dataList) {
          this.getAccountRoleTypeTypeArr()
          }
        },
      immediate: true
    }
  },
  methods: {
    getAccountRoleTypeTypeArr() {
      const orgId = this.userForm.region[this.userForm.region.length - 1]
      const item = deepGetItem(this.$refs.userInfoComponent.dataList, item => item.id === orgId)
      if (!orgId) return
      this.loading2 = true

      Promise.all([
        userRoleRelationAPI.checkLeaderDepartment().then(r => r.result),
        userRoleRelationAPI.getListByCode({ orgCode: item.code, userAccountId: this.type === 'edit' ? this.currentAccountId : undefined }).then(r => r.result)
      ])
        .then(([isLeaderDepartment, roles]) => {
          const accountRoleTypeTypeArr = []
          const checkedRoles = []
          for (const item of roles) {
            if (!isLeaderDepartment && [4, 12].includes(item.id)) continue
            if (item.isshow === 1) {
              accountRoleTypeTypeArr.push(item)
            }
            if (item.isCheck === '1') {
              checkedRoles.push(item.id)
            }
          }
          this.userForm.roles = checkedRoles
		  console.log(checkedRoles,'++++++++++++++++++++=')
          this.accountRoleTypeTypeArr = accountRoleTypeTypeArr
        })
        .finally(() => {
          setTimeout(() => {
            this.loading2 = false
          }, 500)
        })
    },

    //根据部门调整用户角色及角色选择的选项
    async setRolesAndUser() {
      const isAuthorityObj = await isAuthority()
      const codeAuthority = isAuthorityObj.code,
        msgAuthority = isAuthorityObj.msg,
        resultAuthority = isAuthorityObj.result
      const isTopAuthorityObj = await isTopAuthority()
      const codeisTopAuthority = isTopAuthorityObj.code,
        msgAisTopAuthority = isTopAuthorityObj.msg,
        resultisTopAuthority = isTopAuthorityObj.result
      if (codeAuthority == 0 && codeisTopAuthority == 0) {
        this.accountRoleTypeTypeArr = this.accountRoleTypeTypeArr.reduce((pre, cur) => {
          if (cur.id != 2 && cur.id != 4) {
            pre.push(cur)
          } else {
            cur.id == 2 && resultAuthority && pre.push(cur)
            cur.id == 4 && resultisTopAuthority && pre.push(cur)
          }
          return pre
        }, [])
        !resultAuthority && this.userForm.roles.indexOf('2') > -1 && this.userForm.roles.splice(this.userForm.roles.indexOf('2'), 1)
        !resultisTopAuthority && this.userForm.roles.indexOf('4') > -1 && this.userForm.roles.splice(this.userForm.roles.indexOf('4'), 1)
        // debugger
        console.log('> ', this.userForm.roles)
      }else{
        this.$modal.msgError({duration: '3000', message: codeAuthority!=0?msgAuthority:msgAisTopAuthority})
      }
    },
    handleSubmit(){
      if(!this.userForm.email&&!this.userForm.telephone){
        // this.$refs.userInfoComponent.rules.email[0].required = true
        this.$modal.msgError('至少填写一项联系方式!')
        return;
      }
      this.$refs.userInfoComponent.$refs.userFrom.validate(async valid=>{
        if(valid){
          const myForm = new FormData()
          this.submitting = true
          if (this.type === 'edit') {
            let rolesIdList = []
            this.userInfo.roles.forEach(k=>{
              k.isCheck=="1"&&rolesIdList.push(k.id)
            })

            let checkAppList = []
            const appList = this.userInfo.appLicationNotAppDefultList
            if (appList.length > 0) {
              appList.forEach(item => {
                item.isCheck != 0 && item.readOnly == '0'&&checkAppList.push(item.appId)
              })
            }
            if (checkAppList.length == 0)checkAppList = null

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
                accountName: this.userForm.loginName,
                orgId: this.userForm.region[this.userForm.region.length - 1],
                orgName: this.userForm.orgName,
				orgCode: this.userForm.orgCode,
                name: this.userForm.name,
                telephone: this.userForm.telephone, 
                email: this.userForm.email,
                roleIds: rolesIdList,
                extraApps: checkAppList,
                extraMenus: checkRoleList,
                id: this.userForm.accountId,
                accountId:this.userInfo.accountId,
                appIdList: appIdList,
                roles:this.userForm.roles.length>0?this.userForm.roles.join(','):""
              })
            )
            if (this.$refs.userInfoComponent.isUpload) {
              myForm.append('file', this.userForm.file)
            }
            addOrUpdate(myForm).then(res => {
              const {code,msg} = res
              this.submitting = false
              if (code === 0) {
                this.$modal.msgSuccess({
                  duration: '1000',
                  message: msg
                })
                this.$emit('getNewList')
              } else {
                this.$modal.msgError({
                  duration: '1000',
                  message: msg,
                })
              }
            })
            .catch(err=> {
              this.submitting = false
              return Promise.reject(err)
            })
          }else{
            const appListArr = await  getAppList({accountId:""})
            const appList= appListArr.result&&appListArr.result.appLicationAppDefultList
            let appIdList = []
            appList&&appList.length>0&&appList.forEach(k=>{
              appIdList.push(k.appId)
            })
			const orgObj = this.$refs.userInfoComponent.$refs.region.getCheckedNodes(false)[0]
            myForm.append(
              'AddUserVO',
              JSON.stringify({
                accountSystem:this.userForm.accountSystem,
                systemId:this.userForm.systemId,
                systemName:this.userForm.systemName,
                functionDriverPath:'addUser',
                accountName: this.userForm.loginName,
                orgId: this.userForm.region[this.userForm.region.length - 1],
                orgName: this.userForm.orgName,
				orgCode: orgObj.data.code,
                name: this.userForm.name,
                telephone: this.userForm.telephone,
                email: this.userForm.email,
                accountSource: 1,
                operation: 1,
                roleIds: [],
                extraApps: [],
                extraMenus: [],
                id: '',
                appIdList: appIdList,
                roles:this.userForm.roles.length>0?this.userForm.roles.join(','):""
              })
            )
            if (this.$refs.userInfoComponent.isUpload&&this.userForm.file) {
              myForm.append('file', this.userForm.file)
            }
            addOrUpdate(myForm).then(res=>{
              this.submitting = false
              const {code,msg} = res
              if (code === 0) {
                this.$modal.msgSuccess({
                  duration: '1000',
                  message: msg
                })
                this.$emit('getNewList')
              }
            }).catch(err=>{
              this.submitting = false
            })
          }
        }
      })

    },
    // 数组转字符串 xx,xx,xx格式
    arrToString (data) {
      const dataString = JSON.stringify(data)
      if (data.length > 0) {
        return dataString.slice(1, dataString.length - 1)
      } else {
        return ''
      }
    },
    handleClose(){
      this.$emit('handleClose')
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.userInfoBox{
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: center;
  .userInfo{
    width: 50%;
  }
  .userRole{
    width: 50%;
    padding-left:100px;
  }
}
</style>
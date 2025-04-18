<template>
  <warp title="我要投诉" :hasPrevRoute="routerMap[$route.path]">
    <div class="title center">第二步 记录案件内容</div>

    <div class="form">
      <div class="form-item">
        <div class="key required">事发地</div>
        <div class="value" @click="areaPickerVisible = true">
          <span v-if="form.address">{{ form.address }}</span>
          <span v-else class="placeholder">请选择事发地</span>
        </div>
      </div>
      <div class="form-item">
        <div class="key required">投诉对象</div>
        <div class="value" @click="departmentPickerVisible = true">
          <span v-if="form.addressDepartmentName">{{ form.addressDepartmentName }}</span>
          <span v-else class="placeholder">请选择投诉对象</span>
        </div>
      </div>
      <div class="form-item">
        <div class="key required">手机号码</div>
        <div class="value">
          <input v-model="form.mobile" type="number" maxlength="11" placeholder="请输入手机号">
        </div>
      </div>
      <div class="form-item">
        <div class="key required">通讯地址</div>
        <div class="value">
          <input v-model="form.mailAddress" type="text" placeholder="请输入通讯地址">
        </div>
      </div>
      <div class="form-item">
        <div class="key required">标题</div>
        <div class="value">
          <input v-model="form.title" type="text" maxlength="100" placeholder="请输入标题">
        </div>
      </div>
      <!--      <div class="form-item">-->
      <!--        <div class="key required">投诉对象类型</div>-->
      <!--        <div class="value" @click="complaintObjectTypePickerVisible = true">-->
      <!--          <span v-if="form.complaint">{{ form.complaint | workOrderComplaintObjectType }}</span>-->
      <!--          <span v-else class="placeholder">请选择投诉对象类型</span>-->
      <!--        </div>-->
      <!--      </div>-->


      <template v-if="cmsUserInfo.userType === 2">
        <div class="form-item">
          <div class="key required">企业联系<br />&nbsp;&nbsp;人姓名</div>
          <div class="value">
            <input v-model="form.companyContactName" type="text" maxlength="100" placeholder="请输入企业联系人姓名">
          </div>
        </div>
        <div class="form-item">
          <div class="key required">企业联系人<br />&nbsp;&nbsp;身份证号</div>
          <div class="value">
            <input v-model="form.companyContactIdNum" type="text" maxlength="100" placeholder="请输入企业联系人身份证号">
          </div>
        </div>
        <div class="form-item">
          <div class="key required">企业住所地</div>
          <div class="value" @click="companyAreaPickerVisible = true">
            <span v-if="form.companyAddress">{{ form.companyAddress }}</span>
            <span v-else class="placeholder">请输入企业住所地</span>
<!--            <input v-model="form.companyAddress" type="text" maxlength="100" placeholder="请输入企业住所地">-->
          </div>
        </div>
      </template>

      <div class="form-item" style="align-items: flex-start">
        <div class="key required">主要诉求</div>
        <div class="value">
          <textarea v-model="form.mainApply" placeholder="请分点描述主要诉求：1、..." maxlength="1000" style="width: 100%; height: 2.8rem"></textarea>
        </div>
      </div>
      <div class="form-item" style="align-items: flex-start">
        <div class="key required">事实与理由</div>
        <div class="value">
          <textarea v-model="form.factReason" placeholder="请详细描述您的事实与理由" maxlength="1000" style="width: 100%; height: 2.8rem"></textarea>
        </div>
      </div>

      <div class="form-item" style="align-items: flex-start">
        <div class="key required">是否涉及政府欠款</div>
        <div class="value">
          <el-switch
            v-model="form.isDebt">
          </el-switch>
        </div>
      </div>
      <div v-if="form.isDebt" class="form-item" style="align-items: flex-start">
        <div class="key required">欠款金额</div>
        <div class="value" style="display: flex; align-items: center">
          <input v-model="form.debtAmount" placeholder="请输入欠款金额"> 元
        </div>
      </div>
      <!--      <div class="form-item">-->
      <!--        <div class="key required">公开意向</div>-->
      <!--        <div class="value" @click="publicPickerVisible = true">-->
      <!--          <span v-if="form.publicIntention === ''" class="placeholder">请选择公开意向</span>-->
      <!--          <span v-else>{{ form.publicIntention === "Y" ? "同意" : "不同意" }}</span>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="form-item">
        <div class="key required">附件</div>
        <div class="value" @click="">
          <label for="fileInput" class="placeholder">请选择</label>
          <input
            @change="handleFileChange"
            ref="fileInput"
            id="fileInput"
            class="vision-hide"
            type="file"
            accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.mov,.avi,.mp4,.wmv,.rmvb,.docx,.pptx,.xlsx,.doc,.ppt,.xls,.pdf,.rar,.zip,.7z">
        </div>
      </div>
      <div class="form-item">
        <ol class="value color-danger" style="line-height: 1.2; font-size: 12px; list-style-type: none; padding-left: 20px;">
<!--          <li>填写投诉举报案件信息时，须上传签字盖章的“投诉书”文件。点击 <a class="el-link" :href="`${location.origin}${location.pathname}/js/template.doc`" download="投诉书（样式）.doc" style="color: #409EFF;">下载投诉书模板</a></li>-->
          <li>温馨提示: 请按照填报要求提供与投诉举报事项相关的资料，上传的附件大小不能超过100M，附件类型支持图片，视频，文档，压缩包等格式文件。</li>
        </ol>
      </div>
      <template v-if="form.attachmentList.length">
        <div v-for="(item, index) in form.attachmentList" class="form-item">
          <div class="key color-primary" style="width: auto; flex: 1">{{ item.fileName }}</div>
          <div class="value" style="display: flex; justify-content: right;">
            <span class="color-primary" @click="handlePreview(item)">预览</span>
            <span class="color-primary" @click="handleDownload(item)" style="margin: 0 8px;">下载</span>
            <span @click="handleRemoveFile(index)" class="color-danger">删除</span>
          </div>
        </div>
      </template>

      <div class="footer">
        <button class="submit-btn" :disabled="submitting" @click="handleSave" style="margin-right: .2rem;">保存</button>
        <button class="submit-btn" :disabled="submitting" @click="handleSubmit">保存并提交</button>
      </div>

      <VuePicker
        id="areasPicker"
        title="双击选择任意一级"
        confirmText=""
        :data="areas"
        :layer="3"
        :showToolbar="true"
        @confirm="handleAreaPickerConfirm"
        @change="handleAreaPickerChange"
        :visible.sync="areaPickerVisible"
      />

      <VuePicker
        title="请选择"
        :data="areas"
        :layer="3"
        :showToolbar="true"
        @confirm="handleCompanyAreaPickerConfirm"
        :visible.sync="companyAreaPickerVisible"
      />

      <VuePicker
        :data="publicOptions"
        :showToolbar="true"
        @confirm="handlePublicPickerConfirm"
        :visible.sync="publicPickerVisible"
      />

      <VuePicker
        :data="complaintObjectTypeArr"
        :showToolbar="true"
        @confirm="handleComplaintObjectTypePickerConfirm"
        :visible.sync="complaintObjectTypePickerVisible"
      />

      <VuePicker
        :data="departmentTree"
        :showToolbar="true"
        @confirm="handleDepartmentTreePickerConfirm"
        :visible.sync="departmentPickerVisible"
      />

      <previewDrawer :visible.sync="previewDrawer.visible" :filePath="previewDrawer.filePath"></previewDrawer>
      <iframe :src="downloadURL" style="border: none; height: 0; "></iframe>
    </div>
  </warp>
</template>

<script>
import warp from '@/views/wap/components/warp'
import VuePicker from 'vue-pickers'
import * as portalsApi from '@/api/portals'
import { fileSize, flat, getCMSUserInfo, mergeLeft, postPortalsHeight } from '@/utils/common'
import * as fileApi from '@/api/file'
import * as mixins from '@/views/wap/mixin'
import { workOrderComplaintObjectTypeDict } from '@/utils/dict'
import { workOrderComplaintObjectType } from '@/utils/filters'
import previewDrawer from '@/views/wap/components/previewDrawer'

export default {
  name: "createStep2",
  components: { warp, VuePicker, previewDrawer },
  mixins: [mixins.router],
  filters: { workOrderComplaintObjectType },
  data() {
    return {
      submitting: false,
      areas: [],
      publicOptions: [[
        { label: "同意", value: "Y" },
        { label: "不同意", value: "N" }
      ]],
      complaintObjectTypeArr: [Object.keys(workOrderComplaintObjectTypeDict).map(key => ({label: workOrderComplaintObjectTypeDict[key], value: key}))],
      publicPickerVisible: false,
      areaPickerVisible: false,
      complaintObjectTypePickerVisible: false,
      departmentPickerVisible: false,
      companyAreaPickerVisible: false,
      form: {
        addressDepartmentCode: '',
        departmentName: '',
        isDebt: false,
        debtAmount: undefined,
        complaintObject: '',
        addressArea: '',
        addressCity: '',
        mobile: '',
        title: '',
        comment: '',
        publicIntention: '',
        attachmentList: [],
        address: '',
        addressId: '',
        complaint: '',
        mailAddress: '',
        companyContactName: '',
        companyContactIdNum: '',
        companyAddress: '',
        mainApply: '',
        factReason: ''
      },
      selectedArea: [],
      touchStartStamp: 0,
      departmentTree: [],
      cmsUserInfo: {},
      downloading: false,
      previewDrawer: {
        visible: false,
        filePath: ''
      },
      downloadURL: ''
    };
  },
  computed: {
    location() {
      return window.location || {}
    }
  },
  watch: {
    'form.addressId'(addressId) {
      this.form.addressDepartmentCode = ''
      this.form.addressDepartmentName = ''
      portalsApi.workOrder.departByAddress({addressId})
        .then(r => {
          this.departmentTree = [flat(r.result)]
        })
    },
    'form.isDebt'(val) {
      if (val === false) {
        this.form.debtAmount = undefined
      }
      this.$nextTick(postPortalsHeight)
    },
    'form.debtAmount'(val) {
      if (val !== undefined) {
        val = val.replace(/^\D*(\d*(?:\.\d{0,999999999999})?).*$/g, '$1').replace(/-/g, '')
        if (val === '0') {
          val = 1
        }
        this.form.debtAmount = val
      }

    }
  },
  created() {

    const { workOrderId } = this.$route.query
    workOrderId && this.getWorkOrder()
    if (workOrderId) {
      this.getWorkOrder().then(() => {
        this.fetchTemporaryStorage()
      })
    } else {
      this.getArea()
      this.fetchTemporaryStorage()
    }

  },
  mounted() {
    this.cmsUserInfo = getCMSUserInfo()
    const areasPickerEl = document.getElementById('areasPicker')
    // console.log(areasPickerEl)
    areasPickerEl.addEventListener('touchstart', event => {
      console.log(new Date().getTime() - this.touchStartStamp)
      if (new Date().getTime() - this.touchStartStamp <= 200) {
          const { nodeName, innerText } = event.target
          if (nodeName === 'LI') {
            for (const item of this.selectedArea) {
              if (item.label === innerText) {
                this.form.address = item.label
                this.form.addressId = item.value

                this.areaPickerVisible = false
                document.body.removeAttribute('style')
                break
              }
            }
          }
      } else {
        this.touchStartStamp = new Date().getTime()
      }
    })
  },
  methods: {
    handlePreview(row) {
      this.previewDrawer = {
        visible: true,
        filePath: row.fileUrl
      }
    },
    handleDownload(row) {
      if (this.downloading) return
      this.downloading = true
      this.downloadURL = fileApi.download({
        downloadFileName: row.fileName,
        filePath: row.fileUrl
      }, false) + `&_=${Math.random()}`
      setTimeout(() => {
        this.downloading = false
      }, 500)
    },
    fetchTemporaryStorage() {
      const cmsUserInfo = getCMSUserInfo()
      return portalsApi.workOrder.getTemporaryStorage({ createUserId: cmsUserInfo.userId })
        .then(res => {
          const result = res.result
          if (result) {
            this.form = mergeLeft(this.form, result)
            this.form.id = result.id
            this.form.attachmentList = result.workOrderDraftAttachments
            this.form.isDebt = Boolean(result.debtAmount)
          }
        })
    },
    getArea() {
      portalsApi.workOrder.area()
        .then(res => {
          const result = res.result
          result.label = result.name
          result.value = result.id
          result.children = result.subList.map(item => {
            item.label = item.name
            item.value = item.id
            item.children = item.subList.map(item => {
              item.label = item.name
              item.value = item.id
              return item
            })
            return item
          })
          this.areas = [result]
        })
    },
    getWorkOrder() {
      return portalsApi.workOrder.detailsOfMyWorkOrder(this.$route.query.workOrderId)
        .then(res => {
          const details = res.result
          this.form = mergeLeft(this.form, details)
          // this.form.addressArea = details.addressArea
          // this.form.addressCity = details.addressCity
          // this.form.title = details.title
          // this.form.comment = details.comment
          // this.form.mobile = details.mobile
          // this.form.publicIntention = details.publicIntention
          // this.form.attachmentList = details.attachmentList
          this.itemDetailId = details.itemDetailId
        })
    },

    generateFormData() {
      const form = { ...this.form }

      const cmsUserInfo = getCMSUserInfo()
      const { workOrderId, id } = this.$route.query
      form.itemDetailId = Number(id)
      form.createUserId = cmsUserInfo.userId
      form.createUserName = cmsUserInfo.userName
      form.createUserType = cmsUserInfo.userType
      form.email = cmsUserInfo.cmsUserEmail
      form.idNumber = cmsUserInfo.idNumber
      form.socialCreditNumber = cmsUserInfo.socialCreditNumber
      if (workOrderId) form.workOrderId = workOrderId

      if (!form.isDebt) {
        form.debtAmount = 0
      }
      delete form.isDebt
      return form
    },


    handleSave() {
      const form = this.generateFormData()
      this.submitting = true
      portalsApi.workOrder.temporaryStorage(form)
        .then(res => {
          this.form.id = res.result
          this.$modal.msgSuccess('保存成功')
        })
        .finally(() => {
          this.submitting = false
        })
    },

    handleSubmit() {
      let form = { ...this.form }

      if (!form.address) return this.$modal.msgError('请选择事发地')
      if (!form.mobile) return this.$modal.msgError('请填写手机号码')
      if (form.mobile.length !== 11) return this.$modal.msgError('请填写正确的手机号码')
      if (!form.title) return this.$modal.msgError('请填写标题')
      // if (!form.comment) return this.$modal.msgError('请填详细描述')
      if (!form.addressDepartmentCode) return this.$modal.msgError('请选择投诉对象')
      if (form.isDebt && !form.debtAmount) return this.$modal.msgError('请填写欠款金额')
      if (!form.mailAddress) return this.$modal.msgError('请填通讯地址')
      if (this.cmsUserInfo.type === 2) {
        if (!form.companyContactName) return this.$modal.msgError('请填企业联系人姓名')
        if (!form.companyContactIdNum) return this.$modal.msgError('请填企业联系人身份证号')
        if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(form.companyContactIdNum) === false) return this.$modal.msgError('请填正确的身份证号')
        if (!form.companyAddress) return this.$modal.msgError('请选择企业住所地')
      }

      if (this.form.attachmentList.length === 0) return this.$modal.msgError('请上传附件')

      const { workOrderId, id } = this.$route.query
      form = this.generateFormData()
      this.submitting = true
      // await this.$router.push('/wap/success')
      this.$confirm('请您核实填写信息是否准确，点击“确认”将无法修改信息内容，是否确认提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => portalsApi.workOrder[workOrderId ? 'resubmit' : 'add'](form))
        .then(() => {
          this.$router.push({ path: '/wap/success', query: { backPath: workOrderId ? `/wap/my/details&id=${workOrderId}` : '' } })
        })
      .finally(() => {
        setTimeout(() => {
          this.submitting = false
        }, 100)
      })
    },
    handleFileChange(e) {
      if (this.uploading) return
      const file = e.target.files[0]
      if (fileSize(file) > 100) {
        this.clearFileInput()
        return this.$modal.msgError('请上传100M以内的文件')
      }

      const formData = new FormData()
      formData.append('file', file)

      this.uploading = true
      fileApi.upload(formData).then(res => {
        this.$modal.msgSuccess('上传成功')
        this.form.attachmentList.push({
          fileName: file.name,
          fileUrl: res.data
        })
      })
        .finally(() => {
          this.clearFileInput();
          this.uploading = false;
        })
    },
    clearFileInput() {
      document.getElementById("fileInput").value = "";
    },
    handleRemoveFile(index) {
      this.form.attachmentList.splice(index, 1)
    },
    handleAreaPickerChange(res) {
      this.selectedArea = res
    },
    handleCompanyAreaPickerConfirm(res) {
      if (res) {
        this.form.companyAddress = res[res.length - 1].label
        // this.form.companyAddressName = res[res.length - 1].label
      }

    },
    handleAreaPickerConfirm(res) {
      // this.selectedArea = res
      // const result = res[res.length - 1]
      // if (result) {
      //   this.form.address = result.name
      //   this.form.addressId = result.id
      // }

    },
    handlePublicPickerConfirm(res) {
      this.form.publicIntention = res[0].value
    },

    handleComplaintObjectTypePickerConfirm(res) {
      this.form.complaint = res[0].value;
    },
    handleDepartmentTreePickerConfirm(res) {
      this.form.addressDepartmentCode = res[0].value
      this.form.addressDepartmentName = res[0].label
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  margin: .2rem;
}



.footer {
  padding: 0 .2rem;
  //margin-bottom: 10rem;
  display: flex;

  .submit-btn {
    flex: 1;

    display: block;
    margin: 1rem 0;
    box-sizing: border-box;
    height: .8rem;
    background: #0B5FD5;
    border-radius: 4px;
    color: #fff;
    border: none;
  }
}

</style>





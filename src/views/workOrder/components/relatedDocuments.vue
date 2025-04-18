<template>
  <div class="card">
<!--    <div class="header">-->
<!--      &lt;!&ndash;      <div class="title">相关文书</div>&ndash;&gt;-->

<!--    </div>-->
    <el-select v-model="typeCode" placeholder="请选择" @change="handleChange()" style="margin-bottom:10px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    <div class="beautify-scroll" style="height: calc(100vh - 220px)">
      <fileList title="线索文档" :list="allMaterialCorrectionDtoList" :details="details" @preview="handlePreview"
                @delete="playLoadData"></fileList>
      <fileList title="案件办理" :list="processAttachmentList" :details="details" canDelete @preview="handlePreview"
                @delete="playLoadData"></fileList>
      <fileList title="通知反馈" :list="wordAttachmentList" :details="details" canDelete @preview="handlePreview"
                @delete="playLoadData"></fileList>
    </div>
    <div class="bottom" v-if="isLeaderDepartment || isCurrentWorkWorkProcessor" style="padding: 14px 0">
      <el-button v-if="type === 'all'" v-permission="['允许在查询中心上传文件']" style="width: 100%"
                 @click="uploadFileTypeDialog.visible = true" type="primary">上传文件
      </el-button>
      <el-button v-else @click="uploadFileTypeDialog.visible = true" type="primary" style="width: 100%">
        上传文件
      </el-button>
    </div>
  </div>
</template>

<script>
import fileList from "@/components/fileList/index.vue";
import * as workOrderApi from "@/api/workOrder/index";
import { rolePermissionsMixin } from "@/views/workOrder/mixin";
export default {
  name: "relatedDocuments",
  mixins: [rolePermissionsMixin],
  components: { fileList },
  data() {
    return {
      typeCode:'',
      options:[
        {
          label:'全部文书',
          value: '',
        },
        {
          label:'投诉举报附件',
          value: 11,
        },{
          label:'授权委托书',
          value: 12,
        },{
          label:'补正材料附件',
          value: 13,
        },{
          label:'复议附件',
          value: 14,
        },{
          label:'投诉书',
          value: 15,
        },{
          label:'其他办案资料',
          value: 16,
        },{
          label:'中止附件',
          value: 21,
        },{
          label:'提交办结附件',
          value: 22,
        },{
          label:'调查笔录',
          value: 23,
        },{
          label:'审批表',
          value: 24,
        },{
          label:'其他过程文档',
          value: 25,
        },{
          label:'结案报告',
          value: 26,
        },{
          label:'结案附件',
          value: 27,
        },{
          label:'受理通知书',
          value: 31,
        },{
          label:'不受理通知书',
          value: 32,
        },{
          label:'结案通知书',
          value: 33,
        },{
          label:'其他通知书',
          value: 34,
        }
      ],
      allMaterialCorrectionDtoList:[],
      processAttachmentList:[],
      wordAttachmentList:[]
    }
  },
  props: {
    type: { type: String, default: "" },
    uploadFileTypeDialog: { type: Object, default: Object },
    details: { type: Object, default: Object },
    playLoadData: { type: Function, default: Function },
    handlePreview: { type: Function, default: Function }
  },
  computed: {
    // wordAttachmentList() {
    //   return this.details.wordAttachmentList || [];
    // },
    // processAttachmentList() {
    //   return this.details.processAttachmentList || [];
    // },
    // allMaterialCorrectionDtoList() {
    //   return this.details.allMaterialCorrectionDtoList || [];
    // }
  },
  watch:{
    'details'(){
      this.detailAttachmentListFun()
    },
    // 'details.processAttachmentList'(){
    //   this.processAttachmentList = this.details.processAttachmentList || []
    // },
    // 'details.wordAttachmentList'(){
    //   this.wordAttachmentList = this.details.wordAttachmentList || []
    // }
  },
  mounted() {
    
  },
  methods: {
    handleChange(){
     
      this.detailAttachmentListFun()
    },
    detailAttachmentListFun(){
      console.log(this.details,'this.details')
      workOrderApi.all.detailAttachmentList(
        { 
          // this.details.id
          id: this.details.id,
          typeCode:this.typeCode 
        }).then(res => {
          if(res.code==0){
            // 8-办案资料、9-过程文档、10-通知书
            this.wordAttachmentList=res.result['通知书'] ? res.result['通知书'] :[]
            // this.wordAttachmentList.forEach(item => {
            //   this.$set(item,'typeLabel',)
            // })
            this.processAttachmentList=res.result['过程文档'] ? res.result['过程文档'] : []
            this.allMaterialCorrectionDtoList=res.result['办案资料'] ? res.result['办案资料'] :[]
            console.log(this.allMaterialCorrectionDtoList,'this.allMaterialCorrectionDtoList')
          }
          
        });
    } 
  }
};
</script>

<style scoped>

</style>
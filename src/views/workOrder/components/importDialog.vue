<template>
  <el-dialog append-to-body
    title="批量导入投诉举报历史案件"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleCancel"
  >
    <div class="steps">
        <div class="step">
            <span :class="active == 1 ? 'active index': 'index'">1</span>
            <span class="text">上传数据</span>
        </div>
        <div class="step">
            <span :class="active == 2 ? 'active index': 'index'">2</span>
            <span class="text">确认数据</span>
        </div>
        <div class="step">
            <span :class="active == 3 ? 'active index': 'index'">3</span>
            <span class="text">导入成功</span>
        </div>
    </div>
    <div class="contentBox">
        <div v-if="active == 1" style="position: relative;width:100%;min-height:200px;">
            <el-form :model="form" :rules="rules"  ref="form" label-position="right" class="form" style="min-width:200px;">
                <el-form-item label="上传文件：" prop="upload" label-width="100px">
                    <!-- accept=".xlsx" -->
                    <el-upload
                        ref="upload"
                        class="upload-demo"
                        action="#"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :on-change="handleChange"
                        :on-progress="handleProcess"
                        :before-remove="beforeRemove"
                        multiple
                        accept=".xls,.xlsx"
                        :limit="1"
                        :auto-upload="false"
                        :file-list="form.upload">
                        <el-button size="small" type="primary" :disabled="form.upload.length==1">请选择</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="" label-width="100px">
                    <p style="color:rgb(112, 197, 199);cursor:pointer;" v-if="form.upload.length">上传成功，请点击下一步</p>
                    <p style="color:#0B5FD5;cursor:pointer;" @click="downLoad()">点此下载模板文件</p>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" :disabled="!form.upload.length" @click="nextStep()">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="active == 2" class="contentItem">
            <div>
                <p class="hText" v-if="checkProgressPercentage != 100">{{checkProgressPercentage}}%确认中</p>
                <div v-if="checkProgressPercentage == 100 && checkData.errorTotal"> 
                    <p>共识别{{ checkData.dataTotal }}条数据，发现问题数据{{ checkData.errorTotal }}条</p>
                    <p  @click="fileDownload(checkData.url)" style="color:#0B5FD5;cursor:pointer;margin-top:10px">下载问题数据</p>
                    <!-- <p  style="color:#0B5FD5;cursor:pointer;margin-top:10px"><a target='_blank' :href="checkData.url">下载问题数据</a></p> -->
                </div>
                
                <div v-if="checkProgressPercentage == 100 && !checkData.errorTotal">
                    <p class="hText">确认完成</p>
                    <p>共识别{{ checkData.dataTotal }}条数据</p>
                </div>
                
            </div>
            <div class="btns">
                <el-button @click="handleCancel">取消</el-button>
                <template>
                    <el-button type="primary" v-if="checkData.errorTotal" @click="backUpload">已下载，重新上传</el-button>
                    <el-button type="primary" v-else @click="nextStep" :disabled="!checkData.errorTotal && checkData.dataTotal ? false : true">下一步</el-button>
                </template>
            </div>
        </div>
        <div v-if="active == 3" class="contentItem">
            <p class="hText" v-if="uploadProgressPercentage != 100">{{uploadProgressPercentage}}%导入中，请不要关闭窗口</p>
            <div v-if="uploadProgressPercentage == 100"> 
                <p class="hText">导入完成</p>
                <p>共导入{{successData.dataTotal}}条数据</p>
            </div>
            
            <div class="btns">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" :disabled="uploadProgressPercentage !=100" @click="handleCancel">完成</el-button>
            </div>
        </div>
    </div>
  </el-dialog>
</template>

<script>
import baseUrl from '@/utils/env'
import axios from '@/utils/axios'
import * as workOrderApi from "@/api/workOrder/index";
import * as mixins from "@/utils/mixins";
import * as dictApi from "@/api/dict";
import * as templateApi from "@/api/template";
import { blobDataDownload } from "@/utils/common";
import template from '../../system/template.vue';
export default {
  components: { template },
  name: "appealDialog",
  mixins: [mixins.loading, mixins.form, mixins.dialog],
  props: ["visible", "workOrderNo"],
  data() {
    return {
        active: 1,
        form: {
            upload: [],
        },
        rules: {
            upload: [{ required: true, message: "请选择" }],
        },
        optionList: [],
        showProgress:false,
    	checkProgressPercentage:1,
        disabled:false,
        disabled2:false,
        uploadProgressPercentage:1,
        checkData:{},
        successData:{}
    };
  },
  watch:{
   
  },
  mounted() {
      
  },
  methods: {
    backUpload(){
        this.active = 1
        this.checkProgressPercentage=0
        this.checkData=[]
        this.form.upload=[]
    },
    nextStep(){
        if(this.active == 1){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.active++ > 3) this.active = 1;
                    let fd = new FormData();
                    // fd.append("name",this.form.upload[0].name);
                    //文件信息中raw才是真的文件
                    fd.append("file",this.form.upload[0].raw);
                    this.checkProgressPercentage=0
                    var timeout =setInterval(()=>{
                        if(this.checkProgressPercentage>=99){
                            clearInterval(timeout);
                            return
                        }
                        this.checkProgressPercentage++
                    },50)
                    workOrderApi.all.checkImport(fd).then(res => {
                        if(res.result.code == 200){
                            this.checkProgressPercentage =100
                            if(res.result.url){
                                const baseURL = (gdosComplainFastdfsPath.indexOf('http') > -1 ? gdosComplainFastdfsPath : (`${window.location.protocol}//${window.location.host}${window.gdosComplainFastdfsPath}`))
                                res.result.url = baseURL +'/'+ res.result.url
                            }
                            this.checkData =res.result
                        }else{
                            this.$modal.msgError(res.msg)
                        }
                        
                        
                    }).finally(() => {
                    })  
                    // axios({
                    //     method: 'post',
                    //     url: window.gdosComplainServer+'/api/v1/workOrder/all/checkImport',
                    //     data: fd,
                    //     headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() },
                    //     onUploadProgress: (evt) => { //原生获取上传进度的事件
                    //         this.uploadprogressPercentage = evt.percent
                    //         console.log(this.evt,'this.evt')
                    //         console.log(this.uploadprogressPercentage,'this.uploadprogressPercentage')
                    //         // item.onProgress({status: 'uploading', percentage: percent})
                    //     }
                    // }).then( (res)  => {
                    //     const {data} = res
                    //     alert(2)
                    // }).catch(() => {
                    // })  
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }else if(this.active == 2){
            if (this.active++ > 3) this.active = 1;
            let fd = new FormData();
            // fd.append("name",this.form.upload[0].name);
            //文件信息中raw才是真的文件
            fd.append("file",this.form.upload[0].raw);
            this.uploadProgressPercentage=1
            var timeout =setInterval(()=>{
                if(this.uploadProgressPercentage>=99){
                    clearInterval(timeout);
                    return
                }
                this.uploadProgressPercentage++
            },50)
            
             workOrderApi.all.importWordOrder(fd).then(res => {
                if(res.result.code == 200){
                    this.uploadProgressPercentage =100
                    this.successData=res.result
                }else{
                    this.$modal.msgError(res.msg)
                }
                
            }).finally(() => {

            })  
        }
    },
    // 下载模板
    downLoad(){
        workOrderApi.all.exportTemplate().then(res => {
            blobDataDownload(res.data, "投诉举报历史案件模板.xls");
        }).finally(() => {
            // this.$modal.msgError('下载失败')
        }) 
    },
    fileDownload (url){
        var a = document.createElement("a"); //创建一个<a></a>标签
        a.href = url; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
        a.download = "问题数据.xlsx"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
        a.style.display = "none"; // 障眼法藏起来a标签
        document.body.appendChild(a); // 将a标签追加到文档对象中
        a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
        a.remove()
        // window.location.href=url
    },
    handleSuccess(file, fileList){
        console.log('Success-----')
    },
    
    handleChange(file, fileList) {
        if (fileList.length > 1 && file.status !== "fail") {
            fileList.splice(0, 1);
        } else if (file.status === "fail") {
            this._err("上传失败，请重新上传！");
            fileList.splice(0, 1);
        }
        if (fileList.length !== 0) {
            this.$refs.form.clearValidate()
        }

        this.form.upload=fileList
        console.log(this.form.upload,'change');
    },
    handleRemove(file, fileList) {
        this.form.upload = []
        if (fileList.length == 0) {
            this.$refs.form.validateField('upload')
        }
        console.log(this.form.upload,'remove');
    },
    handleExceed(files, fileList) {
        this.$modal.msgWarning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleCancel() {
        this.active = 1
        this.checkProgressPercentage=0
        this.checkData=[]
        this.form.upload=[]
      this.$emit('success')
    },
    // 上传过程中
    handleProcess(event, file, fileList){
        console.log('Process')
        let num = ((event.loaded / event.total) * 100) | 0; //百分比
        this.percentage = num;
        if (this.percentage == 100) {
            this.showProgress = false;
            this.percentage=0;
        }
        console.log(event,'event')
    }
  }
};
</script>

<style lang="less" scoped>
.tips {
  text-align: center;
  margin-bottom: 20px;
}
.contentBox{
    padding:30px 0;
    
}
.btns{
    margin-top:30px
}
.hText{
    font-size:24px;
}
.contentItem{
    text-align: center;
}
.form{
    position: absolute;
    /* 2 x,y轴走网页的一半 */
    left: 50%;
    top: 50%;
    /* 3 往回走自身x,y的一半 */
    transform: translate(-50%,-50%)
}
.steps{
    display: flex;
    align-items: center;
}
.step{
    display: flex;
    align-items: center;
    width:33.33%
}
.index{
    width:45px;
    height:45px;
    border-radius: 25px;
    text-align: center;
    line-height:45px;
    display: inline-block;
    margin-right:10px;
    background:#ccc
}
.text{
    font-size:16px;
    color:#000;
}
.active{
    background:#0b5fd5;
    color:#fff;
}
</style>
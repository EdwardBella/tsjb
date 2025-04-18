<template>
  <div class="pageInfoManage">
    <card>
      <div slot="content">
        <el-table v-loading="loading" :data="dataList" stripe>
          <el-table-column type="index" :index="indexMethod" label="序号" width="200"></el-table-column>
          <el-table-column prop="name" label="页面信息项"></el-table-column>
          <el-table-column label="操作" width="120px" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" plain size="mini" @click="edit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :page="page" :pageSize="pageSize" @pageChange="pageChange"></pagination>
      </div>
    </card>

    <el-dialog class="edit-dialog"
      :title="title"
      :visible.sync="visible"
      center>
      <div class="timeline-box">
        <el-input
          type="textarea"
          :rows="22"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSubmitFun" :loading="editLoading">确 定</el-button>
        <el-button @click="visible = false" :loading="editLoading">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import card from "@/components/card/index.vue";
import pagination from "@/components/pagination";
import {
  list,
  listDetail,
  editSubmit
} from "@/api/pageInfoManage";

export default {
  name: "pageInfoManage",
  components: {
    card,
    pagination
  },
  data() {
    return {
      loading:false,
      dataList:[],
      total: 0,
      page: 1,
      pageSize: 10,
      title:"",
      visible:false,
      textarea:"",
      editLoading:false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //自动增加序号
    indexMethod(index) {
      let curpage = this.page //单前页码，具体看组件取值
      let limitpage = this.pageSize //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    //获取信息项
    getPageInfoFun(){
      let params = {
        pageNum:this.page,
        pageSize:this.pageSize
      }
      this.loading = true
      list(params).then(res=>{
        const {code,msg,result} = res
        if(code==0){
          this.dataList = result.records
          this.total = Number(result.total)
        }
        this.loading=false
      }).catch(err=>{
        this.loading=false
      })
    },
    pageChange(val){
      this.page = val
      this.getPageInfoFun()
    },
    edit(row){
      let params={
        id:row.id
      }
      listDetail(params).then(res=>{
        const {code,msg,result}=res
        if(code==0){
          this.title = '编辑'+ result.name
          this.textarea = result.content
          this.id= result.id
          this.visible = true
        }
      })
    },
    editSubmitFun(){
      let data = {
        content: this.textarea,
        id: this.id
      }
      this.editLoading=true
      editSubmit(data).then(res=>{
        const {code,msg}=res
        if(code==0){
          this.$modal.msgSuccess({duration: '1000',message: msg})
          this.visible = false
        }else{
          this.$modal.msgError({duration: '1000',message: msg})
        }
        this.editLoading=false
      }).catch(err=>{
        this.editLoading=false
        return Promise.reject(err)
      })
    },
  },
  created() {},
  mounted() {
    this.getPageInfoFun()
  },
};
</script>

<style scoped lang="less">
</style>

<!--案件状态信息（行政区划）-->
<template>
  <el-table
  ref="table"
  :key="queryZeroData"
    slot="content"
    :data="rows"
    stripe
    row-key="administrativeId"
    lazy
    v-loading="loading"
    :load="handleLoad"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column
      v-for="(item,index) in columns"
      :key="item.prop+index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
    <template slot-scope="{row}">
      <span @click="gotoDeptment(row.administrativeId)">{{ row[item.prop] }}</span>
    </template>
  </el-table-column>
  </el-table>
</template>

<script>
import * as statisticsAPI from '@/api/statistics'

export default {
  name: 'caseStatusAdministrativeCount',
  data() {
    return {
      loading: true,
      rows: [],
      // 案件状态信息（行政区划）
      columns: [
        { label: '行政区划', prop: 'administrativeName', width: '500px' },
        { label: '案件总数', prop: 'complaintTotalNum' },
        { label: '受理总数', prop: 'acceptTotalNumber' },
        { label: '待受理', prop: 'unApplyNumber' },
        { label: '待确认', prop: 'unConfirmNumber' },
        { label: '回退中', prop: 'appealingNumber' },
        { label: '调查中', prop: 'surveyNumber' },
        { label: '已中止', prop: 'terminatedNumber' },
        { label: '待办结', prop: 'unCompleteNumber' },
        { label: '已办结', prop: 'completedNumber' },
        { label: '不受理', prop: 'unAcceptedNumber' },
      ],
      queryZeroData:false,
      oldData:[],
      temp2:[]
    }
  },
  computed: {
    tableOptions() {
      return this[this.api]
    }
  },
  watch:{
  },
  created() {
    this.playLoadData().then(result => {
      this.oldData=result
      this.rows = result;
      this.handleData()
    });
    // this.init()
  },
  methods: {
    init(queryZeroData){
      this.queryZeroData=queryZeroData
      if(this.queryZeroData){
        this.rows=this.oldData
        console.log(this.rows,'--------')
      }else{
        this.handleData()
        console.log(this.rows,'33333333--------')
      }
      
    },
    handleData(){
      this.temp2=[]
        // var temp =JSON.parse(JSON.stringify(this.rows))
        this.oldData.forEach(item =>{
            var total =0
            console.log(item,'item')
            this.columns.forEach(item2 => {
              if(item[item2.prop] ==0 && item2.prop != 'administrativeName'){
                total++
              }
            });
            console.log(total,this.columns.length-1,'444')
            if(total != (this.columns.length-1)){
              this.temp2.push(item)//有数据
            } 
            // if(this.queryZeroData){
            //   if(item.children && item.children.length){
            //     this.deepEach2(item.children);
            //   }
            // }
        })
        if(this.queryZeroData){
          this.rows=this.oldData
          this.$refs.table.doLayout();
        }else{
          this.rows=this.temp2
        }
        console.log(this.rows,'handleData')
    },
    gotoDeptment(administrativeId){
      this.$emit('toDeptment',administrativeId)
    },
    playLoadData(administrativeId) {
      return statisticsAPI.caseStatusAdministrativeCount({administrativeDivisionId: administrativeId})
        .then(res => {
          if (res.result) {
            const rows = []
            for (const item of res.result) {
              item.hasChildren = item.hasSubAdministration
              rows.push(item)
            }
            return rows
          }
          return []
        })
        .finally(() => {
          this.loading = false
        })
    },
    deepEach(arr,administrativeId,result) {
        arr.forEach(item => {
          if(item.administrativeId == administrativeId){
                item.children = result
              }
            if (item.children && item.children.length > 0) {
                this.deepEach(item.children,administrativeId,result);
            }
        });
    },
    handleLoad(tree, treeNode, resolve) {
      // TODO
      this.playLoadData(tree.administrativeId)
        .then(result => {
          if (result.length === 0) this.$modal.msgWarning('没有下级数据!')
          
          if(result.length){
            this.rows.forEach(item =>{
              if(item.administrativeId == tree.administrativeId){
                item.children = result
              }
              if(item.children && item.children.length){
                this.deepEach(item.children,tree.administrativeId,result);
              }
            })
            this.oldData = this.rows
            // this.handleData()
            var temp2=[]
            result.forEach(item =>{
              var total =0
              this.columns.forEach(item2 => {
                if(item[item2.prop] ==0 && item2.prop != 'administrativeName'){
                  total++
                }
              });
              if(total != this.columns.length-1){
                temp2.push(item)
              }
            })
            console.log(temp2,'temp2')
            if(this.queryZeroData){
              console.log(result,'result9999')
              resolve(result)//全量数据
            }else{
              resolve(temp2)//有数据的
            }
            
          }
          // resolve(result)
        })
        .catch(() => resolve([]))
    }
  }
}
</script>

<style scoped>

</style>
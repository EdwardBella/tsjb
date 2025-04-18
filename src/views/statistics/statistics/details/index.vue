<template>
  <div style="margin-top: 20px;">
    <card v-if="deptId || (isCompetentAuthorities === 'true' && ['caseStatusDepartmentCount', 'caseTimelinessDepartmentCount', 'caseTypeCount', 'caseSourceCount', 'caseObjectCount','casePeopleTypeCount', 'complaintCount', 'departmentCount'].includes(deptId))">
      <template slot="content">
        <el-button type="primary" @click="back" style="margin-right:10px">返回</el-button>
        <el-cascader
          ref="areaCascader"
          v-model="selectArea"
          :props="{ children: 'childList', label: 'name', value: 'id', expandTrigger: 'hover', emitPath: false, checkStrictly: true }"
          :options="areas"
          :show-all-levels="false"
          @change="$refs.areaCascader && $refs.areaCascader.toggleDropDownVisible(false);"
        />
      </template>
    </card>
    <card>
      <template v-if="!loading" slot="content">
        <!-- 案件状态信息 -->
        <caseStatusAdministrativeCount :ref="currentSelect.id" v-if="currentSelect.id === 'caseStatusAdministrativeCount' && !deptId" @toDeptment="gotoDeptment"></caseStatusAdministrativeCount>
        <!-- 案件时效信息 -->
        <caseTimelinessAdministrativeCount :ref="currentSelect.id" v-if="currentSelect.id === 'caseTimelinessAdministrativeCount' && !deptId" @toDeptment="gotoDeptment"></caseTimelinessAdministrativeCount>
        <!-- 政府欠款统计 -->
        <administrativeCount :ref="currentSelect.id"  v-if="currentSelect.id === 'administrativeCount' && !deptId" :department="selectArea" @toDeptment="gotoDeptment"></administrativeCount>
        <!-- 案件状态信息部门 -->
        <caseStatusDepartmentCount  :ref="deptId" v-if="deptId === 'caseStatusDepartmentCount'" :department="selectArea"></caseStatusDepartmentCount>
        <!-- 案件时效信息部门 -->
        <caseTimelinessDepartmentCount  :ref="deptId" v-if="deptId === 'caseTimelinessDepartmentCount'" :department="selectArea"></caseTimelinessDepartmentCount>
        <!-- 政府欠款统计部门 -->
        <complaintCount  :ref="deptId" v-if="deptId === 'complaintCount'" :department="selectArea"></complaintCount>

        <!-- 案件投诉对象统计 -->
        <departmentCount v-if="currentSelect.id === 'departmentCount'" :department="selectArea"></departmentCount>
        <statisticsChart
          v-if="['caseTypeCount', 'caseSourceCount', 'caseObjectCount','casePeopleTypeCount'].includes(currentSelect.id)"
          :api="currentSelect.id"
          :department="selectArea"
        ></statisticsChart>
      </template>
    </card>
  </div>
</template>

<script>
import * as statisticsAPI from "@/api/statistics";
import { mapMutations, mapState } from 'vuex'
import card from '@/components/card'
import caseStatusAdministrativeCount from '@/views/statistics/statistics/details/components/caseStatusAdministrativeCount'
import caseStatusDepartmentCount from '@/views/statistics/statistics/details/components/caseStatusDepartmentCount'
import caseTimelinessAdministrativeCount from '@/views/statistics/statistics/details/components/caseTimelinessAdministrativeCount'
import caseTimelinessDepartmentCount from '@/views/statistics/statistics/details/components/caseTimelinessDepartmentCount'
import administrativeCount from '@/views/statistics/statistics/details/components/administrativeCount'
import statisticsChart from '@/views/statistics/statistics/details/components/chart'
import complaintCount from '@/views/statistics/statistics/details/components/complaintCount'
import departmentCount from '@/views/statistics/statistics/details/components/departmentCount'
import * as administrativeDivisionAPI from '@/api/administrativeDivision'

export default {
  name: 'index',
  components: { card, caseStatusAdministrativeCount, statisticsChart, caseStatusDepartmentCount, caseTimelinessAdministrativeCount, caseTimelinessDepartmentCount, administrativeCount, complaintCount, departmentCount },
  data() {
    return {
      loading: true,
      selectArea: undefined,
      areas: [],
      deptId:''
    }
  },
  props: {
    queryZeroData: { type: Boolean, default: undefined },
    currentSelect: { type: Object, default: undefined },
    isCompetentAuthorities: { type: String, default: undefined }
  },
  computed: {
    ...mapState(['statistics']),
    routeQuery() {
      return this.$route.query
    },
    hasDropDownSelector() {
      return this.routeQuery.hasDropDownSelector === 'true'
    },
    isShowCard() {
      return this.isCompetentAuthorities === 'true' && ['caseStatusDepartmentCount', 'caseTimelinessDepartmentCount', 'caseTypeCount', 'caseSourceCount', 'caseObjectCount','casePeopleTypeCount', 'complaintCount', 'departmentCount'].includes(this.routeQuery.api)
    }
  },
  watch: {
    selectArea(val) {
      this.$store.commit('setStatistics', {selectArea: val})
      this.playLoadData()
    },
    isShowCard: {
      handler(val) {
        !val && this.$store.commit('setStatistics', {selectArea: ''})
      },
      immediate: true
    },
    isCompetentAuthorities:{
      handler(val) {
        if(val){
          administrativeDivisionAPI.myDepart()
            .then(res => {
              if (res.result) {
                const { administrativeDivision, childList } = res.result
                this.selectArea = Number(administrativeDivision.id)
                this.areas = this.cleanTheAdministrativeDivisionData(res.result)
                console.log(this.areas,'this.areas')
              }
            })
          .finally(() => {
            this.loading = false
          })
        }
      },
      immediate: true
    },
    queryZeroData: {
      handler(val) {
        this.$nextTick(function(){
          this.$refs[this.currentSelect.id] && this.$refs[this.currentSelect.id].init(this.queryZeroData)
        })
        
      },
      immediate: true
    },
  },
  mounted(){
   console.log(this.currentSelect,'currentSelect')
    // console.log(this.isCompetentAuthorities === 'true','this.isCompetentAuthorities222')
    this.isCompetentAuthorities === 'true' ? administrativeDivisionAPI.myDepart()
      .then(res => {
        if (res.result) {
          const { administrativeDivision, childList } = res.result
          this.selectArea = Number(administrativeDivision.id)
          this.areas = this.cleanTheAdministrativeDivisionData(res.result)
          console.log(this.areas,'this.areas')
        }
      })
    .finally(() => {
      this.loading = false
    }) : this.loading = false
  },
  created() {
    
  },
  methods: {
    back(){
      this.deptId=''
      this.$emit('showOrHideSelect',true)
    },
    gotoDeptment(administrativeId){
        console.log(administrativeId,'deptId8888')
        this.selectArea = Number(administrativeId)
        this.deptId=this.currentSelect.deptId
        this.$emit('showOrHideSelect',false)
    },
    cleanTheAdministrativeDivisionData(rawData) {
      const clean = (rawData) => {
        const data = []
        for (const item of rawData) {
          let newItem
          if (item.administrativeDivision) {
            newItem = {...item.administrativeDivision}
          } else {
            newItem = {...item}
          }

          if (item.childList && item.childList.length) {
            newItem.childList = clean(item.childList)
          }
          data.push(newItem)
        }

        return data

      }
      return clean([rawData])
    },
    playLoadData() {
      // TODO
    }
  }

}
</script>

<style scoped>

</style>
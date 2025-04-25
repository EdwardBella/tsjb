<template>
	<div class="dbContent">
		<!-- <el-scrollbar wrap-style="overflow-x:hidden;" style="height:calc(100vh - 40px);"> -->
		<div>
			<div class="search-content" :style="{height:heightSize}">
				<el-form :model="queryParams" :inline="true" label-position="left" ref="queryForm" label-width="110px">
					<el-form-item label="案件编号:" prop="workOrderNumber">
						<el-input v-model="queryParams.workOrderNumber" placeholder="请输入案件编号" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>
					<el-form-item label="案件名称:" prop="title">
						<el-input v-model="queryParams.title" placeholder="请输入案件名称关键字" @keyup.enter.native="handleQuery"
							style="width: 260px;"></el-input>
					</el-form-item>
					<el-form-item label="案件状态:" prop="allStatus">
						<el-cascader v-model="queryParams.allStatus" ref="allStatus" :options="statusArr" collapse-tags
							clearable :props="{ multiple: true,emitPath: false,}" placeholder="默认查全部"
							style="width: 260px;" @change="statusChanged"></el-cascader>
					</el-form-item>
					<el-form-item label="创建时间:" prop="time">
						<el-date-picker v-model="queryParams.time" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
							style="width: 260px;" @change="handleQuery">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="受理时间:" prop="time2">
						<el-date-picker v-model="queryParams.time2" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
							style="width: 260px;" @change="handleQuery">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="结案时间:" prop="time3">
						<el-date-picker v-model="queryParams.time3" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
							style="width: 260px;" @change="handleQuery">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="企业名称:" prop="companyName">
						<el-input v-model="queryParams.companyName" placeholder="请输入企业名称" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>

					<el-form-item label="联系人:" prop="createUsername">
						<el-input v-model="queryParams.createUsername" placeholder="请输入投诉人" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>
					<el-form-item label="手机号码:" prop="mobile">
						<el-input v-model="queryParams.mobile" placeholder="请输入联系电话" style="width: 260px;"
							@keyup.enter.native="handleQuery"></el-input>
					</el-form-item>
					<el-form-item label="案件来源:" prop="itemSource">
						<el-select v-model="queryParams.itemSource" clearable multiple collapse-tags
							placeholder="默认查询全部" style="width: 260px;" @change="statusChanged">
							<el-option v-for="item in eventSourceArr" :key="item.code" :label="item.name"
								:value="item.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="事发地:" prop="addressId">
						<el-cascader v-model="queryParams.addressId" :show-all-levels="false" ref="addressId"
							style="width: 260px;" :options="areas"
							:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
							clearable @change="addressIdChanged"></el-cascader>
					</el-form-item>
					<el-form-item label="投诉对象:">
						<el-cascader v-model="complainAddressId" :show-all-levels="false" ref="complainAddressId"
							style="width: 130px;" :options="areas"
							:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
							clearable @change="complainAddressIdChanged"></el-cascader>
						<el-select v-model="queryParams.addressDepartmentCode" clearable placeholder="请选择"
							style="width: 130px;" @change="handleQuery">
							<el-option v-for="item in processDepartmentArr" :key="item.code" :label="item.name"
								:value="item.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="系统领域:" prop="systemDomain">
						<el-select v-model="queryParams.systemDomain" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option v-for="item in systemArear" :key="item.id" :label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="部门归口:" prop="belongType">
						<el-select v-model="queryParams.belongType" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option v-for="item in belongTypeArr" :key="item.code" :label="item.name"
								:value="item.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="反映事项:" prop="itemDetailId">
						<el-select v-model="queryParams.itemDetailId" clearable placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option-group v-for="group in fysxList" :key="group.value" :label="group.label">
								<el-option v-for="item in group.children" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
					<!-- <el-form-item label="案件划分:" prop="satisfactionLevel">
						<el-select v-model="queryParams.satisfactionLevel" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="满意" value="satisfaction"></el-option>
							<el-option label="基本满意" value="common"></el-option>
							<el-option label="不满意" value="noSatisfaction"></el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item label="承办类型:" prop="processType">
						<el-select v-model="queryParams.processType" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="直办案件" value="0"></el-option>
							<el-option label="转办案件" value="1"></el-option>
							<el-option label="交办案件" value="2"></el-option>
							<el-option label="指定办理案件" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="承办单位:">
						<el-cascader v-model="complainAddressId2" :show-all-levels="false" ref="complainAddressId2"
							style="width: 130px;" :options="areas"
							:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
							clearable @change="complainAddressIdChanged2"></el-cascader>
						<el-select v-model="queryParams.processDepartmentCode" clearable placeholder="请选择"
							style="width: 130px;" @change="handleQuery">
							<el-option v-for="item in processDepartmentArr2" :key="item.code" :label="item.name"
								:value="item.code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="办理延期:" prop="extensionTimes">
						<el-select v-model="queryParams.extensionTimes" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="未延期" value="0"></el-option>
							<el-option label="1次延期" value="1"></el-option>
							<el-option label="2次延期" value="2"></el-option>
							<el-option label="3次延期" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结案反馈:" prop="satisfactionLevel">
						<el-select v-model="queryParams.satisfactionLevel" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="满意" value="satisfaction"></el-option>
							<el-option label="基本满意" value="common"></el-option>
							<el-option label="不满意" value="noSatisfaction"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结案回访:" prop="evaluate">
						<el-select v-model="queryParams.evaluate" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="满意" value="satisfaction"></el-option>
							<el-option label="基本满意" value="common"></el-option>
							<el-option label="不满意" value="noSatisfaction"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="满意度:" prop="allSatisfiedScore">
						<el-select ref="allSatisfiedScore" v-model="queryParams.allSatisfiedScore" multiple
							collapse-tags clearable placeholder="默认查询全部" style="width: 260px;" @change="statusChanged">
							<el-option label="5星" value="5"></el-option>
							<el-option label="4星" value="4"></el-option>
							<el-option label="3星" value="3"></el-option>
							<el-option label="2星" value="2"></el-option>
							<el-option label="1星" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="跟踪状态:" prop="historyTrack">
						<el-select v-model="queryParams.historyTrack" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="跟踪" value="1"></el-option>
							<el-option label="解除跟踪" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="异常状态:" prop="exceptionTag">
						<el-select v-model="queryParams.exceptionTag" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="异常" value="1"></el-option>
							<el-option label="解除异常" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="办理时限:" prop="timeForProcess">
						<el-select v-model="queryParams.timeForProcess" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option label="全部" value=""></el-option>
							<el-option label="正常" value="0"></el-option>
							<el-option label="临期状态" value="1"></el-option>
							<el-option label="超期状态" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="案件类型:" prop="workOrderType">
						<el-select v-model="queryParams.workOrderType" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option v-for="item in caseTypeArr" :key="item.label" :label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="办结状态:" prop="finishStatus">
						<el-select v-model="queryParams.finishStatus" placeholder="请选择" style="width: 260px;"
							@change="handleQuery">
							<el-option v-for="item in finishStatusArr" :key="item.id" :label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="" label-width="10px">
						<el-checkbox false-label="" true-label="0" v-model="queryParams.thisDepartmentProcess"
							label="本部门承办" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.rejectReview"
							label="不受理复核" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.appeal"
							label="承办复核" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.back"
							label="退回重办" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.transferToOther"
							label="转其他部门重办" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.superviseStatus"
							label="督办案件" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.isArrear"
							label="拖欠账款" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.overdueForProcess"
							label="承办超期" @change="handleQuery"></el-checkbox>
						<el-checkbox false-label="" true-label="0" v-model="queryParams.overdueForFinish"
							label="结案超期" @change="handleQuery"></el-checkbox>
					</el-form-item>

				</el-form>
			</div>
			<div class="buttons-cn">
				<div style="display: flex; flex: 1;justify-content: flex-end;">
					<el-button v-if="heightSize =='auto'" icon="el-icon-arrow-up" plain style="height: 40px;"
						@click="closeDown">收起</el-button>
					<el-button v-else icon="el-icon-arrow-down" plain style="height: 40px;"
						@click="openUp">展开</el-button>
					<el-button icon="el-icon-search" plain style="height: 40px;margin-left: 10px;"
						@click="getList">查询</el-button>
					<el-button icon="el-icon-refresh" plain style="height: 40px;margin-left: 10px;"
						@click="resetQuery">重置</el-button>
				</div>
			</div>
			<div class="table-cn">
				<el-table v-loading="tableData.loading" element-loading-text="拼命加载中" border stripe style="width: 100%"
					:data="tableData.data" :header-row-style="{'height':'60px',}">
					<el-table-column label="案件编号" prop="workOrderNumber" width="220px" show-overflow-tooltip
						header-align="left" align="left" />
					<el-table-column label="案件名称" show-overflow-tooltip prop="title" min-width="500px"
						header-align="left" align="left">
						<template slot-scope="scope">
							<span v-if="scope.row.supervisionTag == '1' || scope.row.supervisionTag == '3'" class="chong"
								style="background-color: #e2a900;">跟踪</span>
							<span v-if="scope.row.exceptionTag == '1' || scope.row.exceptionTag == '3'" class="chong">异常</span>
							<span v-if="scope.row.repeatCheck == 'Y'" class="chong">复</span>
							<span v-if="scope.row.isDuplicated == 'Y'" class="chong"
								style="background-color: #f55b23;">重</span>
							<span v-if="scope.row.correctionStatus == '1'" class="bu">补</span>
							<span v-if="scope.row.superviseStatus == '1'" class="du">督</span>
							<span v-if="scope.row.auditFlag == 'Y'" class="shen">审</span>
							<span v-if="scope.row.appraiseFlag == 'Y'" class="du"
								style="background-color: #8a72ff;">评</span>
							<i v-if="scope.row.wordsFlag === 'Y'" class="img icon-liu"></i>
							<!-- <img style="width: 20px;" v-if="scope.row.expireFlag === 'Y' && scope.row.status !== 10"
								src="../../assets/images/icon-light-red.png" alt=""> -->
							<img style="width: 20px;"
								v-if="filterTimer((scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline,scope.row.status,2) != ''"
								:src="filterTimer((scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline,scope.row.status,2)"
								alt="" />
							<span
								:style="{color:filterTimer((scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline,scope.row.status,1)}">{{scope.row.title}}</span>
						</template>

					</el-table-column>
					<el-table-column label="反映事项" prop="itemDetailName" width="220px" show-overflow-tooltip
						header-align="left">
					</el-table-column>
					<el-table-column label="状态" prop="sex" width="120px" show-overflow-tooltip header-align="left"
						align="left">
						<template slot-scope="scope">
							<span>{{returnStatus(scope.row.status,scope.row.subStatus)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="阶段时限" prop="age" width="130px" header-align="left" align="left">
						<template slot-scope="scope">
							<span
								v-if="timeDifference('',(scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline)"
								:style="{color:filterTimer((scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline,scope.row.status,1)}">{{timeDifference('',(scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline).days +'天'+timeDifference('',(scope.row.status=='4' || scope.row.status=='15')?scope.row.finishStepDeadline :scope.row.currentStepDeadline).hours+'小时'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="企业名称" prop="companyName" min-width="240px" show-overflow-tooltip
						header-align="left" align="left" />
					<el-table-column label="联系人" prop="createUsername" width="120px" show-overflow-tooltip
						header-align="left" align="left" />
					<el-table-column label="手机号码" prop="mobile" width="120px" header-align="left" align="left" />
					<el-table-column label="承办单位" prop="processDepartment" show-overflow-tooltip min-width="240px"
						header-align="left" align="left" />
					<el-table-column label="创建时间" prop="createTime" width="170px" header-align="left" align="left" />
					<el-table-column label="受理时间" prop="filingTime" width="170px" header-align="left" align="left" />
					<el-table-column label="结案时间" prop="finishTime" width="170px" header-align="left" align="left" />
					<el-table-column label="结案回访" prop="evaluateResult" width="120px" show-overflow-tooltip
						header-align="left" align="left">
						<template slot-scope="scope">
							<span>{{scope.row.evaluateResult == 'common'?'基本满意':scope.row.evaluateResult == 'satisfaction'?'满意':scope.row.evaluateResult == 'noSatisfaction'?'不满意':''}}</span>
						</template>
					</el-table-column>
					<el-table-column label="满意度" prop="satisfiedScore" width="80px" header-align="left" align="left">
						<template slot-scope="scope">
							<span>{{scope.row.satisfiedScore != ''?(scope.row.satisfiedScore + '星'):''}}</span>
						</template>
					</el-table-column>
					<el-table-column label="案件来源" prop="itemSource" width="120px" header-align="left" align="left">
						<template slot-scope="scope">
							<span>{{itemResourceTrans[scope.row.itemSource]}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="100" fixed="right">
						<template slot-scope="scope">
							<el-button plain @click.stop="openDetails(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-cn" style="border: none;">
					<pagination :total="tableData.total" :page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize" @pagination="getList" />
				</div>
			</div>
		</div>
		<!-- </el-scrollbar> -->
		<!-- 抽屉 -->
		<el-drawer title="我是标题" size="85%" :visible.sync="drawer" :with-header="false" destroy-on-close>
			<caseDetails @closeDrawer="closeDetail" :workOrderId="workOrderId" :workOrderNo="workOrderNo"
				basicType='all' @success="getList" />
		</el-drawer>

	</div>
</template>

<script>
	import caseDetails from "../workOrder/components/caseDetails";
	import * as portalsApi from "@/api/portals";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as dictApi from "@/api/dict";
	import {
		allList
	} from "@/api/vocation";
	import {
		workOrderEventSourceDict,
		workOrderEventSourceDict2,
		allStatusDict,
		caseType
	} from "@/utils/dict";
	import {
		dict2Array,
		returnStatus,
		filterTimer,
		timeDifference,
		removeEmptyWithTree
	} from '@/utils/common'
	export default {
		name: "all",
		components: {
			caseDetails,
		},
		data() {
			return {
				search: "",
				tableData: {
					data: [],
					loading: false,
					total: 0
				},
				caseTypeArr: caseType,
				finishStatusArr: [],
				belongTypeArr: [],
				systemArear: [],
				complainAddressId: "",
				complainAddressId2: "",
				queryParams: {
					workOrderNumber: "",
					title: "",
					time: [],
					time2: [],
					time3: [],
					allStatus: [],
					companyName: '',
					createUsername: "",
					mobile: "",
					itemSource: [],
					addressId: "",
					addressDepartmentCode: '',
					systemDomain: "",
					belongType: "",
					itemDetailId: "",
					processType: "",
					processDepartmentCode: "",
					extensionTimes: "",
					satisfactionLevel: "",
					evaluate: "",
					allSatisfiedScore: [],
					historyTrack: "",
					exceptionTag: "",
					timeForProcess: "",
					workOrderType: "",
					finishStatus: "",
					thisDepartmentProcess: "",
					rejectReview: "",
					appeal: "",
					back: "",
					transferToOther: "",
					superviseStatus: "",
					isArrear: "",
					overdueForProcess: "",
					overdueForFinish: "",
					pageNum: 1,
					pageSize: 10,
				},
				fysxList: [], //反映事项
				itemResourceTrans: workOrderEventSourceDict,
				eventSourceArr: workOrderEventSourceDict2, //案件来源
				statusArr: allStatusDict, //案件状态
				processDepartmentArr: [],
				processDepartmentArr2: [],
				areas: [],
				deptArr: [],
				heightSize: '66px',
				drawer: false,
				workOrderId: "",
				workOrderNo: "",
			};
		},
		created() {
			this.getBasicData()
			this.getList()
		},
		methods: {
			returnStatus,
			timeDifference,
			filterTimer,
			getList() {
				let params = {
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
				}

				let keys = ['workOrderNumber', 'title', 'companyName', 'createUsername', 'mobile', 'itemSource',
					'addressId',
					'addressDepartmentCode', 'systemDomain',
					'belongType', 'itemDetailId', 'processType', 'processDepartmentCode', 'extensionTimes',
					'satisfactionLevel', 'evaluate', 'allSatisfiedScore',
					'historyTrack', 'exceptionTag', 'timeForProcess', 'workOrderType', 'finishStatus',
					'thisDepartmentProcess', 'rejectReview',
					'appeal', 'back', 'transferToOther', 'superviseStatus', 'isArrear', 'overdueForProcess',
					'overdueForFinish'
				]

				for (let i = 0; i < keys.length; i++) {
					if ((keys[i] == 'itemSource' && this.queryParams.itemSource.length > 0) || (keys[i] ==
							'allSatisfiedScore' && this.queryParams.allSatisfiedScore.length > 0)) {
						params[keys[i]] = this.queryParams[keys[i]].join(',')
					} else {
						if (this.queryParams[keys[i]] != '') {
							params[keys[i]] = this.queryParams[keys[i]]
						}
					}

				}
				if (this.queryParams.time && this.queryParams.time.length != 0) {
					params.createTimeStart = this.queryParams.time[0]
					params.createTimeEnd = this.queryParams.time[1]
				}
				if (this.queryParams.time2 && this.queryParams.time2.length != 0) {
					params.filingTime = this.queryParams.time2[0]
					params.filingTimeEnd = this.queryParams.time2[1]
				}
				if (this.queryParams.time3 && this.queryParams.time3.length != 0) {
					params.finishTime = this.queryParams.time3[0]
					params.finishTimeEnd = this.queryParams.time3[1]
				}
				if (this.queryParams.allStatus.length > 0) {
					params.allStatus = this.queryParams.allStatus.join('-')
				}

				this.tableData.loading = true
				workOrderApi.distribute.allList(params).then(res => {
					const result = res.result;
					this.tableData.data = result.records;
					this.tableData.total = Number(result.total);
				}).finally(() => this.tableData.loading = false);
			},
			resetQuery() {
				this.complainAddressId = ""
				this.complainAddressId2 = ""
				this.processDepartmentArr = []
				this.processDepartmentArr2 = []
				this.queryParams.workOrderNumber = ''
				this.queryParams.title = ''
				this.queryParams.time = []
				this.queryParams.time2 = []
				this.queryParams.time3 = []
				this.queryParams.allStatus = []
				this.queryParams.companyName = ''
				this.queryParams.createUsername = ''
				this.queryParams.mobile = ''
				this.queryParams.itemSource = []
				this.queryParams.addressId = ''
				this.queryParams.addressDepartmentCode = ''
				this.queryParams.systemDomain = ''
				this.queryParams.belongType = ''
				this.queryParams.itemDetailId = ''
				this.queryParams.processType = ''
				this.queryParams.processDepartmentCode = ''
				this.queryParams.extensionTimes = ''
				this.queryParams.satisfactionLevel = ''
				this.queryParams.evaluate = ''
				this.queryParams.allSatisfiedScore = []
				this.queryParams.historyTrack = ''
				this.queryParams.exceptionTag = ''
				this.queryParams.timeForProcess = ''
				this.queryParams.workOrderType = ''
				this.queryParams.finishStatus = ''
				this.queryParams.thisDepartmentProcess = ''
				this.queryParams.rejectReview = ''
				this.queryParams.appeal = ''
				this.queryParams.back = ''
				this.queryParams.transferToOther = ''
				this.queryParams.superviseStatus = ''
				this.queryParams.isArrear = ''
				this.queryParams.overdueForProcess = ''
				this.queryParams.overdueForFinish = ''
				this.queryParams.pageNum = 1
				this.getList()
			},
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			/* 字典数据 */
			getBasicData() {
				portalsApi.itemdetail.tree()
					.then(res => {
						let arrys = this.coverItemdetailDataTopickData(res.result.categoryList);
						this.fysxList = arrys

					});
				portalsApi.workOrder.area()
					.then(res => {
						this.areas = [res.result]
					})
				allList()
					.then(res => {
						console.log(res, '=================')
					})
				dictApi.list({
						parentCode: "1009"
					})
					.then(res => {
						let lists = res.result.map((item)=>{
							item.id = item.name
							return item
						})
						lists.unshift({
							id: '',
							name: '全部'
						})
						this.finishStatusArr = lists
					});
				dictApi.belongType()
					.then(res => {
						let lists = res.result.map((item)=>{
							item.code = item.name
							return item
						})
						lists.unshift({
							code: '',
							name: '全部'
						})
						this.belongTypeArr = lists
					});
				dictApi.list({
						parentCode: '1011'
					})
					.then(res => {
						let lists = res.result.map((item)=>{
							item.id = item.name
							return item
						})
						console.log(lists,'))))))))))))+++++++')
						lists.unshift({
							id: '',
							name: '全部'
						})
						
						this.systemArear = lists
					})
			},
			coverItemdetailDataTopickData(data) {
				return data.map((item) => {
					item.children = item.itemDetailList.map(a => {
						a.label = a.name;
						a.value = a.id;
						return a;
					});
					item.label = item.name;
					item.value = item.id;
					return item;
				});
			},
			closeDown() {
				this.heightSize = '66px'
			},
			openUp() {
				this.heightSize = 'auto'
			},
			openDetails(row) {
				this.workOrderNo = row.workOrderNo
				this.workOrderId = row.id
				this.drawer = true
			},
			statusChanged(value) {
				if (value.length == 0) {
					this.$refs.allStatus.dropDownVisible = false
					this.handleQuery()
				}
			},
			complainAddressIdChanged(value) {
				this.$refs.complainAddressId.dropDownVisible = false
				if (value == null) {
					this.processDepartmentArr = []
					this.queryParams.addressDepartmentCode = ''
				} else {
					this.processDepartmentArr = []
					this.queryParams.addressDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.processDepartmentArr = removeEmptyWithTree(r.result)
							})
					})
				}
			},
			complainAddressIdChanged2(value) {
				this.$refs.complainAddressId2.dropDownVisible = false
				if (value == null) {
					this.processDepartmentArr2 = []
					this.queryParams.processDepartmentCode = ''
				} else {
					this.processDepartmentArr2 = []
					this.queryParams.processDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.processDepartmentArr2 = removeEmptyWithTree(r.result)
							})
					})
				}
			},
			addressIdChanged() {
				this.$refs.addressId.dropDownVisible = false
				this.handleQuery()
			},
			closeDetail(res) {
				this.drawer = false
			},

		}
	};
</script>

<style scoped lang="less">
	::v-deep .el-table .cell {
		font-size: 16px !important;
	}

	.chong,
	.bu,
	.du,
	.shen {
		display: inline-block;
		background-color: #f55b23;
		padding: 0px 6px;
		font-size: 12px;
		color: #fff;
		border-radius: 2px;
		margin-right: 8px;
	}

	.du,
	.shen {
		background-color: rgb(19, 138, 67);
	}

	.icon-liu,
	.icon-ping {
		content: "";
		margin-right: 0;
		background-size: 28px;
		display: inline-block;
		width: 28px;
		height: 28px;
		background-position-y: 2px;
	}

	.icon-ping {
		background-image: url("../../assets/images/common/icon-ping.png");
	}

	.icon-liu {
		background-image: url("../../assets/images/common/icon-liu.png");
	}

	.dbContent {
		background: #f5f5f5;

		/* 搜索框样式*/
		.search-content {
			padding: 0px 20px;
			background-color: #fff;
			box-shadow: 0 2px 11px 0 hsla(0, 0%, 63.1%, .2);
			overflow: hidden;
			
			::v-deep .el-icon-circle-close {
				font-size: 22px;
				color: #606266;
			}

			.el-form {
				margin: 6px 0px;
			}


			::v-deep .el-input__inner {
				height: 42px !important;
				line-height: 42px;
				font-size: 16px;
			}

			.el-form-item__label {
				font-size: 18px;
				line-height: 42px;
				font-weight: normal;
			}

			.el-form--inline .el-form-item {
				margin-top: 6px !important;
				margin-bottom: 6px !important;
			}
		}

		.buttons-cn {
			display: flex;
			align-items: center;
			padding: 12px 0px;

			.is-plain {
				border-color: #1b5284;
			}
		}

		.table-cn {
			background: #fff;
			padding: 10px;
			box-shadow: 0 2px 11px 0 hsla(0, 0%, 63.1%, .2);

			::v-deep .el-table .cell .is-plain {
				border-color: #1b5284;
				color: #1b5284;
				background-color: #fff;
				box-shadow: 0 2px 4px 0 rgba(9, 78, 197, .3);
				height: 24px !important;
				padding: 0 15px;
			}
		}



		.el-radio-button__inner {
			background: #2b65da;
			border-color: #2b65da;
			color: #bfc0ea;
			font-size: 18px;
			width: 110px;
			padding: 12px 0px;
		}

		.el-radio-button:hover .el-radio-button__inner,
		.el-radio-button__orig-radio:checked+.el-radio-button__inner {
			background-color: #194aaa;
			border-color: #194aaa;
			color: #fff;
		}
	}
</style>
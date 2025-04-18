<template>
	<div>
		<el-form-item v-if="hideProcessingDepartment === false" label="案件类型" prop="itemDetailId">
			<el-select v-model="searchForm.itemDetailId" placeholder="请选择">
				<el-option-group v-for="group in itemdetailTree" :key="group.label" :label="group.label">
					<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-option-group>
			</el-select>
		</el-form-item>

		<el-form-item label="案件来源" prop="itemSource">
			<el-select v-model="searchForm.itemSource" placeholder="请选择">
				<el-option v-for="item in eventSourceArr" :key="item.id" :label="item.name"
					:value="item.id"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="状态" prop="status">
			<el-select v-model="searchForm.status" placeholder="请选择">
				<el-option v-for="item in statusArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="提交时间" prop="dateRange">
			<el-date-picker type="daterange" v-model="searchForm.dateRange" range-separator="至"
				value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
		</el-form-item>

		<el-form-item v-if="hideProcessingDepartment === false" label="承办单位" prop="processDepartmentCode">
			<el-cascader ref="cascader" v-model="searchForm.processDepartmentCode"
				:props="{ label: 'name', value: 'code', expandTrigger: 'hover', emitPath: false, checkStrictly: true }"
				:options="departmentTree" :show-all-levels="false" @change="handleCascaderChange">
			</el-cascader>
		</el-form-item>

		<el-form-item label="标题" prop="title">
			<el-input v-model="searchForm.title" placeholder="请输入标题关键字"></el-input>
		</el-form-item>

		<el-form-item label="是否公开" prop="publicStatus">
			<el-select v-model="searchForm.publicStatus" placeholder="请选择">
				<el-option v-for="item in publicStatusArr" :key="item.id" :label="item.name"
					:value="item.id"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="是否过期" prop="expireFlag">
			<el-select v-model="searchForm.expireFlag" placeholder="请选择">
				<el-option v-for="item in expireFlagArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="评价状态" prop="appraiseStatus">
			<el-select v-model="searchForm.appraiseStatus" placeholder="请选择">
				<el-option v-for="item in appraiseStatusArr" :key="item.id" :label="item.name"
					:value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<!--    <el-form-item v-if="showVocations" label="行业领域" prop="industrySectorName">-->
		<!--      <el-select v-model="searchForm.industrySectorName" style="width: 100%">-->
		<!--        <el-option label="全部" value=""></el-option>-->
		<!--        <template v-for="item in vocations">-->
		<!--          <el-option v-if="item" :key="item.industrySectorName" :label="item.industrySectorName" :value="item.industrySectorName"></el-option>-->
		<!--        </template>-->
		<!--      </el-select>-->
		<!--    </el-form-item>-->
		<el-form-item v-if="showMyFollow" label="" prop="isFocusOnDepartment">
			<el-checkbox style="margin-left: 110px" v-model="searchForm.isFocusOnDepartment" :true-label="1"
				:false-label="0">显示我关注的</el-checkbox>
		</el-form-item>

	</div>
</template>

<script>
	import {
		workOrderAppraiseStatusDict,
		workOrderEventSourceDict,
		workOrderExpireFlagDict,
		workOrderPublicIntentionDict,
		workOrderPublicStatusDict,
		workOrderStatusDict
	} from "@/utils/dict";
	import moment from "moment";
	import {
		department2Tree,
		dict2Array,
		itemdetail2GroupOptions,
		itemdetail2Tree
	} from '@/utils/common'
	import * as validators from "@/utils/validators";
	import * as mattersApi from "@/api/matters";
	import * as workOrderApi from "@/api/workOrder/index";
	import * as departmentApi from "@/api/department";
	import {
		departmentTree
	} from "@/api/workOrder/all";
	import * as vocationAPI from "@/api/vocation";

	export default {
		name: "searchFormItemsCommon",
		props: {
			form: {
				type: Object,
				required: true
			},
			rules: {
				type: Object,
				required: true
			},
			hideProcessingDepartment: {
				type: Boolean,
				default: false
			},
			showVocations: {
				type: Boolean,
				default: false
			},
			showMyFollow: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ''
			},
			statusArr: {
				type: Array,
				default: () => dict2Array(workOrderStatusDict, 1)
			}
		},
		data() {
			return {
				searchForm: {},
				itemdetailTree: [],
				departmentTree: [],
				vocations: [],
				expireFlagArr: dict2Array(workOrderExpireFlagDict, 1),
				appraiseStatusArr: dict2Array(workOrderAppraiseStatusDict, 1),
				eventSourceArr: dict2Array(workOrderEventSourceDict, 1),
				publicStatusArr: dict2Array(workOrderPublicStatusDict, 1),
			}
		},
		watch: {
			searchForm: {
				handler(val) {
					this.$emit("update:form", val);
				},
				immediate: true,
				deep: true
			},
		},
		created() {
			this.searchForm = {
				...this.form
			}
			this.getItemdetailTree();
			this.hideProcessingDepartment === false && this.getDepartmentTree();
			// if (this.type === 'process') {
			//   this.statusArr = [
			//     {id: 1, name: "回退中"},
			//     {id: 2, name: "调查中"},
			//     {id: 3, name: "处理中"},
			//     {id: 4, name: "已处理"},
			//     {id: 5, name: "已办结"},
			//     {id: 7, name: "已中止"},
			//   ]
			// } else {
			//   this.statusArr = dict2Array(workOrderStatusDict, 1)
			// }

			// this.showVocations && vocationAPI.allList().then(r => {
			//   this.vocations = r.result
			// })
		},
		methods: {
			getItemdetailTree() {
				mattersApi.itemdetailTree().then(res => {
					this.itemdetailTree = itemdetail2GroupOptions(res.result);

				});
			},
			getDepartmentTree() {
				workOrderApi.all.departmentTree().then(res => {
					this.departmentTree = department2Tree(res.result);
				});
			},
			handleCascaderChange() {
				this.$refs.cascader.toggleDropDownVisible(false);
			},
		}
	};
</script>

<style scoped>

</style>
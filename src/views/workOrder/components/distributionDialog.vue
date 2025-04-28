<template>
	<el-dialog append-to-body v-dialogDrags title="案件派发" width="750px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="150px">
			<el-form-item label="承办类型:" prop="type">
				<el-radio-group v-model="form.type" @change="typeChanged">
					<el-radio :label="0">直办</el-radio>
					<el-radio :label="1">转办</el-radio>
					<el-radio :label="2">交办</el-radio>
					<el-radio :label="3">指定办理</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="form.type == 0" label="直办备注:" prop="comment">
				<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入修改内容" type="textarea"
					style="width: 100%; height: 100px"></el-input>
			</el-form-item>

			<el-form-item v-if="form.type == 1" label="转办部门:" prop="processDepartmentCode">
				<el-select v-model="form.processDepartmentCode" style="width: 100%;" placeholder="请选择部门" clearable>
					<el-option v-for="item in departmentTree3" :key="item.code" :label="item.label" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item v-if="form.type == 1" label="转办备注:" prop="comment">
				<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入修改内容" type="textarea"
					style="width: 100%; height: 100px"></el-input>
			</el-form-item>

			<el-form-item v-if="form.type == 2" label="交办部门:" prop="processDepartmentCode">
				<div style="display: flex;align-items: center;">
					<el-cascader v-model="complainAddressId2" :show-all-levels="false" ref="complainAddressId2"
						style="flex: 1;" :options="areas2"
						:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
						clearable @change="complainAddressIdChanged2"></el-cascader>

					<el-select v-model="form.processDepartmentCode" ref="processDepartmentCode" style="flex: 1;"
						placeholder="请选择部门" clearable filterable>
						<el-option v-for="item in departmentTree2" :key="item.code" :label="item.label"
							:value="item.code">
						</el-option>
					</el-select>
				</div>
			</el-form-item>
			<el-form-item v-if="form.type == 3" label="指定办理部门:" prop="processDepartmentCode">
				<div style="display: flex;align-items: center;">
					<el-cascader v-model="complainAddressId3" :show-all-levels="false" ref="complainAddressId3"
						style="flex: 1;" :options="areas"
						:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
						clearable @change="complainAddressIdChanged3"></el-cascader>

					<el-select v-model="form.processDepartmentCode" ref="processDepartmentCode" style="flex: 1;"
						placeholder="请选择部门" clearable filterable>
						<el-option v-for="item in departmentTree4" :key="item.code" :label="item.label"
							:value="item.code">
						</el-option>
					</el-select>
				</div>
			</el-form-item>
			<el-form-item v-if="form.type == 2 || form.type == 3"
				:label="form.type == 2?'交办备注:':form.type == 3?'指定办理备注:':''" prop="comment">
				<el-input v-model="form.comment" show-word-limit maxlength="300" placeholder="请输入修改内容" type="textarea"
					style="width: 100%; height: 100px"></el-input>
			</el-form-item>

			<!-- <el-form-item label="系统领域：" prop="systemDomain">
				<el-select v-model="form.systemDomain" style="width: 100%;" placeholder="请选择系统领域" clearable>
					<el-option v-for="item in systemArear" :key="item.id" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
			</el-form-item> -->
			<el-form-item key="1" v-if="form.type == 1" label="案件抄送:" prop="departmentDtoList">
				<el-checkbox v-model="form.auth" @change="authChanged">案件抄送以下单位:</el-checkbox>
			</el-form-item>
			<el-form-item key="2" v-else label="案件抄送:">
				<el-checkbox v-model="form.auth" @change="authChanged">案件抄送以下单位:</el-checkbox>
			</el-form-item>
			<el-form-item v-if="form.auth == true" label="">
				<div style="display: flex;align-items: center;margin-bottom: 10px;">
					<el-cascader v-model="complainAddressId" :show-all-levels="false" ref="complainAddressId"
						style="flex: 1;" :options="areas"
						:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
						clearable @change="complainAddressIdChanged"></el-cascader>

					<el-select v-model="addressDepartmentCode" ref="addressDepartmentCode" style="flex: 1;"
						placeholder="请选择部门" clearable filterable>
						<el-option v-for="item in departmentTree" :key="item.code" :label="item.label"
							:value="item.code">
						</el-option>
					</el-select>
					<div class="lb">
						<el-button type="primary" icon="el-icon-plus" @click="addCopyDept">添加抄送部门</el-button>
					</div>
				</div>
				<el-table v-if="form.departmentDtoList.length > 0" border stripe style="width: 100%;"
					:data="form.departmentDtoList" :header-row-style="{'height':'60px',}">
					<el-table-column label="编号" type="index" width="60px" align="center" />
					<el-table-column label="单位名称" prop="departmentName" header-align="left" align="left" />
					<el-table-column label="抄送备注" prop="remark" header-align="left" align="left">
						<template slot-scope="scope">
							<el-input v-model.trim="scope.row.remark" placeholder="请输入给本部门的抄送信息" clearable>
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="110" fixed="right">
						<template slot-scope="scope">
							<span style="color: #409eff;cursor: pointer;"
								@click.stop="cancelCopy(scope.$index)">取消抄送</span>
						</template>
					</el-table-column>
				</el-table>

			</el-form-item>

		</el-form>
		<div class="split"></div>
		<div class="dialog-footer-btn">
			<el-button @click="handleClose" plain>关闭</el-button>
			<el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import * as mixins from '@/utils/mixins'
	import * as workOrderApi from '@/api/workOrder/index'
	import * as portalsApi from '@/api/portals'
	import * as dictApi from '@/api/dict'
	import * as templateApi from '@/api/template'
	import {
		updateMaterial
	} from '@/api/workOrder/distribute'
	import {
		removeEmptyWithTree
	} from '@/utils/common'

	export default {
		name: 'distributionDialog',
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderNo'],
		data() {
			return {
				areas: [],
				areas2: [],
				departmentTree: [],
				departmentTree2: [],
				departmentTreeLoading: false,
				departmentTree3: [],
				departmentTree4: [],
				form: {
					type: 0,
					auth: false,
					processDepartmentCode: '',
					processDepartmentName: '',
					comment: '',
					departmentDtoList: [],
				},
				complainAddressId: '',
				addressDepartmentCode: '',
				complainAddressId2: '',
				complainAddressId3: '',
				rules: {
					type: [{
						required: true,
						message: '请选择承办类型'
					}],
					comment: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}],
					// systemDomain: [{
					// 	required: true,
					// 	message: '请选择系统领域'
					// }],
					processDepartmentCode: [{
						required: true,
						message: '请选择部门'
					}],
					// departmentDtoList: [{
					// 	required: true,
					// 	message: '请选择案件抄送单位'
					// }],
				},
				submitting: false,
				pickerOptions: {
					disabledDate: (time) => time.getTime() < Date.now() - 86400000
				},
				systemArear: [], //系统领域
			}
		},
		created() {
			this.getArea()
			this.getRemark(1014)
		},
		methods: {
			addCopyDept() {
				if (this.addressDepartmentCode == '') {
					return this.$modal.msgError('请选择部门')
				}
				if (this.form.departmentDtoList.findIndex(item => item.departmentCode == this.addressDepartmentCode) > -
					1) {
					return this.$modal.msgError('所选部门已添加')
				} else {
					let obj = this.departmentTree.find(item => item.code == this.addressDepartmentCode)
					let departmentname = obj.label
					if(obj.label.substr(0,1) == '*'){
						departmentname = obj.label.substring(1,(obj.label.length))
					}
					let tableItem = {
						departmentName: departmentname,
						departmentCode: this.addressDepartmentCode,
						remark: ''
					}
					this.form.departmentDtoList.push(tableItem)
				}
			},
			cancelCopy(index) {
				this.form.departmentDtoList.splice(index, 1)
			},
			authChanged(e) {

			},
			typeChanged(e) {
				this.form.processDepartmentCode = ''
				this.form.comment = ''
				const code = [1014, 1015, 1001, 1016]
				this.getRemark(code[e])
			},
			getArea() {
				portalsApi.workOrder.area()
					.then(res => {
						console.log(res,'--------------area-----------------')
						this.areas = [res.result]
						this.areas2 = res.result.subList
					})
				dictApi.list({
						parentCode: '1011'
					})
					.then(res => {

						this.systemArear = res.result
					})
				portalsApi.workOrder.departByAddress(
						1
					)
					.then(r => {
						this.departmentTree3 = removeEmptyWithTree(r.result)
					})

			},
			getRemark(code) {
				templateApi.detail(code)
					.then(res => {
						this.form.comment = res.result.value
					})
			},
			complainAddressIdChanged(value) {
				this.$refs.complainAddressId.dropDownVisible = false
				if (value == null) {
					this.departmentTree = []
					this.addressDepartmentCode = ''
				} else {
					this.departmentTree = []
					this.addressDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.departmentTree = removeEmptyWithTree(r.result)
							})
							.finally(() => this.departmentTreeLoading = false)
					})
				}

			},
			complainAddressIdChanged2(value) {
				this.$refs.complainAddressId2.dropDownVisible = false
				if (value == null) {
					this.departmentTree2 = []
					this.form.processDepartmentCode = ''
				} else {
					this.departmentTree2 = []
					this.form.processDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.departmentTree2 = removeEmptyWithTree(r.result)
							})
							.finally(() => this.departmentTreeLoading = false)
					})
				}

			},
			complainAddressIdChanged3(value) {
				this.$refs.complainAddressId3.dropDownVisible = false
				if (value == null) {
					this.departmentTree4 = []
					this.form.processDepartmentCode = ''
				} else {
					this.departmentTree4 = []
					this.form.processDepartmentCode = ''
					this.$nextTick(() => {
						let id = value
						portalsApi.workOrder.departByAddress(
								id
							)
							.then(r => {
								this.departmentTree4 = removeEmptyWithTree(r.result)
							})
							.finally(() => this.departmentTreeLoading = false)
					})
				}

			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						if (this.form.type == 1) {
							let obj = this.departmentTree3.find(item => item.code == this.form.processDepartmentCode)
							if(obj.label.substr(0,1) == '*'){
								this.form.processDepartmentName = obj.label.substring(1,(obj.label.length))
							}else{
								this.form.processDepartmentName = obj.label
							}
						}
						if (this.form.type == 2) {
							let obj = this.departmentTree2.find(item => item.code == this.form.processDepartmentCode)
							if(obj.label.substr(0,1) == '*'){
								this.form.processDepartmentName = obj.label.substring(1,(obj.label.length))
							}else{
								this.form.processDepartmentName = obj.label
							}
						}
						if (this.form.type == 3) {
							let obj = this.departmentTree4.find(item => item.code == this.form.processDepartmentCode)
							if(obj.label.substr(0,1) == '*'){
								this.form.processDepartmentName = obj.label.substring(1,(obj.label.length))
							}else{
								this.form.processDepartmentName = obj.label
							}
						}
						return workOrderApi.distribute.acceptance({
							...this.form,
							workOrderNo: this.workOrderNo
						})
					})
					.then(() => {
						this.$emit("success");
						this.handleClose()
					})
					.finally(() => {
						this.submitting = false;
					});
			}
		}
	};
</script>

<style scoped lang="less">
	.lb {
		margin-left: 8px;

		::v-deep .el-button {
			height: 40px;
			font-size: 16px;
		}

		::v-deep .el-button--primary {
			background-color: #1b5284;
		}

	}
</style>
<template>
	<el-dialog append-to-body title="案件推送" width="680px" :visible="visible" @close="handleClose">
		<el-form ref="form" :model="form" :rules="rules" class="white-card" label-width="140px">
			<el-form-item label="案件推送:" prop="addressDepartmentCode" :show-message="false">
				<div style="display: flex;align-items: center;">
					<el-cascader v-model="form.complainAddressId" :show-all-levels="false" ref="complainAddressId"
						style="flex: 1;" :options="areas"
						:props="{ checkStrictly: true , expandTrigger: 'hover',emitPath: false,value:'id',label:'name',children:'subList'}"
						clearable @change="complainAddressIdChanged"></el-cascader>
					<el-select v-model="form.addressDepartmentCode" ref="addressDepartmentCode" style="flex: 1;"
						placeholder="请选择部门" clearable filterable>
						<el-option v-for="item in departmentTree" :key="item.code" :label="item.label"
							:value="item.code">
						</el-option>
					</el-select>
					<el-button icon="el-icon-plus" type="primary" style="height: 40px;margin-left: 8px;"
						@click="addDepartment"></el-button>
				</div>
			</el-form-item>
			<el-form-item label="" prop="departmentDtoList">
				<div>
					<el-tag v-for="(tag,index) in form.departmentDtoList" :key="tag.departmentName" closable
						style="margin-right: 5px;" @close="delTag(index)">
						{{tag.departmentName}}
					</el-tag>
				</div>
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
	import {
		removeEmptyWithTree
	} from '@/utils/common'
	import {
		updateMaterial
	} from '@/api/workOrder/distribute'

	export default {
		name: 'cluePushDialog',
		mixins: [mixins.dialog, mixins.form],
		props: ['visible', 'workOrderNo', 'pushDepartmentList'],
		data() {
			return {
				areas: [],
				departmentTree: [],
				form: {
					complainAddressId: '',
					addressDepartmentCode: '',
					departmentDtoList: [],
				},
				rules: {
					addressDepartmentCode: [{
						required: true,
						message: ''
					}],
					departmentDtoList: [{
						required: true,
						message: '请添加'
					}],
				},
				submitting: false,
			}
		},
		watch: {
			pushDepartmentList: {
				handler(val) {
					// this.form.departmentDtoList = val || []
				},
				deep: true,
				immediate: true
			},
		},
		created() {
			this.getArea()
		},
		methods: {
			delTag(index) {
				this.form.departmentDtoList.splice(index, 1)
			},
			addDepartment() {
				if (this.form.addressDepartmentCode == '') {
					return this.$modal.msgError('请选择部门')
				}
				if (this.form.departmentDtoList.findIndex(item => item.departmentCode == this.form.addressDepartmentCode) >
					-1) {
					return this.$modal.msgError('所选部门已添加')
				} else {
					let obj = this.departmentTree.find(item => item.code == this.form.addressDepartmentCode)
					let departmentname = obj.label
					if (obj.label.substr(0, 1) == '*') {
						departmentname = obj.label.substring(1, (obj.label.length))
					}
					let tableItem = {
						departmentName: departmentname,
						departmentCode: this.form.addressDepartmentCode,
					}
					this.form.departmentDtoList.push(tableItem)
				}
				

			},
			complainAddressIdChanged(value) {
				this.$refs.complainAddressId.dropDownVisible = false
				console.log(value)
				if (value == null) {
					this.departmentTree = []
					this.form.addressDepartmentCode = ''
				} else {
					this.departmentTree = []
					this.form.addressDepartmentCode = ''
					let id = value
					portalsApi.workOrder.departByAddress(
							id
						)
						.then(r => {
							this.departmentTree = removeEmptyWithTree(r.result)
						})
				}

			},
			getArea() {
				portalsApi.workOrder.area()
					.then(res => {
						this.areas = [res.result]
					})
			},
			handleSubmit() {
				this.validateAndConfirm("form", "确定提交吗？")
					.then(res => {
						this.submitting = true;
						return workOrderApi.distribute.pushDepartment({
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

<style scoped>

</style>
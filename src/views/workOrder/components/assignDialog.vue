<template>
  <el-dialog append-to-body
    title="提示"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="选择您要分配的部门：" prop="acceptDepartmentCode">
        <el-cascader
          ref="cascader"
          placeholder="请选择" style="width: 100%"
          v-model="form.acceptDepartmentCode"
          :props="{ label: 'name', value: 'code', expandTrigger: 'hover', emitPath: false, checkStrictly: true }"
          :options="departmentTree"
          :show-all-levels="false"
          @change="handleCascaderChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="备注：" prop="comment">
        <el-input v-model="form.comment" show-word-limit maxlength="500" placeholder="请输入详细描述" type="textarea" style="width: 100%; height: 110px"></el-input>
      </el-form-item>
    </el-form>

    <div class="split" style="margin: 30px 0"></div>

    <div class="dialog-footer-btn">
      <el-button @click="handleClose" type="primary" plain>关闭</el-button>
      <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as workOrderApi from "@/api/workOrder";
import * as departmentApi from "@/api/department";
import { distribute } from "../../../api/workOrder";
import * as minix from "@/utils/mixins";

export default {
  name: "assignDialog",
  mixins: [minix.loading],
  props: ['visible', 'workOrderNo'],
  data() {
    return {
      submitting: false,
      departmentTree: [],
      form: {
        acceptDepartmentCode: '',
        comment: ''
      },
      rules: {
        acceptDepartmentCode: [{ required: true, message: "请选择" }],
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getDepartmentTree()
      }
    }
  },
  methods: {
    handleSubmit() {

      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.confirm("确认分配吗？")
          .then(() => {
            this.decorateLoading(() => {
              const form = { ...this.form };
              form.workOrderNo = this.workOrderNo;
              form.acceptDepartment = this.findDepartmentName(form.acceptDepartmentCode);
              return workOrderApi.distribute(form)
                .then(res => {
                  this.$emit("success");
                  this.handleClose();
                });
            }, "submitting");
          });
      });

    },
    handleClose() {
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    },
    findDepartmentName(code) {
      let name = ''
      const find = (list) => {
        for (const item of list) {
          if (item.code === code) {
            name = item.name
            return
          } else if (item.children && item.children.length > 0) {
            find(item.children)
          }
        }
      }
      find(this.departmentTree)
      return name
    },
    getDepartmentTree() {
      departmentApi.tree()
        .then(res => {
          const removeEmptyChildren = (list) => {
            for (const item of list) {
              if (item.children && item.children.length > 0) {
                removeEmptyChildren(item.children)
              } else {
                delete item.children
              }
            }
          }
          removeEmptyChildren(res.result)
          this.departmentTree = res.result
        })
    },
    handleCascaderChange() {
      this.$refs.cascader.toggleDropDownVisible(false)
    }
  }
};
</script>

<style scoped>

</style>
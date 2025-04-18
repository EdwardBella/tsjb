<!--抄送案件-->

<template>
  <el-dialog append-to-body title="案件抄送" width="640px" :visible="visible" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="抄送部门" prop="departments">
        <div>
          <el-cascader
            ref="cascader"
            :props="{ label: 'name', value: 'code', expandTrigger: 'hover', emitPath: false, checkStrictly: true }"
            :options="departmentTree"
            :show-all-levels="false"
          >
          </el-cascader>
          <el-button @click="onAdd" type="primary" icon="el-icon-plus" plain style="margin-left: 10px">添加部门</el-button>
        </div>
        <div style="display: flex; flex-wrap: wrap; width: 100%; ">
          <template v-for="a in departments">
            <el-tag
              v-if="a.del === false"
              style="margin-right: 5px; margin-top: 5px;"
              :key="a.code"
              size="small"
              closable
              @close="onDel(a)"
            >
              {{ a.name }}<span v-if="a.new" class="color-danger">（新增）</span>
            </el-tag>
          </template>
        </div>
        <div v-if="delDepartmentNames" style="display: flex; justify-content: space-between">
          <div>
            将要取消抄送的部门：<span>{{ delDepartmentNames }}</span>
          </div>
          <el-button style="flex-shrink: 0; margin-left: 10px" @click="onCancel" type="text" plain>取消</el-button>
        </div>
      </el-form-item>
      <el-form-item label="抄送备注" prop="result">
        <el-input
          v-model="form.result"
          show-word-limit
          maxlength="300"
          placeholder="请输入详细描述（新加入的抄送部门会推送这些备注信息）"
          type="textarea"
          style="width: 100%; height: 150px"></el-input>
        <div class="tip">（新加入的抄送部门会推送这些备注信息）</div>
      </el-form-item>

      <div class="split" style="margin: 30px 0"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" type="primary" plain>关闭</el-button>
        <el-button @click="handleSubmit" :loading="submitting" type="primary">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import * as mixins from "@/utils/mixins";
import * as workOrderApi from "@/api/workOrder/index";
import { department2Tree } from "@/utils/common";
import * as templateApi from "@/api/template";

export default {
  name: "copyToDialog",
  mixins: [mixins.dialog, mixins.form],
  props: ["visible", "workOrderNo"],
  data() {
    return {
      form: {
        departments: [],
        result: ""
      },
      departments: [],
      rules: {
        result: [{ required: true, message: "请填写" }],
        departments: [{ required: true, message: "请添加" }]
      },
      departmentTree: [],
      submitting: false
    };
  },
  watch: {
    departments() {
      this.form.departments = this.departments.filter(a => a.del === false);
    }
  },
  computed: {
    delDepartmentNames() {
      return this.departments.filter(a => a.del).map(a => a.name).join("、");
    }
  },
  methods: {
    show() {
      this.getDepartmentTree();
      this.departments = [];
      templateApi.detailByCode(1013)
        .then(res => {
          this.form.result = res.result.value
        })
      workOrderApi.distribute.queryMakeACopyFor({
        workOrderNo: this.workOrderNo
      })
        .then(r => {
          const selectedDepartments = JSON.parse(r.result);
          this.departments = Object.keys(selectedDepartments).map(code => {
            return {
              code,
              name: selectedDepartments[code],
              new: false,
              del: false
            };
          });
        })
        .catch(e => {
          debugger
        });
    },

    onAdd() {
      const node = this.$refs.cascader.getCheckedNodes()[0];
      if (node) {
        const existNode = this.departments.find(a => a.code === node.data.code);
        if (existNode) {
          existNode.del = false;
        } else {
          this.departments.push({
            name: node.data.name,
            code: node.data.code,
            new: true,
            del: false
          });
        }
        this.$refs.cascader.handleClear();
      }
    },
    onCancel() {
      this.departments = this.departments.map(a => {
        a.del = false;
        return a;
      });
    },
    handleSubmit() {
      this.validateAndConfirm("form", "确定提交吗？")
        .then(res => {
          this.submitting = true;
          return workOrderApi.distribute.makeACopyFor({
            departmentCodes: this.form.departments.map(a => a.code).join(","),
            makeACopyForNotes: this.form.result,
            workOrderNo: this.workOrderNo
          });
        })
        .then(() => {
          this.$emit("success");
          this.handleClose();
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    getDepartmentTree() {
      workOrderApi.all.departmentTree().then(res => {
        this.departmentTree = department2Tree(res.result, false);
      });
    },
    onDel(item) {
      this.departments = this.departments.map(a => {
        if (a.code === item.code) {
          a.del = true;
        }
        return a;
      });
    }
  }
};
</script>

<style scoped>

</style>
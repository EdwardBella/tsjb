<template>
  <el-dialog
    title="所在行政区划"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" class="white-card">
        <el-form-item label="选择行政区划：" prop="id">
          <el-cascader
            ref="cascader"
            style="width: 100%"
            clearable
            v-model="form.id"
            :options="tree"
            :props="{ checkStrictly: true, label: 'name', value: 'id', children: 'subList', emitPath: false }"
            :show-all-levels="false"
            @change="handleCascaderChange"

          ></el-cascader>
        </el-form-item>

        <el-form-item label="行业领域：" prop="industrySectorName">
          <el-select v-model="form.industrySectorName" multiple style="width: 100%">
<!--            <el-option label="无" value=""></el-option>-->
            <template v-for="item in vocations">
              <el-option v-if="item" :key="item.industrySectorName" :label="item.industrySectorName" :value="item.industrySectorName"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="split"></div>

      <div class="dialog-footer-btn">
        <el-button @click="handleClose" plain>关闭</el-button>
        <el-button @click="handleSubmit" :disabled="hasError" :loading="submitting" type="primary">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import * as departmentApi from "@/api/department";
import * as mixins from "@/utils/mixins";
import * as validators from "@/utils/validators";
import * as vocationAPI from "@/api/vocation";
import { removeEmptyChildren } from "@/utils/common";

export default {
  name: "setCompetentDepartmentDialog",
  mixins: [mixins.dialog, mixins.form],
  props: {
    administrativeDivisionId: { type: [Number, String], default: 0 },
    id: { type: [Number, String], default: 0 },
    industrySectorName: { type: String, default: "" },
    code: { type: String, default: "" },
    name: { type: String, default: '' }
  },
  data() {
    return {
      tree: [],
      form: {
        id: "",
        industrySectorName: []
      },
      rules: {
        // id: [{ required: true, message: "请选择" }]
      },
      hasError: false,
      submitting: false,
      vocations: []
    };
  },
  watch: {
    form: {
      handler() {
        this.hasError = validators.validate(this.form, this.rules);
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    vocationAPI.allList().then(r => {
      this.vocations = r.result
    })
  },
  methods: {
    show() {
      this.form.id = this.administrativeDivisionId
      this.form.industrySectorName = this.industrySectorName.split(',').filter(item => Boolean(item))
      this.getTree();
    },
    getTree() {
      departmentApi.list()
        .then(res => {
          const result = [res.result];
          removeEmptyChildren(result);
          result.unshift({
            name: "无",
            id: ""
          });
          this.tree = result;
        });
    },
    bind() {
      return vocationAPI.bind({
        "departmentCode": this.code,
        "departmentId": this.id,
        "departmentName": this.name,
        "industrySectorName": this.form.industrySectorName.join(',')
      })
    },
    unBind() {
      if (!this.industrySectorName) return Promise.resolve()
      return vocationAPI.unBind({
        "departmentCode": this.code,
        "departmentId": this.id,
        "departmentName": this.name,
        // "industrySectorName": ''
      })
    },
    handleSubmit() {
      this.submitting = true;
      this.validateAndConfirm("form",'确认提交吗？')
        .then(() => {
          let item = this.getItemByCode(this.tree, this.form.id)
          if (!item) {
            item = { id: '', name: '' }
          }
          return Promise.all([
            departmentApi.update({
              "administrativeDivisionId": item.id,
              "administrativeDivisionName": item.name,
              "code": this.code,
              "name": this.name
            }),
            this.form.industrySectorName.length ? this.bind() : this.unBind()
          ])
        })
        .then(() => {
          this.$emit("success");
          this.handleClose();
        })
        .finally(() => this.submitting = false);
    },
    getItemByCode(tree, id) {
      for (const item of tree) {
        if (item.id === id) return item;
        if (item.subList) {
          const result = this.getItemByCode(item.subList, id);
          if (result) return result
        }
      }
    },
    handleCascaderChange() {
      this.$refs.cascader.toggleDropDownVisible(false);
    },
  }
};
</script>

<style scoped>

</style>
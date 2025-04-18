<template>
  <el-dialog
    :title="`${type === 1 ? '创建' : '编辑'}事项`"
    width="640px"
    top="20px"
    :visible="visible"
    @close="handleClose"
  >
    <div v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="white-card">
        <el-form-item label="事项名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入事项名称" style="width: 100%;"></el-input>
        </el-form-item>
<!--        <el-form-item label="处理时限：" prop="deadline">-->
<!--          <el-input v-model.number="form.deadline" placeholder="请输入处理时间" :minlength="1"-->
<!--                    controls-position="right" style="width: 130px;"></el-input>-->
<!--          <span class="text">个工作日</span>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="预设主管单位：" prop="acceptDepartmentCode">-->
<!--          <el-cascader-->
<!--            ref="cascader"-->
<!--            v-model="form.acceptDepartmentCode"-->
<!--            :props="{ label: 'name', value: 'code', expandTrigger: 'hover', emitPath: false, checkStrictly: true }"-->
<!--            :options="departmentTree"-->
<!--            :show-all-levels="false"-->
<!--            @change="handleCascaderChange"-->
<!--          >-->
<!--          </el-cascader>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="举报须知："  prop="information">-->
<!--          <el-input v-model="form.information" show-word-limit maxlength="1000" placeholder="请输入详细描述" type="textarea"-->
<!--                    style="width: 100%; height: 110px"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="填报说明：" prop="explain">
          <el-input v-model="form.explain" show-word-limit maxlength="1000" placeholder="请输入详细描述" type="textarea"
                    style="width: 100%; height: 110px"></el-input>
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
import * as mattersApi from "@/api/matters";
import * as mixins from '@/utils/mixins'
import * as validators from "@/utils/validators";

const form = {
  name: "",
  information: "",
  explain: "",
  deadline: 0
}
export default {
  name: "addItemdetailDialog",
  mixins: [mixins.affirm, mixins.form],
  props: {
    visible: { type: Boolean, default: false },
    node: { type: Object, default: Object },
    type: { type: Number, default: 1 }, // 1.添加， 2.编辑
  },
  data() {
    return {
      loading: false,
      submitting: false,
      hasError: false,
      departmentTree: [],
      form: {
        ...form,
      },
      rules: {
        name: [
          { required: true, message: "请填写事项名称" },
          { validator: validators.limitMax(200) }
        ],

        // information: [{ required: true, message: "请填写举报须知" }],
        explain: [{ required: true, message: "请填写填报说明" }],
        // acceptDepartmentCode: [{ required: true, message: "请选择" }]
      }
    };
  },
  watch: {
    form: {
      handler() {
        this.hasError = validators.validate(this.form, this.rules)
      },
      deep: true,
      immediate: true
    },
    visible() {
      this.handleReset()
      if (this.type === 2) {
        this.getItemdetailDetails()
      }
    }
  },
  created() {
    // this.getDepartmentTree()
  },
  methods: {
    getItemdetailDetails() {
      this.loading = true
      mattersApi.itemdetailDetails(this.node.id).then(res => {
        const { name, deadline, information, explain, acceptDepartmentCode } = res.result
        this.form = {
          name,
          deadline,
          information,
          explain,
          acceptDepartmentCode
        }
      })
      .finally(() => {
        this.loading = false
      })
    },
    handleClose() {
      this.handleReset()
      this.$emit("update:visible", false);
    },
    handleSubmit() {
      this.validate('form')
      .then(() => this.confirm())
      .then(() => {
        const form = {...this.form}

        let promise
        if (this.type === 1) {
          form.itemCategoryId = this.node.id
          promise = mattersApi.addItemdetail
        } else {
          form.id = this.node.id
          form.itemCategoryId = this.node.item_category_id
          promise = mattersApi.editItemdetail
        }
        // form.acceptDepartment = this.findDepartmentName(form.acceptDepartmentCode)
        this.submitting = true;

        promise(form)
          .then(res => {
            this.$modal.msgSuccess("提交成功");
            this.handleClose();
            this.handleReset();
            this.$emit("success", res.result);
          })
          .finally(() => {
            this.submitting = false;
          });
      })
    },
    handleReset() {
      this.form = {...form}
      this.$refs.form && this.$refs.form.resetFields();
    },
    // findDepartmentName(code) {
    //   let name = ''
    //   const find = (list) => {
    //     for (const item of list) {
    //       if (item.code === code) {
    //         name = item.name
    //         return
    //       } else if (item.children && item.children.length > 0) {
    //         find(item.children)
    //       }
    //     }
    //   }
    //   find(this.departmentTree)
    //   return name
    // },
    // getDepartmentTree() {
    //   departmentApi.tree()
    //     .then(res => {
    //       const removeEmptyChildren = (list) => {
    //         for (const item of list) {
    //           if (item.children && item.children.length > 0) {
    //             removeEmptyChildren(item.children)
    //           } else {
    //             delete item.children
    //           }
    //         }
    //       }
    //       removeEmptyChildren(res.result)
    //       this.departmentTree = res.result
    //     })
    // },
    handleCascaderChange() {
      this.$refs.cascader.toggleDropDownVisible(false)
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
  color: #666666;
  margin-left: 10px;
}
</style>
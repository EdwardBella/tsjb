<template>
  <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
    <el-form-item label="注册类型">130000000000</el-form-item>
    <el-form-item label="新手机号码" prop="newPhone">
      <phoneVerificationCode v-model="form.newPhone" :validate-phone="validatePhone"></phoneVerificationCode>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="form.code" placeholder="请输入验证码" style="width: calc(100% - 160px)"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>

    <div class="footer-btn">
      <el-button @click="$router.back()" type="primary" plain>返回</el-button>
      <el-button type="primary">确认无误，提交</el-button>
    </div>
  </el-form>
</template>

<script>
import phoneVerificationCode from "@/views/portals/components/phoneVerificationCode";
import * as mixins from '@/utils/mixins'
import * as validators from "@/utils/validators";

export default {
  name: "modifyPhoneNumber",
  mixins: [mixins.form],
  components: { phoneVerificationCode },
  data() {
    return {
      form: {
        newPhone: '',
        code: '',
        password: ''
      },
      rules: {
        newPhone: [
          validators.required(),
          { validator: validators.phone(), trigger: "blur" }
        ],
        code: [
          validators.required()
        ],
        password: [
          validators.required()
        ]
      }
    }
  },
  methods: {
    validatePhone() {
      return this.validateField('form', 'newPhone')
    }
  }
};
</script>

<style scoped>
.form {
  width: 480px;
  margin: 0 auto;
}
</style>
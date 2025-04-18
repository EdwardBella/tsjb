<template>
  <div class="authentication">
    <div class="warn">请先完成实名认证（注意：带*的为必填项）</div>
    <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
      <el-form-item label="注册类型">
        <el-radio-group v-model="type">
          <el-radio-button label="person">个人用户</el-radio-button>
          <el-radio-button label="enterprise">企业用户</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <template v-if="type === 'person'">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="不能为空，只允许包括中文和英文" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入正确的身份证号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="Y">男</el-radio>
          <el-radio v-model="form.sex" label="N">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <phoneVerificationCode v-model="form.phone" :validatePhone="validatePhone"></phoneVerificationCode>

        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>

        <el-form-item label="通讯地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入您的通讯地址" maxlength="100"></el-input>
        </el-form-item>
      </template>

      <template v-if="type === 'enterprise'">
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name" placeholder="不能为空，只允许包括中文和英文" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" class="multi-line">
          <el-input placeholder="请输入正确的统一社会信用代码" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input placeholder="不能为空，只允许包括中文和英文" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="企业地址">
          <el-input placeholder="请输入您的企业地址" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input placeholder="请输入正确的邮政编码" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <phoneVerificationCode v-model="form.phone" :validatePhone="validatePhone"></phoneVerificationCode>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
      </template>

      <div class="footer-btn">
        <el-button @click="handleSubmit" type="primary">确认无误，提交</el-button>
      </div>

    </el-form>

    <el-dialog
      class="dialog-tips"
      title="提示"
      :visible.sync="dialogVisible"
      width="640px"
    >
      <p>认证成功，前往投诉举报（<span class="color-primary">{{s}}</span>s）</p>

      <span slot="footer" class="dialog-footer">
        <div class="split" style="margin-bottom: 30px"></div>
        <el-button type="primary" @click="handleGoto">立即跳转</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as validators from "@/utils/validators";
import * as minixs from "@/utils/mixins";
import phoneVerificationCode from "./components/phoneVerificationCode";
import { postPortalsHeight } from "@/utils/common";

export default {
  name: "authentication",
  mixins: [minixs.form],
  components: { phoneVerificationCode },
  data() {
    return {
      s: 5,
      dialogVisible: false,
      type: "person",   // person 跟人，enterprise 企业
      form: {
        name: "",
        idNumber: "",
        sex: "",
        phone: "",
        code: "",
        address: ""
      },
      rules: {
        name: [
          { ...validators.required() },
          { validator: validators.chineseAndEnglish(), trigger: "blur" }
        ],
        idNumber: [
          { ...validators.required() },
          { validator: validators.idNumber(), trigger: "blur" }
        ],
        sex: [
          { ...validators.required() }
        ],
        phone: [
          { ...validators.required() },
          { validator: validators.phone(), trigger: "blur" }
        ],
        code: [
          { ...validators.required() }
        ]
      }
    };
  },
  watch: {
    'type': {
      handler() {
        this.$nextTick(postPortalsHeight)
      },
      immediate: true
    }
  },
  methods: {
    validatePhone() {
      return this.validateField("form", "phone");
    },
    handleSubmit() {
      this.validate("form")
        .then(() => {
          // TODO
          this.dialogVisible = true
          this.countDown()
        });
    },
    countDown() {
      this.s--
      const timer = setInterval(() => {
        if (this.s === 0) {
          this.handleGoto()
          clearInterval(timer)
          return
        }
        this.s--
      }, 1000)
    },
    handleGoto() {
      this.$router.push({
        path: "/portals/createStep2",
        query: { id: this.$route.query.id }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.authentication {
  .form {
    margin-top: 20px;
  }

  .warn {
    font-size: 12px;
    color: #E44831;
    text-align: center;
  }
}

.footer-btn {
  margin-top: 30px;
  text-align: center;
}
</style>

<style lang="less">
.authentication {
  width: 540px;
  margin: 0 auto;

  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: @color-primary;
    border-color: @color-primary;
  }

  .el-radio-group {
    width: 100%;

    .el-radio-button {
      width: 50%;


      .el-radio-button__inner {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding: 0;
      }
    }
  }
}
</style>
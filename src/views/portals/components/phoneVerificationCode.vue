<template>
  <div class="flex">
    <el-input :value="value" @input="handleInput" :placeholder="placeholder" style="flex: 1;"></el-input>
    <el-button @click="handleSendCode" :disabled="isSending" type="primary" style="margin-left: 20px; width: 140px">{{ txt }}</el-button>
  </div>
</template>

<script>
export default {
  name: "phoneVerificationCode",
  props: {
    value: { type: String, required: true },
    validatePhone: { type: Function, default: () => {} },
    placeholder: {type: String, default: '请输入手机号'}
  },
  data() {
    return {
      s: 60,
      defaultTxt: '发送验证码',

    }
  },
  computed: {
    isSending() {
      return this.s < 60
    },
    txt() {
      return this.isSending ? `${this.s}s` : this.defaultTxt
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val)
    },
    handleSendCode() {
      this.validatePhone()
      .then(() => {
        this.s--
        this.timer = setInterval(() => {
          if (this.s === 0) {
            this.s = 60
            clearInterval(this.timer)
            return
          }
          this.s--

        }, 1000)
      })

    }
  }
};
</script>

<style scoped>

</style>
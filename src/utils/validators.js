import { isEmpty } from "@/utils/common";
import moment from "moment";

export function limitMax (max, msg) {
  msg = msg ? msg : `输入过长，最多输入${max}个字符`
  return (rule, value, callback) => {
    if (value.length > max) {
      callback(new Error(msg));
      return true
    }
    callback()
  }
}

export function limitMin (min, msg) {
  msg = msg ? msg : `输入过短，最少输入${min}个字符`
  return (rule, value, callback) => {
    if (value.length < min) {
      callback(new Error(msg));
      return true
    }
    callback()
  }
}

export function maxDay (max) {
  return (rule, value, callback) => {
    if (value.length === 2) {
      if (!moment(value[1]).isBetween(moment(value[0]).subtract(1, 'days'), moment(value[0]).add(max + 1, 'days'), 'days')) {
        callback(new Error(`时间跨度不可大于${max}天`));
        return true
      }
    }
    callback()
  }
}

export function min (val, message) {
  message = message ? message :`输入过长，最多输入${max}个汉字`
  return (rule, value, callback) => {
    if (Number(value) < val) {
      callback(new Error(message));
      return true
    }
    callback()
  }
}

export function max (val, message) {
  message = message ? message :`输入过长，最多输入${max}个汉字`
  return (rule, value, callback) => {
    if (Number(value) > val) {
      callback(new Error(message));
      return true
    }
    callback()
  }
}

export function phone() {
  return (rule, value, callback) => {
    // if (/^1[34578]\d{9}$/.test(value) === false) {
    if (value.length > 0 && value.length !== 11) {
      callback(new Error("请输入正确的手机号"));
      return true
    } else {
      callback();
    }
  }
}

export function chineseAndEnglish() {
  return (rule, value, callback) => {
    if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value) === false) {
      callback(new Error("请输入中文或英文"));
      return true
    } else {
      callback()
    }
  }
}

export function required(message = '请填写') {
  return {
    required: true,
    message
  }
}

export function idNumber() {
  return (rule, value, callback) => {
    if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value) === false) {
    // if (value.length !== 11) {
      callback(new Error("请输入正确的身份证号"));
      return true
    } else {
      callback()
    }
  }
}

export function socialCreditNumber() {
  return (rule, value, callback) => {
    if (/^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/.test(value) === false) {
      callback(new Error("请输入正确的统一社会信用代码"));
      return true
    } else {
      callback()
    }
  }
}

export function number() {
  return (rule, value, callback) => {
    if (/^[0-9]*$/g.test(value) === false) {
      callback(new Error('请输入数字'))
      return true
    } else {
      callback()
    }
  }
}

// 验证密码 长度至少为8个字符,大写字母、小写字母、数字及特殊字符中,至少包含三种类型的字符；
export function password() {
  return (rule, value, callback) => {
    // copy from http://testbuild.dataos.top/ 个人中心
    let i = 0
    const passwordLevel = 2
    const passwordComplexity = ''
    const passwordLength = ''
    const name = ''
    const accountName = ''
    const special = /.*[^A-Za-z0-9]+.*/
    const chinese = /.*[\u4e00-\u9fa5]+.*/
    const upper = /.*[A-Z]+.*/
    const lower = /.*[a-z]+.*/
    const num = /.*[0-9]+.*/
    const errMsg = '新密码格式不符合规范，请重新设置就可以了'
    if (special.test(value) && !chinese.test(value)) i++
    if (num.test(value)) i++
    if (upper.test(value)) i++
    if (lower.test(value)) i++
    if (i >= 3 && passwordLevel === 2 && value.length >= 8) {
      callback()
    } else if (i >= 3 && passwordLevel === 3 && value !== name && value !== accountName && value.length >= 12) {
      callback()
    } else if (i >= 2 && passwordLevel === 1 && value.length >= 6) {
      callback()
    } else if (passwordLevel === 4) {
      if (passwordComplexity === 1 && value.length >= passwordLength) {
        callback()
      } else if (passwordComplexity === 2 && value.length >= passwordLength && i >= 2) {
        callback()
      } else if (passwordComplexity === 3 && value.length >= passwordLength && i >= 3) {
        callback()
      } else if (passwordComplexity === 4 && value.length >= passwordLength && i >= 4) {
        callback()
      } else {
        callback(new Error(errMsg))
      }
    } else {
      callback(new Error(errMsg))
    }
  }
}


// 验证表单是否输入合法，主要判断提交按钮是否禁用
export function validate(form, rules) {
  const keys = Object.keys(rules)
  for (const key of keys) {
    for (const rule of rules[key]) {
      if (rule.required === true) {
        if (isEmpty(form[key])) return true
      }
      if (rule.validator) {
        if (rule.validator(rule, form[key], () => {}) === true) {
          return true
        }
      }
    }
  }
}
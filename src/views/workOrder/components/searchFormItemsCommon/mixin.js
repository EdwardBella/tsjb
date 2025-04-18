import moment from "moment";
import * as validators from "@/utils/validators";

export default {
  data() {
    return {
      searchForm: {
        title: '',
        status: '',
        itemSource: '',
        expireFlag: '',
        dateRange: [],
        // dateRange: [moment().subtract(30, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
        publicStatus: '',
        itemDetailId: '',
        processDepartmentCode: '',
        appraiseStatus: ''
      },
      searchFormRules: {
        // dateRange: [{ validator: validators.maxDay(31) }],
        title: [{ validator: validators.limitMax(10) }]
      }
    }
  }
}

export const defaultSearchFromForURLQueryMixin = {
  created() {
    const { status, expireFlag } = this.$route.query
    if (status) {
      this.searchForm.status = status
    }
    if (expireFlag) {
      this.searchForm.expireFlag = expireFlag
    }
  }
}

export function initSearchForm(defaultForm = {}) {
  return Object.assign({}, {
    title: '',
    status: '',
    itemSource: '',
    expireFlag: '',
    dateRange: [],
    // dateRange: [moment().subtract(30, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
    publicStatus: '',
    itemDetailId: '',
    processDepartmentCode: '',
    appraiseStatus: ''
  }, defaultForm)
}

export function initSearchFormRules(defaultFormRules = {}) {
  return Object.assign({}, {
    // dateRange: [{ validator: validators.maxDay(31) }],
    title: [{ validator: validators.limitMax(10) }]
  }, defaultFormRules)
}
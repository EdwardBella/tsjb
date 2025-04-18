import axios from '@/utils/axios'

// 投诉举报案件对象统计
export const caseObjectCount = params => axios({
  url: '/api/v1/workOrder/count/case/objectcount',
  method: 'GET',
  params
})
// 投诉举报案件投诉人类型统计
export const casePeopleTypeCount = params => axios({
  url: '/api/v1/workOrder/count/case/peopletypecount',
  method: 'GET',
  params
})
// 投诉举报案件来源统计
export const caseSourceCount = params => axios({
  url: '/api/v1/workOrder/count/case/sourcecount',
  method: 'GET',
  params
})
// 投诉举报案件类型统计
export const caseTypeCount = params => axios({
  url: '/api/v1/workOrder/count/case/typecount',
  method: 'GET',
  params
})
// 案件状态信息（行政区划）
export const caseStatusAdministrativeCount = params => axios({
  url: '/api/v1/workOrder/count/casestatus/administrativecount',
  method: 'GET',
  params
})
// 案件状态信息（承办部门）
export const caseStatusDepartmentCount = params => axios({
  url: '/api/v1/workOrder/count/casestatus/departmentcount',
  method: 'GET',
  params
})

// 通过code获取行政部门下子部门数据统计数据
export const caseStatusDepartmentCode = params => axios({
  url: '/api/v1/workOrder/count/casestatus/departmentcode',
  method: 'GET',
  params
})
// 案件时效信息（行政区划）
export const caseTimelinessAdministrativeCount = params => axios({
  url: '/api/v1/workOrder/count/casetimeliness/administrativecount',
  method: 'GET',
  params
})

// 案件时效信息（承办部门）
export const caseTimelinessDepartmentCount = params => axios({
  url: '/api/v1/workOrder/count/casetimeliness/departmentcount',
  method: 'GET',
  params
})

// 通过部门code案件时效信息获取行政部门下子部门数据统计数据
export const caseTimelinessDepartmentCode = params => axios({
  url: '/api/v1/workOrder/count/casetimeliness/departmentcode',
  method: 'GET',
  params
})

// 我关注的工单
export const departmentQuery = params => axios({
  url: '/api/v1/workOrder/count/department/query',
  method: 'GET',
  params
})

// 检查是否有对应权限
export const check = params => axios({
  url: '/api/v1/workOrder/count/permission/check',
  method: 'GET',
  params
})

// 查询所有行政部门
export const queryAllSub = params => axios({
  url: '/api/v1/administrativedivision/leaderdepartment/queryallsub',
  method: 'GET',
  params
})

// 根据部门code获取所有自己包括自己下级的
export const getByCode = params => axios({
  url: '/api/v1/workOrder/count/getbycode',
  method: 'GET',
  params
})

// 根据行政区划统计政府欠款
export const administrativeCount = params => axios({
  url: '/api/v1/workOrder/count/debtamount/administrativecount',
  method: 'GET',
  params
})

// 根据行政区划统计政府欠款
export const complaintCount = params => axios({
  url: '/api/v1/workOrder/count/debtamount/complaintcount',
  method: 'GET',
  params
})

// 根据部门统计投诉对象
export const departmentCount = params => axios({
  url: '/api/v1/workOrder/count/debtamount/departmentcount',
  method: 'GET',
  params
})

// 统计中心数据导出
export const exportExcel = params => axios({
  url: '/api/v1/administrativedivision/ncesStatisticsExport',
  responseType: 'blob',
  method: 'GET',
  params
})
// 查询投诉举报案件来源分析: 
export const queryWorkOrderSource = (params) => axios({
  url: '/workOrder/source/queryWorkOrderSource',
  method: 'GET',
  params,
});
//查询投诉举报案件类型分析:
export const queryWorkOrderType = (params) => axios({
  url: '/workOrder/type/queryWorkOrderType',
  method: 'GET',
  params,
});
// 查询投诉举报案件概况热力统计图
export const queryWorkOrderSurveyChart = (params) => axios({
  url: '/workOrder/chart/queryWorkOrderSurveyChart',
  method: 'GET',
  params,
});

// 查询投诉举报案件概况:  
export const queryWorkOrderSurvey = (params) => axios({
  url: '/workOrder/survey/queryWorkOrderSurvey',
  method: 'GET',
  params,
});
//查询各级人民政府和有关部门相关各类型案例列表:
export const queryWorkOrderByType = (params) => axios({
  url: '/workOrder/case/queryWorkOrderByType',
  method: 'GET',
  params,
});

export const queryWorkOrderSatisfactionLevel = (params) => axios({
  url: '/workOrder/satisfaction/queryWorkOrderSatisfactionLevel',
  method: 'GET',
  params,
});

export const satisfactionStatusByCity = (params) => axios({
  url: '/api/v1/workOrder/count/division/queryWorkOrder',
  method: 'GET',
  params,
});

export const queryWorkOrderCaseByType = (params) => axios({
  url: '/workOrder/case/queryWorkOrderByType',
  method: 'GET',
  params,
});

export const queryWorkOrderTypeByType = (params) => axios({
  url: '/workOrder/type/queryWorkOrderType',
  method: 'GET',
  params,
});

export const queryworkorderIndustry = (params) => axios({
  url: '/api/v1/workOrder/industrySector/queryWorkOrderIndustry',
  method: 'GET',
  params,
});

export const queryWorkorderIndustryDetail = (params) => axios({
  url: '/api/v1/workOrder/industrySector/queryWorkOrderIndustryDetail',
  method: 'GET',
  params,
});

export const queryWorkOrderDepartment = (params) => axios({
  url: '/workOrder/source/queryWorkOrderDepartment',
  method: 'GET',
  params,
});

export const queryWorkOrderDepartmentWithParam = (params) => axios({
  url: '/api/v1/workOrder/distribute/transfer/department/treeWithParam',
  method: 'GET',
  params,
});

export const queryRole = (params) => axios({
  url: '/api/v1/workOrder/homePage/queryRole',
  method: 'GET',
  params,
});

export const queryDepartmentStatistics = (params) => axios({
  url: '/api/v1/workOrder/homePage/queryDepartmentStatistics',
  method: 'GET',
  params,
});

export const queryWorkOrderCaseTrends = (params) => axios({
  url: '/api/v1/workOrder/homePage/queryWorkOrderCaseTrends',
  method: 'GET',
  params,
});

export const queryOrderWaiting = (params) => axios({
  url: '/api/v1/workOrder/homePage/queryOrderWaiting',
  method: 'GET',
  params,
});











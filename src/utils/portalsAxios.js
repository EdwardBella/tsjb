/**
 * 门户接口请求包装
 */

import axios from "@/utils/axios";
import { getCMSUserInfo } from "@/utils/common";

export default function (options) {
  options.headers = options.headers || {}
  const cmsUserInfo = getCMSUserInfo()
  Object.assign(options.headers, {
    cmsAuthToken: cmsUserInfo.cmsAuthToken || '',
    userId: cmsUserInfo.userId || ''
  })
  if (!options.params) options.params = {}
  Object.assign(options.params, {
    _: new Date().getTime()
  })
  return axios(options)
}
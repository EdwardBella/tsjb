import moment from "moment";

import {
  workOrderCreatorTypeDict,
  workOrderEventSourceDict,
  workOrderStatusDict,
  workOrderPublicStatusDict,
  workOrderPublicIntentionDict,
  workOrderAppraiseStatusDict,
  workOrderCreateTypeDict,
  workOrderProcessAuditStatusDict,
  workOrderAuditTypeDict,
  accountRoleTypeTypeDict,
  workOrderTodoStatusDict,
  workOrderAuditStatusDict,
  workOrderProcessStatusDict,
  workOrderComplaintObjectTypeDict,
  messageStatusDict,
  workOrderAtisFactionLevelDict,
  repaymentPlanStatusDict,
  remarkVisibleRangeDict,
  remarkTypeDict,
  baseBoolDict,
} from "./dict";
import { splitFileName } from "./common";

export function workOrderStatus(key) {
  const value = workOrderStatusDict[key];

  return value || "-";
}

export function workOrderAuditType(key) {
  const value = workOrderAuditTypeDict[key];
  return value || "-";
}

export function workOrderAuditStatus(key) {
  const value = workOrderAuditStatusDict[key];
  return value || "-";
}

export function workOrderEventSource(key, eventSourceArr) {
  const value = workOrderEventSourceDict[key];

  return value || "-";
}

export function workOrderCreatorType(key) {
  return workOrderCreatorTypeDict[key] || "-";
}

export function workOrderProcessStatus(key) {
  return workOrderProcessStatusDict[key] || "-";
}

export function workOrderPublicStatus(key) {
  return workOrderPublicStatusDict[key] || "-";
}

export function workOrderAppraiseStatus(key) {
  return workOrderAppraiseStatusDict[key] || "-";
}

export function workOrderPublicIntention(key) {
  return workOrderPublicIntentionDict[key] || "-";
}

export function workOrderProcessAuditStatus(key) {
  return workOrderProcessAuditStatusDict[key] || "-";
}

export function accountRoleTypeType(key) {
  return accountRoleTypeTypeDict[key] || "-";
}

export function workOrderTodoStatus(key) {
  return workOrderTodoStatusDict[key] || "-";
}

export function workOrderComplaintObjectType(key) {
  return workOrderComplaintObjectTypeDict[key] || "-";
}

export function messageStatus(key) {
  return messageStatusDict[key] || "-";
}

export function workOrderAtisFactionLevel(key) {
  return workOrderAtisFactionLevelDict[key] || "-";
}

export function repaymentPlanStatus(key) {
  return repaymentPlanStatusDict[key] || "-";
}

export function remarkVisibleRange(key) {
  return remarkVisibleRangeDict[key] || "-";
}

export function remarkType(key) {
  return remarkTypeDict[key] || "-";
}

export function baseBool(key) {
  return baseBoolDict[key] || "-";
}

export function accountRoleTypeTypeByString(ids) {
  if (typeof ids !== "string" || ids === "") return "";
  ids = ids.split(",");
  return ", " + ids.map((id) => accountRoleTypeType(id)).join(", ");
}

export function delTemporary(ids) {
  if (typeof ids !== "string" || ids === "") return "";
  ids = ids.split(",");
  if (ids.indexOf("0") > -1) {
    ids.splice(ids.indexOf("0"), 1);
  }
  return ids.join(",");
}

export function timeRemaining(val, defaultValue = "-") {
  if (!val) return defaultValue;
  const day = moment(val).diff(moment(), "day");
  return day > 0 ? day : 0;
}

export function timeRemainingDHMS(val, defaultValue = "-") {
  if (!val) return defaultValue;
  const ms = moment(val).diff(moment(), "milliseconds");
  const { days, hours, minutes, seconds } = timeConversionDHMS(ms);
  if (seconds < 0) {
    return `0天0小时0分钟0秒`;
  }
  return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
}

export function timeRemainingDH(val, defaultValue = "-") {
  if (!val) return defaultValue;
  const ms = moment(val).diff(moment(), "milliseconds");
  const { days, hours, minutes, seconds } = timeConversionDHMS(ms);
  if (seconds < 0) {
    return `0天0小时`;
  }
  return days + "天" + hours + "小时";
}

export function formatDHMS(ms) {
  const { days, hours, minutes, seconds } = timeConversionDHMS(ms);
  if (seconds < 0 || days < 0 || hours < 0 || minutes < 0) {
    return `0天0小时0分钟0秒`;
  }
  return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
}

export function timeConversionDHMS(ms) {
  const days = parseInt(ms / (1000 * 60 * 60 * 24), 0);
  const hours = parseInt((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 0);
  const minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60), 0);
  const seconds = parseInt((ms % (1000 * 60)) / 1000, 0);
  return { days, hours, minutes, seconds };
}

export function timeFormatDHM(ms) {
  const { days, hours, minutes, seconds } = timeConversionDHMS(ms);
  return days + "天" + hours + "小时" + minutes + "分钟";
}

export function timeFormatDHMS(ms = 0) {
  const { days, hours, minutes, seconds } = timeConversionDHMS(ms);
  return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
}

export function hourMinute(val) {
  if (!val) return "";
  let hours = 0;
  let minutes = val / 60;
  if (val <= 60) {
    hours = 0;
    minutes = Math.ceil(minutes);
  } else {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }
  // const hours = Math.floor((val % 86400) / 3600);
  // const minutes = Math.floor(((val % 86400) % 3600) / 60);
  return `${hours}小时${minutes}分`;
}

export function filename(val) {
  return splitFileName(val)[0];
}

export function extensionName(val) {
  return splitFileName(val)[1];
}

export function yyyymmdd(val) {
  return moment(val).format("yyyy-MM-DD");
}

export function txt2HTML(txt) {
  if (!txt) return "-";
  return txt.replace(/[\n\r]/g, "<br>").replace(/\s/g, "&nbsp;");
}

export function money(val) {
  if (typeof val === "number" && !isNaN(val)) return val + "万元";
  return "-";
}

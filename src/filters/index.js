import Vue from 'vue'
import { defaultImgSrc } from '@/common/const'

export const timeFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  // 2018-04-15T10:10:10+08:00
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export const imgSrcFormat = function (v) {
  if (!v) {
    return defaultImgSrc
  }
  let path
  if (v.indexOf('.') === 0) {
    if (v.indexOf('./file') === 0) {
      path = '/sapi' + v.substr(1)
    } else {
      path = '/sapi/file/peotry/img' + v.substr(1)
    }
  } else {
    path = '/sapi/file/peotry/img/' + v
  }
  return path
}

Vue.filter('time-format', timeFormat)
Vue.filter('img-src', imgSrcFormat)

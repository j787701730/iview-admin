import axios from 'axios'
import { Message } from 'view-design'
import router from '@/router'
import { setToken } from '@/libs/util'

export function ajaxSimple (url, data, sucFun = null) {
  const param = {
    url,
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  }

  return axios(param).then(
    (res) => {
      if (sucFun !== null) {
        sucFun(res.data)
      }
    }
  ).catch(
    () => {
      if (toast) {
        Message.error({ content: '请求失败' })
      }
      if (failFun !== null) {
        failFun()
      }
    }
  )
}

export function ajax (url, data, toast = true, sucFun = null, failFun = null) {
  const param = {
    url,
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  }

  return axios(param).then(
    (res) => {
      if (res.data.err_code === 0) {
        if (toast) {
          // Feedback.toast.success(res.data.err_msg)
          Message.success({ content: typeof res.data.err_msg === 'string' ? res.data.err_msg : '请求成功' })
        }
        if (sucFun !== null) {
          sucFun(res.data)
        }
      } else if (res.data.err_code === 88888) { // 登录处理
        // const history = createHashHistory()
        Message.error({ content: res.data.err_code + ': ' + res.data.err_msg, duration: 3 })
        if (failFun !== null) {
          failFun(res.data)
        }
        setToken('')
        router.push('/login')
      } else {
        if (toast) {
          // Feedback.toast.error(res.data.err_msg)
          Message.error({ content: res.data.err_code + ': ' + res.data.err_msg })
        }
        if (failFun !== null) {
          failFun(res.data)
        }
      }
    }
  ).catch(
    () => {
      if (toast) {
        Message.error({ content: '请求失败' })
      }
      if (failFun !== null) {
        failFun()
      }
    }
  )
}

// 日志json转成html
export function json_msg (data) {
  let str = ''
  try {
    let obj = JSON.parse(data)
    if (typeof obj === 'object') {
      str += '<span class="symbol">{</span><ul>'
      for (let key in obj) {
        str += '<li>'
        str += '<span class="property">"<span class="p">' + key +
          '</span>"</span><span class="symbol"> : </span><span class="string">' +
          json_msg(JSON.stringify(obj[key])) + '</span>'
        str += '</li>'
      }
      str += '</ul><span class="symbol">}</span>'
    } else {
      str += '"' + obj + '"<span class="symbol">,</span>'
    }
  } catch (error) {
    str = data
  }
  return str
}

/**
 *
 * @param value 值
 * @param decimal 保留小数位数
 * @param sign 是否支持负数 传'-'支持 , 不传只支持正数
 */
export function clearNoNum (value, decimal, sign) {
  if (value !== '' && value.substr(0, 1) === '.') {
    value = ''
  }
  if (sign === '-') {
    if (value.substr(0, 1) === '-' && value.substr(1, 1) === '.') {
      value = '-'
    }
  }
  value = value.replace(/^0*(0\.|[1-9])/, '$1') // 解决 粘贴不生效

  if (sign === '-') {
    value = value.replace(/[^\d.-]/g, '') // 清除“数字”和“.”"-"以外的字符
  } else {
    value = value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  }

  value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  if (sign === '-') {
    value = value.replace(/^-{2,}/g, '-') // 只保留第一个- 清除多余的
  }
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')

  if (sign === '-') {
    value = value.replace('-', '$#$').replace(/-/g, '').replace('$#$', '-')
  }

  if (decimal === 3) {
    value = value.replace(/^(-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3')// 只能输入三个小数
  } else {
    value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数
  }

  if (sign === '-' && value.indexOf('-') > 0) {
    value = value.substr(0, value.indexOf('-'))
  }

  if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (value.substr(0, 1) === '0' && value.length === 2) {
      value = value.substr(1, value.length)
    }
  }
  if (sign === '-' && value.indexOf('-') > -1 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (value.substr(0, 1) === '-' && value.length > 2 && value[1] === '0' && value[2] >= 0) {
      value = value.substr(0, 2)
    }
  }

  return value
}

export function dateFormat (value, type) {
  let d = new Date(value)
  if (type === 'datetime') {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getMinutes()
  } else {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }
}

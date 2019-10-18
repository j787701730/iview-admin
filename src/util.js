import axios from 'axios'
import { Message } from 'view-design'
import router from '@/router'

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
          Message.success({ content: res.data.err_msg })
        }
        if (sucFun !== null) {
          sucFun(res.data)
        }
      } else if (res.data.err_code === 88888) { // 登录处理
        // const history = createHashHistory()
        Message.error({ content: res.data.err_msg, duration: 3 })
        router.push('/login')
      } else {
        if (toast) {
          // Feedback.toast.error(res.data.err_msg)
          Message.error({ content: res.data.err_msg })
        }
        if (failFun !== null) {
          failFun(res.data)
        }
      }
    }
  ).catch(
    () => {
      if (toast) {
      // Feedback.toast.error('请求失败')
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

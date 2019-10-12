import axios from 'axios'
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
        }
        if (sucFun !== null) {
          sucFun(res.data)
        }
      } else if (res.data.err_code === 88888) { // 登录处理
        // const history = createHashHistory()
        history.push('/login')
      } else {
        // if (toast) {
        // Feedback.toast.error(res.data.err_msg)
        // }
        if (failFun !== null) {
          failFun(res.data)
        }
      }
    }
  ).catch(
    () => {
      // if (toast) {
      // Feedback.toast.error('请求失败')
      // }
      if (failFun !== null) {
        failFun()
      }
    }
  )
}

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
// import iView, { Message } from 'view-design'
import iView from 'view-design'
// import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import { setToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'

import { ajax } from '@/util'
// import Qs from 'qs'

const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) {
    // 有权限，可访问
    next()
  } else {
    next({ replace: true, name: 'error_401' })
  } // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // const token = getToken()
  // console.log('check-login')
  // console.log(token)
  // if (!token && to.name !== LOGIN_PAGE_NAME) {
  //   // 未登录且要跳转的页面不是登录页
  //   next({
  //     name: LOGIN_PAGE_NAME // 跳转到登录页
  //   })
  // } else if (!token && to.name === LOGIN_PAGE_NAME) {
  //   // 未登陆且要跳转的页面是登录页
  //   next() // 跳转
  // } else if (token && to.name === LOGIN_PAGE_NAME) {
  //   // 已登录且要跳转的页面是登录页
  //   next({
  //     name: homeName // 跳转到homeName页
  //   })
  // } else {
  //   if (store.state.user.hasGetInfo) {
  //     turnTo(to, store.state.user.access, next)
  //   } else {
  // 判断是否登录
  /**
   * 与GatewayWorker建立websocket连接，域名和端口改为你实际的域名端口，
   * 其中端口为Gateway端口，即start_gateway.php指定的端口。
   * start_gateway.php 中需要指定websocket协议，像这样
   * $gateway = new Gateway(websocket://0.0.0.0:7272);
   */
  // let ws = new WebSocket('wss://chenfeng.tech:8383')
  // // 服务端主动推送消息时会触发这里的onmessage
  // ws.onmessage = function (e) {
  //   // json数据转换成js对象
  //   console.log(JSON.parse(e.data))
  //   let data = JSON.parse(e.data)
  //   let type = data.type || ''
  //   switch (type) {
  //     // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
  //     case 'init':
  // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
  // $.post('./bind.php', {client_id: data.client_id}, function(data){}, 'json');
  // console.log(to.name)
  if (to.name === LOGIN_PAGE_NAME) {
    next()
  } else {
    ajax('/Adminrelas-Manage-getTest', {}, false,
      (data) => {
        let userInfo = {
          name: 'chenlh',
          user_id: '2',
          access: data.data,
          token: 'chenlh',
          avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
        }
        store.dispatch('setUserInfo', { userInfo }).then(res => {
          if (to.name === LOGIN_PAGE_NAME) {
            next({
              name: homeName // 跳转到homeName页
            })
          } else {
            turnTo(to, data.data, next)
          }
        })
      },
      () => {
        setToken('')
        next({
          name: 'login'
        })
      })
  }

  //     break
  //   // 当mvc框架调用GatewayClient发消息时直接alert出来
  //   case 'ping':
  //     ws.send('')
  //     break
  //   default :
  //     console.log(e.data)
  //     Message.error({ content: e.data })
  // }
  // }

  // ws.onclose = function (e) {
  //   console.log('onCLose', e)
  // }

  // store.dispatch('getUserInfo').then(user => {
  //   // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
  //   turnTo(to, user.access, next)
  // }).catch(() => {
  //   setToken('')
  //   next({
  //     name: 'login'
  //   })
  // })
  //   }
  // }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router

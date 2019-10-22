<style lang="less">
  @import "./login.less";
</style>

<template>
  <div class="login">
    <!-- <test :fun="fun" @fun2="fun2" :value="value"></test> -->
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <p slot="title" style="font-size: 20px;text-align: center">欢迎登录</p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :disabled="disabled"></login-form>
          <p class="login-tip">(请不要在公共电脑记住密码)</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { ajax } from '@/util'
import Qs from 'qs'

export default {
  data () {
    return {
      disabled: false
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo', 'setUserInfo']),
    handleSubmit ({ userName, password }) {
      this.disabled = true
      // this.handleLogin({ userName, password }).then(res => {
      //   console.log(res)
      //   this.getUserInfo().then(res => {
      //     this.disabled = false
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   })
      // })
      // 修改 登录
      const data = Qs.stringify({ psw: password, username: userName })
      ajax('/Adminrelas-Index-loginCheck', data, true,
        (data) => {
          this.disabled = false
          ajax('/Adminrelas-Manage-getTest', data, false,
            (data) => {
              let userInfo = {
                name: userName,
                user_id: '2',
                access: data.data,
                token: userName,
                avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
              }
              this.setUserInfo({ userInfo }).then(res => {
                this.$router.push({
                  name: this.$config.homeName
                })
              })
            },
            () => {
              this.disabled = false
              // reject(err)
            })
        },
        () => {
          this.disabled = false
        })
    }
  }
}
</script>

<style>
</style>

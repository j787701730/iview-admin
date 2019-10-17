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
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit ({ userName, password }) {
      this.disabled = true
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.disabled = false
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style>
</style>

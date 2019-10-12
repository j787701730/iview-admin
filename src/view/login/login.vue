<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <!-- <test :fun="fun" @fun2="fun2" :value="value"></test> -->
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import Test from './test'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      value: '我要传值给子节点'
    }
  },
  components: {
    LoginForm,
    Test
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    fun (val) {
      console.log('我是父组件的方法')
      console.log(val)
    },
    fun2 (val) {
      console.log('我是父组件的方法2')
      console.log(val)
    }
  }
}
</script>

<style>
</style>

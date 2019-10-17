<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" size="large" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="20" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" size="large" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="18" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" size="large" :disabled="disabled" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    disabled: {
      type: Boolean
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 5, message: '账号不少于4位', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, message: '密码不少于4位', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>

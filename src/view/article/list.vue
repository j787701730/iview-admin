<!--<style lang="less">-->
<!--    @import "./login.less";-->
<!--</style>-->

<template>
  <div>
    <h1>文章列表</h1>
    <Button @click="getData">请求</Button>
  </div>
</template>

<script>
import { ajax } from '@/util'
import Qs from 'qs'

export default {
  data () {
    return {
      value: '我要传值给子节点'
    }
  },
  components: {},
  methods: {
    getData: () => {
      ajax('/Adminrelas-Logs-csLogs', {}, true,
        (data) => {
          console.log(data)
        },
        () => {
        })
    },
    login: () => {
      const data = Qs.stringify({ psw: '123456', username: 'zhengw' })
      ajax('/Index-loginCheck', data, true,
        (data) => {

        },
        () => {})
    }
  },
  mounted () {
    // this.getData()
  }
}
</script>

<style>
</style>

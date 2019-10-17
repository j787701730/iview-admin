<style type="less">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
</style>
<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="passwordModify">
          修改密码
        </DropdownItem>
        <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal v-model="passwordShow" className="vertical-center-modal" title="修改密码">
      <div>
        <Input v-model="oldPassword" type="password" size="large" placeholder="旧密码" autocomplete="off">
          <span slot="prepend">旧密码</span>
        </Input>
        <div style="color: #ed4014">{{oldPwdErr}}</div>
        <div style="height: 15px"></div>
        <Input type="password" size="large" v-model="newPassword" placeholder="新密码" autocomplete="off">
          <span slot="prepend">新密码</span>
        </Input>
        <div style="color: #ed4014">{{newPwdErr}}</div>
      </div>
      <div slot="footer">
        <Button type="default" @click="cancel">取消</Button>
        <Button type="primary" @click="ok">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      passwordShow: false,
      oldPassword: '',
      newPassword: '',
      oldPwdErr: '',
      newPwdErr: ''
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleSubmit () {

    },
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    ok: function () {
      if (this.oldPassword.trim() === '') {
        this.oldPwdErr = '请填写旧密码'
      } else if (this.newPassword.trim() === '') {
        this.oldPwdErr = ''
        this.newPwdErr = '请填写新密码'
      } else if (this.oldPassword === this.newPassword) {
        this.oldPwdErr = ''
        this.newPwdErr = '新密码跟旧密码不能相同'
      } else {
        this.oldPwdErr = ''
        this.newPwdErr = ''
        this.passwordShow = false
        // $.ajax({
        //   url: 'Adminrelas-UserManager-alterPwd',
        //   data: {
        //     'oldPsw': oldPsw,
        //     'newPsw': newPsw,
        //   },
        //   type: 'post',
        //   success: function (data) {
        //     if (data.err_code == 0) {
        //       layui.use('layer', function () {
        //         var layer = layui.layer;
        //         layer.msg('更改成功,正在跳转登录页', {icon: 1});
        //       })
        //       setTimeout('window.location.href = "Adminrelas"', 1500);
        //     }
        //     else {
        //       layui.use('layer', function () {
        //         var layer = layui.layer;
        //         layer.msg(data.err_msg, {icon: 2, time: 1500});
        //       })
        //     }
        //   }
        // })
      }
    },
    cancel: function () {
      this.passwordShow = false
    },
    passwordModify: function () {
      this.oldPwdErr = ''
      this.newPwdErr = ''
      this.passwordShow = true
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.logout()
          break
        case 'message':
          this.message()
          break
        case 'passwordModify':
          this.passwordModify()
          break
      }
    }
  }
}
</script>

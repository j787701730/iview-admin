<template>
  <div style="background: #fff">
    <Form ref="formValidate" :model="formValidate" autocomplete="off" class="user-form"
          @keydown.enter.native="handleSubmit" :rules="ruleValidate" :label-width="90">
      <input type="password" class="hide" id="loginPassword"/>
      <input type="text" class="hide" id="loginUserName"/>
      <div class="item-con">
        <div class="item-title">用户信息</div>
        <FormItem label="用户名" prop="name">
          <Input v-model="formValidate.name" placeholder="用户名长度必须大于2个字符，且小于20个字符"></Input>
        </FormItem>

        <FormItem label="真实名字" prop="realname">
          <Input v-model="formValidate.realname" placeholder="真实姓名"></Input>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input v-model="formValidate.phone" placeholder="电话"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" autocomplete="off" type="password" ref="password" placeholder="密码"
                 @on-blur="pwdBlur"></Input>
          <div class="ivu-form-item-error-tip">{{pwdErr}}</div>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPassword">
          <Input v-model="formValidate.confirmPassword" type="password" ref="confirmPassword" placeholder="确认密码"
                 @on-blur="pwdBlur2"></Input>
          <div class="ivu-form-item-error-tip">{{pwdErr2}}</div>
        </FormItem>
      </div>

      <div class="item-con">
        <div class="item-title">店铺信息</div>
        <FormItem label="店铺名称" prop="shopname">
          <Input v-model="formValidate.shopname" placeholder="店铺名称"></Input>
        </FormItem>

        <FormItem label="联系地址" prop="shop_province">
          <Input v-model="formValidate.shop_province" placeholder="联系地址"></Input>
        </FormItem>
        <FormItem label="详细地址" prop="phone">
          <Input v-model="formValidate.shopaddress" placeholder="详细地址"></Input>
        </FormItem>
      </div>

      <div class="item-con">
        <div class="item-title">有效时间</div>
        <FormItem label="生效时间" prop="eff_date">
          <DatePicker type="datetime" style="width: 100%" v-model="formValidate.eff_date" placeholder="Select date and time"></DatePicker>
        </FormItem>
        <FormItem label="失效时间" prop="exp_date">
          <DatePicker type="datetime" style="width: 100%" v-model="formValidate.exp_date" placeholder="Select date and time"></DatePicker>
        </FormItem>
      </div>

      <div class="item-con">
        <div class="item-title">注册礼物</div>
        <FormItem label="用户名" prop="name">
          <Input v-model="formValidate.name" placeholder="用户名长度必须大于2个字符，且小于20个字符"></Input>
        </FormItem>
      </div>

      <!--      <FormItem label="E-mail" prop="mail">-->
      <!--        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>-->
      <!--&lt;!&ndash;        <div class="ivu-form-item-error-tip">真实姓名不能为空</div>&ndash;&gt;-->
      <!--      </FormItem>-->
      <!--      <FormItem label="City" prop="city">-->
      <!--        <Select v-model="formValidate.city" placeholder="Select your city">-->
      <!--          <Option value="beijing">New York</Option>-->
      <!--          <Option value="shanghai">London</Option>-->
      <!--          <Option value="shenzhen">Sydney</Option>-->
      <!--        </Select>-->
      <!--      </FormItem>-->
      <!--      <FormItem label="Date">-->
      <!--        <Row>-->
      <!--          <Col span="11">-->
      <!--            <FormItem prop="date" style="width: 100%">-->
      <!--              <DatePicker type="date" style="width: 100%" placeholder="Select date" v-model="formValidate.date"></DatePicker>-->
      <!--            </FormItem>-->
      <!--          </Col>-->
      <!--          <Col span="2" style="text-align: center">-</Col>-->
      <!--          <Col span="11">-->
      <!--            <FormItem prop="time" style="width: 100%">-->
      <!--              <TimePicker type="time" style="width: 100%" placeholder="Select time" v-model="formValidate.time"></TimePicker>-->
      <!--            </FormItem>-->
      <!--          </Col>-->
      <!--        </Row>-->
      <!--      </FormItem>-->
      <!--      <FormItem label="Gender" prop="gender">-->
      <!--        <RadioGroup v-model="formValidate.gender">-->
      <!--          <Radio label="male">Male</Radio>-->
      <!--          <Radio label="female">Female</Radio>-->
      <!--        </RadioGroup>-->
      <!--      </FormItem>-->
      <!--      <FormItem label="Hobby" prop="interest">-->
      <!--        <CheckboxGroup v-model="formValidate.interest">-->
      <!--          <Checkbox label="Eat"></Checkbox>-->
      <!--          <Checkbox label="Sleep"></Checkbox>-->
      <!--          <Checkbox label="Run"></Checkbox>-->
      <!--          <Checkbox label="Movie"></Checkbox>-->
      <!--        </CheckboxGroup>-->
      <!--      </FormItem>-->
      <!--      <FormItem label="Desc" prop="desc">-->
      <!--        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>-->
      <!--      </FormItem>-->
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
//   shopname: shop_name
//   shop_province: 2
//   service_city: 2001
//   service_region: 2001001
//   shopaddress: 朝阳区
//   roles[]: 101
// services[]: 11
// right_flag[]: 1
// right_flag[]: 7
// company_name:
//   tax_no:
//     eff_date: 2019-10-12 16:09:43
// exp_date: 2019-12-01 16:09:43
// present: 1
  name: 'users-add',
  data () {
    return {
      formValidate: {
        name: '',
        realname: '',
        phone: '',
        password: '',
        confirmPassword: '',
        shopname: '',
        shop_province: '',
        service_city: '',
        service_region: '',
        shopaddress: '',
        eff_date: '2019-10-12 16:09:43',
        exp_date: '2019-12-01 16:09:43',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      pwdErr: '',
      pwdErr2: '',
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { validator: this.validatePass1, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
          // { validator: this.validatePass, trigger: 'blur' }
        ],
        shopname: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        shopaddress: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        eff_date: [
          { required: true, type: 'date', message: '生效日期不能为空', trigger: 'change' }
        ],
        exp_date: [
          { required: true, type: 'date', message: '失效日期不能为空', trigger: 'change' }
        ],

        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    repwd: function (className, text) {
      this.$refs.password.$parent.$el.className = className ? 'ivu-form-item ivu-form-item-required'
        : 'ivu-form-item ivu-form-item-required ivu-form-item-error'
      this.pwdErr = text || ''
    },
    repwd2: function (className, text) {
      this.$refs.confirmPassword.$parent.$el.className = className ? 'ivu-form-item ivu-form-item-required'
        : 'ivu-form-item ivu-form-item-required ivu-form-item-error'
      this.pwdErr2 = text || ''
    },
    pwdBlur: function (className, text) {
      if (this.formValidate.password && this.formValidate.password !== this.formValidate.confirmPassword) {
        this.repwd('', '两次密码不一致')
      } else {
        this.repwd('error')
        this.repwd2('error')
      }
    },
    pwdBlur2: function () {
      if (this.formValidate.confirmPassword && this.formValidate.password !== this.formValidate.confirmPassword) {
        this.repwd2('', '两次密码不一致')
      } else {
        this.repwd('error')
        this.repwd2('error')
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid && this.formValidate.password === this.formValidate.confirmPassword) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.repwd('error')
      this.repwd2('error')
    },
    validatePass1 (rule, value, callback) {
      // console.log(rule)
      // console.log(value)
      this.pwdType = 0
      if (value === '' || value !== this.formValidate.confirmPassword) {
        callback(new Error('两次输入不一致'))
      } else {
        callback()
      }

      // else if (value === this.formValidate.password && this.pwdType === 1) {
      //   this.$refs.confirmPassword.$refs.input.focus()
      //   this.$refs.confirmPassword.$refs.input.blur()
      // }

      // console.log(this.$refs.confirmPassword.$refs.input.blur())
    },
    validatePass (rule, value, callback) {
      // console.log(rule)
      // console.log(value)
      if (value === '' || value !== this.formValidate.password) {
        callback(new Error('两次输入不一致'))
      } else {
        callback()
      }

      // else if (value === this.formValidate.password) {
      //     this.$refs.password.$refs.input.focus()
      //     this.$refs.password.$refs.input.blur()
      //   }
    }

  }
}
</script>

<style scoped lang="less">
  .hide {
    width: 0;
    height: 0;
    color: #fff;
    border: none;
    position: absolute;
  }

  .item-con {
    border: 1px solid #ccc;
    margin-bottom: 15px;
    margin-left: 1px;

    & > div {
      width: 600px;
    }

    & > .item-title {
      font-weight: bold;
      background: #f5f5f5;
      padding: 8px 0 8px 15px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 15px;
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .item-con {
      & > div {
        width: 100%;
        padding-right: 10px;
      }

      & > .item-title {
        width: 100%;
      }
    }
  }

</style>

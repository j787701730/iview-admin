<!--<style lang="less">-->
<!--    @import "./login.less";-->
<!--</style>-->

<template>
  <div>
    <h1 style="margin-bottom: 10px;">文章列表</h1>
    <Button @click="getData">请求</Button>
    <div style="height: 15px"></div>
    <Table :columns="columns10" :data="data9" border></Table>
    <div style="height: 15px"></div>
    <Table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="name">
        <Input type="text" @click.native.stop="" v-model="editName" v-if="editIndex === index"/>
        <span v-else>{{ row.name }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="age">
        <Input type="text" @click.native.stop="" v-model="editAge" v-if="editIndex === index"/>
        <span v-else>{{ row.age }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="birthday">
        <Input type="text" @click.native.stop="" v-model="editBirthday" v-if="editIndex === index"/>
        <span v-else>{{ getBirthday(row.birthday) }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="address">
        <Input type="text" @click.native.stop="" v-model="editAddress" v-if="editIndex === index"/>
        <span v-else>{{ row.address }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)">保存</Button>
          &nbsp;<Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click.stop="handleEdit(row, index)">操作</Button>
        </div>
      </template>
    </Table>
    <div style="height: 15px;"></div>
    <Form :label-width="70" @submit.native.prevent="">
      <Row>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="用户">
            <Input v-model="searchData.user_name" placeholder=""></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="IP地址">
            <Input v-model="searchData.ip" placeholder=""></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="错误码">
            <Input v-model="searchData.err_code" placeholder=""></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="访问路径">
            <Input v-model="searchData.url" placeholder=""></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="操作时间">
            <Row>
              <Col span="11">
                <FormItem style="width: 100%">
                  <DatePicker type="date" style="width: 100%" v-model="searchData.create_date_min"></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem style="width: 100%">
                  <DatePicker type="date" style="width: 100%" v-model="searchData.create_date_max"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div style="text-align: center;margin: 0 0 15px 0">
      <Button type="primary" @click="search" icon="ios-search">搜索</Button>
    </div>
    <Table :columns="logsCol" :data="logs">
      <template slot-scope="{ row, index }" slot="in_param">
        <div class="param-con" @mouseleave="outParamMouseLeave">
          <div class="param-msg" @mouseenter="outParamMouseEnter(row, 'in', $event)">{{row.in_param}}</div>
          <div class="json-con">
            <div v-html="jsonData"></div>
          </div>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="out_param">
        <div class="param-con" @mouseleave="outParamMouseLeave">
          <div class="param-msg" @mouseenter="outParamMouseEnter(row, 'out', $event)">{{row.out_param}}</div>
          <div class="json-con">
            <div v-html="jsonData"></div>
          </div>
        </div>
      </template>
    </Table>
    <Page style="text-align: center;margin-top: 15px" v-show="count" :total="count" show-total :current="curr_page" @on-change="pageChange"
          :page-size="page_count"/>
  </div>
</template>

<script>
import { ajax, json_msg } from '@/util'
import Qs from 'qs'
import expandRow from './table-expand.vue'
import { on, off } from '@/libs/tools'

export default {
  data () {
    return {
      value: '我要传值给子节点',
      jsonData: '',
      curr_page: 1,
      page_count: 20,
      param: {},
      count: 0,
      searchData: {
        user_name: '',
        ip: '',
        err_code: '',
        url: '',
        create_date_min: '',
        create_date_max: ''
      },
      logsCol: [{
        title: '用户',
        key: 'login_name'
      }, {
        title: '输入参数',
        slot: 'in_param'
      }, {
        title: '访问路径',
        key: 'url'
      }, {
        title: '输出参数',
        slot: 'out_param'
      }, {
        title: 'IP地址',
        key: 'ip'

      }, {
        title: '操作时间',
        key: 'create_date'

      }],
      logs: [],
      columns10: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: 'Name',
          key: 'name',
          width: 100,
          resizable: true
        },
        {
          title: 'Age',
          key: 'age',
          width: 200,
          resizable: true
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data9: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          job: 'Data engineer',
          interest: 'badminton',
          birthday: '1991-05-14',
          book: 'Steve Jobs',
          movie: 'The Prestige',
          music: 'I Cry',
          children: [
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              job: 'Data engineer',
              interest: 'badminton',
              birthday: '1991-05-14',
              book: 'Steve Jobs',
              movie: 'The Prestige',
              music: 'I Cry'
            },
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              job: 'Data engineer',
              interest: 'badminton',
              birthday: '1991-05-14',
              book: 'Steve Jobs',
              movie: 'The Prestige',
              music: 'I Cry'
            }
          ]
        },
        {
          name: 'Jim Green',
          age: 25,
          address: 'London No. 1 Lake Park',
          job: 'Data Scientist',
          interest: 'volleyball',
          birthday: '1989-03-18',
          book: 'My Struggle',
          movie: 'Roman Holiday',
          music: 'My Heart Will Go On'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          job: 'Data Product Manager',
          interest: 'tennis',
          birthday: '1992-01-31',
          book: 'Win',
          movie: 'Jobs',
          music: 'Don’t Cry'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          job: 'Data Analyst',
          interest: 'snooker',
          birthday: '1988-7-25',
          book: 'A Dream in Red Mansions',
          movie: 'A Chinese Ghost Story',
          music: 'actor'
        }
      ],
      columns: [
        {
          title: '姓名',
          slot: 'name'
        },
        {
          title: '年龄',
          slot: 'age'
        },
        {
          title: '出生日期',
          slot: 'birthday'
        },
        {
          title: '地址',
          slot: 'address'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: '', // 第二列输入框
      editBirthday: '', // 第三列输入框
      editAddress: '' // 第四列输入框
    }
  },
  components: {},
  methods: {
    search: function () {
      this.curr_page = 1
      for (let o in this.searchData) {
        if (this.searchData[o].trim()) {
          this.param[o] = this.searchData[o].trim()
        } else {
          delete this.param[o]
        }
      }
      this.getData()
    },
    getData: function () {
      ajax('/Adminrelas-Logs-csLogs', Qs.stringify({
        curr_page: this.curr_page,
        page_count: this.page_count,
        param: JSON.stringify(this.param)
      }), true,
      (data) => {
        // console.log(data)
        this.logs = data.data
        this.count = Number(data.count)
      },
      () => {
      })
    },
    login: function () {
      const data = Qs.stringify({ psw: '123456', username: 'zhengw' })
      ajax('/Index-loginCheck', data, true,
        (data) => {

        },
        () => {
        })
    },
    handleEdit (row, index) {
      this.editName = row.name
      this.editAge = row.age
      this.editAddress = row.address
      this.editBirthday = row.birthday
      this.editIndex = index
    },
    handleSave (index) {
      this.data[index].name = this.editName
      this.data[index].age = this.editAge
      this.data[index].birthday = this.editBirthday
      this.data[index].address = this.editAddress
      this.editIndex = -1
    },
    getBirthday (birthday) {
      const date = new Date(parseInt(birthday))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    },
    docClick: function () {
      this.editIndex = -1
    },
    pageChange: function (val) {
      console.log(val)
      this.curr_page = val
      this.getData()
    },
    outParamMouseEnter: function (row, type, e) {
      if (type === 'in') {
        this.jsonData = json_msg(row.in_param.replace(/[\r\n]/g, ''))
      } else {
        this.jsonData = json_msg(row.out_param.replace(/[\r\n]/g, ''))
      }

      let idx = row._index
      if (idx > this.logs.length - 5 && idx > 5) {
        e.target.parentNode.querySelector('.json-con').className = 'json-con json-con-bottom'
      } else {
        e.target.parentNode.querySelector('.json-con').className = 'json-con json-con-top'
      }
      e.target.parentNode.querySelector('.json-con').style.display = 'block'
    },
    outParamMouseLeave: function (e) {
      e.target.parentNode.querySelector('.json-con').style.display = 'none'
    }
  },
  mounted () {
    // this.getData()
    this.getData()
    on(document, 'click', this.docClick)
  },
  beforeDestroy () {
    off(document, 'click', this.docClick)
  }
}
</script>

<style lang="less">
  .ivu-form-item {
    margin-bottom: 10px;
  }
.ivu-table-cell{
  overflow: initial;
}
  .param-msg {
    height: 40px;
    overflow: auto;
    cursor: pointer;
    word-break: break-all;
  }

  .param-msg::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }

  /*定义滚动条的轨道，内阴影及圆角*/
  .param-msg::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  /*定义滑块，内阴影及圆角*/
  .param-msg::-webkit-scrollbar-thumb {
    /*width: 10px;*/
    height: 20px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #C1C1C1;
  }

  .param-con {
    position: relative;
    padding: 10px 0;
  }

  .json-con {
    position: absolute;
    left: -1px;
    border: 1px solid #f40;
    padding: 10px;
    background-color: #fff;
    z-index: 10;
    width: 400px;
    display: none;
  }

  .json-con li {
    list-style: none;
  }

  .json-con > div {
    max-height: 300px;
    overflow: auto;
  }

  .json-con-top {
    top: 56px;
  }

  .json-con-top::before {
    content: '';
    position: absolute;
    left: 20px;
    top: -16px;
    border: 8px solid transparent;
    border-bottom-color: #f40;
  }

  .json-con-bottom {
    bottom: 56px;
  }

  .json-con-bottom::before {
    content: '';
    position: absolute;
    border: 8px solid transparent;
    border-top-color: #f40;
    left: 20px;
    bottom: -16px;
  }

  .property {
    color: #204a87;
    font-weight: bold;
  }

  .string {
    color: #4e9a06;
    font-weight: bold;
  }

  .symbol {
    color: #333;
    font-weight: bold;
  }

  .json-con ul {
    margin-left: 15px;
  }
</style>

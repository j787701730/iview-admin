<!--<style lang="less">-->
<!--    @import "./login.less";-->
<!--</style>-->

<template>
  <div>
    <h1 style="margin-bottom: 10px;">文章列表</h1>
    <!--    <Button @click="getData">请求</Button>-->
    <!--    <div style="height: 15px"></div>-->
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
          <div class="param-msg" @mouseenter="outParamMouseEnter(row, 'in')">{{row.in_param}}</div>
          <div :class="logMsgClass" v-show="logID==row.log_id+'in'">
            <div v-html="jsonData"></div>
          </div>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="out_param">
        <div class="param-con" @mouseleave="outParamMouseLeave">
          <div class="param-msg" @mouseenter="outParamMouseEnter(row, 'out')">{{row.out_param}}</div>
          <div :class="logMsgClass" v-show="logID==row.log_id+'out'">
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

export default {
  data () {
    return {
      value: '我要传值给子节点',
      jsonData: '',
      curr_page: 1,
      page_count: 20,
      param: {},
      count: 0,
      logID: '',
      logMsgClass: '',
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
      logs: []
    }
  },
  components: {},
  methods: {
    search: function () {
      this.curr_page = 1
      for (let o in this.searchData) {
        if (this.searchData.hasOwnProperty(o)) {
          if (this.searchData[o].trim()) {
            this.param[o] = this.searchData[o].trim()
          } else {
            delete this.param[o]
          }
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
        this.logs = data.data
        this.count = Number(data.count)
      },
      () => {
      })
    },
    pageChange: function (val) {
      this.curr_page = val
      this.getData()
    },
    outParamMouseEnter: function (row, type) {
      if (type === 'in') {
        this.jsonData = json_msg(row.in_param.replace(/[\r\n]/g, ''))
      } else {
        this.jsonData = json_msg(row.out_param.replace(/[\r\n]/g, ''))
      }
      this.logID = row.log_id + type
      let idx = row._index
      if (idx > this.logs.length - 5 && idx > 5) {
        this.logMsgClass = { 'json-con': true, 'json-con-bottom': true }
      } else {
        this.logMsgClass = { 'json-con': true, 'json-con-top': true }
      }
    },
    outParamMouseLeave: function () {
      this.logID = ''
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less">
  .ivu-form-item {
    margin-bottom: 10px;
  }

  .ivu-table-cell {
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
    padding: 8px 0;
  }

  .json-con {
    position: absolute;
    left: -1px;
    border: 1px solid #f40;
    padding: 10px;
    background-color: #fff;
    z-index: 10;
    width: 400px;
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

  .json-con-bottom {
    bottom: 56px;
  }

  .json-con-top::before {
    content: '';
    position: absolute;
    left: 20px;
    top: -16px;
    border: 8px solid transparent;
    border-bottom-color: #f40;
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

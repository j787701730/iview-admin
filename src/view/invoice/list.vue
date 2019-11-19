<style lang="less" scoped>
  .ivu-form-item {
    margin-bottom: 10px;
  }

  .ivu-table-cell {
    overflow: initial;
  }

  .logs-card {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .logs-table {
      display: none;
    }

    .logs-card {
      display: block;
    }

    .logs-card-item {
      border: 1px solid #ddd;
      margin-bottom: 15px;
      padding: 10px 0;
    }

    .log-name {
      width: 70px;
      text-align: right;
      display: inline-block;
      padding-right: 12px;
      vertical-align: top;
    }

    .log-value {
      width: ~'calc(100% - 80px)';
      display: inline-block;
      word-break: break-all;
      vertical-align: top;
    }
  }
</style>
<template>
  <div>
    <Form :label-width="70" @submit.native.prevent="">
      <Row>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="用户">
            <Input v-model="searchData.user_name" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="开具人员">
            <Input v-model="searchData.issue_user" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="发票状态">
            <Select v-model="searchData.invoice_state" filterable>
              <Option v-for="(val,k) in state" :value="k" :key="val">{{ val }}</Option>
            </Select>
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
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="开具时间">
            <Row>
              <Col span="11">
                <FormItem style="width: 100%">
                  <DatePicker type="datetime" style="width: 100%" v-model="searchData.issue_date_min"></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem style="width: 100%">
                  <DatePicker type="datetime" style="width: 100%" v-model="searchData.issue_date_max"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="4" :md="6">
          <FormItem label="金额区间">
            <Row>
              <Col span="11">
                <FormItem style="width: 100%">
                  <Input @keydown.enter.native="search" v-model="searchData.amount_min" @on-change="amountChange('min')"></Input>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem style="width: 100%">
                  <Input @keydown.enter.native="search" v-model="searchData.amount_max" @on-change="amountChange"></Input>
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
    <div style="margin-bottom: 10px;text-align: right">
      <span style="vertical-align: middle">共 {{count}} 条</span>
      <Page style="display: inline-block;vertical-align: middle" v-show="count>param.page_count" :total="count" show-total
            :current="param.curr_page"
            @on-change="pageChange"
            :page-size="param.page_count" simple/>
    </div>
    <Table :columns="logsCol" :loading="loading" :data="logs" class="logs-table" @on-sort-change="orderBy">
      <template slot-scope="{ row, index }" slot="invoice_state">
        <span>{{state[row.invoice_state]}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="option">
        <Button size="small" type="primary" v-if="row.invoice_state == 1" @click="openLayer(row, true)">开票</Button>
        <Button size="small" type="primary" @click="openLayer(row, false)" v-else>查看</Button>
      </template>
    </Table>
    <div class="logs-card">
      <div v-for="log in logs" :key="log.log_id" class="logs-card-item">
        <template v-for="row in logsCol">
          <div :key="row.key">
            <div class="log-name">{{row.title}}</div>
            <div class="log-value" v-if="row.key === 'option'">
              <Button size="small" type="primary" v-if="log.invoice_state == 1" @click="openLayer(log, true)">开票</Button>
              <Button size="small" type="primary" @click="openLayer(log, false)" v-else>查看</Button>
            </div>
            <div class="log-value" v-else-if="row.key==='invoice_state'">{{state[log.invoice_state]}}</div>
            <div class="log-value" v-else>{{log[row.key]}}</div>
          </div>
        </template>
      </div>
    </div>
    <Page style="text-align: center;margin-top: 15px" v-show="count" :total="count" show-total :current="param.curr_page"
          @on-change="pageChange"
          :page-size="param.page_count"/>
    <Modal
        v-model="logModalShow"
        :title="'申请人：'+selectRow.login_name+ ' 申请企业：'+selectRow.shop_name"
        footer-hide
    >
      <Row>
        <Col span="24" style="text-align: center">发票信息</Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">发票类型：</span>
          <span>{{selectRowDetail.invoice_info.invoice_type_name}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">开票日期：</span>
          <span>{{selectRowDetail.invoice.issue_date}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">发票抬头：</span>
          <span>{{selectRowDetail.invoice_info.invoice_header}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">开具类型：</span>
          <span>{{selectRowDetail.invoice_info.issue_type_name}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">纳税人识别码：</span>
          <span>{{selectRowDetail.invoice_info.tax_no}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">注册固定电话：</span>
          <span>{{selectRowDetail.invoice_info.phone}}</span>
        </Col>
        <Col :xs=24 :sm=24>
          <span style="font-weight: bold">企业地址：</span>
          <span>{{selectRowDetail.invoice_info.address}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">银行：</span>
          <span>{{selectRowDetail.invoice_info.bank_name}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">银行账号：</span>
          <span>{{selectRowDetail.invoice_info.bank_no}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">金额：</span>
          <span>{{selectRowDetail.invoice.amount}}元</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">申请时间：</span>
          <span>{{selectRowDetail.invoice_info.create_date}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">更新时间：</span>
          <span>{{selectRowDetail.invoice_info.update_date}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">邮编：</span>
          <span>{{selectRowDetail.invoice_info.postcode}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">收件人：</span>
          <span>{{selectRowDetail.invoice_info.receiver}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">收件人手机号：</span>
          <span>{{selectRowDetail.invoice_info.telephone}}</span>
        </Col>
        <Col :xs=24 :sm=12>
          <span style="font-weight: bold">邮箱：</span>
          <span>{{selectRowDetail.invoice_info.mail}}</span>
        </Col>
        <Col :xs=24 :sm=24>
          <span style="font-weight: bold">收件地址：</span>
          <span>{{selectRowDetail.invoice_info.addr}}</span>
        </Col>
      </Row>
      <Form :label-width="80" @submit.native.prevent="" v-show="invoiceState">
        <Row>
          <Col :xs="24">
            <FormItem>
              <span slot="label"><span style="color: red">*</span><span> 发票号:</span></span>
              <Input v-model="drawInvoice.invoice_no" clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="24">
            <FormItem label="开具备注:">
              <Input v-model="drawInvoice.comments" type="textarea" :rows="3" clearable :autosize="false"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24" style="text-align: center">
            <Button type="primary" @click="drawInvoiceAjax">确认开票</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span="24" style="text-align: center;line-height: 34px;margin-top: 10px">项目详细数据</Col>
        <Table :columns="acctItemCol" :data="selectRowDetail.acct_item" border size="small"></Table>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { ajax, clearNoNum, dateFormat } from '@/util'
import Qs from 'qs'

export default {
  name: 'invoice-list',
  data () {
    return {
      state: {
        '0': '全部',
        '1': '待开发票',
        '2': '已开发票'
      },
      loading: false,
      logModalShow: false,
      selectRow: '',
      selectRowDetail: {
        invoice_info: {},
        invoice: {},
        acct_item: []
      },
      invoiceState: '',
      drawInvoice: {
        invoice_id: '',
        comments: '',
        invoice_no: ''
      },
      order: {},
      param: {
        curr_page: 1,
        page_count: 20
      },
      count: 0,
      searchData: {
        user_name: '',
        ip: '',
        err_code: '',
        url: '',
        create_date_min: '',
        create_date_max: '',
        invoice_state: '0',
        issue_user: '',
        amount_min: '',
        amount_max: ''
      },
      acctItemCol: [{
        title: '名称',
        key: 'item_type_name'
      }, {
        title: '金额(元)',
        key: 'amount'
      }],
      logsCol: [{
        title: '用户',
        key: 'login_name',
        sortable: 'custom'
      }, {
        title: '企业',
        key: 'shop_name',
        sortable: 'custom'
      }, {
        title: '金额(元)',
        key: 'amount',
        sortable: 'custom'
      }, {
        title: '申请时间',
        key: 'create_date',
        sortable: 'custom'
      }, {
        title: '开票状态',
        key: 'invoice_state',
        slot: 'invoice_state',
        sortable: 'custom'
      }, {
        title: '开票时间',
        key: 'issue_date',
        sortable: 'custom'
      }, {
        title: '开具人员',
        key: 'issue_user_name',
        sortable: 'custom'
      }, {
        title: '备注',
        key: 'comments'
      }, {
        title: '操作',
        width: 70,
        align: 'center',
        key: 'option',
        slot: 'option'
      }],
      logs: []
    }
  },
  components: {},
  methods: {
    search: function (e) {
      e.target.blur()
      this.param.curr_page = 1
      for (let o in this.searchData) {
        if (this.searchData.hasOwnProperty(o)) {
          if (this.searchData[o]) {
            if (o === 'create_date_min' || o === 'create_date_max') {
              this.param[o] = dateFormat(this.searchData[o])
            } else if (o === 'issue_date_min' || o === 'issue_date_max') {
              this.param[o] = dateFormat(this.searchData[o], 'datetime')
            } else {
              this.param[o] = this.searchData[o]
            }
          } else {
            delete this.param[o]
          }
        }
      }
      this.getData()
    },
    getData: function () {
      if (this.order && this.order.order && this.order.order !== 'normal') {
        this.param.order = this.order.key + ' ' + this.order.order
      }
      this.loading = true
      ajax('/Adminrelas-Invoice-getlists', Qs.stringify({ param: JSON.stringify(this.param) }), true,
        (data) => {
          this.loading = false
          this.logs = data.data
          this.count = Number(data.count)
        },
        () => {
          this.loading = false
        })
    },
    pageChange: function (val) {
      this.param.curr_page = val
      this.getData()
    },
    cancel: function () {
      this.logModalShow = false
    },
    orderBy: function ({ column, key, order }) {
      this.order = {
        key: key,
        order: order
      }
      this.getData()
    },
    openLayer: function (row, type) {
      this.selectRow = row
      this.invoiceState = type
      ajax('/Adminrelas-Invoice-detail', Qs.stringify({ invoice_id: this.selectRow.invoice_id }), false, (res) => {
        this.selectRowDetail = res.data
        this.logModalShow = true
      }, () => {

      })
    },
    drawInvoiceAjax: function () {
      this.drawInvoice.invoice_id = this.selectRow.invoice_id
      console.log(this.drawInvoice)
    },
    amountChange: function (type) {
      let ths = this
      setTimeout(function () {
        if (type === 'min') {
          ths.$set(ths.searchData, 'amount_min', clearNoNum(ths.searchData.amount_min))
        } else {
          ths.$set(ths.searchData, 'amount_max', clearNoNum(ths.searchData.amount_max))
        }
      }, 100)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

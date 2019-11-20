<template>
  <div>
    <Form :label-width="70" @submit.native.prevent="">
      <Row>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <FormItem label="店铺名称">
            <Input v-model="param.shopName" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <FormItem label="公司名称">
            <Input v-model="param.company_name" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <FormItem label="信用代码">
            <Input v-model="param.tax_no" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <FormItem label="创建时间">
            <date_plugin :dateType="dateType" @send="getDatePlugin"></date_plugin>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <city_select_plugin label="店铺地址" :areaObj="shop_city_data" @send="getShopAreaData"></city_select_plugin>
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <city_select_plugin label="服务地址" :areaObj="service_city_data" @send="getAreaData"></city_select_plugin>
        </Col>
      </Row>
    </Form>
    <div style="text-align: center;margin: 0 0 15px 0">
      <Button type="primary" @click="search" icon="ios-search">搜索</Button>
      <Button icon="md-download" :loading="exportLoading" @click="exportExcel" style="margin-left: 10px;">导出EXCEL</Button>
    </div>
    <div style="margin-bottom: 10px;text-align: right">
      <span style="vertical-align: middle">共 {{count}} 条</span>
      <Page style="display: inline-block;vertical-align: middle" v-show="count>param.limit" :total="count" show-total :current="param.page"
            @on-change="pageChange"
            :page-size="param.limit" simple/>
    </div>
    <Table :columns="logsCol" :data="logs" class="logs-table" @on-sort-change="orderBy" :loading="loading">
      <template slot-scope="{ row, index }" slot="role_id">
        <div @click="roleManger(row)">
          <template v-for="role in row.role_id.split(',')">
            <div class="role-item" :title="roles[role].role_ch_name" :key="role">{{roles[role].role_ch_name}}</div>
          </template>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="login_name">
        <span style="color: #2d8cf0;cursor: pointer" @click="openStaffModal(row)">{{row.login_name}}</span>
      </template>

      <template slot-scope="{ row, index }" slot="state">
        <span style="padding: 3px 5px;background-color: #5cb85c;color: #fff">{{shop_state[row.state]}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="option">
        <Button v-if="Number(row.state) === -2" type="primary" @click="stateChange(row)" size="small">解冻</Button>
        <Button v-else-if="Number(row.state) === 1 || Number(row.state) === -1" type="warning" @click="stateChange(row)" size="small">冻结
        </Button>
      </template>
    </Table>
    <div class="logs-table-m">
      <div v-for="(row, index ) in logs" :key="row.shop_id" class="logs-card-item">
        <div>
          <div class="log-name">店铺名称</div>
          <div class="log-value">{{row.shop_name}}</div>
        </div>
        <div>
          <div class="log-name">店铺地址</div>
          <div class="log-value">{{row.shop_address}}</div>
        </div>
        <div>
          <div class="log-name">店铺角色</div>
          <div class="log-value" @click="roleManger(row,index)">
            <template v-for="role in row.role_id.split(',')">
              <div class="role-item" :title="roles[role].role_ch_name" :key="role">{{roles[role].role_ch_name}}</div>&nbsp;
            </template>
          </div>
        </div>
        <div>
          <div class="log-name">公司名称</div>
          <div class="log-value" style="color: #2d8cf0;cursor: pointer" @click="openStaffModal(row)">{{row.login_name}}</div>
        </div>
        <div>
          <div class="log-name">信用代码</div>
          <div class="log-value">{{row.tax_no}}</div>
        </div>
        <div>
          <div class="log-name">收藏次数</div>
          <div class="log-value">{{row.collect_times}}</div>
        </div>
        <div>
          <div class="log-name">创建时间</div>
          <div class="log-value">{{row.create_date}}</div>
        </div>
        <div>
          <div class="log-name">更新时间</div>
          <div class="log-value">{{row.update_date}}</div>
        </div>
        <div>
          <div class="log-name">状态</div>
          <div class="log-value"><span style="padding: 3px 5px;background-color: #5cb85c;color: #fff">{{shop_state[row.state]}}</span></div>
        </div>
        <div style="margin-top: 6px;">
          <div class="log-name">操作</div>
          <div class="log-value">
            <Button v-if="Number(row.state) === -2" type="primary" @click="stateChange(row, index)" size="small">解冻</Button>
            <Button v-else-if="Number(row.state) === 1 || Number(row.state) === -1" type="warning" @click="stateChange(row, index)" size="small">
              冻结
            </Button>
          </div>
        </div>
      </div>
    </div>

    <Page style="text-align: center;margin-top: 15px" v-show="count" :total="count" show-total :current="param.page"
          @on-change="pageChange"
          :page-size="param.limit"/>
    <Modal
        v-model="roleMangerShow"
        title="权限管理"
    >
      <CheckboxGroup v-model="roleMangerData">
        <template v-for="(data, k) in roles">
          <Checkbox :title="data.comments" :key="k" :label="k" style="margin-right: 20px;">{{data.role_ch_name}}</Checkbox>
        </template>
      </CheckboxGroup>
      <div slot="footer">
        <Button type="default" @click="roleMangerShow=false">取消</Button>
        <Button type="primary" @click="roleMangerOk">提交</Button>
      </div>
    </Modal>
    <Modal
        v-model="stateModalShow"
        title="系统提示"
        width=300
    >
      <p>{{stateMsg}}</p>
      <div slot="footer">
        <Button type="default" @click="stateModalShow=false">取消</Button>
        <Button type="primary" @click="stateChangeOk">提交</Button>
      </div>
    </Modal>
    <Modal
        v-model="staffModalShow"
        title="店铺员工"
        footer-hide
    >
      <Table :columns="staffCol" :data="staffData.staff.data">
        <template slot-scope="{ row, index }" slot="state">
          <span>{{userState[row.state]}}</span>
        </template>
      </Table>
      <Page style="text-align: center;margin-top: 15px" v-show="staffCount" :total="staffCount" show-total :current="param.curr_page"
            @on-change="pageStaffChange"
            :page-size="staffParam.page_count"/>
    </Modal>
  </div>
</template>

<script>

import { ajax, dateFormat } from '@/util'
import excel from '@/libs/excel'
import Qs from 'qs'
import date_plugin from '@/view/plugins/date_plugin'
import city_select_plugin from '@/view/components/city_select_plugin'

export default {
  name: 'cs-logs',
  data () {
    return {
      dateType: 'date',
      exportLoading: false,
      loading: false,
      userState: {
        0: '冻结',
        1: '在用'
      },
      staffCount: 0,
      stateMsg: '',
      stateModalShow: false,
      roleMangerShow: false,
      roleMangerData: [],
      selectRoleRow: '',
      selectRoleIndex: '',
      staffModalShow: false,
      staffParam: {
        curr_page: 1,
        page_count: 10,
        shop_id: ''
      },
      staffData: {
        staff: {
          data: []
        }
      },
      shop_city_data: {
        province: '',
        city: '',
        region: ''
      },
      service_city_data: {
        province: '',
        city: '',
        region: ''
      },
      shop_state: {
        '-2': '被冻结',
        '-1': '已打烊',
        '0': '待审核',
        '1': '营业中'
      },
      roles: {
        '101': {
          'role_id': '101',
          'role_en_name': 'ROLE_TYPE_STORE',
          'role_ch_name': '销售门店',
          'can_apply': '1',
          'comments': '提供全方位的销售定制门店',
          'icon': 'icon-shopping-cart'
        },
        '102': {
          'role_id': '102',
          'role_en_name': 'ROLE_TYPE_SUPPLIER',
          'role_ch_name': '供货商',
          'can_apply': '1',
          'comments': '提供五金建材的供货服务',
          'icon': 'icon-truck'
        },
        '103': {
          'role_id': '103',
          'role_en_name': 'ROLE_TYPE_FACTORY',
          'role_ch_name': '加工工厂',
          'can_apply': '1',
          'comments': '提供定价加工服务',
          'icon': 'icon-gears'
        },
        '104': {
          'role_id': '104',
          'role_en_name': 'ROLE_TYPE_DESIGNER',
          'role_ch_name': '设计师',
          'can_apply': '1',
          'comments': '提供设计、测量等服务',
          'icon': 'icon-male'
        },
        '105': {
          'role_id': '105',
          'role_en_name': 'ROLE_TYPE_CONSTRUCTION',
          'role_ch_name': '工程施工',
          'can_apply': '1',
          'comments': '提供上门施工服务',
          'icon': 'icon-wrench'
        }
      },
      order: '',
      staffCol: [{
        title: '职员名称',
        key: 'login_name'
      }, {
        title: '所在部门',
        key: 'department_name'
      }, {
        title: '职工状态',
        slot: 'state',
        key: 'state'
      }, {
        title: '创建时间',
        key: 'register_time'
      }],
      param: {
        limit: 20,
        timemin: '',
        timemax: '',
        shopName: '',
        company_name: '',
        tax_no: '',
        page: 1
      },
      count: 0,
      logID: '',
      logMsgClass: '',
      logsCol: [{
        title: '店铺名字',
        key: 'shop_name'
      }, {
        title: '详细地址',
        key: 'shop_address'
      }, {
        title: '店铺角色',
        slot: 'role_id'
      }, {
        title: '店铺管理员',
        slot: 'login_name',
        key: 'login_name'
      },
      {
        title: '公司名称',
        key: 'company_name',
        sortable: 'custom'
      }, {
        title: '统一信用代码',
        key: 'tax_no',
        sortable: 'custom'
      }, {
        title: '收藏次数',
        key: 'collect_times',
        sortable: 'custom',
        width: 110
      }, {
        title: '创建时间',
        key: 'create_date',
        sortable: 'custom'
      }, {
        title: '更新时间',
        key: 'update_date',
        sortable: 'custom'
      }, {
        title: '状态',
        slot: 'state',
        key: 'state',
        sortable: 'custom',
        width: 90,
        align: 'center'
      },
      {
        title: '操作',
        slot: 'option',
        width: 70,
        align: 'center'
      }],
      logs: []
    }
  },
  components: {
    date_plugin, city_select_plugin
  },
  methods: {
    search: function (e) {
      e.target.blur()
      this.param.page = 1
      for (let o in this.param) {
        if (this.param.hasOwnProperty(o)) {
          if (this.param[o] && (o === 'timemin' || o === 'timemax')) {
            this.param[o] = dateFormat(this.param[o])
          }
        }
      }

      if (Number(this.shop_city_data.province)) {
        this.param.city = {}
        this.param.city.province = this.shop_city_data.province
        if (this.shop_city_data.city) {
          this.param.city.city = this.shop_city_data.city
        } else {
          delete this.param.city.city
        }
        if (this.shop_city_data.region) {
          this.param.city.region = this.shop_city_data.region
        } else {
          delete this.param.city.region
        }
      } else {
        delete this.param.city
      }

      if (Number(this.service_city_data.province)) {
        this.param.service_city = {}
        this.param.service_city.province = this.service_city_data.province
        if (this.service_city_data.city) {
          this.param.service_city.city = this.service_city_data.city
        } else {
          delete this.param.service_city.city
        }
        if (this.service_city_data.region) {
          this.param.service_city.region = this.service_city_data.region
        } else {
          delete this.param.service_city.region
        }
      } else {
        delete this.param.service_city
      }
      this.getData()
    },
    getData: function () {
      if (this.order && this.order.order && this.order.order !== 'normal') {
        this.param.order = this.order.key + ' ' + this.order.order
      } else {
        delete this.param.order
      }
      this.loading = true
      ajax('/Adminrelas-ShopsManage-shopsList', Qs.stringify(this.param), true,
        (data) => {
          this.loading = false
          this.logs = data.err_msg.data
          this.count = Number(data.err_msg.num)
        },
        () => {
          this.loading = false
        })
    },
    pageChange: function (val) {
      this.param.page = val
      this.getData()
    },
    cancel: function () {
      this.roleMangerShow = false
    },
    roleManger (row, index) {
      this.roleMangerData = row.role_id.split(',')
      this.selectRoleRow = row
      this.selectRoleIndex = index !== undefined ? index : row._index
      this.roleMangerShow = true
    },
    roleMangerOk: function () {
      if (this.roleMangerData.length === 0) {
        this.$Message.error('最少要选择一个店铺角色')
      } else {
        this.$Loading.start()
        ajax('/Adminrelas-ShopsManage-editUserRoleRel', Qs.stringify({
          uid: this.selectRoleRow.user_id,
          role_id: this.roleMangerData
        }), true,
        (data) => {
          this.$Loading.finish()
          this.roleMangerShow = false
          this.logs[this.selectRoleIndex].role_id = this.roleMangerData.join(',')
        },
        () => {
          this.$Loading.finish()
        })
      }
    },
    orderBy: function ({ column, key, order }) {
      this.order = {
        key: key,
        order: order
      }
      this.getData()
    },
    getShopAreaData: function (val) {
      this.shop_city_data = JSON.parse(JSON.stringify(val))
    },
    getAreaData: function (val) {
      this.service_city_data = JSON.parse(JSON.stringify(val))
    },
    stateChange: function (row, index) {
      if (Number(row.state) === -2) {
        this.stateMsg = '确认要解冻吗？'
      } else {
        this.stateMsg = '确认要冻结吗？'
      }
      this.selectRoleRow = row
      this.selectRoleIndex = index !== undefined ? index : row._index
      this.stateModalShow = true
    },
    stateChangeOk: function () {
      ajax('/Adminrelas-ShopsManage-editShopState', Qs.stringify({
        state: Number(this.selectRoleRow.state) === -2 ? 1 : -2,
        shopId: this.selectRoleRow.shop_id
      }), true,
      (data) => {
        this.logs[this.selectRoleIndex].state = Number(this.selectRoleRow.state) === -2 ? 1 : -2
        this.stateModalShow = false
      },
      () => {
      })
    },
    openStaffModal (row) {
      this.selectRoleRow = row
      this.staffParam.curr_page = 1
      this.getShopUserStaff()
    },
    getShopUserStaff () {
      this.staffParam.shop_id = this.selectRoleRow.shop_id
      ajax('/Adminrelas-ShopsManage-getShopUserStaff', Qs.stringify(this.staffParam), true,
        (data) => {
          this.staffData = data.data
          this.staffCount = Number(data.data.staff.count)
          this.staffModalShow = true
        },
        () => {
        })
    },
    pageStaffChange: function (val) {
      this.staffParam.curr_page = val
      this.getShopUserStaff()
    },
    getDatePlugin: function (val) {
      this.param.timemin = val.min ? dateFormat(val.min, this.dateType) : ''
      this.param.timemax = val.max ? dateFormat(val.max, this.dateType) : ''
    },
    exportExcel () {
      if (this.logs.length) {
        this.exportLoading = true
        const params = {
          title: ['店铺名字', '详细地址', '创建时间'],
          key: ['shop_name', 'shop_address', 'create_date'],
          data: this.logs,
          autoWidth: true,
          filename: '分类列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    }

  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less">
  .role-item {
    padding: 2px 0;
    color: #2d8cf0;
    cursor: pointer;
    display: inline-block;
    margin-right: 5px;
  }

  .logs-table-m {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .logs-table {
      display: none;
    }

    .logs-table-m {
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
      max-height: 60px;
      overflow: auto;
    }
  }
</style>

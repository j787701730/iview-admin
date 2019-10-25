<style lang="less" scoped>
  .ivu-form-item {
    margin-bottom: 10px;
  }

  .ivu-modal {
    top: 50px;
  }

  .ivu-table-cell {
    padding-left: 8px;
    padding-right: 8px;
  }

  .ivu-checkbox-wrapper {
    margin-right: 0;
  }

  .shop-plugin-sel-item {
    display: inline-block;
    margin: 6px 6px 6px 0;
    max-width: 84px;
    height: 26px;
    line-height: 26px;
    position: relative;
    padding: 0 14px 0 6px;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: keep-all;
    border: 1px solid #eee;

    .shop-plugin-sel-item-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      line-height: 24px;
      cursor: pointer;
      background: #ddd;
      color: #fff;
    }
  }
</style>
<template>
  <span>
    <span @click="shopPluginShow=true">
       <slot></slot>
    </span>
  <Modal
      v-model="shopPluginShow"
      title="店铺查询"
      width="800"
      :mask-closable="false"
  >
    <div>
      <Form :label-width="70" @submit.native.prevent="">
      <Row>
        <Col :xs="24" :sm="11" :md="12">
          <FormItem label="用户名">
            <Input v-model="param.login_name" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="11" :md="12">
          <FormItem label="手机">
            <Input v-model="param.user_phone" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="11" :md="12">
          <FormItem label="店铺名称">
            <Input v-model="param.shopName" @keydown.enter.native="search"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="11" :md="12">
          <FormItem label="服务类型" style="width: 100%">
            <Select style="width:100%;" v-model="selectServiceType" placeholder="">
              <Option v-for="(val,key) in serviceType" :value="key" :key="key">{{ val }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="11" :md="12">
          <FormItem label="店铺地址">
            <Row>
              <Col span="8">
                <FormItem style="width: 100%">
                  <Select style="width:100%;" @on-change="shop_province_cg" placeholder="省">
                    <Option v-for="(val,key) in shop_province" :value="key" :key="key">{{ val }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem style="width: 100%">
                  <Select v-model="shop_1" style="width:100%" @on-change="shop_city_cg" placeholder="市">
                    <Option v-for="(val,key) in shop_city" :value="key" :key="key">{{ val }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem style="width: 100%">
                  <Select v-model="shop_2" style="width:100%" placeholder="区">
                    <Option v-for="(val,key) in shop_region" :value="key" :key="key">{{ val }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="11" :md="12">
          <FormItem label="服务地址">
            <Row>
              <Col span="8">
                <FormItem style="width: 100%">
                  <Select style="width:100%;" @on-change="service_province_cg" placeholder="省">
                    <Option v-for="(val,key) in service_city_province" :value="key" :key="key">{{ val }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem style="width: 100%">
                  <Select v-model="service_1" style="width:100%" @on-change="service_city_cg" placeholder="市">
                    <Option v-for="(val,key) in service_city" :value="key" :key="key">{{ val }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem style="width: 100%">
                  <Select v-model="service_2" style="width:100%" placeholder="区">
                    <Option v-for="(val,key) in service_region" :value="key" :key="key">{{ val }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
      <div style="text-align: center;margin: 0 0 10px 0">
      <Button type="primary" @click="search" icon="ios-search">搜索</Button>
    </div>
      <!--      <div style="margin-bottom: 10px;text-align: right">-->
      <!--      <span style="vertical-align: middle">共 {{count}} 条</span>-->
      <!--      <Page style="display: inline-block;vertical-align: middle" v-show="count" :total="count" show-total :current="param.currPage"-->
      <!--            @on-change="pageChange"-->
      <!--            :page-size="param.pageCount" simple/>-->
      <!--    </div>-->
      <Table :columns="shopsDataCol" :data="shopsData" :row-key="Number(this.shopCount) > 1">
        <template slot-scope="{ row, index }" slot="area">
        <span>{{row.province_name}} {{row.city_name}} {{row.region_name}}</span>
      </template>
      </Table>
      <Page style="text-align: center;margin-top: 15px" v-show="count" :total="count" show-total :current="param.currPage"
            @on-change="pageChange" :page-size="param.pageCount"/>
      <div style="height: 40px;overflow: auto;margin-top: 10px;border: 1px solid #ddd;padding: 0 6px">
        <template v-for="row in selectShopsData">
          <div class="shop-plugin-sel-item" :key="row.shop_id" :title="row.shop_name">{{row.shop_name}}
            <Icon class="shop-plugin-sel-item-close" type="ios-close" @click="delSelect(row)"/>
          </div>
        </template>
      </div>
    </div>
    <div slot="footer">
      <Button type="default" @click="shopPluginShow=false">取消</Button>
      <Button type="primary" @click="shopPluginOk">提交</Button>
    </div>
  </Modal>
  </span>
</template>

<script>
import { ajax } from '@/util'
import axios from 'axios'
import Qs from 'qs'

export default {
  name: 'shop-plugin',
  props: {
    shopCount: {}, // 0 无限选, 1单选 , 剩下个数限制,
    shopData: {
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      selectShopsData: this.shopData,
      shopPluginShow: false,
      serviceType: {
        0: '全部',
        11: '实物商品交易',
        12: '虚拟商品交易',
        13: '设计服务',
        14: '生产加工',
        15: '施工服务',
        16: '物流服务',
        17: '培训服务'
      },
      selectServiceType: '0',
      selectRoleRow: '',
      selectRoleIndex: '',
      shop_city_data: {
        county: 1,
        province: '',
        city: ''
      },
      service_city_data: {
        county: 1,
        province: '',
        city: ''
      },
      shop_province: {},
      shop_city: {},
      shop_region: {},
      shop_1: '',
      shop_2: '',
      service_city_province: {},
      service_city: {},
      service_region: {},
      service_1: '',
      service_2: '',
      order: '',
      param: {
        shopName: '',
        pageCount: 10,
        currPage: 1,
        pricing_class: 10,
        login_name: '',
        user_phone: '',
        serviceType: 0,
        province: '',
        city: '',
        region: '',
        service_province: '',
        service_city: '',
        service_region: ''
      },
      count: 0,
      isAllSelect: false,
      shopsDataCol: [{
        width: 34,
        render: (h, params) => {
          return Number(this.shopCount) === 0 || Number(this.shopCount) > 1 ? h('Checkbox', {
            props: {
              value: params.row.checked
            },
            on: {
              'on-change': (val) => {
                let temp = JSON.parse(JSON.stringify(this.selectShopsData))
                if (val) {
                  temp[params.row.shop_id] = params.row
                  if (Number(this.shopCount) !== 0 && Object.keys(this.selectShopsData).length === Number(this.shopCount)) {
                    this.$Message.error(`最多只能选择${this.shopCount}家店铺`)
                    params.row.checked = false
                    this.$set(this.shopsData, params.index, params.row)
                    return
                  }
                  for (let item of this.shopsData) {
                    if (!item.checked) {
                      this.isAllSelect = false
                      break
                    }
                    if (this.shopsData.indexOf(item) === this.shopsData.length - 1) {
                      this.isAllSelect = true
                    }
                  }
                } else {
                  this.isAllSelect = false
                  delete temp[params.row.shop_id]
                }
                this.selectShopsData = temp
                this.shopsData[params.index].checked = val
              }
            }
          }, '') : h('Radio', {
            props: {
              value: params.row.checked
            },
            on: {
              'on-change': (val) => {
                if (val) {
                  let temp = JSON.parse(JSON.stringify(this.shopsData))
                  for (let item of temp) {
                    item.checked = item.shop_id === params.row.shop_id
                  }
                  this.shopsData = temp
                  this.selectShopsData = {}
                  this.selectShopsData[params.row.shop_id] = params.row
                }
              }
            }
          }, '')
        },
        renderHeader: (h, params) => {
          return Number(this.shopCount) === 0 ? h('Checkbox', {
            props: {
              value: this.isAllSelect
            },
            on: {
              'on-change': (val) => {
                let temp = JSON.parse(JSON.stringify(this.shopsData))
                for (let item of temp) {
                  item.checked = val
                  if (val) {
                    this.selectShopsData[item.shop_id] = item
                  } else {
                    delete this.selectShopsData[item.shop_id]
                  }
                }
                this.shopsData = temp
                this.isAllSelect = val
              }
            }
          }, '') : h('span', {}, '')
        }
      }, {
        title: '店铺名称',
        key: 'shop_name'
      }, {
        title: '服务类型',
        key: 'service_type_name'
      }, {
        title: '地区',
        slot: 'area'
      }, {
        title: '详细地址',
        key: 'shop_address'
      }],
      shopsData: []
    }
  },
  methods: {
    shopPluginOk: function () {
      this.$emit('send', this.selectShopsData)
      this.shopPluginShow = false
    },
    search: function (e) {
      e.target.blur()
      this.param.currPage = 1
      this.param.province = Number(this.shop_city_data.province) || ''
      this.param.city = Number(this.shop_1) || ''
      this.param.region = Number(this.shop_2) || ''
      this.param.service_province = Number(this.service_city_data.province) || ''
      this.param.service_city = Number(this.service_1) || ''
      this.param.service_region = Number(this.service_2) || ''
      this.getData()
    },
    getData: function () {
      if (this.order && this.order.order && this.order.order !== 'normal') {
        this.param.order = this.order.key + ' ' + this.order.order
      } else {
        delete this.param.order
      }
      this.$Loading.start()
      ajax('/Adminrelas-CrmSearch-fetchShop', Qs.stringify(this.param), true,
        (data) => {
          this.$Loading.finish()
          let count = 0
          for (const shop of data.shop) {
            if (this.selectShopsData[shop.shop_id]) {
              shop.checked = true
              count += 1
            }
          }
          this.isAllSelect = count === data.shop.length
          this.shopsData = data.shop
          this.count = Number(data.shopCount)
        },
        () => {
          this.$Loading.finish()
        })
    },
    pageChange: function (val) {
      this.param.currPage = val
      this.getData()
    },
    cancel: function () {
      this.roleMangerShow = false
    },
    orderBy: function ({ column, key, order }) {
      this.order = {
        key: key,
        order: order
      }
      this.getData()
    },
    cityData: function (data, type, index) {
      axios({
        url: '/Home-Config-areaConfig',
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: Qs.stringify(data)
      }).then((res) => {
        res.data[0] = '请选择'
        if (index === 0) {
          this.service_city_province = res.data
          this.shop_province = res.data
        }
        if (type === 'shop') {
          if (index === 1) {
            this.shop_city = res.data
          } else if (index === 2) {
            this.shop_region = res.data
          }
        } else if (type === 'service_city') {
          if (index === 1) {
            this.service_city = res.data
          } else if (index === 2) {
            this.service_region = res.data
          }
        }
      })
    },
    shop_province_cg: function (val) {
      if (val === 0) {
        this.shop_city = {}
        this.shop_region = {}
        this.shop_1 = ''
        this.shop_2 = ''
      } else {
        this.shop_city_data.province = val
        this.cityData(this.shop_city_data, 'shop', 1)
      }
    },
    shop_city_cg: function (val) {
      if (val === 0) {
        this.shop_region = {}
        this.shop_2 = ''
      } else {
        this.shop_city_data.city = val
        this.cityData(this.shop_city_data, 'shop', 2)
      }
    },
    service_province_cg: function (val) {
      if (val === 0) {
        this.service_city = {}
        this.service_region = {}
        this.service_1 = ''
        this.service_2 = ''
      } else {
        this.service_city_data.province = val
        this.cityData(this.service_city_data, 'service_city', 1)
      }
    },
    service_city_cg: function (val) {
      if (val === 0) {
        this.service_region = {}
        this.service_2 = ''
      } else {
        this.service_city_data.city = val
        this.cityData(this.service_city_data, 'service_city', 2)
      }
    },
    delSelect: function (row) {
      let temp = JSON.parse(JSON.stringify(this.selectShopsData))
      delete temp[row.shop_id]
      this.selectShopsData = temp
      let count = 0
      let temp2 = JSON.parse(JSON.stringify(this.shopsData))
      for (const shop of temp2) {
        if (this.selectShopsData[shop.shop_id]) {
          shop.checked = true
          count += 1
        } else {
          shop.checked = false
        }
      }
      this.shopsData = temp2
      this.isAllSelect = count === this.shopsData.length
    }
  },
  mounted () {
    this.cityData(this.shop_city_data, 'service_city', 0)
    this.getData()
  },
  watch: {
    shopData (newVal) {
      this.selectShopsData = newVal
      let count = 0
      let temp = JSON.parse(JSON.stringify(this.shopsData))
      for (const shop of temp) {
        if (this.selectShopsData[shop.shop_id]) {
          shop.checked = true
          count += 1
        } else {
          shop.checked = false
        }
      }
      this.isAllSelect = count === temp.length
      this.shopsData = temp
    }
  }
}
</script>

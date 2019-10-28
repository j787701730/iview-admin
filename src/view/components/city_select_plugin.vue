<template>
  <FormItem :label="label">
    <Row>
      <Col span="8">
        <FormItem style="width: 100%">
          <Select style="width:calc(100% - 4px);" @on-change="service_province_cg" v-model="area.province" placeholder="省">
            <Option v-for="(val,key) in service_city_province" :value="key" :key="key">{{ val }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8" style="text-align: center">
        <FormItem style="width:calc(100% - 4px);display: inline-block;text-align: left">
          <Select style="width:100%" @on-change="service_city_cg" placeholder="市" v-model="area.city">
            <Option v-for="(val,key) in service_city" :value="key" :key="key">{{ val }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8" style="text-align: right">
        <FormItem style="width:calc(100% - 4px);text-align: left;display: inline-block">
          <Select style="width:100%" placeholder="区" @on-change="service_region_cg" v-model="area.region">
            <Option v-for="(val,key) in service_region" :value="key" :key="key">{{ val }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </FormItem>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'city_select_plugin',
  props: {
    label: {
      type: String,
      default () {
        return '地址'
      }
    },
    areaObj: {
      type: Object,
      default () {
        return {
          province: '',
          city: '',
          region: ''
        }
      }
    }
  },
  data () {
    return {
      service_city_data: {
        county: 1,
        province: '',
        city: ''
      },
      service_city_province: {},
      service_city: {},
      service_region: {},
      area: JSON.parse(JSON.stringify(this.areaObj))
    }
  },
  methods: {
    cityData: function (index) {
      axios({
        url: '/Home-Config-areaConfig',
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: Qs.stringify(this.service_city_data)
      }).then((res) => {
        res.data[0] = '请选择'
        if (index === 0) {
          this.service_city_province = res.data
          this.service_city = {}
          this.service_region = {}
        } else if (index === 1) {
          this.service_city = res.data
          this.service_region = {}
        } else if (index === 2) {
          this.service_region = res.data
        }
      })
    },
    service_province_cg: function (val) {
      this.$set(this.area, 'province', val)
      this.$set(this.area, 'city', '')
      this.$set(this.area, 'region', '')
      this.service_city_data.city = ''
      this.service_city_data.region = ''
      if (Number(val)) {
        this.service_city_data.province = val
        this.cityData(1)
      } else {
        this.service_city = {}
        this.service_region = {}
      }
      this.send()
    },
    service_city_cg: function (val) {
      this.service_city_data.region = ''
      if (Number(val)) {
        this.service_city_data.city = val
        this.$delete(this.service_city_data, 'region')
        this.$set(this.area, 'city', val)
        this.cityData(2)
      } else {
        this.service_region = {}
        this.$set(this.area, 'region', '')
      }
      this.send()
    },
    service_region_cg: function (val) {
      this.$set(this.area, 'region', val)
      this.send()
    },
    send: function () {
      this.$emit('send', this.area)
    }
  },
  mounted () {
    this.cityData(0)
  },
  watch: {
    areaObj (newVal) {
      this.area = JSON.parse(JSON.stringify(newVal))
    }
  }
}
</script>

<style scoped>

</style>

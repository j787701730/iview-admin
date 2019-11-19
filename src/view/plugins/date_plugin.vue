<template>
  <Row>
    <Col span="11">
      <FormItem style="width: 100%">
        <DatePicker :type="dateType" style="width: 100%" :options="dateMinOptions" v-model="dateMin" @on-change="dataChange"></DatePicker>
      </FormItem>
    </Col>
    <Col span="2" style="text-align: center">-</Col>
    <Col span="11">
      <FormItem style="width: 100%">
        <DatePicker :type="dateType" style="width: 100%" :options="dateMaxOptions" v-model="dateMax" @on-change="dataChange"></DatePicker>
      </FormItem>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'date_plugin',
  props: {
    dateType: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
      dateMin: '',
      dateMax: '',
      dateMinOptions: {
        disabledDate: (date) => {
          let endTime = this.dateMax ? new Date(this.dateMax).valueOf() : Date.now()
          return date && ((date.valueOf() > endTime))
        }
      },
      dateMaxOptions: {
        disabledDate: (date) => {
          let endTime = this.dateMin ? new Date(this.dateMin).valueOf() : (new Date('1970-1-1')).getTime()
          return date && ((date.valueOf() < endTime))
        }
      }
    }
  },
  methods: {
    dataChange: function () {
      this.$emit('send', { 'min': this.dateMin, 'max': this.dateMax })
    }
  }
}
</script>

<style scoped>

</style>

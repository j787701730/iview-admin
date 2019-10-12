<template>
  <div>
    <h1>文章添加 </h1>
    <Select v-model="selectID" style="width:200px">
      <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.label }}</Option>
    </Select>
    <Select v-model="selectID2" style="width:200px">
      <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.label }}</Option>
    </Select>
    <Select v-model="selectID3" style="width:200px">
      <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.label }}</Option>
    </Select>
    <Select v-model="selectID4" style="width:200px">
    <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.label }}</Option>
  </Select>
    <Button @click="getID">搜索</Button>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      selectID: '',
      selectID2: '',
      selectID3: '',
      selectID4: '',
      cityList: [
        {
          id: '1',
          label: 'New York'
        },
        {
          id: '11',
          label: 'London'
        },
        {
          id: '111',
          label: 'Sydney'
        },
        {
          id: '222',
          label: 'Ottawa'
        },
        {
          id: '223',
          label: 'Paris'
        },
        {
          id: '1113',
          label: 'Canberra'
        }
      ]
    }
  },
  methods: {
    getID: function () {
      console.log(this.selectID)
      console.log(this.selectID2)
      console.log(this.selectID3)
      console.log(this.selectID4)
    }
  }
}
</script>

<style scoped>

</style>

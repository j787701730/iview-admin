<!--<style lang="less">-->
<!--    @import "./login.less";-->
<!--</style>-->

<template>
  <div>
    <h1 style="margin-bottom: 10px;">文章列表</h1>
    <ShopPlugin shopCount="3" :shopData="selectShopsData" @send="getShopData">
      <Button type="error">点击</Button>
    </ShopPlugin>
    <div style="">
      <template v-for="row in selectShopsData">
        <div class="shop-plugin-sel-item" :key="row.shop_id" :title="row.shop_name">{{row.shop_name}}
          <Icon class="shop-plugin-sel-item-close" type="ios-close" @click="delSelect(row)"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ShopPlugin from './shop-plugin'
export default {
  data () {
    return {
      selectShopsData: {}
    }
  },
  components: {
    ShopPlugin
  },
  methods: {
    getShopData: function (val) {
      console.log(val)
      this.selectShopsData = val
    },
    delSelect: function (row) {
      let temp = JSON.parse(JSON.stringify(this.selectShopsData))
      delete temp[row.shop_id]
      this.selectShopsData = temp
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
  .shop-plugin-sel-item{
    display: inline-block;
    margin:0 6px 6px 0;
    max-width: 80px;
    height: 28px;
    line-height: 28px;
    position: relative;
    padding: 0 10px;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    .shop-plugin-sel-item-close{
      position: absolute;
      top:0;
      right:0;
      line-height: 28px;
      width: 10px;
      cursor: pointer;
      background: #2d8cf0;
      color: white;
    }
  }
</style>

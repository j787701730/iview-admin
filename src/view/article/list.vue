<style lang="less" scoped>
  .shop-plugin-sel-item{
    display: inline-block;
    margin:6px 6px 6px 0;
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
    .shop-plugin-sel-item-close{
      position: absolute;
      top:0;
      right:0;
      width: 12px;
      line-height: 24px;
      cursor: pointer;
      background: #ddd;
      color: #fff;
    }
  }
</style>

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

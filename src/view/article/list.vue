<style lang="less" scoped>
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
      &:hover{
        background: #ed4014;
      }
    }
  }
</style>

<template>
  <div>
    <h1 style="margin-bottom: 10px;">文章列表</h1>
    <ShopPlugin shopCount="3" :shopData="selectShopsData1" @send="getShopData">
      <Button type="error">点击</Button>
    </ShopPlugin>
    <div style="">
      <template v-for="row in selectShopsData1">
        <div class="shop-plugin-sel-item" :key="row.shop_id" :title="row.shop_name">{{row.shop_name}}
          <Icon class="shop-plugin-sel-item-close" type="ios-close" @click="delSelect(row)"/>
        </div>
      </template>
    </div>

    <div style="border: 2px solid #ddd"></div>

<!--    <ShopPlugin shopCount="1" :shopData="selectShopsData2" @send="getShopData2">-->
<!--      <Button type="error">点击2</Button>-->
<!--    </ShopPlugin>-->
<!--    <div style="">-->
<!--      <template v-for="row in selectShopsData2">-->
<!--        <div class="shop-plugin-sel-item" :key="row.shop_id" :title="row.shop_name">{{row.shop_name}}-->
<!--          <Icon class="shop-plugin-sel-item-close" type="ios-close" @click="delSelect2(row)"/>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
  </div>
</template>

<script>
import ShopPlugin from './shop-plugin'

export default {
  data () {
    return {
      selectShopsData1: {},
      selectShopsData2: {}
    }
  },
  components: {
    ShopPlugin
  },
  methods: {
    getShopData: function (val) {
      this.selectShopsData1 = JSON.parse(JSON.stringify(val))
    },
    delSelect: function (row) {
      this.$delete(this.selectShopsData1, row.shop_id)
    },
    getShopData2: function (val) {
      this.selectShopsData2 = JSON.parse(JSON.stringify(val))
    },
    delSelect2: function (row) {
      this.$delete(this.selectShopsData2, row.shop_id)
    }
  },
  mounted () {

  }
}
</script>

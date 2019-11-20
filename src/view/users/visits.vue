<template>
  <div>
    <el-amap ref="map" style="height: 800px" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
    </el-amap>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import { ajax } from '@/util'
import Qs from 'qs'
let amapManager = new AMapManager()

export default {
  name: 'visits',
  data () {
    let self = this
    return {
      amapManager,
      zoom: 5,
      center: [104.59996, 30.19766],
      events: {
        init (map) {
          AMapUI.loadUI(['geo/DistrictCluster', 'geo/DistrictExplorer'], function (DistrictCluster, DistrictExplorer) {
            self.initPage(DistrictCluster, map, DistrictExplorer)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          console.log('map clicked')
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
            console.log(o)
          }
        }
      }]
    }
  },
  components: {
    // AMapManager
  },
  methods: {
    initPage (DistrictCluster, map, DistrictExplorer) {
      let districtExplorer = new DistrictExplorer({
        map: map,
        eventSupport: true, // 打开事件支持
        preload: [100000] // 预加载全国
      })

      console.log(districtExplorer)
      let distCluster = new DistrictCluster({
        map: map, // 所属的地图实例
        // 返回数据项中的经纬度位置
        getPosition: function (item) {
          if (!item) {
            return null
          }
          let parts = item.split(',')
          // 返回经纬度
          return [parts[0], parts[1]]
        }
      })

      ajax('/Adminrelas-Monitor-getLoginHot', Qs.stringify({ startDate: '2019-5-20',
        endDate: '2019-11-20' }), true, (data) => {
        let points = []
        for (const datum of data.map) {
          let arr = datum.split(',')
          points.push([arr[0], arr[1]])
        }
        distCluster.setData(data.map)
      }, () => {})
    }
  }
}
</script>

<style scoped>

</style>

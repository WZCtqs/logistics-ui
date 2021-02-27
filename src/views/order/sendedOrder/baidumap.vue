
<template>
  <div class="app-container calendar-list-container">
    <baidu-map class="map" :center="centerData" :zoom="15" :scroll-wheel-zoom="true">
      <bm-polyline
        :path="polylinePath"
        stroke-color="red"
        :stroke-weight="2"
        @lineupdate="updatePolylinePath"
        ref="bmPolyline"
        :strokeWeight="5"
      ></bm-polyline>
      <bm-panorama></bm-panorama>
      <bm-marker :position="polylinePath[0]" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label
          content="起点"
          :labelStyle="{color: '#fff',background: 'rgba(0,0,0,0.5)',overflow: 'hidden', position: 'absolute','font-size':'14px'}"
          :offset="{width: -8, height: 30}"
        />
      </bm-marker>
      <bm-marker
        :position="polylinePath[polylinePath.length-1]"
        @click="infoWindowOpen"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="当前位置"
          :labelStyle="{color: '#fff',background: 'rgba(0,0,0,0.5)',overflow: 'hidden', position: 'absolute','font-size':'14px'}"
          :offset="{width: -8, height: 30}"
        />
        <bm-info-window
          :position="polylinePath[polylinePath.length-1]"
          title="车辆信息"
          :show="infoWindow.show"
          animation="BMAP_ANIMATION_BOUNCE"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
            <p v-text="infoWindow.orderId"></p>
            <p v-text="infoWindow.plateNumber"></p>
            <p v-text="infoWindow.orderStatus"></p>
            <p v-text="infoWindow.address"></p>
            <p v-text="infoWindow.time"></p>
        </bm-info-window>
      </bm-marker>
      <bml-lushu @stop="reset" :path="polylinePath" :icon="icon" :play="play" :rotation="true"></bml-lushu>
    </baidu-map>
  </div>
</template>
<script>
import { pca, pcaa } from "area-data"; // 城市数据
import "vue-area-linkage/dist/index.css"; // 样式

import { BmlLushu } from "vue-baidu-map";

import waves from "@/directive/waves/index.js"; // 水波纹指令
import { mapGetters } from "vuex";
// import linkage from '@/components/linkage/linkage'
import router from "@/router/router";

export default {
  props: ["gpsPointesarr"],
  name: "orderManager",
  directives: {
    waves
  },

  data() {
    return {
      orderId: null,
      infoWindow: {
        show: false,
        orderId: '',
        plateNumber: '',
        orderStatus: '',
        address: 'das',
        time: ''
      },
      polylinePath: [],
      endCarIcon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      },
      play: true,
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      },
      centerData: null
    };
  },
  components: {
    BmlLushu
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  filters: {},
  created() {
    this.polylinePath = this.gpsPointesarr;

      if(this.$route.params.gpsObj != undefined){
        this.polylinePath =this.$route.params.gpsObj.gps.map(o => {
                  return { 'lat': Number(o.lat), 'lng': Number(o.lon) }
        })

        this.centerData=  this.polylinePath[0]

        this.infoWindow.orderId = '订单号:' + this.$route.params.orderId
        this.infoWindow.plateNumber = '车牌号:' + this.$route.params.gpsObj.plateNumber
        this.infoWindow.orderStatus = '状态:' + this.$route.params.gpsObj.status
        this.infoWindow.address = '订单位置:' + this.$route.params.gpsObj.address
        if (response.data.time.length > 19) {
              this.infoWindow.time = '位置更新时间:' + this.$route.params.gpsObj.time.substring(0, 10) + '--' + this.$route.params.gpsObj.time.substring(12, 19)
        }
      }else{

              this.$notify({
                title: "提示",
                message: "请先选择对应的订单，再查看轨迹",
                type: "warning",
                duration: 2000
              });
          router.push({ name:'集装箱订单中心' })
      }



  },
  mounted: function() {

      this.polylinePath =this.$route.params.gpsObj.gps.map(o => {
                return { 'lat': Number(o.lat), 'lng': Number(o.lon) }
      })

      this.centerData=  this.polylinePath[0]

       this.infoWindow.orderId = '订单号:' + this.$route.params.orderId
       this.infoWindow.plateNumber = '车牌号:' + this.$route.params.gpsObj.plateNumber
       this.infoWindow.orderStatus = '状态:' + this.$route.params.gpsObj.status
       this.infoWindow.address = '订单位置:' + this.$route.params.gpsObj.address
       if (response.data.time.length > 19) {
             this.infoWindow.time = '位置更新时间:' + this.$route.params.gpsObj.time.substring(0, 10) + '--' + this.$route.params.gpsObj.time.substring(12, 19)
      }


  },
  watch: {
    gpsPointesarr(newObj, oldObj) {
      if (newObj != oldObj) {
        this.polylinePath = newObj;
        this.getPoline();
      }
    }
  },
  methods: {

    getPoline() {
      this.centerData = this.polylinePath[0];
      this.play = true;
      this.polylinePath = this.gpsPointesarr;
    },

    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    reset() {
      this.play = false;
    },


  }
};
</script>

<style>
</style>

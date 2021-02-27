<template>
  <baidu-map class="map" :center="{lng: 121.324695, lat: 31.218586}" :zoom="15" :scroll-wheel-zoom="true">
    <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-weight="2"
                 @lineupdate="updatePolylinePath" :strokeWeight="5"></bm-polyline>
    <bm-panorama></bm-panorama>
    <bm-marker :position="polylinePath[0]" :dragging="true">
      <bm-label content="起点"
                :labelStyle="{color: '#fff',background: 'rgba(0,0,0,0.5)',overflow: 'hidden', position: 'absolute','font-size':'14px'}"
                :offset="{width: -8, height: 30}"/>
    </bm-marker>
    <bm-marker :position="polylinePath[polylinePath.length-1]"
               @click="infoWindowOpen">
      <bm-info-window :position="polylinePath[polylinePath.length-1]" title="车辆信息" :show="infoWindow.show"  animation="BMAP_ANIMATION_BOUNCE"
                      @close="infoWindowClose" @open="infoWindowOpen">
        <p v-text="infoWindow.contents"></p>
        <p v-text="infoWindow.contents"></p>
      </bm-info-window>
    </bm-marker>
    <bml-lushu
      @stop="reset"
      :path="polylinePath"
      :icon="icon"
      :play="play"
      :rotation="true">
    </bml-lushu>
  </baidu-map>
</template>

<script>
  import { BmlLushu } from 'vue-baidu-map'
  export default {
    components: {
      BmlLushu
    },
    data() {
      return {
        infoWindow: {
          show: false,
          contents: 'das'
        },
        polylinePath: [],
        endCarIcon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: { width: 52, height: 26 },
          opts: { anchor: { width: 27, height: 13 } }
        },
        play: true,
        icon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: { width: 52, height: 26 },
          opts: { anchor: { width: 27, height: 13 } }
        }
      }
    },
    mounted() {
    },
    methods: {
      updatePolylinePath(e) {
        this.polylinePath = e.target.getPath()
      },
      infoWindowClose(e) {
        this.infoWindow.show = false
      },
      infoWindowOpen(e) {
        this.infoWindow.show = true
      },
      reset() {
        this.play = false
      }
    }
  }
</script>
<style scoped>
  .map {
    width: 100%;
    height: 800px;
  }
</style>

<template>
  <baidu-map :center="center" class="map">
    
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  </baidu-map>
</template>
<script>
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "DKhqcI7PA5nHcKZIlfA66DFAfpr2W440"
});
import listData from "@/components/list-data/list-data.vue";

export default {
  data() {
    return {
      center: { lng: 0, lat: 0 }
    };
  },

  mounted() {
    this.lng = 116.404;
    this.lat = 39.915;
  }
};
</script>


<style>
.map {
  width: 100%;
  height: 300px;
}
</style>

<template>
  <div class>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_detail_item_album="{row}">
        <openPhoto v-model="row.album"></openPhoto>
        <!-- <div>
          <img
            @click.stop="showBigImg(item.url)"
            :src="item.url"
            alt
            v-for="item in row.album"
            :key="item.url"
            class="W100 H100"
          >
        </div>-->
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import openPhoto from "@/components/common/openPhoto/openPhoto.vue";
export default {
  components: { openPhoto },
  data() {
    return {
      cfList: util.deepCopy(PUB.listCF.tangball_recommend)
     
    };
  },created(){
  }
};
</script>


<style>
</style>

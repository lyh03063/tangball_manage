<template>
  <div class>
    <!--弹出图片显示 -->
    <!-- <el-dialog
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      v-bind:visible.sync="showDialogBigImg"
      v-if="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt>
      </div>
    </el-dialog>-->

    <dm_list_data :cf="cfList">
      <template v-slot:slot_area="{formData}">
        <select_area v-model="formData.area" value-type="lastId" level="2"></select_area>
      </template>
      <!--弹出图片显示点击事件 -->
      <template v-slot:slot_detail_item_album="{row}">
        <openPhoto v-model="row.album"></openPhoto>
      </template>
      <template v-slot:slot_detail_item_franchiseeId="{row}">
        
          <dm_ajax_populate
            :id="row.franchiseeId"
            populateKey="name"
            page="tangball_franchisee"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
    </dm_list_data>
    
  </div>
</template>
<script>
import select_area from "@/components/form_item/select_area.vue";
import openPhoto from "@/components/common/openPhoto/openPhoto.vue";
export default {
  components: { select_area, openPhoto },
  methods: {
    // showBigImg(url) {
    //   this.showDialogBigImg = true;
    //   this.urlBigImg = url;
    // }
  },
  watch: {
    formData: {
      handler: function() {},
      deep: true //深度监听
    }
  },
  data() {
    return {
      // showDialogBigImg: false,
      options: option,
      cfList: util.deepCopy(PUB.listCF.tangball_venue)
      
    };
  },created(){
  }
};
</script>


<style>
</style>

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
        <select_city v-model="formData.area" value-type="cityId"></select_city>
      </template>
      <!--弹出图片显示点击事件 -->
      <template v-slot:slot_detail_item_album="{row}">
        <openPhoto v-model="row.album"></openPhoto>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import select_city from "@/components/form_item/select_city.vue";
import openPhoto from "@/components/common/openPhoto/openPhoto.vue";
export default {
  components: { select_city, openPhoto },
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
    util.setListPower(this.cfList);//调用：{根据当前角色权限设置列表配置的函数}
  }
};
</script>


<style>
</style>

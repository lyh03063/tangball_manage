<template>
  <div class>
    <dm_list_data :cf="cfList">
    <!--详情弹窗的category字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_sponsorId="{row}">
        <dm_ajax_populate :id="row.sponsorId" populateKey="name" page="tangball_sponsor">
          <template v-slot:default="{doc}" >
            <div class v-if="doc && doc.P1"><b>{{doc.P1}}</b>(赞助商名称:{{doc.name}})</div>
          </template>
        </dm_ajax_populate>
      </template>

         <!--详情弹窗的category字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <dm_ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}" >
            <div class v-if="doc && doc.P1"><b>{{doc.P1}}</b>(赛事名称:{{doc.matchName}})</div>
          </template>
        </dm_ajax_populate>
      </template>

       <template v-slot:slot_place="{formData}">
        <select_city v-model="formData.place" valueType="cityId"></select_city>
      </template>

      </dm_list_data>
  </div>
</template>
<script>

import select_city from "@/components/form_item/select_city.vue";
export default {
  components: { select_city},
  data() {
    return {
      cfList:PUB.listCF.tangball_sponsorship
    };
  }
};
</script>


<style>
</style>

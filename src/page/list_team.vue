<template>
  <div class>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_detail_item_matchName="{row}">
        <select_ajax ajaxUrl="/crossList?page=tangball_match" keyLabel="matchName" :select="false" :param='{findJson:{P1:row.matchId}}'></select_ajax>
      </template>
      <template v-slot:slot_detail_item_memberName="{row}">
        <select_ajax ajaxUrl="/crossList?page=tangball_member" keyLabel="name" :select="false" :param='{findJson:{P1:row.createMemberId}}'></select_ajax>
      </template>
      <template v-slot:slot_detail_item_memberList="{row}">
        <div v-for="(player,index) in row.member" :key="index">
          {{index==0?'队长：':'队员'+index+'：'}}{{player.name}}     ({{player.sex=='1'?'男':'女'}}/{{player.phone}})
        </div>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import select_ajax from '../components/form_item/select_ajax'
export default {
  components: {select_ajax},
  methods: {
  },
  data() {
    return {
      cfList: PUB.listCF.tangball_team
    };
  },created(){
    util.setListPower(this.cfList);//调用：{根据当前角色权限设置列表配置的函数}
  }
};
</script>




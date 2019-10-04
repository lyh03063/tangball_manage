
<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="matchInfo" />
    </dm_debug_list>

    <dm_list_data
      :cf="cfListEnrollAch"
      ref="listForEnroll"
      @after-search="(data,olddata)=>{$emit('after-search',data)}"
    >
     
    </dm_list_data>
  </div>
</template>
<script>
let T;
export default {
  name: "match_ranking_person",
  components: {},
  props: ["matchId", "matchInfo", "progressIndex", "roundNum"], //（需要确定赛事，赛段，第几轮）

  data() {
    return {
      tipVisibles: {}, //队员列表弹窗的可见性,注意是一个对象
      cfListEnrollAch: PUB.listCF.tangball_enroll_for_ach //报名球队列表
    };
  },
  methods: {
   
  },

  created() {
   
  }
};
</script>


<style scoped>
.match_step {
  margin: 10px;
}
</style>

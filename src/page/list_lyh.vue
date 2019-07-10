
<template>
  <div class>
    <!-- <match_enroll :matchId="matchId" :debug111="true" ></match_enroll> -->
    <space height="100" ></space>
    <match_achievement :matchId="matchId"  ></match_achievement>
  </div>
</template>
<script>
import match_achievement from "../components/bussiness/match_achievement.vue";
import match_enroll from "../components/bussiness/ccity_match_achievement_personal.vue";
import ccity_match_achievement_personal from "../components/bussiness/ccity_match_achievement_personal.vue";
export default {
  components: { match_achievement,match_enroll,ccity_match_achievement_personal },
  data() {
    return {
      matchId: 37
    };
  },
  
  created() {
   

  },

  methods: {}
};
</script>
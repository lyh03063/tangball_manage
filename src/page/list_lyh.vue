<template>
  <div class>
    <match_enroll :matchId="matchId" ></match_enroll>
    <space height="10" ></space>
    <match_achievement :matchId="matchId" ></match_achievement>
  </div>
</template>
<script>
import match_achievement from "../components/bussiness/match_achievement.vue";
import match_enroll from "../components/bussiness/match_enroll.vue";
export default {
  components: { match_achievement,match_enroll },
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


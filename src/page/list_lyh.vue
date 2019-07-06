<template>
  <div class>
    
    <match_achievement :matchId="matchId" ></match_achievement>
  </div>
</template>
<script>
import match_achievement from "../components/bussiness/match_achievement.vue";

export default {
  components: { match_achievement },
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



<template>
  <div class>
    <input type="text" v-model="matchId">
    <space height="10" ></space>
    <debug_list class v-model="debugConfig" v-if="debug"></debug_list>
    <!-- <match_enroll :matchId="matchId" :debug111="true" ></match_enroll> -->
    <space height="100"></space>
    <match_achievement :matchId="matchId"  ></match_achievement>
  </div>
</template>
<script>

import match_achievement from "../components/bussiness/match_achievement.vue";
import match_enroll from "../components/bussiness/ccity_match_achievement_personal.vue";
import ccity_match_achievement_personal from "../components/bussiness/ccity_match_achievement_personal.vue";
export default {
  components: {
    match_achievement,
    match_enroll,
    ccity_match_achievement_personal,
   
  },
  mixins: [MIX.debug],
  data() {
    return {
      matchId: 37,
      name: "刘胡兰",
      objTest:{
        big:"大大",small:"小小",
        list: [
          { label: "姓名", prop: "name" },
          { label: "赛事id", prop: "matchId"},
          { label: "测试对象", prop: "objTest.big"  }
        ],
        list2: [
          { label: "姓名", prop: "name" },
          { label: "赛事id", prop: "matchId"},
          { label: "测试对象", prop: "objTest.big"  }
        ]

      },

      debugConfig: {
        // data: {},
        list: [
          { label: "姓名", key: "name" },
          { label: "赛事id", key: "matchId"},
          { label: "测试对象", key: "objTest",type:"Object"  },
          { label: "测试对象属性", key: "objTest.big"  }
        ]
      }
    };
  },

  created() {
 
  },

  methods: {}
};
</script>
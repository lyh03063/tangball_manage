
<template>
  <div class>
<el-date-picker
              v-model="matchTimeEnd"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              type="datetime"
              placeholder="选择日期时间"
              :default-time="['00:00:01', '23:59:59']"
      
            ></el-date-picker>










    <input type="text" v-model="matchId">
    <space height="10"></space>
    <div class>
      <debug_list >
        <debug_item path="name" text="姓名"/>
        <debug_item path="matchId" text="赛事id"></debug_item>
        <debug_item path="objTest" text="测试对象"></debug_item>
        <debug_item path="objTest.big" text="测试对象属性"></debug_item>
      </debug_list>

     
    </div>

    <space height="10"></space>

    <!-- <match_enroll :matchId="matchId" :debug111="true" ></match_enroll> -->
    <space height="100"></space>
    <match_achievement :matchId="matchId"></match_achievement>
  </div>
</template>
<script>

import match_achievement from "@/components/bussiness/match_achievement.vue";
import match_enroll from "@/components/bussiness/ccity_match_achievement_personal.vue";
import ccity_match_achievement_personal from "@/components/bussiness/ccity_match_achievement_personal.vue";
export default {
  components: {
    match_achievement,
    match_enroll,
    ccity_match_achievement_personal,

  },

  data() {
    return {
      matchTimeEnd: "",

      matchId: 37,
      name: "刘胡兰",
      sex: "男",
      objTest: {
        big: "大大", small: "小小",
        list: [
          { label: "姓名", prop: "name" },
          { label: "赛事id", prop: "matchId" },
          { label: "测试对象", prop: "objTest.big" }
        ],
        list2: [
          { label: "姓名", prop: "name" },
          { label: "赛事id", prop: "matchId" },
          { label: "测试对象", prop: "objTest.big" }
        ]

      },


    };
  },

  created() {

  },

  methods: {}
};
</script>
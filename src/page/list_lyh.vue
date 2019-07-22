
<template>
  <div class>
    <input type="text" v-model="matchId">
    <space height="10"></space>
    <div class>
      <debug_list>
        <!-- <debug_item path="name" text="姓名"/>
        <debug_item path="matchId" text="赛事id"></debug_item>-->
        <debug_item path="dictPerson" text="人员数据字典对象"></debug_item>
        <debug_item path="arrPerson" text="人员数组"></debug_item>
        <debug_item path="arrMatch" text="赛事数组"></debug_item>
        <!-- <debug_item path="objTest.big" text="测试对象属性"></debug_item> -->
      </debug_list>
    </div>

    <space height="10"></space>

    <loading height="200"></loading>

    <!-- <match_enroll :matchId="matchId" :debug111="true" ></match_enroll> -->
    <space height="100"></space>
    <!-- <match_achievement :matchId="matchId"></match_achievement> -->
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
    ccity_match_achievement_personal
  },

  data() {
    return {
      dictPerson: null,
      arrPerson: null,
      arrMatch: null,
      imgUrl: "",
      matchTimeEnd: "",

      matchId: 37,
      name: "刘胡兰",
      sex: "男",
      objTest: {
        big: "大大",
        small: "小小"

        // list: [
        //   { label: "姓名", prop: "name" },
        //   { label: "赛事id", prop: "matchId" },
        //   { label: "测试对象", prop: "objTest.big" }
        // ],
        // list2: [
        //   { label: "姓名", prop: "name" },
        //   { label: "赛事id", prop: "matchId" },
        //   { label: "测试对象", prop: "objTest.big" }
        // ]
      }
    };
  },

  created() {
    //函数定义：{获取第一个有用的空位id函数}
    function getUsefulId(arr) {
      let idNeed; //变量：{需要的id值}
      let breakIndex = arr.findIndex((value, index) => value != index + 1); //变量：{中断位置}
      if (breakIndex>=0) {//Q1：中断位置存在
        idNeed=breakIndex+1
      }else{//Q2：中断位置不存在，自增
        idNeed = arr.length + 1; //如果没有空位，获取自增Id
      }
      return idNeed;
    }


    let id = getUsefulId([1, 2, 3,4]);
    console.log("id", id);

    //id是自增
    this.arrPerson = [
      { id: "1", name: "张三" },
      { id: "2", name: "李四" },
      { id: "4", name: "大明" }
    ];
    //赛事数组
    this.arrMatch = [
      { id: 1, matchName: "赛事1", personId: "1" },
      { id: 2, matchName: "赛事2", personId: "4" }
    ];

    /**为第三种方式准备 */
    this.dictPerson = {}; //人员数据字典对象
    this.arrPerson.forEach(personEach => {
      //循环：{人员数组}
      this.dictPerson[personEach.id] = personEach;
    });

    this.arrMatch.forEach(matchEach => {
      //循环：{赛事数组}

      /**
          * 第1种方式：采用2重循环
         
      let name
      this.arrPerson.forEach(personEach => {//循环：{000数组}
        if (personEach.id == matchEach.personId) {//如果{000}000
          name = personEach.name;
        }

      })
      matchEach.personName = name
       */

      /**
        * 第2种方式：采用find方法可以简化循环操作
        
  
      let objPerson = this.arrPerson.find(doc => doc.id == matchEach.personId)
      matchEach.personName = objPerson.name
      

     */

      /**
       * 第3种方式：使用数据字典对象，需要在循环之前拼装好数据字典
       */
      matchEach.personName = this.dictPerson[matchEach.personId].name;
    });
  },

  methods: {
    //接收子组件emit的事件
    getImgUrl(data) {
      alert("getImgUrl");
      //data  得到的就是返回的图片路径的相关参数
    }
  }
};
</script>
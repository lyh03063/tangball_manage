
<template>
  <div class>
    <space height="10"></space>
    <div class>
      <debug_list>
        <!-- <debug_item v-model="name" text="姓名"/>
        -->
        <debug_item v-model="memberId" text="当前会员id"></debug_item>
        <debug_item v-model="myMsgList" text="我的消息列表"></debug_item>

        <!-- <debug_item v-model="objTest.big" text="测试对象属性"></debug_item> -->
      </debug_list>
    </div>

    <div class="n-list-group" v-for="(item,i) in myMsgList" :key="i">
      <div class="FWB">
        {{item.name}}
        <ajax_populate :id="item.memberId" :ajax="{'param':{'findJson':{'memberId':memberId,'msgId':item.P1}}}" page="tangball_msg_read">
          <template v-slot:default="{doc}">
            <span class="C_3a0" v-if="doc.P1">已读-{{doc.readTime}}</span>
            <span class="C_f30" v-else>未读</span>
          </template>
        </ajax_populate>
      </div>
      <div class>{{item.detail}}</div>
    </div>

    <space height="10"></space>

    <!-- <loading height="200"></loading> -->

    <!-- <match_enroll :matchId="matchId"></match_enroll> -->
    <space height="100"></space>
    <!-- <match_achievement :matchId="matchId"></match_achievement> -->
  </div>
</template>
<script>
import match_achievement from "@/components/bussiness/match_achievement.vue";
import match_enroll from "@/components/bussiness/match_enroll.vue";
import ccity_match_achievement_personal from "@/components/bussiness/ccity_match_achievement_personal.vue";
export default {
  components: {
    match_achievement,
    match_enroll
    // ccity_match_achievement_personal
  },

  data() {
    return {
      memberId:17,
      myMsgList: null,
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
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        console.log("arguments", arguments);
        el.focus();
      }
    }
  },
  async created() {
    let { data } = await axios({
      //请求接口
      method: "post",
      url: `${PUB.domain}/crossList?page=tangball_msg`,
      data: {
        findJson: {
          //或查询条件：range==1或[range==2&&memberIdList包含当前会员id]
          $or: [{ range: 1 }, { range: 2, memberIdList: 1 }]
        }
      } //传递参数
    });
    this.myMsgList = data.list;

    //获取消息阅读状态
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
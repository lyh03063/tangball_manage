
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

    <el-button plain @click="getMyMsgList" size="mini">获取消息列表</el-button>


    <div class="n-list-group" v-for="(item,i) in myMsgList" :key="i">
      <div class="FWB">
       {{item.P1}} ： {{item.name}}
        <ajax_populate
          :ajax="{'param':{'findJson':{'memberId':memberId,'msgId':item.P1}}}"
          page="tangball_msg_read"
        >
          <template v-slot:default="{doc}">
            <span class="C_3a0" v-if="doc.memberId">已读-{{doc.readTime}}</span>
            <span class="C_f30" v-else>
              未读--
              <a
                href="javascript:;"
                @click="setReadStatus({'memberId':memberId,'msgId':item.P1})"
              >设为已读</a>
            </span>
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
      memberId: 17,
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
    

    //获取消息阅读状态
  },

  methods: {

/**
     * 函数：{获取当前会员的消息列表}
     * 难点：或查询条件的配置
     *
     */
    async getMyMsgList(_json) {

      let { data } = await axios({
      //请求接口
      method: "post",
      url: `${PUB.domain}/crossList?page=tangball_msg`,
      data: {
        findJson: {
          //或查询条件：range==1或[range==2&&memberIdList包含当前会员id]
          $or: [{ range: 1 }, { range: 2, memberIdList: this.memberId }]
        }
      } //传递参数
    });
    this.myMsgList = data.list;
     
    },



    /**
     * 函数：{设置消息已读状态的函数}
     * 往消息已读状态记录表更新一条记录,如果该记录不存在则新增
     *
     */
    async setReadStatus(_json) {
      console.log("_json", _json);
      let { memberId, msgId } = _json;
      await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossModify?page=tangball_msg_read`,
        data: {
          findJson: { msgId, memberId },
          modifyJson: { msgId, memberId }
        }
      });
    },
    //接收子组件emit的事件
    getImgUrl(data) {
      alert("getImgUrl");
      //data  得到的就是返回的图片路径的相关参数
    }
  }
};
</script>
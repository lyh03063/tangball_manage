
<template>
  <div class>
    <space height="10"></space>
    <div class>
      <debug_list>
        <!-- <debug_item v-model="name" text="姓名"/>
        -->

        <debug_item v-model="memberId" text="当前会员id"></debug_item>
        <debug_item v-model="myMsgList" text="我的消息列表"></debug_item>
        <debug_item v-model="myMsgRead" text="我的消息已读记录列表"></debug_item>
        <debug_item v-model="dictMsgRead" text="我的消息已读数据字典"></debug_item>

        <!-- <debug_item v-model="objTest.big" text="测试对象属性"></debug_item> -->
      </debug_list>
    </div>

    <el-button plain @click="getMyMsgList" size="mini">获取消息列表</el-button>
    <space height="10"></space>

已读
    <div class="n-list-group" v-for="(item,i) in myMsgList" :key="i" v-if="item.isRead">
      <div class="FWB">
        {{item.P1}} ： {{item.name}}
        <span class="C_3a0" v-if="item.isRead">已读-{{item.readTime}}</span>
        <span class="C_f30" v-else>
          未读-
          <a
            href="javascript:;"
            @click="setReadStatus({'memberId':memberId,'msgId':item.P1})"
          >设为已读</a>
        </span>
      </div>
      <div class>{{item.detail}}</div>
    </div>

    <space height="10"></space>
未读
    <div class="n-list-group" v-for="(item,i) in myMsgList" :key="i" v-if="!item.isRead">
      <div class="FWB">
        {{item.P1}} ： {{item.name}}
        <span class="C_3a0" v-if="item.isRead">已读-{{item.readTime}}</span>
        <span class="C_f30" v-else>
          未读-
          <a
            href="javascript:;"
            @click="setReadStatus({'memberId':memberId,'msgId':item.P1})"
          >设为已读</a>
        </span>
      </div>
      <div class>{{item.detail}}</div>
    </div>
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
      myMsgRead: null,
      dictMsgRead: null
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

  methods: {
    /**
     * 函数：{获取当前会员的消息列表}
     * 难点：两次ajax请求和数据的拼装
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

      {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/crossList?page=tangball_msg_read`,
          data: {
            findJson: {
              memberId: this.memberId
            }
          } //传递参数
        });
        this.myMsgRead = data.list;
      }

      // this.dictMsgRead = {}; //消息阅读记录的数据字典对象
      // this.myMsgRead.forEach(msgReadEach => {
      //   //循环：{消息阅读记录数组}
      //   this.dictMsgRead[msgReadEach.msgId] = msgReadEach;
      // });

      //使用lodash.keyBy制作数据字典
      this.dictMsgRead = lodash.keyBy(this.myMsgRead, "msgId");

      //循环：{消息数组}
      data.list.forEach(msgEach => {
        let docRead = this.dictMsgRead[msgEach.P1]; //变量：{当前消息对应的已读记录}
        //如果{当前消息对应的已读记录}存在，表示已读
        if (docRead) {
          msgEach.isRead = true;
          msgEach.readTime = docRead.readTime;
        } else {
          msgEach.isRead = false;
        }
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
      this.getMyMsgList()//调用：{000函数}
    },
    //接收子组件emit的事件
    getImgUrl(data) {
      alert("getImgUrl");
      //data  得到的就是返回的图片路径的相关参数
    }
  }
};
</script>
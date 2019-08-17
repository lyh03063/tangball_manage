
<template>
  <div class>
    <dm_dynamic_form class="" ></dm_dynamic_form>


    <dm_space height="10"></dm_space>
    <div class>
      <el-button plain @click="search(param)" size="mini">查询2</el-button>
      <dm_debug_list>
        <!-- <dm_debug_item v-model="name" text="姓名"/>
        -->
        <dm_debug_item v-model="dataBase" text="数据库"></dm_debug_item>
        <dm_debug_item v-model="param" text="查询条件"></dm_debug_item>
        <dm_debug_item v-model="searchResult" text="查询结果"></dm_debug_item>
        <dm_debug_item v-model="msgList" text="消息列表"></dm_debug_item>
        <dm_debug_item v-model="memberId" text="当前会员id"></dm_debug_item>
        <dm_debug_item v-model="myMsgList" text="我的消息列表"></dm_debug_item>

        <!-- <dm_debug_item v-model="objTest.big" text="测试对象属性"></dm_debug_item> -->
      </dm_debug_list>
    </div>

    <el-button plain @click="getMyMsgList2" size="mini">使用新的ajax获取消息列表</el-button>

    <el-button plain @click="getMyMsgList" size="mini">获取消息列表</el-button>

    <div class="n-list-group" v-for="(item,i) in myMsgList" :key="i">
      <div class="FWB">
        {{item.P1}} ： {{item.name}}
        <span class="C_3a0" v-if="item.readDoc">已读-{{item.readDoc}}</span>
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

    <dm_space height="10"></dm_space>

    <!-- <dm_loading height="200"></dm_loading> -->

    <!-- <match_enroll :matchId="matchId"></match_enroll> -->
    <dm_space height="100"></dm_space>
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

  //  //等值查询的参数
  //       let paramEqual = {
  //         age: 1,
  //         active: true
  //       };
  //       //模糊查询的参数
  //       let paramVague = ;

  data() {
    return {
      param: {
        paramEqual: {
          age: 1,
          active: true
        },
        paramVague: { user: "peb" }
      },
      dataBase: [
        { user: "barney", age: 36, active: true },
        { user: "fred", age: 40, active: false },
        { user: "aebbles", age: 1, active: true },
        { user: "pebabc", age: 1, active: true },
        { user: "pebdef", remark: "备注", age: 1, active: true }
      ],
      searchResult: null,
      msgList: null,
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
  async created() {},

  methods: {
    search(param = {}) {
      let { paramVague, paramEqual } = param;
      //第一步，先处理等值查询
      let result = lodash.filter(this.dataBase, paramEqual);
      console.log("result", result);

      //第一步，处理模糊查询
      this.searchResult = lodash.filter(result, function(doc) {
        let flag = true;
        for (var prop in paramVague) {
          let flagEach;
          if (doc[prop]) {
            //如果对象的属性值存在
            flagEach = doc[prop].includes(paramVague[prop]);
          } else {
            flagEach = false;
          }
          console.log("flagEach", flagEach);
          flag = flag && flagEach;
        }
        console.log("flag", flag);
        return flag;
      });
    },
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

      this.myMsgList = await util.ajaxPopulate({
        listData: this.myMsgList,
        populateColumn: "readDoc",
        idColumn: "P1",
        idColumn2: "msgId",
        page: "tangball_msg_read",
        findJson: {
          memberId: this.memberId
        }
      });

      console.log("this.myMsgList2", this.myMsgList);
    },
    async getMyMsgList2(_json) {
      let data = await ajax({
        //请求接口
        timeout: 11,
        method: "post",
        baseURL: "http://localhost:3000",
        url: `/console_split`,
        data: {
          // id: 1
        } //传递参数
      });

      this.msgList = data;

      // axios.post("http://localhost:3000/console_split", {
      //    body: {}
      //  },{timeout:20}).then(res=>{})
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
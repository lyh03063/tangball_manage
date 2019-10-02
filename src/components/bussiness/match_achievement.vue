<template>
  <div class v-if="matchInfo">
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="赛事信息" />
      <dm_debug_item v-model="cfList.findJsonDefault" text="成绩列表的默认查询参数" />
      <dm_debug_item v-model="cfList.formDataAddInit" text="新增成绩表单默认参数" />
      <dm_debug_item v-model="roundNum" text="轮数" />
      <dm_debug_item v-model="dictEnroolTeam" text="报名的队伍数据字典" />
      <dm_debug_item v-model="dictAchievement" text="成绩数据字典" />
      <dm_debug_item v-model="dictMember" text="当前轮次比赛的球员数据字典" />
      <!-- <dm_debug_item v-model="progressCurr" text="当前选中赛段数据" /> -->
      <dm_debug_item
        v-model="cfList.formItems[0].ajax.param.sheetRelation.findJson"
        text="弹窗表单的第一个字段的下拉框选项ajax查询参数"
      />
    </dm_debug_list>
    <div class="panel">
      <div class>
         
        <el-radio-group
          v-model="progressIndex"
          style="margin-bottom: 10px;"
          @change="changeMatchProgress()"
          v-if="matchInfo.progress"
        >
          <!-- <el-radio-button label>全部</el-radio-button> -->
          <el-radio-button
            :label="index+1"
            v-for="(item,index) in matchInfo.progress"
            :key="index"
          >{{item.name}}</el-radio-button>
        </el-radio-group>
        <dm_space height="1"></dm_space>
        <div class="PSR" >
             <div class="PSA T50 R0 ">当前比赛计分规则：<span class="C_f60">{{scoreRuleName}}</span></div>
        </div>
     
        <el-radio-group
          v-model="roundNum"
          style="margin-bottom: 10px;"
          @change="changeMatchRound()"
          v-if="progressCurr&&progressCurr.roundCount"
        >
          <!-- <el-radio-button label>全部</el-radio-button> -->
          <el-radio-button
            :label="item"
            v-for="(item,index) in progressCurr.roundCount*1"
            :key="index"
          >第{{item}}轮</el-radio-button>
        </el-radio-group>
      </div>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="领先榜" name="first">
          <match_team
            :matchId="matchId"
             :matchInfo="matchInfo"
            :progressIndex="progressIndex"
            :roundNum="roundNum"
            @after-search="afterSearchEnroolTeam"
          >
            <!--比赛队伍列表组件-->
          </match_team>
        </el-tab-pane>
        <el-tab-pane label="对阵分组" name="second">
          <match_confrontation
            :matchId="matchId"
            :matchInfo="matchInfo"
            :progressIndex="progressIndex"
            :roundNum="roundNum"
            :dictMember="dictMember"
            :dictEnroolTeam="dictEnroolTeam"
            :dictAchievement="dictAchievement"
            :listAchievement="listAchievement"
            v-if="readySearch&&readyAchievement"
          >
            <!--比赛对阵列表组件-->
          </match_confrontation>
        </el-tab-pane>
        <el-tab-pane label="成绩明细" name="third">
          <dm_list_data
            :cf="cfList"
            ref="listPersonAch"
            @after-add="afterAddOrModify"
            @after-modify="afterAddOrModify"
            @after-delete="afterDelete"
            @after-search="afterSearchAchievement"
          >
            <!-- 记分卡插槽 -->
            <template v-slot:slot_form_item_scoreList="{formData}">
              <score_card v-model="formData.scoreList" :readOnly="false"></score_card>
            </template>
            <!-- 记分详情弹窗插槽 -->
            <template v-slot:slot_detail_item_scoreList="{row}">
              <score_card v-model="row.scoreList" :readOnly="true"></score_card>
            </template>
            <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
            <template v-slot:slot_detail_item_participantsId="{row}">
              <dm_ajax_populate :id="row.participantsId" populateKey="name" page="tangball_member">
                <template v-slot:default="{doc}">
                  <div class v-if="doc && doc.P1">
                    {{doc.P1}}
                    (
                    {{doc.name}})
                  </div>
                </template>
              </dm_ajax_populate>
            </template>
          </dm_list_data>
        </el-tab-pane>
      </el-tabs>

      <dm_space height="10"></dm_space>
    </div>
  </div>
</template>
<script>
import score_card from "@/components/score_card";
import match_confrontation from "@/components/bussiness/match_confrontation.vue";
import match_team from "@/components/bussiness/match_team.vue";
let T;
export default {
  name: "match_achievement",
  components: { score_card, match_confrontation, match_team },
  props: {
    matchId: [String, Number]
  },
  mixins: [
    PUB.listCF.tangball_achievement,
    PUB.listCF.tangball_achievement_simple
  ],
  data() {
    return {
      activeName: "first", //选项卡激活的名称
      dictMember: null, //当前轮次比赛的球员数据字典
      dictEnroolTeam: null, //报名的队伍数据字典
      dictAchievement: null, //当前赛段和轮次的成绩数据字典
      listAchievement: null, //当前赛段和轮次的成绩列表
      readyAchievement: false, //成绩列表是否加载完成
      readySearch: false, //是否已经准备查询条件：赛段，轮数,数据字典等
      isEdit: true,
      progressIndex: 1, //赛段索引
      roundNum: 1, //轮数
      matchInfo: null, //赛事信息
      cfList: {
        isRefreshAfterCUD: false, //增删改操作后是否自动刷新
        sortJsonDefault: {
          groupNum: 1,
          timeStart: 1
        },
        //默认查询参数
        findJsonDefault: {
          matchId: this.matchId
        },
        //新增表单初始赋值
        formDataAddInit: {
          matchId: this.matchId
        },
        listIndex: "match_achievement" //vuex对应的字段
      }
    };
  },
  computed: {
    //规则名称
    scoreRuleName() {
      let dict = {
        1: "比洞积分赛（最佳成绩法）",
        2: "比洞积分赛（成绩加和法）"
      };
      return dict[T.matchInfo.ruleId];
    },
    progressCurr() {
      //当前选中赛段数据
      console.log("progressCurr####");
      // return this.$lodash.get(this.matchInfo, `progress[this.progressIndex]`)
      let result;
      if (this.matchInfo && this.matchInfo.progress) {
        result = this.matchInfo.progress[this.progressIndex - 1];
      } else {
        result = {};
      }
      return result;
    }
  },
  watch: {
    isEdit: {
      handler(newVal, oldVal) {
        if (this.isEdit) {
          this.cfList.isShowToolBar = true;
          this.cfList.isShowOperateColumn = true;
        } else {
          this.cfList.isShowToolBar = false;
          this.cfList.isShowOperateColumn = false;
        }
      },
      immediate: true //组件初始化时立即执行一次变动
    },
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchId: {
      handler(newVal, oldVal) {
        if (!this.matchId) return;
        this.getMatchData();
      },
      immediate: true //组件初始化时立即执行一次变动
    }
  },
  methods: {
    //成绩列表加载完成后的回调函数
    afterSearchAchievement(list) {
      console.log("list:####", list);

      this.listAchievement = list;
      this.dictAchievement = lodash.keyBy(list, "P1"); //报名的队伍的数据字典
      this.readyAchievement = true;

      //当前轮次比赛的球员数据字典
      let dictMember = {};
      list.forEach(achEach => {
        //循环：{000数组}
        dictMember[achEach.participantsId] = lodash.get(
          achEach,
          `memberDoc.name`
        );
      });
      this.dictMember = dictMember;
    },
    //队伍列表加载完成后的回调函数
    afterSearchEnroolTeam(list) {
      // console.log("list:####", list);

      let listEnroolTeam = list.map(doc => doc.teamDoc); //报名的队伍数组
      this.dictEnroolTeam = lodash.keyBy(listEnroolTeam, "P1"); //报名的队伍的数据字典

      this.readySearch = true;
    },
    //函数：{更新小组成绩名次函数}
    async afterDelete(arrData) {
      let arrGroupNum = arrData.map(doc => doc.groupNum);//获取所有文档的组号
      arrGroupNum = Array.from(new Set(arrGroupNum)); //去重

      //循环异步
      for await (const gn of arrGroupNum) {
        await this.ajaxUpdateCGScore(gn); //调用：{ajax更新小组成绩名次函数}
      }

      this.$refs.listPersonAch.getDataList(); //调用：{列表组件查询函数}
    },
    /**
     * @name ajax更新小组成绩名次函数
     */
    ajaxUpdateCGScore: function(groupNum) {
      return axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/tangball/updateConfrontGroupScore`,
        data: {
          matchId: this.matchId,
          progressIndex: this.progressIndex,
          roundNum: this.roundNum,
          groupNum: groupNum,
          ruleId: this.matchInfo.ruleId
        } //传递参数
      });
    },
    //函数：新增或修改后的回调函数
    async afterAddOrModify(data) {
      console.log("afterAddOrModify");
      if (data && data.groupNum) {
        await this.ajaxUpdateCGScore(data.groupNum); //调用：{ajax更新小组成绩名次函数}
      }
      this.$refs.listPersonAch.getDataList(); //调用：{列表组件查询函数}
    },
    /**
     * @name 进行一次视图更新的函数
     */
    goNextTick: async function() {
      this.readySearch = false;
      await this.$nextTick(); //延迟到视图更新
      this.readySearch = true;
    },
    /**
     * @name 切换赛段函数
     */
    changeMatchProgress: async function() {
      this.roundNum = 1;
      this.changeMatchRound(); //调用：{切换轮数函数}
      this.goNextTick(); //调用：{进行一次视图更新的函数}
    },
    //函数：{切换轮数函数}
    changeMatchRound() {
      let dataInit = {
        progressIndex: this.progressIndex,
        roundNum: this.roundNum
      };
      Object.assign(this.cfList.findJsonDefault, dataInit); //默认查询参数
      this.$set(
        this.cfList.formDataAddInit,
        "progressIndex",
        this.progressIndex
      );
      this.$set(this.cfList.formDataAddInit, "roundNum", this.roundNum);
      // Object.assign(this.cfList.formDataAddInit, dataInit);//默认新增参数---这种不会响应
      if (!this.$refs.listPersonAch) return;
      this.$refs.listPersonAch.getDataList(); //调用：{列表组件查询函数}
      this.goNextTick(); //调用：{进行一次视图更新的函数}
    },
    async getMatchData() {
      let T = this;
      if (!this.matchId) return;
      //函数：{根据赛事id，ajax获取赛事信息函数}
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossDetail?page=tangball_match",
        data: {
          id: this.matchId
        } //传递参数
      });
      this.matchInfo = data.Doc;

      //***修改teamId下拉框字段的ajax配置
      let itemIeamId = this.cfList.formItems.find(
        item => item.prop == "teamId"
      );
      itemIeamId.ajax = {
        url: "/crossListRelation",
        keyLabel: "name",
        keyValue: "P1",
        param: {
          needRelation: "1",
          columnItem: "orderId",
          columnTarget: "orderId",
          sheetRelation: {
            page: "tangball_enroll",
            findJson: {
              //这两个参数在实际使用时需要改造
              matchId: this.matchId
            }
          },
          sheetTarget: {
            page: "tangball_team",
            pageSize: "2000",
            findJson: {}
          }
        }
      };

      //***修改participantsId下拉框字段的ajax配置
      let itemParticipantsId = this.cfList.formItems.find(
        item => item.prop == "participantsId"
      );

      // itemParticipantsId.ajax.param = {
      //   findJson: { phone: { $in: ["13100000001"] } }
      // };

      this.cfList.cfForm = {
        col_span: 12, //控制显示一行多列
        watch: {
          //传入监听器
          async teamId(newVal, oldName) {
            console.log("watch-teamId变化####");

            let { member } = T.dictEnroolTeam[newVal];

            let arrPhone = member.map(doc => doc.phone);
            console.log("arrPhone:", arrPhone);
            // delete itemParticipantsId.ajax;
            // itemParticipantsId.options = [];

            itemParticipantsId.ajax.param = {
              findJson: { phone: { $in: arrPhone } }
            };
            console.log("this.$forceUpdate####");
            this.$forceUpdate(); //***vue 数据层级有点深的时候，会出现无法渲染的问题
          }
        }
      };
    }
  },
  created() {
    T=this;
    T.changeMatchRound(); //调用：{切换轮数函数}
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 15px;
}
</style>

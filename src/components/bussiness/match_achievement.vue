<template>
  <div class v-if="matchInfo">
    <dm_debug_list>
      <dm_debug_item v-model="matchInfo" text="赛事信息" />
      <dm_debug_item v-model="cfList.findJsonDefault" text="成绩列表的默认查询参数" />
      <dm_debug_item v-model="cfList.formDataAddInit" text="新增成绩表单默认参数" />
      <dm_debug_item v-model="roundNum" text="轮数" />
      <dm_debug_item v-model="dictEnroolTeam" text="报名的队伍数据字典" />
      <dm_debug_item v-model="dictAchievement" text="成绩数据字典" />
      <dm_debug_item v-model="arrIdMember" text="arrIdMember" />
      <dm_debug_item v-model="dictMember" text="当前轮次比赛的球员数据字典" />
      <dm_debug_item v-model="listAchPersonRanking" text="listAchPersonRanking" />
    </dm_debug_list>
    <div class="panel">
      <div class>
        <el-radio-group
          v-model="progressIndex"
          style="margin-bottom: 10px;"
          @change="changeMatchProgress()"
          v-if="matchInfo.progress"
        >
          <el-radio-button label>全部</el-radio-button>
          <el-radio-button
            :label="index+1"
            v-for="(item,index) in matchInfo.progress"
            :key="index"
          >{{item.name}}</el-radio-button>
        </el-radio-group>
        <dm_space height="1"></dm_space>
        <div class="PSR">
          <div class="PSA T50 R0">
            当前比赛计分规则：
            <span class="C_f60">{{scoreRuleName}}</span>
          </div>
        </div>
        <el-radio-group
          v-model="roundNum"
          style="margin-bottom: 10px;"
          @change="changeMatchRound()"
          v-if="progressCurr&&progressCurr.roundCount"
        >
          <el-radio-button label>全部</el-radio-button>
          <el-radio-button
            :label="item"
            v-for="(item,index) in progressCurr.roundCount*1"
            :key="index"
          >第{{item}}轮</el-radio-button>
        </el-radio-group>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="对阵分组" name="first">
          <match_confrontation
            :matchId="matchId"
            :matchInfo="matchInfo"
            :progressIndex="progressIndex"
            :roundNum="roundNum"
            :dictMember="dictMember"
            :dictEnroolTeam="dictEnroolTeam"
            :dictAchievement="dictAchievement"
            :listAchievement="listAchievement"
            v-if="readyEnroolTeam&&readyAchievement"
          >
            <!--比赛对阵列表组件-->
          </match_confrontation>
        </el-tab-pane>
        <el-tab-pane label="成绩明细" name="second">
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
        <el-tab-pane label="领先榜" name="third">
          <match_ranking_team
            :matchId="matchId"
            :matchInfo="matchInfo"
            :progressIndex="progressIndex"
            :roundNum="roundNum"
            v-if="readyAchievement&&matchInfo.matchForm=='2'"
          >
            <!--比赛队伍列表组件-->
          </match_ranking_team>
          <div class v-else-if="listAchPersonRanking&&matchInfo.matchForm=='1'">
            <table class="n-table">
              <tr>
                <th class="W50">序号</th>
                <th class="W100">姓名</th>
                <th class="W100">总杆数</th>
              </tr>
              <tr v-for="(item,i) in listAchPersonRanking" :key="i">
                <td>{{i}}</td>
                <td>{{dictMember[item.participantsId].name}}</td>
                <td>{{item.matchScore}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <dm_space height="10"></dm_space>
    </div>
  </div>
</template>
<script>
import score_card from "@/components/score_card";
import match_confrontation from "@/components/bussiness/match_confrontation.vue";
import match_ranking_team from "@/components/bussiness/match_ranking_team.vue";
let T;
export default {
  name: "match_achievement",
  components: { score_card, match_confrontation, match_ranking_team },
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
      listAchPersonRanking: null, //个人赛成绩排行数组
      arrIdMember: null, //本场比赛的球员id
      dictMember: null, //本场比赛的球员数据字典
      dictEnroolTeam: null, //报名的队伍数据字典
      dictAchievement: null, //当前赛段和轮次的成绩数据字典
      listAchievement: null, //当前赛段和轮次的成绩列表
      readyAchievement: false, //成绩列表是否加载完成
      readyEnroolTeam: false, //参赛队伍列表是否加载完成
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
      this.listAchievement = list;
      this.dictAchievement = lodash.keyBy(list, "P1"); //报名的队伍的数据字典
      this.readyAchievement = true;

      let listAchPersonRanking = util.deepCopy(this.listAchievement);
      //数字数组（由大到小）
      this.listAchPersonRanking = listAchPersonRanking.sort(function(a, b) {
        return a.matchScore - b.matchScore;
      });
    },

    //函数：{更新小组成绩名次函数}
    async afterDelete(arrData) {
      let arrGroupNum = arrData.map(doc => doc.groupNum); //获取所有文档的组号
      arrGroupNum = Array.from(new Set(arrGroupNum)); //去重
      //循环异步
      for await (const gn of arrGroupNum) {
        await this.ajaxUpdateCGScore(gn); //调用：{ajax更新小组成绩名次函数}
      }
      this.$refs.listPersonAch.getDataList(); //调用：{列表组件查询函数}
      this.readyAchievement = false;
      await this.$nextTick(); //延迟到视图更新
      this.readyAchievement = true;
    },
    //函数：新增或修改后的回调函数
    async afterAddOrModify(data) {
      if (data && data.groupNum) {
        await this.ajaxUpdateCGScore(data.groupNum); //调用：{ajax更新小组成绩名次函数}
      }
      this.$refs.listPersonAch.getDataList(); //调用：{列表组件查询函数}
      this.readyAchievement = false;
      await this.$nextTick(); //延迟到视图更新
      this.readyAchievement = true;
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
    /**
     * @name 进行一次视图更新的函数
     */
    goNextTick: async function() {
      this.readyEnroolTeam = false;
      await this.$nextTick(); //延迟到视图更新
      this.readyEnroolTeam = true;
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

      if (!this.$refs.listPersonAch) return;
      this.$refs.listPersonAch.getDataList(); //调用：{列表组件查询函数}
      this.goNextTick(); //调用：{进行一次视图更新的函数}
    },
    //获取赛事信息的函数
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

      //Q1：团体赛-修改配置
      if (this.matchInfo.matchForm == "2") {
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
        //添加监听器
        lodash.set(this.cfList.cfForm, `watch.teamId`, function(
          newVal,
          oldName
        ) {
          console.log("watch-teamId变化####1111");
          let { member } = T.dictEnroolTeam[newVal];
          let arrPhone = member.map(doc => doc.phone);
          itemParticipantsId.ajax.param = {
            findJson: { phone: { $in: arrPhone } }
          };
          this.$forceUpdate(); //***vue 数据层级有点深的时候，会出现无法渲染的问题
        });
        //如果是团体赛
        this.ajaxGetEnrollTeamAndMember(); //调用：{获取报名的球队并拼装球队和球员数据字典函数}
        //Q2：个人赛-修改配置
      } else {
        //***修改teamId下拉框字段的ajax配置
        let index1 = this.cfList.formItems.findIndex(
          item => item.prop == "teamId"
        );
        this.cfList.formItems.splice(index1, 1); ////***删除团队下拉框配置,注意是数组而不是对象
        await this.ajaxGetEnrollMember(); //调用：{获取报名的球员并拼装数据字典函数}

        //***修改participantsId下拉框字段的ajax配置
        let itemParticipantsId = this.cfList.formItems.find(
          item => item.prop == "participantsId"
        );

        itemParticipantsId.ajax.param = {
          findJson: { P1: { $in: T.arrIdMember } }
        };
      }
    },
    /**
     * @name 获取报名的球员并拼装数据字典函数-个人赛的
     */
    ajaxGetEnrollMember: async function() {
      let {
        data: { list: memberList }
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossListRelation`,
        data: {
          needRelation: "1",
          columnItem: "memberId",
          columnTarget: "P1",
          sheetRelation: {
            page: "tangball_enroll",
            findJson: {
              //这两个参数在实际使用时需要改造
              matchId: this.matchId
            }
          },
          sheetTarget: {
            page: "tangball_member",
            pageSize: "2000",
            findJson: {}
          }
        }
      });
      this.arrIdMember = memberList.map(doc => doc.P1); //本场比赛的球员id数组

      this.dictMember = lodash.keyBy(memberList, "P1"); //报名的队伍的数据字典

      console.log("this.dictMember:", this.dictMember);
      this.readyEnroolTeam = true;
    },
    /**
     * @name 获取报名的球队并拼装球队和球员数据字典函数-团体赛的
     */
    ajaxGetEnrollTeamAndMember: async function() {
      let { data: dataTeam } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossListRelation`,
        data: {
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
      });

      this.dictEnroolTeam = lodash.keyBy(dataTeam.list, "P1"); //报名的队伍的数据字典
      console.log("this.dictEnroolTeam:", this.dictEnroolTeam);
      this.readyEnroolTeam = true;

      /****************************团体赛的球员数据字典-START****************************/
      let arrMemberPhone = []; //球员手机号
      dataTeam.list.forEach(teamEach => {
        //循环：{000数组}
        let arrPhoneTeam = teamEach.member.map(doc => doc.phone); //每队的手机号数组
        arrMemberPhone.push(...arrPhoneTeam);
      });

      arrMemberPhone = arrMemberPhone.filter(phone => !!phone); //过滤无效的号码
      let {
        data: { list: memberList }
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossList?page=tangball_member`,
        data: {
          pageSize: 9999,
          findJson: { phone: { $in: arrMemberPhone } }
        } //传递参数
      });

      this.dictMember = lodash.keyBy(memberList, "P1"); //报名的队伍的数据字典
      this.arrIdMember = memberList.map(doc => doc.P1); //本场比赛的球员id数组
      /****************************团体赛的球员数据字典-END****************************/
    }
  },
  created() {
    T = this;
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

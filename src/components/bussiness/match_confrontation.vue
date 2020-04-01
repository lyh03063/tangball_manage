
<template>
  <div class>
    <!--比赛对阵分组列表-->

    <dm_debug_list>
      <dm_debug_item v-model="dictEnroolTeam" text="dictEnroolTeam" />
      <dm_debug_item v-model="dictAchievement" text="dictAchievement" />
      <dm_debug_item v-model="listAchievement" text="listAchievement" />
      <dm_debug_item v-model="dictMember" text="dictMember" />
    </dm_debug_list>

    <dm_list_data :cf="cfListMatchGroup" ref="listConfront" @bacth-btn-click="bacthBtnClick">
      <template v-slot:slot_column_groupMember="{row}">{{getConfrontText(row)}}</template>

      <!--比赛结果列配置-->
      <template v-slot:slot_column_matchResult2="{row}">
        <div class v-if="true">
          <score_card_confront
            :value="getGroupAch(row.groupNum)"
            :matchInfo="matchInfo"
            :dictMember="dictMember"
            :isTeam="true"
            :arrConfront="getArrConfront(row)"
          ></score_card_confront>
        </div>
      </template>

      <!--比赛结果列配置-->
      <template v-slot:slot_column_matchResult="{row}">
        <el-link type="primary" @click="toggleFold(row)">{{getMatchResult(row)}}</el-link>
      </template>
      <!--总杆数结果列配置-->
      <template v-slot:slot_column_matchPolesResult="{row}">{{getMatchPolesResult(row)}}</template>
    </dm_list_data>
  </div>
</template>
<script>
let T;
import score_card_confront from "@/components/bussiness/score_card_confront";
export default {
  components: { score_card_confront },
  props: [
    "matchId",
    "matchInfo",
    "progressIndex",
    "roundNum",
    "dictEnroolTeam",
    "dictAchievement",
    "listAchievement",
    "dictMember"
  ], //（需要确定赛事，赛段，第几轮）

  data() {
    return {
      tipVisibles: {},
      active: null, //聚焦的默认状态为0
      //列表配置-深拷贝过来修改，避免影响原列表
      cfListMatchGroup: util.deepCopy(PUB.listCF.tangball_group)
    };
  },
  methods: {
    /**
     * @name 自定义批量操作按钮点击函数
     */
    bacthBtnClick: async function(eventType, selection) {
      console.log("bacthBtnClick-eventType:", eventType);
      if (eventType == "bacthUpdateScore") {
        //如果{000}000

        let clickStatus = await T.$confirm(
          "该操作用于切换了计分规则时的分数更新，确认操作？"
        ).catch(() => {});

        if (clickStatus == "confirm") {
          let tableData = T.$refs.listConfront.tableData;

          let arrCofrontGroup = tableData.map((doc, index) => {
            return {
              matchId: T.matchId,
              progressIndex: T.progressIndex,
              roundNum: T.roundNum,
              groupNum: doc.groupNum,
              ruleId: T.matchInfo.ruleId
            };
          });
          console.log("arrCofrontGroup:", arrCofrontGroup);

          // 请求新增附件的接口
          let { data } = await axios({
            method: "post",
            url: `${PUB.domain}/tangball/batchUpdateConfrontGroupScore`,
            data: { arrCofrontGroup } //将新增数据传进接口中
          });

          //如果点击了确定
          T.$message({
            type: "success",
            message: "批量更新分数操作成功!"
          });
        }
      }
    },
    //函数：{切换行展开的函数}}
    toggleFold(row) {
      //切换展开
      T.$refs.listConfront.$refs.table.toggleRowExpansion(row);
    },
    //函数：{获取指定组的个人成绩列表}
    getGroupAch(groupNum) {
      return T.listAchievement.filter(item => item.groupNum == groupNum);
    },
    //函数：{获取小组对阵队伍数组}
    getArrConfront(row) {
      //Q1：团体赛-配置
      if (T.matchInfo.matchForm == "2") {
        return T.getArrConfrontTeam(row);
        //Q2：个人赛-配置
      } else {
        return T.getArrConfrontPerson(row);
      }
    },

    //函数：{获取小组对阵队伍数组}
    getArrConfrontTeam(row) {
      let id1 = lodash.get(row, `groupMember[0].id`);
      let id2 = lodash.get(row, `groupMember[1].id`);
      let teamName1 = lodash.get(T.dictEnroolTeam, `[${id1}].name`);
      let teamName2 = lodash.get(T.dictEnroolTeam, `[${id2}].name`);
      return [
        { id: id1, name: teamName1, ...row.groupMember[0] },
        { id: id2, name: teamName2, ...row.groupMember[1] }
      ];
    },
    //函数：{获取小组对阵个人数组}
    getArrConfrontPerson(row) {
      let arrResult = [];
      let n = lodash.get(row, `groupMember.length`, 0); //小组成员数量
      for (var i = 0; i < n; i++) {
        let id = lodash.get(row, `groupMember[${i}].id`);
        let name = lodash.get(T.dictMember, `[${id}].name`);
        let achDoc = T.listAchievement.find(doc => doc.participantsId == id);
        var dictScore;
        //如果对应的成绩数据存在，拼装数据字典
        if (achDoc && achDoc.scoreList) {
          dictScore = lodash.keyBy(achDoc.scoreList, "holeNum");
        }
        arrResult.push({ id: id, name: name, dictScore });
      }

      return arrResult;
    },

    //函数：{获取当前分组的对阵文本说明函数}
    getConfrontText(row) {
      let id1 = lodash.get(row, `groupMember[0].id`);
      let id2 = lodash.get(row, `groupMember[1].id`);
      //Q1：团体赛
      if (T.matchInfo.matchForm == "2") {
        let teamName1 = lodash.get(T.dictEnroolTeam, `[${id1}].name`);
        let teamName2 = lodash.get(T.dictEnroolTeam, `[${id2}].name`);
        return `${teamName1} VS ${teamName2}`;
        //Q2：个人赛
      } else {
        let arrPerson = [];
        let str;
        if (row.groupMember && row.groupMember.length) {
          row.groupMember.forEach(gMEach => {
            let name = lodash.get(T.dictMember, `[${gMEach.id}].name`);
            arrPerson.push(name);
          });
          str = arrPerson.join(",");
        } else {
          str = "无成员";
        }

        return str;
      }
    },

    //函数：{获取总杆数结果函数}
    getMatchPolesResult(row) {
      //Q1：团体赛-配置
      if (T.matchInfo.matchForm == "2") {
        return T.getMatchPolesResultForTeam(row);
        //Q2：个人赛-配置
      } else {
        return T.getMatchPolesResultForPerson(row);
      }
    },
    //函数：{获取当前分组的团体赛总杆数结果函数}
    getMatchPolesResultForTeam(row) {
      let teamId1 = lodash.get(row, `groupMember[0].id`);
      let teamId2 = lodash.get(row, `groupMember[1].id`);
      //第1队的个人成绩列表
      let arrAchievement1 = T.listAchievement.filter(
        doc => doc.teamId == teamId1 && doc.groupNum == row.groupNum
      );
      //第2队的个人成绩列表
      let arrAchievement2 = T.listAchievement.filter(
        doc => doc.teamId == teamId2 && doc.groupNum == row.groupNum
      );

      //总杆数reduce求和，指定初始n值为0

      let matchScoreTeam1 = arrAchievement1.reduce(
        (n, doc) => n + (doc["matchScore"] || 0),
        0
      );
      let matchScoreTeam2 = arrAchievement2.reduce(
        (n, doc) => n + (doc["matchScore"] || 0),
        0
      );

      return `${matchScoreTeam1} : ${matchScoreTeam2}`;
    },
    //函数：{获取当前分组的个人赛总杆数结果函数}
    getMatchPolesResultForPerson(row) {
      let arrPolesTotal = [];
      let n = lodash.get(row, `groupMember.length`, 0); //小组成员数量
      row.groupMember.forEach(gMEach => {
        //匹配的成绩
        let achDoc = T.listAchievement.find(
          doc => doc.participantsId == gMEach.id
        );
        let score = achDoc ? achDoc.matchScore : 0;
        arrPolesTotal.push(score);
      });
      let str = arrPolesTotal.join(" : ");
      return str;
    },
    //函数：{获取当前分组的比赛结果函数}
    getMatchResult(row) {
      let key = "teamHoleScoreTotal";
      let score1 = lodash.get(row, `groupMember[0].${key}`, 0);
      let score2 = lodash.get(row, `groupMember[1].${key}`, 0);
      return `${score1} : ${score2} `;

      // return `${matchScoreTeam1} : ${matchScoreTeam2}`;
    }
  },

  created() {
    T = this;
    //合并对象

    /**
          formItems.find(groupMember)
      .collectionCfForm.formItems.find(id)
         */

    let ajaxSelectCF; //小组成员的下拉框ajax配置
    //Q1：团体赛-配置
    if (T.matchInfo.matchForm == "2") {
      ajaxSelectCF = {
        label: "球队",
        prop: "id",
        type: "select",
        ajax: {
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
                matchId: T.matchId
              }
            },
            sheetTarget: {
              page: "tangball_team",
              pageSize: "2000",
              findJson: {}
            }
          }
        }
      };

      //Q2：个人赛-配置
    } else {
      ajaxSelectCF = {
        label: "球员",
        prop: "id",
        type: "select",
        ajax: {
          url: "/crossListRelation",
          keyLabel: "name",
          keyValue: "P1",
          param: {
            needRelation: "1",
            columnItem: "memberId",
            columnTarget: "P1",
            sheetRelation: {
              page: "tangball_enroll",
              findJson: {
                //这两个参数在实际使用时需要改造
                matchId: T.matchId
              }
            },
            sheetTarget: {
              page: "tangball_member",
              pageSize: "2000",
              findJson: {}
            }
          }
        }
      };
    }


console.log("util.cfList.bBtns.add:####", util.cfList.bBtns.add);
    let cfListFinal = {
      focusMenu: false,
      isShowSearchForm: false, //隐藏查询表单
      isShowBreadcrumb: false, //隐藏面包屑导航
      isShowPageLink: false, //隐藏分页
      expand: true, //展开行
      //单项操作按钮的配置
      singleBtns: {
        //按钮列表
        addon: [util.cfList.sBtns.modify, util.cfList.sBtns.delete]
      },
      //批量操作按钮的配置
      batchBtns: {
        //add: false, //配置基础按钮隐藏（默认显示）
        // delete: false, //配置基础按钮隐藏（默认显示）
        addon: [
      
          util.cfList.bBtns.add,
          { text: "批量更新分数", eventType: "bacthUpdateScore" }
        ]
      },
      sortJsonDefault: {
        groupNum: 1
      },
      //默认查询参数
      findJsonDefault: {
        matchId: T.matchId,
        progressIndex: T.progressIndex,
        roundNum: T.roundNum
      },

      //新增表单初始赋值
      formDataAddInit: {
        matchId: T.matchId,
        progressIndex: T.progressIndex,
        roundNum: T.roundNum
      },
      //展开行配置
      expands: [
        {
          label: "比赛结果",
          prop: "matchResult",
          slot: "slot_column_matchResult2"
        }
      ],
      columns: [
        {
          label: "组号",
          prop: "groupNum",
          width: 90
        },
        {
          label: "小组成员对阵",
          prop: "groupMember",
          slot: "slot_column_groupMember",
          width: 170
        },
        {
          label: "积分结果",
          prop: "matchResultForScore",
          slot: "slot_column_matchResult",
          width: 180
        },
        {
          label: "总杆数对比",
          prop: "matchResult",
          slot: "slot_column_matchPolesResult",
          width: 180
        },
        {
          label: "比赛开始时间",
          prop: "timeStart",
          width: 180,
          formatter: function(rowData) {
            return moment(rowData.timeStart).format("YYYY-MM-DD HH:mm");
          }
          // type: "dateTime"
        }
      ],
      //新增修改弹窗的一些配置
      cfDialogForm: {
        tips: {
          text: "1,同一轮比赛的组号不能重复<br/> 2,团体赛通常是两个球队进行PK",
          style: { "padding-left": "120px" }
        }
      },
      //-------新增、修改表单字段数组-------
      formItems: [
        {
          label: "组号",
          prop: "groupNum",
          type: "number",
          rules: [{ required: true, message: "不能为空" }]
        },
        {
          label: "开始时间",
          prop: "timeStart",
          type: "dateTime"
        },
        {
          label: "结束时间",
          prop: "timeEnd",
          type: "dateTime"
        },
        {
          label: "小组成员",
          prop: "groupMember",
          type: "collection",
          collectionlistType: "form",
          default: [{ __id: 1 }, { __id: 2 }],
          collectionCfForm: {
            col_span: 12,
            formItems: [ajaxSelectCF] //个人赛和团体赛不同
          }
        }
      ]
    };

    //如果是个人赛
    if (T.matchInfo.matchForm != "2") {
      let index = cfListFinal.columns.findIndex(
        item => item.prop == "matchResultForScore"
      );
      console.log("index:####", index);
      cfListFinal.columns.splice(index, 1); //删除掉
    }
    console.log("cfListFinal:####", cfListFinal);
    Object.assign(T.cfListMatchGroup, cfListFinal);
  }
};
</script>


<style scoped>
.match_step {
  margin: 10px;
}
</style>

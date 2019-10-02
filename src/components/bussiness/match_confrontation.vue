
<template>
  <div class>
    <!--比赛对阵分组列表-->

    <dm_debug_list>
      <dm_debug_item v-model="dictEnroolTeam" text="confrontation中的dictEnroolTeam" />
      <dm_debug_item v-model="dictAchievement" text="confrontation中的dictAchievement" />
      <dm_debug_item v-model="listAchievement" text="confrontation中的listAchievement" />
    </dm_debug_list>

    <dm_list_data :cf="cfListMatchGroup" ref="listConfront">
      <template v-slot:slot_column_groupMember="{row}">{{getConfrontText(row)}}</template>
      <!-- <template v-slot:slot_column_matchResult="{row}"></template> -->

      <!--比赛结果列配置-->
      <template v-slot:slot_column_matchResult2="{row}">
        <div class v-if="true">
          <score_card_confront
            :value="getGroupAch(row.groupNum)"
            :matchInfo="matchInfo"
            :dictMember="dictMember"
            :isTeam="true"
            :arrTeam="getArrConfrontTeam(row)"
          ></score_card_confront>
        </div>
      </template>

      <!--比赛结果列配置-->
      <template v-slot:slot_column_matchResult="{row}">
        <el-link type="primary" @click="toggleFold(row)">{{getMatchResult(row)}}</el-link>
      </template>
      <!--总杆数结果列配置-->
      <template v-slot:slot_column_matchPolesResult="{row}">
        {{getMatchPolesResult(row)}}
      </template>
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
      cfListMatchGroup: util.deepCopy(PUB.listCF.tangball_group),
      scoreList: [
        {
          _id: "5d8f675f3eaaa91a1dbea4cf",
          P1: 67,
          roundNum: 1,
          teamId: 19,
          participantsId: 91,
          groupNum: 1,
          tee: 1,
          scoreList: [
            {
              holeNum: 1,
              score: 2
            },
            {
              holeNum: 2,
              score: 2
            },
            {
              holeNum: 3,
              score: 1
            },
            {
              holeNum: 4,
              score: 1
            },
            {
              holeNum: 5,
              score: 1
            },
            {
              holeNum: 6,
              score: 1
            },
            {
              holeNum: 7,
              score: 1
            },
            {
              holeNum: 8,
              score: 1
            },
            {
              holeNum: 9,
              score: 1
            },
            {
              holeNum: 10,
              score: 2
            },
            {
              holeNum: 11,
              score: 2
            },
            {
              holeNum: 12,
              score: 1
            },
            {
              holeNum: 13,
              score: 1
            },
            {
              holeNum: 14,
              score: 1
            },
            {
              holeNum: 15,
              score: 1
            },
            {
              holeNum: 16,
              score: 1
            },
            {
              holeNum: 17,
              score: 1
            },
            {
              holeNum: 18,
              score: 1
            }
          ],
          matchScore: 22
        },
        {
          _id: "5d8f68303eaaa91a1dbea4d7",
          P1: 69,
          roundNum: 1,
          teamId: 19,
          participantsId: 98,
          groupNum: 1,
          tee: 1,
          scoreList: [
            {
              holeNum: 1,
              score: 2
            },
            {
              holeNum: 2,
              score: 1
            },
            {
              holeNum: 3,
              score: 1
            },
            {
              holeNum: 4,
              score: 2
            },
            {
              holeNum: 5,
              score: 2
            },
            {
              holeNum: 6,
              score: 2
            },
            {
              holeNum: 7,
              score: 1
            },
            {
              holeNum: 8,
              score: 1
            },
            {
              holeNum: 9,
              score: 1
            },
            {
              holeNum: 10,
              score: 2
            },
            {
              holeNum: 11,
              score: 1
            },
            {
              holeNum: 12,
              score: 1
            },
            {
              holeNum: 13,
              score: 2
            },
            {
              holeNum: 14,
              score: 2
            },
            {
              holeNum: 15,
              score: 2
            },
            {
              holeNum: 16,
              score: 1
            },
            {
              holeNum: 17,
              score: 1
            },
            {
              holeNum: 18,
              score: 1
            }
          ],
          matchScore: 26
        },
        {
          _id: "5d8f67f03eaaa91a1dbea4d6",
          P1: 68,
          roundNum: 1,
          teamId: 20,
          participantsId: 93,
          groupNum: 1,
          tee: 1,
          scoreList: [
            {
              holeNum: 1,
              score: 2
            },
            {
              holeNum: 2,
              score: 1
            },
            {
              holeNum: 3,
              score: 2
            },
            {
              holeNum: 4,
              score: 2
            },
            {
              holeNum: 5,
              score: 2
            },
            {
              holeNum: 6,
              score: 1
            },
            {
              holeNum: 7,
              score: 4
            },
            {
              holeNum: 8,
              score: 2
            },
            {
              holeNum: 9,
              score: 2
            },
            {
              holeNum: 10,
              score: 2
            },
            {
              holeNum: 11,
              score: 1
            },
            {
              holeNum: 12,
              score: 2
            },
            {
              holeNum: 13,
              score: 2
            },
            {
              holeNum: 14,
              score: 2
            },
            {
              holeNum: 15,
              score: 1
            },
            {
              holeNum: 16,
              score: 2
            },
            {
              holeNum: 17,
              score: 2
            },
            {
              holeNum: 18,
              score: 2
            }
          ],
          matchScore: 34
        },
        {
          _id: "5d8f66f83eaaa91a1dbea4ce",
          P1: 66,
          roundNum: 1,
          teamId: 20,
          participantsId: 92,
          groupNum: 1,
          timeStart: "2019-09-27T16:00:00.000Z",
          timeEnd: "2019-09-27T17:00:00.000Z",
          tee: 1,
          scoreList: [
            {
              holeNum: 1,
              score: 1
            },
            {
              holeNum: 2,
              score: 2
            },
            {
              holeNum: 3,
              score: 1
            },
            {
              holeNum: 4,
              score: 1
            },
            {
              holeNum: 5,
              score: 2
            },
            {
              holeNum: 6,
              score: 1
            },
            {
              holeNum: 7,
              score: 1
            },
            {
              holeNum: 8,
              score: 2
            },
            {
              holeNum: 9,
              score: 1
            },
            {
              holeNum: 10,
              score: 1
            },
            {
              holeNum: 11,
              score: 2
            },
            {
              holeNum: 12,
              score: 1
            },
            {
              holeNum: 13,
              score: 1
            },
            {
              holeNum: 14,
              score: 2
            },
            {
              holeNum: 15,
              score: 1
            },
            {
              holeNum: 16,
              score: 1
            },
            {
              holeNum: 17,
              score: 2
            },
            {
              holeNum: 18,
              score: 1
            }
          ],
          matchScore: 24
        }
      ]
    };
  },
  methods: {
    //函数：{切换行展开的函数}}
    toggleFold(row) {
      T.$refs.listConfront.$refs.table.toggleRowExpansion(row);
    },
    //函数：{获取指定组的个人成绩列表}
    getGroupAch(groupNum) {
      return T.listAchievement.filter(item => item.groupNum == groupNum);
    },

    //函数：{获取小组对阵队伍数组}
    getArrConfrontTeam(row) {
      let teamId1 = lodash.get(row, `groupMember[0].id`);
      let teamId2 = lodash.get(row, `groupMember[1].id`);
      let teamName1 = lodash.get(T.dictEnroolTeam, `[${teamId1}].name`);
      let teamName2 = lodash.get(T.dictEnroolTeam, `[${teamId2}].name`);
      return [
        { id: teamId1, name: teamName1, ...row.groupMember[0] },
        { id: teamId2, name: teamName2, ...row.groupMember[1] }
      ];
      // return [{ id: 19, name: "AA11" }, { id: 20, name: "BB队" }]
    },
    //函数：{获取当前分组的对阵文本说明函数}
    getConfrontText(row) {
      let teamId1 = lodash.get(row, `groupMember[0].id`);
      let teamId2 = lodash.get(row, `groupMember[1].id`);
      let teamName1 = lodash.get(T.dictEnroolTeam, `[${teamId1}].name`);
      let teamName2 = lodash.get(T.dictEnroolTeam, `[${teamId2}].name`);
      return `${teamName1} VS ${teamName2}`;
    },
    //函数：{获取当前分组的总杆数结果函数}
    getMatchPolesResult(row) {
     

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

      // return `${matchScoreTeam1} : ${matchScoreTeam2}`;
    },
    //函数：{获取当前分组的比赛结果函数}
    getMatchResult(row) {
     
      let key = "teamHoleScoreTotal";

      let score1 = lodash.get(row, `groupMember[0].${key}`);
      let score2 = lodash.get(row, `groupMember[1].${key}`);
      return `${score1} : ${score2} `;

      // return `${matchScoreTeam1} : ${matchScoreTeam2}`;
    }
  },

  created() {
    T = this;
    //合并对象

    Object.assign(T.cfListMatchGroup, {
      focusMenu: false,
      isShowSearchForm: false, //隐藏查询表单
      isShowBreadcrumb: false, //隐藏面包屑导航
      isShowPageLink: false, //隐藏分页
      expand: true, //展开行
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
          prop: "matchResult",
          slot: "slot_column_matchResult",
          width: 180
        },
        {
          label: "总杆数对比",
          prop: "matchResult",
          slot: "slot_column_matchPolesResult",
          width: 180
        }
      ],
      //-------新增、修改表单字段数组-------
      formItems: [
        {
          label: "组号",
          prop: "groupNum",
          type: "number"
        },

        {
          label: "小组成员",
          prop: "groupMember",
          type: "collection",
          collectionlistType: "form",
          collectionCfForm: {
            col_span: 12,
            formItems: [
              {
                label: "球队id",
                prop: "id",
                type: "select",
                ajax: {
                  url: "/crossList?page=tangball_team",
                  keyLabel: "name",
                  keyValue: "P1"
                }
              }
            ]
          }
        }
      ]
    });
  }
};
</script>


<style scoped>
.match_step {
  margin: 10px;
}
</style>

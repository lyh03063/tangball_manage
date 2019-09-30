
<template>
  <div class>
    <!--比赛对阵分组列表-->

    <dm_debug_list>
      <dm_debug_item v-model="dictEnroolTeam" text="confrontation中的dictEnroolTeam" />
      <dm_debug_item v-model="dictAchievement" text="confrontation中的dictAchievement" />
      <dm_debug_item v-model="listAchievement" text="confrontation中的listAchievement" />
    </dm_debug_list>

    <dm_list_data :cf="cfListMatchGroup">
      <template v-slot:slot_column_groupMember="{row}">{{getConfrontText(row)}}</template>
      <!-- <template v-slot:slot_column_matchResult="{row}"></template> -->

      <!--队伍名称列配置-->
      <template v-slot:slot_column_matchResult="{row}">
        <div class v-if="true">
          <el-popover placement="right" width="1000" v-model="tipVisibles[row.P1]">
            <div>
              <score_card_confront
                v-model="scoreList"
                :readOnly="false"
                :isTeam="true"
                :multiple="true"
              ></score_card_confront>
            </div>
            <el-link type="primary" slot="reference">{{getMatchResult(row)}}</el-link>
          </el-popover>
        </div>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import score_card_confront from "@/components/bussiness/score_card_confront";
export default {
  components: { score_card_confront },
  props: [
    "matchId",
    "progressIndex",
    "roundNum",
    "dictEnroolTeam",
    "dictAchievement",
    "listAchievement"
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
    //函数：{获取当前分组的对阵文本说明函数}
    getConfrontText(row) {
      let teamId1 = lodash.get(row, `groupMember[0].id`);
      let teamId2 = lodash.get(row, `groupMember[1].id`);
      let teamName1 = lodash.get(this.dictEnroolTeam, `[${teamId1}].name`);
      let teamName2 = lodash.get(this.dictEnroolTeam, `[${teamId2}].name`);
      return `${teamName1} VS ${teamName2}`;
    },
    //函数：{获取当前分组的比赛结果函数}
    getMatchResult(row) {
      let teamId1 = lodash.get(row, `groupMember[0].id`);
      let teamId2 = lodash.get(row, `groupMember[1].id`);
      //第1队的个人成绩列表
      let arrAchievement1 = this.listAchievement.filter(
        doc => doc.teamId == teamId1 && doc.groupNum == row.groupNum
      );
      //第2队的个人成绩列表
      let arrAchievement2 = this.listAchievement.filter(
        doc => doc.teamId == teamId2 && doc.groupNum == row.groupNum
      );
      console.log("arrAchievement1:", arrAchievement1);
      console.log("arrAchievement2:", arrAchievement2);

      //总杆数reduce求和，指定初始n值为0

      let matchScoreTeam1 = arrAchievement1.reduce(
        (n, doc) => n + (doc["matchScore"] || 0),
        0
      );
      let matchScoreTeam2 = arrAchievement2.reduce(
        (n, doc) => n + (doc["matchScore"] || 0),
        0
      );

      return `${matchScoreTeam1} VS ${matchScoreTeam2}`;
    }
  },

  created() {
    //合并对象

    Object.assign(this.cfListMatchGroup, {
      focusMenu: false,
      isShowSearchForm: false, //隐藏查询表单
      isShowBreadcrumb: false, //隐藏面包屑导航
      isShowPageLink: false, //隐藏分页
      sortJsonDefault: {
        groupNum: 1
      },
      //默认查询参数
      findJsonDefault: {
        matchId: this.matchId,
        progressIndex: this.progressIndex,
        roundNum: this.roundNum
      },

      //新增表单初始赋值
      formDataAddInit: {
        matchId: this.matchId,
        progressIndex: this.progressIndex,
        roundNum: this.roundNum
      },
      columns: [
        {
          label: "组号",
          prop: "groupNum",
          width: 60
        },
        {
          label: "小组成员对阵",
          prop: "groupMember",
          slot: "slot_column_groupMember",
          width: 100
        },
        {
          label: "结果",
          prop: "matchResult",
          slot: "slot_column_matchResult",
          width: 100
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

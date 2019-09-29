
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
      <template v-slot:slot_column_matchResult="{row}">{{getMatchResult(row)}}</template>
    </dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
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
      active: null, //聚焦的默认状态为0
      //列表配置-深拷贝过来修改，避免影响原列表
      cfListMatchGroup: util.deepCopy(PUB.listCF.tangball_group)
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
          width: 100
        },
        {
          label: "小组成员对阵",
          prop: "groupMember",
          slot: "slot_column_groupMember",
          width: 200
        },
        {
          label: "结果",
          prop: "matchResult",
          slot: "slot_column_matchResult",
          width: 200
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

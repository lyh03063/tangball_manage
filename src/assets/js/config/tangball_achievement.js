
export default  {
  powerPath: "matchCenter.list_achievement",//权限路径
  listIndex: "list_achievement", //vuex对应的字段
  twoTitle: "赛事",
  threeTitle: "比赛成绩",
  focusMenu: true,//进行菜单聚焦
  flag: true,
  url: {
    list: "/crossList?page=tangball_achievement", //列表接口
    add: "/crossAdd?page=tangball_achievement", //新增接口
    modify: "/crossModify?page=tangball_achievement", //修改接口
    detail: "/crossDetail?page=tangball_achievement", //查看单条数据详情接口，在修改表单或详情弹窗用到
    delete: "/crossDelete?page=tangball_achievement" //删除接口
  },
  dynamicDict: [//动态数据字典-会员
    {
      page: "tangball_member",
      populateColumn: "memberDoc",
      idColumn: "participantsId",
      idColumn2: "P1",
    },
    {
      page: "tangball_match",
      populateColumn: "matchDoc",
      idColumn: "matchId",
      idColumn2: "P1",
    },
    {
      page: "tangball_team",
      populateColumn: "team",
      idColumn: "teamId",
      idColumn2: "P1",
    },
  ],
  //批量操作按钮的配置
  batchBtns: {
    addon: [

      util.cfList.bBtns.delete,
    ],

    tips: {
      text: "数据来源于小程序或赛事的“对阵分组/成绩”中添加",
    }
  },
  cfForm: {
    col_span: 12, //控制显示一行多列
    watch: {
      scoreList: {
        handler() {
          if (this.value.scoreList) {
            this.value.matchScore = 0
            this.value.scoreList.forEach(item => {
              this.value.matchScore += Number(item.score);
            });
          }

        },
        immediate: true,
        deep: true
      }
    },
  },
  //-------列配置数组-------
  columns: [

    COLUMNS.participantsId,
    COLUMNS.teamId,
    COLUMNS.matchId,
    COLUMNS.progressIndex,
    COLUMNS.roundNum,
    COLUMNS.groupNum,
    COLUMNS.tee,


    COLUMNS.matchScore2,
    COLUMNS.ranking,
    COLUMNS.matchScoreTotal,
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.participantsId_search,

    F_ITEMS.matchId
  ],
  //-------详情字段数组-------
  detailItems: [
    D_ITEMS.participantsId,
    D_ITEMS.teamId,
    D_ITEMS.matchId_slot,

    D_ITEMS.progressIndex,
    D_ITEMS.roundNum,
    D_ITEMS.groupNum,
    D_ITEMS.tee,
    D_ITEMS.matchScore,
    D_ITEMS.ranking,
    D_ITEMS.matchScore
  ],

  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.teamId,
    F_ITEMS.participantsId,

    F_ITEMS.matchId_select,

    F_ITEMS.timeStart,
    F_ITEMS.timeEnd,
    F_ITEMS.progressIndex,
    F_ITEMS.roundNum,
    F_ITEMS.groupNum,
    F_ITEMS.tee,
    F_ITEMS.matchScoreTotal,
    F_ITEMS.remark,
    F_ITEMS.scoreList,
  ]
}

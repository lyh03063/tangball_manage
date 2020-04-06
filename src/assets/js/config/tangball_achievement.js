
  let obj = {
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
  //-------详情字段数组-------
detailItems:["participantsId","teamId","matchId_slot","progressIndex","roundNum","groupNum","tee","matchScore","ranking","matchScore"],
//-------列配置数组-------
columns:["participantsId","teamId","matchId","progressIndex","roundNum","groupNum","tee","matchScore2","ranking","matchScoreTotal"],
//-------筛选表单字段数组-------
searchFormItems:["participantsId_search","matchId"],
//-------新增、修改表单字段数组-------
formItems:["teamId","participantsId","matchId_select","timeStart","timeEnd","progressIndex","roundNum","groupNum","tee","matchScoreTotal","remark","scoreList"],

}

util.reformCFListItem(obj)

export default obj


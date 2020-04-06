
let obj = {
  powerPath: "matchCenter.list_team",//权限路径
  listIndex: "list_team", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
  focusMenu: true, //进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "球队",

  objParamAddon: {},//附加参数-----这里一定要加上，否则监听不到
  dynamicDict: [
    { page: "tangball_member", populateColumn: "memberName", idColumn: "createMemberId", idColumn2: "P1" },
    { page: "tangball_match", populateColumn: "matchName", idColumn: "matchId", idColumn2: "P1" }
  ],
  //批量操作按钮的配置
  batchBtns: {
    addon:[
      util.cfList.bBtns.delete,
    ],
    tips:{
      text:"数据来源于小程序或赛事的“报名表”中添加",
      // style:{"color":"#3a0"}
    }
  },
  url: {
    list: "/crossList?page=tangball_team", //列表接口
    add: "/crossAdd?page=tangball_team", //新增接口
    modify: "/crossModify?page=tangball_team", //修改接口
    detail: "/crossDetail?page=tangball_team", //详情接口
    delete: "/crossDelete?page=tangball_team" //删除接口
  },
  //-------列配置数组-------
  columns: [
    "team_P1","team_name","team_createMemberId","team_matchId","team_orderId"
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    "team_P1","team_name","team_createMemberId","team_matchId",
  ],
  //-------详情字段数组-------
  detailItems: [
    "team_P1","team_name","team_createMemberId","team_matchId","team_orderId","team_member"
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    "team_name","team_createMemberId","team_matchId","team_orderId","team_member"
  ]
}

util.reformCFListItem(obj)

export default obj

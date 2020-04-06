
let obj =  {
  powerPath: "sponsorCenter.list_sponsorship",//权限路径
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    listIndex: "list_sponsorship", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "赛事赞助",
    threeTitle: "赛事赞助",
    flag: true,
    url: {
      list: "/crossList?page=tangball_sponsorship", //列表接口
      add: "/crossAdd?page=tangball_sponsorship", //新增接口
      modify:
        "/crossModify?page=tangball_sponsorship", //修改接口
      delete:
        "/crossDelete?page=tangball_sponsorship" //删除接口
    },
    dynamicDict:[
      {
      page: "tangball_sponsor",
      populateColumn: "sponsor",
      idColumn: "sponsorId",
      idColumn2: "P1"
    },
      {
      page: "tangball_match",
      populateColumn: "match",
      idColumn: "matchId",
      idColumn2: "P1"
    },
  ],
    //-------列配置数组-------
    columns: [
      "sponsorship_P1","sponsorship_sponsorId","sponsorship_matchId","sponsorship_amount","sponsorship_time","sponsorship_place"
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "sponsorship_sponsorId","sponsorship_matchId","sponsorship_time"
    ],
    //-------详情字段数组-------
    detailItems: [
      "sponsorship_P1","sponsorship_sponsorId","sponsorship_matchId","sponsorship_amount","sponsorship_time","sponsorship_place"
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "sponsorship_P1","sponsorship_sponsorId","sponsorship_matchId","sponsorship_amount","sponsorship_time",
    ]
  }
  util.reformCFListItem(obj)

  export default obj
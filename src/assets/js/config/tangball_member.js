
let obj = {
  // powerPath: "systemManage.list_member",//权限路径
  listIndex: "list_member", //vuex对应的字段
  isRefreshAfterCUD: true,//是否在增删改操作后刷新列表
  focusMenu: true,//进行菜单聚焦
  twoTitle: "会员中心",
  threeTitle: "球员列表",
  flag: true,
  dynamicDict: [
    {
      page: "tangball_franchisee",
      populateColumn: "franchisee",
      idColumn: "franchiseeId",
      idColumn2: "P1"
    },
    {
      page: "tangball_venue",
      populateColumn: "venue",
      idColumn: "venueId",
      idColumn2: "P1"
    },
  ],
  url: {
    list: "/crossList?page=tangball_member", //列表接口
    add: "/crossAdd?page=tangball_member", //新增接口
    modify: "/crossModify?page=tangball_member", //修改接口
    detail: "/crossDetail?page=tangball_member", //详情接口
    delete: "/crossDelete?page=tangball_member" //删除接口
  },
  //-------详情字段数组-------
  detailItems: ["Id", "member_name", "sex", "openid", "phone", "franchiseeId", "venueId", "idCard", "entries", "career", "ballAge", "remark"],
  //-------列配置数组-------
  columns: ["Id", "wxNickName", "member_name", "openid", "sex", "phone", "franchiseeId", "venueId", "entries", "countAchievement", "ballAge"],
  //-------筛选表单字段数组-------
  searchFormItems: [
    "search_member_name", "phone", "openid"
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
     "member_name", "phone", "franchiseeId", "venueId", "sex", "idCard", "remark", "career", "ballAge"
  ]
}

util.reformCFListItem(obj)

export default obj

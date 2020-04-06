
let obj =  {
  powerPath: "msgCenter.list_msg_read",//权限路径
    listIndex: "list_sponsor", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu: true, //进行菜单聚焦
    twoTitle: "赛事赞助",
    threeTitle: "赞助商",
    flag: true,
    url: {
      list: "/crossList?page=tangball_sponsor", //列表接口
      add: "/crossAdd?page=tangball_sponsor", //新增接口
      modify: "/crossModify?page=tangball_sponsor", //修改接口
      delete: "/crossDelete?page=tangball_sponsor" //删除接口
    },
    //-------列配置数组-------
    columns: [
      "sponsor_P1","sponsor_name","sponsor_count","sponsor_money","sponsor_intro"
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "sponsor_P1","sponsor_search_name","sponsor_count"
    ],
    //-------详情字段数组-------
    detailItems: [
      "sponsor_P1","sponsor_name","sponsor_count","sponsor_money","sponsor_intro"
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "sponsor_name","sponsor_count","sponsor_money","sponsor_intro"
    ]
  }

  util.reformCFListItem(obj)

  export default obj
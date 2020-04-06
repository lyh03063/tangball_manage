
let obj =  {
  powerPath: "matchCenter.list_group",//权限路径
    listIndex: "list_group", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu:true,//进行菜单聚焦
    twoTitle: "会员中心",
    threeTitle: "球员列表",
    flag:true,
    url: {
      list: "/crossList?page=tangball_group", //列表接口
      add: "/crossAdd?page=tangball_group", //新增接口
      modify: "/crossModify?page=tangball_group", //修改接口
      detail: "/crossDetail?page=tangball_group", //查看单条数据详情接口，在修改表单或详情弹窗用到
      delete: "/crossDelete?page=tangball_group" //删除接口
    },
     //批量操作按钮的配置
  batchBtns: {
    addon: [
             
                 util.cfList.bBtns.delete,
             ],
  
    tips:{
      text:"数据来源于小程序或赛事的“对阵分组/成绩”中添加",
    }
  },
    //-------列配置数组-------
    columns: [
      "group_P1","group_groupNum","group_matchId","group_progressIndex","group_roundNum",
    ],
    //-------筛选表单字段数组-------
    searchFormItems: ["group_matchId"],
    //-------详情字段数组-------
    detailItems: [
      "group_P1","group_groupNum","group_matchId","group_progressIndex","group_roundNum",
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "group_P1","group_groupNum","group_matchId","group_progressIndex","group_roundNum","groupMember"
    ]
  }

  util.reformCFListItem(obj)

  export default obj

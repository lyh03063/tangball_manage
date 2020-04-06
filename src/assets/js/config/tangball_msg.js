
let obj =  {
  powerPath: "msgCenter.list_msg_read",//权限路径
    listIndex: "list_msg", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu: true, //进行菜单聚焦
    twoTitle: "消息",
    threeTitle: "消息列表",
    flag: true,
    url: {
      list: "/crossList?page=tangball_msg", //列表接口
      add: "/crossAdd?page=tangball_msg", //新增接口
      modify: "/crossModify?page=tangball_msg", //修改接口
      detail: "/crossDetail?page=tangball_msg", //查看单条数据详情接口，在修改表单或详情弹窗用到
      delete: "/crossDelete?page=tangball_msg" //删除接口
    },
    dynamicDict:[
      {
      page: "tangball_member",
      populateColumn: "member",
      idColumn: "memberIdList",
      idColumn2: "P1"
    }
  ],
    //-------列配置数组-------
    columns: [
      "msg_P1","msg_name","msg_range","msg_memberIdList","msg_publish","msg_publishTime",
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "msg_P1","msg_search_name"
    ],
    //-------详情字段数组-------
    detailItems: [
      "msg_P1","msg_name","msg_detail","msg_range","msg_publish","msg_publishTime","msg_extend"
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "msg_name","msg_detail","msg_range","msg_memberIdList","msg_publish","msg_publishTime","msg_remark"
    ]
  }

  util.reformCFListItem(obj)

  export default obj

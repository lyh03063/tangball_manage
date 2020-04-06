
let obj = {
  powerPath: "msgCenter.list_msg_read",//权限路径
    listIndex: "list_msg_read", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu:true,//进行菜单聚焦
    twoTitle: "消息",
    threeTitle: "消息已读记录列表",
    flag:true,
    url: {
      list: "/crossList?page=tangball_msg_read", //列表接口
      add: "/crossAdd?page=tangball_msg_read", //新增接口
      modify: "/crossModify?page=tangball_msg_read", //修改接口
     detail: "/crossDetail?page=tangball_msg_read", //查看单条数据详情接口，在修改表单或详情弹窗用到
      delete: "/crossDelete?page=tangball_msg_read" //删除接口
    },
    //-------列配置数组-------
    columns: [
      "msg_read_P1","msg_read_memberId","msg_read_msgId","msg_read_readTime",
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "msg_read_P1","msg_read_memberId","msg_read_msgId"
    ],
    //-------详情字段数组-------
    detailItems: [
      "msg_read_P1","msg_read_memberId","msg_read_msgId","msg_read_readTime",
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "msg_read_msgId","msg_read_readTime",
    ]
  }

  util.reformCFListItem(obj)

  export default obj
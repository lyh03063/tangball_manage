
export default {
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
      {
        label: "Id",
        prop: "P1",
        width: 60
      },
      {
        label: "会员id ",
        prop: "memberId",
        width: 150,
        slot:"slot_column_memberId"
      },
      
      {
        label: "消息id",
        prop: "msgId",
        width: 200,
        slot:"slot_column_msgId"
      },
      {
        label: "阅读时间",
        prop: "readTime",
        width: 100
      },
      
  
  
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "Id",
        prop: "P1",
        type: "input"
      },
      {
        label: "会员id ",
        prop: "memberId",
        type: "input"
      },
      {
        label: "消息id",
        prop: "msgId",
        type: "input"
      }
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "Id",
        prop: "P1"
      },
      {
        label: "会员id ",
        prop: "memberId",
        slot:"slot_column_memberId"
      },
      {
        label: "消息id",
        prop: "msgId",
        slot:"slot_column_msgId"
      },
      {
        label: "阅读时间",
        prop: "readTime",
      },
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      
      {
        label: "消息id",
        prop: "msgId",
        type: "select",
        ajax: {
          url: "/crossList?page=tangball_msg",
          keyLabel: "name",
          keyValue: "P1"
        }
      },
      F_ITEMS.memberId,
      {
        label: "阅读时间",
        prop: "readTime",
        type: "dateTime"
      },
     
    ]
  }

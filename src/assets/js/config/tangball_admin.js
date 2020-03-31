
export default {
  powerPath: "systemManage.list_admin",//权限路径
  listIndex: "list_admin", //vuex对应的字段
  focusMenu: true,//进行菜单聚焦
  twoTitle: "系统管理",
  threeTitle: "管理员",
  flag: true,
  url: {
    // list:"/list_login",
    list: "/crossList?page=tangball_admin", //列表接口
    add: "/crossAdd?page=tangball_admin", //新增接口
    modify: "/crossModify?page=tangball_admin", //修改接口
    detail: "/crossDetail?page=tangball_admin", //修改接口
    delete: "/crossDelete?page=tangball_admin" //删除接口
  },
  //-------列配置数组-------
  columns: [
    COLUMNS.Id,
    COLUMNS.userName,
    COLUMNS.passWord,
    COLUMNS.nickName,

  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.Id
  ],
  //-------详情字段数组-------
  detailItems: [
    D_ITEMS.Id,
    D_ITEMS.userName,
    D_ITEMS.passWord,


  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.userName,
    F_ITEMS.passWord,
    F_ITEMS.nickName,

    F_ITEMS.role_normal,
  ]
}

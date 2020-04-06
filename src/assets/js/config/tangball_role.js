
let obj = {
  powerPath: "systemManage.list_role",//权限路径
  listIndex: "list_role", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
  focusMenu: true,//进行菜单聚焦
  twoTitle: "系统管理",
  threeTitle: "角色",
  flag: true,
  url: {
    // list:"/list_login",
    list: "/crossList?page=tangball_role", //列表接口
    add: "/crossAdd?page=tangball_role", //新增接口
    modify: "/crossModify?page=tangball_role", //修改接口
    detail: "/crossDetail?page=tangball_role", //修改接口
    delete: "/crossDelete?page=tangball_role" //删除接口
  },
  //-------列配置数组-------
  
  columns: [
    "Id","roleName","rolePower"
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    "Id"
  ],
  //-------详情字段数组-------
  detailItems: [
    "Id","roleName","rolePower"
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    "role_name","role_power"
  ]
}

util.reformCFListItem(obj)

export default obj
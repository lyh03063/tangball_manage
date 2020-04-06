
let obj =  {
  powerPath: "systemManage.list_admin",//权限路径
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
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
  //-------详情字段数组-------
detailItems:["Id","userName","passWord"],
//-------列配置数组-------
columns:["Id","userName","passWord","nickName"],
//-------筛选表单字段数组-------
searchFormItems:["Id"],
//-------新增、修改表单字段数组-------
formItems:["userName","passWord","nickName","role_normal"],

}
util.reformCFListItem(obj)

export default obj


let obj =  {
  powerPath: "venue.list_franchisee",//权限路径
    listIndex: "list_franchisee", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu:true,//进行菜单聚焦
    twoTitle: "赛事",
    threeTitle: "加盟商",
    flag:true,
    url: {
      list: "/crossList?page=tangball_franchisee", //列表接口
      add: "/crossAdd?page=tangball_franchisee", //新增接口
      modify: "/crossModify?page=tangball_franchisee", //修改接口
     detail: "/crossDetail?page=tangball_franchisee", //查看单条数据详情接口，在修改表单或详情弹窗用到
      delete: "/crossDelete?page=tangball_franchisee" //删除接口
    },
    //-------列配置数组-------
    columns: [
      "franchisee_P1","franchisee_name","franchisee_countVenue","franchisee_joinTime","franchisee_remark"
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "franchisee_P1","franchisee_name","franchisee_joinTime"
    ],
    //-------详情字段数组-------
    detailItems: [
      "franchisee_P1","franchisee_name","franchisee_countVenue","franchisee_joinTime","franchisee_password","franchisee_remark"
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "franchisee_name","franchisee_password","franchisee_joinTime","franchisee_remark"]

  }
util.reformCFListItem(obj)

export default obj
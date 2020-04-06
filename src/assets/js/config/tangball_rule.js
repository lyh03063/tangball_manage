
let obj = {
  powerPath: "matchCenter.list_rule",//权限路径
    listIndex: "list_rule", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu: true, //进行菜单聚焦
    twoTitle: "赛事",
    threeTitle: "规则库",
    flag: true,
    objParamAddon: {},//附加参数-----这里一定要加上，否则监听不到
    url: {
      list: "/crossList?page=tangball_rule", //列表接口
      add: "/crossAdd?page=tangball_rule", //新增接口
      modify: "/crossModify?page=tangball_rule", //修改接口
      detail: "/crossDetail?page=tangball_rule", //详情接口
      delete: "/crossDelete?page=tangball_rule" //删除接口
    },
    //-------列配置数组-------
    columns: [
      "rule_P1","rule_name","rule_remark"
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "rule_P1","rule_name"
    ],
    //-------详情字段数组-------
    detailItems: [
      "rule_P1","rule_name","rule_remark"
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "rule_name","rule_remark"
    ]
  }

  util.reformCFListItem(obj)

  export default obj

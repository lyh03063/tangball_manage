
export default {
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
      {
        label: "编号",
        prop: "P1",
        width: 70
      },
      {
        label: "规则名",
        prop: "name",
        width: 250
      },{
        label: "简介",
        prop: "remark",
        width: 400
      },
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "编号",
        prop: "P1",
        type: "input"
      },
  
      {
        label: "规则名",
        prop: "name",
      }
     
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "编号",
        prop: "P1",
      },
      {
        label: "规则名",
        prop: "name",
      } ,{
        label: "简介",
        prop: "remark",
      },
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
    
      {
        label: "规则名",
        prop: "name",
    
      },{
        label: "简介",
        prop: "remark",
        type: "textarea"
      },
    ]
  }

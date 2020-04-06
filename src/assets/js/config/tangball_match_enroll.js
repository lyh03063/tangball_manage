
let obj = {
  isShowSearchForm: false, //隐藏查询表单
  listIndex: "list_enroll_for_match", //vuex对应的字段
  focusMenu: false,
  isShowBreadcrumb: false, //隐藏面包屑导航
  isShowOperateColumn: false, //隐藏操作列
  isShowToolBar: false, //隐藏工具栏
  flag: true, //显示新增按钮
  url: {
    list: "/crossList?page=tangball_enroll", //列表接口
    add: "/crossAdd?page=tangball_enroll", //新增接口
    modify: "/crossModify?page=tangball_enroll", //修改接口
    detail: "/crossDetail?page=tangball_enroll", //查看单条数据详情接口，在修改表单或详情弹窗用到
    delete: "/crossDelete?page=tangball_enroll" //删除接口
  },
  //批量操作按钮的配置
  batchBtns: {
    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
      util.cfList.bBtns.exportExcel,

    ]
  },
  //-------列配置数组-------
  columns: [
    "macth_enrool_memberId","macth_enrool_phone","macth_enrool_sex","macth_enrool_age","macth_enrool_time",
    "macth_enrool_payStatus","macth_enrool_auditStatus"
  ],
  detailItems: [
    "macth_enrool_memberId","macth_enrool_matchId","macth_enrool_phone","macth_enrool_sex","macth_enrool_age","macth_enrool_career",
    "macth_enrool_ballAge","macth_enrool_idCard","macth_enrool_time","macth_enrool_cityVenueId",
    "macth_enrool_payStatus","macth_enrool_auditStatus",
  ],
  searchFormItems: [],

  //-------新增、修改表单字段数组-------
  formItems: [

  ]
}

util.reformCFListItem(obj)

export default obj

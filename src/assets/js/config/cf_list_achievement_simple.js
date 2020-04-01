
export default {
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
  focusMenu: false,
  isShowSearchForm: false, //隐藏查询表单
  isShowBreadcrumb: false, //隐藏面包屑导航
  isShowPageLink: false, //隐藏分页
  isShowOperateColumn: false, //隐藏操作列
  isShowToolBar: false, //隐藏工具栏
  formDataAddInit: {},//表单默认新增数据注册

  dynamicDict: [//动态数据字典-会员
    {
      page: "tangball_member",
      populateColumn: "memberDoc",
      idColumn: "participantsId",
      idColumn2: "P1",
    }
  ],
  //批量操作按钮的配置-覆盖掉完整版的
  batchBtns: {
    addon: [
      util.cfList.bBtns.add,
    ],
    tips: false
  },
  //默认排序参数
  sortJsonDefault: {
    matchScore: 1//按比分降序
  },
  //-------列配置数组-------
  columns: [
    COLUMNS.participantsId,
    COLUMNS.timeStart,
    COLUMNS.timeEnd,
    COLUMNS.roundNum ,
    COLUMNS.groupNum,
    COLUMNS.matchScore,
   

  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.teamId,
    F_ITEMS.participantsId,
    F_ITEMS.groupNum,
    F_ITEMS.tee ,
    F_ITEMS.remark,
    F_ITEMS.scoreList,
  ]

}


export default {

  powerPath: "matchCenter.list_match",//权限路径
  listIndex: "list_match", //vuex对应的字段
  focusMenu: true, //是否进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "赛事数据",

  flag: true,
  cfForm: {
    col_span: 12 //控制显示一行多列
  },
  url: {
    list: "/crossList?page=tangball_match", //列表接口
    add: "/crossAdd?page=tangball_match", //新增接口
    modify: "/crossModify?page=tangball_match", //修改接口
    detail: "/crossDetail?page=tangball_match", //查看单条数据详情接口，在修改表单或详情弹窗用到

    delete: "/crossDelete?page=tangball_match" //删除接口
  },
  //-------列配置数组-------
  columns: [
    COLUMNS.Id,
    COLUMNS.matchName,
    COLUMNS.matchTime,
    COLUMNS.registrationFee,
    COLUMNS.publicationStatus,
    COLUMNS.matchStatus,
    COLUMNS.matchForm,
    COLUMNS.enroolSheet,
    COLUMNS.confrontAchievement,
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.matchName_search,
    F_ITEMS.matchForm,
    F_ITEMS.publicationStatus,
    F_ITEMS.matchTime_search,
  ],
  //-------详情字段数组-------
  detailItems: [
    D_ITEMS.matchName,
    D_ITEMS.matchErollStatus,
    D_ITEMS.matchStatus,
    D_ITEMS.publicationStatus,
    D_ITEMS.enrollTime,
    D_ITEMS.enrollTimeEnd,
    // D_ITEMS.matchType,
    D_ITEMS.progress,
    D_ITEMS.venue,
    D_ITEMS.match_album,
    D_ITEMS.registeredPersons,
    D_ITEMS.registrationFee,
    D_ITEMS.matchIntroduce,

    D_ITEMS.enrollRequirements,
    D_ITEMS.matchManual,
    D_ITEMS.matchResult,

  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.matchName,
    F_ITEMS.publicationStatus,
    F_ITEMS.ruleId,
    F_ITEMS.matchForm,
    F_ITEMS.teamMemberRange,
    F_ITEMS.menCount,
    F_ITEMS.womenCount,
    F_ITEMS.enrollTime,
    F_ITEMS.matchTime,
    F_ITEMS.enrollTimeEnd,
    F_ITEMS.matchTimeEnd,
    F_ITEMS.registrationFee,
    F_ITEMS.matchIntroduce,
    F_ITEMS.enrollRequirements,
    F_ITEMS.album,
    F_ITEMS.venue,
    F_ITEMS.progress,
    F_ITEMS.matchManual,
    F_ITEMS.matchResult,

  ]
}

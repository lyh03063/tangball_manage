//#region tangball_enroll
let obj =  {
    listIndex: "list_enroll", //vuex对应的字段
    isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    focusMenu: true,//进行菜单聚焦
    twoTitle: "赛事",
    threeTitle: "报名(订单)",
    flag: true,
    url: {
      list: "/crossList?page=tangball_enroll", //列表接口
      add: "/crossAdd?page=tangball_enroll", //新增接口
      modify: "/crossModify?page=tangball_enroll", //修改接口
      detail: "/crossDetail?page=tangball_enroll", //查看单条数据详情接口，在修改表单或详情弹窗用到
      delete: "/crossDelete?page=tangball_enroll" //删除接口
    },
    //-------列配置数组-------
    columns: ["enroll_default_memberId","enroll_default_matchId","enroll_default_phone","enroll_default_sex","enroll_default_age",
        "enroll_default_career","enroll_default_ballAge","enroll_default_idCard","enroll_default_time",
        "enroll_default_payStatus","enroll_default_auditStatus",],
    //-------筛选表单字段数组-------
    searchFormItems: [
      "enroll_default_idCard","enroll_default_memberId","enroll_default_matchId","enroll_default_payStatus","enroll_default_auditStatus"
    ],
    //-------详情字段数组-------
    detailItems: [
      "enroll_default_memberId","enroll_default_matchId","enroll_default_cityVenueId","enroll_default_phone","enroll_default_age","enroll_default_sex",
      "enroll_default_career","enroll_default_ballAge","enroll_default_idCard","enroll_default_time","enroll_default_payStatus","enroll_default_auditStatus",
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      "enroll_default_memberId","enroll_default_matchId","enroll_default_cityVenueId","enroll_default_phone","enroll_default_sex",
      "enroll_default_age","enroll_default_career","enroll_default_ballAge","enroll_default_idCard",
      "enroll_default_time","enroll_default_payStatus","enroll_default_auditStatus",
    ]
  }
//#endregion

util.reformCFListItem(obj)

export default obj
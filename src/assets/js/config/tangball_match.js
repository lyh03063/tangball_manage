
let obj =  {

  powerPath: "matchCenter.list_match",//权限路径
  listIndex: "list_match", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
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
  dynamicDict: [{
    page: "tangball_franchisee",
    populateColumn: "sponsorDoc",
    idColumn: "sponsorId",
    idColumn2: "P1"
  }],
  //-------列配置数组-------
  //-------详情字段数组-------
detailItems:["matchName","sponsorId","matchErollStatus","matchStatus","mutiEnrool","publicationStatus","enrollTime","enrollTimeEnd","progress","venue","match_album","registeredPersons","registrationFee","matchIntroduce","enrollRequirements","matchManual","matchResult"],
//-------列配置数组-------
columns:["Id","sponsorId","matchName","matchTime","registrationFee","publicationStatus","matchStatus","matchForm","enroolSheet","matchIncome","confrontAchievement"],
//-------筛选表单字段数组-------
searchFormItems:["matchName_search","matchForm","publicationStatus","matchTime_search"],
//-------新增、修改表单字段数组-------
formItems:["matchName","publicationStatus","ruleId","matchForm","teamMemberRange","menCount","womenCount","enrollTime","matchTime","enrollTimeEnd","matchTimeEnd","mutiEnrool","registrationFee","matchIntroduce","enrollRequirements","album","venue","progress","matchManual","matchResult"],

}
util.reformCFListItem(obj)

export default obj

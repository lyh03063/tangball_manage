


import tangball_enroll_default from "@/assets/js/config/tangball_enroll_default.js";
import lodash from 'lodash'//导入lodash方法库
let objConfig= util.deepCopy(tangball_enroll_default)
let obj = {
  isShowSearchForm: false, //隐藏查询表单
  listIndex: "list_enroll_for_match", //vuex对应的字段
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
  focusMenu: false,
  isShowBreadcrumb: false, //隐藏面包屑导航
  isShowOperateColumn: false, //隐藏操作列
  isShowToolBar: false, //隐藏工具栏


  dynamicDict: [//动态数据字典，获取队伍信息
    {
      page: "tangball_team",
      populateColumn: "teamDoc",
      idColumn: "orderId",
      idColumn2: "orderId"
    }
  ], //隐藏工具栏
 
  sortJsonDefault: {
    "score.teamHoleScoreTotal": -1
  },
  // //新增表单初始赋值
  // formDataAddInit: {
  //   matchId: this.matchId
  // },

  //-------列配置数组-------
  columns: [
    "enroll_for_ach_team","enroll_for_ach_captain","enroll_for_ach_score"
  ],

  //-------新增、修改表单字段数组-------
  formItems: [
    'memberId_select_rules',"matchId_select_required","phone","sex","age","career","ballAge","idCard","time","payStatus","auditStatus"
  ],
  searchFormItems: [],
  detailItems: []
}
util.reformCFListItem(obj)

Object.assign(objConfig,obj);//合并对象



console.log("objConfig############:", objConfig);
export default  objConfig



// import lodash from 'lodash'//导入lodash方法库
import  "@/assets/js/config_base.js";//注意位置要提前


import tangball_enroll from "@/assets/js/config/tangball_enroll.js";
import tangball_enroll_for_ach from "@/assets/js/config/tangball_enroll_for_ach.js";
import tangball_team from "@/assets/js/config/tangball_team.js";
import tangball_rule from "@/assets/js/config/tangball_rule.js";
import tangball_match from "@/assets/js/config/tangball_match.js";
import tangball_franchisee from "@/assets/js/config/tangball_franchisee.js";
import tangball_member from "@/assets/js/config/tangball_member.js";
import tangball_sponsor from "@/assets/js/config/tangball_sponsor.js";
import tangball_sponsorship from "@/assets/js/config/tangball_sponsorship.js";
import tangball_msg from "@/assets/js/config/tangball_msg.js";
import tangball_msg_read from "@/assets/js/config/tangball_msg_read.js";
import tangball_area from "@/assets/js/config/tangball_area.js";
import tangball_admin from "@/assets/js/config/tangball_admin.js";
import tangball_role from "@/assets/js/config/tangball_role.js";
import tangball_achievement from "@/assets/js/config/tangball_achievement.js";
import tangball_achievement_simple from "@/assets/js/config/tangball_achievement_simple.js";
import tangball_group from "@/assets/js/config/tangball_group.js";
import tangball_match_enroll from "@/assets/js/config/tangball_match_enroll.js";
import tangball_match_enroll_team from "@/assets/js/config/tangball_match_enroll_team.js";
import tangball_match_enroll_single from "@/assets/js/config/tangball_match_enroll_single.js";


import tangball_venue from "@/assets/js/config/tangball_venue.js";
import tangball_article_category from "@/assets/js/config/tangball_article_category.js";
import tangball_article from "@/assets/js/config/tangball_article.js";
import tangball_recommend from "@/assets/js/config/tangball_recommend.js";












//#region PUB.objDictArr/PUB.dict公共字典对象
PUB.objDictArr = {
  taskType: [
    { value: 1, label: "新需求" },
    { value: 2, label: "bug" },
    { value: 3, label: "其他" }
  ],
  difficulty: [
    { value: 1, label: "简单" },
    { value: 2, label: "一般" },
    { value: 3, label: "困难" },
    { value: 4, label: "很难" }
  ],
  prior: [
    { value: 1, label: "很高" },
    { value: 2, label: "高" },
    { value: 3, label: "中" },
    { value: 4, label: "低" }
  ],
  complete: [
    { value: 0, label: "0%" },
    { value: 0.1, label: "10%" },
    { value: 0.2, label: "20%" },
    { value: 0.3, label: "30%" },
    { value: 0.4, label: "40%" },
    { value: 0.5, label: "50%" },
    { value: 0.6, label: "60%" },
    { value: 0.7, label: "70%" },
    { value: 0.8, label: "80%" },
    { value: 0.9, label: "90%" },
    { value: 1, label: "100%" },
  ],
  complete2: [
    { value: 1, label: "未开始" },//complete==0
    { value: 2, label: "进行中" },//complete>0&&complete>1
    { value: 3, label: "已完成" },//complete>0&&complete>1
  ],
}
//{"P7": Im,"P5":{ $gte: DataStart,$lte: DataEnd } }
PUB.dict = {};//公共数据字典对象，里面会有多个子数据字典对象
//for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
console.log("Object.keys结果", Object.keys(PUB.objDictArr));
for (var key of Object.keys(PUB.objDictArr)) {
  console.log(key + ": " + PUB.objDictArr[key]);
  PUB.dict[key] = {}
  let arrOpt = PUB.objDictArr[key];
  arrOpt.forEach(itemEach => {//循环：{000数组}
    PUB.dict[key][itemEach.value] = itemEach
  })
}
console.log("PUB.dict#####", PUB.dict);
/**
    * @name 获取数据字典值函数
    * @param dictName字典名，value值
    */
PUB.formatterDict = function (dictName, value) {
  return lodash.get(PUB.dict, `${dictName}.${value}.label`);
}
//#endregion
PUB.listCF = {}

//页面对应的集合列表类型

PUB.listCF.tangball_venue =tangball_venue;
PUB.listCF.tangball_article_category =tangball_article_category;
PUB.listCF.tangball_article =tangball_article;
PUB.listCF.tangball_recommend =tangball_recommend;



PUB.listCF.tangball_enroll = tangball_enroll
PUB.listCF.tangball_enroll_for_ach = tangball_enroll_for_ach
PUB.listCF.tangball_team = tangball_team;

PUB.listCF.tangball_rule = tangball_rule;


PUB.listCF.tangball_match =tangball_match

PUB.listCF.tangball_franchisee = tangball_franchisee


PUB.listCF.tangball_member =tangball_member


PUB.listCF.tangball_sponsor =tangball_sponsor

PUB.listCF.tangball_sponsorship =tangball_sponsorship

PUB.listCF.tangball_msg =tangball_msg


PUB.listCF.tangball_msg_read =tangball_msg_read


PUB.listCF.tangball_area = tangball_area


PUB.listCF.tangball_admin =tangball_admin
PUB.listCF.tangball_role =tangball_role

PUB.listCF.tangball_achievement =tangball_achievement

PUB.listCF.tangball_achievement_simple =tangball_achievement_simple
PUB.listCF.tangball_group =tangball_group

PUB.listCF.tangball_match_enroll = tangball_match_enroll
PUB.listCF.tangball_match_enroll_single = tangball_match_enroll_single
PUB.listCF.tangball_match_enroll_team = tangball_match_enroll_team





PUB.listCF.tangball_match_enroll_income={

  powerPath: "matchCenter.list_enroll",//权限路径
  listIndex: "list_enroll", //vuex对应的字段
  isShowBreadcrumb: false,//面包屑
  isShowCheckedBox: false,//选择框
  isShowToolBar: false,//批量操作栏
  
  url: {
    list: "/crossList?page=tangball_enroll", //列表接口
    add: "/crossAdd?page=tangball_enroll", //新增接口
    modify: "/crossModify?page=tangball_enroll", //修改接口
    detail: "/crossDetail?page=tangball_enroll", //查看单条数据详情接口，在修改表单或详情弹窗用到
    delete: "/crossDelete?page=tangball_enroll" //删除接口
  },
  dynamicDict: [
  {
    page: "tangball_member",
    populateColumn: "memberDoc",
    idColumn: "memberId",
    idColumn2: "P1"
  }],
  singleBtns: {
    addon: [
      util.cfList.sBtns.detail,
     
    ]
  },

  //-------列配置数组-------
  // expands:[],
  columns: [
    COLUMNS.enrool_memberId,
    COLUMNS.orderId,
    COLUMNS.orderMoney,
    COLUMNS.enrool_time,
    COLUMNS.playingTime,
    COLUMNS.payStatus,
    COLUMNS.auditStatus
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.memberId_select,
    F_ITEMS.payStatus,
    F_ITEMS.auditStatus
  ],
  //-------详情字段数组-------
  detailItems: [
    D_ITEMS.memberId_slot,
    D_ITEMS.matchId_slot,
    D_ITEMS.phone,
    D_ITEMS.sex,
    D_ITEMS.age,
    D_ITEMS.career,
    D_ITEMS.ballAge,
    D_ITEMS.idCard,
    D_ITEMS.time_enrool,
    D_ITEMS.playingTime,
    D_ITEMS.payStatus,
    D_ITEMS.auditStatus
  ],
  //-------新增、修改表单字段数组-------
  formItems: [

  ]

}



export default {}
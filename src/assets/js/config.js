import lodash from 'lodash'//导入lodash方法库
import  "@/assets/js/mix.js";//注意位置要提前

import tangball_enroll from "@/assets/js/config/tangball_enroll.js";
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
import tangball_achievement from "@/assets/js/config/tangball_achievement.js";
import tangball_achievement_simple from "@/assets/js/config/tangball_achievement_simple.js";


window.PUB = {}
//PUB.domain = "http://localhost:3000"
PUB.domain = 'http://test.dmagic.cn'
PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
//PUB.domain = "http://120.76.160.41:3000"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=tangball`
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
let arrPageName = ["tangball_team",]
//页面对应的集合列表类型


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


PUB.listCF.tangball_achievement =tangball_achievement

PUB.listCF.tangball_achievement_simple =tangball_achievement_simple

PUB.listCF.tangball_enroll = tangball_enroll

// //#region 批量拼装简化版的列表配置，用于collection
// arrPageName.forEach(page => {//循环：{页面数组}
//   PUB.listCF[page].pageSize = 100;//每页显示100条
//   PUB.listCF[page].findJsonDefault = {};//默认查询参数
//   let keySimple = `${page}_simple`;
//   PUB.listCF[keySimple] = lodash.cloneDeep(PUB.listCF[page])//深拷贝常规版配置
//   Object.assign(PUB.listCF[keySimple], {
//     "isShowBreadcrumb": false,
//     "isShowToolBar": true,
//     "isRefreshAfterCUD": false//住址增删改操作后自动刷新页面，需要手动处理
//   });//合并对象
//   //lodash删除查询表单的编号查询数据
//   lodash.remove(PUB.listCF[keySimple].searchFormItems, (item) => item.prop == "P1");
// })
// //#endregion

export default {}
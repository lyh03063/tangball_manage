import lodash from 'lodash'//导入lodash方法库
window.PUB = {}
//PUB.domain = "http://localhost:3000"
PUB.domain = 'http://test.dmagic.cn'
// PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
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


//#region tangball_team
PUB.listCF.tangball_team = {
  listIndex: "tangball_team", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "球队",
  flag: true,
  objParamAddon: {},//附加参数-----这里一定要加上，否则监听不到
  url: {
    list: "/crossList?page=tangball_team", //列表接口
    add: "/crossAdd?page=tangball_team", //新增接口
    modify: "/crossModify?page=tangball_team", //修改接口
    detail: "/crossDetail?page=tangball_team", //详情接口
    delete: "/crossDelete?page=tangball_team" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 70
    },
    {
      label: "队名",
      prop: "name",
      width: 100
    },
    {
      label: "创建人",
      prop: "createMemberId",
      width: 100
    },
    {
      label: "赛事id",
      prop: "matchId",
      width: 100
    },
    {
      label: "订单id",
      prop: "orderId",
      width: 100
    },
    {
      label: "成员列表",
      prop: "member",
      width: 100
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },

    {
      label: "队名",
      prop: "name",
    }
    ,
    {
      label: "创建人",
      prop: "createMemberId",
    },
    {
      label: "赛事id",
      prop: "matchId",
    },
    {
      label: "订单id",
      prop: "orderId",
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1",
    },
    {
      label: "队名",
      prop: "name",
    },
    {
      label: "创建人",
      prop: "createMemberId",
    },
    {
      label: "赛事id",
      prop: "matchId",
    },
    {
      label: "订单id",
      prop: "orderId",
    },
    {
      label: "成员列表",
      prop: "member",
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "编号",
      prop: "P1",
    },
    {
      label: "队名",
      prop: "name",
    },
    {
      label: "创建人",
      prop: "createMemberId",
    },
    {
      label: "赛事id",
      prop: "matchId",
    },
    {
      label: "订单id",
      prop: "orderId",
    },
    {
      label: "成员列表",
      prop: "member",
      type:"jsonEditor"
    }
  ]
};
//#endregion
//#region 批量拼装简化版的列表配置，用于collection
arrPageName.forEach(page => {//循环：{页面数组}
  PUB.listCF[page].pageSize = 100;//每页显示100条
  PUB.listCF[page].findJsonDefault = {};//默认查询参数
  let keySimple = `${page}_simple`;
  PUB.listCF[keySimple] = lodash.cloneDeep(PUB.listCF[page])//深拷贝常规版配置
  Object.assign(PUB.listCF[keySimple], {
    "isShowBreadcrumb": false,
    "isShowToolBar": true,
    "isRefreshAfterCUD": false//住址增删改操作后自动刷新页面，需要手动处理
  });//合并对象
  //lodash删除查询表单的编号查询数据
  lodash.remove(PUB.listCF[keySimple].searchFormItems, (item) => item.prop == "P1");
})
//#endregion
//#endregion
export default {}
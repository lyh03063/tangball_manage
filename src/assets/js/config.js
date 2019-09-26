import lodash from 'lodash'//导入lodash方法库
import  "@/assets/js/mix.js";//注意位置要提前
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


//#region tangball_team
PUB.listCF.tangball_team = {
  listIndex: "list_team", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "球队",
  flag: true,
  objParamAddon: {},//附加参数-----这里一定要加上，否则监听不到
  dynamicDict: [{ page: "tangball_member",populateColumn: "memberName", idColumn: "createMemberId", idColumn2: "P1" },
  { page: "tangball_match",populateColumn: "matchName", idColumn: "matchId", idColumn2: "P1" }],
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
      width: 100,
      formatter:(data)=>{
        if (data.memberName) {
          return data.memberName.name
        }
      }
    },
    {
      label: "赛事",
      prop: "matchId",
      width: 100,
      formatter:(data)=>{
        if (data.matchName) {
          return data.matchName.matchName
        }
      }
    },
    {
      label: "订单id",
      prop: "orderId",
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
      type:'select',
      ajax: {
        url: "/crossList?page=tangball_member",
        keyLabel: "name",
        keyValue: "P1"
      },
    },
    {
      label: "赛事",
      prop: "matchId",
      type:'select',
      ajax: {
        url: "/crossList?page=tangball_match",
        keyLabel: "matchName",
        keyValue: "P1"
      },
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
      slot:'slot_detail_item_memberName'
    },
    {
      label: "赛事",
      prop: "matchId",
      slot:'slot_detail_item_matchName'
    },
    {
      label: "订单id",
      prop: "orderId",
    },
    {
      label: "成员列表",
      prop: "member",
      slot:'slot_detail_item_memberList'
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "队名",
      prop: "name",
    },
    {
      label: "创建人",
      prop: "createMemberId",
      type:'select',
      ajax: {
        url: "/crossList?page=tangball_member",
        keyLabel: "name",
        keyValue: "P1"
      },
    },
    {
      label: "赛事",
      prop: "matchId",
      type:'select',
      ajax: {
        url: "/crossList?page=tangball_match",
        keyLabel: "matchName",
        keyValue: "P1"
      },
    },
    {
      label: "订单id",
      prop: "orderId",
    },
    {
      label: "成员列表",
      prop: "member",
      type: "collection",
      collectionlistType: "form",
      collectionCfForm: {
        col_span: 12,
        formItems: [
          {
            label: "姓名",
            prop: "name",

          },
          {
            label: "性别",
            prop: "sex",
            type:'radio',
            options:[{value:'1',label:'男'},
            {value:'2',label:'女'}]
          },
          {
            label: "手机号码",
            prop: "phone"
          }
        ]
      }
    },
  ]
};
//#endregion

//#region tangball_rule
PUB.listCF.tangball_rule = {
  listIndex: "list_rule", //vuex对应的字段
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
      width: 100
    },{
      label: "简介",
      prop: "remark",
      width: 100
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
};
//#endregion


//#region tangball_match
PUB.listCF.tangball_match ={
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
    {
      label: "id",
      prop: "P1",
      width: 50
    },
    {
      label: "赛事名称",
      prop: "matchName",
      width: 100
    },
    {
      label: "赛事时间",
      prop: "matchTime",
      width: 100
    },
    {
      label: "报名人数",
      prop: "registeredPersons",
      width: 90,
      statistics: { listIndex: "list_enroll", targetIdKey: "matchId" }
    },
    {
      label: "报名费",
      prop: "registrationFee",
      width: 85
    },
    {
      label: "发布",
      prop: "publicationStatus",
      width: 75,
      formatter: function(rowData) {
        return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
      }
    },
    {
      label: "状态",
      prop: "matchStatus",
      width: 150,
      formatter: function(rowData) {
        let nowDate=new Date().getTime();
      let enrollTimeDate = new Date(rowData.enrollTime).getTime();
      let enrollTimeEnd = new Date(rowData.enrollTimeEnd).getTime();
      let matchTime = new Date(rowData.matchTime).getTime();
      let matchTimeEnd = new Date(rowData.matchTimeEnd).getTime();
      if (nowDate>matchTimeEnd) {
        return '赛事已结束'
      }else if(nowDate>matchTime){
        return '赛事已开始'
      }else if (nowDate>enrollTimeEnd) {
        return '报名时间已结束'
      }else if (nowDate>enrollTimeDate) {
        return '火热报名中'
      }else{
        return '报名时间未到'
      }
      }
    },
    {
      label: "类型",
      prop: "matchType",
      width: 75,
      formatter: function(rowData) {
        return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
      }
    },
    {
      label: "报名表",
      // prop: "achievement",
      width:85,
      slot: "slot_column_enroll"
    },
    {
      label: "成绩单",
      // prop: "achievement",
      width: 85,
      slot: "slot_column_achievement"
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "赛事类型",
      prop: "matchType",
      type: "select",
      options: [
        { label: "普通赛", value: 1 },
        { label: "全国赛", value: 2 }
      ]
    },
    {
      label: "赛事状态",
      prop: "matchStatus",
      type: "select",
      options: [
        { label: "未开始", value: 1 },
        { label: "进行中", value: 2 },
        { label: "已结束", value: 3 }
      ]
    },
    {
      label: "发布状态",
      prop: "publicationStatus",
      type: "select",
      options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
    },
    {
      label: "赛事时间",
      prop: "matchTime",
      type: "time_period"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "赛事名称",
      prop: "matchName"
    },
    {
      label: "报名状态",
      prop: "matchErollStatus",
      formatter: function(rowData) {
        let obj = util.getTimeStatus({
          start: rowData.enrollTime,
          end: rowData.enrollTimeEnd
        });
        let htmlResult = `报名时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：报名${obj.msg}`;
        return htmlResult;
      }
    },
    {
      label: "赛事状态",
      prop: "matchStatus",
      formatter: function(rowData) {
        let obj = util.getTimeStatus({
          start: rowData.matchTime,
          end: rowData.matchTimeEnd
        });
        let htmlResult = `比赛时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：比赛${obj.msg}`;
        return htmlResult;
      }
    },
    {
      label: "发布状态",
      prop: "publicationStatus",
      formatter: function(rowData) {
        return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
      }
    },
    {
      label: "报名开始时间",
      prop: "enrollTime"
    },
    {
      label: "报名结束时间",
      prop: "enrollTimeEnd"
    },

    {
      label: "赛事类型",
      prop: "matchType",
      formatter: function(rowData) {
        return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
      }
    },
    {
      label: "赛程设置",
      prop: "progress",
      slot:'slot_detail_item_progress'
    },
    {
      
      label: "决赛场馆",
      prop: "venue",
      type: "select",
      slot: "slot_detail_item_cityVenueList"
    },

    {
      label: "赛事图片",
      prop: "album",
      slot: "slot_detail_item_album"
    },
    {
      label: "报名人数",
      prop: "registeredPersons"
    },
    {
      label: "报名费用",
      prop: "registrationFee"
    },
    {
      label: "赛事介绍",
      prop: "matchIntroduce"
    },
    {
      label: "赛事规程",
      prop: "matchManual",
      type:'html'
    },
    {
      label: "赛事结果",
      prop: "matchResult",
      type:'html'
    },
    {
      label: "路线地图",
      prop: "routeMap"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "赛事名称",
      prop: "matchName",
      rules: [{ required: true, message: "赛事名称不能为空" }],
    },
    {
      label: "赛事规则",
      prop: "ruleId",
      type: "select",
      ajax: {
        url: "/crossList?page=tangball_rule",
        keyLabel: "name",
        keyValue: "P1"
      },
    },
   
    {
      label: "赛事类型",
      prop: "matchForm",
      type: "select",
      options: [
        { label: "个人赛", value: 1 },
        { label: "团体赛", value: 2 }
      ],
    },
    {
      label: "每队人数下限",
      prop: "teamMemberMin",
      term: { matchForm: 2 },
      rules: [{ required: true, message: "不能为空" }]
    },
    {
      label: "发布状态",
      prop: "publicationStatus",
      type: "select",
      options: [{ label: "是", value: 1 }, { label: "否", value: 2 }],
    },
    {
      label: "每队人数上限",
      prop: "teamMemberMax",
      term: { matchForm: 2 },
      rules: [{ required: true, message: "不能为空" }]
    },
     
    

    
    {
      label: "报名开始时间",
      prop: "enrollTime",
      type: "dateTime",
      rules: [{ required: true, message: "不能为空" }],
    },
    {
      label: "赛事开始时间",
      prop: "matchTime",
      type: "dateTime",
      rules: [{ required: true, message: "不能为空" }],
    },
    {
      label: "报名结束时间",
      prop: "enrollTimeEnd",
      type: "dateTime",
      rules: [{ required: true, message: "不能为空" }],
    },
    
    {
      label: "赛事结束时间",
      prop: "matchTimeEnd",
      type: "dateTime",
      rules: [{ required: true, message: "不能为空" }],
    },
    
    {
      label: "报名费用",
      prop: "registrationFee",
    },

    
    {
      label: "路线地图",
      prop: "routeMap",
    },
    {
      label: "赛事介绍",
      prop: "matchIntroduce",
      type: "textarea",
      col_span: 24
    },
    // {
    //   label: "赛事类型",
    //   prop: "matchType",
    //   type: "select",
    //   options: [
    //     { label: "普通赛", value: 1 },
    //     { label: "全国赛", value: 2 }
    //   ]
    // },
    // {
    //   label: "全国赛城市场馆",
    //   prop: "cityVenueList",
    //   type: "select",
    //   slot: "slot_form_item_cityVenueList",
    //   term: { matchType: 2 }
    // },
    // {
    //   label: "赛事阶段",
    //   prop: "matchProgress",
    //   type: "select",
    //   slot: "slot_modify_item_matchProgress",
    // },
    {
      label: "相册",
      prop: "album",
      type: "upload",
      col_span: 24 //控制显示一行多列
    },
    {
      label: "决赛场馆",
      prop: "venue",
      type: "select",
      slot: "slot_form_item_cityVenueList",
      col_span: 24
    },
     {
      label: "赛程设置",
      prop: "progress",
      slot:'slot_form_item_progress',
      col_span: 24
    },
   

    {
      label: "赛事规程",
      prop: "matchManual",
      type: "editorTM",
      col_span: 24 //控制显示一行多列
    },
    {
      label: "赛事结果",
      prop: "matchResult",
      type: "editorTM",
      col_span: 24 //控制显示一行多列
    },

  ]
}
//#endregion

//#region tangball_franchisee
PUB.listCF.tangball_franchisee = {
  listIndex: "list_franchisee", //vuex对应的字段
  focusMenu:true,//进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "加盟商",
  flag:true,
  url: {
    list: "/crossList?page=tangball_franchisee", //列表接口
    add: "/crossAdd?page=tangball_franchisee", //新增接口
    modify: "/crossModify?page=tangball_franchisee", //修改接口
   detail: "/crossDetail?page=tangball_franchisee", //查看单条数据详情接口，在修改表单或详情弹窗用到
    delete: "/crossDelete?page=tangball_franchisee" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "Id",
      prop: "P1",
      width: 60
    },
    {
      label: "企业名称",
      prop: "name",
      width: 200
    },
    {
      label: "场馆数",
      prop: "countVenue",
      width: 75,
      // slot:"slot_list_column_countVenue"
      statistics:{listIndex:'list_venue', targetIdKey:'franchiseeId'}
    },
     {
      label: "加盟时间",
      prop: "joinTime",
      width: 100,
      // formatter:function(row){
        
      //  return moment(row.joinTime).format("YYYY-MM-DD")

      // }
    },
    {
      label: "备注",
      prop: "remark",
      width: 100
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "Id",
      prop: "P1",
      type: "input"
    },{
      label: "加盟时间",
      prop: "joinTime",
      type: "time_period"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "Id",
      prop: "P1"
    },
    {
      label: "企业名称",
      prop: "name"
    },
    {
      label: "备注",
      prop: "remark"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "企业名称",
      prop: "name",
      type: "input"
    },

    {
      label: "加盟时间",
      prop: "joinTime",
      type: "date"
    },
    {
      label: "备注2",
      prop: "remark",
      type: "input"
    }
  ]
}
//#endregion


//#region tangball_member
PUB.listCF.tangball_member ={
  listIndex: "list_member", //vuex对应的字段
  focusMenu:true,//进行菜单聚焦
  twoTitle: "会员中心",
  threeTitle: "会员列表",
  flag:true,
  url: {
    list: "/crossList?page=tangball_member", //列表接口
    add: "/crossAdd?page=tangball_member", //新增接口
    modify: "/crossModify?page=tangball_member", //修改接口
    delete: "/crossDelete?page=tangball_member" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "会员号",
      prop: "P1",
      width: 80
    },
    {
      label: "会员名称",
      prop: "name",
      width: 100
    },
    {
      label: "微信号",
      prop: "openid",
      width: 100
    },
     {
      label: "性别",
      prop: "sex",
      width: 65
    },
    {
      label: "身份证号",
      prop: "idCard",
      width: 100
    },
    {
      label: "参赛次数",
      prop: "entries",
      width: 65,
      // slot:"slot_list_column_entries"
      statistics:{listIndex:'list_enroll', targetIdKey:'memberId'}
    },
     {
      label: "成绩数",
      prop: "countAchievement",
      width: 65,
      statistics:{listIndex:'list_achievement', targetIdKey:'memberId'}
    },
    {
      label: "唐球积分",
      prop: "integral",
      width: 65
    },       
    {
      label: "备注",
      prop: "remark",
      width: 65
    },
    {
      label: "职业",
      prop: "career",
      width: 50
    },
    {
      label: "球龄",
      prop: "ballAge",
      width: 65,
      formatter: function(rowData) {
        if (rowData.ballAge == 1) {
          return "一年以下";
        } else if (rowData.ballAge == 2) {
          return "一到三年";
        } else if (rowData.ballAge == 3) {
          return "三到五年";
        } else if (rowData.ballAge == 4) {
          return "五到十年";
        } else {
          return "十年以上";
        }
      }
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "会员名称",
      prop: "name",
      type: "input_find_vague"
    },
    {
      label: "身份证号",
      prop: "idCard",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "会员编号",
      prop: "P1",
    },
    {
      label: "会员名称",
      prop: "name",
    },
    {
      label: "微信号",
      prop: "openid",
    },
    {
      label: "身份证号",
      prop: "idCard",
    },
    {
      label: "参赛次数",
      prop: "entries",
    },
    {
      label: "唐球积分",
      prop: "integral",
      width: 65
    },     
    
    {
      label: "职业",
      prop: "career",
      width: 50
    },
    {
      label: "球龄",
      prop: "ballAge",
      width: 65,
      formatter: function(rowData) {
        if (rowData.ballAge == 1) {
          return "一年以下";
        } else if (rowData.ballAge == 2) {
          return "一到三年";
        } else if (rowData.ballAge == 3) {
          return "三到五年";
        } else if (rowData.ballAge == 4) {
          return "五到十年";
        } else {
          return "十年以上";
        }
      }
    },
    {
      label: "备注",
      prop: "remark",
      width: 150
    }  
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
   {
      label: "会员姓名",
      prop: "name",
      width: 100
    },
    {
      label: "微信openid",
      prop: "openid",
      width: 100
    },
    {
      label: "性别",
      prop: "sex",
      type: "select",
      default:1,
      options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
    },
    {
      label: "身份证号",
      prop: "idCard",
      width: 100
    },
    {
      label: "备注",
      prop: "remark",
      width: 150
    } ,
    {
      label: "职业",
      prop: "career",
      type: "input"
    },
    {
      label: "球龄",
      prop: "ballAge",
      type: "select",
      options: [
        { label: "一年以下", value: 1 },
        { label: "一到三年", value: 2 },
        { label: "三到五年", value: 3 },
        { label: "五到十年", value: 4 },
        { label: "十年以上", value: 5 }
      ]
    }, 
  ]
}
//#endregion


//#region tangball_sponsor
PUB.listCF.tangball_sponsor = {
  listIndex: "list_sponsor", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "赛事赞助",
  threeTitle: "赞助商",
  flag: true,
  url: {
    list: "/crossList?page=tangball_sponsor", //列表接口
    add: "/crossAdd?page=tangball_sponsor", //新增接口
    modify: "/crossModify?page=tangball_sponsor", //修改接口
    delete: "/crossDelete?page=tangball_sponsor" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "赞助商编号",
      prop: "P1",
      width: 120
    },
    {
      label: "赞助商名称",
      prop: "name",
      width: 120
    },
    {
      label: "赞助次数",
      prop: "count",
      width: 120
    },
    {
      label: "赞助金额（单位：万元）",
      prop: "money",
      width: 200
    },
    {
      label: "赞助商简介",
      prop: "intro",
      width: 400
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "赞助商编号",
      prop: "P1",
      type: "input_find_vague"
    },
    {
      label: "赞助商名称",
      prop: "name",
      type: "input_find_vague"
    },
    {
      label: "赞助次数",
      prop: "count",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "赞助商编号",
      prop: "P1"
    },
    {
      label: "赞助商名称",
      prop: "name"
    },
    {
      label: "赞助次数",
      prop: "count"
    },
    {
      label: "赞助金额（单位：万元）",
      prop: "money"
    },
    {
      label: "赞助商简介",
      prop: "intro"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "赞助商名称",
      prop: "name",
      type: "input",
      width: 200
    },
    {
      label: "赞助次数",
      prop: "count"
    },
    {
      label: "赞助金额（单位：万元）",
      prop: "money"
    },

    {
      label: "赞助商简介",
      prop: "intro",
      type: "textarea"
    }
  ]
}
//#endregion

//#region tangball_sponsorship
PUB.listCF.tangball_sponsorship = {
  listIndex: "list_sponsorship", //vuex对应的字段
  focusMenu:true,//进行菜单聚焦
  twoTitle: "赛事赞助",
  threeTitle: "赛事赞助",
  flag: true,
  url: {
    list: "/crossList?page=tangball_sponsorship", //列表接口
    add: "/crossAdd?page=tangball_sponsorship", //新增接口
    modify:
      "/crossModify?page=tangball_sponsorship", //修改接口
    delete:
      "/crossDelete?page=tangball_sponsorship" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "id",
      prop: "P1",
      width: 60
    },
    {
      label: "赞助商id",
      prop: "sponsorId",
      width: 90,
       slot: "slot_detail_item_sponsorId",
    },
    {
      label: "赛事id",
      prop: "matchId",
      width: 80,
       slot: "slot_detail_item_matchId",

    },
    //  {
    //   label: "赛事名称",
    //   prop: "matchName",
    //   width: 80
    // },
    {
      label: "赞助金额",
      prop: "amount",
      width: 100
    },
    {
      label: "赞助时间",
      prop: "time",
      width: 110,
       formatter: function(row) {
        return moment(row.time).format("YYYY-MM-DD ");
      }
    },
    {
      label: "地点",
      prop: "place",
      width: 110
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
  
     {
      label: "赞助商id",
      prop: "sponsorId",
       type: "input"
    },
    {
      label: "赛事id",
      prop: "matchId",
       type: "input"
    },
     {
      label: "赞助时间",
      prop: "time",
       type: "time_period"
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "id",
      prop: "P1"
    },
    {
      label: "赞助商id",
      prop: "sponsorId",
      slot:"slot_detail_item_sponsorId"
    },
    {
      label: "赛事id",
      prop: "matchId",
       slot:"slot_detail_item_matchId"
    },
    {
      label: "赞助金额",
      prop: "amount"
    },
    {
      label: "赞助时间",
      prop: "time"
    },
    {
      label: "地点",
      prop: "place"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
   
    {
      label: "赞助商id",
      prop: "sponsorId",
      type: "select",
      ajax: {
        url: "/crossList?page=tangball_sponsor",
        keyLabel: "name",
        keyValue: "P1"
      }
    },
    {
      label: "赛事ID",
      prop: "matchId",
      type: "select",
      ajax: {
        url: "/crossList?page=tangball_match",
        keyLabel: "matchName",
        keyValue: "P1"
      }
    },
    //   {
    //   label: "赛事名称",
    //   prop: "matchName",
    //   width: 80
    // },
    {
      label: "赞助金额",
      prop: "amount",
      type: "input",
     
    },
    {
      label: "赞助时间",
      prop: "time",
      type: "date",
     
    },
    {
      label: "地点",
      prop: "place",
       slot: "slot_place"
    }
  ]
}
//#endregion

//#region tangball_msg
PUB.listCF.tangball_msg ={
  listIndex: "list_msg", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "消息",
  threeTitle: "消息列表",
  flag: true,
  url: {
    list: "/crossList?page=tangball_msg", //列表接口
    add: "/crossAdd?page=tangball_msg", //新增接口
    modify: "/crossModify?page=tangball_msg", //修改接口
    detail: "/crossDetail?page=tangball_msg", //查看单条数据详情接口，在修改表单或详情弹窗用到
    delete: "/crossDelete?page=tangball_msg" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "Id",
      prop: "P1",
      width: 60
    },
    {
      label: "消息标题",
      prop: "name",
      width: 200
    },
    {
      label: "消息范围",
      prop: "range",
      width: 90,
      formatter: function (rowData) {
        if (rowData.range == 1) {
          return "全部会员";
        } else if (rowData.range == 2)  {
          return "指定会员";
        }
      }
    },
    {
      label: "指定会员id数组",
      prop: "memberIdList",
      width: 90
    },
    {
      label: "发布状态",
      prop: "publish",
      width: 90,
      formatter: function (rowData) {
        if (rowData.range == 0) {
          return "不发布";
        } else if (rowData.range == 1)  {
          return "发布";
        }
      }
    },
    {
      label: "发布时间",
      prop: "publishTime",
      width: 120
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "Id",
      prop: "P1",
      type: "input"
    },
    {
      label: "消息标题",
      prop: "name",
      type: "input_find_vague"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "Id",
      prop: "P1"
    },
    {
      label: "消息标题",
      prop: "name"
    },
    {
      label: "消息内容",
      prop: "detail"
    },
    {
      label: "消息范围",
      prop: "range"
    },
    {
      label: "指定会员id数组",
      prop: "memberIdList"
    },
    {
      label: "	发布状态",
      prop: "publish"
    },
    {
      label: "发布时间",
      prop: "publishTime"
    },
    {
      label: "其他内容",
      prop: "extend"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "消息标题 ",
      prop: "name",
      type: "input"
    },
    {
      label: "消息内容",
      prop: "detail",
      type: "textarea"
    },

    {
      label: "消息范围",
      prop: "range",
      type: "select",
      default: 1,
      options: [
        { value: 1, label: "全部会员" },
        { value: 2, label: "指定会员" }
      ]
    },

    {
      term:{range:2},
      label: "指定会员id数组",
      prop: "memberIdList",
      type: "jsonEditor",
      slot:"slot_form_item_memberIdList"
    },

    {
      label: "是否发布",
      prop: "publish",
      type: "select",
      default: 1,
      options: [
        { value: 1, label: "发布" },
        { value: 0, label: "不发布" }
      ]
    },
    {
      label: "发布时间",
      prop: "publishTime",
      type: "dateTime"
    },

    {
      label: "加盟时间",
      prop: "joinTime",
      type: "date"
    },
    {
      label: "备注2",
      prop: "remark",
      type: "input"
    }
  ]
}
//#endregion


//#region tangball_msg_read
PUB.listCF.tangball_msg_read ={
  listIndex: "list_msg_read", //vuex对应的字段
  focusMenu:true,//进行菜单聚焦
  twoTitle: "消息",
  threeTitle: "消息已读记录列表",
  flag:true,
  url: {
    list: "/crossList?page=tangball_msg_read", //列表接口
    add: "/crossAdd?page=tangball_msg_read", //新增接口
    modify: "/crossModify?page=tangball_msg_read", //修改接口
   detail: "/crossDetail?page=tangball_msg_read", //查看单条数据详情接口，在修改表单或详情弹窗用到
    delete: "/crossDelete?page=tangball_msg_read" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "Id",
      prop: "P1",
      width: 60
    },
    {
      label: "会员id ",
      prop: "memberId",
      width: 150,
      slot:"slot_column_memberId"
    },
    
    {
      label: "消息id",
      prop: "msgId",
      width: 200,
      slot:"slot_column_msgId"
    },
    {
      label: "阅读时间",
      prop: "readTime",
      width: 100
    },
    


  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "Id",
      prop: "P1",
      type: "input"
    },
    {
      label: "会员id ",
      prop: "memberId",
      type: "input"
    },
    {
      label: "消息id",
      prop: "msgId",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "Id",
      prop: "P1"
    },
    {
      label: "会员id ",
      prop: "memberId",
      slot:"slot_column_memberId"
    },
    {
      label: "消息id",
      prop: "msgId",
      slot:"slot_column_msgId"
    },
    {
      label: "阅读时间",
      prop: "readTime",
    },
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    
    {
      label: "消息id",
      prop: "msgId",
      type: "select",
      ajax: {
        url: "/crossList?page=tangball_msg",
        keyLabel: "name",
        keyValue: "P1"
      }
    },
     {
      label: "会员id",
      prop: "memberId",
      type: "select",
      ajax: {
        url: "/crossList?page=tangball_member",
        keyLabel: "name",
        keyValue: "P1"
      }
    },
    {
      label: "阅读时间",
      prop: "readTime",
      type: "dateTime"
    },
   
  ]
}
//#endregion


//#region tangball_area
PUB.listCF.tangball_area = {
  //默认排序参数
  sortJsonDefault: {
    "tangball.countVenue": -1//按场馆数量降序
  },
  listIndex: "list_area", //vuex对应的字段
  focusMenu: true,//进行菜单聚焦
  flag: true,
  url: {
    list: "/crossList?page=dmagic_area", //列表接口
    add: "/crossAdd?page=dmagic_area", //新增接口
    modify: "/crossModify?page=dmagic_area", //修改接口
    delete: "/crossDelete?page=dmagic_area" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "地区名称",
      prop: "P2",
      width: 200
    },
    {
      label: "地区编号",
      prop: "P7",
      width: 200
    },
    {
      label: "父地区编号",
      prop: "P8",
      width: 150
    },
    {
      label: "场馆数",
      prop: "tangball",
      width: 100,
      formatter: function (rowData) {
        if (!rowData.tangball) return "";
        return rowData.tangball.countVenue
      }

    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "地区名称",
      prop: "P2",
      type: "input_find_vague"
    }, {
      label: "分类编号",
      prop: "P7",
      type: "input"
    }, {
      label: "父地区编号",
      prop: "P8",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "地区名称",
      prop: "P2",
    },
    {
      label: "地区编号",
      prop: "P7",
    },
    {
      label: "父地区编号",
      prop: "P8",
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "地区名称",
      prop: "P2",
      type: "input"
    },
    {
      label: "地区编号",
      prop: "P7",
      type: "input"
    }, {
      label: "父地区编号",
      prop: "P8",
      type: "input"
    }
  ]
}
//#endregion


//#region tangball_admin
PUB.listCF.tangball_admin ={
  listIndex: "list_admin", //vuex对应的字段
  focusMenu:true,//进行菜单聚焦
  twoTitle: "系统管理",
  threeTitle: "管理员",
  flag:true,
  url: {
    // list:"/list_login",
    list: "/crossList?page=tangball_admin", //列表接口
    add: "/crossAdd?page=tangball_admin", //新增接口
    modify: "/crossModify?page=tangball_admin", //修改接口
    delete: "/crossDelete?page=tangball_admin" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "用户名",
      prop: "userName",
      width: 200
    },
    {
      label: "密码",
      prop: "passWord",
      width: 200
    },
     {
      label: "昵称",
      prop: "nickName",
      width: 200
    },
    {
      label: "数据id",
      prop: "P1",
      width: 200
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "数据id",
      prop: "P1",
      type: "input"
    }
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "用户名",
      prop: "userName"
    },
    {
      label: "密码",
      prop: "passWord"
    },
    {
      label: "数据id",
      prop: "P1"
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "用户名",
      prop: "userName",
      type: "input"
    },
    {
      label: "密码",
      prop: "passWord",
      type: "input"
    },
    {
      label: "昵称",
      prop: "nickName",
      type: "input"
    },
  ]
}
//#endregion


//#region tangball_achievement
PUB.listCF.tangball_achievement ={
  data() {
    return {
      cfList: {
        listIndex: "list_achievement", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "比赛成绩",
        focusMenu: true,//进行菜单聚焦
        flag: true,
        url: {
          list: "/crossList?page=tangball_achievement", //列表接口
          add: "/crossAdd?page=tangball_achievement", //新增接口
          modify: "/crossModify?page=tangball_achievement", //修改接口
          detail: "/crossDetail?page=tangball_achievement", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_achievement" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId",
            width: 120
          },

          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId",
            width: 160
          },
          {
            label: "城市赛场馆",
            prop: "cityVenueId",
            slot: "slot_detail_item_cityVenueId",
            width: 150
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            width: 180,
            slot: "slot_detmember_enrollail_item_matchProgress"
          },
          {
            label: "杆数",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            width: 70
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "参赛人Id",
            prop: "participantsId"
          },

          {
            label: "赛事ID",
            prop: "matchId"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId"
          },
          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            slot: "slot_detail_item_matchProgress"
          },
          {
            label: "杆数",
            prop: "matchScore"
          },
          {
            label: "名次",
            prop: "ranking"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },

          {
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            }
          },
          {
            label: "赛事报名信息",
            prop: "memberId",
            slot: "slot_form_item_matchInfo"
          },
          // {
          //   label: "赛事阶段",
          //   prop: "matchProgress",
          //   type: "select",
          //   slot: "slot_modify_item_matchProgress"
          // },
          {
            label: "杆数",
            prop: "matchScore",
            type: "input"
          }

        ]
      }
    };
  }
}
//#endregion

//#region tangball_achievement_simple
PUB.listCF.tangball_achievement_simple ={
  data() {
    return {
      cfList: {
        focusMenu:false,
        isShowSearchForm: false, //隐藏查询表单
        isShowBreadcrumb: false, //隐藏面包屑导航
        isShowPageLink: false, //隐藏分页
        isShowOperateColumn: false, //隐藏操作列
        isShowToolBar: false, //隐藏工具栏
        //默认排序参数
        sortJsonDefault: {
          matchScore: 1//按比分降序
        },
        //-------列配置数组-------
        columns: [
          {
            label: "参赛人---",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId",
            width: 150
          },


          {
            label: "杆数",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            // type:"index",
            "min-width": "150"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          //先把下面这种注释
          // {
          //   label: "参赛人",
          //   prop: "participantsId",
          //   type: "select",
          //   ajax: {
          //     url: "/crossListRelation",
          //     keyLabel: "name",
          //     keyValue: "P1",
          //     param: {
          //       needRelation: "1",
          //       columnItem: "memberId",
          //       columnTarget: "P1",
          //       sheetRelation: {
          //         page: "tangball_enroll",
          //         findJson: {//这两个参数在实际使用时需要改造
          //           matchId: 86,
          //           // cityVenueId: null
          //         }
          //       },
          //       sheetTarget: {
          //         page: "tangball_member",
          //         pageSize: "2000",
          //         findJson: {}
          //       }
          //     }
          //   }
          // },

          {
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            hide: true
          },
          // {
          //   label: "赛事阶段",
          //   prop: "matchProgress",
          //   type: "select",
          //   slot: "slot_modify_item_matchProgress",
          //   hide: true
          // },
          // {
          //   label: "杆数",
          //   prop: "matchScore",
          //   type: "input"
          // },
          {
            label: "比赛时间段（待处理）",
            prop: "matchScore",
            type: "input"
          }
        ]

      }
    };
  }
}
//#endregion

//#region tangball_enroll
PUB.listCF.tangball_enroll ={
  data() {
    return {
      cfList: {
        listIndex: "list_enroll", //vuex对应的字段
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
        columns: [
          {
            label: "报名会员id",
            prop: "memberId",
            slot: "slot_detail_item_memberId",
            width: 100
          },
          {
            label: "赛事",
            prop: "matchId",
            slot: "slot_detail_item_matchId",
            width: 120
          },
          {
            label: "手机号",
            prop: "phone",
            width: 80
          },
          {
            label: "性别",
            prop: "sex",
            width: 40,
            formatter: function (rowData) {
              if (rowData.sex == 1) {
                return "男";
              } else {
                return "女";
              }
            }
          },
          {
            label: "年龄",
            prop: "age",
            width: 40
          },
          {
            label: "职业",
            prop: "career",
            width: 40
          },
          {
            label: "球龄",
            prop: "ballAge",
            width: 80,
            formatter: function (rowData) {
              if (rowData.ballAge == 1) {
                return "一年以下";
              } else if (rowData.ballAge == 2) {
                return "一到三年";
              } else if (rowData.ballAge == 3) {
                return "三到五年";
              } else if (rowData.ballAge == 4) {
                return "五到十年";
              } else {
                return "十年以上";
              }
            }
          },

          {
            label: "身份证号",
            prop: "idCard",
            width: 90
          },
          {
            label: "报名时间",
            prop: "time",
            width: 75
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 70,
            formatter: function (rowData) {
              if (rowData.payStatus == 2) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 70,
            formatter: function (rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "身份证号",
            prop: "idCard",
            type: "input"
          },
          {
            label: "报名会员id",
            prop: "memberId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "赛事id",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            }
          },
          {
            label: "支付状态",
            prop: "payStatus",
            type: "select",
            options: [
              { label: "已支付", value: 2 },
              { label: "未支付", value: 1 }
            ]
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options: [
              { label: "未审核", value: 1 },
              { label: "审核不通过", value: 2 },
              { label: "审核通过", value: 3 }
            ]
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "报名会员id",
            prop: "memberId",
            slot: "slot_detail_item_memberId"
          },
          {
            label: "赛事id",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "手机号",
            prop: "phone",
            width: 100
          },
          {
            label: "城市场馆id",
            prop: "cityVenueId"
          },
          {
            label: "性别",
            prop: "sex",
            width: 50,
            formatter: function (rowData) {
              if (rowData.sex == 1) {
                return "男";
              } else {
                return "女";
              }
            }
          },
          {
            label: "年龄",
            prop: "age",
            width: 50
          },
          {
            label: "职业",
            prop: "career",
            width: 50
          },
          {
            label: "球龄",
            prop: "ballAge",
            width: 100,
            formatter: function (rowData) {
              if (rowData.ballAge == 1) {
                return "一年以下";
              } else if (rowData.ballAge == 2) {
                return "一到三年";
              } else if (rowData.ballAge == 3) {
                return "三到五年";
              } else if (rowData.ballAge == 4) {
                return "五到十年";
              } else {
                return "十年以上";
              }
            }
          },
          {
            label: "身份证号",
            prop: "idCard"
          },

          {
            label: "报名时间",
            prop: "time",
            formatter: function (row) {
              return moment(row.time).format("YYYY-MM-DD");
            }
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 100,
            formatter: function (rowData) {
              if (rowData.payStatus == 2) {
                return "已支付";
              } else {
                return "未支付";
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 100,
            formatter: function (rowData) {
              if (rowData.auditStatus == 1) {
                return "未审核";
              } else if (rowData.auditStatus == 2) {
                return "审核不通过";
              } else {
                return "审核通过";
              }
            }
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "报名会员id",
            prop: "memberId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "报名会员id" }]
          },
          {
            label: "赛事id",
            prop: "matchId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "赛事id" }]
          },
          {
            label: "赛事信息",
            prop: "cityVenueId",
            slot: "slot_form_item_matchInfo"
          },

          {
            label: "手机号",
            prop: "phone",
            type: "input"
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
          },
          {
            label: "年龄",
            prop: "age",
            type: "input"
          },
          {
            label: "职业",
            prop: "career",
            type: "input"
          },
          {
            label: "球龄",
            prop: "ballAge",
            type: "select",
            options: [
              { label: "一年以下", value: 1 },
              { label: "一到三年", value: 2 },
              { label: "三到五年", value: 3 },
              { label: "五到十年", value: 4 },
              { label: "十年以上", value: 5 }
            ]
          },
          {
            label: "身份证号",
            prop: "idCard"
          },
          {
            label: "报名时间",
            prop: "time",

            type: "date"
          },

          {
            label: "支付状态",
            prop: "payStatus",
            type: "select",
            options: [
              { label: "已支付", value: 2 },
              { label: "未支付", value: 1 }
            ]
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options: [
              { label: "未审核", value: 1 },
              { label: "审核不通过", value: 2 },
              { label: "审核通过", value: 3 }
            ]
          }
          // {
          //   label: "相册",
          //   prop: "album",
          //   slot: "slot_detail_item_album"
          // }
        ]
      }
    };
  }
}
//#endregion

//#region tangball_
PUB.listCF.tangball_ =11111
//#endregion

//#region tangball_
PUB.listCF.tangball_ =11111
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
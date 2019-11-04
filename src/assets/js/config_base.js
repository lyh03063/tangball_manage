
window.PUB = {}
 //PUB.domain = "http://localhost:3000"
//PUB.domain = 'http://test.dmagic.cn'
//PUB.domain="http://e6234kn.hn3.mofasuidao.cn"//魔法隧道地址
PUB.domain = "http://120.76.160.41:3000"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=tangball`

import tangball_member_for_select from "@/assets/js/config/tangball_member_for_select.js"
// window.F_ITEMS = {};

// //调用：{处理字段数组的某个字段配置的函数}
// util.handelItem({ action: "replace", items: items, prop: prop, itemNew: {} })



//#region D_ITEMS:详情字段管理
window.D_ITEMS = {}//公共数据字典对象

D_ITEMS.Id={
  label: "Id",
  prop: "P1"
};
//赛事
D_ITEMS.matchName={
  label: "赛事名称",
  prop: "matchName"
};
D_ITEMS.matchErollStatus={
  label: "报名状态",
  prop: "matchErollStatus",
  formatter: function (rowData) {
    let obj = util.getTimeStatus({
      start: rowData.enrollTime,
      end: rowData.enrollTimeEnd
    });
    let htmlResult = `报名时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：报名${obj.msg}`;
    return htmlResult;
  }
};
D_ITEMS.matchStatus={
  label: "赛事状态",
  prop: "matchStatus",
  formatter: function (rowData) {
    let obj = util.getTimeStatus({
      start: rowData.matchTime,
      end: rowData.matchTimeEnd
    });
    let htmlResult = `比赛时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：比赛${obj.msg}`;
    return htmlResult;
  }
};
D_ITEMS.publicationStatus={
  label: "发布状态",
  prop: "publicationStatus",
  formatter: function (rowData) {
    return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
  }
};
D_ITEMS.enrollTime={
  label: "报名开始时间",
  prop: "enrollTime"
};
D_ITEMS.enrollTimeEnd={
  label: "报名结束时间",
  prop: "enrollTimeEnd"
};

D_ITEMS.progress={
  label: "赛程设置",
  prop: "progress",
  slot: 'slot_detail_item_progress'
};
D_ITEMS.venue={

  label: "决赛场馆",
  prop: "venue",
  type: "select",
  slot: "slot_detail_item_cityVenueList"
};
D_ITEMS.match_album={
  label: "赛事图片",
  prop: "album",
  slot: "slot_detail_item_album"
};
D_ITEMS.registeredPersons={
  label: "报名数",
  prop: "registeredPersons"
};
D_ITEMS.registrationFee={
  label: "报名费用",
  prop: "registrationFee"
};
D_ITEMS.matchIntroduce={
  label: "赛事介绍",
  prop: "matchIntroduce"
};

D_ITEMS.enrollRequirements={
  label: "报名要求",
  prop: "enrollRequirements"
};
D_ITEMS.matchManual={
  label: "赛事规程",
  prop: "matchManual",
  type: 'html'
};
D_ITEMS.matchResult={
  label: "赛事结果说明",
  prop: "matchResult",
  type: 'html'
};

//球员
D_ITEMS.Id,
D_ITEMS.member_name= {
  label: "球员姓名",
  prop: "name",
};
D_ITEMS.sex={
  label: "性别",
  prop: "sex",
  formatter:function(data) {
    if (data.sex==2) {
      return '女'
    }else if (data.sex==1) {
      return '男'
    }else{
      return ''
    }
  }
};
D_ITEMS.openid={
  label: "微信号",
  prop: "openid",
};
D_ITEMS.phone={
  label: "手机号",
  prop: "phone",
};
D_ITEMS.franchiseeId={
  label: "所属加盟商",
  prop: "franchiseeId",
  slot:'slot_detail_item_franchiseeId'
};
D_ITEMS.venueId={
  label: "所属球场",
  prop: "venueId",
  slot:'slot_detail_item_venueId'
};
D_ITEMS.idCard={
  label: "身份证号",
  prop: "idCard",
};
D_ITEMS.entries={
  label: "参赛次数",
  prop: "entries",
};
D_ITEMS.career={
  label: "职业",
  prop: "career",
};
D_ITEMS.ballAge={
  label: "球龄",
  prop: "ballAge",
  formatter: function(rowData) {
    if (rowData.ballAge == 1) {
      return "一年以下";
    } else if (rowData.ballAge == 2) {
      return "一到三年";
    } else if (rowData.ballAge == 3) {
      return "三到五年";
    } else if (rowData.ballAge == 4) {
      return "五到十年";
    } else if (rowData.ballAge == 5) {
      return "十年以上";
    }else{
      return "暂无";
    }
  }
};
D_ITEMS.remark={
  label: "备注",
  prop: "remark",
};




D_ITEMS.aaaa=1111;
D_ITEMS.aaaa=1111;

D_ITEMS.aaaa=1111;
D_ITEMS.aaaa=1111;




//#endregion






//#region COLUMNS:列字段管理

window.COLUMNS = {}

COLUMNS.Id={
  label: "Id",
  prop: "P1",
  width: 50
};
COLUMNS.roleName={
  label: "角色名",
  prop: "name",
  width: 120
};
COLUMNS.rolePower={
  label: "权限",
  prop: "power",
  width: 200
};
//赛事


COLUMNS.matchName={
  label: "赛事名称",
  prop: "matchName",
  width: 270
};
COLUMNS.matchTime={
  label: "赛事时间",
  prop: "matchTime",
  width: 140,
  sortable: "custom",//开启后端排序
  formatter: function (rowData) {
    return moment(rowData.matchTime).format("YYYY-MM-DD HH:mm");
  }
};
COLUMNS.registrationFee={
  label: "报名费",
  prop: "registrationFee",
  width: 60
};
//从D_ITEMS.publicationStatus复制过来
COLUMNS.publicationStatus=Object.assign({}, D_ITEMS.publicationStatus,{width: 70,})


COLUMNS.matchStatus={
  label: "赛事状态",
  prop: "matchStatus",
  requireProp: ["enrollTime", 'enrollTimeEnd', 'matchTime', 'matchTimeEnd'],
  width: 100,
  formatter: function (rowData) {
    let nowDate = new Date().getTime();
    let enrollTimeDate = new Date(rowData.enrollTime).getTime();
    let enrollTimeEnd = new Date(rowData.enrollTimeEnd).getTime();
    let matchTime = new Date(rowData.matchTime).getTime();
    let matchTimeEnd = new Date(rowData.matchTimeEnd).getTime();
    if (nowDate > matchTimeEnd) {
      return '赛事已结束'
    } else if (nowDate > matchTime) {
      return '赛事已开始'
    } else if (nowDate > enrollTimeEnd) {
      return '报名时间已结束'
    } else if (nowDate > enrollTimeDate) {
      return '火热报名中'
    } else {
      return '报名时间未到'
    }
  }
};
COLUMNS.matchForm={
  label: "类型",
  prop: "matchForm",
  width: 50,
  formatter: function (rowData) {
    return rowData.matchForm == 2 ? "团体赛" : "个人赛"; //三元表达式
  }
};
COLUMNS.enroolSheet={
  label: "报名表",
  requireProp: ["registeredPersons"],
  // prop: "achievement",
  width: 95,
  slot: "slot_column_enroll"
};
COLUMNS.confrontAchievement={
  label: "对阵分组/成绩",
  // prop: "achievement",
  width: 105,
  slot: "slot_column_achievement"
};

//球员
COLUMNS.Id,
COLUMNS.wxNickName={
  label: "微信昵称",
  prop: "wxNickName",
  width: 100
};
COLUMNS.member_name={
  label: "球员姓名",
  prop: "name",
  width: 80
};
COLUMNS.openid={
  label: "微信openid",
  prop: "openid",
  width: 100
};

COLUMNS.sex=Object.assign({}, D_ITEMS.sex,{width: 50,})

COLUMNS.phone={
  label: "手机号",
  prop: "phone",
  width: 110
};
COLUMNS.franchiseeId={
  label: "所属加盟商",
  prop: "franchiseeId",
  width: 90,
  formatter:function (data) {
    if (data.franchisee) {
      return data.franchisee.name?data.franchisee.name:'无'
    }
  }
};
COLUMNS.venueId={
  label: "所属球场",
  prop: "venueId",
  width: 80,
  formatter:function (data) {
    if (data.venue) {
      return data.venue.name?data.venue.name:"无"
    }
  }
};
COLUMNS.entries={
  label: "参赛数",
  prop: "entries",
  width: 60,
  // slot:"slot_list_column_entries"
  statistics:{listIndex:'list_enroll', targetIdKey:'memberId'}
};
COLUMNS.countAchievement={
  label: "成绩数",
  prop: "countAchievement",
  width: 70,
  statistics:{listIndex:'list_achievement', targetIdKey:'memberId'}
};
COLUMNS.ballAge=Object.assign({}, D_ITEMS.ballAge,{width: 60,})





COLUMNS.aaaa=11111;
COLUMNS.aaaa=11111;
COLUMNS.aaaa=11111;
COLUMNS.aaaa=11111;
COLUMNS.aaaa=11111;
COLUMNS.aaaa=11111;
COLUMNS.aaaa=11111;
//#endregion



//#region F_ITEMS:表单字段管理

window.F_ITEMS = {};
F_ITEMS.Id={
  label: "数据id",
  prop: "P1",
  type: "input"
};
F_ITEMS.memberId={
  label: "球员",
  prop: "memberId",
  type: "select_list_data",
  cfSelectList: {
    //选择列表配置
    dataName: "球员",
    valueKey: "P1",
    labelKey: "name",
    pageName: "tangball_member",
    cfList: tangball_member_for_select
  },
  rules: [{ required: true, message: "球员不能为空" }]
};
F_ITEMS.memberId_readonly={
  label: "球员",
  prop: "memberId",
  type: "ajax_populate",
  cfAjaxPopulate: { populateKey: "name", page: "tangball_member" }
};
F_ITEMS.matchId_readonly={
  label: "赛事",
  prop: "matchId",
  type: "ajax_populate",
  cfAjaxPopulate: { populateKey: "matchName", page: "tangball_match" }
};
F_ITEMS.time={
  label: "报名时间",
  prop: "time",
  type: "date"
};
F_ITEMS.payStatus={
  label: "支付状态",
  prop: "payStatus",
  type: "select",
  options: [
    { label: "已支付", value: 2 },
    { label: "未支付", value: 1 }
  ]
};
F_ITEMS.auditStatus={
  label: "审核状态",
  prop: "auditStatus",
  type: "select",
  options: [
    { label: "未审核", value: 1 },
    { label: "审核不通过", value: 2 },
    { label: "审核通过", value: 3 }
  ]
};
F_ITEMS.groups={
  label: "球队信息",
  prop: "groups",
  slot: "slot_form_item_groups"
};
F_ITEMS.matchInfo= {
  label: "赛事信息",
  prop: "matchInfo",
  slot: "slot_form_item_matchInfo"
};
//赛事列表-查询
F_ITEMS.matchName_search={
  label: "赛事名称",
  prop: "matchName",
  type: "input_find_vague",
};
F_ITEMS.matchForm={
  label: "赛事类型",
  prop: "matchForm",
  type: "select",
  options: [
    { label: "个人赛", value: 1 },
    { label: "团体赛", value: 2 }
  ],
};
F_ITEMS.publicationStatus={
  label: "发布状态",
  prop: "publicationStatus",
  type: "select",
  options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
};
F_ITEMS.matchTime_search= {
  label: "赛事时间",
  prop: "matchTime",
  type: "time_period"
};


//赛事列表-新增/修改
F_ITEMS.matchName={
  label: "赛事名称",
  prop: "matchName",
  rules: [{ required: true, message: "赛事名称不能为空" }],
};


F_ITEMS.ruleId={
  label: "赛事规则",
  prop: "ruleId",
  type: "select",
  ajax: {
    url: "/crossList?page=tangball_rule",
    keyLabel: "name",
    keyValue: "P1"
  },
};

F_ITEMS.teamMemberRange={
  label: "队员人数范围",
  keyMin: "teamMemberMin",
  keyMax: "teamMemberMax",
  type: "numberRange",
  term: { matchForm: 2 },
  // rules: [{ required: true, message: "不能为空" }]
};
F_ITEMS.menCount={
  label: "男性人数范围",
  type: "numberRange",
  prop: "menCount",
  term: { matchForm: 2 },

};
F_ITEMS.womenCount={
  label: "女性人数范围",
  type: "numberRange",
  prop: "womenCount",
  term: { matchForm: 2 },

};
F_ITEMS.enrollTime={
  label: "报名开始时间",
  prop: "enrollTime",
  type: "dateTime",
  rules: [{ required: true, message: "不能为空" }],
};
F_ITEMS.matchTime={
  label: "赛事开始时间",
  prop: "matchTime",
  type: "dateTime",
  rules: [{ required: true, message: "不能为空" }],
};
F_ITEMS.enrollTimeEnd= {
  label: "报名结束时间",
  prop: "enrollTimeEnd",
  type: "dateTime",
  rules: [{ required: true, message: "不能为空" }],
};
F_ITEMS.matchTimeEnd={
  label: "赛事结束时间",
  prop: "matchTimeEnd",
  type: "dateTime",
  rules: [{ required: true, message: "不能为空" }],
};
F_ITEMS.registrationFee= {
  label: "报名费用",
  prop: "registrationFee",
  type: "number",
};
F_ITEMS.matchIntroduce={
  label: "赛事介绍",
  prop: "matchIntroduce",
  type: "textarea",
  col_span: 24
};
F_ITEMS.enrollRequirements={
  label: "报名要求",
  prop: "enrollRequirements",
  type: "textarea",
  col_span: 24
};
F_ITEMS.album={
  label: "相册",
  prop: "album",
  type: "upload",
  col_span: 24, //控制显示一行多列
  tips: "图片尺寸比例最好保持在1:0.8，建议尺寸：宽500px，高400px"
};
F_ITEMS.venue={
  label: "决赛场馆",
  prop: "venue",
  type: "select",
  slot: "slot_form_item_cityVenueList",
  col_span: 24
};
F_ITEMS.progress={
  label: "赛程设置",
  prop: "progress",
  slot: 'slot_form_item_progress',
  col_span: 24
};
F_ITEMS.matchManual={
  label: "赛事规程",
  prop: "matchManual",
  type: "editorTM",
  col_span: 24 //控制显示一行多列
};
F_ITEMS.matchResult={
  label: "赛事结果说明",
  prop: "matchResult",
  type: "editorTM",
  col_span: 24 //控制显示一行多列
};

F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
F_ITEMS.aaaa=11111;
//#endregion




//#region DYDICT:公共数据字典对象管理
window.DYDICT = {}//公共数据字典对象

DYDICT.aaa=1111;
DYDICT.aaa=1111;
DYDICT.aaa=1111;
DYDICT.aaa=1111;

//#endregion











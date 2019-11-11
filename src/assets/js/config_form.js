import tangball_member_for_select from "@/assets/js/config/tangball_member_for_select.js"
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

F_ITEMS.matchId_select={
    label: "赛事",
    prop: "matchId",
    type: "select",
    ajax: {
      url: "/crossList?page=tangball_match",
      keyLabel: "matchName",
      keyValue: "P1"
    },
    rules: [{ required: true, message: "赛事不能为空" }]
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

 /****************************赛事报名-START****************************/
 F_ITEMS.phone={
    label: "手机号",
    prop: "phone",
    type: "input"
  };
 F_ITEMS.sex={
    label: "性别",
    prop: "sex",
    type: "select",
    options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
  };
 F_ITEMS.age={
    label: "年龄",
    prop: "age",
    type: "input"
  };
 F_ITEMS.career={
    label: "职业",
    prop: "career",
    type: "input"
  };
 F_ITEMS.ballAge={
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
  };
 F_ITEMS.idCard={
    label: "身份证号",
    prop: "idCard"
  };
  F_ITEMS.playingTime={
    label: "报名时间",
    prop: "playingTime",
    type: "date"
  };
  F_ITEMS.aaaa=11111;
  F_ITEMS.aaaa=11111;
  F_ITEMS.aaaa=11111;
  F_ITEMS.aaaa=11111;
  F_ITEMS.aaaa=11111;
 /****************************赛事报名-END****************************/

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

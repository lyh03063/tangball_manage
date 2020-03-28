
//#region D_ITEMS:详情字段管理
window.D_ITEMS =window.D_ITEMS|| {}//公共数据字典对象

D_ITEMS.Id={
  label: "Id",
  prop: "P1"
};
//赛事
D_ITEMS.sponsorId ={
  label: "主办发",
  prop: "sponsorId",
  slot:"slot_detail_item_sponsorId"
},
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


 /****************************赛事报名-START****************************/
 
D_ITEMS.memberId_slot={
  label: "报名球员",
  prop: "memberId",
  slot: "slot_detail_item_memberId"
};
D_ITEMS.matchId_slot={
  label: "赛事",
  prop: "matchId",
  slot: "slot_detail_item_matchId"
};

D_ITEMS.matchInfo={
  label: "赛事信息",
  prop: "matchInfo",
  slot: 'slot_detail_item_matchInfo'
};
D_ITEMS.age={
  label: "年龄",
  prop: "age",
};
D_ITEMS.time_enrool={
  label: "报名时间",
  prop: "time",
  formatter: function (row) {
    return moment(row.time).format('YYYY-MM-DD HH:mm')
  }
};
D_ITEMS.payStatus={
  label: "支付状态",
  prop: "payStatus",

  formatter: function (rowData) {
    if (rowData.payStatus == 2) {
      return "已支付";
    } else {
      return "未支付";
    }
  }
};
D_ITEMS.auditStatus={
  label: "审核状态",
  prop: "auditStatus",
  
  formatter: function (rowData) {
    if (rowData.auditStatus == 1) {
      return "未审核";
    } else if (rowData.auditStatus == 2) {
      return "审核不通过";
    } else if (rowData.auditStatus == 3) {
      return "审核通过";
    }else{
      return "";
    }
  }
};
D_ITEMS.playingTime ={
  label: "比赛日期",
  prop: "playingTime",
  formatter: function (row) {
    if (!row.playingTime)return "";
    return moment(row.playingTime).format('YYYY-MM-DD')
  }
};


 /****************************赛事报名-END****************************/

D_ITEMS.aaaa=1111;
D_ITEMS.aaaa=1111;
D_ITEMS.aaaa=1111;
D_ITEMS.aaaa=1111;




//#endregion


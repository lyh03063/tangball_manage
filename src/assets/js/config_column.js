
import "@/assets/js/config_detail.js"
//#region COLUMNS:列字段管理


window.COLUMNS =window.COLUMNS|| {}
window.AAA = 123
COLUMNS.Id = {
  label: "Id",
  prop: "P1",
  width: 50
};
COLUMNS.roleName = {
  label: "角色名",
  prop: "name",
  width: 120
};
COLUMNS.rolePower = {
  label: "权限",
  prop: "power",
  width: 200
};
//赛事
COLUMNS.sponsorId = {
  label: "主办发",
      prop: "sponsorId",
      width: 100,
      formatter: function (rowData) {
        if (rowData.sponsorDoc) {
          return rowData.sponsorDoc.name
        }
      }
}

COLUMNS.matchName = {
  label: "赛事名称",
  prop: "matchName",
  width: 270
};
COLUMNS.matchTime = {
  label: "赛事时间",
  prop: "matchTime",
  width: 140,
  sortable: "custom",//开启后端排序
  formatter: function (rowData) {
    return moment(rowData.matchTime).format("YYYY-MM-DD HH:mm");
  }
};
COLUMNS.registrationFee = {
  label: "报名费",
  prop: "registrationFee",
  width: 60
};
//从D_ITEMS.publicationStatus复制过来
COLUMNS.publicationStatus = Object.assign({}, D_ITEMS.publicationStatus, { width: 70, })


COLUMNS.matchStatus = {
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
COLUMNS.matchForm = {
  label: "类型",
  prop: "matchForm",
  width: 50,
  formatter: function (rowData) {
    return rowData.matchForm == 2 ? "团体赛" : "个人赛"; //三元表达式
  }
};
COLUMNS.enroolSheet = {
  label: "报名表",
  requireProp: ["registeredPersons"],
  // prop: "achievement",
  width: 95,
  slot: "slot_column_enroll"
};
COLUMNS.confrontAchievement = {
  label: "对阵分组/成绩",
  // prop: "achievement",
  width: 105,
  slot: "slot_column_achievement"
};

//球员
COLUMNS.Id,
  COLUMNS.wxNickName = {
    label: "微信昵称",
    prop: "wxNickName",
    width: 100
  };
COLUMNS.member_name = {
  label: "球员姓名",
  prop: "name",
  width: 80
};
COLUMNS.openid = {
  label: "微信openid",
  prop: "openid",
  width: 100
};

COLUMNS.sex = Object.assign({}, D_ITEMS.sex, { width: 50, })

COLUMNS.phone = {
  label: "手机号",
  prop: "phone",
  width: 110
};
COLUMNS.franchiseeId = {
  label: "所属加盟商",
  prop: "franchiseeId",
  width: 90,
  formatter: function (data) {
    if (data.franchisee) {
      return data.franchisee.name ? data.franchisee.name : '无'
    }
  }
};
COLUMNS.venueId = {
  label: "所属球场",
  prop: "venueId",
  width: 80,
  formatter: function (data) {
    if (data.venue) {
      return data.venue.name ? data.venue.name : "无"
    }
  }
};
COLUMNS.entries = {
  label: "参赛数",
  prop: "entries",
  width: 60,
  // slot:"slot_list_column_entries"
  statistics: { listIndex: 'list_enroll', targetIdKey: 'memberId' }
};
COLUMNS.countAchievement = {
  label: "成绩数",
  prop: "countAchievement",
  width: 70,
  statistics: { listIndex: 'list_achievement', targetIdKey: 'memberId' }
};
COLUMNS.ballAge = Object.assign({}, D_ITEMS.ballAge, { width: 60, })


/****************************赛事报名-START****************************/

COLUMNS.enrool_memberId = {
  label: "报名球员",
  prop: "memberId",
  width: 80,
  formatter: function (rowData) {
    if (rowData.memberDoc) {
      return rowData.memberDoc.name
    }
  }
};
COLUMNS.orderId = {
  label: "订单号",
  prop: "orderId",
  width: 160,
 
};
COLUMNS.enrool_matchId = {
  label: "赛事名称",
  prop: "matchId",
  // slot: "slot_detail_item_matchId",
  width: 240,
  formatter: function (rowData) {
    if (rowData.matchDoc) {
      return rowData.matchDoc.matchName
    }
  }
};
COLUMNS.enrool_matchForm = {
  label: "赛事类型",
  prop: "matchId",
  width: 80,
  formatter: function (rowData) {
    if (rowData.matchDoc) {
      if (rowData.matchDoc.matchForm == 1) {
        return '个人赛'
      } else {
        return '团体赛'
      }
    }
  }
};
COLUMNS.enrool_time = Object.assign({}, D_ITEMS.time_enrool, {width: 130 })
COLUMNS.payStatus = Object.assign({}, D_ITEMS.payStatus, { width: 80 })
COLUMNS.auditStatus = Object.assign({}, D_ITEMS.auditStatus, { width: 80 })

COLUMNS.playingTime = Object.assign({}, D_ITEMS.playingTime, { width: 100 })

COLUMNS.aaaa = 11111;


COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
 /****************************赛事报名-END****************************/


//#endregion


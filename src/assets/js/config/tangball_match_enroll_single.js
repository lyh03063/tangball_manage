import tangball_member_for_select from "./tangball_member_for_select.js"
console.log("tangball_member_for_select:##############", tangball_member_for_select);

export default {
  columns: [
    {
      label: "报名球员",
      prop: "memberId",
      width: 110,
      formatter: function (rowData) {
        if (rowData.memberName) {
          return rowData.memberName.name;
        }
      }
    },

    {
      label: "手机号",
      prop: "phone",
      width: 130,
      formatter: function (rowData) {
        if (rowData.memberName) {
          return rowData.memberName.phone
        }

      }
    },
    {
      label: "性别",
      prop: "sex",
      width: 65,
      formatter: function (rowData) {
        if (rowData.memberName) {
          if (rowData.memberName.sex == 1) {
            return "男";
          } else {
            return "女";
          }
        }

      }
    },
    {
      label: "年龄",
      prop: "age",
      width: 65,
      formatter: function (rowData) {
        if (rowData.memberName) {
          return rowData.memberName.age
        }

      }
    },

    {
      label: "报名时间",
      prop: "time",
      width: 180,
      formatter: function (rowData) {
        if (rowData.time) {
          var dt = new Date(rowData.time);
          return dt.toLocaleDateString() + dt.toLocaleTimeString()
        } else {
          return '暂无报名时间'
        }

      }
    },
    {
      label: "支付状态",
      prop: "payStatus",
      width: 120,
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
      "min-width": "100",
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
  detailItems: [
    {
      label: "报名球员id",
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
      width: 180,
      formatter: function (rowData) {
        if (rowData.time) {
          var dt = new Date(rowData.time);
          return dt.toLocaleDateString() + dt.toLocaleTimeString()
        } else {
          return '暂无报名时间'
        }

      }
    },
    {
      label: "赛事信息",
      prop: "cityVenueId",
      slot: 'slot_detail_item_matchInfo'
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
  formItems: [
    F_ITEMS.memberId,
    F_ITEMS.time,
    F_ITEMS.matchInfo,
    F_ITEMS.payStatus,
    F_ITEMS.auditStatus,
  ]
}
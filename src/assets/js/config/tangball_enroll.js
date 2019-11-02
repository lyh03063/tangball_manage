//#region tangball_enroll
import tangball_member_for_select from "./tangball_member_for_select.js"
export default {
  data() {
    return {
      cfList: {
        powerPath: "matchCenter.list_enroll",//权限路径
        listIndex: "list_enroll", //vuex对应的字段
        focusMenu: true,//进行菜单聚焦
        twoTitle: "赛事",
        threeTitle: "报名(订单)",

        url: {
          list: "/crossList?page=tangball_enroll", //列表接口
          add: "/crossAdd?page=tangball_enroll", //新增接口
          modify: "/crossModify?page=tangball_enroll", //修改接口
          detail: "/crossDetail?page=tangball_enroll", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_enroll" //删除接口
        },
        dynamicDict: [{
          page: "tangball_match",
          populateColumn: "matchMsg",
          idColumn: "matchId",
          idColumn2: "P1"
        },
        {
          page: "tangball_member",
          populateColumn: "memberMsg",
          idColumn: "memberId",
          idColumn2: "P1"
        }],
        //-------列配置数组-------
        // expands:[],
        columns: [
          {
            label: "报名球员",
            prop: "memberId",
            // slot: "slot_detail_item_memberId",
            width: 110,
            formatter: function (rowData) {
              if (rowData.memberMsg) {
                return rowData.memberMsg.name
              }
            }
          },
          {
            label: "赛事名称",
            prop: "matchId",
            // slot: "slot_detail_item_matchId",
            width: 300,
            formatter: function (rowData) {
              if (rowData.matchMsg) {
                return rowData.matchMsg.matchName
              }
            }
          },
          {
            label: "赛事类型",
            prop: "matchId",
            // slot: "slot_detail_item_matchId",
            width: 90,
            formatter: function (rowData) {
              if (rowData.matchMsg) {
                if (rowData.matchMsg.matchForm == 1) {
                  return '个人赛'
                } else {
                  return '团体赛'
                }
              }
            }
          },

          // {
          //   label: "手机号",
          //   prop: "phone",
          //   width: 80
          // },
          // {
          //   label: "性别",
          //   prop: "sex",
          //   width: 40,
          //   formatter: function (rowData) {
          //     if (rowData.sex == 1) {
          //       return "男";
          //     } else {
          //       return "女";
          //     }
          //   }
          // },
          // {
          //   label: "年龄",
          //   prop: "age",
          //   width: 40
          // },
          // {
          //   label: "职业",
          //   prop: "career",
          //   width: 40
          // },
          // {
          //   label: "球龄",
          //   prop: "ballAge",
          //   width: 80,
          //   formatter: function (rowData) {
          //     if (rowData.ballAge == 1) {
          //       return "一年以下";
          //     } else if (rowData.ballAge == 2) {
          //       return "一到三年";
          //     } else if (rowData.ballAge == 3) {
          //       return "三到五年";
          //     } else if (rowData.ballAge == 4) {
          //       return "五到十年";
          //     } else {
          //       return "十年以上";
          //     }
          //   }
          // },

          // {
          //   label: "身份证号",
          //   prop: "idCard",
          //   width: 90
          // },
          {
            label: "报名时间",
            prop: "time",
            width: 160,
            formatter: function (rowData) {
              return moment(rowData.time).format('YYYY-MM-DD HH:mm')
            }
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 90,
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
            width: 120,
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
            label: "报名球员",
            prop: "memberId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "赛事",
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
            label: "报名球员",
            prop: "memberId",
            slot: "slot_detail_item_memberId"
          },
          {
            label: "赛事",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          {
            label: "手机号",
            prop: "phone",
            width: 100
          },
          {
            label: "赛事信息",
            prop: "cityVenueId",
            slot: 'slot_detail_item_matchInfo'
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
              return moment(row.time).format('YYYY-MM-DD HH:mm')
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
          // {
          //   label: "报名球员",
          //   prop: "memberId",

          //   type: "select",
          //   ajax: {
          //     url: "/crossList?page=tangball_member",
          //     keyLabel: "name",
          //     keyValue: "P1"
          //   },
          //   rules: [{ required: true, message: "报名球员不能为空" }]
          // },
          {
            label: "报名球员",
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
            rules: [{ required: true, message: "报名球员不能为空" }]
          },
          {
            label: "赛事",
            prop: "matchId",

            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "赛事不能为空" }]
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
          // {
          //   label: "报名订单id",
          //   prop: "orderId",
          //   slot:"slot_form_item_orderId"
          // },

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
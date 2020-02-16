//#region tangball_enroll
import tangball_member_for_select from "./tangball_member_for_select.js"
export default {

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
          populateColumn: "matchDoc",
          idColumn: "matchId",
          idColumn2: "P1"
        },
        {
          page: "tangball_member",
          populateColumn: "memberDoc",
          idColumn: "memberId",
          idColumn2: "P1"
        }],
        //-------列配置数组-------
        // expands:[],
        columns: [
          COLUMNS.enrool_memberId,
          COLUMNS.enrool_matchId,
          COLUMNS.orderId,
          COLUMNS.enrool_time,
          COLUMNS.playingTime,
          COLUMNS.enrool_matchForm,
         
          
          COLUMNS.payStatus,
          COLUMNS.auditStatus
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
          D_ITEMS.memberId_slot,
          D_ITEMS.matchId_slot,
          D_ITEMS.phone,
          D_ITEMS.matchInfo,
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

          Object.assign({}, F_ITEMS.memberId, { label: "报名球员1" }),
          F_ITEMS.matchId_select,
          F_ITEMS.matchInfo,
          F_ITEMS.phone,
          F_ITEMS.sex,
          F_ITEMS.age,
          F_ITEMS.career,
          F_ITEMS.ballAge,
          F_ITEMS.idCard,
          F_ITEMS.time,
          F_ITEMS.playingTime,
          F_ITEMS.payStatus,
          F_ITEMS.auditStatus

        ]

}
//#endregion
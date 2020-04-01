//#region tangball_enroll

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
          COLUMNS.orderMoney,
          COLUMNS.enrool_time,
          COLUMNS.playingTime,
          COLUMNS.enrool_matchForm,
         
          
          COLUMNS.payStatus,
          COLUMNS.auditStatus
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          F_ITEMS.idCard,
          F_ITEMS.memberId_select,
          F_ITEMS.matchId_select,
          F_ITEMS.payStatus,
          F_ITEMS.auditStatus
        ],
        //-------详情字段数组-------
        detailItems: [
          D_ITEMS.orderId,
          D_ITEMS.orderMoney,
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

          F_ITEMS.memberId,
          F_ITEMS.matchId_select_required,
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
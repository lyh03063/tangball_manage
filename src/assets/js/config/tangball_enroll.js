//#region tangball_enroll

let obj =  {

        powerPath: "matchCenter.list_enroll",//权限路径
        listIndex: "list_enroll", //vuex对应的字段
        isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
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
        columns: ['enrool_memberId',"enrool_matchId","orderId","orderMoney","enrool_time","playingTime","enrool_matchForm","payStatus","auditStatus"],
        //-------筛选表单字段数组-------
        searchFormItems: ["idCard",'memberId_select',"matchId_select","payStatus","auditStatus"],
        //-------详情字段数组-------
        detailItems: [
          "orderId","orderMoney",'memberId_slot',"matchId_slot","phone","matchInfo","sex","age","career","ballAge","idCard","time_enrool","playingTime","payStatus","auditStatus"],
        //-------新增、修改表单字段数组-------
        formItems: ["memberId","matchId_select_required","matchInfo","phone","sex","age","career","ballAge","idCard","time","playingTime","payStatus","auditStatus"]

}
util.reformCFListItem(obj)
//#endregion
export default obj
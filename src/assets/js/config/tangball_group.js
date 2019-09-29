
export default {
    listIndex: "list_member", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "会员中心",
    threeTitle: "会员列表",
    flag:true,
    url: {
      list: "/crossList?page=tangball_group", //列表接口
      add: "/crossAdd?page=tangball_group", //新增接口
      modify: "/crossModify?page=tangball_group", //修改接口
      detail: "/crossDetail?page=tangball_group", //查看单条数据详情接口，在修改表单或详情弹窗用到
      delete: "/crossDelete?page=tangball_group" //删除接口
    },
    //-------列配置数组-------
    columns: [
      {
        label: "id",
        prop: "P1",
        width: 80
      },
      {	
        label: "组号",
        prop: "groupNum",
        width: 100
      },
      {
        label: "小组成员",
        prop: "groupMember",
        width: 100
      },
      {	
        label: "matchId",
        prop: "所属赛事",
        width: 100
      },	
      {
        label: "progressIndex",
        prop: "所属赛段",
        width: 100
      },
      {	
        label: "所属轮数",
        prop: "roundNum",
        width: 100
      }
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {	
        label: "matchId",
        prop: "所属赛事",
     
      },	
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "会员编号",
        prop: "P1",
      },
      {	
        label: "组号",
        prop: "groupNum",
      },
      {
        label: "小组成员",
        prop: "groupMember",
      },
      {	
        label: "matchId",
        prop: "所属赛事",
      },	
      {
        label: "progressIndex",
        prop: "所属赛段",
      },
      {	
        label: "所属轮数",
        prop: "roundNum",
      }
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      {	
        label: "组号",
        prop: "groupNum",
        width: 100
      },
     
      {	
        label: "matchId",
        prop: "所属赛事",
        width: 100
      },	
      {
        label: "progressIndex",
        prop: "所属赛段",
        width: 100
      },
      {	
        label: "所属轮数",
        prop: "roundNum",
        width: 100
      },
      {
        label: "小组成员",
        prop: "groupMember",
        width: 100
      },
    ]
  }

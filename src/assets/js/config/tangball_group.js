
export default {
    listIndex: "list_group", //vuex对应的字段
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
        label: "所属赛事",
        prop: "matchId",
        width: 100
      },	
      {
        label: "所属赛段",
        prop: "progressIndex",
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
        label: "所属赛事",
        prop: "matchId",
     
      },	
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "编号",
        prop: "P1",
      },
      {	
        label: "组号",
        prop: "groupNum",
      },
      // {
      //   label: "小组成员",
      //   prop: "groupMember",
      // },
      {	
        label: "所属赛事",
        prop: "matchId",
      },	
      {
        label: "所属赛段",
        prop: "progressIndex",
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
        type:"number"
      },
     
      {
        label: "赛事id",
        prop: "matchId",
        type: "select",
        ajax: {
          url: "/crossList?page=tangball_match",
          keyLabel: "matchName",
          keyValue: "P1"
        }
      },	
      {
        label: "所属赛段",
        prop: "progressIndex",
        type:"number"
      },
      {	
        label: "所属轮数",
        prop: "roundNum",
        type:"number"
      },
      
      {
        label: "小组成员",
        prop: "groupMember",
        type: "collection",
        collectionlistType: "form",
        collectionCfForm: {
          col_span: 12,
          formItems: [
          
            {
              label: "球队",
              prop: "id",
              type: "select",
              ajax: {
                url: "/crossList?page=tangball_team",
                keyLabel: "name",
                keyValue: "P1"
              }
            },
           
          ]
        }
      },
    ]
  }

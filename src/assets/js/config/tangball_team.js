
export default {
  powerPath: "matchCenter.list_team",//权限路径
  listIndex: "list_team", //vuex对应的字段
  focusMenu: true, //进行菜单聚焦
  twoTitle: "赛事",
  threeTitle: "球队",

  objParamAddon: {},//附加参数-----这里一定要加上，否则监听不到
  dynamicDict: [
    { page: "tangball_member", populateColumn: "memberName", idColumn: "createMemberId", idColumn2: "P1" },
    { page: "tangball_match", populateColumn: "matchName", idColumn: "matchId", idColumn2: "P1" }
  ],
  //批量操作按钮的配置
  batchBtns: {
    addon:[
      util.cfList.bBtns.delete,
    ],
    tips:{
      text:"数据来源于小程序或赛事的“报名表”中添加",
      // style:{"color":"#3a0"}
    }
  },
  url: {
    list: "/crossList?page=tangball_team", //列表接口
    add: "/crossAdd?page=tangball_team", //新增接口
    modify: "/crossModify?page=tangball_team", //修改接口
    detail: "/crossDetail?page=tangball_team", //详情接口
    delete: "/crossDelete?page=tangball_team" //删除接口
  },
  //-------列配置数组-------
  columns: [
    {
      label: "编号",
      prop: "P1",
      width: 70
    },
    {
      label: "队名",
      prop: "name",
      width: 100
    },
    {
      label: "创建人",
      prop: "createMemberId",
      width: 120,
      formatter: (data) => {
        if (data.memberName) {
          return data.memberName.name
        }
      }
    },
    {
      label: "赛事",
      prop: "matchId",
      width: 300,
      formatter: (data) => {
        if (data.matchName) {
          return data.matchName.matchName
        }
      }
    },
    {
      label: "订单id",
      prop: "orderId",
      width: 200
    }
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    {
      label: "编号",
      prop: "P1",
      type: "input"
    },

    {
      label: "队名",
      prop: "name",
    }
    ,
    {
      label: "创建人",
      prop: "createMemberId",
      type: 'select',
      ajax: {
        url: "/crossList?page=tangball_member",
        keyLabel: "name",
        keyValue: "P1"
      },
    },
    {
      label: "赛事",
      prop: "matchId",
      type: 'select',
      ajax: {
        url: "/crossList?page=tangball_match",
        keyLabel: "matchName",
        keyValue: "P1"
      },
    },
  ],
  //-------详情字段数组-------
  detailItems: [
    {
      label: "编号",
      prop: "P1",
    },
    {
      label: "队名",
      prop: "name",
    },
    {
      label: "创建人",
      prop: "createMemberId",
      slot: 'slot_detail_item_memberName'
    },
    {
      label: "赛事",
      prop: "matchId",
      slot: 'slot_detail_item_matchName'
    },
    {
      label: "订单id",
      prop: "orderId",
    },
    {
      label: "成员列表",
      prop: "member",
      slot: 'slot_detail_item_memberList'
    }
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "队名",
      prop: "name",
    },
    {
      label: "创建人",
      prop: "createMemberId",
      type: 'select',
      ajax: {
        url: "/crossList?page=tangball_member",
        keyLabel: "name",
        keyValue: "P1"
      },
    },
    {
      label: "赛事",
      prop: "matchId",
      type: 'select',
      ajax: {
        url: "/crossList?page=tangball_match",
        keyLabel: "matchName",
        keyValue: "P1"
      },
    },
    {
      label: "订单id",
      prop: "orderId",
    },
    {
      label: "成员列表",
      prop: "member",
      type: "collection",
      collectionlistType: "form",
      collectionCfForm: {
        col_span: 12,
        formItems: [
          {
            label: "姓名",
            prop: "name",

          },
          {
            label: "性别",
            prop: "sex",
            type: 'radio',
            options: [{ value: 1, label: '男' },
            { value: 2, label: '女' }]
          },
          {
            label: "手机号码",
            prop: "phone"
          }
        ]
      }
    },
  ]
}

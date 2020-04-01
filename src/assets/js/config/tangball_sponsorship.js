
export default  {
  powerPath: "sponsorCenter.list_sponsorship",//权限路径
  isRefreshAfterCUD:true,//是否在增删改操作后刷新列表
    listIndex: "list_sponsorship", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "赛事赞助",
    threeTitle: "赛事赞助",
    flag: true,
    url: {
      list: "/crossList?page=tangball_sponsorship", //列表接口
      add: "/crossAdd?page=tangball_sponsorship", //新增接口
      modify:
        "/crossModify?page=tangball_sponsorship", //修改接口
      delete:
        "/crossDelete?page=tangball_sponsorship" //删除接口
    },
    dynamicDict:[
      {
      page: "tangball_sponsor",
      populateColumn: "sponsor",
      idColumn: "sponsorId",
      idColumn2: "P1"
    },
      {
      page: "tangball_match",
      populateColumn: "match",
      idColumn: "matchId",
      idColumn2: "P1"
    },
  ],
    //-------列配置数组-------
    columns: [
      {
        label: "id",
        prop: "P1",
        width: 60
      },
      {
        label: "赞助商",
        prop: "sponsorId",
        width: 130,
        formatter: function(row) {
          if (row.sponsor) {
            return row.sponsor.name?row.sponsor.name:'无'
          }
        }
      },
      {
        label: "赛事",
        prop: "matchId",
        width: 300,
        formatter: function(row) {
          if (row.match) {
            return row.match.matchName?row.match.matchName:'无'
          }
        }
  
      },
      //  {
      //   label: "赛事名称",
      //   prop: "matchName",
      //   width: 80
      // },
      {
        label: "赞助金额",
        prop: "amount",
        width: 100
      },
      {
        label: "赞助时间",
        prop: "time",
        width: 160,
         formatter: function(row) {
          return moment(row.time).format("YYYY-MM-DD HH:DD");
        }
      },
      {
        label: "地点",
        prop: "place",
        width: 110
      }
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
    
      {
        label: "赞助商",
        prop: "sponsorId",
        type: "select",
        ajax: {
          url: "/crossList?page=tangball_sponsor",
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
        label: "赞助时间",
        prop: "time",
         type: "time_period"
      },
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "id",
        prop: "P1"
      },
      {
        label: "赞助商id",
        prop: "sponsorId",
        slot:"slot_detail_item_sponsorId"
      },
      {
        label: "赛事id",
        prop: "matchId",
         slot:"slot_detail_item_matchId"
      },
      {
        label: "赞助金额",
        prop: "amount"
      },
      {
        label: "赞助时间",
        prop: "time",
        formatter: function(row) {
          return moment(row.time).format("YYYY-MM-DD HH:DD");
        }
      },
      {
        label: "地点",
        prop: "place"
      }
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
     
      {
        label: "赞助商",
        prop: "sponsorId",
        type: "select",
        ajax: {
          url: "/crossList?page=tangball_sponsor",
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
      //   {
      //   label: "赛事名称",
      //   prop: "matchName",
      //   width: 80
      // },
      {
        label: "赞助金额",
        prop: "amount",
        type: "input",
       
      },
      {
        label: "赞助时间",
        prop: "time",
        type: "date",
       
      },
      {
        label: "地点",
        prop: "place",
         slot: "slot_place"
      }
    ]
  }

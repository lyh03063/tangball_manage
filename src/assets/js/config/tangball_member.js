
export default {
  // powerPath: "systemManage.list_member",//权限路径
    listIndex: "list_member", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "会员中心",
    threeTitle: "球员列表",
    flag:true,
    dynamicDict: [
      {
        page: "tangball_franchisee",
        populateColumn: "franchisee",
        idColumn: "franchiseeId",
        idColumn2: "P1"
      },
      {
        page: "tangball_venue",
        populateColumn: "venue",
        idColumn: "venueId",
        idColumn2: "P1"
      },
    ],
    url: {
      list: "/crossList?page=tangball_member", //列表接口
      add: "/crossAdd?page=tangball_member", //新增接口
      modify: "/crossModify?page=tangball_member", //修改接口
      detail: "/crossDetail?page=tangball_member", //详情接口
      delete: "/crossDelete?page=tangball_member" //删除接口
    },
    //-------列配置数组-------
    columns: [
      {
        label: "会员号",
        prop: "P1",
        width: 80
      },
      {
        label: "球员姓名",
        prop: "name",
        width: 120
      },
      {
        label: "微信openid",
        prop: "openid",
        width: 130
      },
       {
        label: "性别",
        prop: "sex",
        width: 65,
        formatter:function(data) {
          if (data.sex==2) {
            return '女'
          }else{
            return '男'
          }
        }
      },
      {
        label: "手机号",
        prop: "phone",
        width: 130
      },
      {
        label: "所属加盟商",
        prop: "franchiseeId",
        width: 130,
        formatter:function (data) {
          if (data.franchisee) {
            return data.franchisee.name?data.franchisee.name:'无'
          }
        }
      },
      {
        label: "所属球场",
        prop: "venueId",
        width: 180,
        formatter:function (data) {
          if (data.venue) {
            return data.venue.name?data.venue.name:"无"
          }
        }
      },
      {
        label: "参赛次数",
        prop: "entries",
        width: 100,
        // slot:"slot_list_column_entries"
        statistics:{listIndex:'list_enroll', targetIdKey:'memberId'}
      },
       {
        label: "成绩数",
        prop: "countAchievement",
        width: 80,
        statistics:{listIndex:'list_achievement', targetIdKey:'memberId'}
      },
      // {
      //   label: "唐球积分",
      //   prop: "integral",
      //   width: 65
      // },       
      // {
      //   label: "备注",
      //   prop: "remark",
      //   width: 65
      // },
      // {
      //   label: "职业",
      //   prop: "career",
      //   width: 70
      // },
      {
        label: "球龄",
        prop: "ballAge",
        width: 100,
        formatter: function(rowData) {
          if (rowData.ballAge == 1) {
            return "一年以下";
          } else if (rowData.ballAge == 2) {
            return "一到三年";
          } else if (rowData.ballAge == 3) {
            return "三到五年";
          } else if (rowData.ballAge == 4) {
            return "五到十年";
          }else if (rowData.ballAge == 5) {
            return "十年以上";
          }else{
            return "暂无";
          }
        }
      }
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "球员姓名",
        prop: "name",
        type: "input_find_vague"
      },
      {
        label: "手机号",
        prop: "phone",
       
      },
      {
        label: "微信openid",
        prop: "openid",
       
      },
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "会员编号",
        prop: "P1",
      },
      {
        label: "球员姓名",
        prop: "name",
      },
      {
        label: "性别",
        prop: "sex",
        width: 65,
        formatter:function(data) {
          if (data.sex==2) {
            return '女'
          }else{
            return '男'
          }
        }
      },
      {
        label: "微信号",
        prop: "openid",
      },
      {
        label: "手机号",
        prop: "phone",
      },
      {
        label: "所属加盟商",
        prop: "franchiseeId",
        slot:'slot_detail_item_franchiseeId'
      },
      {
        label: "所属球场",
        prop: "venueId",
        slot:'slot_detail_item_venueId'
      },
      {
        label: "身份证号",
        prop: "idCard",
      },
      {
        label: "参赛次数",
        prop: "entries",
      },
      // {
      //   label: "唐球积分",
      //   prop: "integral",
      //   width: 65
      // },     
      
      {
        label: "职业",
        prop: "career",
        width: 50
      },
      {
        label: "球龄",
        prop: "ballAge",
        width: 65,
        formatter: function(rowData) {
          if (rowData.ballAge == 1) {
            return "一年以下";
          } else if (rowData.ballAge == 2) {
            return "一到三年";
          } else if (rowData.ballAge == 3) {
            return "三到五年";
          } else if (rowData.ballAge == 4) {
            return "五到十年";
          } else if (rowData.ballAge == 5) {
            return "十年以上";
          }else{
            return "暂无";
          }
        }
      },
      {
        label: "备注",
        prop: "remark",
        width: 150
      }  
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
     {
        label: "球员姓名",
        prop: "name",
        width: 100
      },
      // {
      //   label: "微信openid",
      //   prop: "openid",
      //   width: 100
      // },
      {
        label: "手机号",
        prop: "phone",
        width: 100
      },
     
      {
        label: "所属加盟商",
        prop: "franchiseeId",
        type: "select",
        ajax:{
          url: "/crossList?page=tangball_franchisee",
          keyLabel: "name",
          keyValue: "P1"
        },
      },
      {
        label: "所属球场",
        prop: "venueId",
        type: "select",
        ajax:{
          url: "/crossList?page=tangball_venue",
          keyLabel: "name",
          keyValue: "P1"
        },
      },
      {
        label: "性别",
        prop: "sex",
        type: "select",
        default:1,
        options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
      },
      {
        label: "身份证号",
        prop: "idCard",
        width: 100
      },
      {
        label: "备注",
        prop: "remark",
        width: 150
      } ,
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
    ]
  }

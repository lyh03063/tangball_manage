
export default {
    listIndex: "list_match", //vuex对应的字段
    focusMenu: true, //是否进行菜单聚焦
    twoTitle: "赛事",
    threeTitle: "赛事数据",
    flag: true,
    cfForm: {
      col_span: 12 //控制显示一行多列
    },
    url: {
      list: "/crossList?page=tangball_match", //列表接口
      add: "/crossAdd?page=tangball_match", //新增接口
      modify: "/crossModify?page=tangball_match", //修改接口
      detail: "/crossDetail?page=tangball_match", //查看单条数据详情接口，在修改表单或详情弹窗用到
  
      delete: "/crossDelete?page=tangball_match" //删除接口
    },
    //-------列配置数组-------
    columns: [
      {
        label: "id",
        prop: "P1",
        width: 50
      },
      {
        label: "赛事名称",
        prop: "matchName",
        width: 240
      },
      {
        label: "赛事时间",
        prop: "matchTime",
        width: 100,
        formatter: function(rowData) {
          return moment(rowData.matchTime).format("YYYY-MM-DD HH:mm");
        }
      },
      // {
      //   label: "报名数",
      //   prop: "registeredPersons",
      //   width: 75,
      //   statistics: { listIndex: "list_enroll", targetIdKey: "matchId" }
      // },
      {
        label: "报名费",
        prop: "registrationFee",
        width: 85
      },
      {
        label: "发布",
        prop: "publicationStatus",
        width: 75,
        formatter: function(rowData) {
          return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
        }
      },
      {
        label: "状态",
        prop: "matchStatus",
        requireProp:["enrollTime",'enrollTimeEnd','matchTime','matchTimeEnd'],
        width: 100,
        formatter: function(rowData) {
          let nowDate=new Date().getTime();
        let enrollTimeDate = new Date(rowData.enrollTime).getTime();
        let enrollTimeEnd = new Date(rowData.enrollTimeEnd).getTime();
        let matchTime = new Date(rowData.matchTime).getTime();
        let matchTimeEnd = new Date(rowData.matchTimeEnd).getTime();
        if (nowDate>matchTimeEnd) {
          return '赛事已结束'
        }else if(nowDate>matchTime){
          return '赛事已开始'
        }else if (nowDate>enrollTimeEnd) {
          return '报名时间已结束'
        }else if (nowDate>enrollTimeDate) {
          return '火热报名中'
        }else{
          return '报名时间未到'
        }
        }
      },
      {
        label: "类型",
        prop: "matchForm",
        width: 75,
        formatter: function(rowData) {
          return rowData.matchForm == 2 ? "团体赛" : "个人赛"; //三元表达式
        }
      },
      {
        label: "报名表",
        requireProp:["registeredPersons"],
        // prop: "achievement",
        width:105,
        slot: "slot_column_enroll"
      },
      {
        label: "成绩单",
        // prop: "achievement",
        width: 85,
        slot: "slot_column_achievement"
      }
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "赛事类型",
        prop: "matchType",
        type: "select",
        options: [
          { label: "普通赛", value: 1 },
          { label: "全国赛", value: 2 }
        ]
      },
      {
        label: "赛事状态",
        prop: "matchStatus",
        type: "select",
        options: [
          { label: "未开始", value: 1 },
          { label: "进行中", value: 2 },
          { label: "已结束", value: 3 }
        ]
      },
      {
        label: "发布状态",
        prop: "publicationStatus",
        type: "select",
        options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
      },
      {
        label: "赛事时间",
        prop: "matchTime",
        type: "time_period"
      }
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "赛事名称",
        prop: "matchName"
      },
      {
        label: "报名状态",
        prop: "matchErollStatus",
        formatter: function(rowData) {
          let obj = util.getTimeStatus({
            start: rowData.enrollTime,
            end: rowData.enrollTimeEnd
          });
          let htmlResult = `报名时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：报名${obj.msg}`;
          return htmlResult;
        }
      },
      {
        label: "赛事状态",
        prop: "matchStatus",
        formatter: function(rowData) {
          let obj = util.getTimeStatus({
            start: rowData.matchTime,
            end: rowData.matchTimeEnd
          });
          let htmlResult = `比赛时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：比赛${obj.msg}`;
          return htmlResult;
        }
      },
      {
        label: "发布状态",
        prop: "publicationStatus",
        formatter: function(rowData) {
          return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
        }
      },
      {
        label: "报名开始时间",
        prop: "enrollTime"
      },
      {
        label: "报名结束时间",
        prop: "enrollTimeEnd"
      },
  
      {
        label: "赛事类型",
        prop: "matchType",
        formatter: function(rowData) {
          return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
        }
      },
      {
        label: "赛程设置",
        prop: "progress",
        slot:'slot_detail_item_progress'
      },
      {
        
        label: "决赛场馆",
        prop: "venue",
        type: "select",
        slot: "slot_detail_item_cityVenueList"
      },
  
      {
        label: "赛事图片",
        prop: "album",
        slot: "slot_detail_item_album"
      },
      {
        label: "报名数",
        prop: "registeredPersons"
      },
      {
        label: "报名费用",
        prop: "registrationFee"
      },
      {
        label: "赛事介绍",
        prop: "matchIntroduce"
      },
      {
        label: "报名要求",
        prop: "enrollRequirements"
      },
      {
        label: "赛事规程",
        prop: "matchManual",
        type:'html'
      },
      {
        label: "赛事结果",
        prop: "matchResult",
        type:'html'
      },
      {
        label: "路线地图",
        prop: "routeMap"
      }
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
      {
        label: "赛事名称",
        prop: "matchName",
        rules: [{ required: true, message: "赛事名称不能为空" }],
      },
      {
        label: "赛事规则",
        prop: "ruleId",
        type: "select",
        ajax: {
          url: "/crossList?page=tangball_rule",
          keyLabel: "name",
          keyValue: "P1"
        },
      },
     
      {
        label: "赛事类型",
        prop: "matchForm",
        type: "select",
        options: [
          { label: "个人赛", value: 1 },
          { label: "团体赛", value: 2 }
        ],
      },
      {
        label: "每队人数下限",
        prop: "teamMemberMin",
        term: { matchForm: 2 },
        rules: [{ required: true, message: "不能为空" }]
      },
      {
        label: "发布状态",
        prop: "publicationStatus",
        type: "select",
        options: [{ label: "是", value: 1 }, { label: "否", value: 2 }],
      },
      {
        label: "每队人数上限",
        prop: "teamMemberMax",
        term: { matchForm: 2 },
        rules: [{ required: true, message: "不能为空" }]
      },
       
      
  
      
      {
        label: "报名开始时间",
        prop: "enrollTime",
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
      },
      {
        label: "赛事开始时间",
        prop: "matchTime",
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
      },
      {
        label: "报名结束时间",
        prop: "enrollTimeEnd",
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
      },
      
      {
        label: "赛事结束时间",
        prop: "matchTimeEnd",
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
      },
      
      {
        label: "报名费用",
        prop: "registrationFee",
      },
  
      
      {
        label: "路线地图",
        prop: "routeMap",
      },
      {
        label: "赛事介绍",
        prop: "matchIntroduce",
        type: "textarea",
        col_span: 24
      },
      {
        label: "报名要求",
        prop: "enrollRequirements",
        type: "textarea",
        col_span: 24
      },
      // {
      //   label: "赛事类型",
      //   prop: "matchType",
      //   type: "select",
      //   options: [
      //     { label: "普通赛", value: 1 },
      //     { label: "全国赛", value: 2 }
      //   ]
      // },
      // {
      //   label: "全国赛城市场馆",
      //   prop: "cityVenueList",
      //   type: "select",
      //   slot: "slot_form_item_cityVenueList",
      //   term: { matchType: 2 }
      // },
      // {
      //   label: "赛事阶段",
      //   prop: "matchProgress",
      //   type: "select",
      //   slot: "slot_modify_item_matchProgress",
      // },
      {
        label: "相册",
        prop: "album",
        type: "upload",
        col_span: 24 //控制显示一行多列
      },
      {
        label: "决赛场馆",
        prop: "venue",
        type: "select",
        slot: "slot_form_item_cityVenueList",
        col_span: 24
      },
       {
        label: "赛程设置",
        prop: "progress",
        slot:'slot_form_item_progress',
        col_span: 24
      },
     
  
      {
        label: "赛事规程",
        prop: "matchManual",
        type: "editorTM",
        col_span: 24 //控制显示一行多列
      },
      {
        label: "赛事结果",
        prop: "matchResult",
        type: "editorTM",
        col_span: 24 //控制显示一行多列
      },
  
    ]
  }

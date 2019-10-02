


import tangball_enroll_default from "@/assets/js/config/tangball_enroll_default.js";
import lodash from 'lodash'//导入lodash方法库
let objConfig= util.deepCopy(tangball_enroll_default)



Object.assign(objConfig,{
  isShowSearchForm: false, //隐藏查询表单
  listIndex: "list_enroll_for_match", //vuex对应的字段
  focusMenu: false,
  isShowBreadcrumb: false, //隐藏面包屑导航
  isShowOperateColumn: false, //隐藏操作列
  isShowToolBar: false, //隐藏工具栏


  dynamicDict: [//动态数据字典，获取队伍信息
    {
      page: "tangball_team",
      populateColumn: "teamDoc",
      idColumn: "orderId",
      idColumn2: "orderId"
    }
  ], //隐藏工具栏
 
  sortJsonDefault: {
    "score.teamHoleScoreTotal": -1
  },
  // //新增表单初始赋值
  // formDataAddInit: {
  //   matchId: this.matchId
  // },

  //-------列配置数组-------
  columns: [
    {
      label: "球队名称",
      prop: "team",
      requireProp: ["orderId"], //依赖订单号
      slot: "slot_detail_item_teamName",
      width: 150
    },
    {
      label: "队长",
      prop: "memberId",
      slot: "slot_detail_item_memberId",
      width: 130
    },
    {
      label: "总分",
      prop: "score",
      slot:"slot_column_scoreTotal",
     

      "min-width": "100",
    },

  ],

  //-------新增、修改表单字段数组-------
  formItems: [
    {
      label: "报名会员id",
      prop: "memberId",

      type: "select",
      ajax: {
        url: "/crossList?page=tangball_member",
        keyLabel: "name",
        keyValue: "P1"
      },
      rules: [{ required: true, message: "报名会员id" }]
    },
    {
      label: "赛事id",
      prop: "matchId",

      type: "select",
      ajax: {
        url: "/crossList?page=tangball_match",
        keyLabel: "matchName",
        keyValue: "P1"
      },
      rules: [{ required: true, message: "赛事id" }],
      hide: true
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
  ]
});//合并对象


console.log("objConfig############:", objConfig);
export default  objConfig

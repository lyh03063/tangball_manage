export default {
    formItems : [{
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
      // {
      //   label: "赛事id",
      //   prop: "matchId",

      //   type: "select",
      //   ajax: {
      //     url: "/crossList?page=tangball_match",
      //     keyLabel: "matchName",
      //     keyValue: "P1"
      //   },
      //   rules: [{ required: true, message: "赛事id" }],
      //   hide: true
      // },

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
        label: "赛事信息",
        prop: "cityVenueId",
        slot: "slot_form_item_matchInfo"
      },
      // {
      //   label: "报名订单id",
      //   prop: "orderId",
      //   slot:"slot_form_item_orderId"
      // },

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
      }]
  }
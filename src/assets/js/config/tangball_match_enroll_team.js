export default {
    detailItems:[
        {
          label: "报名会员",
          prop: "memberId",
          slot: "slot_detail_item_memberId",
          
        },
        
        {
          label: "队伍信息",
          prop: "orderId",
          slot:'slot_detail_item_groups'
        },
        {
          label: "报名时间",
          prop: "time",
          formatter:function (rowData){
            if (rowData.time) {
              var dt=new Date(rowData.time);
            return dt.toLocaleDateString()+dt.toLocaleTimeString()
            }else{
              return '暂无报名时间'
            }
            
          }
        },
        {
          label: "赛事信息",
          prop: "cityVenueId",
          slot:'slot_detail_item_matchInfo'
        },
        {
          label: "支付状态",
          prop: "payStatus",
          width: 100,
          formatter: function (rowData) {
            if (rowData.payStatus == 2) {
              return "已支付";
            } else {
              return "未支付";
            }
          }
        },
        {
          label: "审核状态",
          prop: "auditStatus",
          width: 100,
          formatter: function (rowData) {
            if (rowData.auditStatus == 1) {
              return "未审核";
            } else if (rowData.auditStatus == 2) {
              return "审核不通过";
            } else {
              return "审核通过";
            }
          }
        }
      ],
      columns:[
        {
          label: "球队名称",
          prop: "team",
          slot: "slot_detail_item_teamName",
          width: 250
        },
        {
          label: "队长",
          prop: "orderId",
          // slot: "slot_detail_item_memberId",
          width: 130,
          formatter: function(rowData) {
            if (rowData.teamDoc) {
              return rowData.teamDoc.member[0].name||"无"
            }
          }
        },

        // {
        //   label: "订单号",
        //   prop: "orderId",
        //   width: 145
        // },
        {
          label: "报名时间",
          prop: "time",
          width: 180,formatter:function (rowData){
            if (rowData.time) {
              var dt=new Date(rowData.time);
            return dt.toLocaleDateString()+dt.toLocaleTimeString()
            }else{
              return '暂无报名时间'
            }
            
          }
        },
        {
          label: "支付状态",
          prop: "payStatus",
          width: 100,
          formatter: function(rowData) {
            if (rowData.payStatus == 2) {
              return "已支付";
            } else {
              return "未支付";
            }
          }
        },
        {
          label: "审核状态",
          prop: "auditStatus",
          "min-width": "100",
          formatter: function(rowData) {
            if (rowData.auditStatus == 1) {
              return "未审核";
            } else if (rowData.auditStatus == 2) {
              return "审核不通过";
            } else {
              return "审核通过";
            }
          }
        }
      ],
      formItems:[
        {
          label: "报名会员",
          prop: "memberId",

          type: "select",
          ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
          },
          rules: [{ required: true, message: "报名会员" }]
        },
        {
        label: "队伍信息",
        prop: "groups",
        slot:'slot_form_item_groups'
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
        }
        ]
}
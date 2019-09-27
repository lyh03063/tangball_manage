
export default {
  data() {
    return {
      cfList: {
        focusMenu: false,
        isShowSearchForm: false, //隐藏查询表单
        isShowBreadcrumb: false, //隐藏面包屑导航
        isShowPageLink: false, //隐藏分页
        isShowOperateColumn: false, //隐藏操作列
        isShowToolBar: false, //隐藏工具栏
        formDataAddInit: {},//表单默认新增数据注册
        //默认排序参数
        sortJsonDefault: {
          matchScore: 1//按比分降序
        },
        //-------列配置数组-------
        columns: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId",
            width: 120
          },
          {
            label: "所属球队",
            prop: "teamId",
            width: 90
          },
          {
            label: "比赛开始时间",
            prop: "timeStart",
            width: 175,
            formatter: function (row) {
              return moment(row.timeStart).format("YYYY-MM-DD HH:mm");
            }
          },
          {
            label: "结束时间",
            prop: "timeEnd",
            width: 175,
            formatter: function (row) {
              return moment(row.timeEnd).format("YYYY-MM-DD HH:mm");
            }
          },
          {
            label: "轮数",
            prop: "roundNum",
            width: 75
          },
          {
            label: "组数",
            prop: "groupNum",
            width: 75
          },
          {
            label: "打位",
            prop: "tee",
            width: 75
          },


          {
            label: "杆数",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            "min-width": 70
          },
         
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "所属球队",
            prop: "teamId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_team",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "分组数",
            prop: "groupNum",
            type: "input"
          },


          {
            label: "开始时间",
            prop: "timeStart",
            type: "dateTime"
          },
          {
            label: "结束",
            prop: "timeEnd",
            type: "dateTime"
          },


          {
            label: "打位",
            prop: "tee",
            type: "input"
          },
          // {
          //   label: "总杆数",
          //   prop: "matchScore",
          //   type: "input"
          // },
          {
            label: "备注",
            prop: "remark",
            type: "input"
          },

          {
            label: "成绩记分",
            prop: "scoreList",
            type: "input",
            slot: 'slot_form_item_scoreList',
            col_span: 24
          },
          // {
          //   label: "赛段",
          //   prop: "progressIndex",
          //   type: "input"
          // },
          // {
          //   label: "轮数",
          //   prop: "roundNum",
          //   type: "input"
          // },
        ]

      }
    };
  }
}

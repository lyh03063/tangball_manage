
export default {
  data() {
    return {
      cfList: {
        powerPath: "matchCenter.list_achievement",//权限路径
        listIndex: "list_achievement", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "比赛成绩",
        focusMenu: true,//进行菜单聚焦
        flag: true,
        url: {
          list: "/crossList?page=tangball_achievement", //列表接口
          add: "/crossAdd?page=tangball_achievement", //新增接口
          modify: "/crossModify?page=tangball_achievement", //修改接口
          detail: "/crossDetail?page=tangball_achievement", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_achievement" //删除接口
        },
        dynamicDict: [//动态数据字典-会员
          {
            page: "tangball_member",
            populateColumn: "memberDoc",
            idColumn: "participantsId",
            idColumn2: "P1",
          },
          {
            page: "tangball_match",
            populateColumn: "matchDoc",
            idColumn: "matchId",
            idColumn2: "P1",
          }
        ],
        //批量操作按钮的配置
        bactchBtns: {
          add: false, //配置基础按钮隐藏（默认显示）,
          tips: {
            text: "数据来源于小程序或赛事的“对阵分组/成绩”中添加",
          }
        },
        //-------列配置数组-------
        columns: [
          // {
          //   label: "参赛人Id",
          //   prop: "participantsId",
          //   slot: "slot_detail_item_participantsId",
          //   width: 120
          // },
          {
            label: "参赛人",
            prop: "participantsId",
            width: 120,
            formatter: function (rowData) {
              return lodash.get(rowData, "memberDoc.name", "") + `(${rowData.participantsId})`
            }
          },
          {
            label: "所属球队",
            prop: "teamId",
          },
          {
            label: "赛事ID",
            prop: "matchId",
            // slot: "slot_detail_item_matchId",
            width: 160,
            formatter: function (rowData) {
              return lodash.get(rowData, "matchDoc.matchName", "") + `(${rowData.matchId})`
            }
          },
          {
            label: "赛段",
            prop: "progressIndex",
            width: 75
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
            width: 70
          },
          {
            label: "总杆数",
            prop: "matchScore",
            width: 100,

          },
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "参赛人Id",
            prop: "participantsId"
          },

          {
            label: "赛事ID",
            prop: "matchId"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId"
          },
          {
            label: "所属球队",
            prop: "teamId",
          },
          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },
          // {
          //   label: "赛事阶段",
          //   prop: "matchProgress",
          //   slot: "slot_detail_item_matchProgress"
          // },
          // ,
          {
            label: "赛段",
            prop: "progressIndex",
          },
          {
            label: "轮数",
            prop: "roundNum",
          },
          {
            label: "组数",
            prop: "groupNum",
          },
          {
            label: "打位",
            prop: "tee",
          },
          {
            label: "杆数",
            prop: "matchScore"
          },
          {
            label: "名次",
            prop: "ranking"
          },
          {
            label: "成绩",
            prop: "scoreList",
            slot: 'slot_detail_item_scoreList'
          }
        ],
        cfForm: {
          col_span: 12, //控制显示一行多列
          watch: {
            scoreList: {
              handler() {
                if (this.value.scoreList) {
                  this.value.matchScore = 0
                  this.value.scoreList.forEach(item => {
                    this.value.matchScore += Number(item.score);
                  });
                }

              },
              immediate: true,
              deep: true
            }
          },
        },
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
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            }
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
            label: "赛段",
            prop: "progressIndex",
            type: "input"
          },
          {
            label: "轮数",
            prop: "roundNum",
            type: "input"
          },
          {
            label: "组数",
            prop: "groupNum",
            type: "input"
          },
          {
            label: "打位",
            prop: "tee",
            type: "input"
          },
          {
            label: "总杆数",
            prop: "matchScore",
            type: "input"
          },
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
        ]
      }
    };
  }
}

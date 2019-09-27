
export default {
    data() {
      return {
        cfList: {
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
          //-------列配置数组-------
          columns: [
            {
              label: "参赛人Id",
              prop: "participantsId",
              slot: "slot_detail_item_participantsId",
              width: 120
            },
  
            {
              label: "赛事ID",
              prop: "matchId",
              slot: "slot_detail_item_matchId",
              width: 160
            },
            {
                label: "阶段",
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
              label: "成绩记分",
              prop: "scoreList",


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
                label: "阶段",
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
            }
          ],
          cfForm: {
            col_span: 12 //控制显示一行多列
          },
          //-------新增、修改表单字段数组-------
          formItems: [
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
            // {
            //   label: "赛事报名信息",
            //   prop: "memberId",
            //   slot: "slot_form_item_matchInfo"
            // },
            // {
            //   label: "赛事阶段",
            //   prop: "matchProgress",
            //   type: "select",
            //   slot: "slot_modify_item_matchProgress"
            // },
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
                label: "阶段",
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
            // {
            //     label: "每洞成绩列表",
            //     prop: "scoreList",
            //     type: "collection",
            //     col_span: 24,
            //     collectionlistType: "form",
            //     collectionCfForm: {
            //       col_span: 12,
            //       formItems: [
            //         {
            //           label: "洞号",
            //           prop: "holeNum",
          
            //         },
                   
            //         {
            //           label: "本洞杆数",
            //           prop: "score"
            //         }
            //       ]
            //     }
            //   },
              {
                label: "成绩记分",
                prop: "scoreList",
                type: "input",
                slot:'slot_form_item_scoreList',
                col_span: 24
              },
          ]
        }
      };
    }
  }

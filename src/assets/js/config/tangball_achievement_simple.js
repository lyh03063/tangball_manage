
export default {
    data() {
      return {
        cfList: {
          focusMenu:false,
          isShowSearchForm: false, //隐藏查询表单
          isShowBreadcrumb: false, //隐藏面包屑导航
          isShowPageLink: false, //隐藏分页
          isShowOperateColumn: false, //隐藏操作列
          isShowToolBar: false, //隐藏工具栏
          //默认排序参数
          sortJsonDefault: {
            matchScore: 1//按比分降序
          },
          //-------列配置数组-------
          columns: [
            {
              label: "参赛人---",
              prop: "participantsId",
              slot: "slot_detail_item_participantsId",
              width: 150
            },
  
  
            {
              label: "杆数",
              prop: "matchScore",
              width: 90
            },
            {
              label: "名次",
              prop: "ranking",
              // type:"index",
              "min-width": "150"
            }
          ],
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
            //先把下面这种注释
            // {
            //   label: "参赛人",
            //   prop: "participantsId",
            //   type: "select",
            //   ajax: {
            //     url: "/crossListRelation",
            //     keyLabel: "name",
            //     keyValue: "P1",
            //     param: {
            //       needRelation: "1",
            //       columnItem: "memberId",
            //       columnTarget: "P1",
            //       sheetRelation: {
            //         page: "tangball_enroll",
            //         findJson: {//这两个参数在实际使用时需要改造
            //           matchId: 86,
            //           // cityVenueId: null
            //         }
            //       },
            //       sheetTarget: {
            //         page: "tangball_member",
            //         pageSize: "2000",
            //         findJson: {}
            //       }
            //     }
            //   }
            // },
  
            {
              label: "赛事ID",
              prop: "matchId",
              type: "select",
              ajax: {
                url: "/crossList?page=tangball_match",
                keyLabel: "matchName",
                keyValue: "P1"
              },
              hide: true
            },
            // {
            //   label: "赛事阶段",
            //   prop: "matchProgress",
            //   type: "select",
            //   slot: "slot_modify_item_matchProgress",
            //   hide: true
            // },
            // {
            //   label: "杆数",
            //   prop: "matchScore",
            //   type: "input"
            // },
            {
              label: "比赛时间段（待处理）",
              prop: "matchScore",
              type: "input"
            }
          ]
  
        }
      };
    }
  }

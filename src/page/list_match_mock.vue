<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";
import Mock from "mockjs";
// 报名（订单）接口
Mock.mock("/list_match", function() {
  let list_match = {
    code: 0,
    message: "操作成功",
    page: {
      pageIndex: 1,
      pageSize: 5,
      allCount: 1,
      pageCount: 1
    },
    list: [
      {
        P1: 1,
        matchName: "比杆赛",
        matchTime: "2019-6.26",
        venue: "衡南县云集轩与公园南路交汇鸿鹏豪园二楼",
        registrationPersons: 100,
        registrationFee: 100,
        matchStatus: 1,
        publicationStatus: 1,
        matchType: "个人赛",
        matchIntroduce:
          "比杆赛为比赛者在打完规定之回合数时，一般职业比赛均为 4 天 4 回合 72 洞(但也有例外)，其总杆数最少者，即为冠军。一般非职业球友，如在所参加之球队月例赛打一天 18 洞，其杆数即为该月份之总杆成绩，成绩最佳者为总杆冠军。",
        matchManual: "aaa",
        routeMap: "aaa"
      },
      {
        P1: 2,
        matchName: "比洞赛",
        matchTime: "2019-6.27",
        venue: "衡南县云集轩与公园南路交汇鸿鹏豪园二楼",
        registrationPersons: 100,
        registrationFee: 100,
        matchStatus: 1,
        publicationStatus: 1,
        matchType: "个人赛",
        matchIntroduce:
          "比洞赛为每一个洞为一单元来决定输或赢之比赛，每一洞杆数最少之一方，即为该洞之获胜者，在比赛规定之洞数，一般均为 18 洞，但也有 2 回会 36 洞之比洞赛，如果一方领先之洞数超过未打之洞数，胜负已分故可终止比赛，领先之一方即为优胜者。",
        matchManual: "aaa",
        routeMap: "aaa"
      }
    ]
  };

  return list_match;
});
export default {
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "listCategory", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "赛事",
        flag: true,
        url: {
          list: "/list_match" //列表接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "数据id",
            prop: "P1",
            width: 110
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 100
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 100
          },
          {
            label: "比赛场馆",
            prop: "venue",
            width: 150
          },
          {
            label: "已报名人数",
            prop: "registrationPersons",
            width: 150
          },
          {
            label: "报名费用",
            prop: "registrationFee",
            width: 100
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            width: 100
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            width: 100
          },
          {
            label: "赛事类型",
            prop: "matchType",
            width: 100
          },
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事名称",
            prop: "matchName",
            type: "input"
          },
          {
            label: "报名费用",
            prop: "registrationFee"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "数据id",
            prop: "p1",
            width: 110
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 100
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 100
          },
          {
            label: "比赛场馆",
            prop: "venue",
            width: 100
          },
          {
            label: "已报名人数",
            prop: "registrationPersons",
            width: 150
          },
          {
            label: "报名费用",
            prop: "registrationFee",
            width: 100
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            width: 100
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            width: 100
          },
          {
            label: "赛事类型",
            prop: "matchType",
            width: 100
          },
          {
            label: "赛事介绍",
            prop: "matchIntroduce",
            width: 300
          },
          {
            label: "赛事手册",
            prop: "matchManual",
            width: 100
          },
          {
            label: "路线地图",
            prop: "routeMap",
            width: 100
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "数据id",
            prop: "p1",
            width: 110
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 100
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 100
          },
          {
            label: "比赛场馆",
            prop: "venue",
            width: 100
          },
          {
            label: "已报名人数",
            prop: "registrationPersons",
            width: 150
          },
          {
            label: "报名费用",
            prop: "registrationFee",
            width: 100
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            width: 100
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            width: 100
          },
          {
            label: "赛事类型",
            prop: "matchType",
            width: 100
          },
          {
            label: "赛事介绍",
            prop: "matchIntroduce",
            width: 300
          },
          {
            label: "赛事手册",
            prop: "matchManual",
            width: 100
          },
          {
            label: "路线地图",
            prop: "routeMap",
            width: 100
          }
        ]
      }
    };
  },

};
</script>


<style>
</style>

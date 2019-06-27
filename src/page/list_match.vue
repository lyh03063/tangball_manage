<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
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
        matchName: "aaa",
        matchTime: "2019-6.26",
        name: "aaa",
        registrationPersons: "aaa",
        registrationFee: "aaa",
        matchStatus: "1",
        publicationStatus: "1",
        matchType: "aaa",
        matchIntroduce: "aaa",
        matchManual: "aaa",
        routeMap: "aaa"
      },
      {
        P1: 2,
        matchName: "aaa",
        matchTime: "2019-6.26",
        name: "aaa",
        registrationPersons: "aaa",
        registrationFee: "aaa",
        matchStatus: "1",
        publicationStatus: "1",
        matchType: "aaa",
        matchIntroduce: "aaa",
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
            prop: "name",
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
            width: 100
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
            prop: "name",
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
            width: 100
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
            prop: "name",
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
            width: 100
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
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "list_match"); //菜单聚焦
  }
};
</script>


<style>
</style>

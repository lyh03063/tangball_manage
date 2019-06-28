<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";

export default {
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "listCategory", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "赛事数据",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_match", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_match", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_match", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_match" //删除接口
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
            width: 90
          },
          {
            label: "报名人数",
            prop: "registeredPersons",
            width: 90
          },
          {
            label: "报名费",
            prop: "registrationFee",
            width: 75
          },
          {
            label: "发布",
            prop: "publicationStatus",
            width: 75,
            formatter: function(rowData) {
              return rowData.publicationStatus == "1" ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "状态",
            prop: "matchStatus",
            width: 75,
            formatter: function(rowData) {
              if (rowData.matchStatus == "1") {
                return "未开始";
              } else if (rowData.matchStatus == "2") {
                return "进行中";
              } else {
                return "已结束";
              }
            }
          },
          {
            label: "类型",
            prop: "matchType",
            width: 75,
            formatter: function(rowData) {
              return rowData.matchType == "1" ? "比杆赛" : "比洞赛"; //三元表达式
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: "1" },
              { label: "进行中", value: "2" },
              { label: "已结束", value: "3" }
            ]
          },
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "比杆赛", value: "1" },
              { label: "比洞赛", value: "2" }
            ]
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: "1" }, { label: "否", value: "2" }]
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "数据id",
            prop: "P1",
            width: 100
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
            label: "报名人数",
            prop: "registeredPersons",
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
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: "1" },
              { label: "进行中", value: "2" },
              { label: "已结束", value: "3" }
            ]
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: "1" }, { label: "否", value: "2" }]
          },
          {
            label: "赛事类型",
            prop: "matchType",

            type: "select",
            options: [
              { label: "比杆赛", value: "1" },
              { label: "比洞赛", value: "2" }
            ]
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            type: "date"
          },
          {
            label: "数据的id",
            prop: "P1"
          },
          {
            label: "赛事名称",
            prop: "matchName"
          },
          {
            label: "比赛场馆",
            prop: "venue"
          },
          {
            label: "报名人数",
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
            label: "赛事手册",
            prop: "matchManual",
            type: "textarea"
          },
          {
            label: "路线地图",
            prop: "routeMap"
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

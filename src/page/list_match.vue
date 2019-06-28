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
            label: "数据id",
            prop: "P1",
            width: 100
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 200
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 200,
            formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            }
          },
          {
            label: "比赛场馆",
            prop: "venue",
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
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "input"
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "input"
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
            width: 100,
            formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            }
          },
          {
            label: "比赛场馆",
            prop: "venue",
            width: 100
          },
          {
            label: "已报名人数",
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
            width: 100,
            formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            }
          },
          {
            label: "比赛场馆",
            prop: "venue",
            width: 100
          },
          {
            label: "已报名人数",
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
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "list_match"); //菜单聚焦
  }
};
</script>


<style>
</style>

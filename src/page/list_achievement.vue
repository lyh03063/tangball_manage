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
        twoTitle: "商品中心",
        threeTitle: "商品分类",
        flag: true,
        url: {
          list:"http://120.76.160.41:3000/crossList?page=tangball_achievement", //列表接口
          add:"http://120.76.160.41:3000/crossAdd?page=tangball_achievement", //新增接口
          modify:"http://120.76.160.41:3000/crossModify?page=tangball_achievement", //修改接口
          delete:"http://120.76.160.41:3000/crossDelete?page=tangball_achievement" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            width: 90
          },
          {
            label: "参赛人姓名",
            prop: "participantsName",
            width: 110
          },
          {
            label: "赛事ID",
            prop: "matchId",
            width: 80
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 120
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            width: 70
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            width: 100
          },
          {
            label: "赛事ID",
            prop: "matchId",
            width: 100
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            width: 100
          },
          {
            label: "参赛人姓名",
            prop: "participantsName",
            width: 120
          },
          {
            label: "赛事ID",
            prop: "matchId",
            width: 100
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 150
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            width: 100
          },
          {
            label: "名次",
            prop: "ranking",
            width: 100
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            width: 100
          },
          {
            label: "参赛人姓名",
            prop: "participantsName",
            width: 150
          },
          {
            label: "赛事ID",
            prop: "matchId",
            width: 100
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 150
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            width: 100
          },
          {
            label: "名次",
            prop: "ranking",
            width: 100
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  }
};
</script>


<style>
</style>

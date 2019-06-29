<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import select_ajax from "../components/form_item/select_ajax.vue";
export default {
  components: { listData,select_ajax },
  data() {
    return {
      cfList: {
        listIndex: "list_achievement", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "比赛成绩",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_achievement", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_achievement", //新增接口
          modify:
            "http://120.76.160.41:3000/crossModify?page=tangball_achievement", //修改接口
          delete:
            "http://120.76.160.41:3000/crossDelete?page=tangball_achievement" //删除接口
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
            prop: "participantsId"
          },
          {
            label: "参赛人姓名",
            prop: "participantsName"
          },
          {
            label: "赛事ID",
            prop: "matchId"
          },
          {
            label: "赛事名称",
            prop: "matchName"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "参赛人Id",
            prop: "participantsId"
          },
          {
            label: "参赛人姓名",
            prop: "participantsName"
          },
          {
            label: "赛事ID",
            prop: "matchId"
          },
          {
            label: "赛事名称",
            prop: "matchName"
          },
          {
            label: "比赛得分",
            prop: "matchScore"
          },
          {
            label: "名次",
            prop: "ranking"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "input"
          },
          {
            label: "参赛人姓名",
            prop: "participantsName",
            type: "input"
          },
          {
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            options: [
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
            ]
            // ajax: {
            //   url:
            //     "http://120.76.160.41:3000/crossList?page=tangball_match",
            //   keyLabel: "matchType",
            //   keyValue: "P1"
            // }
          },
          {
            label: "赛事名称",
            prop: "matchName",
            type: "select",
             options: [
              { label: "锦标赛", value: '锦标赛' },
              { label: "小组赛", value: '小组赛' },
              { label: "决赛", value: '决赛' },
              { label: "总决赛", value: '总决赛' },
              { label: "友谊赛", value: '友谊赛'},
            ]
            // ajax: {
            //   url:
            //     "http://120.76.160.41:3000/crossList?page=tangball_match",
            //   keyLabel: "matchName",
            //   keyValue: "P1"
            // }
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            type: "input"
          },
          {
            label: "名次",
            prop: "ranking",
            type: "input"
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

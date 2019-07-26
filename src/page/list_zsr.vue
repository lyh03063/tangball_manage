<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";
import Mock from "mockjs";
// 比赛成绩接口
Mock.mock("/list_achievement", function() {
  let list_achievement = {
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
        P1: "1",
        participantsId: "11",
        participantsName: "张三",
        matchId: "22",
        matchName: "唐球友谊赛",
        matchScore: "80",
        ranking: "第1名"
      },
      {
        P1: "2",
        participantsId: "12",
        participantsName: "李四",
        matchId: "22",
        matchName: "唐球友谊赛",
        matchScore: "75",
        ranking: "第2名"
      },
      {
        P1: "3",
        participantsId: "13",
        participantsName: "王五",
        matchId: "22",
        matchName: "唐球友谊赛",
        matchScore: "71",
        ranking: "第3名"
      },
      {
        P1: "4",
        participantsId: "14",
        participantsName: "赵六",
        matchId: "33",
        matchName: "唐球小组赛",
        matchScore: "85",
        ranking: "第1名"
      },
      {
        P1: "5",
        participantsId: "15",
        participantsName: "孙七",
        matchId: "33",
        matchName: "唐球小组赛",
        matchScore: "80",
        ranking: "第2名"
      }
    ]
  };

  return list_achievement;
});

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
          // list: "/list_achievement" //列表接口
          list: "/crossList?page=tangball_achievement", //列表接口
          add: "/crossAdd?page=tangball_achievement", //新增接口
          modify: "/crossModify?page=tangball_achievement", //修改接口
          delete: "/crossDelete?page=tangball_achievement" //删除接口
        },
        //-------列配置数组-------
        columns: [
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
            label: "杆数",
            prop: "matchScore",
            width: 100
          },
          {
            label: "名次",
            prop: "ranking",
            width: 100
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
            label: "杆数",
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
            label: "杆数",
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
  }
};
</script>


<style>
</style>

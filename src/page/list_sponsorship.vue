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
        listIndex: "list_sponsorship", //vuex对应的字段
        twoTitle: "商品中心",
        threeTitle: "商品分类",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_sponsorship", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_sponsorship", //新增接口
          modify:
            "http://120.76.160.41:3000/crossModify?page=tangball_sponsorship", //修改接口
          delete:
            "http://120.76.160.41:3000/crossDelete?page=tangball_sponsorship" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "id",
            prop: "P1",
            width: 60
          },
          {
            label: "赞助商id",
            prop: "sponsorId",
            width: 120
          },
          {
            label: "赛事id",
            prop: "matchId",
            width: 120
          },
          {
            label: "赞助金额",
            prop: "amount",
            width: 100
          },
          {
            label: "赞助时间",
            prop: "time",
            width: 220,
             formatter: function(row) {
              return moment(row.time).format("YYYY-MM-DD HH:mm");
            }
          },
          {
            label: "地点",
            prop: "place",
            width: 110
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "分类编号",
            prop: "P1",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "id",
            prop: "P1"
          },
          {
            label: "赞助商id",
            prop: "sponsorId"
          },
          {
            label: "赛事id",
            prop: "matchId"
          },
          {
            label: "赞助金额",
            prop: "amount"
          },
          {
            label: "赞助时间",
            prop: "time"
          },
          {
            label: "地点",
            prop: "place"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "id",
            prop: "P1",
            type: "input"
          },
          {
            label: "赞助商id",
            prop: "sponsorId",
            type: "input"
          },
          {
            label: "赛事id",
            prop: "matchId",
            type: "input"
          },
          {
            label: "赞助金额",
            prop: "amount",
            type: "input"
          },
          {
            label: "赞助时间",
            prop: "time",
            type: "date",
           
          },
          {
            label: "地点",
            prop: "place",
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

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
          list: "/list_enroll" //列表接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "报名会员数据id",
            prop: "memberId ",
            width: 100
          },
          {
            label: "赛事数据id",
            prop: "matchId",
            width: 200
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 200
          },
          {
            label: "报名时间",
            prop: "time",
            width: 150
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 150
          },
          {
            label: "审核状态",
            prop: "auditStatus ",
            width: 150
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "身份证号",
            prop: "idCard",
            type: "input"
          },
          {
            label: "报名会员数据id",
            prop: "memberId ",
            width: 150
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "报名会员数据id",
            prop: "memberId ",
            width: 200
          },
          {
            label: "赛事数据id",
            prop: "matchId",
            width: 200
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 200
          },
          {
            label: "报名时间",
            prop: "time",
            width: 150
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 150
          },
          {
            label: "审核状态",
            prop: "auditStatus ",
            width: 150
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "报名会员数据id",
            prop: "memberId ",
            width: 200
          },
          {
            label: "赛事数据id",
            prop: "matchId",
            width: 200
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 200
          },
          {
            label: "报名时间",
            prop: "time",
            width: 150
          },
          {
            label: "支付状态",
            prop: "payStatus",
            width: 150
          },
          {
            label: "审核状态",
            prop: "auditStatus ",
            width: 150
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

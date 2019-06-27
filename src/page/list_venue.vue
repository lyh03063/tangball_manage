<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import Mock from "mockjs"



Mock.mock('/list_venue',function(){
  let list_venue={
    "code": 0,
    "message": "操作成功",
    "page": {
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 1,
      "pageCount": 1
    },
    "list":[
      {
        "P1":1,
        "name":"一号场馆",
        "area":"A区",
        "countMatch":"5",
        // "album"
        "time":"2016-6-10",
        "phoneNumber":"18218024345"

      },
      {
        "P1":2,
        "name":"二号场馆",
        "area":"B区",
        "countMatch":"5",
        // "album"
        "time":"2016-6-11",
        "phoneNumber":"13213125535"
      },
      
    ]
  }
  return list_venue
})
export default {
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "list_venue", //vuex对应的字段
        twoTitle: "商品中心",
        threeTitle: "商品分类",
        flag:true,
        url: {
          list: "/list_venue", //列表接口
      
        },
        //-------列配置数组-------
        columns: [
          {
            label: "分类编号",
            prop: "P1",
            width: 100
          },
          {
            label: "场馆名称",
            prop: "name",
            width: 200
          },
          {
            label: "所属地区",
            prop: "area",
            width: 100
          },
          {
            label: "赛事数量",
            prop: "countMatch",
            width: 100
          },
             {
            label: "加盟时间",
            prop: "time",
            width: 200
          },
           {
            label: "联系方式",
            prop: "phoneNumber",
            width: 200
          },
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
            label: "分类编号",
            prop: "P1",
            width: 100
          },
          {
            label: "场馆名称",
            prop: "name",
            width: 200
          },
          {
            label: "所属地区",
            prop: "area",
            width: 200
          },
          {
            label: "赛事数量",
            prop: "countMatch",
            width: 200
          },
           {
            label: "加盟时间",
            prop: "time",
            width: 200
          },
           {
            label: "联系方式",
            prop: "phoneNumber",
            width: 200
          },
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
           {
            label: "分类编号",
            prop: "P1",
            width: 100
          },
          {
            label: "场馆名称",
            prop: "name",
            width: 200
          },
          {
            label: "所属地区",
            prop: "area",
            width: 100
          },
          {
            label: "赛事数量",
            prop: "countMatch",
            width: 200
          },
             {
            label: "加盟时间",
            prop: "time",
            width: 200
          },
           {
            label: "联系方式",
            prop: "phoneNumber",
            width: 200
          },
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

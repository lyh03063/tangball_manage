<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import Mock from 'mockjs'
// 报名（订单）接口
Mock.mock('/list_abc', function () {
  let list_enroll =
  {
    "code": 0,
    "message": "操作成功",
    "page": {
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 1,
      "pageCount": 1
    },
    "list": [
      {
        "P1": "1",
        "memberId ": "12",
        "matchId": "22",
        "idCard": "441521200003331151",
        "time": "2019-06-26",
        "payStatus": 1,
        "auditStatus ": 3
      },
      {
        "P1": "2",
        "memberId ": "13",
        "matchId": "21",
        "idCard": "441521200003331152 ",
        "time": "2019-06-26",
        "payStatus": 1,
        "auditStatus ": 2
      }
    ]
  }

  return list_enroll

})


export default {
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "listCategory", //vuex对应的字段
        twoTitle: "商品中心",
        threeTitle: "商品分类",
        flag:true,
        url: {
          list: "/list_abc", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=mabang-category", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=mabang-category", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=mabang-category" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "分类编号",
            prop: "P1",
            width: 100
          },
          {
            label: "分类名称",
            prop: "name",
            width: 200
          },
          {
            label: "注释",
            prop: "description",
            width: 200
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
            label: "分类编号",
            prop: "P1"
          },
          {
            label: "分类名称",
            prop: "name"
          },
          {
            label: "注释",
            prop: "description"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "分类名称",
            prop: "name",
            type: "input"
          },
          {
            label: "注释",
            prop: "description",
            type: "textarea"
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

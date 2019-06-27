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
        listIndex: "list_article", //vuex对应的字段
        twoTitle: "其他数据",
        threeTitle: "文章管理",
        flag:true,
        url: {
          list: "/articleList", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=mabang-category", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=mabang-category", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=mabang-category" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "文章分类",
            prop: "articleCategory",
            width: 100
          },
          {
            label: "文章标题",
            prop: "articleTitle",
            width: 200
          },
         
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "分类编号",
            prop: "articleCategory",
            type: "input"
          },
          {
            label: "文章标题",
            prop: "articleTitle",
            type: "input"
          },
         
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "文章详情",
            prop: "articleContent"
          },
          
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "文章分类",
            prop: "articleCategory",
            type: "select",
            options: [
              { label: "唐球规则", value: "1" },
              { label: "比赛说明", value: "2" },
              { label: "推广赞助", value: "3" },
                      
            ]
          },
          {
            label: "文章详情",
            prop: "articleContent",
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

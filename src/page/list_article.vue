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
          list: "http://120.76.160.41:3000/crossList?page=tangball_article", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_article", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_article", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_article" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "文章分类",
            prop: "articleCategory",
            width: 90
          },
          {
            label: "文章标题",
            prop: "articleTitle",
            width: 220
          },
           {
            label: "创建时间",
            prop: "CreateTime",
            width: 200,
            formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            },
          },
           {
            label: "最后修改时间",
            prop: "UpdateTime",
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
            label: "其他",
            prop: "extend",
            width: 200,
            formatter: function(extend) {           
              return JSON.stringify(extend.extend)                
            }
          },
         
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
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
          // {
          //   label: "文章标题",
          //   prop: "articleTitle",
          //   type: "input",
          //   ajax: {
          //     url: "http://120.76.160.41:3000/crossList?page=tangball_article",
          //     keyLabel: "articleTitle",
          //     keyValue: "P1"
          //   },
          // },
          // {
          //   label: "文章标题",
          //   prop: "articleTitle",
          //   type: "input"
          // },
         
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "其他",
            prop: "extend",
            width: 200,
            formatter: function(extend) {           
              return JSON.stringify(extend.extend)                
            }
          },
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
            label: "文章标题",
            prop: "articleTitle",
            width: 200
          },
          {
            label: "文章详情",
            prop: "articleContent",
            type: "textarea"
          },
          {
            label: "其他",
            prop: "extend",
            width: 200,
            formatter: function(extend) {           
              return JSON.stringify(extend.extend)                
            }
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

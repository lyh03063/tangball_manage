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
        flag:true,
        url: {
          list: '/list_sponsor', //列表接口
          add: '/list_sponsor/add', //新增接口
          modify: '/list_sponsor/modify', //修改接口
          delete: "/list_sponsor/delete" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "赞助商编号",
            prop: "P1",
            width: 120
          },
          {
            label: "赞助商名称",
            prop: "name",
            width: 150
          },
          {
            label: "赞助内容",
            prop: "money",
            width: 150
          },
          {
            label: "赞助商简介",
            prop: "intro",
            width: 400
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赞助商编号",
            prop: "P1",
            type: "input"
          },
          {
            label: "赞助商名称",
            prop: "name",
            type: "input"
          },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "赞助商编号",
            prop: "P1",
            
          },
          {
            label: "赞助商名称",
            prop: "name"
          },
          {
            label: "赞助内容",
            prop: "money",
          },
          {
            label: "赞助商简介",
            prop: "intro"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "赞助商名称",
            prop: "name",
            type: "input",
            width: 200
          },
          {
            label: "赞助内容",
            prop: "money",
          },
          {
            label: "赞助商简介",
            prop: "intro",
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

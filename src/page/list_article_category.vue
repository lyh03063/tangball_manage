<template>
  <div class>
    <listData :cf="cfList">
      <template v-slot:slot_form_item_detailItems="{row}">
        <div v-for="text in row.article" :key="text.title">
          <router-link to="/list_article" >
          {{text.title}}
          </router-link>
          </div>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";


export default {
  components: { listData},
  methods:{
      print(description){
        console.log("ssss",description);
        
      }
  },
  data() {
    return {
      cfList: {
        listIndex: "listCategory", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "文章分类",
        flag:true,
        url: {
          list: '/listArticleCategory', //列表接口
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
            width: 120
          },
          {
            label: "分类说明",
            prop: "explin",
            width: 200
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "分类编号",
            prop: "P1",
            type: "input"
          },
          {
            label: "分类编号",
            prop: "name",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "分类编号",
            prop: "P1",
          },
          {
            label: "分类名称",
            prop: "name"
          },
          {
            label: "分类说明",
            prop: "explin"
          },
          {
            label: "该分类下的文章总量",
            prop: "articleNumber"
          },
          {
            label: "该分类下的所有文章",
            prop: "article",
            slot: "slot_form_item_detailItems"
          },
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "分类名称",
            prop: "name",
            type: "input"
          },
          {
            label: "分类说明",
            prop: "explin",
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

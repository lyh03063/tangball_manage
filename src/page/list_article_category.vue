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
import Mock from 'mockjs'

export default {
  components: { listData},
  methods:{

  },
  data() {
    return {
      cfList: {
        listIndex: "listCategory", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "文章分类",
        flag:true,
        url: {
          list: 'http://120.76.160.41:3000/crossList?page=tangball_article_category', //列表接口
          add: 'http://120.76.160.41:3000/crossAdd?page=tangball_article_category', //新增接口
          modify: 'http://120.76.160.41:3000/crossModify?page=tangball_article_category', //修改接口
          delete: 'http://120.76.160.41:3000/crossDelete?page=tangball_article_category' //删除接口
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
            prop: "remark",
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
            prop: "remark"
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
            prop: "remark",
            type: "textarea"
          }
        ]
      }
    };
  },
};
 let textCategoryList ={
      code:0,
      message:"操作成功",
      page:{
      pageIndex: 1,
      pageSize: 3,
      allCount: 1,
      pageCount: 1
      },
    list:[
    {P1:1,name:"唐球规则",remark:"关于唐球的各项规则说明",articleNumber:"3",
    article:[{title:"文章分类唐球规则下的文章一",text:"这是一篇文章"},
    {title:"文章分类唐球规则下的文章二",text:"这是一篇文章"},
    {title:"文章分类唐球规则下的文章三",text:"这是一篇文章"},]},
    {P1:2,name:"比赛说明",remark:"关于唐球比赛的各项规则说明",articleNumber:"3",
    article:[{title:"文章分类比赛说明下的文章一",text:"这是一篇文章"},
    {title:"文章分类比赛说明下的文章二",text:"这是一篇文章"},
    {title:"文章分类比赛说明下的文章三",text:"这是一篇文章"},]},
    {P1:3,name:"推广赞助",remark:"关于唐球的推广赞助的说明",articleNumber:"3",
    article:[{title:"文章分类推广赞助下的文章一",text:"这是一篇文章"},
    {title:"文章分类推广赞助下的文章二",text:"这是一篇文章"},
    {title:"文章分类推广赞助下的文章三",text:"这是一篇文章"},]},
  ]
  }
Mock.mock('/listArticleCategory', function(){
  return textCategoryList
})
Mock.mock('/listArticleCategory/add', function(obj){
  let element =JSON.parse(obj.body).data;
  let index =textCategoryList.list.length-1
  var newElement = {
    P1:textCategoryList.list[index].P1+1,
    name:element.name,
    remark:element.remark,
    articleNumber:0,
    article:[]
  }
  textCategoryList.list.push(newElement);
})
Mock.mock('/listArticleCategory/modify', function(obj){
  let element =JSON.parse(obj.body).modifyJson;
  for (let i = 0; i < textCategoryList.list.length; i++) {
    console.log(element.P1);
    if (textCategoryList.list[i].P1==element.P1) {
      textCategoryList.list[i]=element;
    }
  }
})
Mock.mock('/listArticleCategory/delete', function(obj){
  let id =JSON.parse(obj.body).findJson.P1;
  for (let i = 0; i < textCategoryList.list.length; i++) {
    if (textCategoryList.list[i].P1==id) {
      textCategoryList.list.splice(i,1);
    }
  }
})
</script>


<style>
</style>

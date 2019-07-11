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
          list: "/crossList?page=tangball_sponsor", //列表接口
          add: "/crossAdd?page=tangball_sponsor", //新增接口
          modify: "/crossModify?page=tangball_sponsor", //修改接口
          delete: "/crossDelete?page=tangball_sponsor" //删除接口
        },
        //这里是通过添加插槽来配置数据，但数据存在则渲染，不存在则不生效
        //-------列配置数组-------
        columns: [
          {
            label: "分类编号",
            prop: "P1",
            width:100,
          },
          {
            label: "分类名称",
            prop: "name",
            width: 200,
          },
          {
            label: "注释34",
            prop: "description",
            width: 200,
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
            label: "注释23",
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
            label: "注释3",
            prop: "description",
            type: "textarea"
          }
        ]
      }
    };
  },
 
};
</script>


<style>
</style>

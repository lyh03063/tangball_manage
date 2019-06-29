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
        listIndex: "list_area", //vuex对应的字段
        flag:true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=dmagic_area", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=dmagic_area", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=dmagic_area", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=dmagic_area" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "地区名称",
            prop: "P2",
            width: 200
          },
          {
            label: "地区编号",
            prop: "P7",
            width: 200
          },
          {
            label: "父地区编号",
            prop: "P8",
            width: 200
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "地区名称",
            prop: "P2",
            type: "input_find_vague"
          },{
            label: "分类编号",
            prop: "P7",
            type: "input"
          },{
            label: "父地区编号",
            prop: "P8",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "地区名称",
            prop: "P2",
          },
          {
            label: "地区编号",
            prop: "P7",
          },
          {
            label: "父地区编号",
            prop: "P8",
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
             label: "地区名称",
            prop: "P2",
            type: "input"
          },
          {
           label: "地区编号",
            prop: "P7",
            type: "input"
          },{
            label: "父地区编号",
            prop: "P8",
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

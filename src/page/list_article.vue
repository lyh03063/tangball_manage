<template>
  <div class>
    <listData :cf="cfList">

<!--详情弹窗的 memberId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_articleCategory="{row}">
        <ajax_populate :id="row.articleCategory"  page="tangball_article_category">
          <template v-slot:default="{doc}">
             {{doc.name}}
          </template>
        </ajax_populate>
      </template>

    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import ajax_populate from "../components/common/ajax_populate.vue";
export default {
  components: { listData,ajax_populate },
  data() {
    return {
      cfList: {
        listIndex: "list_article", //vuex对应的字段~
        twoTitle: "其他数据",
        threeTitle: "文章管理",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_article", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_article", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_article", //修改接口
          detail: "http://120.76.160.41:3000/crossDetail?page=tangball_article",
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_article" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "文章分类",
            prop: "aaa",
            width: 120,
            slot:"slot_detail_item_articleCategory"
          },
            {
            label: "分类编号",
            prop: "articleCategory",
            width: 90
          },
          {
            label: "文章标题",
            prop: "articleTitle",
            width: 200
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 145,
            formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return moment(
                new Date(+new Date(dateee) + 8 * 3600 * 1000)
              ).format("YYYY年 MM月 DD日");
            }
          },
          {
            label: "最后修改时间",
            prop: "UpdateTime",
            width: 145,
            formatter: function(date) {
             var dateee = new Date(date).toJSON();
              return moment(
                new Date(+new Date(dateee) + 8 * 3600 * 1000)
              ).format("YYYY年 MM月 DD日");
            }
          },
          {
            label: "其他",
            prop: "extend",
            width: 135,
            formatter: function(extend) {
              return JSON.stringify(extend.extend);
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "文章分类",
            prop: "articleCategory",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_article_category",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "文章标题",
            prop: "articleTitle",
            type: "input_find_vague"
          }
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
              return JSON.stringify(extend.extend);
            }
          },
          {
            label: "文章详情",
            prop: "articleContent",
            ajax: {
              url: "http://120.76.160.41:3000/crossDetail?page=tangball_article",
              keyLabel: "articleContent",
              keyValue: "P1"
            },
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "文章分类",
            prop: "articleCategory",
            type: "select",
           ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_article_category",
              keyLabel: "name",
              keyValue: "P1"
            }
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

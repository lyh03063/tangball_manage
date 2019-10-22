<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      cfList: {
        powerPath: "newsCenter.list_article",//权限路径
        listIndex: "list_article", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据",
        threeTitle: "资讯管理",
        flag: true,
        url: {
          list: "/crossList?page=tangball_article", //列表接口
          add: "/crossAdd?page=tangball_article", //新增接口
          modify: "/crossModify?page=tangball_article", //修改接口
          detail: "/crossDetail?page=tangball_article",
          delete: "/crossDelete?page=tangball_article" //删除接口
        },
        dynamicDict: [
          {
            page: "tangball_article_category",
            populateColumn: "categoryDoc",
            idColumn: "articleCategory",
            idColumn2: "P1"
          },
          {
            page: "tangball_franchisee",
            populateColumn: "franchisee",
            idColumn: "franchiseeId",
            idColumn2: "P1"
          },
        ],

        //-------列配置数组-------
        columns: [
          {
            label: "资讯标题",
            prop: "articleTitle",
            width: 260
          },
          {
            label: "分类名称",
            prop: "articleCategory",
            width: 150,
            formatter: function(rowData) {
              let name = lodash.get(rowData, "categoryDoc.name");
              return name;
            }
          },

          {
            label: "所属加盟商",
            prop: "franchiseeId",
            width: 130,
            formatter:function(rowData){
              if (rowData.franchisee) {
                return rowData.franchisee.name
              }
            }
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 90,
            formatter:function(rowData){
                return (rowData.auditStatus ==1?'已审核':'未审核')
            }
          },
          {
            label: "显示到首页",
            prop: "recommend",
            width: 110,
            formatter:function(rowData){
                return rowData.recommend ==1?'是':'否'
            }
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 145
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
            label: "资讯分类",
            prop: "articleCategory",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_article_category",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "资讯标题",
            prop: "articleTitle",
            type: "input_find_vague"
          }
          // {
          //   label: "资讯标题",
          //   prop: "articleTitle",
          //   type: "input"
          // },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "标题",
            prop: "articleTitle",
            width: 200
          },
          {
            label: "资讯详情",
            prop: "articleContent",
            type: "html"
          },
          {
            label: "审核状态",
            prop: "auditStatus",
            width: 90,
            formatter:function(rowData){
                return (rowData.auditStatus ==1?'已审核':'未审核')
            }
          },
          {
            label: "显示到首页",
            prop: "recommend",
            width: 110,
            formatter:function(rowData){
                return rowData.recommend ==1?'是':'否'
            }
          },
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "审核状态",
            prop: "auditStatus",
            type: "select",
            options:[
              {value:0,label:"未审核"},
              {value:1,label:"已审核"},
            ]
          },
          {
            label: "显示到首页",
            prop: "recommend",
            type: "select",
            options:[
              {value:0,label:"否"},
              {value:1,label:"是"},
            ]
          },
          {
            label: "资讯分类",
            prop: "articleCategory",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_article_category",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "资讯标题",
            prop: "articleTitle",
            width: 200
          },
          {
            label: "资讯详情",
            prop: "articleContent",
            type: "editor"
          },
          {
            label: "公众号资讯地址",
            prop: "extend",
            path: "wxArticleUrl"
          }
        ]
      }
    };
  },created(){
    util.setListPower(this.cfList);//调用：{根据当前角色权限设置列表配置的函数}
  }
};
</script>


<style>
</style>

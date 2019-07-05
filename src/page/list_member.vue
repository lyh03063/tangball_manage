<template>
  <div class>
    <listData :cf="cfList">

<!--列表的entries字段插槽组件-->
      <template v-slot:slot_list_column_entries="{row}">
        <a class="link-blue"  href="javascript:;" @click="filterEnroll(row.P1)">{{row.entries}}</a>
      </template>

    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";

export default {
  
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "list_member", //vuex对应的字段
        twoTitle: "会员中心",
        threeTitle: "会员列表",
        flag:true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_member", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_member", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_member", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_member" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "会员编号",
            prop: "P1",
            width: 100
          },
          {
            label: "会员名称",
            prop: "name",
            width: 100
          },
          {
            label: "微信号",
            prop: "unionld",
            width: 100
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 180
          },
          {
            label: "参赛次数",
            prop: "entries",
            width: 100,
            slot:"slot_list_column_entries"
          },
          {
            label: "唐球积分",
            prop: "integral",
            width: 100
          },       
          {
            label: "备注",
            prop: "remark",
            width: 150
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "会员名称",
            prop: "name",
            type: "input_find_vague"
          },
          {
            label: "身份证号",
            prop: "idCard",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "会员编号",
            prop: "P1",
            width: 100
          },
          {
            label: "会员名称",
            prop: "name",
            width: 100
          },
          {
            label: "微信号",
            prop: "unionld",
            width: 100    
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 180
          },
          {
            label: "参赛次数",
            prop: "entries",
            width: 100
          },
          {
            label: "唐球积分",
            prop: "integral",
            width: 100
          },     
           {
            label: "创建时间",
            prop: "CreateTime",
            width: 170,
             formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            },
          },
          {
            label: "修改时间",
            prop: "UpdateTime",
            width: 170,
             formatter: function(date) {
              var dateee = new Date(date).toJSON();
              return new Date(+new Date(dateee) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            },
          },
          {
            label: "备注",
            prop: "remark",
            width: 150
          }  
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "会员名称",
            prop: "name",
            width: 100
          },
          {
            label: "微信号",
            prop: "unionld",
            width: 100
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 180
          },
          {
            label: "备注",
            prop: "remark",
            width: 150
          }  
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  },
  methods: {
    filterEnroll(pid) {
      //函数：{筛选文章函数}

      this.$store.commit("setListFindJson", {
        //改变列表的初始状态值
        listIndex: "list_enroll",
        findJson: { memberId: pid }
      });
      this.$router.push({ path: "/list_enroll" });
    }
  }
};
</script>


<style>
</style>

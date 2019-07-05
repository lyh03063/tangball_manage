<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import Mock from 'mockjs'
// 报名（订单）接口
Mock.mock('/list_abc', function () {
  let list_enroll =
  {
    "code": 0,
    "message": "操作成功",
    "page": {
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 1,
      "pageCount": 1
    },
    "list": [
      {
        "P1": "1",
        "memberId ": "12",
        "matchId": "22",
        "idCard": "441521200003331151",
        "time": "2019-06-26",
        "payStatus": 1,
        "auditStatus ": 3
      },
      {
        "P1": "2",
        "memberId ": "13",
        "matchId": "21",
        "idCard": "441521200003331152 ",
        "time": "2019-06-26",
        "payStatus": 1,
        "auditStatus ": 2
      }
    ]
  }

  return list_enroll

})


export default {
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "list_franchisee", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "加盟商",
        flag:true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_franchisee", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_franchisee", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_franchisee", //修改接口
         detail: "http://120.76.160.41:3000/crossDetail?page=tangball_franchisee", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_franchisee" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 60
          },
          {
            label: "企业名称",
            prop: "name",
            width: 200
          },
          {
            label: "场馆数",
            prop: "countVenue",
            width: 75,
            // slot:"slot_list_column_countVenue"
            statistics:{listIndex:'list_venue', targetIdKey:'franchiseeId'}
          },
           {
            label: "加盟时间",
            prop: "joinTime",
            width: 100,
            // formatter:function(row){
              
            //  return moment(row.joinTime).format("YYYY-MM-DD")

            // }
          },
          {
            label: "备注",
            prop: "remark",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "Id",
            prop: "P1",
            type: "input"
          },{
            label: "加盟时间",
            prop: "joinTime",
            type: "time_period"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "Id",
            prop: "P1"
          },
          {
            label: "企业名称",
            prop: "name"
          },
          {
            label: "备注",
            prop: "remark"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "企业名称",
            prop: "name",
            type: "input"
          },
    
          {
            label: "加盟时间",
            prop: "joinTime",
            type: "date"
          },
          {
            label: "备注2",
            prop: "remark",
            type: "input"
          }
        ]
      }
    };
  },
  methods: {
   
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  }
};
</script>


<style>
</style>

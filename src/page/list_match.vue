<template>
  <div class>
    <listData :cf="cfList">
      <!-- 全国性赛事-城市场馆列表 (新增修改表单)-->
      <template v-slot:slot_form_item_cityVenueList="{formData}">
        <city_venue_list v-model="formData.cityVenueList"></city_venue_list>
      </template>
      <!-- 全国性赛事-城市场馆列表-(详情弹窗)-->
      <template v-slot:slot_detail_item_cityVenueList="{row}">
        <city_venue_list v-model="row.cityVenueList" :isEdit="false"></city_venue_list>
      </template>
      <!-- 赛程联动下拉框 ,通过matchType进行初始化(新增修改表单)-->
      <template v-slot:slot_modify_item_matchProgress="{formData}">
        <select_match_progress v-model="formData.matchProgress" :matchType="formData.matchType"></select_match_progress>
      </template>
      <!-- 赛程成绩-->
      <template v-slot:slot_modify_item_achievementProgress="{formData}">
        <achievement_progress></achievement_progress>
        <div style="clear:both"></div>
        <match_achievement></match_achievement>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import city_venue_list from "../components/form_item/city_venue_list.vue";
import select_match_progress from "../components/form_item/select_match_progress.vue";
import achievement_progress from "../components/form_item/achievement_progress.vue";
import match_achievement from "../components/bussiness/match_achievement.vue";
export default {
  components: {
    listData,
    city_venue_list,
    select_match_progress,
    achievement_progress,
    match_achievement
  },
  data() {
    return {
      arr1: [
        {
          cityId: "001",
          cityName: "深圳A",
          venueId: "15",
          venueName: "深圳唐球馆1"
        },
        {
          cityId: "001",
          cityName: "深圳1",
          venueId: "15",
          venueName: "深圳唐球馆2"
        },
        {
          cityId: "001",
          cityName: "深圳1",
          venueId: "15",
          venueName: "深圳唐球馆3"
        }
      ],

      cfList: {
        listIndex: "list_match", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "赛事数据",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_match", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_match", //新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=tangball_match", //修改接口
          detail: "http://120.76.160.41:3000/crossDetail?page=tangball_match", //查看单条数据详情接口，在修改表单或详情弹窗用到

          delete: "http://120.76.160.41:3000/crossDelete?page=tangball_match" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "id",
            prop: "P1",
            width: 50
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 100
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 100
          },
          {
            label: "决赛场馆",
            prop: "venue",
            width: 90
          },
          {
            label: "报名人数",
            prop: "registeredPersons",
            width: 90,
            statistics: { listIndex: "list_enroll", targetIdKey: "matchId" }
          },
          {
            label: "报名费",
            prop: "registrationFee",
            width: 75
          },
          {
            label: "发布",
            prop: "publicationStatus",
            width: 75,
            formatter: function(rowData) {
              return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "状态",
            prop: "matchStatus",
            width: 75,
            formatter: function(rowData) {
              if (rowData.matchStatus == 1) {
                return "未开始";
              } else if (rowData.matchStatus == 2) {
                return "进行中";
              } else {
                return "已结束";
              }
            }
          },
          {
            label: "类型",
            prop: "matchType",
            width: 75,
            formatter: function(rowData) {
              return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
            }
          },
          {
            label: "成绩",
            // prop: "achievement",
            width: 75
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "普通赛", value: 1 },
              { label: "全国赛", value: 2 }
            ]
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: 1 },
              { label: "进行中", value: 2 },
              { label: "已结束", value: 3 }
            ]
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            type: "time_period"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "赛事名称",
            prop: "matchName"
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            formatter: function(rowData) {
              if (rowData.matchStatus == 1) {
                return "未开始";
              } else if (rowData.matchStatus == 2) {
                return "进行中";
              } else {
                return "已结束";
              }
            }
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            formatter: function(rowData) {
              return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "决赛场馆",
            prop: "venue"
          },
          {
            label: "赛事时间",
            prop: "matchTime"
          },
          {
            label: "赛事类型",
            prop: "matchType",
            formatter: function(rowData) {
              return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
            }
          },
          {
            label: "全国性赛事",
            prop: "cityVenueList",
            type: "select",
            slot: "slot_detail_item_cityVenueList"
          },
          {
            label: "报名人数",
            prop: "registeredPersons"
          },
          {
            label: "报名费用",
            prop: "registrationFee"
          },
          {
            label: "赛事介绍",
            prop: "matchIntroduce"
          },
          {
            label: "赛事手册",
            prop: "matchManual"
          },
          {
            label: "路线地图",
            prop: "routeMap"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "比赛成绩表",
            slot: "slot_modify_item_achievementProgress"
          },
          {
            label: "赛事名称",
            prop: "matchName",
            rules: [{ required: true, message: "赛事名称不能为空" }]
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: 1 },
              { label: "进行中", value: 2 },
              { label: "已结束", value: 3 }
            ]
          },

          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
          },

          {
            label: "决赛场馆",
            prop: "venue",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_venue",
              keyLabel: "name",
              keyValue: "name"
            }
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            type: "date",
            rules: [{ required: true, message: "赛事时间不能为空" }]
          },
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "普通赛", value: 1 },
              { label: "全国赛", value: 2 }
            ]
          },
          {
            label: "全国赛城市场馆",
            prop: "cityVenueList",
            type: "select",
            slot: "slot_form_item_cityVenueList",
            term: { matchType: 2 }
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            type: "select",
            slot: "slot_modify_item_matchProgress"
          },

          {
            label: "报名费用",
            prop: "registrationFee"
          },

          {
            label: "赛事介绍",
            prop: "matchIntroduce"
          },
          {
            label: "赛事手册",
            prop: "matchManual",
            type: "textarea"
          },
          {
            label: "路线地图",
            prop: "routeMap"
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "list_match"); //菜单聚焦
  },
  methods: {}
};
</script>



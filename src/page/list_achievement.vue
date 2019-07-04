<template>
  <div class>
    <listData :cf="cfList">
      <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_participantsId="{row}">
        <ajax_populate
          :id="row.participantsId"
          populateKey="participantsName"
          page="tangball_member"
        >
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              <b>{{doc.P1}}</b>
              (参赛人名称:
              <b>{{doc.name}}</b>)
            </div>
          </template>
        </ajax_populate>
      </template>
      <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1">
              <b>{{doc.P1}}</b>
              (赛事名称:
              <b>{{doc.matchName}}</b>)
            </div>
          </template>
        </ajax_populate>
      </template>
      <!-- 赛程联动下拉框 -->
      <template v-slot:slot_modify_item_matchProgress="{formData}">
        <select_match_progress v-model="formData.matchProgress" :matchType="formData.matchType"></select_match_progress>
      </template>
      <!-- 全国性赛事 -->
      <template v-slot:slot_form_item_cityVenueList="{formData}">
        <city_venue_list v-model="formData.cityVenueList"></city_venue_list>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "../components/list-data/list-data.vue";
import ajax_populate from "../components/common/ajax_populate.vue";
import city_venue_list from "../components/form_item/city_venue_list.vue";
import select_match_progress from "../components/form_item/select_match_progress.vue";
export default {
  components: {
    listData,
    ajax_populate,
    city_venue_list,
    select_match_progress
  },
  data() {
    return {
      cfList: {
        listIndex: "list_achievement", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "比赛成绩",
        flag: true,
        url: {
          list: "http://120.76.160.41:3000/crossList?page=tangball_achievement", //列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=tangball_achievement", //新增接口
          modify:
            "http://120.76.160.41:3000/crossModify?page=tangball_achievement", //修改接口
          delete:
            "http://120.76.160.41:3000/crossDelete?page=tangball_achievement" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            width: 90
          },

          {
            label: "赛事ID",
            prop: "matchId",
            width: 80
          },

          {
            label: "比赛得分",
            prop: "matchScore",
            width: 90
          },
          {
            label: "名次",
            prop: "ranking",
            width: 70
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "参赛人Id",
            prop: "participantsId"
          },

          {
            label: "赛事ID",
            prop: "matchId"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId"
          },
          {
            label: "赛事ID",
            prop: "matchId",
            slot: "slot_detail_item_matchId"
          },

          {
            label: "比赛得分",
            prop: "matchScore"
          },
          {
            label: "名次",
            prop: "ranking"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },

          {
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "http://120.76.160.41:3000/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            }
          },
          {
            label: "赛程",
            prop: "matchProcess",
            type: "select",
            slot: "slot_modify_item_selectMatch"
          },
          {
            label: "全国性赛事",
            prop: "cityVenueList",
            type: "select",
            slot: "slot_form_item_cityVenueList"
          },
          {
            label: "比赛得分",
            prop: "matchScore",
            type: "input"
          },
          {
            label: "名次",
            prop: "ranking",
            type: "input"
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  },
  methods: {}
};
</script>


<style scoped>
.el-select.el-select--small {
  margin-right: 10px;
}
</style>
